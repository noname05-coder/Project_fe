import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import WelcomeSection from '@/components/WelcomeSection';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import { Testimonial } from '@/components/Testimonial';
import { Footer } from '@/components/Footer';



const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <Header />
      <WelcomeSection onStart={() => navigate('/upload')} />
      <Features />
      <HowItWorks />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Index;
