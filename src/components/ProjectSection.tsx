import React, { useState } from 'react';
import Image from 'next/image';
import { ProjectModal } from './ProjectModal';
import { Trophy, Clock, Rocket, Brain, Server } from 'lucide-react';

interface Skill {
  name: string;
  description: string;
  category: 'Backend' | 'Frontend' | 'DevOps' | 'Security' | 'Architecture' | 'Data' | 'Management';
}

interface Project {
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  tags: string[];
  gradient: string;
  demoUrl?: string;
  sourceUrl?: string;
  badges?: {
    inProgress?: boolean;
    winner?: boolean;
    hackathon?: boolean;
    ia?: boolean;
    professional?: boolean;
  },
  skills: Skill[]
}

const ProjectSection = (): JSX.Element => {
  const [showProject, setShowProject] = useState<Project | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const projects: Project[] = [
    {
      title: "Modernisation ERP",
      shortDescription: "Migration complète d'un ERP pour une ESN avec architecture moderne",
      description: "Refonte complète d'un système ERP existant en utilisant une architecture API/Frontend séparée. Migration d'un serveur mutualisé vers une infrastructure VPS avec Docker, mise en place de pipelines CI/CD et amélioration significative des performances et de l'UX.",
      images: [
        "/images/projects/erp-enterprise.webp",
        "/images/projects/erp-enterprise2.webp",
        "/images/projects/erp-enterprise3.webp"
      ],
      tags: ["Laravel", "Angular", "TypeScript", "Docker", "MySQL", "CI/CD"],
      gradient: "blue-cyan",
      badges: {
        professional: true,
      },
      skills: [
        {
          name: "Architecture d'applications",
          description: "Conception et implémentation d'une architecture moderne API/Frontend séparée pour un système complexe.",
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
          category: "Backend"
        }
      ]
    },
    {
      title: "Twool Labs",
      shortDescription: "Plateforme de simulation et d'optimisation de processus business",
      description: "Développement d'un logiciel SaaS destiné aux entreprises pour la simulation et l'optimisation de leurs processus métier, permettant de visualiser et d'améliorer les processus opérationnels.",
      images: [
        "/images/projects/workflow.webp" // Placeholder - à remplacer
      ],
      tags: ["Next.js", "FastAPI", "MySQL", "Tailwind", "Docker", "Electron"],
      gradient: "purple-pink",
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
          category: "Frontend"
        },
        {
          name: "Performance et optimisation",
          description: "Implémentation d'algorithmes d'optimisation pour l'analyse et l'amélioration des workflows client.",
          category: "Backend"
        }
      ]
    },
    {
      title: "UniTeam",
      shortDescription: "Plateforme de gestion et de réservation de salles universitaires",
      description: "Plateforme de gestion et de réservation de salles d'une infrastructure universitaire, développée lors d'un hackathon et ayant remporté le premier prix.",
      images: [
        "/images/projects/uniteam.webp",
        "/images/projects/uniteam-2.webp",
        "/images/projects/uniteam-3.webp"
      ],
      tags: ["React", "TypeScript", "Tailwind", "FastAPI", "Supabase", "Docker"],
      gradient: "pink-purple",
      badges: {
        hackathon: true,
        winner: true
      },
      skills: [
        {
          name: "Compréhension des besoins métier",
          description: "Analyse des besoins métier pour concevoir une plateforme de gestion de salles adaptée.",
          category: "Management"
        },
        {
          name: "Gestion du temps",
          description: "Développement rapide sous contrainte temporelle en équipe pour un hackathon.",
          category: "Management"
        },
        {
          name: "Développement Full-Stack",
          description: "Conception et implémentation d'une application complète avec backend FastAPI et frontend React.",
          category: "Frontend"
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
      badges: {
        inProgress: true,
      },
      skills: [
        {
          name: "Automatisation de processus",
          description: "Création d'un système automatisé pour simplifier une tâche répétitive et chronophage.",
          category: "Backend"
        },
        {
          name: "Web Scraping éthique",
          description: "Implémentation de techniques de scraping respectueuses des sites visités.",
          category: "Backend"
        },
        {
          name: "Traitement de données",
          description: "Gestion et suivi des candidatures avec stockage et analyse des résultats.",
          category: "Data"
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
        "/images/projects/mobalpa-3.webp"
      ],
      tags: ["Spring Boot", "Angular", "TypeScript", "Tailwind", "MySQL", "MongoDB", "Swagger", "Docker"],
      gradient: "green-emerald",
      sourceUrl: "https://github.com/twnguydev/mobalpa",
      demoUrl: "https://mobalpa.netlify.app",
      badges: {
        ia: true,
      },
      skills: [
        {
          name: "Architecture Microservices",
          description: "Décomposition de l'application en services indépendants pour faciliter la maintenance et le déploiement.",
          category: "Architecture"
        },
        {
          name: "IA prédictive business",
          description: "Implémentation de modèles prédictifs pour anticiper les ventes et optimiser l'expérience client.",
          category: "Backend"
        },
        {
          name: "E-commerce avancé",
          description: "Développement d'une plateforme e-commerce complète avec fonctionnalités personnalisées pour le secteur de l'ameublement.",
          category: "Frontend"
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
      badges: {
        hackathon: true,
        winner: true,
        ia: true
      },
      skills: [
        {
          name: "Intelligence Artificielle Générative",
          description: "Utilisation d'Ollama et GPT-4o pour analyser les données, prédire les niveaux de pollution et générer des rapports.",
          category: "Backend"
        },
        {
          name: "Traitement de données environnementales",
          description: "Utilisation d'un dataset de 5 giga-octets de données environnementales pour entraîner les modèles IA.",
          category: "Data"
        },
        {
          name: "Visualisation de données",
          description: "Conception d'interfaces de visualisation de données environnementales complexes pour faciliter la compréhension et la prise de décision.",
          category: "Frontend"
        },
        {
          name: "Impact environnemental",
          description: "Application des compétences techniques pour résoudre des problématiques environnementales concrètes.",
          category: "Management"
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
        "/images/projects/alternance-4.webp"
      ],
      tags: ["JavaScript", "Phaser"],
      gradient: "blue-cyan",
      skills: [
        {
          name: "Utilisation de Phaser",
          description: "Création d'un jeu-vidéo 2D avec le framework Phaser pour une expérience immersive.",
          category: "Frontend"
        },
        {
          name: "Gestion du cycle de vie d'une application",
          description: "Gestion des états, des transitions et des interactions pour créer une expérience de jeu fluide.",
          category: "Frontend"
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
      skills: [
        {
          name: "Gestion de projet",
          description: "Travail en équipe sur un projet de grande envergure avec des fonctionnalités variées.",
          category: "Management"
        },
        {
          name: "Concevoir une base de données complexe",
          description: "Modélisation et implémentation d'une base de données relationnelle pour stocker les tweets et les utilisateurs.",
          category: "Data"
        },
        {
          name: "Authentification sécurisée",
          description: "Mise en place d'un système d'authentification robuste, gestion des sessions et protection CSRF.",
          category: "Security"
        }
      ]
    },
  ];

  const getTag = (tag: string): string => {
    return tag.toLowerCase().replace(' ', '-').replace('.', '');
  };

  const allTags = [...new Set(projects.flatMap(project => project.tags))].sort();
  const filteredProjects = selectedTag
    ? projects.filter(project => project.tags.includes(selectedTag))
    : projects;

  return (
    <section className="projects" id="portfolio">
      <div className="projects__overlay"></div>
      <div className="projects__container">
        <div className="projects__header">
          <h2 className="projects__title">
            Des projets concrets qui<br />
            <span>répondent à des besoins réels</span>
          </h2>
          <p className="projects__description">
            Un aperçu de mes réalisations professionnelles et personnelles, alliant technique et valeur business.
          </p>
        </div>

        <div className="projects__filters">
          <button
            className={`projects__filter ${!selectedTag ? 'active' : ''}`}
            onClick={() => setSelectedTag(null)}
          >
            Tous
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`projects__filter ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              onClick={() => setShowProject(project)}
              className="projects__card"
            >
              <div className="projects__card-content">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  className="projects__image"
                  width={1920}
                  height={1080}
                  loading="lazy"
                />
                <div className="projects__blur-overlay"></div>
                <div className="projects__gradient-overlay"></div>
                <div className="projects__theme-overlay"></div>

                {project.badges && (
                  <div className="projects__badges">
                    {project.badges.inProgress && (
                      <span className="projects__badge projects__badge--in-progress">
                        <Clock className="projects__badge-icon" />
                        En cours
                      </span>
                    )}
                    {project.badges.winner && (
                      <span className="projects__badge projects__badge--winner">
                        <Trophy className="projects__badge-icon" />
                        Lauréat
                      </span>
                    )}
                    {project.badges.hackathon && (
                      <span className="projects__badge projects__badge--hackathon">
                        <Rocket className="projects__badge-icon" />
                        Hackathon
                      </span>
                    )}
                    {project.badges.ia && (
                      <span className="projects__badge projects__badge--ia">
                        <Brain className="projects__badge-icon" />
                        IA
                      </span>
                    )}
                    {project.badges.professional && (
                      <span className="projects__badge projects__badge--professional">
                        <Server className="projects__badge-icon" />
                        Pro
                      </span>
                    )}
                  </div>
                )}

                <div className="projects__info">
                  <h3 className="projects__info-title">{project.title}</h3>
                  <p className="projects__info-description">{project.shortDescription}</p>
                  <div className="projects__tags">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`projects__tag projects__tag--${getTag(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {
        showProject && (
          <ProjectModal
            project={showProject}
            onClose={() => setShowProject(null)}
          />
        )
      }
    </section>
  );
};

export default ProjectSection;