/* eslint-disable */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: BlogContent[];
  author: {
    name: string;
    image: string;
  };
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  likes: number;
  dislikes: number;
  tags: string[];
  metrics: PostMetrics; // Utilise l'interface PostMetrics dédiée
}

export interface PostMetrics {
  views: number;
  uniqueVisitors: number;
  averageReadTime: number;
  scrollDepth: number;
  exitPoints: Array<{ section: string; count: number }>; // Modifié pour inclure le compte
  readingProgress: Array<{ date: string; readers: number }>;
  engagementBySection: Array<{ section: string; timeSpent: number }>;
}

export type ContentType = 'text' | 'image' | 'video' | 'audio' | 'code';

export interface BlogContent {
  type: ContentType;
  content: string;
  caption?: string;
  language?: string; // Pour les blocs de code
  timestamp?: number; // Pour les médias
}

// Exemple d'utilisation :
const examplePost: BlogPost = {
  id: '1',
  slug: 'example-post',
  title: 'Example Post',
  description: 'Example description',
  content: [
    {
      type: 'text',
      content: 'Example content'
    }
  ],
  author: {
    name: 'John Doe',
    image: '/images/john-doe.webp'
  },
  coverImage: '/images/cover.webp',
  publishedAt: '2024-03-19T12:00:00Z',
  readingTime: 5,
  likes: 42,
  dislikes: 3,
  tags: ['React', 'TypeScript'],
  metrics: {
    views: 1200,
    uniqueVisitors: 800,
    averageReadTime: 5.2,
    scrollDepth: 75,
    exitPoints: [
      { section: "Introduction", count: 20 },
      { section: "Développement", count: 15 },
      { section: "Conclusion", count: 30 }
    ],
    readingProgress: [
      { date: "2024-03-01", readers: 100 },
      { date: "2024-03-02", readers: 150 }
    ],
    engagementBySection: [
      { section: "Introduction", timeSpent: 2.5 },
      { section: "Développement", timeSpent: 4.0 },
      { section: "Conclusion", timeSpent: 1.5 }
    ]
  }
};