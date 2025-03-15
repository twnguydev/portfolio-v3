import { BlogArticle } from '@/interfaces/blog';

interface SchemaOrgArticle {
  '@context': string;
  '@type': string;
  headline: string;
  description: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  author: {
    '@type': string;
    name: string;
    url?: string;
  };
  publisher: {
    '@type': string;
    name: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  mainEntityOfPage: {
    '@type': string;
    '@id': string;
  };
  keywords?: string;
}

export function generateArticleSchema(article: BlogArticle, baseUrl: string): SchemaOrgArticle {
  const articleUrl = `${baseUrl}/blog/${article.slug}`;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image ? [article.image] : [`${baseUrl}/images/default-blog-image.jpg`],
    datePublished: article.date,
    dateModified: article.lastModified || article.date,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: baseUrl
    },
    publisher: {
      '@type': 'Organization',
      name: 'Votre Portfolio',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/images/logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl
    },
    keywords: article.tags.join(', ')
  };
}

export function generateBreadcrumbSchema(article: BlogArticle, baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Accueil',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${baseUrl}/blog`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: `${baseUrl}/blog/${article.slug}`
      }
    ]
  };
}

export function generateBlogSchema(articles: BlogArticle[], baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    headline: 'Blog Portfolio',
    description: 'Articles, tutoriels et réflexions sur le développement web et le design.',
    url: `${baseUrl}/blog`,
    blogPost: articles.slice(0, 10).map(article => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.description,
      datePublished: article.date,
      url: `${baseUrl}/blog/${article.slug}`
    }))
  };
}