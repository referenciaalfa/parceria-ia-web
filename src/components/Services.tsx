
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Code, Brain, Zap, Database, Globe, Shield } from "lucide-react";

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  variant 
}: { 
  icon: React.ElementType, 
  title: string, 
  description: string, 
  variant: "ai" | "automation" | "solutions" 
}) => {
  return (
    <Card className={`service-card service-card-${variant} group`}>
      <CardContent className="p-0 space-y-4">
        <div className="flex items-center justify-center h-16 w-16 bg-muted rounded-lg mb-4 group-hover:bg-gradient-to-r group-hover:from-ai-blue group-hover:to-ai-purple transition-colors duration-300">
          <Icon className="h-8 w-8 text-foreground group-hover:text-white transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Nossas <span className="hero-text-gradient">Soluções</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Desenvolvemos tecnologias de IA personalizadas para atender às necessidades específicas do seu negócio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={Brain} 
            title="Inteligência Artificial" 
            description="Soluções de IA personalizadas para análise de dados, reconhecimento de padrões e tomada de decisões."
            variant="ai"
          />
          
          <ServiceCard 
            icon={Code} 
            title="Automação de Processos" 
            description="Automatize tarefas repetitivas e fluxos de trabalho para aumentar a eficiência operacional."
            variant="automation"
          />
          
          <ServiceCard 
            icon={Zap} 
            title="Chatbots Inteligentes" 
            description="Assistentes virtuais com IA para atendimento ao cliente e suporte técnico 24/7."
            variant="solutions"
          />
          
          <ServiceCard 
            icon={Database} 
            title="Análise Preditiva" 
            description="Utilize dados históricos e algoritmos avançados para prever tendências e comportamentos futuros."
            variant="ai"
          />
          
          <ServiceCard 
            icon={Globe} 
            title="Soluções em Nuvem" 
            description="Infraestrutura escalável em nuvem para hospedar suas aplicações de IA com alta disponibilidade."
            variant="automation"
          />
          
          <ServiceCard 
            icon={Shield} 
            title="Segurança Inteligente" 
            description="Sistemas de segurança baseados em IA para detecção de ameaças e prevenção de fraudes."
            variant="solutions"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
