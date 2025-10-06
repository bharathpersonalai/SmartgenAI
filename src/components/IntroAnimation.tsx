import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FallingText from "../components/FallingText";
import { motion } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";
import { BrowserCard } from "../components/BrowserCard";
import AIWebsitesContent from "../components/service-tabs/AIWebsitesContent";
import WebAppsContent from "../components/service-tabs/WebAppsContent";
import AutomationContent from "../components/service-tabs/AutomationContent";

const Home = () => {
  // Stable key for FallingText, changes only on page reload
  const fallingTextKeyRef = React.useRef(Date.now());

  // Force scroll to top on component mount/reload - iOS specific fix
  React.useEffect(() => {
    // Immediate scroll
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // iOS Safari sometimes needs a delayed scroll
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);

    // Additional delayed scroll for iOS
    const timer2 = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  const services = [
    {
      title: "AI Powered Custom websites",
      content: <AIWebsitesContent />,
    },
    {
      title: "Smart Web Applications",
      content: <WebAppsContent />,
    },
    {
      title: "AI Automation tools",
      content: <AutomationContent />,
    },
  ];

  return (
    <div className="bg-black">
      <a
        href="#home"
        className="sr-only focus:not-sr-only absolute top-2 left-2 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Skip to main content
      </a> {/* Skip link for accessibility */} 
      <ParticlesBackground
        className="fixed top-0 left-0 w-full h-full z-0"
        particleCount={1500}
        particleBaseSize={90}
        moveParticlesOnHover={true}
      />

      <Header /> 

      <main className="relative z-10 pt-30" aria-label="Homepage main content">
        {/* Hero Section */}
        <section
          id="home"
          className="relative text-white text-center px-4 py-24 sm:py-32" 
          aria-labelledby="hero-heading"
        >
          <motion.h1
            id="hero-heading"
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

          <div className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto h-[200px] sm:h-[180px] md:h-[160px] relative overflow-hidden">
            <FallingText
              key={fallingTextKeyRef.current} // Force remount on page load
              trigger="click"
              fontSize="1.5rem"
              text="From custom web applications to intelligent automation, we provide the tools your business needs to lead the future"
              highlightWords={[
                "custom",
                "websites",
                "intelligent",
                "automation",
                "tools",
              ]}
              highlightClass="highlighted"
              gravity={0.4}
            />
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2
                id="services-heading"
                className="text-4xl font-bold text-white mb-4 backdrop-blur-sm bg-black/20 rounded-md py-2 px-4 inline-block"
              >
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