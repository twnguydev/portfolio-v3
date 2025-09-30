import React, { useEffect, useRef } from 'react';
import { Code, GitBranch, Rocket, Target, FileDigit } from 'lucide-react';

const ProgressionSection = (): JSX.Element => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll('.progression__item');
      timelineItems.forEach(item => observer.observe(item));
    }

    return () => observer.disconnect();
  }, []);

  const milestones = [
    {
      icon: <Code className="progression__item-icon-svg" />,
      title: "Fondations",
      period: "2013",
      content: "Premiers pas dans le développement web avec HTML/CSS, PHP et MySQL en autodidacte. Projets personnels qui m'ont permis d'acquérir les bases de la programmation et de la gestion de bases de données.",
      skills: ["HTML/CSS", "JavaScript", "PHP", "SQL", "Bootstrap"],
      highlight: "Création de plusieurs rétro-serveurs Habbo et de sites communautaires."
    },
    {
      icon: <GitBranch className="progression__item-icon-svg" />,
      title: "Formation",
      period: "2023",
      content: "Intégration de la Web@cadémie by Epitech Marseille. Apprentissage intensif des frameworks modernes et meilleures pratiques de développement. Réalisation de projets en équipe avec méthodologies agiles.",
      skills: ["JavaScript", "TypeScript", "React", "Node.js", "Git", "TailwindCSS"],
      highlight: "Vainqueur de deux hackathons et création d'un outil de gestion de candidatures."
    },
    {
      icon: <Rocket className="progression__item-icon-svg" />,
      title: "Spécialisation",
      period: "2024",
      content: "Approfondissement des technologies web avancées et exploration de l'IA générative. Développement d'applications business avec TypeScript, Next.js et Spring Boot. Création d'un bot d'automatisation de candidatures.",
      skills: ["Next.js", "Spring Boot", "IA Générative", "API Design", "TypeScript", "Python"],
      highlight: "Création d'outils d'automatisation et d'applications."
    },
    {
      icon: <FileDigit className="progression__item-icon-svg" />,
      title: "Alternance",
      period: "2024",
      content: "Début d'alternance comme développeur web, puis évolution vers Consultant en Solutions web. Migration complète et nouveau Design System d'un ERP d'architecture monolithique vers Laravel API/Angular avec déploiement sur VPS via Docker et mise en place de pipelines CI/CD.",
      skills: ["Laravel", "Angular", "Docker", "CI/CD", "MySQL", "C#", "Administration Serveur"],
      highlight: "Modernisation complète d'un système d'information d'entreprise."
    },
    {
      icon: <Target className="progression__item-icon-svg" />,
      title: "Perspectives",
      period: "2024-2025",
      content: "Focus sur l'architecture logicielle et les solutions SaaS pour entreprises. Développement d'applications métier optimisées et d'outils pour la simulation et l'optimisation de processus business.",
      skills: ["Microservices", "Testing", "UX/UI", "Automatisation de process"],
      highlight: "En cours : développement d'un SaaS pour l'optimisation de processus business."
    }
  ];

  return (
    <section className="progression" id="progression">
      <div className="progression__overlay"></div>
      <div className="progression__container">
        <div className="progression__header">
          <h2 className="progression__title">
            Mon parcours et mon{' '}
            <span className="progression__title-accent">évolution</span>
          </h2>
          <p className="progression__description">
            Une progression constante, orientée vers la création de valeur technique et business.
          </p>
        </div>

        <div className="progression__timeline" ref={timelineRef}>
          {milestones.map((milestone, index) => (
            <div key={index} className="progression__item">
              <div className="progression__item-marker">
                <div className="progression__item-icon">
                  {milestone.icon}
                </div>
                <div className="progression__item-line" />
              </div>
              
              <div className="progression__item-content">
                <div className="progression__item-period">
                  {milestone.period}
                </div>
                <h3 className="progression__item-title">
                  {milestone.title}
                </h3>
                <p className="progression__item-text">
                  {milestone.content}
                </p>
                
                <div className="progression__item-skills">
                  {milestone.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="progression__item-skill">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="progression__item-highlight">
                  <span className="progression__item-highlight-icon">✨</span>
                  {milestone.highlight}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgressionSection;