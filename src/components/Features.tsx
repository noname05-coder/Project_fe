import React from 'react';

const Features = () => {
  return (
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
  );
};

export default Features;
