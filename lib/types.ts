export interface Room {
  id: string;
  title: string;
  location: string;
  price: number; // per night
  image: string;
  images: string[];
  type: 'private' | 'shared';
  amenities: string[];
  badges: string[];
  verified: boolean;
  host: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    verified: boolean;
  };
  description: string;
  features: {
    privateWc: boolean;
    furnished: boolean;
    wifi: boolean;
    kitchen: boolean;
    washer: boolean;
    airCondition: boolean;
  };
  studentsOnly: boolean;
  distance: number; // meters from campus
  instanceType?: 'short' | 'long'; // Optional for backwards compatibility
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FilterState {
  priceRange: [number, number];
  type: 'all' | 'private' | 'shared';
  privateWc: boolean;
  furnished: boolean;
  studentsOnly: boolean;
  verified: boolean;
  instanceType: 'all' | 'short' | 'long';
}

export interface User {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  credentialImage?: string;
}
