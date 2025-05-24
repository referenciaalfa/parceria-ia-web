
import React from 'react';
import { cn } from "@/lib/utils";
import VideoCarousel from './VideoCarousel';
import { CaseStudyData } from "@/types/portfolio";

interface CaseStudyProps extends CaseStudyData {
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
  return (
    <div className={cn(
      "flex flex-col md:flex-row items-center gap-8 py-12",
      index % 2 !== 0 ? "md:flex-row-reverse" : ""
    )}>
      <div className="md:w-1/2">
        {videos && videos.length > 0 ? (
          <VideoCarousel videos={videos} />
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

export default CaseStudy;
