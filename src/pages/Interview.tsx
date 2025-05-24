import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Play, 
  Pause, 
  Square,
  Clock,
  MessageSquare,
  ChevronRight,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

// Sample interview questions by type
const interviewQuestions = {
  dev: [
    "Can you walk me through the architecture of your project?",
    "What technical challenges did you face and how did you overcome them?",
    "How did you ensure code quality and maintainability?",
    "What would you do differently if you rebuilt this project?",
    "Explain your thought process behind the tech stack selection.",
    "How did you approach testing for this project?",
    "Where do you see opportunities for performance improvements?",
    "Tell me about a difficult bug you encountered and how you solved it."
  ],
  ml: [
    "Explain the machine learning model you implemented in your project.",
    "How did you handle data preprocessing and feature engineering?",
    "What evaluation metrics did you use and why?",
    "How did you address overfitting or underfitting in your model?",
    "Walk me through your data collection and preparation process.",
    "How would you deploy this model in a production environment?",
    "What are the limitations of your current approach?",
    "How would you improve the model's performance given more time?"
  ],
  hr: [
    "Tell me about yourself and your professional background.",
    "Why are you interested in this role and our company?",
    "Describe a challenging situation you faced and how you handled it.",
    "What are your greatest strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
    "Tell me about a time you worked in a team.",
    "How do you handle stress and tight deadlines?",
    "What motivates you in your work?"
  ]
};

const Interview = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [interviewType] = useState<'dev' | 'ml' | 'hr'>('dev'); // This would come from props/route
  const [transcript, setTranscript] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);
  
  const questions = interviewQuestions[interviewType];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  useEffect(() => {
    // Start timer
    startTimer();
    
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
      };
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);
  
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current?.start();
      setIsRecording(true);
    }
  };
  
  const submitAnswer = () => {
    if (!transcript.trim()) return;
    
    const newResponses = [...responses, transcript];
    setResponses(newResponses);
    setTranscript('');
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        navigate('/summary');
      }, 2000);
    }
  };
  
  const togglePause = () => {
    if (isPaused) {
      startTimer();
      setIsPaused(false);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPaused(true);
    }
  };
  
  const endInterview = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigate('/summary');
  };

  if (isComplete) {
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
            className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-white mb-2">Interview Complete!</h2>
          <p className="text-gray-400">Generating your report...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Red ambient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-red-900/20 pointer-events-none" />
      
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 border-b border-red-900/20 bg-black/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-lg font-semibold">Live Interview</span>
              </div>
              <Badge variant="outline" className="border-red-500/50 text-red-400">
                {interviewType.toUpperCase()} Interview
              </Badge>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                {formatTime(timeElapsed)}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={togglePause}
                className="border-red-500/50 text-red-400 hover:bg-red-950/50"
              >
                {isPaused ? <Play className="w-4 h-4 mr-1" /> : <Pause className="w-4 h-4 mr-1" />}
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              
              <Button
                variant="destructive"
                size="sm"
                onClick={endInterview}
                className="bg-red-600 hover:bg-red-700"
              >
                <Square className="w-4 h-4 mr-1" />
                End
              </Button>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
              <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-800 [&>div]:bg-gradient-to-r [&>div]:from-red-500 [&>div]:to-red-600" />
          </div>
        </div>
      </motion.header>

      {/* Main Interview Area */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Question Section */}
          <motion.div
            key={currentQuestionIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Card className="bg-gray-900/50 border-red-900/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-lg font-semibold text-red-400">Interviewer</h3>
                      <Badge variant="secondary" className="bg-red-950/50 text-red-300 border-red-500/30">
                        Question {currentQuestionIndex + 1}
                      </Badge>
                    </div>
                    <p className="text-lg text-gray-200 leading-relaxed">
                      {questions[currentQuestionIndex]}
                    </p>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 text-red-400 hover:bg-red-950/50"
                      onClick={() => {
                        // Speak question
                        if ('speechSynthesis' in window) {
                          const utterance = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
                          speechSynthesis.speak(utterance);
                        }
                      }}
                    >
                      <Volume2 className="w-4 h-4 mr-2" />
                      Replay Question
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Response Section */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gray-900/50 border-red-900/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <h3 className="text-lg font-semibold text-white">Your Response</h3>
                  {isRecording && (
                    <Badge className="bg-red-600 text-white animate-pulse">
                      Recording...
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="relative">
                    <textarea
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      placeholder="Your response will appear here as you speak, or you can type directly..."
                      className="w-full h-32 p-4 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 resize-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30"
                      disabled={isPaused}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant={isRecording ? "destructive" : "outline"}
                        onClick={toggleRecording}
                        disabled={isPaused}
                        className={isRecording 
                          ? "bg-red-600 hover:bg-red-700" 
                          : "border-red-500/50 text-red-400 hover:bg-red-950/50"
                        }
                      >
                        {isRecording ? (
                          <>
                            <MicOff className="w-4 h-4 mr-2" />
                            Stop Recording
                          </>
                        ) : (
                          <>
                            <Mic className="w-4 h-4 mr-2" />
                            Start Recording
                          </>
                        )}
                      </Button>
                      
                      {isPaused && (
                        <div className="flex items-center gap-2 text-amber-400">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm">Interview Paused</span>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      onClick={submitAnswer}
                      disabled={!transcript.trim() || isPaused}
                      className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    >
                      {currentQuestionIndex === questions.length - 1 ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Complete Interview
                        </>
                      ) : (
                        <>
                          Next Question
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Previous Responses */}
          {responses.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Previous Responses</h3>
              <div className="space-y-3">
                {responses.map((response, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gray-800/30 border-gray-700/50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="mt-1 border-red-500/30 text-red-400">
                            Q{index + 1}
                          </Badge>
                          <p className="text-gray-300 text-sm flex-1">
                            {response.length > 100 ? `${response.substring(0, 100)}...` : response}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Interview;
