
import React from 'react';
import { cn } from "@/lib/utils";

interface CaseStudyProps {
  title: string;
  client: string;
  description: string;
  image: string;
  results: { label: string; value: string }[];
  index: number;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ 
  title, 
  client, 
  description, 
  image, 
  results,
  index
}) => {
  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center gap-8 py-12",
      index % 2 !== 0 ? "md:flex-row-reverse" : ""
    )}>
      <div className="md:w-1/2">
        <div className="glass-card overflow-hidden p-2 hover-lift">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-64 md:h-80 object-cover rounded-lg"
          />
        </div>
      </div>
      
      <div className="md:w-1/2 space-y-4">
        <div className="mb-4">
          <p className="text-sm text-ai-purple font-semibold uppercase tracking-wider">{client}</p>
          <h3 className="text-2xl font-bold mt-1">{title}</h3>
        </div>
        
        <p className="text-muted-foreground">{description}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          {results.map((result, idx) => (
            <div key={idx} className="bg-muted rounded-lg p-4 text-center">
              <p className="text-xl md:text-2xl font-bold text-ai-purple">{result.value}</p>
              <p className="text-sm text-muted-foreground">{result.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const caseStudies = [
    {
      title: "Automação de Atendimento ao Cliente",
      client: "Setor de Varejo",
      description: "Implementamos um sistema de chatbot com IA para uma grande rede de varejo, automatizando atendimentos e reduzindo o tempo de resposta.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
      results: [
        { label: "Redução no tempo de resposta", value: "78%" },
        { label: "Aumento na satisfação do cliente", value: "42%" },
        { label: "Redução de custos operacionais", value: "35%" },
        { label: "Escalabilidade de atendimentos", value: "3x" }
      ]
    },
    {
      title: "Análise Preditiva para Manutenção",
      client: "Setor Industrial",
      description: "Desenvolvemos um sistema de manutenção preditiva utilizando IA para uma indústria, prevendo falhas em equipamentos antes que ocorressem.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      results: [
        { label: "Redução em tempo de inatividade", value: "63%" },
        { label: "Economia em custos de manutenção", value: "R$1.2M" },
        { label: "Aumento na vida útil dos equipamentos", value: "28%" },
        { label: "ROI do projeto", value: "356%" }
      ]
    },
    {
      title: "Sistema de Recomendação Inteligente",
      client: "E-commerce",
      description: "Criamos um sistema de recomendação personalizada para uma plataforma de e-commerce, aumentando significativamente as vendas cruzadas.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
      results: [
        { label: "Aumento em vendas cruzadas", value: "47%" },
        { label: "Melhoria na retenção de usuários", value: "32%" },
        { label: "Aumento no valor médio de pedidos", value: "23%" },
        { label: "Crescimento em receita anual", value: "18%" }
      ]
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cases de <span className="hero-text-gradient">Sucesso</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja como nossas soluções de IA transformaram o desempenho de nossos clientes.
          </p>
        </div>
        
        <div className="space-y-16 md:space-y-24">
          {caseStudies.map((caseStudy, index) => (
            <CaseStudy 
              key={index}
              {...caseStudy}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
