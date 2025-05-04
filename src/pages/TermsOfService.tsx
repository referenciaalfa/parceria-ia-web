
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen">
      <Navbar isScrolled={true} />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Termos de Serviço</h1>
          
          <div className="prose prose-lg">
            <p>
              Ao acessar e utilizar o Parceria com IA, você concorda com nossos Termos de Serviço. 
              Oferecemos ferramentas de automação e IA para empresas e criadores, sempre respeitando 
              a identidade e criatividade do usuário. O conteúdo gerado é de responsabilidade do usuário. 
              Dúvidas? Fale conosco: contato@parceriacomia.com.br
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">1. Aceitação dos Termos</h2>
            <p>
              Ao utilizar nossos serviços, você concorda em cumprir estes termos. Se não concordar com 
              qualquer parte destes termos, não poderá utilizar nossos serviços.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">2. Descrição dos Serviços</h2>
            <p>
              A Parceria com IA fornece ferramentas de automação, produção de conteúdo e soluções personalizadas 
              de inteligência artificial para empresas e criadores. Nossos serviços estão sujeitos a modificações 
              e atualizações sem aviso prévio.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">3. Responsabilidade pelo Conteúdo</h2>
            <p>
              Você é responsável por todo o conteúdo gerado utilizando nossos serviços. A Parceria com IA 
              não se responsabiliza por conteúdo que viole direitos autorais, marcas registradas ou 
              outros direitos de propriedade intelectual.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">4. Uso Aceitável</h2>
            <p>
              Você concorda em não utilizar nossos serviços para:
            </p>
            <ul>
              <li>Gerar conteúdo ilegal, difamatório, fraudulento ou enganoso</li>
              <li>Violar direitos de propriedade intelectual de terceiros</li>
              <li>Distribuir malware ou realizar atividades que possam prejudicar nossa infraestrutura</li>
              <li>Qualquer finalidade que viole leis locais, nacionais ou internacionais</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">5. Contato</h2>
            <p>
              Para quaisquer dúvidas relacionadas a estes termos, entre em contato conosco pelo e-mail: 
              contato@parceriacomia.com.br
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
