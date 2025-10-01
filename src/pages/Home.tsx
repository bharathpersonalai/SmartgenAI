import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FallingText from '../components/FallingText'; 
import { motion } from 'framer-motion';
import SplineScene from '../components/SplineScene';

const Home = () => {
  return (
    <div>
      {/* 1. The Spline background is now permanent for all devices. */}
      <SplineScene className="fixed top-0 left-0 w-full h-full z-[-1]" />

      {/* 2. All of your page content goes inside this main container. */}
      <main className="relative z-10">
        <Header />
        
        {/* Welcome Section (Hero) */}
        <section
          id="home"
          className="relative pt-32 pb-16 text-white overflow-visible"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
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
                <div key={index} className="flip-card h-64">
                  <div className="flip-card-inner">
                    <div className="flip-card-front bg-white bg-opacity-80 backdrop-blur-sm">
                      <h3 className="text-2xl font-semibold text-gray-900">
                        {service.title}
                      </h3>
                      <p className="mt-4 text-gray-600">Tap here to see more</p>
                    </div>
                    <div className="flip-card-back bg-gradient-to-br from-blue-500 to-purple-600">
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

