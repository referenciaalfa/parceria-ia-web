
import { useState, useEffect, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

interface VideoWebhookData {
  url: string;
  title: string;
  caseStudyIndex?: number;
  timestamp?: string;
}

interface WebhookResponse {
  success: boolean;
  message: string;
  data?: VideoWebhookData;
}

export const useWebhook = () => {
  const { toast } = useToast();
  const [isListening, setIsListening] = useState(false);
  const [receivedVideos, setReceivedVideos] = useState<VideoWebhookData[]>([]);

  // Create webhook endpoint URL
  const webhookEndpoint = `${window.location.origin}/api/webhook/videos`;

  // Handle incoming webhook data
  const handleWebhookData = useCallback((data: VideoWebhookData) => {
    console.log('Webhook data received:', data);
    
    setReceivedVideos(prev => [...prev, data]);
    
    // Dispatch custom event for other components to listen
    const customEvent = new CustomEvent('videoWebhookReceived', {
      detail: data
    });
    window.dispatchEvent(customEvent);
    
    toast({
      title: "Novo vídeo recebido via webhook",
      description: `Vídeo "${data.title}" foi adicionado com sucesso`,
    });
  }, [toast]);

  // Simulate webhook listener (in a real app, this would be a server endpoint)
  const createWebhookListener = useCallback(() => {
    // In a production environment, you would set up an actual webhook endpoint
    // This is a simulation for demonstration purposes
    
    if (!isListening) return;

    const handlePostMessage = (event: MessageEvent) => {
      if (event.data.type === 'N8N_VIDEO_WEBHOOK') {
        handleWebhookData(event.data.payload);
      }
    };

    window.addEventListener('message', handlePostMessage);
    
    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  }, [isListening, handleWebhookData]);

  // Start webhook listener
  const startListener = useCallback(() => {
    setIsListening(true);
    toast({
      title: "Webhook ativado",
      description: `Endpoint: ${webhookEndpoint}`,
    });
  }, [webhookEndpoint, toast]);

  // Stop webhook listener
  const stopListener = useCallback(() => {
    setIsListening(false);
    toast({
      title: "Webhook desativado",
      description: "Parou de aguardar dados do n8n",
    });
  }, [toast]);

  // Test webhook with sample data
  const testWebhook = useCallback((videoData: VideoWebhookData) => {
    const testMessage = {
      type: 'N8N_VIDEO_WEBHOOK',
      payload: {
        ...videoData,
        timestamp: new Date().toISOString()
      }
    };
    
    window.postMessage(testMessage, window.location.origin);
  }, []);

  useEffect(() => {
    const cleanup = createWebhookListener();
    return cleanup;
  }, [createWebhookListener]);

  return {
    isListening,
    receivedVideos,
    webhookEndpoint,
    startListener,
    stopListener,
    testWebhook,
    handleWebhookData
  };
};
