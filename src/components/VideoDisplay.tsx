
import React, { useRef, useEffect, useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, Square, Volume2, VolumeX } from "lucide-react";

interface VideoData {
  url: string;
  title?: string;
  timestamp?: string;
}

interface VideoDisplayProps {
  video: VideoData | null;
  onStop?: () => void;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({ video, onStop }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (video && videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, [video]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!video) {
    return (
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Monitor de Vídeo - n8n Webhook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Monitor 1 */}
            <div className="digital-screen-frame p-2 bg-gray-800 rounded-xl shadow-2xl">
              <div className="screen-bezel bg-black rounded-lg p-3 relative">
                <div className="screen-reflection absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 pointer-events-none"></div>
                <div className="indicator absolute top-2 right-2 size-2 rounded-full bg-red-500 shadow-glow-red z-20 animate-blink"></div>
                <p className="text-xs text-gray-400 absolute top-2 left-2 z-20">Monitor 1</p>
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src="/lovable-uploads/fda26d1c-2b9d-4e98-8234-f0ccbf12b37b.png" 
                    alt="Monitor 1 - Parceria Com IA" 
                    className="w-full h-full object-cover rounded"
                  />
                </AspectRatio>
              </div>
            </div>

            {/* Monitor 2 */}
            <div className="digital-screen-frame p-2 bg-gray-800 rounded-xl shadow-2xl">
              <div className="screen-bezel bg-black rounded-lg p-3 relative">
                <div className="screen-reflection absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-10 pointer-events-none"></div>
                <div className="indicator absolute top-2 right-2 size-2 rounded-full bg-red-500 shadow-glow-red z-20 animate-blink"></div>
                <p className="text-xs text-gray-400 absolute top-2 left-2 z-20">Monitor 2</p>
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src="/lovable-uploads/8d60a238-3baa-4943-a7ab-9a308840ed12.png" 
                    alt="Monitor 2 - AI Technology" 
                    className="w-full h-full object-cover rounded"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4 text-gray-500">
            Aguardando vídeo do webhook...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">{video.title}</CardTitle>
        {video.timestamp && (
          <p className="text-sm text-gray-500 text-center">
            Recebido em: {new Date(video.timestamp).toLocaleString()}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <AspectRatio ratio={16 / 9}>
            <video
              ref={videoRef}
              className="w-full h-full object-cover rounded-lg"
              src={video.url}
              controls
              muted={isMuted}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />
          </AspectRatio>
          
          <div className="flex justify-center space-x-2">
            <Button onClick={handlePlayPause} variant="outline" size="sm">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button onClick={handleMute} variant="outline" size="sm">
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>
            <Button onClick={onStop} variant="outline" size="sm">
              <Square className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoDisplay;
