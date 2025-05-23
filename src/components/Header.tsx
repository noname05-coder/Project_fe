import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface HeaderProps {
  showNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNav = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Check if scrolled down more than threshold
        if (scrollTop > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } catch (error) {
        console.error('Error handling scroll event in Navbar:', error);
      }
    };

    try {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Initial check to set correct state
      handleScroll();
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    } catch (error) {
      console.error('Error setting up scroll listener in Navbar:', error);
    }
  }, []);
  
  const navigate = useNavigate();





  
  return (
    <header className={cn(
        'fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300',
        isScrolled ? 'mt-2 px-6' : 'mt-4 px-4')}>
      <div className={cn(
        'flex items-center justify-between py-1 rounded-full transition-all duration-500 relative',
        isScrolled 
          ? 'glassmorphism w-[75%] px-8 border border-purple-200/50' 
          : 'purple-glassmorphism w-[90%] px-8'
      )}>
        {/* Logo on the left */}
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-lg",
            isScrolled 
              ? "bg-gradient-to-r from-purple-600/90 to-blue-600/90 border border-white/20" 
              : "bg-gradient-to-r from-purple-300/80 to-purple-500/80 border border-purple-300/50"
          )}>
            <span className={cn(
              "font-bold text-sm",
              isScrolled ? "text-white" : "text-white"
            )}>IA</span>
          </div>
          <span className={cn(
            "font-display font-bold text-xl transition-colors duration-300",
            isScrolled ? "text-purple-900" : "text-white"
          )}>InterviewAI</span>
        </div>
        
        {/* Nav links centered */}
        {showNav && (
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="#features" className={cn(
              "hover:text-purple-300 text-sm font-medium transition-all duration-300 relative group",
              isScrolled ? "text-purple-800" : "text-white"
            )}>
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-blue-400/80 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#how-it-works" className={cn(
              "hover:text-purple-300 text-sm font-medium transition-all duration-300 relative group",
              isScrolled ? "text-purple-800" : "text-white"
            )}>
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-blue-400/80 transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className={cn(
              "hover:text-purple-300 text-sm font-medium transition-all duration-300 relative group",
              isScrolled ? "text-purple-800" : "text-white"
            )}>
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-blue-400/80 transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
        )}
        
        {/* Auth buttons on the right */}
        <div className="flex items-center gap-3">
          <Button 
            variant={isScrolled ? "outline" : "secondary"} 
            onClick={() => navigate('/login')} 
            className={cn(
              "font-medium transition-all duration-300 backdrop-blur-md",
              isScrolled 
                ? "hover:bg-purple-50/70 border-purple-300/50 text-purple-800" 
                : "bg-transparent border border-purple-300/30 hover:bg-white/10 text-white"
            )}
          >
            Login
          </Button>
          <Button 
            variant={isScrolled ? "default" : "secondary"} 
            onClick={() => navigate('/signup')} 
            className={cn(
              "font-medium transition-all duration-300 backdrop-blur-md",
              isScrolled 
                ? "bg-gradient-to-r from-purple-600/90 via-purple-500/90 to-blue-600/90 hover:from-purple-700 hover:to-blue-700 text-white border-0" 
                : "bg-gradient-to-r from-purple-400/80 via-pink-400/80 to-blue-500/80 text-white hover:from-purple-500/90 hover:to-blue-600/90 border border-purple-300/30"
            )}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Header;