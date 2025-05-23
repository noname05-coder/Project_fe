import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

export const Testimonial = () => {
    const navigate = useNavigate();
    return(
        <div>
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
        </div>
    )
}