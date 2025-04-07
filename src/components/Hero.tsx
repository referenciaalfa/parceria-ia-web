
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden bg-hero-pattern"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-8 text-center md:text-left z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Revolucione seu negócio com <span className="hero-text-gradient">Inteligência Artificial</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              Somos especialistas em desenvolver soluções personalizadas de IA e automação para impulsionar a inovação e eficiência da sua empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                onClick={() => scrollToSection('services')}
                className="bg-gradient-to-r from-ai-blue to-ai-purple text-white px-8 py-6 text-lg button-glow"
              >
                Nossos Serviços
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline" 
                className="px-8 py-6 text-lg border-ai-purple text-ai-purple hover:bg-ai-purple/10"
              >
                Fale Conosco
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center z-10">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-ai-blue/20 to-ai-purple/20 blur-3xl absolute -z-10"></div>
              <div className="w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-2xl glass-card p-2 animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                  alt="Inovação com IA" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-green-400"></div>
                  <p className="font-medium text-sm">IA em ação</p>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 glass-card p-4 rounded-xl shadow-lg animate-float" style={{ animationDelay: "2s" }}>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full bg-ai-purple"></div>
                  <p className="font-medium text-sm">Soluções inteligentes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-8 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
