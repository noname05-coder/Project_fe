
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Mic, MicOff, Volume2, Play, Pause } from "lucide-react";

// Sample interview questions
const sampleQuestions = [
  "Can you walk me through the architecture of your project?",
  "What technical challenges did you face during development and how did you overcome them?",
  "How did you ensure code quality and maintainability in your project?",
  "What would you do differently if you were to rebuild this project from scratch?",
  "Can you explain your thought process behind the tech stack selection?",
  "How did you approach testing for this project?",
  "Where do you see opportunities for improving performance in your project?",
  "Tell me about a difficult bug you encountered and how you solved it."
];

const Interview = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const [status, setStatus] = useState<'speaking' | 'listening' | 'thinking' | 'paused'>('speaking');
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', content: string}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulated AI speaks current question
  useEffect(() => {
    if (currentQuestionIndex < sampleQuestions.length) {
      const question = sampleQuestions[currentQuestionIndex];
      
      // Add AI message to the conversation
      setMessages(prev => [...prev, { role: 'ai', content: question }]);
      
      // Simulate AI speaking
      setStatus('speaking');
      setIsSpeaking(true);
      
      // After "speaking" is done, start listening
      const speakingTime = question.length * 50; // Simulate speaking time based on question length
      const timer = setTimeout(() => {
        setStatus('listening');
        setIsSpeaking(false);
      }, speakingTime);
      
      return () => clearTimeout(timer);
    }
  }, [currentQuestionIndex]);
  
  // Timer effect
  useEffect(() => {
    if (status !== 'paused' && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, status]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleMicToggle = () => {
    if (!isListening && status === 'listening') {
      // Start listening
      setIsListening(true);
      toast({
        title: "Microphone active",
        description: "You can start speaking now."
      });
      
      // Simulate voice recognition after a delay
      setTimeout(() => {
        // End user's turn after "speaking"
        handleUserResponse("My project uses a React frontend with a Node.js backend. I chose this architecture because it allowed for rapid development and good separation of concerns. The frontend communicates with the backend via RESTful APIs.");
      }, 5000);
    } else if (isListening) {
      // Stop listening
      setIsListening(false);
      toast({
        title: "Microphone disabled",
        description: "Your microphone is now off."
      });
    }
  };
  
  const handleUserResponse = (response: string) => {
    // Add user's response to conversation
    setMessages(prev => [...prev, { role: 'user', content: response }]);
    setTranscript(response);
    
    // Reset listening state
    setIsListening(false);
    
    // Process response (simulating AI thinking)
    setStatus('thinking');
    
    // After "thinking", move to next question or end interview
    setTimeout(() => {
      if (currentQuestionIndex < sampleQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // End of interview
        navigate('/summary');
      }
    }, 3000);
  };
  
  const togglePause = () => {
    if (status === 'paused') {
      setStatus('listening');
      setShowPauseDialog(false);
    } else {
      setStatus('paused');
      setShowPauseDialog(true);
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case 'speaking':
        return 'AI is speaking...';
      case 'listening':
        return isListening ? 'Listening to your answer...' : 'Click the microphone to start speaking';
      case 'thinking':
        return 'Analyzing your answer...';
      case 'paused':
        return 'Interview paused';
      default:
        return '';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="container flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-600"></div>
            <span className="font-display font-semibold text-xl">InterviewAI</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <div className={`w-2 h-2 rounded-full ${status === 'paused' ? 'bg-slate-300' : 'bg-green-500'}`}></div>
            {status === 'paused' ? 'Paused' : 'Live Interview'}
            <span className="text-slate-400 ml-2">|</span>
            <span className={`${timeRemaining < 60 ? 'text-red-500' : 'text-slate-600'}`}>{formatTime(timeRemaining)} remaining</span>
          </div>
          <Button 
            variant={status === 'paused' ? "default" : "outline"} 
            size="sm"
            onClick={togglePause}
            className="gap-2"
          >
            {status === 'paused' ? <Play size={16} /> : <Pause size={16} />}
            {status === 'paused' ? 'Resume' : 'Pause'}
          </Button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col container py-6 max-w-4xl">
        <div className="bg-white rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
          {/* Status bar */}
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
            <div className="text-sm text-slate-700">
              <span className="font-medium">Question {currentQuestionIndex + 1}/{sampleQuestions.length}</span>
              <span className="mx-2">•</span>
              <span>{getStatusText()}</span>
            </div>
            
            <div className="flex items-center gap-3">
              {status === 'thinking' && (
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                      <Volume2 size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Adjust volume</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* Chat area */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {messages.map((message, index) => (
              <div 
                key={index} 
                className={`flex ${message.role === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <div 
                  className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                    message.role === 'ai' 
                      ? 'bg-slate-100' 
                      : 'bg-navy-600 text-white'
                  }`}
                >
                  <p>{message.content}</p>
                  
                  {message.role === 'ai' && isSpeaking && index === messages.length - 1 && (
                    <div className="mt-2 waveform">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className="waveform-bar" 
                          style={{ 
                            height: `${Math.random() * 1 + 0.5}rem`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        ></div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Microphone control */}
          <div className="border-t border-slate-100 p-4 flex items-center justify-center">
            {status === 'listening' && (
              <div className="flex flex-col items-center">
                <Button
                  variant={isListening ? "default" : "outline"}
                  size="lg"
                  className={`h-16 w-16 rounded-full ${isListening ? 'bg-navy-600' : ''}`}
                  onClick={handleMicToggle}
                >
                  {isListening ? (
                    <Mic className="h-6 w-6" />
                  ) : (
                    <MicOff className="h-6 w-6" />
                  )}
                </Button>
                <span className="text-sm text-slate-500 mt-2">
                  {isListening ? 'Listening...' : 'Click to speak'}
                </span>
              </div>
            )}
            
            {status === 'thinking' && (
              <div className="bg-slate-100 rounded-lg px-4 py-3 text-slate-700">
                Analyzing your response...
              </div>
            )}
            
            {status === 'speaking' && (
              <div className="bg-slate-100 rounded-lg px-4 py-3 text-slate-700">
                Please listen to the question...
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Dialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Interview Paused</DialogTitle>
            <DialogDescription>
              Your interview is currently paused. The timer has been stopped.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-slate-700">
              Take your time. When you're ready to continue, click the Resume button.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => navigate('/')}>
              End Interview
            </Button>
            <Button onClick={() => {
              setStatus('listening');
              setShowPauseDialog(false);
            }}>
              Resume
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Interview;
