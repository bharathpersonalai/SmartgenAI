import React from 'react';
import { motion, Variants } from 'framer-motion'; 

const AIWebsitesContent = () => {
  const scrollAnimation: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  };

  return (
    <div className="text-white text-center">
      {/* 1. Service Definition (no changes) */}
      <h3 className="text-2xl font-bold mb-2">AI-Powered Custom Websites</h3>
      <p className="text-gray-300 max-w-md mx-auto">
        We build fast, modern websites that adapt to your customers, creating a personal connection with every visitor.
      </p>
      
      <div className="text-sm text-gray-400 mt-8 animate-pulse">
        ↓ Scroll Down to See an Example ↓
      </div>

      {/* 2. Animated Image Mockup */}
      {/* This section is updated to use your PNG image */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollAnimation}
        className="mt-12 w-full max-w-md mx-auto rounded-lg shadow-lg"
      >
        <img
          src="/images/ai-website.png" // The path to your new image
          alt="AI Powered Website Example"
          className="rounded-lg border border-white/10"
        />
      </motion.div>
    </div>
  );
};

export default AIWebsitesContent;

