
import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useVideoWebhook } from "@/hooks/useVideoWebhook";
import VideoDisplay from "./VideoDisplay";
import WebhookConfig from "./WebhookConfig";

interface VideoData {
  id: string;
  title: string;
}

interface CaseStudyProps {
  title: string;
  client: string;
  description: string;
  image?: string;
  videos?: VideoData[];
  results: { label: string; value: string }[];
  index: number;
}

const CaseStudy: React.FC<CaseStudyProps> = ({ 
  title, 
  client, 
  description, 
  image, 
  videos,
  results,
  index
}) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    // Initialize refs array based on videos length
    if (videos?.length) {
      videoRefs.current = videoRefs.current.slice(0, videos.length);
    }
  }, [videos]);

  useEffect(() => {
    // When API or current index changes, update the current video
    if (api && videos && videos.length > 0) {
      api.scrollTo(currentVideoIndex);
    }
  }, [api, currentVideoIndex, videos]);

  useEffect(() => {
    // Attempt to play videos after user interaction
    const handleUserInteraction = () => {
      if (videos && videoRefs.current[currentVideoIndex]) {
        videoRefs.current[currentVideoIndex]?.play().catch(error => {
          console.log("Video autoplay prevented:", error);
        });
      }
    };
    
    window.addEventListener('scroll', handleUserInteraction, { once: true });
    window.addEventListener('click', handleUserInteraction, { once: true });
    
    return () => {
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
    };
  }, [currentVideoIndex, videos]);

  const handleVideoChange = React.useCallback((index: number) => {
    setCurrentVideoIndex(index);
    
    // Pause all videos
    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        videoRef.pause();
      }
    });
    
    // Play the current video
    if (videoRefs.current[index]) {
      videoRefs.current[index]?.play().catch(error => {
        console.log("Video play prevented:", error);
      });
    }
  }, []);

  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center gap-8 py-12",
      index % 2 !== 0 ? "md:flex-row-reverse" : ""
    )}>
      <div className="md:w-1/2">
        {videos && videos.length > 0 ? (
          <div className="digital-screen">
            <Carousel 
              className="w-full"
              opts={{
                align: "start",
                loop: true
              }}
              setApi={setApi}
              onSelect={(_, selectedIndex) => {
                handleVideoChange(selectedIndex);
              }}
            >
              <CarouselContent>
                {videos.map((video, idx) => (
                  <CarouselItem key={video.id}>
                    <div className="digital-screen-frame p-2 bg-gray-800 rounded-xl shadow-2xl hover-lift overflow-hidden">
                      <div className="screen-bezel bg-black rounded-lg p-3 relative">
                        <div className="screen-reflection absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 pointer-events-none"></div>
                        <div className="indicator absolute top-2 right-2 size-2 rounded-full bg-red-500 shadow-glow-red z-20 animate-blink"></div>
                        <p className="text-xs text-gray-400 absolute top-2 left-2">{video.title}</p>
                        <AspectRatio ratio={16 / 9}>
                          <video 
                            ref={el => videoRefs.current[idx] = el}
                            className="w-full h-full object-cover rounded"
                            src={`https://drive.google.com/uc?export=view&id=${video.id}`}
                            loop
                            muted
                            playsInline
                            preload="auto"
                            controls
                          />
                        </AspectRatio>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center items-center gap-2 mt-4">
                <CarouselPrevious className="static transform-none" />
                <div className="text-sm text-muted-foreground">
                  {currentVideoIndex + 1} / {videos.length}
                </div>
                <CarouselNext className="static transform-none" />
              </div>
            </Carousel>
          </div>
        ) : image ? (
          <div className="glass-card overflow-hidden p-2 hover-lift">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>
        ) : null}
      </div>
      
      <div className="md:w-1/2 space-y-4">
        <div className="mb-4">
          <p className="text-sm text-ai-purple font-semibold uppercase tracking-wider">{client}</p>
          <h3 className="text-2xl font-bold mt-1">{title}</h3>
        </div>
        
        <p className="text-muted-foreground">{description}</p>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          {results.map((result, idx) => (
            <div key={idx} className="bg-muted rounded-lg p-4 text-center">
              <p className="text-xl md:text-2xl font-bold text-ai-purple">{result.value}</p>
              <p className="text-sm text-muted-foreground">{result.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const {
    currentVideo,
    webhookUrl,
    isWebhookActive,
    simulateWebhook,
    stopVideo
  } = useVideoWebhook();

  const caseStudies = [
    {
      title: "Automação de Atendimento ao Cliente",
      client: "Setor de Varejo",
      description: "Implementamos um sistema de chatbot com IA para uma grande rede de varejo, automatizando atendimentos e reduzindo o tempo de resposta.",
      videos: [
        { id: "1pYaBWyY4Xl3L7DPOm3h3qY12NRpYWBJS", title: "Demo do Chatbot IA" },
        { id: "1Lw6t2t_U4QiIQFarGKguCYuNgNt7Kico", title: "Resultados do Cliente" },
        { id: "1S9bXiVwkL7URfrFWMuzLo_afP-gYFXzi", title: "Análise de Casos" },
        { id: "1Lqv6jhv1TciieAeYfmGGwTUZ1DjEuFsA", title: "Benefícios do Sistema" }
      ],
      results: [
        { label: "Redução no tempo de resposta", value: "78%" },
        { label: "Aumento na satisfação do cliente", value: "42%" },
        { label: "Redução de custos operacionais", value: "35%" },
        { label: "Escalabilidade de atendimentos", value: "3x" }
      ]
    },
    {
      title: "Análise Preditiva para Manutenção",
      client: "Setor Industrial",
      description: "Desenvolvemos um sistema de manutenção preditiva utilizando IA para uma indústria, prevendo falhas em equipamentos antes que ocorressem.",
      videos: [
        { id: "1pYaBWyY4Xl3L7DPOm3h3qY12NRpYWBJS", title: "Sistema em Ação" },
        { id: "1Lw6t2t_U4QiIQFarGKguCYuNgNt7Kico", title: "Análise de Dados" },
        { id: "1S9bXiVwkL7URfrFWMuzLo_afP-gYFXzi", title: "Economia Gerada" }
      ],
      results: [
        { label: "Redução em tempo de inatividade", value: "63%" },
        { label: "Economia em custos de manutenção", value: "R$1.2M" },
        { label: "Aumento na vida útil dos equipamentos", value: "28%" },
        { label: "ROI do projeto", value: "356%" }
      ]
    },
    {
      title: "Sistema de Recomendação Inteligente",
      client: "E-commerce",
      description: "Criamos um sistema de recomendação personalizada para uma plataforma de e-commerce, aumentando significativamente as vendas cruzadas.",
      videos: [
        { id: "1pYaBWyY4Xl3L7DPOm3h3qY12NRpYWBJS", title: "Interface do Sistema" },
        { id: "1Lw6t2t_U4QiIQFarGKguCYuNgNt7Kico", title: "Performance de Vendas" }
      ],
      results: [
        { label: "Aumento em vendas cruzadas", value: "47%" },
        { label: "Melhoria na retenção de usuários", value: "32%" },
        { label: "Aumento no valor médio de pedidos", value: "23%" },
        { label: "Crescimento em receita anual", value: "18%" }
      ]
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Cases de <span className="hero-text-gradient">Sucesso</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Veja como nossas soluções de IA transformaram o desempenho de nossos clientes.
          </p>
        </div>

        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cases">Cases de Sucesso</TabsTrigger>
            <TabsTrigger value="webhook">Webhook n8n</TabsTrigger>
            <TabsTrigger value="monitor">Monitor de Vídeo</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cases" className="mt-8">
            <div className="space-y-16 md:space-y-24">
              {caseStudies.map((caseStudy, index) => (
                <CaseStudy 
                  key={index}
                  {...caseStudy}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="webhook" className="mt-8">
            <WebhookConfig
              webhookUrl={webhookUrl}
              isActive={isWebhookActive}
              onSimulateWebhook={simulateWebhook}
            />
          </TabsContent>
          
          <TabsContent value="monitor" className="mt-8">
            <VideoDisplay
              video={currentVideo}
              onStop={stopVideo}
            />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Portfolio;
