import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div 
      className={`fixed z-30 transition-all duration-500 transform ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      } bottom-24 right-6 md:bottom-10 md:right-10`}
    >
      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-white/90 backdrop-blur-sm text-brand-purple border border-brand-purple/10 rounded-full shadow-xl flex items-center justify-center hover:bg-brand-purple hover:text-white hover:-translate-y-1 transition-all duration-300 group"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
      </button>
    </div>
  );
};
