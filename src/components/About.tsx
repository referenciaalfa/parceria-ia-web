
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="relative">
              <div className="w-full h-80 md:h-[500px] bg-gradient-to-r from-ai-blue/10 to-ai-purple/10 rounded-2xl"></div>
              <img 
                src="/lovable-uploads/09d9586e-476b-4f18-b5d0-c52036ce795d.png" 
                alt="Equipe Parceria Com IA" 
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 glass-card p-6 rounded-xl shadow-lg">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold hero-text-gradient">5+</span>
                  <span className="text-sm text-gray-600">Anos de experiência</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Sobre a <span className="hero-text-gradient">Parceria Com IA</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-ai-blue to-ai-purple rounded"></div>
            </div>
            
            <p className="text-lg text-gray-700">
              A Parceria Com IA nasceu da paixão por inovação e da crença de que a Inteligência Artificial pode transformar fundamentalmente a maneira como os negócios operam.
            </p>
            
            <p className="text-lg text-gray-700">
              Nossa missão é democratizar o acesso à tecnologia de IA, tornando-a acessível e aplicável para empresas de todos os tamanhos. Combinamos conhecimento técnico avançado com um profundo entendimento dos desafios de negócios.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-ai-blue">100+</div>
                <p className="text-sm text-gray-600">Projetos concluídos</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-ai-purple">92%</div>
                <p className="text-sm text-gray-600">Taxa de satisfação</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-ai-turquoise">25+</div>
                <p className="text-sm text-gray-600">Especialistas em IA</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-3xl font-bold text-ai-blue">12</div>
                <p className="text-sm text-gray-600">Prêmios de inovação</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
