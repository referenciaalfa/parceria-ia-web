
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Brain, X, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    { 
      sender: 'bot',
      text: 'Olá! Sou o assistente virtual da Parceria com IA. Como posso ajudar você hoje?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // The webhook URL for the AI agent
  const WEBHOOK_URL = "https://nwh.parceriacomia.com.br/webhook/Agenteparceriacomia";

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [
      ...prev, 
      { 
        sender: 'user',
        text: message 
      }
    ]);
    
    const userMessage = message;
    
    // Clear input
    setMessage('');
    setIsLoading(true);
    
    try {
      // Send message to webhook
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          timestamp: new Date().toISOString(),
          source: window.location.href
        }),
      });
      
      const data = await response.json();
      console.log("Webhook response:", data);
      
      let botResponse = "Obrigado pelo seu interesse em nossos serviços! Estou encaminhando sua mensagem para a nossa equipe.";
      
      // Verifica os diferentes formatos de resposta possíveis
      if (data) {
        if (data.output) {
          botResponse = data.output;
        } else if (data.response) {
          botResponse = data.response;
        } else if (data.message && data.message !== "Workflow was started") {
          botResponse = data.message;
        } else {
          // Aguarda um curto período para receber a resposta assincrona
          setTimeout(async () => {
            try {
              const checkResponse = await fetch(WEBHOOK_URL, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  check_status: true,
                  original_message: userMessage,
                  timestamp: new Date().toISOString(),
                }),
              });
              
              const checkData = await checkResponse.json();
              console.log("Check status response:", checkData);
              
              if (checkData && (checkData.output || checkData.response)) {
                const finalResponse = checkData.output || checkData.response;
                setConversation(prev => [
                  ...prev,
                  {
                    sender: 'bot',
                    text: finalResponse
                  }
                ]);
              }
            } catch (error) {
              console.log("Error checking status:", error);
            }
          }, 2000);
        }
      }
      
      // Add bot response to conversation if we have something immediately
      if (botResponse && botResponse !== "Workflow was started") {
        setConversation(prev => [
          ...prev,
          {
            sender: 'bot',
            text: botResponse
          }
        ]);
      }
    } catch (error) {
      console.error("Error sending message to webhook:", error);
      
      // Add fallback response if webhook fails
      setConversation(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Desculpe, estou enfrentando problemas para me conectar. Por favor, tente novamente mais tarde ou entre em contato pelo WhatsApp.'
        }
      ]);
      
      toast.error("Erro ao conectar com o serviço de chat. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
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
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg flex items-center space-x-1">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
            <Input 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" className="bg-ai-purple hover:bg-ai-blue" disabled={isLoading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default AIChat;
