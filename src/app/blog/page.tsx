import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles } from '@/utils/markdown-parser';
import { attachViewsToArticles } from '@/utils/views-counter';
import { generateBlogSchema } from '@/utils/article-schema';
import CategoryTag from '@/components/blog/category-tag';
import ViewCounter from '@/components/blog/view-counter';
import { BlogArticle } from '@/interfaces/blog';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog | Votre Portfolio',
    description: 'Articles, tutoriels et réflexions sur le développement web, le design et mes projets.',
    openGraph: {
      title: 'Blog | Votre Portfolio',
      description: 'Articles, tutoriels et réflexions sur le développement web, le design et mes projets.',
      url: 'https://votreportfolio.com/blog',
      type: 'website',
      images: [
        {
          url: 'https://votreportfolio.com/images/blog-og.jpg',
          width: 1200,
          height: 630,
          alt: 'Blog Portfolio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog | Votre Portfolio',
      description: 'Articles, tutoriels et réflexions sur le développement web, le design et mes projets.',
      images: ['https://votreportfolio.com/images/blog-og.jpg'],
    },
  };
}

export default async function BlogPage() {
  const articles: BlogArticle[] = await getAllArticles();
  const articlesWithViews = attachViewsToArticles(articles);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tanguygibrat.fr';
  const blogSchema = generateBlogSchema(articlesWithViews, baseUrl);

  const allCategories = Array.from(
    new Set(articlesWithViews.flatMap(article => article.categories))
  );

  const featuredArticles: BlogArticle[] = articlesWithViews.filter(article => article.featured);
  const regularArticles: BlogArticle[] = articlesWithViews.filter(article => !article.featured);
  
  return (
    <div className="blog-container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      
      <header className="blog-header">
        <h1 className="blog-header__title">Blog</h1>
        <p className="blog-header__description">
          Découvrez mes articles, tutoriels et réflexions sur le développement web,
          le design et mes projets.
        </p>
        
        {/* Filtres par catégorie */}
        <div className="blog-categories">
          <Link 
            href="/blog" 
            className="blog-categories__item blog-categories__item--active"
          >
            Tous
          </Link>
          {allCategories.map(category => (
            <Link
              key={category}
              href={`/blog/category/${category.toLowerCase().replace(/ /g, '-')}`}
              className="blog-categories__item"
            >
              {category}
            </Link>
          ))}
        </div>
      </header>
      
      {/* Articles mis en avant */}
      {featuredArticles.length > 0 && (
        <section className="blog-featured">
          <h2 className="blog-featured__title">
            Articles à la une
          </h2>
          
          <div className="blog-featured__grid">
            {featuredArticles.map(article => (
              <article key={article.slug} className="blog-card blog-card--featured">
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
                    {article.categories.map(category => (
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
                      <span>{article.readingTime} min de lecture</span>
                    </div>
                    <ViewCounter slug={article.slug} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
      
      {/* Liste principale d'articles */}
      <section className="blog-grid">
        <h2 className="blog-grid__title">
          Tous les articles
        </h2>
        
        <div className="blog-grid__container">
          {regularArticles.map(article => (
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
    </div>
  );
}