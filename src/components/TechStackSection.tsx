import React from 'react';

interface TechFeature {
  name: string;
  items: string[];
  gradient: string;
}

const TechStackSection = (): JSX.Element => {
  const features: TechFeature[] = [
    {
      name: "Frontend",
      items: [
        "React & Next.js",
        "Angular & TypeScript",
        "TailwindCSS & SCSS",
        "UX/UI responsive"
      ],
      gradient: "from-rose-500 to-purple-500"
    },
    {
      name: "Backend",
      items: [
        "Laravel & PHP",
        "Spring Boot & Java",
        "Nest & Express",
        "APIs RESTful"
      ],
      gradient: "from-purple-500 to-blue-500"
    },
    {
      name: "Base de données",
      items: [
        "MySQL & PostgreSQL",
        "MongoDB",
        "Optimisation des requêtes",
        "Modélisation de données"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "DevOps & Outils",
      items: [
        "Docker & CI/CD",
        "Git & GitHub/GitLab",
        "Tests automatisés",
        "Monitoring & Sécurité"
      ],
      gradient: "from-cyan-500 to-teal-500"
    }
  ];

  return (
    <section className="tech-stack">
      <div className="tech-stack__overlay"></div>
      <div className="tech-stack__container">
        <div className="tech-stack__header">
          <h2 className="tech-stack__title">
            Des technologies modernes<br />
            <span className="tech-stack__title-accent">
              pour des solutions robustes
            </span>
          </h2>
          <p className="tech-stack__description">
            Mon expertise technique est constamment actualisée pour répondre aux défis d'aujourd'hui.
          </p>
        </div>

        <div className="tech-stack__grid">
          {features.map((feature, index) => (
            <div key={index} className="tech-stack__card">
              <div 
                className="tech-stack__card-overlay"
                data-gradient={feature.gradient}
              ></div>
              <div className="tech-stack__card-content">
                <h3 
                  className="tech-stack__card-title"
                  data-gradient={feature.gradient}
                >
                  {feature.name}
                </h3>
                <ul className="tech-stack__list">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="tech-stack__list-item">
                      <div 
                        className="tech-stack__list-dot"
                        data-gradient={feature.gradient}
                      ></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;