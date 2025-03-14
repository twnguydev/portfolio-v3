import React from 'react';
import { Code, Zap, FileCode, Bot, ArrowRight, BookOpen, Briefcase } from 'lucide-react';
import Link from 'next/link';

const AboutSection = (): JSX.Element => {
  const skills = [
    {
      icon: <Code />,
      title: "Développement Web",
      description: "Front-end, Back-end, Architecture, Base de données",
      size: "xl"
    },
    {
      icon: <Zap />,
      title: "Admin Système",
      description: "DevOps, CI/CD, Serveur, Docker",
      size: "xl"
    },
    {
      icon: <FileCode />,
      title: "SaaS & Logiciels",
      description: "Solutions B2B",
      size: "xl"
    },
    {
      icon: <Bot />,
      title: "Automatisation",
      description: "Bots, Scripts, Workflows",
      size: "xl"
    }
  ];

  const technologies = [
    { name: "Next.js", size: "md" },
    { name: "Angular", size: "md" },
    { name: "TypeScript", size: "md" },
    { name: "Laravel", size: "md" },
    { name: "Spring Boot", size: "md" },
    { name: "Docker", size: "md" },
    { name: "Python", size: "md" },
    { name: "IA Générative", size: "md" },
    { name: "UX/UI", size: "md" },
    { name: "CI/CD", size: "md" }
  ];

  return (
    <section className="about" id="about">
      <div className="about__container">
        <div className="about__content">
          <div className="about__bio-wrapper">
            <div className="about__bio">
              <div className="about__bio-header">
                <h3 className="about__bio-name">Tanguy Gibrat</h3>
                <p className="about__bio-title">Développeur Web & Consultant en alternance</p>
              </div>

              <div className="about__quote">
                <p>La tech est un outil formidable pour résoudre des problèmes concrets et créer de la valeur tangible pour les entreprises.</p>
              </div>

              <div className="about__bio-content">
                <p>Étudiant à la Web@cadémie by Epitech, je développe des solutions digitales pour moderniser les processus métier et créer des applications à forte valeur ajoutée.</p>
                <p>Polyvalent et curieux, je me spécialise dans le développement full-stack, l'IA générative et les SaaS qui répondent à des besoins business précis, avec une passion pour l'automatisation des processus répétitifs.</p>
              </div>

              <Link href="#portfolio" className="about__bio-link">
                <span>Voir mes réalisations</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="about__credentials">
              <div className="about__credential about__credential--education">
                <div className="about__credential-icon">
                  <BookOpen size={24} />
                </div>
                <div className="about__credential-content">
                  <h4 className="about__credential-title">Formation</h4>
                  <p className="about__credential-subtitle">Web@cadémie</p>
                  <p className="about__credential-description">Epitech Marseille</p>
                </div>
              </div>

              <div className="about__credential about__credential--work">
                <div className="about__credential-icon">
                  <Briefcase size={24} />
                </div>
                <div className="about__credential-content">
                  <h4 className="about__credential-title">Poste actuel</h4>
                  <p className="about__credential-subtitle">Consultant Solutions Web</p>
                  <p className="about__credential-description">JLC Consulting</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="about__specialties">
          <div className="about__skills-cloud">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`about__skill-bubble about__skill-bubble--${skill.size}`}
              >
                <div className="about__skill-icon">{skill.icon}</div>
                <div className="about__skill-content">
                  <h4 className="about__skill-title">{skill.title}</h4>
                  <p className="about__skill-description">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="about__tech-cloud">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className={`about__tech-tag about__tech-tag--${tech.size}`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;