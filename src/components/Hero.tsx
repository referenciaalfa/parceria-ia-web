
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
              Parceria com IA – <span className="hero-text-gradient">O futuro da criatividade e automação</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              A Parceria com IA potencializa empresas e criadores, oferecendo automação inteligente, produção de conteúdo e soluções de IA que respeitam a identidade, criatividade e sensibilidade autoral de cada cliente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                onClick={() => scrollToSection('services')}
                className="bg-gradient-to-r from-ai-blue to-ai-purple text-white px-8 py-6 text-lg button-glow"
              >
                Solicite uma demonstração
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline" 
                className="px-8 py-6 text-lg border-ai-purple text-ai-purple hover:bg-ai-purple/10"
              >
                Fale com um especialista
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center z-10">
            <div className="relative">
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-ai-blue/20 to-ai-purple/20 blur-3xl absolute -z-10"></div>
              <div className="w-full max-w-lg overflow-hidden rounded-2xl glass-card p-2 animate-float">
                <img 
                  src="/lovable-uploads/8d60a238-3baa-4943-a7ab-9a308840ed12.png"
                  alt="Parceria com IA Banner" 
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
