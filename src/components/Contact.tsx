
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim()) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, informe seu nome",
        variant: "destructive",
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, informe um email válido",
        variant: "destructive",
      });
      return;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Erro no formulário",
        description: "Por favor, escreva uma mensagem",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Email configuration using EmailJS (public client side approach)
    const emailData = {
      service_id: 'service_id', // Replace with your EmailJS service ID
      template_id: 'template_id', // Replace with your EmailJS template ID
      user_id: 'public_key', // Replace with your EmailJS public key
      template_params: {
        from_name: formData.name,
        reply_to: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
      }
    };

    try {
      // For demo purposes, we're simulating a successful email sending
      // In a real scenario, you would use EmailJS API or similar service
      console.log('Sending email data:', emailData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Entre em <span className="hero-text-gradient">Contato</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Estamos prontos para ajudar a transformar sua empresa com soluções de IA personalizadas.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Nome completo</label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                    className="border-gray-300 focus:border-ai-purple"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                    className="border-gray-300 focus:border-ai-purple"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Telefone</label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(00) 00000-0000"
                    className="border-gray-300 focus:border-ai-purple"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium">Empresa</label>
                  <Input 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Nome da empresa"
                    className="border-gray-300 focus:border-ai-purple"
                  />
                </div>
              </div>
              <div className="space-y-2 mb-6">
                <label htmlFor="message" className="text-sm font-medium">Mensagem</label>
                <Textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Como podemos ajudar?"
                  required
                  rows={5}
                  className="border-gray-300 focus:border-ai-purple resize-none"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-ai-blue to-ai-purple hover:opacity-90 transition-opacity py-6"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Enviar mensagem
                    <Send className="ml-2 h-5 w-5" />
                  </span>
                )}
              </Button>
            </form>
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
              <h3 className="text-xl font-bold mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-ai-purple mt-1" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-gray-600">parceriacomia@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-ai-purple mt-1" />
                  <div>
                    <p className="text-sm font-medium">Telefone</p>
                    <p className="text-gray-600">+55 12 98130-1666</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-ai-purple mt-1" />
                  <div>
                    <p className="text-sm font-medium">Endereço</p>
                    <p className="text-gray-600">Guarulhos, SP</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Horário de Atendimento</h3>
              <p className="text-gray-600">
                Segunda a Sexta:<br />
                9h às 18h
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
