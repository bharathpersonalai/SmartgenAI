import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Globe,
  Smartphone,
  Zap,
  Search,
  Star,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Bot,
  Cpu,
  BrainCircuit as Circuit,
  Sparkles,
} from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [stage, setStage] = useState("intro");

  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

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
          <source
            src="/videos/Robot_Animation_Request_Fulfilled.mp4"
            type="video/mp4"
          />
        </video>
        <div className="relative z-10 flex justify-center h-screen">
          <div className="text-center mt-96">
            <button
              onClick={handleGiveAccess}
              className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 text-white px-12 py-4 rounded-full text-xl font-bold hover:from-cyan-400 hover:via-blue-500 hover:to-purple-600 transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 animate-fade-in-up animate-pulse"
              style={{ animationDelay: "1s" }}
            >
              Give Access
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

  return (
    <div className="min-h-screen bg-white animate-fade-in">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
          <div className="px-2 h-[4.5rem]">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center">
              <img
                src="/images/logo5.png"
                alt="SmartgenAI Innovations Logo"
                className="w-[16rem] h-[16rem]"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              {["Home", "Services", "Pricing", "About", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    {item}
                  </button>
                )
              )}
            </nav>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4">
              {["Home", "Services", "Pricing", "About", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                  >
                    {item}
                  </button>
                )
              )}
            </nav>
          )}
        </div>
      </header>

      {/* 1. Welcome Section (Hero) */}
      <section
        id="home"
        className="relative pt-20 pb-16 text-white overflow-hidden"
      >
        {/* Background Video and Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            {/* Make sure to replace 'hero-video.mp4' with your actual filename */}
            <source src="/videos/intro_video2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-4xl mx-auto p-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Beyond Automation{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                True Innovation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              From custom web applications to intelligent automation, we provide
              the tools your business needs to lead the future
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Bot,
                title: "AI-Powered Custom Websites",
                description:
                  "Intelligent websites that learn and adapt to your users behavior and preferences.",
              },
              {
                icon: Cpu,
                title: "Smart Web Applications",
                description:
                  "Advanced web apps with AI features like chatbots, recommendations, and automation.",
              },
              {
                icon: Smartphone,
                title: "Responsive AI Design",
                description:
                  "AI-optimized responsive designs that automatically adjust for perfect user experience.",
              },
              {
                icon: Search,
                title: "AI SEO Optimization",
                description:
                  "Machine learning algorithms optimize your content for maximum search visibility.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Pricing Section */}
      <section id="pricing" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Revolutionary AI technology at unbeatable prices
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "AI Standard",
                price: "₹999",
                originalPrice: "₹5,000",
                features: [
                  "Up to 5 pages (Home, Services, Gallery, About, Contact)",
                  "Responsive design (mobile + tablet + desktop)",
                  "SEO Setup (meta tags, titles, alt text)",
                  "Social Media Links Integration",
                  "Website Maintenance",
                ],
              },
              {
                name: "AI Professional",
                price: "₹3,000",
                originalPrice: "₹8,000",
                features: [
                  "AI Multi-Page Website",
                  "Advanced AI Design",
                  "Smart SEO Optimization",
                  "90 Days AI Support",
                  "AI Contact Forms",
                  "Social Media AI Integration",
                ],
                popular: true,
              },
              {
                name: "AI Enterprise",
                price: "Contact for custom pricing",
                originalPrice: null,
                features: [
                  "Custom AI Web Application",
                  "Advanced AI Features",
                  "AI Database Integration",
                  "1 Year AI Support",
                  "AI Admin Dashboard",
                  "AI Payment Gateway",
                ],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ${
                  plan.popular
                    ? "ring-2 ring-blue-600"
                    : "border border-gray-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-4 h-4 mr-1" />
                      AI Powered
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-blue-600">
                      {plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="ml-2 text-lg text-gray-400 line-through">
                        {plan.originalPrice}
                      </span>
                    )}
                  </div>
                  {plan.originalPrice && (
                    <span className="text-green-600 text-sm font-semibold">
                      80% OFF
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                    plan.popular
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Order Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Contact Section */}
      <section
        id="contact"
        className="py-16 bg-gradient-to-br from-blue-50 to-purple-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to experience AI-powered web development? Let's create
              something amazing together.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <form className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  placeholder="Tell us about your AI-powered project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
            <div className="flex justify-center space-x-6 mt-8">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-gray-600 hover:text-blue-600"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. About Section (Vision) */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Our Vision
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              At SmartgenAI Innovations, we harness the power of artificial
              intelligence to create stunning, high-performance websites that
              adapt and evolve with your business needs. Our AI-driven approach
              ensures every website is optimized for user experience, search
              engines, and conversion rates.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe that AI-powered web development is the future, enabling
              us to deliver personalized, intelligent websites that not only
              look beautiful but also think smart, helping your customers find
              exactly what they need, when they need it.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-lg font-bold">
                  SmartgenAI Innovations
                </span>
              </div>
              <p className="text-gray-400">
                Pioneering AI-driven web development for the future.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                {["Home", "Services", "Pricing", "About", "Contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Made with ❤️ in India
              </h3>
              <p className="text-gray-400">
                Bringing AI innovation to businesses worldwide.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">
              Copyright © 2025 SmartgenAI Innovations. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
