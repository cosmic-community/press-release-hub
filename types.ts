// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status: string;
  published_at: string;
}

// Company type
export interface Company extends CosmicObject {
  type: 'companies';
  metadata: {
    name: string;
    logo?: {
      url: string;
      imgix_url: string;
    };
    website?: string;
    about?: string;
    industry?: string;
    location?: string;
  };
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

// Press Release type
export interface PressRelease extends CosmicObject {
  type: 'press-releases';
  metadata: {
    headline: string;
    summary: string;
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    company?: Company;
    categories?: Category[];
    contact_name: string;
    contact_email: string;
    contact_phone?: string;
    release_date: string;
    featured?: boolean;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

// Type guards
export function isPressRelease(obj: CosmicObject): obj is PressRelease {
  return obj.type === 'press-releases';
}

export function isCompany(obj: CosmicObject): obj is Company {
  return obj.type === 'companies';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}