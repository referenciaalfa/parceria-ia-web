
import React from 'react';

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/5500000000000" // Substitua pelo número correto
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-24 right-8 bg-green-500 text-white h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors z-30"
      aria-label="Contato via WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;
