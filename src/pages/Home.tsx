import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FallingText from '../components/FallingText'; 
import { motion } from 'framer-motion';
import ParticlesBackground from '../components/ParticlesBackground';
import { BrowserCard } from '../components/BrowserCard';
import AIWebsitesContent from "../components/service-tabs/AIWebsitesContent";
import WebAppsContent from "../components/service-tabs/WebAppsContent";
import AutomationContent from "../components/service-tabs/AutomationContent";

const Home = () => {
  const services = [
    {
      title: "AI Powered Custom websites",
      content: <AIWebsitesContent />
    },
    {
      title: "Smart Web Applications",
      content: <WebAppsContent />
    },
    {
      title: "AI Automation tools",
      content: <AutomationContent />
    },
  ];

  return (
    <div className="bg-black">
      <ParticlesBackground 
        className="fixed top-0 left-0 w-full h-full z-0" 
        particleCount={800} 
        moveParticlesOnHover={true}
      />

      <Header />

      <main className="relative z-10">
        
        {/* ====================================================================== */}
        {/* THIS IS THE UPDATED HERO SECTION WITH THE FIX */}
        {/* It now takes up the full screen height and centers its content. */}
        {/* ====================================================================== */}
        <section
          id="home"
          className="min-h-screen flex items-center justify-center text-white text-center px-4"
        >
          <div> {/* This extra div is for the content inside the flex container */}
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Beyond Automation{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                True Innovation
              </span>
            </motion.h1>
            
            <div className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto min-h-[120px]">
              <FallingText
                trigger="click"
                fontSize="1.5rem"
                text="From custom web applications to intelligent automation, we provide the tools your business needs to lead the future"
                highlightWords={["custom", "websites", "intelligent", "automation", "tools"]}
                highlightClass="highlighted"
                gravity={0.4}
              />
            </div>
          </div>
        </section>

        {/* Services Section (no changes here) */}
        <section id="services" className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4 backdrop-blur-sm bg-black/20 rounded-md py-2 px-4 inline-block">
                AI-Driven Services
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto backdrop-blur-sm bg-black/20 rounded-md py-2 px-4">
                Powered by artificial intelligence to deliver superior results
              </p>
            </div>
            
            <div className="flex justify-center">
              <BrowserCard tabs={services} />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Home;

