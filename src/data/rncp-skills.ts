export interface RNCPSkill {
  id: string;
  bloc: string;
  description: string;
}

export const rncpSkills: RNCPSkill[] = [
  // Bloc 1: Cadrer un projet et conceptualiser une solution web
  {
    id: "RNCP01-1",
    bloc: "RNCP38436BC01",
    description: "Rédiger un Cahier Des Charges (CDC) en partant d'une expression de besoins, afin de cadrer fonctionnellement un projet de solution web dans le respect des réglementations en vigueur et notamment le RGPD"
  },
  {
    id: "RNCP01-2",
    bloc: "RNCP38436BC01",
    description: "Rédiger des spécifications techniques en analysant un CDC, afin de cadrer techniquement un projet de développement de solution web"
  },
  {
    id: "RNCP01-3",
    bloc: "RNCP38436BC01",
    description: "Déployer un environnement de travail en mettant en place les outils de versionnage, de partage et de collaboration/communication nécessaires, afin de cadrer opérationnellement un projet de développement de solution web"
  },
  {
    id: "RNCP01-4",
    bloc: "RNCP38436BC01",
    description: "Réaliser une maquette afin de permettre au client de valider la structure de la solution web en respectant les bonnes pratiques en termes d'ergonomie et d'accessibilité"
  },
  {
    id: "RNCP01-5",
    bloc: "RNCP38436BC01",
    description: "Identifier les fonctionnalités à développer, en modélisant les divers éléments et leurs interconnexions, afin de structurer l'architecture de la solution web et de Base De Données (BDD)"
  },
  {
    id: "RNCP01-6",
    bloc: "RNCP38436BC01",
    description: "Rédiger une présentation pour présenter les choix techniques, les maquettes, et le schéma de la solution web en argumentant les choix faits afin de permettre au client ou au décideur de valider la proposition de solution"
  },

  // Bloc 2: Développer une solution web
  {
    id: "RNCP02-1",
    bloc: "RNCP38436BC02",
    description: "Développer le prototype de la solution web afin de présenter l'architecture technique au client"
  },
  {
    id: "RNCP02-2",
    bloc: "RNCP38436BC02",
    description: "Rédiger le code de la solution en transcrivant les fonctionnalités du CDC, en respectant les normes d'accessibilité, d'ergonomie, de référencement, et la réglementation en vigueur afin de développer la solution web"
  },
  {
    id: "RNCP02-3",
    bloc: "RNCP38436BC02",
    description: "Intégrer les différents éléments de la solution web en fonction des maquettes, en respectant les dernières normes des langages utilisés (HTML, CSS, JS, …)"
  },
  {
    id: "RNCP02-4",
    bloc: "RNCP38436BC02",
    description: "Implémenter la partie \"front-end\" d'une solution web"
  },
  {
    id: "RNCP02-5",
    bloc: "RNCP38436BC02",
    description: "Implémenter la logique et la base de données assurant la persistance des données côté serveur (le \"back-end\")"
  },
  {
    id: "RNCP02-6",
    bloc: "RNCP38436BC02",
    description: "Implémenter des règles d'authentification, en respectant les bonnes pratiques en matière de sécurité, afin de sécuriser l'accès à une solution web"
  },
  {
    id: "RNCP02-7",
    bloc: "RNCP38436BC02",
    description: "Implémenter un plan de tests en concevant les différents tests unitaires et d'intégration afin de vérifier que l'ensemble des fonctionnalités développées fonctionne bien séparément et à l'unisson"
  },
  {
    id: "RNCP02-8",
    bloc: "RNCP38436BC02",
    description: "Déployer une application web en utilisant un serveur afin de rendre l'application accessible aux utilisateurs"
  },

  // Bloc 3: Déployer un système d'assurance qualité tout au long du cycle de vie d'une solution web
  {
    id: "RNCP03-1",
    bloc: "RNCP38436BC03",
    description: "Rédiger une documentation technique à destination des équipes parties prenantes en réalisant la documentation technique et fonctionnelle de la solution web, afin de garantir sa pérennité et son évolution future"
  },
  {
    id: "RNCP03-2",
    bloc: "RNCP38436BC03",
    description: "Rédiger une documentation utilisateur pour apporter un support aux utilisateurs, afin de garantir l'autonomie et la satisfaction des utilisateurs de la solution web"
  },
  {
    id: "RNCP03-3",
    bloc: "RNCP38436BC03",
    description: "Monitorer le lancement d'une solution web, en recueillant les retours utilisateurs, afin d'évaluer la qualité de la solution web déployée"
  },
  {
    id: "RNCP03-4", 
    bloc: "RNCP38436BC03",
    description: "Identifier des améliorations qualitatives et de performance d'une solution web, en analysant les retours utilisateurs et les données d'analyse du trafic, afin d'améliorer la qualité et la disponibilité d'une solution web déployée"
  },
  {
    id: "RNCP03-5",
    bloc: "RNCP38436BC03",
    description: "Analyser la qualité de l'ergonomie et la qualité de l'accessibilité de la solution (normes, design, ergonomie, navigation, référencement, bonnes pratiques, etc.) pour identifier les axes d'amélioration"
  },
  {
    id: "RNCP03-6",
    bloc: "RNCP38436BC03",
    description: "Rédiger un document argumentatif en listant des propositions d'améliorations afin de faire valider des préconisations de développements correctifs d'une solution web"
  }
];

export const getSkillsByBloc = (bloc: string): RNCPSkill[] => {
  return rncpSkills.filter(skill => skill.bloc === bloc);
};

export const getSkillById = (id: string): RNCPSkill | undefined => {
  return rncpSkills.find(skill => skill.id === id);
};

export const getDescriptionById = (id: string): string => {
  const skill = getSkillById(id);
  return skill ? skill.description : "Compétence inconnue";
}

export const getBlocTitle = (bloc: string): string => {
  switch (bloc) {
    case "RNCP38436BC01":
      return "Cadrer un projet et conceptualiser une solution web";
    case "RNCP38436BC02":
      return "Développer une solution web";
    case "RNCP38436BC03":
      return "Déployer un système d'assurance qualité tout au long du cycle de vie d'une solution web";
    default:
      return "Bloc inconnu";
  }
};
