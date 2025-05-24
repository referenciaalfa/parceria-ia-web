
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
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Monitor de Vídeo - n8n Webhook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <p className="text-gray-500">Aguardando vídeo do webhook...</p>
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
