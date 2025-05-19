
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const Summary = () => {
  const navigate = useNavigate();

  const scores = [
    { category: "Project Understanding", score: 85 },
    { category: "Communication", score: 78 },
    { category: "Technical Accuracy", score: 92 },
    { category: "Problem-solving", score: 80 },
    { category: "Confidence", score: 75 }
  ];
  
  const suggestions = [
    "Provide more specific examples when discussing technical challenges",
    "Elaborate more on the decision-making process for technology choices",
    "Practice explaining architectural concepts more concisely",
    "Consider adding benchmarking details when discussing performance"
  ];
  
  const strengths = [
    "Clear explanation of the project architecture",
    "Strong understanding of technical tradeoffs",
    "Effective communication of complex concepts"
  ];
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-navy-600"></div>
            <span className="font-display font-semibold text-xl">InterviewAI</span>
          </div>
          <div className="text-sm font-medium">
            <span className="text-slate-400">1</span>
            <span className="text-slate-300 mx-2">/</span>
            <span className="text-slate-400">2</span>
            <span className="text-slate-300 mx-2">/</span>
            <span className="text-slate-400">3</span>
            <span className="text-slate-300 mx-2">/</span>
            <span className="text-navy-600">4</span>
          </div>
        </div>
      </header>
      
      <div className="container py-10 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-semibold mb-2">Interview Summary</h1>
          <p className="text-slate-600">
            Here's how you performed in your technical interview
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left column - Scorecard */}
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-6">Performance Scorecard</h2>
                <div className="space-y-6">
                  {scores.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{item.category}</span>
                        <span className="text-slate-700">{item.score}%</span>
                      </div>
                      <Progress 
                        value={item.score} 
                        className="h-2"
                        style={{
                          background: 'linear-gradient(to right, #e2e8f0, #e2e8f0)',
                          '--progress-background': item.score > 85 
                            ? 'linear-gradient(to right, #34D399, #10B981)' 
                            : item.score > 70 
                            ? 'linear-gradient(to right, #60A5FA, #3B82F6)' 
                            : 'linear-gradient(to right, #F59E0B, #D97706)'
                        } as React.CSSProperties}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <h3 className="font-semibold mb-4">Overall Performance</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full border-8 border-blue-500 flex items-center justify-center">
                      <span className="text-xl font-bold">82%</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-600">Strong Performance</h4>
                      <p className="text-sm text-slate-600">You demonstrated good technical knowledge and communication skills</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Interview Transcript</h2>
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex justify-between items-center p-3 bg-slate-50 border-b">
                    <span className="font-medium text-sm">8 questions & answers</span>
                    <Button variant="outline" size="sm">
                      Download
                    </Button>
                  </div>
                  <div className="max-h-64 overflow-y-auto p-4">
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex gap-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-navy-100 text-navy-600 flex items-center justify-center text-xs font-bold">
                              AI
                            </div>
                            <div className="text-sm">
                              <p className="text-slate-700">Can you walk me through the architecture of your project?</p>
                              <span className="text-xs text-slate-500">00:12</span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                              You
                            </div>
                            <div className="text-sm">
                              <p className="text-slate-700">My project uses a React frontend with a Node.js backend. I chose this architecture because it allowed for rapid development and good separation of concerns. The frontend communicates with the backend via RESTful APIs.</p>
                              <span className="text-xs text-slate-500">01:45</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="text-center pt-4">
                        <Button variant="ghost" size="sm">
                          View Full Transcript
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right column - Feedback & suggestions */}
          <div className="space-y-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Areas for Improvement</h2>
                <ul className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xs mt-0.5">
                        !
                      </div>
                      <span className="text-sm text-slate-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Your Strengths</h2>
                <ul className="space-y-3">
                  {strengths.map((strength, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs mt-0.5">
                        ✓
                      </div>
                      <span className="text-sm text-slate-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
                <div className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M12 20V10"></path><path d="M18 14H6"></path><path d="M12 4v1"></path>
                    </svg>
                    Download Report
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="m3 2 18 24M13 14c-.4.5-.8.7-1.4.8M7 3l1 9"></path>
                    </svg>
                    Share with Coach
                  </Button>
                  <Button className="w-full bg-navy-600 hover:bg-navy-700 text-white" onClick={() => navigate('/')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path>
                    </svg>
                    Try Another Interview
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
