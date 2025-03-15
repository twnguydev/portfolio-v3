// blog/utils/views.ts
import fs from 'fs';
import path from 'path';

// Chemin vers le fichier de stockage des vues
const VIEWS_FILE_PATH = path.join(process.cwd(), 'data', 'blog-views.json');

// Interface pour le stockage des vues
interface ViewsData {
  [slug: string]: number;
}

/**
 * Charge les données de vues depuis le fichier
 */
function loadViewsData(): ViewsData {
  try {
    // S'assurer que le dossier data existe
    const dataDir = path.dirname(VIEWS_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // Créer le fichier s'il n'existe pas
    if (!fs.existsSync(VIEWS_FILE_PATH)) {
      fs.writeFileSync(VIEWS_FILE_PATH, JSON.stringify({}), 'utf8');
      return {};
    }
    
    // Lire et parser le fichier
    const data = fs.readFileSync(VIEWS_FILE_PATH, 'utf8');
    return JSON.parse(data) as ViewsData;
  } catch (error) {
    console.error('Error loading views data:', error);
    return {};
  }
}

/**
 * Sauvegarde les données de vues dans le fichier
 */
function saveViewsData(data: ViewsData): void {
  try {
    fs.writeFileSync(VIEWS_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving views data:', error);
  }
}

/**
 * Incrémente le compteur de vues pour un article
 */
export function incrementViews(slug: string): void {
  const data = loadViewsData();
  data[slug] = (data[slug] || 0) + 1;
  saveViewsData(data);
}

/**
 * Récupère le nombre de vues pour un article
 */
export function getViews(slug: string): number {
  const data = loadViewsData();
  return data[slug] || 0;
}

/**
 * Récupère toutes les données de vues
 */
export function getAllViews(): ViewsData {
  return loadViewsData();
}

/**
 * Met à jour les articles avec leurs nombres de vues
 */
export function attachViewsToArticles<T extends { slug: string; views?: number }>(articles: T[]): T[] {
  const viewsData = loadViewsData();
  
  return articles.map(article => ({
    ...article,
    views: viewsData[article.slug] || 0
  }));
}