
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Code, 
  Brain, 
  Zap, 
  Calendar, 
  MessageCircle, 
  TrendingUp, 
  Phone 
} from "lucide-react";

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
            Desenvolvemos tecnologias de IA personalizadas para atender às necessidades específicas do seu negócio e aprimorar sua presença digital.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            icon={Code} 
            title="Automação de Processos" 
            description="Automatize tarefas repetitivas e fluxos de trabalho para aumentar a eficiência operacional da sua empresa."
            variant="automation"
          />
          
          <ServiceCard 
            icon={Calendar} 
            title="Geração e Agendamento de Conteúdo" 
            description="Crie e programe conteúdo com IA mantendo sua identidade e estilo autoral único."
            variant="solutions"
          />
          
          <ServiceCard 
            icon={Brain} 
            title="Soluções Personalizadas de IA" 
            description="Desenvolvemos soluções de IA sob medida para resolver desafios específicos do seu negócio."
            variant="ai"
          />
          
          <ServiceCard 
            icon={Zap} 
            title="Consultoria para Criadores" 
            description="Orientação especializada para criadores e marcas que desejam integrar IA em seus processos criativos."
            variant="solutions"
          />
          
          <ServiceCard 
            icon={MessageCircle} 
            title="Respostas Automáticas" 
            description="Sistemas inteligentes de resposta para interação com seu público nas redes sociais, 24 horas por dia."
            variant="automation"
          />
          
          <ServiceCard 
            icon={TrendingUp} 
            title="Análise de Tendências" 
            description="Monitore tendências de mercado e obtenha insights valiosos para direcionar sua estratégia de negócios."
            variant="ai"
          />
          
          <ServiceCard 
            icon={Phone} 
            title="Integração de Canais" 
            description="Conecte WhatsApp, Telegram, E-mail e TikTok com soluções de IA para uma presença digital integrada."
            variant="automation"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
