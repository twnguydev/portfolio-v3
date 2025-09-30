import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
export class GithubProjectFetcher {
    constructor(config) {
        this.config = config;
        // Définir les répertoires
        this.dataDir = path.join(process.cwd(), 'data');
        console.log('Répertoire courant:', process.cwd());
        console.log('Vérification des répertoires et fichiers:');
        // Créer le répertoire data s'il n'existe pas
        if (!fs.existsSync(this.dataDir)) {
            console.log(`Création du répertoire ${this.dataDir}`);
            fs.mkdirSync(this.dataDir, { recursive: true });
        }
        this.cacheFilePath = path.join(this.dataDir, 'github-cache.json');
        this.projectsFilePath = path.join(this.dataDir, 'projects.ts');
        // Tenter de copier les projets depuis le fichier original
        // si celui-ci existe dans l'arborescence
        // Option 1: Chercher dans tous les dossiers à partir de la racine
        let localProjectsFile = '';
        try {
            // Exécuter une commande find pour localiser le fichier
            const result = execSync('find /app -name "projects.ts" | grep -v node_modules').toString().trim().split('\n');
            console.log('Fichiers projects.ts trouvés:', result);
            if (result.length > 0) {
                // Prendre le premier fichier trouvé qui n'est pas celui qu'on va créer
                for (const filePath of result) {
                    if (filePath !== this.projectsFilePath) {
                        localProjectsFile = filePath;
                        break;
                    }
                }
            }
        }
        catch (error) {
            console.error('Erreur lors de la recherche du fichier projects.ts:', error);
        }
        // Si un fichier a été trouvé, l'utiliser
        if (localProjectsFile && fs.existsSync(localProjectsFile)) {
            console.log(`Fichier projects.ts trouvé à ${localProjectsFile}`);
            try {
                // Copier le fichier dans le répertoire data
                fs.copyFileSync(localProjectsFile, this.projectsFilePath);
                console.log(`Fichier projects.ts copié vers ${this.projectsFilePath}`);
                return;
            }
            catch (error) {
                console.error(`Erreur lors de la copie du fichier projects.ts:`, error);
            }
        }
        // Si le fichier projects.ts existe déjà dans le répertoire cible, ne rien faire
        if (fs.existsSync(this.projectsFilePath)) {
            console.log(`Le fichier projects.ts existe déjà dans ${this.projectsFilePath}`);
            return;
        }
        // Si on arrive ici, c'est qu'aucun fichier n'a été trouvé ou copié
        console.log(`Aucun fichier projects.ts existant trouvé, création d'un nouveau template`);
        this.createProjectsTemplate();
    }
    createProjectsTemplate() {
        const template = `import { Project } from '@/interfaces/project';
  import { getDescriptionById } from "./rncp-skills.js";
  
  export const projectsData: Project[] = [
    // Les projets manuels seront ajoutés ici
  ];
  `;
        const dir = path.dirname(this.projectsFilePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(this.projectsFilePath, template, 'utf-8');
        console.log(`Created template projects file at ${this.projectsFilePath}`);
    }
    async updatePortfolioProjects() {
        console.log(`Starting GitHub project update at ${new Date().toISOString()}`);
        try {
            if (!this.shouldRefetch()) {
                console.log('GitHub cache still valid, skipping update');
                return;
            }
            console.log(`Fetching repositories for user ${this.config.username}`);
            const repositories = await this.fetchRepositories();
            console.log(`Found ${repositories.length} public repositories`);
            const reposToCheck = await this.filterUpdatedRepositories(repositories);
            console.log(`${reposToCheck.length} repositories need to be checked for updates`);
            if (reposToCheck.length === 0) {
                console.log('No new repositories or updates detected');
                this.updateCache(repositories.map(repo => repo.name));
                return;
            }
            console.log('Checking repositories for portfolio.json files');
            const portfolioProjects = await this.fetchPortfolioProjects(reposToCheck);
            if (portfolioProjects.length > 0) {
                console.log(`Found ${portfolioProjects.length} projects with portfolio.json, updating projects file`);
                await this.updateProjectsFile(portfolioProjects);
                console.log(`${portfolioProjects.length} GitHub projects added/updated`);
            }
            else {
                console.log('No new GitHub projects with portfolio.json found');
            }
            this.updateCache(repositories.map(repo => repo.name));
            console.log(`GitHub project update completed at ${new Date().toISOString()}`);
        }
        catch (error) {
            console.error('Error updating GitHub projects:', error);
            throw error;
        }
    }
    shouldRefetch() {
        try {
            if (!fs.existsSync(this.cacheFilePath)) {
                return true;
            }
            const cacheContent = fs.readFileSync(this.cacheFilePath, 'utf-8');
            const cache = JSON.parse(cacheContent);
            const now = Date.now();
            return now - cache.lastFetched > this.config.cacheTime;
        }
        catch (error) {
            console.error('Erreur lors de la vérification du cache GitHub:', error);
            return true;
        }
    }
    async fetchRepositories() {
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        if (this.config.token) {
            headers['Authorization'] = `token ${this.config.token}`;
        }
        const response = await fetch(`https://api.github.com/users/${this.config.username}/repos?type=public&sort=updated`, { headers });
        if (!response.ok) {
            throw new Error(`Erreur GitHub API: ${response.status}`);
        }
        return await response.json();
    }
    async filterUpdatedRepositories(repositories) {
        try {
            if (!fs.existsSync(this.cacheFilePath)) {
                return repositories;
            }
            const cacheContent = fs.readFileSync(this.cacheFilePath, 'utf-8');
            const cache = JSON.parse(cacheContent);
            return repositories.filter(repo => {
                if (!cache.repositories.includes(repo.name)) {
                    return true;
                }
                const lastFetched = new Date(cache.lastFetched);
                const lastUpdated = new Date(repo.updated_at);
                return lastUpdated > lastFetched;
            });
        }
        catch (error) {
            console.error('Erreur lors du filtrage des repositories GitHub:', error);
            return repositories;
        }
    }
    async fetchPortfolioProjects(repositories) {
        const portfolioProjects = [];
        for (const repo of repositories) {
            try {
                const portfolioFileUrl = `https://raw.githubusercontent.com/${this.config.username}/${repo.name}/main/portfolio.json`;
                const response = await fetch(portfolioFileUrl);
                if (!response.ok) {
                    const masterResponse = await fetch(`https://raw.githubusercontent.com/${this.config.username}/${repo.name}/master/portfolio.json`);
                    if (!masterResponse.ok) {
                        continue;
                    }
                    const projectData = await masterResponse.json();
                    portfolioProjects.push({
                        ...projectData,
                        sourceUrl: repo.html_url,
                        _source: 'github'
                    });
                }
                else {
                    const projectData = await response.json();
                    portfolioProjects.push({
                        ...projectData,
                        sourceUrl: repo.html_url,
                        _source: 'github'
                    });
                }
            }
            catch (error) {
                console.error(`Erreur lors de la récupération du projet GitHub ${repo.name}:`, error);
            }
        }
        return portfolioProjects;
    }
    async updateProjectsFile(newProjects) {
        try {
            // Vérifier si le fichier projects.ts existe déjà
            if (!fs.existsSync(this.projectsFilePath)) {
                this.createProjectsTemplate();
            }
            // Lire le contenu du fichier projects.ts
            const projectsFileContent = fs.readFileSync(this.projectsFilePath, 'utf-8');
            // Extraire les projets manuels existants
            const originalProjectsMatch = projectsFileContent.match(/export const projectsData: Project\[\] = \[([\s\S]*?)\];/);
            if (!originalProjectsMatch) {
                throw new Error('Format de fichier projects.ts non reconnu');
            }
            // Voir s'il y a des projets existants
            const existingProjectsContent = originalProjectsMatch[1].trim();
            // Supprimer les projets GitHub existants
            const manualProjects = [];
            // Si des projets existent, les analyser
            if (existingProjectsContent && !existingProjectsContent.startsWith('//')) {
                // Tentative de charger le contenu comme JSON pour l'analyser
                try {
                    // Convertir le contenu en tableau d'objets JSON valide
                    const jsonContent = `[${existingProjectsContent}]`;
                    // Remplacer les appels à getDescriptionById par des placeholders pour la déserialisation
                    const processedContent = jsonContent.replace(/getDescriptionById\(['"](.*?)['"]\)/g, '"__DESC_ID_$1__"');
                    // Analyser le JSON modifié
                    const allProjects = JSON.parse(processedContent);
                    // Filtrer pour ne garder que les projets manuels
                    for (const project of allProjects) {
                        if (!project._source || project._source !== 'github') {
                            manualProjects.push(project);
                        }
                    }
                }
                catch (err) {
                    console.error('Erreur lors de l\'analyse des projets existants, utilisant une approche alternative:', err);
                    // Approche alternative basée sur les délimiteurs de projets
                    const projectParts = existingProjectsContent.split(/\s*},\s*\{/);
                    for (const part of projectParts) {
                        // Si le projet n'a pas la marque _source: 'github', ajouter à la liste des projets manuels
                        if (!part.includes("_source: 'github'")) {
                            // Reconstruire l'objet projet avec les accolades si nécessaire
                            let projectStr = part;
                            if (!projectStr.trim().startsWith('{')) {
                                projectStr = '{' + projectStr;
                            }
                            if (!projectStr.trim().endsWith('}')) {
                                projectStr = projectStr + '}';
                            }
                            manualProjects.push({ _rawContent: projectStr });
                        }
                    }
                }
            }
            // Générer le contenu des projets manuels
            let manualProjectsContent = '';
            if (manualProjects.length > 0) {
                // Deux cas possibles basés sur comment on a extrait les projets
                if (manualProjects[0]._rawContent) {
                    // Si on a utilisé l'approche alternative, on a juste le texte brut
                    manualProjectsContent = manualProjects
                        .map(p => p._rawContent)
                        .join(',\n  ');
                }
                else {
                    // Si on a pu parser le JSON, on le reconstruit en JSON valide, puis on restaure les appels à getDescriptionById
                    manualProjectsContent = JSON.stringify(manualProjects, null, 2)
                        .slice(1, -1) // Enlever les crochets externes
                        .replace(/"__DESC_ID_(.*?)__"/g, 'getDescriptionById(\'$1\')');
                }
            }
            // Générer le contenu pour les nouveaux projets GitHub
            const githubProjectsContent = newProjects.map(project => {
                const processedSkills = project.skills?.map(skill => {
                    if (skill.descriptions && Array.isArray(skill.descriptions)) {
                        const processedDescriptions = skill.descriptions.map(desc => {
                            if (typeof desc === 'string' && desc.includes('getDescriptionById')) {
                                return desc;
                            }
                            return JSON.stringify(desc);
                        });
                        return {
                            ...skill,
                            _processedDescriptions: processedDescriptions
                        };
                    }
                    return skill;
                });
                let skillsString = '';
                if (processedSkills && processedSkills.length > 0) {
                    skillsString = processedSkills.map(skill => {
                        let skillObj = `{
        name: ${JSON.stringify(skill.name)},\n`;
                        if (skill._processedDescriptions) {
                            skillObj += `      descriptions: [
          ${skill._processedDescriptions.join(',\n        ')}
        ],\n`;
                        }
                        else if (skill.descriptions) {
                            skillObj += `      descriptions: ${JSON.stringify(skill.descriptions)},\n`;
                        }
                        if (skill.category)
                            skillObj += `      category: ${JSON.stringify(skill.category)},\n`;
                        if (skill.rncpSkillIds)
                            skillObj += `      rncpSkillIds: ${JSON.stringify(skill.rncpSkillIds)},\n`;
                        if (skill.rncpReference)
                            skillObj += `      rncpReference: ${JSON.stringify(skill.rncpReference)},\n`;
                        skillObj += '    }';
                        return skillObj;
                    }).join(',\n    ');
                }
                return `  {
      title: ${JSON.stringify(project.title)},
      description: ${JSON.stringify(project.description)},
      shortDescription: ${JSON.stringify(project.shortDescription || '')},
      images: ${JSON.stringify(project.images || [])},
      tags: ${JSON.stringify(project.tags || [])},
      type: ${JSON.stringify(project.type || 'school')},
      sourceUrl: ${JSON.stringify(project.sourceUrl || '')},
      demoUrl: ${JSON.stringify(project.demoUrl || '')},
      skills: [
      ${skillsString}
      ],
      badges: ${JSON.stringify(project.badges || [])},
      _source: 'github'
    }`;
            }).join(',\n');
            // Combiner tous les projets
            let allProjectsContent = '';
            if (manualProjectsContent && githubProjectsContent) {
                allProjectsContent = `${manualProjectsContent},\n${githubProjectsContent}`;
            }
            else if (manualProjectsContent) {
                allProjectsContent = manualProjectsContent;
            }
            else {
                allProjectsContent = githubProjectsContent;
            }
            // Reconstruire le fichier projects.ts complet
            const updatedContent = `import { Project } from '@/interfaces/project';
  import { getDescriptionById } from "./rncp-skills.js";
  
  export const projectsData: Project[] = [
  ${allProjectsContent}
  ];
  `;
            // Écrire le fichier mis à jour
            fs.writeFileSync(this.projectsFilePath, updatedContent, 'utf-8');
            // Log des statistiques
            console.log(`Updated projects file with ${newProjects.length} GitHub projects and preserved ${manualProjects.length} existing projects`);
            console.log(`Projects stats: Original=${manualProjects.length}, GitHub=${newProjects.length}, Total=${manualProjects.length + newProjects.length}`);
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour du fichier de projets:', error);
        }
    }
    updateCache(repositories) {
        try {
            const cache = {
                lastFetched: Date.now(),
                repositories
            };
            const dataDir = path.dirname(this.cacheFilePath);
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            fs.writeFileSync(this.cacheFilePath, JSON.stringify(cache, null, 2), 'utf-8');
        }
        catch (error) {
            console.error('Erreur lors de la mise à jour du cache GitHub:', error);
        }
    }
}
