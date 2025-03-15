import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles } from '@/utils/markdown-parser';
import { BlogArticle } from '@/interfaces/blog';
import ViewCounter from '@/components/blog/view-counter';

interface RelatedPostsProps {
  currentSlug: string;
  categories: string[];
  tags: string[];
}

export default async function RelatedPosts({ currentSlug, categories, tags }: RelatedPostsProps) {
  const allArticles: BlogArticle[] = await getAllArticles();
  const otherArticles: BlogArticle[] = allArticles.filter(article => article.slug !== currentSlug);
  
  if (otherArticles.length === 0) {
    return null;
  }

  const scoredArticles = otherArticles.map(article => {
    let score = 0;

    const commonCategories = categories.filter(cat => 
      article.categories.includes(cat)
    );
    score += commonCategories.length * 3;

    const commonTags = tags.filter(tag => 
      article.tags.includes(tag)
    );
    score += commonTags.length * 2;
    
    return { article, score };
  });

  const relatedArticles = scoredArticles
    .sort((a, b) => b.score - a.score)
    .map(item => item.article)
    .slice(0, 3);

  if (relatedArticles.length < 3) {
    const recentArticles: BlogArticle[] = otherArticles
      .filter(article => !relatedArticles.includes(article))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3 - relatedArticles.length);
    
    relatedArticles.push(...recentArticles);
  }
  
  return (
    <section className="related-posts">
      <h2 className="related-posts__title">
        Articles similaires
      </h2>
      
      <div className="related-posts__grid">
        {relatedArticles.map(article => (
          <RelatedPostCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

function RelatedPostCard({ article }: { article: BlogArticle }) {
  return (
    <article className="related-post-card">
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="related-post-card__image-container">
          <Image
            src={article.image || '/images/default-blog-image.jpg'}
            alt={article.title}
            fill
            className="related-post-card__image"
          />
        </div>
      </Link>
      
      <div className="related-post-card__content">
        <h3 className="related-post-card__title">
          <Link href={`/blog/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        
        <div className="related-post-card__meta">
          <time dateTime={article.date} className="related-post-card__date">
            {new Date(article.date).toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          <ViewCounter slug={article.slug} />
        </div>
      </div>
    </article>
  );
}