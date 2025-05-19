
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface WelcomeSectionProps {
  onStart: () => void;
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ onStart }) => {
  return (
    <section className="flex-1 flex items-center">
      <div className="container grid md:grid-cols-2 gap-12 py-12">
        <div className="flex flex-col justify-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Simulate Real Interviews with <span className="gradient-heading">Your Projects</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-slate-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Upload your technical projects and get AI-powered interview practice with 
            project-specific questions, HR inquiries, and challenging follow-ups.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              className="btn-primary" 
              size="lg"
              onClick={onStart}
            >
              Start Interview
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={onStart}
            >
              Upload Project
            </Button>
          </motion.div>
          <motion.div 
            className="mt-8 flex items-center gap-2" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-xs font-medium text-slate-600">
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <p className="text-sm text-slate-600">
              <span className="font-semibold">2,500+</span> interviews simulated this week
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative w-full max-w-md">
            <div className="absolute -top-6 -left-6 w-full h-full rounded-2xl border border-slate-200 bg-white/50"></div>
            <div className="absolute -bottom-6 -right-6 w-full h-full rounded-2xl border border-slate-200 bg-white/50"></div>
            <div className="relative bg-white shadow-lg rounded-2xl overflow-hidden aspect-[4/3]">
              <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-900 opacity-90"></div>
              <div className="relative h-full p-8 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-white font-medium">Technical Interview</div>
                  <div className="bg-white/20 text-white text-sm px-3 py-1 rounded-full">Live</div>
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-4">
                    <p className="text-white text-sm">
                      Can you explain the architecture of your project and why you chose those specific technologies?
                    </p>
                    <div className="mt-2 waveform">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i} 
                          className="waveform-bar" 
                          style={{ 
                            height: `${Math.random() * 1.5 + 0.5}rem`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg self-end max-w-[80%]">
                    <p className="text-white/80 text-sm">
                      My project uses a microservices architecture...
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-white/70 text-sm">15:45 remaining</div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 19V5"></path><polyline points="5 12 12 5 19 12"></polyline>
                      </svg>
                    </button>
                    <button className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                        <line x1="12" x2="12" y1="19" y2="22"></line>
                      </svg>
                    </button>
                    <button className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"></path><path d="M12 5v14"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeSection;
