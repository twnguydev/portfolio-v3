import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAllArticles } from '@/utils/markdown-parser';
import { attachViewsToArticles } from '@/utils/views-counter';
import CategoryTag from '@/components/blog/category-tag';
import ViewCounter from '@/components/blog/view-counter';
import { BlogArticle } from '@/interfaces/blog';

export const revalidate = 3600;

type Props = {
  params: Promise<{ tag: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `Articles avec le tag #${tagName} | Blog Portfolio`,
    description: `Découvrez tous mes articles, tutoriels et ressources tagués avec #${tagName}.`,
    openGraph: {
      title: `Articles avec le tag #${tagName} | Blog Portfolio`,
      description: `Découvrez tous mes articles, tutoriels et ressources tagués avec #${tagName}.`,
      url: `https://votreportfolio.com/blog/tag/${tag}`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const articles: BlogArticle[] = await getAllArticles();
  const allTags = Array.from(
    new Set(articles.flatMap(article => article.tags))
  );
  
  return allTags.map(tag => ({
    tag: tag.toLowerCase().replace(/ /g, '-'),
  }));
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const allArticles: BlogArticle[] = await getAllArticles();
  const tagArticles: BlogArticle[] = allArticles.filter(article => 
    article.tags.some(t => 
      t.toLowerCase().replace(/ /g, '-') === tag
    )
  );
  
  if (tagArticles.length === 0) {
    notFound();
  }

  const articlesWithViews: BlogArticle[] = attachViewsToArticles(tagArticles);

  const sortedArticles = articlesWithViews.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const tagCounts = new Map();
  allArticles.forEach(article => {
    article.tags.forEach(t => {
      tagCounts.set(t, (tagCounts.get(t) || 0) + 1);
    });
  });
  
  const popularTags = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tagName]) => tagName);
  
  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1 className="blog-header__title">
          #<span>{tagName}</span>
        </h1>
        <p className="blog-header__description">
          Découvrez tous mes articles, tutoriels et ressources sur ce thème.
        </p>
        
        {/* Tags populaires */}
        <div className="blog-tags">
          {popularTags.map(t => (
            <Link
              key={t}
              href={`/blog/tag/${t.toLowerCase().replace(/ /g, '-')}`}
              className={`blog-tags__item ${t.toLowerCase().replace(/ /g, '-') === tag ? 'blog-tags__item--active' : ''}`}
            >
              #{t}
            </Link>
          ))}
        </div>
      </header>
      
      {/* Liste des articles du tag */}
      <section className="blog-grid">
        <h2 className="blog-grid__title">
          {sortedArticles.length} article{sortedArticles.length > 1 ? 's' : ''} trouvé{sortedArticles.length > 1 ? 's' : ''}
        </h2>
        
        <div className="blog-grid__container">
          {sortedArticles.map(article => (
            <article key={article.slug} className="blog-card">
              <div className="blog-card__image">
                <Image
                  src={article.image || '/images/default-blog-image.jpg'}
                  alt={article.imageAlt || article.title}
                  fill
                  className="blog-card__img"
                />
              </div>
              <div className="blog-card__content">
                <div className="blog-card__categories">
                  {article.categories.slice(0, 2).map(category => (
                    <CategoryTag key={category} category={category} />
                  ))}
                </div>
                <h3 className="blog-card__title">
                  <Link href={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                <p className="blog-card__description">{article.description}</p>
                <div className="blog-card__meta">
                  <div className="blog-card__date-info">
                    <time dateTime={article.date}>
                      {new Date(article.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    <span>•</span>
                    <span>{article.readingTime} min</span>
                  </div>
                  <ViewCounter slug={article.slug} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      
      {/* Lien retour */}
      <div className="blog-navigation">
        <Link href="/blog" className="blog-navigation__back">
          Retour à tous les articles
        </Link>
      </div>
    </div>
  );
}