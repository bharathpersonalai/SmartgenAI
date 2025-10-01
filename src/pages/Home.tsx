import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FallingText from '../components/FallingText'; 
import { motion } from 'framer-motion';
import SplineScene from '../components/SplineScene';
import { useMediaQuery } from '../hooks/useMediaQuery'; // 1. Import the new hook

const Home = () => {
  // 2. Check if the screen is desktop-sized (768px is a standard breakpoint)
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div>
      {/* 3. This block now conditionally renders the background */}
      {isDesktop ? (
        // On DESKTOP, render the 3D Spline scene
        <SplineScene className="fixed top-0 left-0 w-full h-full z-[-1]" />
      ) : (
        // On MOBILE, render a lightweight and smooth gradient
        <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-gradient-to-br from-gray-900 via-purple-900 to-slate-900" />
      )}

      {/* The rest of your page content remains the same */}
      <main className="relative z-10">
        <Header />
        
        <section
          id="home"
          className="relative pt-20 pb-16 text-white overflow-visible"
        >
          <div className="container mx-auto px-4 py-16">
            <div className="text-center max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
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
          </div>
        </section>

        <section id="services" className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-block bg-gray-900 bg-opacity-50 backdrop-blur-sm rounded-lg p-4">
                <h2 className="text-4xl font-bold text-white mb-4">
                  AI-Driven Services
                </h2>
                <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                  Powered by artificial intelligence to deliver superior results
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Custom Websites",
                  description: "We build websites that are fast, modern, and can adjust to your customer’s needs. They give a personal touch, making every visitor feel connected to your business.",
                },
                {
                  title: "Smart Web Applications",
                  description: "Not just websites, but powerful online platforms where people can interact like booking systems, dashboards, or customer portals. Built to make your business run smoother and serve customers better.",
                },
                {
                  title: "AI Automation Tools (Coming Soon 🚀)",
                  description: "We are testing powerful AI tools that will soon help businesses automate daily tasks, reduce manual work, and increase productivity. Stay tuned for launch!",
                },
              ].map((service, index) => (
                <div key={index} className="flip-card bg-white bg-opacity-80 backdrop-blur-sm rounded-lg shadow-lg">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {service.title}
                      </h3>
                      <p className="mt-4 text-gray-500">Tap here to see more</p>
                    </div>
                    <div className="flip-card-back">
                      <p className="text-white">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <Footer />
      </main>
    </div>
  );
};

export default Home;

