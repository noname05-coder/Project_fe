import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const SummaryComponent = () => {
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
  
  const questions = [
    {
      question: "Can you walk me through the architecture of your project?",
      answer: "The project uses a microservices architecture with a React frontend and Node.js backend. We use Docker for containerization and AWS for deployment. The services communicate through REST APIs and message queues for asynchronous tasks.",
      feedback: "Good explanation of the overall architecture. Consider mentioning specific design patterns used and why they were chosen."
    },
    {
      question: "What technical challenges did you face during development?",
      answer: "One of the biggest challenges was handling real-time updates across multiple clients. We implemented WebSockets to ensure all users see changes immediately without constant polling.",
      feedback: "Strong answer. Next time, consider explaining the tradeoffs you considered before landing on WebSockets."
    }
  ];
  
  // Calculate overall score
  const overallScore = scores.reduce((sum, item) => sum + item.score, 0) / scores.length;
  
  return (
    <div className="container max-w-4xl py-12">
      <h1 className="text-3xl font-semibold mb-2">Interview Summary</h1>
      <p className="text-slate-600 mb-8">
        Here's your performance analysis and feedback from your practice interview.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Overall Score</h2>
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full border-8 border-navy-600 flex items-center justify-center mb-4">
                  <span className="text-4xl font-bold">{Math.round(overallScore)}%</span>
                </div>
                <p className="text-slate-600">
                  {overallScore >= 90 ? 'Exceptional' : 
                   overallScore >= 80 ? 'Very Good' : 
                   overallScore >= 70 ? 'Good' : 
                   overallScore >= 60 ? 'Satisfactory' : 
                   'Needs Improvement'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Performance Breakdown</h2>
              <div className="space-y-4">
                {scores.map((score, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{score.category}</span>
                      <span className="font-medium">{score.score}%</span>
                    </div>
                    <Progress value={score.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-semibold mb-4">Areas for Improvement</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {suggestions.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="flex-none pt-0.5">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
                        {index + 1}
                      </span>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Strengths</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-3">
                {strengths.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <div className="flex-none pt-0.5">
                      <span className="w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs">
                        ✓
                      </span>
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Question Analysis</h2>
      <div className="space-y-6 mb-12">
        {questions.map((item, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="mb-3">
                <span className="text-xs font-semibold text-white bg-navy-600 px-2 py-1 rounded">
                  Question {index + 1}
                </span>
              </div>
              <h3 className="font-medium mb-2">{item.question}</h3>
              <div className="pl-4 border-l-2 border-slate-200 mb-4">
                <p className="text-slate-600">{item.answer}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold mb-1 text-navy-600">Feedback</h4>
                <p className="text-slate-700">{item.feedback}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate('/')}>
          Back to Home
        </Button>
        <Button onClick={() => navigate('/setup')}>
          Practice Again
        </Button>
      </div>
    </div>
  );
};

export default SummaryComponent;
