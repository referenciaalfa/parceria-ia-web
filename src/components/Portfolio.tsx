
import React from 'react';
import CaseStudy from './portfolio/CaseStudy';
import { usePortfolioWebhook } from '@/hooks/usePortfolioWebhook';
import { getCaseStudies } from '@/data/caseStudies';

const Portfolio = () => {
  const { dynamicVideos } = usePortfolioWebhook();
  const caseStudies = getCaseStudies(dynamicVideos);

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
