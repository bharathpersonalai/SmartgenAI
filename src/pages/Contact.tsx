// src/pages/Contact.tsx
import React, { useState, useRef, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { generateWithGemini } from "../services/geminiService";

const MAX_AI_DRAFTS = 3;
const AI_USAGE_KEY = "smartgen_ai_draft_data";
const RESET_PERIOD_MS = 4 * 24 * 60 * 60 * 1000; // 4 days in milliseconds
interface AiUsageData {
  count: number;
  resetTime: number; // timestamp when the limit resets
}

const ContactPage = () => {
  const [activeButton, setActiveButton] = useState<number | null>(null);

  // AI Drafting state
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGeneratedText, setAiGeneratedText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiUsageCount, setAiUsageCount] = useState(0);
  const [resetTime, setResetTime] = useState<number | null>(null);
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Load usage count from localStorage on mount, with time-based reset
  useEffect(() => {
    const storedData = localStorage.getItem(AI_USAGE_KEY);
    if (storedData) {
      try {
        const data: AiUsageData = JSON.parse(storedData);
        const now = Date.now();

        // Check if reset period has passed
        if (now >= data.resetTime) {
          // Reset the limit
          localStorage.removeItem(AI_USAGE_KEY);
          setAiUsageCount(0);
          setResetTime(null);
        } else {
          setAiUsageCount(data.count);
          setResetTime(data.resetTime);
        }
      } catch {
        localStorage.removeItem(AI_USAGE_KEY);
      }
    }
  }, []);

  const isAiLimitReached = aiUsageCount >= MAX_AI_DRAFTS;

  // Helper to save usage data
  const saveUsageData = (newCount: number) => {
    const now = Date.now();
    const newResetTime = resetTime || (now + RESET_PERIOD_MS);
    const data: AiUsageData = { count: newCount, resetTime: newResetTime };
    localStorage.setItem(AI_USAGE_KEY, JSON.stringify(data));
    setAiUsageCount(newCount);
    setResetTime(newResetTime);
  };

  // Format remaining time for display
  const getRemainingTimeText = () => {
    if (!resetTime) return "";
    const remaining = resetTime - Date.now();
    if (remaining <= 0) return "Resetting...";
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `Resets in ${days}d ${hours % 24}h`;
    }
    return `Resets in ${hours}h`;
  };

  // UPDATED: This function now handles the iOS navigation fix
  const handleButtonClick = (url: string, index: number) => {
    // Animation logic remains the same
    setActiveButton(index);
    setTimeout(() => {
      setActiveButton(null);
    }, 300);

    // iOS detection and redirect logic
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    if (isIOS) {
      // For iOS, open in the same tab to avoid the "ghost tab" issue
      window.location.href = url;
    } else {
      // For all other devices, open in a new tab as expected
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const scriptURL =
      "https://script.google.com/macros/s/AKfycbw27zzbuovIlWSSx-yHDDceXH-BRBOXhHqN18HRQV57vBXKTZBay7IZcr4hnB9qj_Tpiw/exec";

    const promise = fetch(scriptURL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData as any).toString(),
    });

    toast.promise(
      promise,
      {
        loading: "Sending message...",
        success: <b>Message sent successfully!</b>,
        error: <b>Could not send message.</b>,
      },
      {
        position: "top-right",
        success: {
          style: {
            background: "#4ade80",
            color: "#ffffff",
          },
        },
      }
    );

    promise.then(() => {
      form.reset();
    });
  };

  // AI Draft generation handler
  const handleGenerateAiDraft = async () => {
    if (isAiLimitReached) {
      toast.error("AI draft limit reached. You can only use this feature 3 times.");
      return;
    }

    if (!aiPrompt.trim()) {
      toast.error("Please enter a topic or idea for the AI to draft.");
      return;
    }

    setIsGenerating(true);
    setAiGeneratedText("");

    try {
      const systemPrompt = `You are a helpful assistant. Write a professional and friendly contact message for a web development company. The user wants to inquire about: ${aiPrompt}. Keep it concise (2-3 paragraphs max). Do not include any greeting like "Dear" or signature.`;

      const response = await generateWithGemini(systemPrompt);
      setAiGeneratedText(response);

      // Increment usage count after successful generation
      saveUsageData(aiUsageCount + 1);
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("Failed to generate with AI. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Insert AI generated text into message field
  const handleInsertAiDraft = () => {
    if (messageTextareaRef.current && aiGeneratedText) {
      messageTextareaRef.current.value = aiGeneratedText;
      setShowAiModal(false);
      setAiPrompt("");
      setAiGeneratedText("");
      toast.success("AI draft inserted!");
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          {/* IMPORTANT: Make sure this path matches your video file in the /public/videos folder */}
          <source src="/videos/contact.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      {/* Foreground Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow flex items-center justify-center py-24">
          <div className="container mx-auto px-4">
            {/* Glassmorphism Form Container */}
            <div className="max-w-3xl mx-auto bg-black/40 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Get In Touch
                </h1>
                <p className="text-lg text-gray-300">
                  Ready to experience AI-powered web development? Let's create something amazing together.
                </p>
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">
                      Name*
                    </label>
                    <input
                      type="text"
                      name="Name"
                      className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors duration-300"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-semibold mb-2">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      name="Email"
                      className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-gray-300 font-semibold mb-2">
                    Message*
                  </label>
                  <textarea
                    ref={messageTextareaRef}
                    name="Message"
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors duration-300 resize-none"
                    placeholder="Got a query or innovative idea? Let's talk..."
                    required
                  ></textarea>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
                  {isAiLimitReached ? (
                    <button
                      type="button"
                      className="button-ai opacity-50 cursor-not-allowed"
                      disabled
                      title={getRemainingTimeText()}
                    >
                      Limit Exceeded • {getRemainingTimeText()}
                      <div className="star-1"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                      <div className="star-2"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                      <div className="star-3"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                      <div className="star-4"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                      <div className="star-5"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                      <div className="star-6"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                    </button>
                  ) : (
                    <button type="button" className="button-ai" onClick={() => setShowAiModal(true)}>
                      Draft with AI ({MAX_AI_DRAFTS - aiUsageCount} left)
                      {/* The star SVGs are kept as they are */}
                      <div className="star-1"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                      <div className="star-2"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                      <div className="star-3"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                      <div className="star-4"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                      <div className="star-5"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                      <div className="star-6"><svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" version="1.1" viewBox="0 0 784.11 815.53"><path className="fil0" d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"></path></svg></div>
                    </button>
                  )}
                  <button type="submit" className="button-submit">
                    <div className="svg-wrapper-1"><div className="svg-wrapper"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path></svg></div></div>
                    <span>Submit</span>
                  </button>
                </div>
              </form>

              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  className={`Btn whatsapp ${activeButton === 0 ? "expanded" : ""}`}
                  onClick={() => handleButtonClick("https://wa.me/918332010304?text=Hi%20I%20would%20like%20to%20know%20more", 0)}
                >
                  <div className="sign"><svg viewBox="0 0 16 16"><path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"></path></svg></div>
                  <div className="text">Whatsapp</div>
                </button>
                <button
                  className={`Btn instagram ${activeButton === 1 ? "expanded" : ""}`}
                  onClick={() => handleButtonClick("https://www.instagram.com/smartgenaiinnovations?igsh=NTduNHRpaGcybHl1", 1)}
                >
                  <div className="sign"><svg viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path></svg></div>
                  <div className="text">Instagram</div>
                </button>
                <button
                  className={`Btn linkedin ${activeButton === 2 ? "expanded" : ""}`}
                  onClick={() => handleButtonClick("https://www.linkedin.com/company/smartgenai-innovations/", 2)}
                >
                  <div className="sign"><svg viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg></div>
                  <div className="text">LinkedIn</div>
                </button>
              </div>

            </div>
          </div>
        </main>

        <Footer />
      </div>

      {/* AI Draft Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-gray-900/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10">
            {/* Close button */}
            <button
              onClick={() => {
                setShowAiModal(false);
                setAiPrompt("");
                setAiGeneratedText("");
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">✨ Draft with AI</h2>
            <p className="text-gray-400 text-sm mb-4">
              Tell the AI what you want to inquire about, and it will draft a message for you.
            </p>

            {/* Prompt Input */}
            <div className="mb-4">
              <label className="block text-gray-300 font-medium mb-2">
                What would you like to ask about?
              </label>
              <input
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="e.g., AI integration for my business, custom website development..."
                className="w-full px-4 py-3 bg-white/10 text-white border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !isGenerating) {
                    handleGenerateAiDraft();
                  }
                }}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerateAiDraft}
              disabled={isGenerating}
              className="w-full py-3 mb-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                  Generate Draft
                </>
              )}
            </button>

            {/* Generated Text Preview */}
            {aiGeneratedText && (
              <div className="mb-4">
                <label className="block text-gray-300 font-medium mb-2">
                  Generated Draft:
                </label>
                <div className="p-4 bg-white/5 border border-white/10 rounded-lg max-h-48 overflow-y-auto">
                  <p className="text-gray-200 whitespace-pre-wrap text-sm">
                    {aiGeneratedText}
                  </p>
                </div>
              </div>
            )}

            {/* Insert Button */}
            {aiGeneratedText && (
              <button
                onClick={handleInsertAiDraft}
                className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Insert Draft
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;

