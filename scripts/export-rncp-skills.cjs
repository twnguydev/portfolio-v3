// scripts/export-rncp-skills.js
const fs = require('fs');
const path = require('path');

// Rechercher rncp-skills.js dans plusieurs emplacements possibles
const possiblePaths = [
  path.join(process.cwd(), 'src', 'data', 'rncp-skills.js'),
  path.join(process.cwd(), 'src', 'app', 'data', 'rncp-skills.js'),
  path.join(process.cwd(), 'src', 'lib', 'rncp-skills.js'),
  path.join(process.cwd(), '.next', 'server', 'app', 'data', 'rncp-skills.js'),
  // Ajoutez d'autres chemins possibles ici
];

// Destination
const destPath = path.join(process.cwd(), 'data', 'rncp-skills.js');

// Rechercher dans tous les emplacements possibles
let srcPath = null;
for (const p of possiblePaths) {
  if (fs.existsSync(p)) {
    console.log(`Fichier rncp-skills.js trouvé à: ${p}`);
    srcPath = p;
    break;
  }
}

if (srcPath) {
  console.log(`Exportation des compétences RNCP de ${srcPath} vers ${destPath}`);
  
  // Créer le répertoire de destination s'il n'existe pas
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Copier le fichier
  fs.copyFileSync(srcPath, destPath);
  console.log('Exportation des compétences RNCP terminée avec succès');
} else {
  console.error(`Fichier rncp-skills.js non trouvé dans les emplacements possibles`);
  
  // Créer un fichier de remplacement avec une structure minimale
  console.log(`Création d'un fichier rncp-skills.js minimal à ${destPath}`);
  
  const minimalContent = `export const rncpSkills = {
  // Ajoutez vos compétences RNCP ici
};

export function getDescriptionById(id) {
  return rncpSkills[id]?.description || \`Description non trouvée pour: \${id}\`;
}
`;
  
  // Créer le répertoire de destination s'il n'existe pas
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.writeFileSync(destPath, minimalContent, 'utf8');
  console.log('Fichier rncp-skills.js minimal créé avec succès');
}