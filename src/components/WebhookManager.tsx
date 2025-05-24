
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Webhook, Video, Send } from "lucide-react";

interface WebhookManagerProps {
  onVideoReceived?: (videoData: { url: string; title: string; caseStudyIndex: number }) => void;
}

const WebhookManager: React.FC<WebhookManagerProps> = ({ onVideoReceived }) => {
  const { toast } = useToast();
  const [webhookUrl, setWebhookUrl] = useState('');
  const [testVideoUrl, setTestVideoUrl] = useState('');
  const [testVideoTitle, setTestVideoTitle] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Simulate webhook endpoint
  const startWebhookListener = async () => {
    if (!webhookUrl) {
      toast({
        title: "URL do Webhook necessária",
        description: "Por favor, insira a URL do webhook do n8n",
        variant: "destructive",
      });
      return;
    }

    setIsListening(true);
    
    // In a real scenario, this would be a proper webhook endpoint
    // For demo purposes, we'll simulate the webhook reception
    toast({
      title: "Webhook ativo",
      description: `Aguardando vídeos do n8n em: ${webhookUrl}`,
    });

    // Simulate webhook data reception
    const simulateWebhookData = () => {
      const sampleVideoData = {
        type: 'VIDEO_WEBHOOK',
        videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        title: 'Vídeo recebido do N8N',
        caseStudyIndex: 0
      };

      window.postMessage(sampleVideoData, window.location.origin);
    };

    // For testing purposes, trigger after 3 seconds
    setTimeout(simulateWebhookData, 3000);
  };

  const stopWebhookListener = () => {
    setIsListening(false);
    toast({
      title: "Webhook desativado",
      description: "Parou de aguardar vídeos do n8n",
    });
  };

  const testVideoUpload = () => {
    if (!testVideoUrl || !testVideoTitle) {
      toast({
        title: "Dados incompletos",
        description: "Por favor, preencha URL e título do vídeo",
        variant: "destructive",
      });
      return;
    }

    const testData = {
      type: 'VIDEO_WEBHOOK',
      videoUrl: testVideoUrl,
      title: testVideoTitle,
      caseStudyIndex: 0
    };

    window.postMessage(testData, window.location.origin);
    
    // Clear test fields
    setTestVideoUrl('');
    setTestVideoTitle('');
    
    toast({
      title: "Vídeo de teste enviado",
      description: "O vídeo foi adicionado ao monitor",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            Configuração do Webhook N8N
          </CardTitle>
          <CardDescription>
            Configure o endpoint para receber vídeos do n8n
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="webhook-url" className="text-sm font-medium">
              URL do Webhook N8N
            </label>
            <Input
              id="webhook-url"
              placeholder="https://seu-n8n.com/webhook/videos"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            {!isListening ? (
              <Button onClick={startWebhookListener} className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Ativar Webhook
              </Button>
            ) : (
              <Button onClick={stopWebhookListener} variant="destructive" className="flex items-center gap-2">
                <Video className="h-4 w-4" />
                Desativar Webhook
              </Button>
            )}
          </div>

          {isListening && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✅ Webhook ativo - Aguardando vídeos do n8n
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5" />
            Teste de Vídeo
          </CardTitle>
          <CardDescription>
            Teste o sistema enviando um vídeo manualmente
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="test-url" className="text-sm font-medium">
              URL do Vídeo de Teste
            </label>
            <Input
              id="test-url"
              placeholder="https://example.com/video.mp4"
              value={testVideoUrl}
              onChange={(e) => setTestVideoUrl(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="test-title" className="text-sm font-medium">
              Título do Vídeo
            </label>
            <Input
              id="test-title"
              placeholder="Nome do vídeo"
              value={testVideoTitle}
              onChange={(e) => setTestVideoTitle(e.target.value)}
            />
          </div>
          
          <Button onClick={testVideoUpload} className="w-full flex items-center gap-2">
            <Send className="h-4 w-4" />
            Enviar Vídeo de Teste
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhookManager;
