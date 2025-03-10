import React from 'react';
import Image from 'next/image';
import { Code, Zap, FileCode, Bot } from 'lucide-react';

const AboutSection = (): JSX.Element => {
  const skills = [
    {
      icon: <Code className="about__card-icon" />,
      title: "Développement Web",
      description: "Frontend, Backend, Architecture"
    },
    {
      icon: <Zap className="about__card-icon" />,
      title: "Intelligence Artificielle",
      description: "IA Générative, Automatisation"
    },
    {
      icon: <FileCode className="about__card-icon" />,
      title: "SaaS & Logiciels",
      description: "Solutions B2B"
    },
    {
      icon: <Bot className="about__card-icon" />,
      title: "Automatisation",
      description: "Bots, Scripts, Workflows"
    }
  ];

  const tags = [
    "Next.js",
    "Angular",
    "TypeScript",
    "Laravel",
    "Spring Boot",
    "Docker",
    "Python",
    "IA Générative",
    "UX/UI",
    "CI/CD"
  ];

  return (
    <section className="about">
      <div className="about__overlay"></div>
      <div className="about__container">
        <div className="about__grid">
          <div className="about__image-wrapper">
            <div className="about__image-container">
              <Image
                src="/images/tg-linkedin.webp"
                alt="Portrait de Tanguy Gibrat"
                className="about__image"
                layout="fill"
                objectFit="cover"
              />
              <div className="about__image-gradient-bottom"></div>
              <div className="about__image-gradient-overlay"></div>
              <div className="about__image-tint"></div>
            </div>
            <div className="about__badge about__badge--education">
              <div className="about__badge-subtitle">
                En formation à
              </div>
              <div className="about__badge-title">
                Epitech Marseille
              </div>
            </div>
            <div className="about__badge about__badge--work">
              <div className="about__badge-subtitle">
                Consultant Solutions web chez
              </div>
              <div className="about__badge-title">
                JLC Consulting
              </div>
            </div>
          </div>

          <div className="about__content">
            <div className="about__header">
              <h2 className="about__title">
                <span>Tanguy Gibrat</span>
              </h2>
              <p className="about__subtitle">
                Développeur Web & Consultant en alternance
              </p>
            </div>

            <blockquote className="about__quote">
              "La tech est un outil formidable pour résoudre des problèmes concrets et créer de la valeur tangible pour les entreprises."
            </blockquote>

            <div className="about__description">
              <p>
                Étudiant à la Web@cadémie by Epitech, je suis actuellement Consultant en Solutions web en alternance où je travaille sur la modernisation d'un ERP et le développement de solutions digitales pour nos clients.
              </p>
              <p>
                Polyvalent et curieux, je me spécialise dans le développement web full-stack, l'IA générative et la création de SaaS qui répondent à des besoins business précis. J'aime particulièrement automatiser des processus pour améliorer l'efficacité opérationnelle.
              </p>
              <p>
                Ma double approche technique et business me permet de comprendre les enjeux métiers et de proposer des solutions sur mesure qui apportent une véritable valeur ajoutée.
              </p>
            </div>
          </div>
        </div>

        <div className="about__skills-container">
          <div className="about__cards">
            {skills.map((skill, index) => (
              <div key={index} className="about__card">
                <div className="about__card-content">
                  {skill.icon}
                  <div>
                    <h3 className="about__card-title">{skill.title}</h3>
                    <p className="about__card-description">{skill.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="about__tags">
            {tags.map((tag, index) => (
              <span key={index} className="about__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;