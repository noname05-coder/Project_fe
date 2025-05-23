import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Mic, MicOff, Volume2, Play, Pause } from "lucide-react";

// TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

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

const InterviewComponent = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const [status, setStatus] = useState<'speaking' | 'listening' | 'thinking' | 'paused'>('speaking');
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', content: string}[]>([]);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Initialize messages with first question
    setMessages([
      { 
        role: 'ai', 
        content: "Hello, thanks for joining us today. I'll be asking you some questions about your project. " + sampleQuestions[0] 
      }
    ]);
    
    // Set up speech synthesis
    synthRef.current = new SpeechSynthesisUtterance();
    synthRef.current.rate = 1;
    synthRef.current.pitch = 1;
    synthRef.current.volume = 1;
    
    // Set up speech recognition if available
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
    
    // Start timer
    startTimer();
    
    // Start speaking the first question
    speakText(messages[0].content);
    
    // Cleanup
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          endInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const speakText = (text: string) => {
    if (window.speechSynthesis && synthRef.current) {
      window.speechSynthesis.cancel();
      synthRef.current.text = text;
      window.speechSynthesis.speak(synthRef.current);
      
      synthRef.current.onstart = () => {
        setIsSpeaking(true);
        setStatus('speaking');
      };
      
      synthRef.current.onend = () => {
        setIsSpeaking(false);
        startListening();
      };
    }
  };
  
  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setStatus('listening');
      } catch (e) {
        console.error("Error starting speech recognition:", e);
      }
    }
  };
  
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };
  
  const handleSubmitAnswer = () => {
    if (!transcript.trim()) {
      toast({
        description: "Please provide an answer before continuing.",
        variant: "destructive",
      });
      return;
    }
    
    stopListening();
    setStatus('thinking');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: transcript }]);
    
    // Simulate AI thinking
    setTimeout(() => {
      if (currentQuestionIndex < sampleQuestions.length - 1) {
        // Move to next question
        setCurrentQuestionIndex(prev => prev + 1);
        const nextQuestion = sampleQuestions[currentQuestionIndex + 1];
        
        // Add AI message with next question
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: `Thank you for that answer. ${nextQuestion}` 
        }]);
        
        // Speak next question
        speakText(`Thank you for that answer. ${nextQuestion}`);
        
        // Reset transcript
        setTranscript('');
      } else {
        // End interview
        setMessages(prev => [...prev, { 
          role: 'ai', 
          content: "Thank you for your time today. We've completed all the questions. Let me prepare your feedback." 
        }]);
        
        speakText("Thank you for your time today. We've completed all the questions. Let me prepare your feedback.");
        
        setTimeout(() => {
          endInterview();
        }, 5000);
      }
    }, 2000);
  };
  
  const togglePause = () => {
    if (status === 'paused') {
      // Resume
      if (timerRef.current === null) {
        startTimer();
      }
      
      if (isSpeaking) {
        window.speechSynthesis.resume();
      } else if (!transcript || transcript.trim() === '') {
        startListening();
      }
      
      setStatus(isSpeaking ? 'speaking' : isListening ? 'listening' : 'thinking');
      setShowPauseDialog(false);
    } else {
      // Pause
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      if (window.speechSynthesis && isSpeaking) {
        window.speechSynthesis.pause();
      }
      
      if (recognitionRef.current && isListening) {
        stopListening();
      }
      
      setStatus('paused');
      setShowPauseDialog(true);
    }
  };
  
  const endInterview = () => {
    // Clean up and navigate to summary
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    navigate('/summary');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-navy-700 text-white py-3 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="font-medium">Interview in progress</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm">Time: {formatTime(timeRemaining)}</span>
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white hover:bg-navy-600"
            onClick={togglePause}
          >
            {status === 'paused' ? <Play className="h-4 w-4 mr-1" /> : <Pause className="h-4 w-4 mr-1" />}
            {status === 'paused' ? 'Resume' : 'Pause'}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowPauseDialog(true)}
          >
            End
          </Button>
        </div>
      </div>
      
      <div className="flex-1 container max-w-4xl py-8 flex flex-col">
        <div className="flex-1 space-y-6 overflow-y-auto pb-8">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg max-w-3xl ${
                message.role === 'ai'
                  ? 'bg-slate-100 mr-auto'
                  : 'bg-navy-100 ml-auto'
              }`}
            >
              <div className="font-medium text-sm mb-1">
                {message.role === 'ai' ? 'Interviewer' : 'You'}
              </div>
              <p>{message.content}</p>
            </div>
          ))}
          
          {isListening && (
            <div className="p-4 rounded-lg max-w-3xl bg-navy-100 ml-auto">
              <div className="font-medium text-sm mb-1 flex items-center gap-2">
                <span>You</span>
                <span className="flex items-center gap-1 text-xs text-navy-600">
                  <span className="w-2 h-2 rounded-full bg-navy-600 animate-pulse"></span> Speaking
                </span>
              </div>
              <p>{transcript || '...'}</p>
            </div>
          )}
        </div>
        
        <div className="py-4 border-t sticky bottom-0 bg-white">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <textarea
                className="w-full p-3 border rounded-lg resize-none"
                placeholder={isListening ? "Listening..." : "Type your answer here..."}
                rows={3}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                disabled={isListening}
              />
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      className="absolute bottom-3 right-3"
                      size="icon"
                      variant={isListening ? "destructive" : "outline"}
                      onClick={() => {
                        if (isListening) {
                          stopListening();
                        } else {
                          startListening();
                        }
                      }}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isListening ? 'Stop listening' : 'Start listening'}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (messages.length > 0 && messages[messages.length - 1].role === 'ai') {
                          speakText(messages[messages.length - 1].content);
                        }
                      }}
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    Repeat question
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            <Button onClick={handleSubmitAnswer} disabled={isSpeaking || status === 'thinking'}>
              Submit Answer
            </Button>
          </div>
          
          <div className="mt-3 text-sm text-slate-500">
            {status === 'speaking' && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-navy-600 animate-pulse"></span>
                <span>Interviewer is speaking...</span>
              </div>
            )}
            
            {status === 'thinking' && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                <span>Interviewer is thinking...</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Dialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{status === 'paused' ? 'Interview Paused' : 'End Interview'}</DialogTitle>
            <DialogDescription>
              {status === 'paused' 
                ? 'Your interview is currently paused. The timer has been stopped.' 
                : 'Are you sure you want to end the interview early? This will take you to the summary page.'}
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPauseDialog(false)}>
              Cancel
            </Button>
            {status === 'paused' ? (
              <Button onClick={() => togglePause()}>
                Resume Interview
              </Button>
            ) : (
              <Button variant="destructive" onClick={endInterview}>
                End Interview
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InterviewComponent;
