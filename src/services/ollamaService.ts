// src/services/ollamaService.ts
// Service to communicate with local Ollama instance

const OLLAMA_BASE_URL = import.meta.env.VITE_OLLAMA_URL || "http://localhost:11434";

export interface OllamaGenerateRequest {
    model: string;
    prompt: string;
    stream?: boolean;
}

export interface OllamaGenerateResponse {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
}

/**
 * Generate text using the local Ollama instance
 */
export async function generateWithOllama(
    prompt: string,
    model: string = "qwen3:8b"
): Promise<string> {
    const requestBody: OllamaGenerateRequest = {
        model,
        prompt,
        stream: false,
    };

    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        throw new Error(`Ollama request failed: ${response.statusText}`);
    }

    const data: OllamaGenerateResponse = await response.json();
    return data.response;
}

/**
 * Check if Ollama is available
 */
export async function checkOllamaStatus(): Promise<boolean> {
    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
        return response.ok;
    } catch {
        return false;
    }
}

/**
 * Get available models from Ollama
 */
export async function getOllamaModels(): Promise<string[]> {
    try {
        const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`);
        if (!response.ok) return [];
        const data = await response.json();
        return data.models?.map((m: { name: string }) => m.name) || [];
    } catch {
        return [];
    }
}
