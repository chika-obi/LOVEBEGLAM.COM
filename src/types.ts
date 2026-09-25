export type ServiceCategory = 'makeup' | 'frontal' | 'revamp' | 'training';

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  description: string;
  priceStartingAt: number;
  duration: string;
  features: string[];
  popular?: boolean;
  image: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: ServiceCategory;
  description: string;
  tag: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  youtubeId?: string;
  thumbnail: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
