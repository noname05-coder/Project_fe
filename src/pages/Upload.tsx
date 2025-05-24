import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Github, Link, Upload, Sparkles, Code, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const UploadPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDev = location.pathname === "/dev-interview";
  const isML = location.pathname === "/ml-interview";
  
  const [formData, setFormData] = useState({
    githubLink: "",
    projectDescription: "",
    liveLink: "",
    mlDescription: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Here you would typically validate and process the form data
    navigate("/interview");
  };

  const getThemeConfig = () => {
    if (isDev) {
      return {
        title: "Developer Interview",
        subtitle: "Web / Android / iOS Development",
        gradientFrom: "from-yellow-500",
        gradientTo: "to-orange-500",
        bgGradient: "from-yellow-900/20 via-black to-orange-900/20",
        accentColor: "yellow-400",
        borderColor: "yellow-500/20",
        icon: Code
      };
    } else if (isML) {
      return {
        title: "Machine Learning Interview", 
        subtitle: "AI/ML & Data Science",
        gradientFrom: "from-amber-500",
        gradientTo: "to-yellow-500",
        bgGradient: "from-amber-900/20 via-black to-yellow-900/20",
        accentColor: "amber-400",
        borderColor: "amber-500/20",
        icon: Brain
      };
    }
    return {
      title: "Technical Interview",
      subtitle: "Project Details",
      gradientFrom: "from-yellow-500",
      gradientTo: "to-orange-500",
      bgGradient: "from-yellow-900/20 via-black to-orange-900/20",
      accentColor: "yellow-400",
      borderColor: "yellow-500/20",
      icon: Code
    };
  };

  const theme = getThemeConfig();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Yellow/Amber ambient overlay */}
      <div className={`fixed inset-0 bg-gradient-to-br ${theme.bgGradient} pointer-events-none`} />
      
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-1 bg-${theme.accentColor}/20 rounded-full`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -120, 0],
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
          onClick={() => navigate("/choose-interview")}
          className="text-gray-300 hover:text-white hover:bg-gray-800/50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Selection
        </Button>
        
        <div className="flex items-center space-x-2">
          <div className={`w-8 h-8 bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} rounded-lg flex items-center justify-center`}>
            <theme.icon className="w-5 h-5 text-white" />
          </div>
          <span className={`text-xl font-bold bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} bg-clip-text text-transparent`}>
            {theme.title}
          </span>
        </div>
        
        <div className="w-32" /> {/* Spacer */}
      </motion.nav>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className={`inline-flex items-center px-4 py-2 bg-${theme.accentColor}/20 border border-${theme.borderColor} rounded-full text-sm text-${theme.accentColor} mb-6 backdrop-blur-sm`}>
              <Sparkles className="w-4 h-4 mr-2" />
              {theme.subtitle}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Tell Us About
              </span>
              <br />
              <span className={`bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} bg-clip-text text-transparent`}>
                Your {isDev ? "Project" : "ML Work"}
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-xl mx-auto">
              {isDev 
                ? "Share your development project details so we can conduct a comprehensive technical interview."
                : "Describe your machine learning project or experience for a tailored AI/ML interview."
              }
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-${theme.borderColor} rounded-3xl p-8`}
          >
            <div className="space-y-6">
              {isDev && (
                <>
                  {/* GitHub Repository */}
                  <div className="space-y-3">
                    <Label htmlFor="github" className="text-white flex items-center">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub Repository Link
                    </Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/username/repository"
                      value={formData.githubLink}
                      onChange={(e) => handleInputChange("githubLink", e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-500/50"
                    />
                  </div>

                  {/* Project Description */}
                  <div className="space-y-3">
                    <Label htmlFor="projectDesc" className="text-white flex items-center">
                      <Code className="w-4 h-4 mr-2" />
                      Project Description
                    </Label>
                    <Textarea
                      id="projectDesc"
                      placeholder="Describe your project: What does it do? What technologies did you use? What challenges did you face?"
                      rows={4}
                      value={formData.projectDescription}
                      onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-500/50 resize-none"
                    />
                  </div>

                  {/* Live Project Link */}
                  <div className="space-y-3">
                    <Label htmlFor="liveLink" className="text-white flex items-center">
                      <Link className="w-4 h-4 mr-2" />
                      Live Project Link (Optional)
                    </Label>
                    <Input
                      id="liveLink"
                      placeholder="https://your-project.com"
                      value={formData.liveLink}
                      onChange={(e) => handleInputChange("liveLink", e.target.value)}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-500/50"
                    />
                  </div>
                </>
              )}

              {isML && (
                <div className="space-y-3">
                  <Label htmlFor="mlDesc" className="text-white flex items-center">
                    <Brain className="w-4 h-4 mr-2" />
                    ML Project Description
                  </Label>
                  <Textarea
                    id="mlDesc"
                    placeholder="Describe your ML project or experience: What problem did you solve? What algorithms/models did you use? What was your approach to data preprocessing? What were the results?"
                    rows={6}
                    value={formData.mlDescription}
                    onChange={(e) => handleInputChange("mlDescription", e.target.value)}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-amber-500/50 resize-none"
                  />
                </div>
              )}
            </div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`mt-8 p-4 bg-${theme.accentColor}/10 border border-${theme.borderColor} rounded-xl`}
            >
              <h3 className={`text-${theme.accentColor} font-medium mb-2`}>💡 Tips for a great interview:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                {isDev ? (
                  <>
                    <li>• Include specific technologies, frameworks, and tools used</li>
                    <li>• Mention any interesting challenges you overcame</li>
                    <li>• Describe the project's impact or what you learned</li>
                  </>
                ) : (
                  <>
                    <li>• Explain your data collection and preprocessing approach</li>
                    <li>• Mention specific algorithms, metrics, and validation methods</li>
                    <li>• Describe the business impact or practical applications</li>
                  </>
                )}
              </ul>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <Button
                onClick={handleSubmit}
                size="lg"
                className={`w-full bg-gradient-to-r ${theme.gradientFrom} ${theme.gradientTo} hover:from-gray-700 hover:to-gray-600 border-0 text-black font-semibold py-4 rounded-xl transition-all duration-300 group`}
                disabled={isDev ? !formData.githubLink && !formData.projectDescription : !formData.mlDescription}
              >
                Start Interview
                <motion.div
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default UploadPage;
