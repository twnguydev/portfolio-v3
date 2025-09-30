import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Chemin vers le fichier projects.ts
    const projectsPath = path.join(process.cwd(), 'data', 'projects.ts');
    
    // Lire le contenu du fichier
    const fileContent = fs.readFileSync(projectsPath, 'utf8');
    
    // Extraire le tableau de projets du fichier
    const projectsMatch = fileContent.match(/export const projectsData: Project\[\] = \[([\s\S]*?)\];/);
    
    if (!projectsMatch) {
      return NextResponse.json({ error: 'Format de fichier projects.ts non reconnu' }, { status: 500 });
    }
    
    // Au lieu d'évaluer le code, vous pouvez simplement transmettre le contenu brut
    // et laisser le front-end gérer les appels à getDescriptionById
    return new Response(
      `{"projectsContent": ${JSON.stringify(projectsMatch[1])}}`,
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    console.error('Erreur API projects:', error);
    return NextResponse.json({ error: 'Erreur lors du chargement des projets' }, { status: 500 });
  }
}