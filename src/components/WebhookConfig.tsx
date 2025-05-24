
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, TestTube, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WebhookConfigProps {
  webhookUrl: string;
  isActive: boolean;
  onSimulateWebhook: (videoUrl: string, title?: string) => void;
}

const WebhookConfig: React.FC<WebhookConfigProps> = ({
  webhookUrl,
  isActive,
  onSimulateWebhook
}) => {
  const [testVideoUrl, setTestVideoUrl] = useState('');
  const [testTitle, setTestTitle] = useState('');
  const { toast } = useToast();

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast({
      title: "URL copiada!",
      description: "A URL do webhook foi copiada para a área de transferência.",
    });
  };

  const handleTest = () => {
    if (!testVideoUrl) {
      toast({
        title: "Erro",
        description: "Por favor, insira uma URL de vídeo para testar.",
        variant: "destructive",
      });
      return;
    }

    onSimulateWebhook(testVideoUrl, testTitle || 'Video de Teste');
    toast({
      title: "Teste enviado!",
      description: "O vídeo de teste foi enviado para o display.",
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Configuração do Webhook n8n
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="webhook-url">URL do Webhook</Label>
          <div className="flex gap-2 mt-1">
            <Input
              id="webhook-url"
              value={webhookUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button onClick={copyWebhookUrl} variant="outline" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Status: {isActive ? '🟢 Ativo' : '🔴 Inativo'}
          </p>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <h4 className="font-semibold mb-2">Formato esperado do JSON:</h4>
          <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
{`{
  "video_url": "https://example.com/video.mp4",
  "title": "Título do Vídeo (opcional)",
  "action": "play"
}`}
          </pre>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Testar Webhook</h4>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="test-url">URL do Vídeo</Label>
              <Input
                id="test-url"
                placeholder="https://example.com/video.mp4"
                value={testVideoUrl}
                onChange={(e) => setTestVideoUrl(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="test-title">Título (opcional)</Label>
              <Input
                id="test-title"
                placeholder="Nome do vídeo"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
              />
            </div>
            <Button onClick={handleTest} className="w-full">
              <TestTube className="h-4 w-4 mr-2" />
              Testar Exibição
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebhookConfig;
