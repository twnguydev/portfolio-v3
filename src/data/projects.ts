import { Project } from "@/interfaces/project";
import { getDescriptionById } from "./rncp-skills";

export const projectsData: Project[] = [
  {
    title: "Modernisation ERP",
    shortDescription: "Migration complète d'un ERP pour une ESN avec architecture moderne",
    description: "Refonte complète d'un système ERP existant en utilisant une architecture API/Front-end séparée. Migration d'un serveur mutualisé vers une infrastructure VPS avec Docker, mise en place de pipelines CI/CD et amélioration significative des performances et de l'UX.",
    images: [
      "/images/projects/erp-enterprise.webp",
      "/images/projects/erp-enterprise2.webp",
      "/images/projects/erp-enterprise3.webp"
    ],
    tags: ["Laravel", "Angular", "TypeScript", "Docker", "MySQL", "CI/CD"],
    gradient: "blue-cyan",
    type: "professional",
    demoUrl: "https://lwt.jlcconsulting.eu",
    badges: {
      professional: true,
    },
    skills: [
      {
        name: "Architecture d'applications",
        description: "Conception et implémentation d'une architecture moderne API/Front-end séparée pour un système complexe.",
        category: "Architecture"
      },
      {
        name: "DevOps",
        description: "Migration vers une infrastructure VPS avec Docker et mise en place de pipelines CI/CD pour le déploiement continu.",
        category: "DevOps"
      },
      {
        name: "Développement Full-Stack",
        description: "Création d'API RESTful avec Laravel et d'interfaces utilisateur réactives avec Angular et TypeScript.",
        category: "Back-end"
      }
    ]
  },
  {
    title: "Twool Labs",
    shortDescription: "Plateforme de simulation et d'optimisation de processus business",
    description: "Développement d'un logiciel SaaS destiné aux entreprises pour la simulation et l'optimisation de leurs processus métier, permettant de visualiser et d'améliorer les processus opérationnels.",
    images: [
      "/images/projects/twool.webp",
      "/images/projects/twool2.webp",
      "/images/projects/twool3.webp",
      "/images/projects/twool4.webp"
    ],
    tags: ["Next.js", "FastAPI", "MySQL", "Tailwind", "Docker", "Electron"],
    gradient: "purple-pink",
    type: "professional",
    sourceUrl: "https://github.com/twnguydev/twool",
    badges: {
      professional: true,
      inProgress: true
    },
    skills: [
      {
        name: "Développement SaaS",
        description: "Conception d'une plateforme SaaS complète avec gestion multi-tenants et abonnements.",
        category: "Architecture"
      },
      {
        name: "UX/UI Business",
        description: "Création d'interfaces utilisateur adaptées aux besoins métier avec visualisation avancée de workflows.",
        category: "Front-end"
      },
      {
        name: "Performance et optimisation",
        description: "Implémentation d'algorithmes d'optimisation pour l'analyse et l'amélioration des workflows client.",
        category: "Back-end"
      }
    ]
  },
  {
    title: "UniTeam",
    shortDescription: "Plateforme de gestion et de réservation de salles universitaires",
    description: "Plateforme de gestion et de réservation de salles d'une infrastructure universitaire, développée lors d'un hackathon et ayant remporté le premier prix.",
    images: [
      "/images/projects/uniteam-4.webp",
      "/images/projects/uniteam-2.webp",
      "/images/projects/uniteam-3.webp"
    ],
    tags: ["React", "TypeScript", "Tailwind", "FastAPI", "Supabase", "Docker", "Swagger"],
    gradient: "pink-purple",
    type: "school",
    demoUrl: "https://uniteam.vercel.app/",
    sourceUrl: "https://github.com/twnguydev/uniteam",
    badges: {
      hackathon: true,
      winner: true,
    },
    skills: [
      {
        name: "Compréhension des besoins métier",
        description: getDescriptionById('RNCP01-2'),
        category: "Management",
        rncpSkillIds: ["RNCP01-2"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Organisation du projet",
        description: getDescriptionById('RNCP01-3'),
        category: "Management",
        rncpSkillIds: ["RNCP01-3"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Développement Full-Stack",
        descriptions: [
          getDescriptionById('RNCP02-2'),
          getDescriptionById('RNCP02-4'),
          getDescriptionById('RNCP02-5')

        ],
        category: "Développement",
        rncpSkillIds: ["RNCP02-2", "RNCP02-4", "RNCP02-5"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      },
      {
        name: "Authentification sécurisée",
        description: getDescriptionById('RNCP02-6'),
        category: "Sécurité",
        rncpSkillIds: ["RNCP02-6"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      },
      {
        name: "Cycle de vie d'une application",
        description: getDescriptionById('RNCP03-5'),
        category: "Qualité",
        rncpSkillIds: ["RNCP03-5"],
        rncpReference: "RNCP38436BC03 - Déployer un système d’assurance qualité tout au long du cycle de vie d’une solution web"
      }
    ]
  },
  {
    title: "MindCare",
    shortDescription: "Plateforme dédiée à la santé mentale",
    description: "MindCare est notre projet de fin d'études et vise à proposer une solution digitale pour une communauté autour de la santé mentale, avec des fonctionnalités de suivi, de coaching et de prévention.",
    images: [
      "/images/projects/mindcare.webp",
    ],
    tags: ["Angular", "Tailwind", "TypeScript", "Laravel", "Python", "MySQL", "Docker", "Grafana", "Swagger"],
    gradient: "pink-purple",
    type: "school",
    demoUrl: "https://mind-care.fr",
    sourceUrl: "https://github.com/MindCareFR/mindcare",
    badges: {
      ia: true,
      inProgress: true,
    },
    skills: [
      {
        name: "Analyser le marché et définir un ensemble de besoins métier",
        descriptions: [
          getDescriptionById('RNCP01-1'),
          getDescriptionById('RNCP01-2'),
          getDescriptionById('RNCP01-6')
        ],
        category: "Management",
        rncpSkillIds: ["RNCP01-1", "RNCP01-2", "RNCP01-6"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Modélisation et conception de l'interface utilisateur",
        descriptions: [
          getDescriptionById('RNCP01-3'),
          getDescriptionById('RNCP01-4'),
          getDescriptionById('RNCP01-5')

        ],
        category: "Architecture",
        rncpSkillIds: ["RNCP01-3", "RNCP01-4", "RNCP01-5"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Front-end",
        descriptions: [
          getDescriptionById('RNCP02-1'),
          getDescriptionById('RNCP02-2'),
          getDescriptionById('RNCP02-3'),
          getDescriptionById('RNCP02-4'),
          getDescriptionById('RNCP02-7')
        ],
        category: "Développement",
        rncpSkillIds: ["RNCP02-1", "RNCP02-2", "RNCP02-3", "RNCP02-4", "RNCP02-7"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      },
      {
        name: "Back-end",
        descriptions: [
          getDescriptionById('RNCP02-5'),
          getDescriptionById('RNCP02-7'),
          getDescriptionById('RNCP02-8')
        ],
        category: "Développement",
        rncpSkillIds: ["RNCP02-5", "RNCP02-8", "RNCP02-7"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      },
      {
        name: "Authentification sécurisée",
        description: getDescriptionById('RNCP02-6'),
        category: "Sécurité",
        rncpSkillIds: ["RNCP02-6"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      },
      {
        name: "Analyse de l'ergonomie et de l'accessibilité",
        descriptions: [
          getDescriptionById('RNCP03-5'),
          getDescriptionById('RNCP03-6')
        ],
        category: "Qualité",
        rncpSkillIds: ["RNCP03-5", "RNCP03-6"],
        rncpReference: "RNCP38436BC03 - Déployer un système d’assurance qualité tout au long du cycle de vie d’une solution web"
      },
      {
        name: "Monitoring et amélioration continue",
        descriptions: [
          getDescriptionById('RNCP03-3'),
          getDescriptionById('RNCP03-4')
        ],
        category: "Qualité",
        rncpSkillIds: ["RNCP03-3", "RNCP03-4"],
        rncpReference: "RNCP38436BC03 - Déployer un système d’assurance qualité tout au long du cycle de vie d’une solution web"
      },
      {
        name: "Support et maintenance",
        descriptions: [
          getDescriptionById('RNCP03-1'),
          getDescriptionById('RNCP03-2')
        ],
        category: "Qualité",
        rncpSkillIds: ["RNCP03-1", "RNCP03-2"],
        rncpReference: "RNCP38436BC03 - Déployer un système d’assurance qualité tout au long du cycle de vie d’une solution web"
      }
    ]
  },
  {
    title: "Jobbbly",
    shortDescription: "Bot d'automatisation de candidatures pour la recherche d'alternance",
    description: "Développement d'un robot automatisé pour faciliter la recherche d'alternance, capable de soumettre des candidatures personnalisées et de suivre leur progression.",
    images: [
      "/images/projects/jobbbly.webp",
      "/images/projects/jobbbly2.webp",
      "/images/projects/jobbbly3.webp",
      "/images/projects/jobbbly4.webp"
    ],
    tags: ["Next.js", "NodeJS", "Beautiful Soup", "Automatisation"],
    gradient: "blue-cyan",
    type: "professional",
    sourceUrl: "https://github.com/twnguydev/jobbbly",
    demoUrl: "https://jobbbly.vercel.app/",
    badges: {
      inProgress: true,
    },
    skills: [
      {
        name: "Automatisation de processus",
        description: "Création d'un système automatisé pour simplifier une tâche répétitive et chronophage.",
        category: "Back-end",
        rncpReference: "Bloc 3: Développer des composants d'accès aux données"
      },
      {
        name: "Web Scraping éthique",
        description: "Implémentation de techniques de scraping respectueuses des sites visités.",
        category: "Back-end",
        rncpReference: "Bloc 4: Développer des composants dans une application de gestion de contenu"
      },
      {
        name: "Traitement de données",
        description: "Gestion et suivi des candidatures avec stockage et analyse des résultats.",
        category: "Data",
        rncpReference: "Bloc 3: Développer des composants d'accès aux données"
      }
    ]
  },
  {
    title: "Mobalpa",
    shortDescription: "Boutique en ligne pour un franchisé Mobalpa avec IA prédictive",
    description: "Création de la boutique en ligne d'un franchisé Mobalpa avec fonctionnalités d'analyse prédictive pour les ventes et le comportement client.",
    images: [
      "/images/projects/mobalpa.webp",
      "/images/projects/mobalpa-2.webp",
      "/images/projects/mobalpa-3.webp",
      "/images/projects/mobalpa-4.webp"
    ],
    tags: ["Spring Boot", "Angular", "TypeScript", "Tailwind", "MySQL", "MongoDB", "Swagger", "Docker"],
    gradient: "green-emerald",
    type: "school",
    sourceUrl: "https://github.com/twnguydev/mobalpa",
    badges: {
      ia: true,
    },
    skills: [
      {
        name: "Idéation et conception",
        description: getDescriptionById('RNCP01-1'),
        category: "Management",
        rncpSkillIds: ["RNCP01-1"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Compréhension des besoins métier",
        descriptions: [
          getDescriptionById('RNCP01-2'),
          getDescriptionById('RNCP01-6')
        ],
        category: "Management",
        rncpSkillIds: ["RNCP01-2", "RNCP01-6"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Organisation du projet",
        description: getDescriptionById('RNCP01-3'),
        category: "Management",
        rncpSkillIds: ["RNCP01-3"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Design et UX/UI",
        description: getDescriptionById('RNCP01-4'),
        category: "Développement",
        rncpSkillIds: ["RNCP01-4"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Architecture et base de données",
        description: getDescriptionById('RNCP01-5'),
        category: "Développement",
        rncpSkillIds: ["RNCP01-5"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Développement Full-Stack",
        descriptions: [
          getDescriptionById('RNCP02-2'),
          getDescriptionById('RNCP02-4'),
          getDescriptionById('RNCP02-5')

        ],
        category: "Développement",
        rncpSkillIds: ["RNCP02-2", "RNCP02-4", "RNCP02-5"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      },
      {
        name: "Authentification sécurisée",
        description: getDescriptionById('RNCP02-6'),
        category: "Sécurité",
        rncpSkillIds: ["RNCP02-6"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      },
      {
        name: "Cycle de vie d'une application",
        description: getDescriptionById('RNCP03-5'),
        category: "Qualité",
        rncpSkillIds: ["RNCP03-5"],
        rncpReference: "RNCP38436BC03 - Déployer un système d’assurance qualité tout au long du cycle de vie d’une solution web"
      }
    ]
  },
  {
    title: "IA 4 Good",
    shortDescription: "Analyse de pollution environnementale par IA - Hackathon lauréat",
    description: "Projet pour l'analyse de la pollution de la région Fos-Marseille développé lors d'un hackathon organisé par Microsoft, Onepoint et SFR. Solution primée pour son impact environnemental et social.",
    images: [
      "/images/projects/ia4good.webp",
      "/images/projects/ia4good-2.webp",
      "/images/projects/ia4good-3.webp",
      "/images/projects/ia4good-4.webp",
      "/images/projects/ia4good-5.webp"
    ],
    tags: ["Python", "React", "TypeScript", "Tailwind", "IA Générative", "Docker"],
    gradient: "amber-yellow",
    type: "school",
    sourceUrl: "https://github.com/twnguydev/hackaton-onepoint",
    badges: {
      hackathon: true,
      winner: true,
      ia: true
    },
    skills: [
      {
        name: "Compréhension des besoins métier",
        description: getDescriptionById('RNCP01-2'),
        category: "Management",
        rncpSkillIds: ["RNCP01-2"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Organisation du projet",
        description: getDescriptionById('RNCP01-3'),
        category: "Management",
        rncpSkillIds: ["RNCP01-3"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Développement Full-Stack",
        descriptions: [
          getDescriptionById('RNCP02-2'),
          getDescriptionById('RNCP02-4'),
          getDescriptionById('RNCP02-5')

        ],
        category: "Développement",
        rncpSkillIds: ["RNCP02-2", "RNCP02-4", "RNCP02-5"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      },
      {
        name: "Authentification sécurisée",
        description: getDescriptionById('RNCP02-6'),
        category: "Sécurité",
        rncpSkillIds: ["RNCP02-6"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      },
      {
        name: "Cycle de vie d'une application",
        description: getDescriptionById('RNCP03-5'),
        category: "Qualité",
        rncpSkillIds: ["RNCP03-5"],
        rncpReference: "RNCP38436BC03 - Déployer un système d’assurance qualité tout au long du cycle de vie d’une solution web"
      }
    ]
  },
  {
    title: "Alternance Quest",
    shortDescription: "Réalisation d'un jeu-vidéo 2D consacré à la recherche d'alternance",
    description: "Réalisation d'un jeu-vidéo 2D consacré à la recherche d'alternance",
    images: [
      "/images/projects/alternance-quest.webp",
      "/images/projects/alternance-2.webp",
      "/images/projects/alternance-3.webp",
      "/images/projects/alternance-4.webp",
      "/images/projects/alternance-5.webp"
    ],
    tags: ["JavaScript", "Phaser"],
    gradient: "blue-cyan",
    type: "school",
    sourceUrl: "https://github.com/twnguydev/alternance-quest-rpg",
    demoUrl: "https://webac-jsf-display.vercel.app/tanguy",
    skills: [
      {
        name: "Compréhension du projet et cadrage",
        descriptions: [
          getDescriptionById('RNCP01-2'),
          getDescriptionById('RNCP01-3')
        ],
        category: "Management",
        rncpSkillIds: ["RNCP01-2", "RNCP01-3"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Conception de l'interface utilisateur",
        descriptions: [
          getDescriptionById('RNCP02-4'),
          getDescriptionById('RNCP02-8')
        ],
        category: "Back-end",
        rncpSkillIds: ["RNCP02-4", "RNCP02-8"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      }
    ]
  },
  {
    title: "MyTwitter",
    shortDescription: "Plateforme de microblogging en PHP",
    description: "Développement d'une plateforme de microblogging en équipe avec gestion des utilisateurs, des tweets et des abonnements.",
    images: [
      "/images/projects/tweet-academy.webp",
      "/images/projects/tweet-2.webp",
      "/images/projects/tweet-3.webp",
      "/images/projects/tweet-4.webp"
    ],
    tags: ["HTML", "Bootstrap", "PHP", "MySQL"],
    gradient: "amber-yellow",
    type: "school",
    sourceUrl: "https://github.com/twnguydev/twitter-like",
    skills: [
      {
        name: "Compréhension du projet et cadrage",
        descriptions: [
          getDescriptionById('RNCP01-3'),
          getDescriptionById('RNCP01-5')
        ],
        category: "Management",
        rncpSkillIds: ["RNCP01-3", "RNCP01-5"],
        rncpReference: "RNCP38436BC01 - Cadrer un projet et conceptualiser une solution web"
      },
      {
        name: "Conception de l'interface utilisateur",
        descriptions: [
          getDescriptionById('RNCP02-4'),
          getDescriptionById('RNCP02-5')
        ],
        category: "Développement",
        rncpSkillIds: ["RNCP02-4", "RNCP02-5"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      },
      {
        name: "Authentification sécurisée",
        descriptions: [
          getDescriptionById('RNCP02-6')
        ],
        category: "Sécurité",
        rncpSkillIds: ["RNCP02-6"],
        rncpReference: "RNCP38436BC02 - Développer une solution web"
      }
    ]
  },
];