// src/pages/Home.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      
      {/* 1. Welcome Section (Hero) */}
      <section
        id="home"
        className="relative pt-20 pb-16 text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/intro_video2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto px-4 py-8 sm:py-12 md:py-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Beyond Automation{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                True Innovation
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              From custom web applications to intelligent automation, we
              provide the tools your business needs to lead the future
            </p>
          </div>
        </div>
      </section>

      {/* 2. Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Driven Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powered by artificial intelligence to deliver superior results
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Custom Websites",
                description:
                  "We build websites that are fast, modern, and can adjust to your customer’s needs. They give a personal touch, making every visitor feel connected to your business.",
              },
              {
                title: "Smart Web Applications",
                description:
                  "Not just websites, but powerful online platforms where people can interact like booking systems, dashboards, or customer portals. Built to make your business run smoother and serve customers better.",
              },
              {
                title: "AI Automation Tools (Coming Soon 🚀)",
                description:
                  "We are testing powerful AI tools that will soon help businesses automate daily tasks, reduce manual work, and increase productivity. Stay tuned for launch!",
              },
            ].map((service, index) => (
              <div key={index} className="flip-card">
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
    </div>
  );
};

export default Home;