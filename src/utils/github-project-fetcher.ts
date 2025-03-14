import fs from 'fs';
import path from 'path';
import type { Project } from '@/interfaces/project';

interface GitHubConfig {
  username: string;
  token?: string;
  cacheTime: number;
}

interface GitHubCache {
  lastFetched: number;
  repositories: string[];
}

interface GitHubRepository {
  name: string;
  html_url: string;
  updated_at: string;
  default_branch: string;
  description?: string;
  language?: string;
  fork: boolean;
  visibility: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export class GithubProjectFetcher {
  private config;
  private dataDir;
  private cacheFilePath;
  private projectsFilePath;

  constructor(config: GitHubConfig) {
    this.config = config;

    this.dataDir = process.env.NODE_ENV === 'production'
      ? path.join(process.cwd(), 'data')
      : path.join(process.cwd(), 'data');

    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }

    this.cacheFilePath = path.join(this.dataDir, 'github-cache.json');
    this.projectsFilePath = path.join(process.cwd(), 'data', 'projects.ts');

    if (!fs.existsSync(this.projectsFilePath)) {
      this.createProjectsTemplate();
    }
  }

  private createProjectsTemplate(): void {
    const template = `import { Project } from '@/interfaces/project';
  import { getDescriptionById } from "./rncp-skills";
  
  export const projectsData: Project[] = [
    // Les projets seront ajoutés ici automatiquement
  ];
  `;

    const dir = path.dirname(this.projectsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(this.projectsFilePath, template, 'utf-8');
    console.log(`Created template projects file at ${this.projectsFilePath}`);
  }

  public async updatePortfolioProjects(): Promise<void> {
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
      } else {
        console.log('No new GitHub projects with portfolio.json found');
      }

      this.updateCache(repositories.map(repo => repo.name));
      console.log(`GitHub project update completed at ${new Date().toISOString()}`);
      
    } catch (error) {
      console.error('Error updating GitHub projects:', error);
      throw error;
    }
  }

  private shouldRefetch(): boolean {
    try {
      if (!fs.existsSync(this.cacheFilePath)) {
        return true;
      }

      const cacheContent = fs.readFileSync(this.cacheFilePath, 'utf-8');
      const cache: GitHubCache = JSON.parse(cacheContent);

      const now = Date.now();
      return now - cache.lastFetched > this.config.cacheTime;
    } catch (error) {
      console.error('Erreur lors de la vérification du cache GitHub:', error);
      return true;
    }
  }

  private async fetchRepositories(): Promise<GitHubRepository[]> {
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    };

    if (this.config.token) {
      headers['Authorization'] = `token ${this.config.token}`;
    }

    const response = await fetch(
      `https://api.github.com/users/${this.config.username}/repos?type=public&sort=updated`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`Erreur GitHub API: ${response.status}`);
    }

    return await response.json() as GitHubRepository[];
  }

  private async filterUpdatedRepositories(repositories: GitHubRepository[]): Promise<GitHubRepository[]> {
    try {
      if (!fs.existsSync(this.cacheFilePath)) {
        return repositories;
      }

      const cacheContent = fs.readFileSync(this.cacheFilePath, 'utf-8');
      const cache: GitHubCache = JSON.parse(cacheContent);

      return repositories.filter(repo => {
        if (!cache.repositories.includes(repo.name)) {
          return true;
        }

        const lastFetched = new Date(cache.lastFetched);
        const lastUpdated = new Date(repo.updated_at);
        return lastUpdated > lastFetched;
      });
    } catch (error) {
      console.error('Erreur lors du filtrage des repositories GitHub:', error);
      return repositories;
    }
  }

  private async fetchPortfolioProjects(repositories: GitHubRepository[]): Promise<(Project & { _source: string })[]> {
    const portfolioProjects: (Project & { _source: string })[] = [];

    for (const repo of repositories) {
      try {
        const portfolioFileUrl = `https://raw.githubusercontent.com/${this.config.username}/${repo.name}/main/portfolio.json`;
        const response = await fetch(portfolioFileUrl);

        if (!response.ok) {
          const masterResponse = await fetch(
            `https://raw.githubusercontent.com/${this.config.username}/${repo.name}/master/portfolio.json`
          );

          if (!masterResponse.ok) {
            continue;
          }

          const projectData = await masterResponse.json() as Project;
          portfolioProjects.push({
            ...projectData,
            sourceUrl: repo.html_url,
            _source: 'github'
          });
        } else {
          const projectData = await response.json() as Project;
          portfolioProjects.push({
            ...projectData,
            sourceUrl: repo.html_url,
            _source: 'github'
          });
        }
      } catch (error) {
        console.error(`Erreur lors de la récupération du projet GitHub ${repo.name}:`, error);
      }
    }

    return portfolioProjects;
  }

  private async updateProjectsFile(newProjects: (Project & { _source: string })[]): Promise<void> {
    try {
      const projectsContent = fs.readFileSync(this.projectsFilePath, 'utf-8');

      const projectsDataMatch = projectsContent.match(/export const projectsData: Project\[\] = \[([\s\S]*?)\];/);
      if (!projectsDataMatch) {
        throw new Error('Format de fichier projects.ts non reconnu');
      }

      const projectsDataString = projectsDataMatch[1];
      const existingProjects = projectsDataString
        .split('},')
        .filter((project: string | string[]) => !project.includes('_source: \'github\''))
        .join('},');

      const newProjectsString = newProjects.map(project => {
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
            } else if (skill.descriptions) {
              skillObj += `      descriptions: ${JSON.stringify(skill.descriptions)},\n`;
            }

            if (skill.category) skillObj += `      category: ${JSON.stringify(skill.category)},\n`;
            if (skill.rncpSkillIds) skillObj += `      rncpSkillIds: ${JSON.stringify(skill.rncpSkillIds)},\n`;
            if (skill.rncpReference) skillObj += `      rncpReference: ${JSON.stringify(skill.rncpReference)},\n`;
            
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

      const updatedContent = projectsContent.replace(
        /export const projectsData: Project\[\] = \[([\s\S]*?)\];/,
        `export const projectsData: Project[] = [${existingProjects}${existingProjects ? ',' : ''}\n${newProjectsString}\n];`
      );

      fs.writeFileSync(this.projectsFilePath, updatedContent, 'utf-8');

    } catch (error) {
      console.error('Erreur lors de la mise à jour du fichier de projets:', error);
    }
  }

  private updateCache(repositories: string[]): void {
    try {
      const cache: GitHubCache = {
        lastFetched: Date.now(),
        repositories
      };

      const dataDir = path.dirname(this.cacheFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      fs.writeFileSync(this.cacheFilePath, JSON.stringify(cache, null, 2), 'utf-8');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du cache GitHub:', error);
    }
  }
}