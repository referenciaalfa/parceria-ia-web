
export interface VideoData {
  id: string;
  title: string;
  url?: string;
}

export interface CaseStudyData {
  title: string;
  client: string;
  description: string;
  image?: string;
  videos?: VideoData[];
  results: { label: string; value: string }[];
}
