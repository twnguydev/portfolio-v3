const fs = require('fs');
const path = require('path');

// Assurez-vous que le dossier public existe
const publicFolder = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicFolder)) {
  fs.mkdirSync(publicFolder, { recursive: true });
}

// Définir les paramètres
const baseUrl = 'https://tanguygibrat.fr';
const currentDate = new Date().toISOString();

// Définir les pages du site
const pages = [
  { url: '/', changefreq: 'weekly', priority: '1.0' },
  { url: '/#portfolio', changefreq: 'weekly', priority: '0.8' },
  { url: '/#contact', changefreq: 'monthly', priority: '0.8' },
  { url: '/blog', changefreq: 'weekly', priority: '0.6' }
];

// Générer le contenu XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Chemin du fichier sitemap
const sitemapPath = path.join(publicFolder, 'sitemap.xml');

// Écrire le fichier
fs.writeFileSync(sitemapPath, sitemap);
console.log(`Sitemap généré avec succès à: ${sitemapPath}`);