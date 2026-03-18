import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ParticlesBackground from "../components/ParticlesBackground";
import AdvoDraftShowcase from "../components/AdvoDraftShowcase";

const Projects = () => {
  // Force scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen">
      <ParticlesBackground
        className="fixed top-0 left-0 w-full h-full z-0"
        particleCount={2500}
        particleBaseSize={80}
        moveParticlesOnHover={true}
      />

      <Header />

      <main className="relative z-10 pt-20">
        <div className="container mx-auto px-4 text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our latest innovations and AI-powered solutions that are transforming industries.
          </p>
        </div>

        <AdvoDraftShowcase />
        
        {/* You can add more projects here in the future */}
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
