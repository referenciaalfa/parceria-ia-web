
import { useState, useEffect, useCallback } from 'react';

interface VideoData {
  url: string;
  title?: string;
  timestamp?: string;
}

interface WebhookData {
  video_url: string;
  title?: string;
  action?: 'play' | 'stop' | 'pause';
}

export const useVideoWebhook = () => {
  const [currentVideo, setCurrentVideo] = useState<VideoData | null>(null);
  const [webhookUrl, setWebhookUrl] = useState<string>('');
  const [isWebhookActive, setIsWebhookActive] = useState(false);
  const [webhookHistory, setWebhookHistory] = useState<VideoData[]>([]);

  // Generate a unique webhook URL for this session
  useEffect(() => {
    const sessionId = Math.random().toString(36).substring(2, 15);
    const baseUrl = window.location.origin;
    const generatedUrl = `${baseUrl}/webhook/video/${sessionId}`;
    setWebhookUrl(generatedUrl);
  }, []);

  // Simulate webhook endpoint by listening for custom events
  const handleWebhookData = useCallback((data: WebhookData) => {
    console.log('Webhook data received:', data);
    
    if (data.action === 'stop') {
      setCurrentVideo(null);
      return;
    }

    if (data.video_url) {
      const videoData: VideoData = {
        url: data.video_url,
        title: data.title || 'Video do n8n',
        timestamp: new Date().toISOString()
      };
      
      setCurrentVideo(videoData);
      setWebhookHistory(prev => [videoData, ...prev.slice(0, 9)]); // Keep last 10 videos
    }
  }, []);

  // Set up webhook listener
  useEffect(() => {
    const handleCustomWebhook = (event: CustomEvent) => {
      handleWebhookData(event.detail);
    };

    window.addEventListener('n8n-webhook' as any, handleCustomWebhook);
    setIsWebhookActive(true);

    return () => {
      window.removeEventListener('n8n-webhook' as any, handleCustomWebhook);
      setIsWebhookActive(false);
    };
  }, [handleWebhookData]);

  // Function to simulate webhook call (for testing)
  const simulateWebhook = useCallback((videoUrl: string, title?: string) => {
    const event = new CustomEvent('n8n-webhook', {
      detail: {
        video_url: videoUrl,
        title: title || 'Video de Teste',
        action: 'play'
      }
    });
    window.dispatchEvent(event);
  }, []);

  const stopVideo = useCallback(() => {
    setCurrentVideo(null);
  }, []);

  return {
    currentVideo,
    webhookUrl,
    isWebhookActive,
    webhookHistory,
    simulateWebhook,
    stopVideo
  };
};
