import React from 'react';
import { motion, Variants } from 'framer-motion'; 

const WebAppsContent = () => {
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
      <h3 className="text-2xl font-bold mb-2">Smart Web Applications</h3>
      <p className="text-gray-300 max-w-md mx-auto">
        Powerful platforms like booking systems or customer portals, built to streamline your business and better serve clients.
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
              src="/images/web-1.png"
              alt="Web Application Example 1"
              className="rounded-lg border border-white/10 shadow-lg"
            />
        </motion.div>

        {/* Image 2 */}
        <motion.div variants={scrollAnimation}>
           <img
              src="/images/web-2.png"
              alt="Web Application Example 2"
              className="rounded-lg border border-white/10 shadow-lg"
            />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WebAppsContent;

