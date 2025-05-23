import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

const SetupComponent = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("technical");
  const [duration, setDuration] = useState(15);
  const [tone, setTone] = useState("neutral");
  const [voiceInput, setVoiceInput] = useState(true);
  const [micPermission, setMicPermission] = useState<boolean | null>(null);
  
  const checkMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      setMicPermission(true);
    } catch (err) {
      setMicPermission(false);
      setVoiceInput(false);
    }
  };

  const handleVoiceToggle = (value: boolean) => {
    if (value && micPermission === null) {
      checkMicPermission();
    }
    setVoiceInput(value);
  };

  const handleStart = () => {
    navigate('/interview');
  };

  return (
    <div className="container max-w-3xl py-12">
      <h1 className="text-3xl font-semibold mb-6">Setup Your Interview</h1>
      <p className="text-slate-600 mb-8">
        Customize your interview experience by selecting the options below.
      </p>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Interview Type</h2>
          <RadioGroup 
            value={mode} 
            onValueChange={setMode}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className={`p-4 border rounded-lg cursor-pointer transition-all ${
              mode === "technical" ? "border-navy-600 bg-navy-50" : "border-slate-200"
            }`}>
              <RadioGroupItem value="technical" id="technical" className="sr-only" />
              <Label htmlFor="technical" className="cursor-pointer flex flex-col items-center text-center">
                <div className="w-10 h-10 mb-3 text-navy-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <span className="font-medium mb-1">Technical</span>
                <span className="text-xs text-slate-500">Focus on coding and technical skills</span>
              </Label>
            </div>
            
            <div className={`p-4 border rounded-lg cursor-pointer transition-all ${
              mode === "behavioral" ? "border-navy-600 bg-navy-50" : "border-slate-200"
            }`}>
              <RadioGroupItem value="behavioral" id="behavioral" className="sr-only" />
              <Label htmlFor="behavioral" className="cursor-pointer flex flex-col items-center text-center">
                <div className="w-10 h-10 mb-3 text-navy-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <span className="font-medium mb-1">Behavioral</span>
                <span className="text-xs text-slate-500">Focus on soft skills and experiences</span>
              </Label>
            </div>
            
            <div className={`p-4 border rounded-lg cursor-pointer transition-all ${
              mode === "mixed" ? "border-navy-600 bg-navy-50" : "border-slate-200"
            }`}>
              <RadioGroupItem value="mixed" id="mixed" className="sr-only" />
              <Label htmlFor="mixed" className="cursor-pointer flex flex-col items-center text-center">
                <div className="w-10 h-10 mb-3 text-navy-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <span className="font-medium mb-1">Mixed</span>
                <span className="text-xs text-slate-500">Combination of technical and behavioral</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">Interview Duration</h2>
            <span className="font-medium">{duration} min</span>
          </div>
          <Slider 
            value={[duration]} 
            onValueChange={(val) => setDuration(val[0])} 
            min={5} 
            max={30} 
            step={5}
          />
          <div className="flex justify-between text-sm text-slate-500">
            <span>5 min</span>
            <span>30 min</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Interviewer Tone</h2>
          <RadioGroup 
            value={tone} 
            onValueChange={setTone}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className={`p-4 border rounded-lg cursor-pointer transition-all ${
              tone === "friendly" ? "border-navy-600 bg-navy-50" : "border-slate-200"
            }`}>
              <RadioGroupItem value="friendly" id="friendly" className="sr-only" />
              <Label htmlFor="friendly" className="cursor-pointer flex flex-col items-center text-center">
                <span className="text-2xl mb-2">😊</span>
                <span className="font-medium">Friendly</span>
              </Label>
            </div>
            
            <div className={`p-4 border rounded-lg cursor-pointer transition-all ${
              tone === "neutral" ? "border-navy-600 bg-navy-50" : "border-slate-200"
            }`}>
              <RadioGroupItem value="neutral" id="neutral" className="sr-only" />
              <Label htmlFor="neutral" className="cursor-pointer flex flex-col items-center text-center">
                <span className="text-2xl mb-2">😐</span>
                <span className="font-medium">Neutral</span>
              </Label>
            </div>
            
            <div className={`p-4 border rounded-lg cursor-pointer transition-all ${
              tone === "challenging" ? "border-navy-600 bg-navy-50" : "border-slate-200"
            }`}>
              <RadioGroupItem value="challenging" id="challenging" className="sr-only" />
              <Label htmlFor="challenging" className="cursor-pointer flex flex-col items-center text-center">
                <span className="text-2xl mb-2">🤔</span>
                <span className="font-medium">Challenging</span>
              </Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-xl font-medium">Voice Interaction</h2>
          <div className="flex gap-4">
            <div
              className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all ${
                voiceInput ? "border-navy-600 bg-navy-50" : "border-slate-200"
              }`}
              onClick={() => handleVoiceToggle(true)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 mb-3 text-navy-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <span className="font-medium mb-1">Voice</span>
                <span className="text-xs text-slate-500">Speak your answers</span>
              </div>
            </div>
            
            <div
              className={`flex-1 p-4 border rounded-lg cursor-pointer transition-all ${
                !voiceInput ? "border-navy-600 bg-navy-50" : "border-slate-200"
              }`}
              onClick={() => handleVoiceToggle(false)}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 mb-3 text-navy-700">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="font-medium mb-1">Text</span>
                <span className="text-xs text-slate-500">Type your answers</span>
              </div>
            </div>
          </div>
          {micPermission === false && (
            <div className="text-red-500 text-sm">
              Microphone access denied. Please enable microphone access in your browser settings or use text mode.
            </div>
          )}
        </div>
        
        <div className="flex justify-between pt-6">
          <Button variant="outline" onClick={() => navigate('/upload')}>
            Back
          </Button>
          <Button onClick={handleStart}>
            Start Interview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SetupComponent;
