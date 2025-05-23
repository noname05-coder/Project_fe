import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface WelcomeSectionProps {
  onStart: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onStart }) => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100
      }
    }
  };

  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50 px-4">
      <motion.div 
        className="container py-12 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header with "No Experience Needed" */}
        <motion.div 
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-violet-600 tracking-wider font-medium text-sm uppercase mb-2">NO EXPERIENCE NEEDED</p>
        </motion.div>

        {/* Main Heading */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <motion.span 
              className="block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              AI-Powered Interview
            </motion.span>
            <motion.span 
              className="block text-gray-600"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Practice Made Simple
            </motion.span>
          </h1>
          <motion.p 
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Unlock the power of artificial intelligence to transform your projects into 
            personalized interview practice sessions effortlessly.
          </motion.p>
        </motion.div>

        {/* Main Feature Cards */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Card 1 */}
          <motion.div 
            className="rounded-xl overflow-hidden bg-black text-white p-8"
            variants={itemVariants}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <h3 className="text-2xl font-bold mb-4">Start Your Interview Practice</h3>
            <p className="mb-6">
              Craft compelling interview responses from your project descriptions, preparing you for real interviews.
            </p>
            <Button 
              className="bg-white text-black hover:bg-gray-200"
              onClick={onStart}
            >
              Get Started Now
            </Button>
          </motion.div>
          
          {/* Card 2 */}
          <motion.div 
            className="rounded-xl overflow-hidden bg-blue-50 p-8"
            variants={itemVariants}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <h3 className="text-2xl font-bold mb-4">Project-to-Interview Generator</h3>
            <p className="mb-6">
              Transform your project details into targeted interview questions and practice scenarios.
            </p>
            <Button 
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={onStart}
            >
              Try Your Project Now
            </Button>
          </motion.div>
          
          {/* Card 3 - Interview Preview */}
          <motion.div 
            className="rounded-xl overflow-hidden relative"
            variants={itemVariants}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 to-purple-900 opacity-90"></div>
            <div className="relative h-full p-8 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="text-white font-medium">Project Interview</div>
                <div className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">Live</div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg mb-3">
                  <p className="text-white text-sm">
                    Tell me about the challenges you faced during this project implementation?
                  </p>
                  <motion.div 
                    className="mt-2 flex gap-1"
                    animate={{ 
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                    }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div 
                        key={i} 
                        className="w-1 bg-white/70 rounded-full" 
                        style={{ 
                          height: `${Math.random() * 1.5 + 0.5}rem`,
                        }}
                        animate={{ 
                          height: `${Math.random() * 1.5 + 0.5}rem`,
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 0.8 + (i * 0.1), 
                          repeatType: 'reverse' 
                        }}
                      ></motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
              
              <Button 
                className="w-full bg-white/10 hover:bg-white/20 text-white"
                onClick={onStart}
              >
                Try OpenDeo Now
              </Button>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Features Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className="flex items-center mb-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
            <h2 className="text-lg uppercase font-semibold">KEY FEATURES</h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.5, staggerChildren: 0.2 }}
          >
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold mb-2">Project-to-Interview Conversion</h3>
              <p className="text-gray-600">
                Transform your code repositories into tailored interview questions and scenarios.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold mb-2">Voice Integration</h3>
              <p className="text-gray-600">
                Practice speaking about your projects with AI-powered voice prompts and feedback.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-semibold mb-2">Customizable Templates</h3>
              <p className="text-gray-600">
                Choose from various interview styles including technical, behavioral, and system design.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Stats Section */}
        <motion.div 
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <motion.div 
            className="bg-white rounded-xl p-6 flex items-center"
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="bg-amber-100 p-4 rounded-lg mr-4"
              whileHover={{ rotate: 10 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </motion.div>
            <div>
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                10,000+
              </motion.div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white rounded-xl p-6 flex items-center"
            whileHover={{ 
              scale: 1.03, 
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
            }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              className="bg-green-100 p-4 rounded-lg mr-4"
              whileHover={{ rotate: 10 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </motion.div>
            <div>
              <motion.div 
                className="text-2xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                98.5%
              </motion.div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WelcomeSection;
