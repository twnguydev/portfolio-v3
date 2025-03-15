import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles } from '@/utils/markdown-parser';
import { attachViewsToArticles } from '@/utils/views-counter';
import { BlogArticle } from '@/interfaces/blog';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    
    if (!query) {
      return NextResponse.json({ 
        articles: [], 
        message: 'No search query provided' 
      });
    }

    const allArticles: BlogArticle[] = await getAllArticles();
    const articlesWithViews: BlogArticle[] = attachViewsToArticles(allArticles);

    const publishedArticles: BlogArticle[] = process.env.NODE_ENV === 'development' 
      ? articlesWithViews 
      : articlesWithViews.filter(article => !article.draft);

    const getSearchScore = (article: BlogArticle, searchQuery: string): number => {
      const searchTerms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
      let score = 0;
      
      const titleLower = article.title.toLowerCase();
      const descriptionLower = article.description.toLowerCase();
      const contentLower = article.content.toLowerCase();

      for (const term of searchTerms) {
        if (titleLower.includes(term)) {
          score += 10;
        }

        if (descriptionLower.includes(term)) {
          score += 5;
        }

        if (contentLower.includes(term)) {
          score += 2;
        }

        const matchingTags = article.tags.filter(tag => 
          tag.toLowerCase().includes(term)
        );
        score += matchingTags.length * 3;

        const matchingCategories = article.categories.filter(category => 
          category.toLowerCase().includes(term)
        );
        score += matchingCategories.length * 3;
      }
      
      return score;
    };

    const searchResults: BlogArticle[] = publishedArticles
      .map(article => ({
        article,
        score: getSearchScore(article, query)
      }))
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.article);
    
    return NextResponse.json({ 
      articles: searchResults,
      count: searchResults.length,
      query
    });
    
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'An error occurred during search' },
      { status: 500 }
    );
  }
}