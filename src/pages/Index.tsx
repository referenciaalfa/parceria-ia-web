
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import WebhookManager from "@/components/WebhookManager";
import { useState } from "react";

const Index = () => {
  const [showWebhookManager, setShowWebhookManager] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar isScrolled={false} />
      <Hero />
      <About />
      <Services />
      
      {/* Toggle para mostrar/ocultar o gerenciador de webhook */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => setShowWebhookManager(!showWebhookManager)}
          className="bg-ai-purple text-white px-4 py-2 rounded-lg hover:bg-ai-purple/90 transition-colors"
        >
          {showWebhookManager ? 'Ocultar' : 'Mostrar'} Gerenciador de Webhook N8N
        </button>
      </div>
      
      {showWebhookManager && <WebhookManager />}
      
      <Portfolio />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
