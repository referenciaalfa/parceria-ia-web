
import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen">
      <Navbar isScrolled={true} />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de Privacidade</h1>
          
          <div className="prose prose-lg">
            <p>
              A sua privacidade é prioridade para o Parceria com IA. Coletamos apenas os dados necessários para personalizar 
              sua experiência, automatizar tarefas e melhorar nossos serviços. Não vendemos ou compartilhamos seus dados 
              pessoais com terceiros. Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento 
              pelo e-mail contato@parceriacomia.com.br.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">Informações que coletamos</h2>
            <p>
              Podemos coletar informações pessoais como nome, endereço de e-mail, número de telefone e preferências 
              quando você se comunica conosco, solicita informações sobre nossos serviços ou se registra em nossa plataforma.
            </p>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">Como usamos suas informações</h2>
            <p>
              Utilizamos suas informações para:
            </p>
            <ul>
              <li>Fornecer, manter e melhorar nossos serviços</li>
              <li>Personalizar sua experiência com nossa plataforma</li>
              <li>Comunicar-nos com você sobre atualizações e promoções</li>
              <li>Melhorar nossos algoritmos de IA para oferecer soluções mais precisas</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-6 mb-4">Seus direitos</h2>
            <p>
              Você tem direito a:
            </p>
            <ul>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir informações imprecisas</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Restrição do processamento de seus dados</li>
              <li>Portabilidade de dados</li>
            </ul>
            
            <p className="mt-6">
              Para exercer qualquer um desses direitos, entre em contato conosco pelo e-mail contato@parceriacomia.com.br.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
