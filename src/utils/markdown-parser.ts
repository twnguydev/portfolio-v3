import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypePrism from 'rehype-prism-plus';
import rehypeStringify from 'rehype-stringify';
import readingTime from 'reading-time';
import { BlogArticle, TableOfContents, TOCItem } from '@/interfaces/blog';

const ARTICLES_DIRECTORY = path.join(process.cwd(), 'blog');

/**
 * Obtient tous les slugs des articles
 */
export function getAllArticleSlugs(): string[] {
  const fileNames = fs.readdirSync(ARTICLES_DIRECTORY);
  
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => fileName.replace(/\.md$/, ''));
}

/**
 * Obtient toutes les données d'un article à partir de son slug
 */
export async function getArticleData(slug: string): Promise<BlogArticle> {
  const fullPath = path.join(ARTICLES_DIRECTORY, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Utilise gray-matter pour parser la section frontmatter
  const matterResult = matter(fileContents);
  
  // Utilise remark pour convertir le markdown en HTML
  const processedContent = await remark()
    .use(remarkGfm)  // Support GitHub Flavored Markdown
    .use(remarkRehype)  // Convertit Markdown AST en HTML AST
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    .use(rehypePrism as any)   // Syntax highlighting (cast to any to fix TS type error)
    .use(rehypeStringify)  // Convertit HTML AST en chaîne HTML
    .process(matterResult.content);
    
  const contentHtml = processedContent.toString();
  
  // Génère la table des matières
  const toc = generateTableOfContents(matterResult.content);
  
  // Calcule le temps de lecture
  const readingTimeResult = readingTime(matterResult.content);
  
  // Combine les données
  return {
    slug,
    content: contentHtml,
    readingTime: Math.ceil(readingTimeResult.minutes),
    toc,
    ...(matterResult.data as Omit<BlogArticle, 'slug' | 'content' | 'readingTime' | 'toc'>)
  };
}

/**
 * Obtient tous les articles
 */
export async function getAllArticles(): Promise<BlogArticle[]> {
  const slugs = getAllArticleSlugs();
  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const article = await getArticleData(slug);
      return article;
    })
  );
  
  // Filtre les brouillons en production et trie par date
  return articles
    .filter(article => process.env.NODE_ENV === 'development' || !article.draft)
    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

/**
 * Génère une table des matières à partir du contenu markdown
 */
function generateTableOfContents(markdown: string): TableOfContents {
  const headingLines = markdown.split('\n').filter(line => line.startsWith('#'));
  const items: TOCItem[] = [];
  
  headingLines.forEach(line => {
    // Compte le nombre de # pour déterminer le niveau (h1, h2, etc.)
    const level = line.match(/^#+/)?.[0].length || 0;
    if (level < 1 || level > 6) return;
    
    // Extrait le texte du heading
    const text = line.replace(/^#+\s+/, '');
    
    // Génère un ID à partir du texte
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    
    // Ajoute l'item à la TOC
    items.push({ id, text, level });
  });
  
  return { items: nestTableOfContents(items) };
}

/**
 * Transforme une liste plate d'items en une structure imbriquée
 */
function nestTableOfContents(items: TOCItem[]): TOCItem[] {
  const result: TOCItem[] = [];
  const stack: (TOCItem & { children?: TOCItem[] })[] = [];
  
  items.forEach(item => {
    const tocItem = { ...item, items: [] };
    
    // Vide la pile jusqu'à trouver un parent approprié
    while (
      stack.length > 0 && 
      stack[stack.length - 1].level >= tocItem.level
    ) {
      stack.pop();
    }
    
    if (stack.length === 0) {
      result.push(tocItem);
    } else {
      const parent = stack[stack.length - 1];
      if (!parent.items) parent.items = [];
      parent.items.push(tocItem);
    }
    
    stack.push(tocItem);
  });
  
  return result;
}