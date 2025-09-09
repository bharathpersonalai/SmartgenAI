// src/pages/About.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom"; // Import Link

const About = () => {
  return (
    <div>
      <Header />
      {/* 5. About Section (Vision) with Video Background */}
      <section
        id="about"
        className="relative py-24 text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/about3.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-8">Why Choose Us?</h2>
            <p className="text-xl text-gray-200 leading-relaxed mb-8">
              SmartgenAI Innovations combines AI-driven web development with
              top-tier security to deliver websites that exceed your
              business's needs. Our intelligent solutions ensure a seamless
              user experience, SEO and GEO optimization, and high conversion
              rates, while robust security protects your data at every
              stage. Whether you’re a startup or an established brand, we
              create secure, scalable websites that grow with your business.
            </p>
            {/* The button is now a Link component to the AboutFounderPage */}
            <Link
              to="/about-founder"
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors"
            >
              About the Founder
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;