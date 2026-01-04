
export type CMSSectionType = 'hero' | 'features' | 'stats' | 'cta' | 'testimonials' | 'text-content';

export interface CMSButton {
  label: string;
  link: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface CMSSection {
  id: string;
  type: CMSSectionType;
  heading?: string;
  subheading?: string;
  description?: string;
  image?: string;
  buttons?: CMSButton[];
  items?: any[];
}

export interface CMSPage {
  title: string;
  slug: string;
  metadata: {
    title: string;
    description: string;
  };
  sections: CMSSection[];
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  longDescription: string;
  // Fix: Added body property as it is populated by the Markdown parser in content.service.ts and consumed in Services.tsx
  body: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: number;
  type: 'free' | 'paid';
  category: string;
  image: string;
}

export interface PMHEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: string;
  category: 'masterclass' | 'corporate' | 'activity';
  image?: string;
}

export interface BlogPost {
  id: string;
  slug: string;        // ✅ REQUIRED (fixes slug error)
  title: string;
  excerpt: string;
  date: string;
  image: string | null;
  category: string;
  body: string;        // ✅ REQUIRED (Markdown content)
}


export interface GlobalConfig {
  siteName: string;
  logoUrl: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socials: {
    platform: string;
    url: string;
  }[];
}
