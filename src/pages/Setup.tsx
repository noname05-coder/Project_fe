import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Code, Brain as MLIcon, Users, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Setup = () => {
  const navigate = useNavigate();

  const interviewTypes = [
    {
      id: "dev",
      title: "Web / Android / iOS",
      subtitle: "Developer Interview",
      description: "Technical questions on programming, frameworks, and project-based scenarios",
      icon: Code,
      path: "/dev-interview",
      gradient: "from-blue-500 to-cyan-500",
      hoverGradient: "from-blue-600 to-cyan-600",
      bgGradient: "from-blue-900/30 to-cyan-900/20"
    },
    {
      id: "ml",
      title: "Machine Learning",
      subtitle: "AI/ML Interview", 
      description: "Deep dive into algorithms, data science, and ML project discussions",
      icon: MLIcon,
      path: "/ml-interview",
      gradient: "from-emerald-500 to-teal-500",
      hoverGradient: "from-emerald-600 to-teal-600",
      bgGradient: "from-emerald-900/30 to-teal-900/20"
    },
    {
      id: "hr",
      title: "HR Interview",
      subtitle: "Behavioral Round",
      description: "Behavioral questions, company culture fit, and soft skills assessment",
      icon: Users,
      path: "/hr-interview",
      gradient: "from-purple-500 to-pink-500",
      hoverGradient: "from-purple-600 to-pink-600",
      bgGradient: "from-purple-900/30 to-pink-900/20"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Ambient background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/20 pointer-events-none" />
      
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <motion.nav 
        className="relative z-10 flex items-center justify-between p-6 lg:px-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="text-gray-300 hover:text-white hover:bg-gray-800/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            InterviewGenius
          </span>
        </div>
        
        <div className="w-24" /> {/* Spacer for center alignment */}
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-indigo-900/50 border border-indigo-500/30 rounded-full text-sm text-indigo-300 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Choose Your Interview Path
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-indigo-200 to-white bg-clip-text text-transparent">
              Select Interview
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Type
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the type of interview you want to practice. Each path is tailored with specific questions and scenarios.
          </p>
        </motion.div>

        {/* Interview Type Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {interviewTypes.map((type) => (
            <motion.div
              key={type.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                transition: { duration: 0.2 } 
              }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer"
              onClick={() => navigate(type.path)}
            >
              <div className={`relative bg-gradient-to-br ${type.bgGradient} backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 transition-all duration-300 group-hover:border-gray-600/80 overflow-hidden min-h-[400px] flex flex-col`}>
                {/* Background glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`relative w-16 h-16 bg-gradient-to-r ${type.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <type.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {type.title}
                  </h3>
                  <p className={`text-sm font-medium bg-gradient-to-r ${type.gradient} bg-clip-text text-transparent mb-4`}>
                    {type.subtitle}
                  </p>
                  <p className="text-gray-300 leading-relaxed flex-1 mb-6">
                    {type.description}
                  </p>

                  {/* Features list */}
                  <div className="space-y-2 mb-6">
                    {type.id === "dev" && (
                      <>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                          Coding challenges & algorithms
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                          System design questions
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3" />
                          Project deep-dive
                        </div>
                      </>
                    )}
                    {type.id === "ml" && (
                      <>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3" />
                          ML algorithms & theory
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3" />
                          Data science scenarios
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3" />
                          Model evaluation
                        </div>
                      </>
                    )}
                    {type.id === "hr" && (
                      <>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3" />
                          Behavioral questions
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3" />
                          Cultural fit assessment
                        </div>
                        <div className="flex items-center text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3" />
                          Situational scenarios
                        </div>
                      </>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Button
                    className={`w-full bg-gradient-to-r ${type.gradient} hover:from-gray-700 hover:to-gray-600 border-0 text-white font-medium py-3 rounded-xl transition-all duration-300 group-hover:shadow-lg`}
                  >
                    Start {type.subtitle}
                    <motion.div
                      className="ml-2"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      →
                    </motion.div>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Help Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-sm">
            Not sure which interview type to choose? Start with the one that matches your target role.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Setup;
