import { GithubProjectFetcher } from '@/utils/github-project-fetcher';
import { githubConfig } from '@/config/github';

async function main() {
  console.log('Démarrage de la récupération des projets GitHub...');
  
  const fetcher = new GithubProjectFetcher(githubConfig);
  await fetcher.updatePortfolioProjects();
  
  console.log('Récupération des projets GitHub terminée!');
}

main().catch(error => {
  console.error('Erreur lors de l\'exécution du script:', error);
  process.exit(1);
});