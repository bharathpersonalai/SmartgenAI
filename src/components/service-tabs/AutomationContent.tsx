import React from 'react';
import { motion, Variants } from 'framer-motion';

const AutomationContent = () => {
  // Animation settings for elements that fade in when scrolled into view
  const scrollAnimation: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
  };

  // A container to stagger the animations of the images
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Each image will animate 0.4s after the previous one
      },
    },
  };

  return (
    <div className="text-white text-center">
      {/* 1. Service Definition (no changes) */}
      <h3 className="text-2xl font-bold mb-2">AI Automation Tools</h3>
      <p className="text-gray-300 max-w-md mx-auto">
        Automate daily tasks, reduce manual work, and increase productivity. Coming soon to propel your business forward!
      </p>
      
      <div className="text-sm text-gray-400 mt-8 animate-pulse">
        ↓ Scroll Down to See Examples ↓
      </div>

      {/* 2. Animated Image Mockups */}
      {/* This 'motion.div' is the parent container for the staggering animation */}
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
              src="/images/automate-1.png"
              alt="Automation Example 1"
              className="rounded-lg border border-white/10 shadow-lg"
            />
        </motion.div>

        {/* Image 2 */}
        <motion.div variants={scrollAnimation}>
           <img
              src="/images/automate-2.png"
              alt="Automation Example 2"
              className="rounded-lg border border-white/10 shadow-lg"
            />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AutomationContent;

