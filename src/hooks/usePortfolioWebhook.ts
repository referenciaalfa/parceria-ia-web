
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { VideoData } from "@/types/portfolio";

export const usePortfolioWebhook = () => {
  const { toast } = useToast();
  const [dynamicVideos, setDynamicVideos] = useState<VideoData[]>([]);

  useEffect(() => {
    const handleWebhookData = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      
      if (event.data.type === 'VIDEO_WEBHOOK') {
        const { videoUrl, title, caseStudyIndex } = event.data;
        
        if (videoUrl && title !== undefined && caseStudyIndex !== undefined) {
          const newVideo: VideoData = {
            id: `webhook-${Date.now()}`,
            title: title || 'Vídeo do N8N',
            url: videoUrl
          };
          
          setDynamicVideos(prev => [...prev, newVideo]);
          
          toast({
            title: "Novo vídeo recebido",
            description: `Vídeo "${newVideo.title}" foi adicionado com sucesso`,
          });
        }
      }
    };

    window.addEventListener('message', handleWebhookData);
    return () => window.removeEventListener('message', handleWebhookData);
  }, [toast]);

  return { dynamicVideos };
};
