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
  params: Promise<{ category: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(  { params }: Props
): Promise<Metadata> {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  return {
    title: `Articles sur ${categoryName} | Blog Portfolio`,
    description: `Découvrez tous mes articles, tutoriels et ressources sur ${categoryName}.`,
    openGraph: {
      title: `Articles sur ${categoryName} | Blog Portfolio`,
      description: `Découvrez tous mes articles, tutoriels et ressources sur ${categoryName}.`,
      url: `https://votreportfolio.com/blog/category/${category}`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const articles: BlogArticle[] = await getAllArticles();
  
  const allCategories = Array.from(
    new Set(articles.flatMap(article => article.categories))
  );
  
  return allCategories.map(category => ({
    category: category.toLowerCase().replace(/ /g, '-'),
  }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const categoryName = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const allArticles: BlogArticle[] = await getAllArticles();

  const categoryArticles: BlogArticle[] = allArticles.filter(article => 
    article.categories.some(c => 
      c.toLowerCase().replace(/ /g, '-') === category
    )
  );
  
  if (categoryArticles.length === 0) {
    notFound();
  }

  const articlesWithViews: BlogArticle[] = attachViewsToArticles(categoryArticles);
  const sortedArticles: BlogArticle[] = articlesWithViews.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const allCategories = Array.from(
    new Set(allArticles.flatMap(article => article.categories))
  );
  
  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1 className="blog-header__title">
          Articles sur {categoryName}
        </h1>
        <p className="blog-header__description">
          Découvrez tous mes articles, tutoriels et ressources sur cette thématique.
        </p>
        
        {/* Filtres par catégorie */}
        <div className="blog-categories">
          <Link 
            href="/blog" 
            className="blog-categories__item"
          >
            Tous
          </Link>
          {allCategories.map(cat => (
            <Link
              key={cat}
              href={`/blog/category/${cat.toLowerCase().replace(/ /g, '-')}`}
              className={`blog-categories__item ${cat.toLowerCase().replace(/ /g, '-') === category ? 'blog-categories__item--active' : ''}`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </header>
      
      {/* Liste des articles de la catégorie */}
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
                  {article.categories.map(cat => (
                    <CategoryTag key={cat} category={cat} />
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
          ← Retour à tous les articles
        </Link>
      </div>
    </div>
  );
}