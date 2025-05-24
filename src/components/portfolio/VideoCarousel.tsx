
import React, { useRef, useEffect, useState } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { VideoData } from "@/types/portfolio";

interface VideoCarouselProps {
  videos: VideoData[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ videos }) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [api, setApi] = useState<any>(null);

  useEffect(() => {
    if (videos?.length) {
      videoRefs.current = videoRefs.current.slice(0, videos.length);
    }
  }, [videos]);

  useEffect(() => {
    if (api && videos && videos.length > 0) {
      api.scrollTo(currentVideoIndex);
    }
  }, [api, currentVideoIndex, videos]);

  useEffect(() => {
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
    
    videoRefs.current.forEach((videoRef) => {
      if (videoRef) {
        videoRef.pause();
      }
    });
    
    if (videoRefs.current[index]) {
      videoRefs.current[index]?.play().catch(error => {
        console.log("Video play prevented:", error);
      });
    }
  }, []);

  return (
    <div className="digital-screen">
      <Carousel 
        className="w-full"
        opts={{
          align: "start",
          loop: true
        }}
        setApi={setApi}
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
                      src={video.url || `https://drive.google.com/file/d/${video.id}/preview`}
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
          <CarouselPrevious 
            className="static transform-none" 
            onClick={() => {
              const newIndex = currentVideoIndex > 0 ? currentVideoIndex - 1 : videos.length - 1;
              handleVideoChange(newIndex);
            }}
          />
          <div className="text-sm text-muted-foreground">
            {currentVideoIndex + 1} / {videos.length}
          </div>
          <CarouselNext 
            className="static transform-none"
            onClick={() => {
              const newIndex = currentVideoIndex < videos.length - 1 ? currentVideoIndex + 1 : 0;
              handleVideoChange(newIndex);
            }}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default VideoCarousel;
