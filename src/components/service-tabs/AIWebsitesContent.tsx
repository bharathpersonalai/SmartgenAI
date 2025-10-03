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

  // Stagger animation for the parent container
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Each child will animate 0.4s after the previous one
      },
    },
  };

  return (
    <div className="text-white text-center">
      {/* 1. Service Definition */}
      <h3 className="text-2xl font-bold mb-2">AI-Powered Custom Websites</h3>
      <p className="text-gray-300 max-w-md mx-auto">
        We build fast, modern websites that adapt to your customers, creating a personal connection with every visitor.
      </p>
      
      <div className="text-sm text-gray-400 mt-8 animate-pulse">
        ↓ Scroll Down to See Examples ↓
      </div>

      {/* 2. This is the new parent container for both images */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="mt-12 w-full max-w-md mx-auto space-y-8"
      >
        {/* Image 1 */}
        <motion.div variants={scrollAnimation}>
          <img
            src="/images/ai-website.png"
            alt="AI Powered Website Example"
            // ** THE SIZING FIX IS HERE **
            className="w-full h-auto rounded-lg border border-white/10"
          />
        </motion.div>

        {/* Image 2 */}
        <motion.div variants={scrollAnimation}>
           <img
              src="/images/ai-2.png"
              alt="AI Website Example 2"
              // ** THE SIZING FIX IS HERE **
              className="w-full h-auto rounded-lg border border-white/10 shadow-lg"
            />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AIWebsitesContent;

