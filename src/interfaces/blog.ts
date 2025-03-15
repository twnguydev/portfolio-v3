export interface BlogArticle {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastModified?: string;
  image?: string;
  imageAlt?: string;
  categories: string[];
  tags: string[];
  author: {
    name: string;
    image?: string;
    bio?: string;
  };
  readingTime: number;
  content: string;
  toc?: TableOfContents;
  featured?: boolean;
  draft?: boolean;
  views?: number;
  
  canonical?: string;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export interface TableOfContents {
  items: TOCItem[];
}

export interface TOCItem {
  id: string;
  text: string;
  level: number;
  items?: TOCItem[];
}

export interface BlogCategory {
  name: string;
  slug: string;
  description?: string;
  count: number;
}

export interface BlogTag {
  name: string;
  slug: string;
  count: number;
}