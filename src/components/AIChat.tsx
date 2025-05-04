
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Brain, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    { 
      sender: 'bot',
      text: 'Olá! Sou o assistente virtual da Parceria com IA. Como posso ajudar você hoje?'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation([
      ...conversation, 
      { 
        sender: 'user',
        text: message 
      }
    ]);
    
    // Clear input
    setMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      // This would be replaced with an actual API call to n8n
      setConversation(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Obrigado pelo seu interesse em nossos serviços! Estou encaminhando sua mensagem para a nossa equipe. Podemos ajudar com soluções de IA para sua empresa ou projetos pessoais. Deseja uma demonstração de algum serviço específico?'
        }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-40 right-8 bg-ai-purple text-white h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:bg-ai-blue transition-colors z-30"
        aria-label="Abrir chat com IA"
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <Brain className="h-6 w-6" />
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-80 sm:w-96 h-96 bg-white rounded-xl shadow-2xl overflow-hidden z-40 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-ai-blue to-ai-purple p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-white" />
              <h3 className="font-medium text-white">Assistente IA</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.sender === 'user' 
                      ? 'bg-ai-purple text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
            <Input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1"
            />
            <Button type="submit" size="icon" className="bg-ai-purple hover:bg-ai-blue">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChat;
