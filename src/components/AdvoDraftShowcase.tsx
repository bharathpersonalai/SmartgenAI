import { motion, Variants } from 'framer-motion';
import { ExternalLink, CheckCircle2, Shield, Scale, Zap } from 'lucide-react';

const AdvoDraftShowcase = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as any },
    },
  };

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      title: "AI Analysis",
      description: "Automated case document review and fact extraction."
    },
    {
      icon: <Scale className="w-5 h-5 text-purple-400" />,
      title: "Legal Drafting",
      description: "Generate arguments and counter-arguments instantly."
    },
    {
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      title: "New Laws Support",
      description: "Fully compliant with BNS, BNSS, and BSA."
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-purple-400" />,
      title: "Cross-Exam",
      description: "Intelligent planning for effective witness examination."
    }
  ];

  return (
    <section id="advodraft" className="relative py-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full z-0" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="flex flex-col lg:flex-row items-center gap-16"
        >
          {/* Text Content */}
          <div className="flex-1 text-left">
            <motion.div variants={itemVariants} className="mb-6">
              <img 
                src="/images/logofull.jpg" 
                alt="AdvoDraft Logo" 
                className="h-12 md:h-16 w-auto object-contain rounded-lg bg-white/5 p-2 border border-white/10"
              />
            </motion.div>
            
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              AdvoDraft: The Future of <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Legal Intelligence
              </span>
            </motion.h2>
            
            <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-8 max-w-xl">
              India's #1 AI-powered legal analysis platform. Transform how you prepare for cases with automated document review, 
              fact extraction, and structured argument generation.
            </motion.p>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="mt-1 p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-blue-500/50 transition-colors duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <a 
                href="https://advodraft.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 group"
              >
                <span>Visit AdvoDraft.com</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>
          
          {/* Mockup Image */}
          <div className="flex-1 relative">
            <motion.div 
              variants={itemVariants}
              className="relative z-10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <img 
                src="/images/dashboard.png" 
                alt="AdvoDraft Real Dashboard" 
                className="w-full h-auto"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
            </motion.div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AdvoDraftShowcase;
