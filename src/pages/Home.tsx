import React, { useState } from "react";
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

  // State to track if motion effects are enabled
  const [motionEnabled, setMotionEnabled] = useState(false);

  // Function to request permission for motion events
  const handleEnableMotion = () => {
    if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
      (DeviceMotionEvent as any).requestPermission()
        .then((permissionState: string) => {
          if (permissionState === 'granted') {
            setMotionEnabled(true);
          }
        })
        .catch(console.error);
    } else {
      setMotionEnabled(true);
    }
  };

  return (
    <div className="bg-black">
      <ParticlesBackground 
        className="fixed top-0 left-0 w-full h-full z-0" 
        particleCount={800} 
        moveParticlesOnHover={true}
        motionEnabled={motionEnabled} // Pass the state to the component
      />

      <Header />

      <main className="relative z-10 pt-28">
        
        {/* Hero Section */}
        <section
          id="home"
          className="relative text-white text-center px-4 py-16 sm:py-24"
        >
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
        </section>

        {/* Services Section */}
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

      {/* Motion Enable Button - Only on mobile and if not already enabled */}
      {!motionEnabled && (
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
          <button 
            onClick={handleEnableMotion}
            className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm border border-white/20"
          >
            Enable Motion Effects
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

