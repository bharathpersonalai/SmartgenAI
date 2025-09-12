// src/pages/Services.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Services = () => {
  return (
    <div>
      <Header />
      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
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
      {/* ======================================================= */}
      {/* == START: Updated "Technology Stack" Section == */}
      {/* ======================================================= */}
      <section id="tech-stack" className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12 px-4">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Engineered with Generative AI for Scalable, Powerful Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our solutions harness generative AI to deliver high-performance,
              innovative, and scalable technology tailored to your business
              needs.
            </p>
          </div>

          <div className="tech-marquee">
            <div className="tech-marquee__inner">
              {/* Data is now an array of objects with your specific logos */}
              {[
                { name: "ChatGPT", logoUrl: "/images/Chatgpt.png" },
                { name: "Gemini", logoUrl: "/images/Gemini.png" },
                { name: "Canva", logoUrl: "/images/canva.png" },
                { name: "GitHub", logoUrl: "/images/Github.png" },
                { name: "Uiverse", logoUrl: "/images/Uiverse.png" },
                { name: "Netlify", logoUrl: "/images/Netlify.png" },
                { name: "Lovable", logoUrl: "/images/Lovable.png" },
                { name: "Claude", logoUrl: "/images/Claude.png" },
                { name: "VS Code", logoUrl: "/images/VS code.png" },
                { name: "Perplexity", logoUrl: "/images/Perplexity.png" },
              ]
                .concat(
                  // Duplicate the array for a seamless loop
                  [
                    { name: "ChatGPT", logoUrl: "/images/Chatgpt.png" },
                    { name: "Gemini", logoUrl: "/images/Gemini.png" },
                    { name: "Canva", logoUrl: "/images/canva.png" },
                    { name: "GitHub", logoUrl: "/images/Github.png" },
                    { name: "Uiverse", logoUrl: "/images/Uiverse.png" },
                    { name: "Netlify", logoUrl: "/images/Netlify.png" },
                    { name: "Lovable", logoUrl: "/images/Lovable.png" },
                    { name: "Claude", logoUrl: "/images/Claude.png" },
                    { name: "VS Code", logoUrl: "/images/VS code.png" },
                    { name: "Perplexity", logoUrl: "/images/Perplexity.png" },
                  ]
                )
                .map((tool, index) => (
                  <div key={index} className="tech-marquee__group">
                    <div className="tech-marquee__item">
                      <img src={tool.logoUrl} alt={`${tool.name} logo`} />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
      {/* ======================================================= */}
      {/* == END: Updated "Technology Stack" Section == */}
      {/* ======================================================= */}
      <Footer />
    </div>
  );
};

export default Services;
