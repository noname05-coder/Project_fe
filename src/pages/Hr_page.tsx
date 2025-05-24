
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Briefcase, Building, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const Hr_page = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    experience: "",
    company: "",
    jobDescription: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    navigate("/interview");
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Yellow ambient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-yellow-900/20 via-black to-amber-900/20 pointer-events-none" />
      
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/20 rounded-full"
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
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
            HR Interview
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
            <div className="inline-flex items-center px-4 py-2 bg-yellow-400/20 border border-yellow-500/20 rounded-full text-sm text-yellow-400 mb-6 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Behavioral Round
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                Your Professional
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                Background
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-xl mx-auto">
              Help us understand your background so we can tailor the HR interview to your experience and target role.
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-yellow-500/20 rounded-3xl p-8"
          >
            <div className="space-y-6">
              {/* Name */}
              <div className="space-y-3">
                <Label htmlFor="name" className="text-white flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-500/50"
                />
              </div>

              {/* Role */}
              <div className="space-y-3">
                <Label htmlFor="role" className="text-white flex items-center">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Target Role
                </Label>
                <Input
                  id="role"
                  placeholder="e.g., Software Engineer, Product Manager, Data Scientist"
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-500/50"
                />
              </div>

              {/* Experience */}
              <div className="space-y-3">
                <Label htmlFor="experience" className="text-white flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Years of Experience
                </Label>
                <Input
                  id="experience"
                  placeholder="e.g., 3 years, Entry level, 5+ years"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-500/50"
                />
              </div>

              {/* Company */}
              <div className="space-y-3">
                <Label htmlFor="company" className="text-white flex items-center">
                  <Building className="w-4 h-4 mr-2" />
                  Company Applying To
                </Label>
                <Input
                  id="company"
                  placeholder="e.g., Google, Microsoft, Startup, etc."
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-500/50"
                />
              </div>

              {/* Job Description */}
              <div className="space-y-3">
                <Label htmlFor="jobDesc" className="text-white flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Job Description (Optional)
                </Label>
                <Textarea
                  id="jobDesc"
                  placeholder="Paste the job description or key requirements for better tailored questions..."
                  rows={4}
                  value={formData.jobDescription}
                  onChange={(e) => handleInputChange("jobDescription", e.target.value)}
                  className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-500/50 resize-none"
                />
              </div>
            </div>

            {/* Tips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 p-4 bg-yellow-400/10 border border-yellow-500/20 rounded-xl"
            >
              <h3 className="text-yellow-400 font-medium mb-2">💡 HR Interview Tips:</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Use the STAR method (Situation, Task, Action, Result) for behavioral questions</li>
                <li>• Prepare specific examples that showcase your skills and achievements</li>
                <li>• Research the company culture and values beforehand</li>
                <li>• Think about questions you want to ask about the role and company</li>
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
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-gray-700 hover:to-gray-600 border-0 text-black font-semibold py-4 rounded-xl transition-all duration-300 group"
                disabled={!isFormValid}
              >
                Start HR Interview
                <motion.div
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.div>
              </Button>

              {!isFormValid && (
                <p className="text-sm text-gray-400 text-center mt-3">
                  Please fill in all required fields to continue
                </p>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hr_page;