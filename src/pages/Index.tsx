
import React, { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Scrollspy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;
      
      // Set isScrolled state for navbar transparency
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      sections.forEach(section => {
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document.querySelector(`button[onclick*='${sectionId}']`)?.classList.add('text-ai-purple');
        } else {
          document.querySelector(`button[onclick*='${sectionId}']`)?.classList.remove('text-ai-purple');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar isScrolled={isScrolled} />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
      <AIChat />
      <WhatsAppButton />
      
      {/* Floating back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-ai-purple text-white h-12 w-12 rounded-full flex items-center justify-center shadow-lg hover:bg-ai-blue transition-colors z-30"
        aria-label="Voltar ao topo"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Index;
