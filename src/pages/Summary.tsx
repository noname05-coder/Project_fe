import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  TrendingUp, 
  Target, 
  Award, 
  Download, 
  Share2,
  RotateCcw,
  Home,
  Star,
  BookOpen,
  MessageSquare,
  Clock,
  Trophy,
  Sparkles,
  ArrowRight
} from "lucide-react";

const Summary = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // Mock data - would come from actual interview results
  const interviewData = {
    type: 'Development',
    duration: '18:32',
    questionsAnswered: 8,
    overallScore: 87,
    scores: [
      { category: "Technical Knowledge", score: 92, color: "from-emerald-500 to-green-600" },
      { category: "Communication", score: 85, color: "from-green-500 to-emerald-600" },
      { category: "Problem Solving", score: 88, color: "from-teal-500 to-green-600" },
      { category: "Project Understanding", score: 90, color: "from-emerald-400 to-green-500" },
      { category: "Confidence", score: 82, color: "from-green-400 to-emerald-500" }
    ],
    strengths: [
      "Excellent grasp of system architecture concepts",
      "Clear and articulate communication style",
      "Strong problem-solving methodology",
      "Good understanding of technical trade-offs"
    ],
    improvements: [
      "Consider providing more concrete examples",
      "Elaborate on testing strategies",
      "Discuss scalability considerations in more detail",
      "Practice explaining complex concepts more concisely"
    ],
    questions: [
      {
        question: "Can you walk me through your project architecture?",
        rating: 4.5,
        feedback: "Excellent explanation with clear reasoning behind design choices."
      },
      {
        question: "How did you handle the technical challenges?",
        rating: 4.0,
        feedback: "Good problem-solving approach, could benefit from more specific examples."
      },
      {
        question: "What would you improve in your project?",
        rating: 4.2,
        feedback: "Thoughtful analysis showing good self-reflection skills."
      }
    ]
  };

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getScoreLevel = (score: number) => {
    if (score >= 90) return { label: 'Excellent', color: 'text-emerald-400' };
    if (score >= 80) return { label: 'Very Good', color: 'text-green-400' };
    if (score >= 70) return { label: 'Good', color: 'text-lime-400' };
    if (score >= 60) return { label: 'Satisfactory', color: 'text-yellow-400' };
    return { label: 'Needs Improvement', color: 'text-orange-400' };
  };

  const scoreLevel = getScoreLevel(interviewData.overallScore);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Your Performance</h2>
          <p className="text-gray-400">Generating comprehensive feedback...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Green ambient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/30 via-transparent to-green-900/20 pointer-events-none" />
      
      {/* Floating particles for celebration effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-green-400 rounded-full"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 10,
              opacity: 0 
            }}
            animate={{ 
              y: -10,
              opacity: [0, 1, 0] 
            }}
            transition={{ 
              duration: 3 + Math.random() * 2,
              delay: Math.random() * 2,
              repeat: Infinity,
              repeatDelay: 5 + Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="border-b border-green-900/20 bg-black/50 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center"
                >
                  <Trophy className="w-6 h-6" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Interview Complete!</h1>
                  <p className="text-gray-400">Here's your comprehensive performance report</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500/50 text-green-400 hover:bg-green-950/50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-green-500/50 text-green-400 hover:bg-green-950/50"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Overall Score Section */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <Card className="bg-gradient-to-br from-green-950/50 to-emerald-950/50 border-green-900/30 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    {/* Score Circle */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5, type: "spring", bounce: 0.3 }}
                        className="relative w-32 h-32 mb-4"
                      >
                        <svg className="w-32 h-32 transform -rotate-90">
                          <circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            className="text-gray-700"
                          />
                          <motion.circle
                            cx="64"
                            cy="64"
                            r="56"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="none"
                            strokeLinecap="round"
                            className="text-green-500"
                            initial={{ strokeDasharray: "0 351.86" }}
                            animate={{ strokeDasharray: `${(interviewData.overallScore / 100) * 351.86} 351.86` }}
                            transition={{ duration: 2, delay: 0.7 }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="text-3xl font-bold text-green-400"
                          >
                            {interviewData.overallScore}%
                          </motion.span>
                        </div>
                      </motion.div>
                      <Badge className={`${scoreLevel.color} bg-green-950/50 border-green-500/30`}>
                        {scoreLevel.label}
                      </Badge>
                    </div>

                    {/* Stats */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-sm text-gray-400">Interview Type</p>
                          <p className="text-lg font-semibold">{interviewData.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-sm text-gray-400">Duration</p>
                          <p className="text-lg font-semibold">{interviewData.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-green-400" />
                        <div>
                          <p className="text-sm text-gray-400">Questions Answered</p>
                          <p className="text-lg font-semibold">{interviewData.questionsAnswered}</p>
                        </div>
                      </div>
                    </div>

                    {/* Achievement */}
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center"
                      >
                        <Award className="w-8 h-8" />
                      </motion.div>
                      <h3 className="font-semibold text-green-400 mb-1">Great Job!</h3>
                      <p className="text-sm text-gray-400">You performed above average</p>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Performance Breakdown */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-400" />
                Performance Breakdown
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interviewData.scores.map((score, index) => (
                  <motion.div
                    key={score.category}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="bg-gray-900/50 border-green-900/30 backdrop-blur-sm hover:border-green-500/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-white">{score.category}</h3>
                          <Badge variant="outline" className="border-green-500/50 text-green-400">
                            {score.score}%
                          </Badge>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={score.score} 
                            className="h-3 bg-gray-800"
                          />
                          <div 
                            className={`absolute inset-0 h-3 bg-gradient-to-r ${score.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${score.score}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Strengths & Improvements */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-400" />
                  Your Strengths
                </h2>
                <Card className="bg-green-950/30 border-green-900/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {interviewData.strengths.map((strength, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.8 + index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <p className="text-gray-300">{strength}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  Areas to Improve
                </h2>
                <Card className="bg-gray-900/50 border-green-900/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {interviewData.improvements.map((improvement, index) => (
                        <motion.div
                          key={index}
                          initial={{ x: 10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center mt-0.5 flex-shrink-0">
                            <span className="text-xs text-amber-400">{index + 1}</span>
                          </div>
                          <p className="text-gray-300">{improvement}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Question Analysis */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-400" />
                  Question Analysis
                </h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowDetails(!showDetails)}
                  className="text-green-400 hover:bg-green-950/50"
                >
                  {showDetails ? 'Hide Details' : 'Show Details'}
                  <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
                </Button>
              </div>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4"
                  >
                    {interviewData.questions.map((q, index) => (
                      <motion.div
                        key={index}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="bg-gray-900/50 border-green-900/30 backdrop-blur-sm">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="font-semibold text-white">Q{index + 1}: {q.question}</h3>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(q.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-300 text-sm">{q.feedback}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="border-green-500/50 text-green-400 hover:bg-green-950/50"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <Button
                onClick={() => navigate('/choose-interview')}
                className="bg-green-600 hover:bg-green-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Practice Again
              </Button>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Summary;
