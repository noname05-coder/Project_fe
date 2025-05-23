import React from 'react';

const HowItWorks = () => {
  const steps = [
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
      title: "Get Feedback",
      desc: "Review your interview performance and areas for improvement"
    }
  ];

  return (
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
          {steps.map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-16 h-16 rounded-full bg-navy-600 text-white flex items-center justify-center text-2xl font-semibold mb-4 mx-auto">
                {item.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
