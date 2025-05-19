
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

const Setup = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/interview');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-600"></div>
            <span className="font-display font-semibold text-xl">InterviewAI</span>
          </div>
          <div className="text-sm font-medium">
            <span className="text-slate-400">1</span>
            <span className="text-slate-300 mx-2">/</span>
            <span className="text-navy-600">2</span>
            <span className="text-slate-300 mx-2">/</span>
            <span className="text-slate-400">3</span>
            <span className="text-slate-300 mx-2">/</span>
            <span className="text-slate-400">4</span>
          </div>
        </div>
      </header>
      
      <div className="flex-1 container max-w-3xl py-16">
        <h1 className="text-3xl font-display font-semibold mb-2 text-center">Interview Setup</h1>
        <p className="text-slate-600 mb-8 text-center">
          Configure your interview session
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-12">
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Interview Mode</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  id: "technical",
                  title: "Technical Only",
                  description: "Focus on project-specific technical questions"
                },
                {
                  id: "hr-technical",
                  title: "HR + Technical",
                  description: "Mix of HR and technical questions"
                },
                {
                  id: "full",
                  title: "Full Simulation",
                  description: "Complete interview experience with all question types"
                }
              ].map(option => (
                <div 
                  key={option.id}
                  className={`border rounded-xl p-5 cursor-pointer transition-all ${
                    mode === option.id 
                      ? "border-navy-500 bg-navy-50 shadow-sm" 
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setMode(option.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{option.title}</h3>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      mode === option.id 
                        ? "border-navy-500" 
                        : "border-slate-300"
                    }`}>
                      {mode === option.id && (
                        <div className="w-2 h-2 rounded-full bg-navy-500"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{option.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Duration</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">{duration} minutes</span>
                <div className="flex gap-2">
                  {[15, 30, 45].map(mins => (
                    <button 
                      key={mins}
                      type="button"
                      className={`px-3 py-1 text-sm rounded ${
                        duration === mins 
                          ? "bg-navy-100 text-navy-800" 
                          : "text-slate-500 hover:bg-slate-100"
                      }`}
                      onClick={() => setDuration(mins)}
                    >
                      {mins}m
                    </button>
                  ))}
                  <button 
                    type="button"
                    className={`px-3 py-1 text-sm rounded ${
                      !([15, 30, 45].includes(duration)) 
                        ? "bg-navy-100 text-navy-800" 
                        : "text-slate-500 hover:bg-slate-100"
                    }`}
                    onClick={() => setDuration(60)}
                  >
                    Custom
                  </button>
                </div>
              </div>
              
              <Slider 
                value={[duration]} 
                onValueChange={values => setDuration(values[0])} 
                min={5} 
                max={60} 
                step={5}
              />
              
              <div className="flex justify-between text-xs text-slate-500">
                <span>5m</span>
                <span>60m</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Voice Tone</h2>
            <RadioGroup defaultValue="neutral" value={tone} onValueChange={setTone}>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  {
                    id: "calm",
                    title: "Calm",
                    description: "Gentle, supportive interviewer"
                  },
                  {
                    id: "neutral",
                    title: "Neutral",
                    description: "Standard interview experience"
                  },
                  {
                    id: "assertive",
                    title: "Assertive",
                    description: "Challenging, pressure-testing style"
                  }
                ].map(option => (
                  <div 
                    key={option.id}
                    className={`border rounded-xl p-5 relative cursor-pointer transition-all ${
                      tone === option.id 
                        ? "border-navy-500 bg-navy-50 shadow-sm" 
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                    onClick={() => setTone(option.id)}
                  >
                    <div className="absolute top-5 right-5">
                      <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                    </div>
                    <h3 className="font-medium mb-2">{option.title}</h3>
                    <p className="text-sm text-slate-600">{option.description}</p>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-xl font-medium">Voice Input</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium mb-1">Enable microphone input</h3>
                  <p className="text-sm text-slate-600">Use your microphone to answer questions</p>
                </div>
                <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-500">
                  <span
                    className={`${
                      voiceInput ? "translate-x-6 bg-navy-600" : "translate-x-1 bg-white"
                    } inline-block h-4 w-4 transform rounded-full transition-transform`}
                    onClick={() => handleVoiceToggle(!voiceInput)}
                  />
                </div>
              </div>
              
              {voiceInput && (
                <div className={`rounded-lg p-4 text-sm ${
                  micPermission === false ? "bg-red-50 text-red-800" :
                  micPermission === true ? "bg-green-50 text-green-800" :
                  "bg-slate-100 text-slate-800 animate-pulse"
                }`}>
                  {micPermission === false && 
                    "Microphone access denied. Please enable access in your browser settings."}
                  {micPermission === true && 
                    "Microphone access granted. You're ready to go!"}
                  {micPermission === null && 
                    "Checking microphone access..."}
                </div>
              )}
              
              {!voiceInput && (
                <div className="bg-yellow-50 rounded-lg p-4 text-sm text-yellow-800">
                  You'll use text input instead of voice. You can change this later.
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/upload')}
            >
              Back
            </Button>
            <Button 
              type="submit"
              className="btn-primary"
            >
              Begin Interview
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Setup;
