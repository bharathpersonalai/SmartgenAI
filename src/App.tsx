import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Import your page components
import HomePage from "./pages/Home";
import ServicesPage from "./pages/Services";
import PricingPage from "./pages/Pricing";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";

function App() {
  const [stage, setStage] = useState("intro");
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleGiveAccess = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setStage("main");
    }
  };

  useEffect(() => {
    if (stage === "main") {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [stage]);

  // Render the intro animation first
  if (stage === "intro") {
    return (
      <div className="h-screen overflow-hidden relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 w-full h-full object-cover transform -translate-x-1/2 -translate-y-1/2"
        >
          <source src="/videos/Robot_Animation_Request_Fulfilled.mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 flex justify-center h-screen">
          <div className="text-center mt-[30rem]">
            <button
              onClick={handleGiveAccess}
              className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 text-white px-6 py-2 rounded-full text-lg font-bold hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 animate-fall-left-right"
              style={{ animationDelay: "1s" }}
            >
              Click Here
            </button>
          </div>
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }

  // Once the animation is complete, render the router and pages
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;