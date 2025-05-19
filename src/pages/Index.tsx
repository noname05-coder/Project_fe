
import React from 'react';
import { Button } from "@/components/ui/button";
import WelcomeSection from '@/components/WelcomeSection';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container flex items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-navy-600"></div>
          <span className="font-display font-semibold text-xl">InterviewAI</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#features" className="text-slate-600 hover:text-navy-600 text-sm font-medium">Features</a>
          <a href="#how-it-works" className="text-slate-600 hover:text-navy-600 text-sm font-medium">How It Works</a>
          <a href="#testimonials" className="text-slate-600 hover:text-navy-600 text-sm font-medium">Testimonials</a>
          <Button variant="outline" onClick={() => navigate('/login')}>
            Login
          </Button>
        </nav>
      </header>
      
      <WelcomeSection onStart={() => navigate('/upload')} />
      
      <section id="features" className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold gradient-heading mb-4">
            Prepare Like Never Before
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Our AI-powered interview simulator helps you practice with your actual projects,
            giving you the most realistic interview experience possible.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm card-hover">
            <div className="w-12 h-12 bg-navy-100 text-navy-700 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Project Analysis</h3>
            <p className="text-slate-600">Upload your projects and our AI will generate relevant technical questions.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm card-hover">
            <div className="w-12 h-12 bg-navy-100 text-navy-700 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v8"></path><path d="m4.93 10.93 1.41 1.41"></path><path d="M2 18h2"></path><path d="M20 18h2"></path><path d="m19.07 10.93-1.41 1.41"></path><path d="M22 22H2"></path><path d="M16 6 7 22"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Voice Interaction</h3>
            <p className="text-slate-600">Engage in realistic conversations with different interview styles and tones.</p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm card-hover">
            <div className="w-12 h-12 bg-navy-100 text-navy-700 rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Detailed Feedback</h3>
            <p className="text-slate-600">Receive personalized suggestions and a complete analysis of your performance.</p>
          </div>
        </div>
      </section>
      
      <section id="how-it-works" className="py-24 bg-slate-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-semibold gradient-heading mb-4">
              How It Works
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Four simple steps to prepare for your next technical interview
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Upload Project",
                desc: "Upload your project files or GitHub link"
              },
              {
                step: "2",
                title: "Choose Settings",
                desc: "Select interview type, duration, and voice style"
              },
              {
                step: "3",
                title: "Practice Interview",
                desc: "Answer questions through voice interaction"
              },
              {
                step: "4",
                title: "Review Feedback",
                desc: "Get insights and areas for improvement"
              }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="bg-white p-6 rounded-xl shadow-sm h-full">
                  <div className="w-8 h-8 bg-navy-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <svg width="20" height="8" viewBox="0 0 20 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.3536 4.35355C19.5488 4.15829 19.5488 3.84171 19.3536 3.64645L16.1716 0.464466C15.9763 0.269204 15.6597 0.269204 15.4645 0.464466C15.2692 0.659728 15.2692 0.976311 15.4645 1.17157L18.2929 4L15.4645 6.82843C15.2692 7.02369 15.2692 7.34027 15.4645 7.53553C15.6597 7.7308 15.9763 7.7308 16.1716 7.53553L19.3536 4.35355ZM0 4.5H19V3.5H0V4.5Z" fill="#CBD5E1"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="testimonials" className="container py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold gradient-heading mb-4">
            What Users Say
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            InterviewAI has helped thousands of developers ace their technical interviews
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "The project-specific questions made all the difference in my interview preparation. I was able to speak confidently about my work.",
              author: "Sarah K.",
              role: "Frontend Developer"
            },
            {
              quote: "I was surprised by how accurately the AI generated questions about my GitHub project. The voice interaction made it feel like a real interview.",
              author: "Michael T.",
              role: "Full Stack Engineer"
            },
            {
              quote: "The feedback I received highlighted weak spots in my explanations that I hadn't noticed before. I improved significantly after just a few sessions.",
              author: "Priya M.",
              role: "Software Engineer"
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex items-center gap-1 mb-4 text-yellow-400">
                {[...Array(5)].map((_, starIndex) => (
                  <svg key={starIndex} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 italic mb-6">"{item.quote}"</p>
              <div>
                <p className="font-semibold">{item.author}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button className="btn-primary" size="lg" onClick={() => navigate('/upload')}>
            Try InterviewAI Today
          </Button>
        </div>
      </section>
      
      <footer className="bg-slate-100 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-navy-600"></div>
              <span className="font-display font-semibold text-xl">InterviewAI</span>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center text-sm">
              <a href="#" className="text-slate-600 hover:text-navy-600">About</a>
              <a href="#" className="text-slate-600 hover:text-navy-600">Privacy</a>
              <a href="#" className="text-slate-600 hover:text-navy-600">Terms</a>
              <a href="#" className="text-slate-600 hover:text-navy-600">Contact</a>
              <p className="text-slate-500">© 2025 InterviewAI. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
