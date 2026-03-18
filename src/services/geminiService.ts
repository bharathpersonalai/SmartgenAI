// src/services/geminiService.ts
// Service to communicate with Google Gemini API using the official SDK
import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Generate text using Google Gemini API
 */
export async function generateWithGemini(prompt: string): Promise<string> {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("Gemini API key not configured");
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);

        // Define configurations to try: model name + API version
        const configsToTry = [
            { model: "gemini-1.5-flash", version: "v1beta" },
            { model: "gemini-1.5-flash", version: "v1" },
            { model: "gemini-1.5-flash-latest", version: "v1beta" },
            { model: "gemini-1.5-pro", version: "v1beta" },
            { model: "gemini-pro", version: "v1beta" },
        ];

        let lastError;

        // Try each configuration until one works
        for (const config of configsToTry) {
            try {
                console.log(`Attempting to generate with model: ${config.model} (API: ${config.version})`);

                const model = genAI.getGenerativeModel(
                    { model: config.model },
                    { apiVersion: config.version }
                );

                const result = await model.generateContent(prompt);
                const response = await result.response;
                const text = response.text();

                console.log(`Success! Generated with ${config.model} on ${config.version}`);
                return text;
            } catch (error: any) {
                console.warn(`Failed with ${config.model} (${config.version}):`, error.message);
                lastError = error;

                // If it's a rate limit (429), don't try other models, just fail
                if (error.message?.includes("429")) {
                    const rateLimitError = new Error("Rate limit exceeded. Please try again later.");
                   (rateLimitError as any).isRateLimit = true;
                   throw rateLimitError; 
                }
            }
        }

        // If loop finishes without returning, all failed
        console.error("All configurations failed. Last error:", lastError);

        // Diagnostic log re-attempt
        try {
            console.log("DIAGNOSTIC: Listing available models...");
            const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
            const listData = await listRes.json();
            console.log("Available Models:", listData);
        } catch (e) {
            console.error("Diagnostic failed:", e);
        }

        throw new Error("Failed to generate content. Please check console for details.");
    } catch (error: any) {
        console.error("Gemini SDK Error:", error);

        // DIAGNOSTIC: Try to listing models to see what this key has access to
        try {
            console.log("Attempting to list available models for debugging...");
            const listResponse = await fetch(`https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`);
            const listData = await listResponse.json();
            console.log("Available Models for this API Key:", listData);
        } catch (listError) {
            console.error("Failed to list models:", listError);
        }

        // Better error message for common issues
        if (error.message?.includes("404")) {
            throw new Error("Model not found. Please check your API key restrictions in Google Cloud Console.");
        } else if (error.message?.includes("429")) {
            throw new Error("Rate limit exceeded. Please try again later.");
        }

        throw new Error(`Gemini request failed: ${error.message || "Unknown error"}`);
    }
}
