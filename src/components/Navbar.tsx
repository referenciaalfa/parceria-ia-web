
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={cn(
        "fixed w-full z-50 transition-all duration-300 py-4 px-4 md:px-8",
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-ai-blue to-ai-purple">
            Parceria Com IA
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('home')} 
            className="font-medium text-foreground hover:text-ai-purple transition-colors"
          >
            Início
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="font-medium text-foreground hover:text-ai-purple transition-colors"
          >
            Serviços
          </button>
          <button 
            onClick={() => scrollToSection('portfolio')} 
            className="font-medium text-foreground hover:text-ai-purple transition-colors"
          >
            Portfólio
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="font-medium text-foreground hover:text-ai-purple transition-colors"
          >
            Sobre Nós
          </button>
        </div>

        <Button 
          onClick={() => scrollToSection('contact')} 
          className="hidden md:block bg-gradient-to-r from-ai-blue to-ai-purple hover:opacity-90 transition-opacity button-glow"
        >
          Contato
        </Button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-white z-40 md:hidden">
          <div className="flex flex-col items-center justify-start pt-10 space-y-8 h-full">
            <button 
              onClick={() => scrollToSection('home')} 
              className="font-medium text-xl text-foreground"
            >
              Início
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="font-medium text-xl text-foreground"
            >
              Serviços
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')} 
              className="font-medium text-xl text-foreground"
            >
              Portfólio
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="font-medium text-xl text-foreground"
            >
              Sobre Nós
            </button>
            <Button 
              onClick={() => scrollToSection('contact')} 
              className="bg-gradient-to-r from-ai-blue to-ai-purple hover:opacity-90 transition-opacity w-48"
            >
              Contato
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
