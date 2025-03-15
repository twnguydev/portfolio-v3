import type { Metadata } from 'next';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticleSlugs, getArticleData } from '@/utils/markdown-parser';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/utils/article-schema';
import ViewCounter from '@/components/blog/view-counter';
import CategoryTag from '@/components/blog/category-tag';
import TableOfContents from '@/components/blog/table-of-content';
import ShareButtons from '@/components/blog/share-buttons';
import AuthorBio from '@/components/blog/author-bio';
import RelatedPosts from '@/components/blog/related-posts';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const article = await getArticleData(slug);
    
    return {
      title: article.metaTitle || `${article.title} | Blog Portfolio`,
      description: article.metaDescription || article.description,
      openGraph: {
        title: article.metaTitle || article.title,
        description: article.metaDescription || article.description,
        url: `https://votreportfolio.com/blog/${article.slug}`,
        type: 'article',
        publishedTime: article.date,
        modifiedTime: article.lastModified || article.date,
        authors: [article.author.name],
        images: [
          {
            url: article.ogImage || article.image || 'https://votreportfolio.com/images/default-blog-image.jpg',
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        tags: article.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: article.metaTitle || article.title,
        description: article.metaDescription || article.description,
        images: [article.ogImage || article.image || 'https://votreportfolio.com/images/default-blog-image.jpg'],
      },
      authors: [{ name: article.author.name }],
      alternates: {
        canonical: article.canonical || `https://votreportfolio.com/blog/${article.slug}`,
      },
      robots: article.noIndex ? { index: false } : undefined,
    };
  } catch (error) {
    console.log('Error loading article:', error);
    return {
      title: 'Article non trouvé | Blog Portfolio',
      description: 'Cet article n\'existe pas ou a été supprimé.',
    };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  
  try {
    const article = await getArticleData(slug);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://votreportfolio.com';
    const articleSchema = generateArticleSchema(article, baseUrl);
    const breadcrumbSchema = generateBreadcrumbSchema(article, baseUrl);

    const formattedDate = new Date(article.date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    return (
      <article className="blog-article">
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        
        {/* En-tête de l'article */}
        <header className="blog-article__header">
          <div className="blog-article__categories">
            {article.categories.map(category => (
              <CategoryTag key={category} category={category} />
            ))}
          </div>
          
          <h1 className="blog-article__title">{article.title}</h1>
          
          <p className="blog-article__description">{article.description}</p>
          
          <div className="blog-article__meta">
            <div className="blog-article__author">
              {article.author.image && (
                <Image
                  src={article.author.image}
                  alt={article.author.name}
                  width={40}
                  height={40}
                  className="blog-article__author-image"
                />
              )}
              <div className="blog-article__author-info">
                <div className="blog-article__author-name">{article.author.name}</div>
                <div className="blog-article__author-meta">
                  <time dateTime={article.date}>{formattedDate}</time>
                  <span className="separator">•</span>
                  <span>{article.readingTime} min de lecture</span>
                </div>
              </div>
            </div>
            
            <ViewCounter slug={article.slug} trackView={true} />
          </div>
          
          {/* Image principale */}
          {article.image && (
            <div className="blog-article__main-image">
              <Image
                src={article.image}
                alt={article.imageAlt || article.title}
                fill
                priority
                className="blog-article__img"
              />
            </div>
          )}
        </header>
        
        <div className="blog-article__layout">
          {/* Table des matières (visible uniquement sur desktop) */}
          {article.toc && article.toc.items.length > 0 && (
            <aside className="blog-article__sidebar">
              <div className="blog-article__sidebar-sticky">
                <TableOfContents toc={article.toc} />
                <ShareButtons title={article.title} url={`/blog/${article.slug}`} />
              </div>
            </aside>
          )}
          
          {/* Contenu principal */}
          <div className="blog-article__content">
            {/* Table des matières mobile (visible uniquement sur mobile) */}
            {article.toc && article.toc.items.length > 0 && (
              <div className="blog-article__toc-mobile">
                <details className="blog-article__toc-mobile-details">
                  <summary className="blog-article__toc-mobile-summary">Table des matières</summary>
                  <TableOfContents toc={article.toc} />
                </details>
              </div>
            )}
            
            {/* Contenu Markdown */}
            <div 
              className="blog-article__text"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            {/* Partager et Tags (mobile) */}
            <div className="blog-article__share-mobile">
              <ShareButtons title={article.title} url={`/blog/${article.slug}`} />
            </div>
            
            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="blog-article__tags">
                <h3 className="blog-article__tags-title">Tags</h3>
                <div className="blog-article__tags-list">
                  {article.tags.map(tag => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${tag.toLowerCase().replace(/ /g, '-')}`}
                      className="blog-article__tags-item"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}
            
            {/* Bio de l'auteur */}
            <div className="blog-article__bio">
              <AuthorBio author={article.author} />
            </div>
          </div>
        </div>
        
        {/* Articles connexes */}
        <div className="blog-article__related">
          <RelatedPosts currentSlug={article.slug} categories={article.categories} tags={article.tags} />
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}