'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import CategoryTag from '@/components/blog/category-tag';
import ViewCounter from '@/components/blog/view-counter';
import { BlogArticle } from '@/interfaces/blog';

type Props = {
  params: Promise<object>
  searchParams: Promise<{ q?: string }>
}

const SearchForm = ({ initialQuery = '', onSearch }: { initialQuery?: string, onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState(initialQuery);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <div className="blog-search">
      <form onSubmit={handleSubmit} className="blog-search__form">
        <span className="blog-search__icon">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher des articles..."
          className="blog-search__input"
          aria-label="Rechercher des articles"
        />
        <button type="submit" className="blog-search__submit">
          Rechercher
        </button>
      </form>
    </div>
  );
};

export default async function SearchPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const initialQuery = resolvedSearchParams?.q || '';

  return <ClientSearchPage initialQuery={initialQuery} />;
}

function ClientSearchPage({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim()) {
        setArticles([]);
        return;
      }
      
      setIsLoading(true);
      
      try {
        const response = await fetch(`/api/blog/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        
        if (response.ok) {
          setArticles(data.articles);
        } else {
          console.error('Erreur de recherche:', data.error);
        }
      } catch (error) {
        console.error('Erreur lors de la recherche:', error);
      } finally {
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    };

    if (query) {
      performSearch();
    } else {
      setArticles([]);
      setIsInitialLoad(false);
    }
  }, [query]);

  const handleSearch = (newQuery: string) => {
    const url = new URL(window.location.href);
    if (newQuery) {
      url.searchParams.set('q', newQuery);
    } else {
      url.searchParams.delete('q');
    }
    window.history.pushState({}, '', url.toString());
    
    setQuery(newQuery);
  };

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="blog-search-results__highlight">$1</span>');
  };
  
  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1 className="blog-header__title">Recherche</h1>
        <p className="blog-header__description">
          Trouvez des articles, tutoriels et ressources sur les sujets qui vous intéressent.
        </p>
      </header>
      
      <SearchForm initialQuery={query} onSearch={handleSearch} />
      
      {isLoading ? (
        <div className="blog-loading">
          <div className="blog-loading__spinner"></div>
          <p className="blog-loading__text">Recherche en cours...</p>
        </div>
      ) : (
        <div className="blog-search-results">
          {!isInitialLoad && query && (
            <div className="blog-search-results__header">
              <h2 className="blog-search-results__header-title">
                {articles.length > 0 
                  ? `${articles.length} résultat${articles.length > 1 ? 's' : ''} pour "${query}"`
                  : `Aucun résultat pour "${query}"`}
              </h2>
              <p className="blog-search-results__header-description">
                {articles.length > 0 
                  ? 'Voici les articles correspondant à votre recherche.'
                  : 'Essayez avec des termes différents ou parcourez tous les articles.'}
              </p>
            </div>
          )}
          
          {articles.length > 0 ? (
            <div className="blog-grid__container">
              {articles.map(article => (
                <article key={article.slug} className="blog-card">
                  <div className="blog-card__image">
                    <Image
                      src={article.image || '/images/default-blog-image.jpg'}
                      alt={article.title}
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
                        <span dangerouslySetInnerHTML={{ 
                          __html: highlightText(article.title, query) 
                        }} />
                      </Link>
                    </h3>
                    <p className="blog-card__description">
                      <span dangerouslySetInnerHTML={{ 
                        __html: highlightText(article.description, query) 
                      }} />
                    </p>
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
          ) : (
            !isInitialLoad && query && (
              <div className="blog-empty">
                <div className="blog-empty__icon">🔍</div>
                <h3 className="blog-empty__title">Aucun résultat trouvé</h3>
                <p className="blog-empty__message">
                  Aucun article ne correspond à votre recherche. Essayez avec des termes différents.
                </p>
                <div className="blog-empty__action">
                  <Link href="/blog">Voir tous les articles</Link>
                </div>
              </div>
            )
          )}
        </div>
      )}
      
      {/* Lien retour */}
      <div className="blog-navigation">
        <Link href="/blog" className="blog-navigation__back">
          Retour à tous les articles
        </Link>
      </div>
    </div>
  );
}