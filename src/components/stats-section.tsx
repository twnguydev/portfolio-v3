import React from 'react';

interface Stat {
  number: string;
  label: string;
  sublabel: string;
}

const StatsSection = (): JSX.Element => {
  const stats: Stat[] = [
    { number: '3+', label: "années d'expérience", sublabel: 'Développement web' },
    { number: '5+', label: 'projets professionnels', sublabel: 'Applications & SaaS' },
    { number: '5+', label: "technologies maîtrisées", sublabel: 'Full-stack & DevOps' },
    { number: '100%', label: 'satisfaction client', sublabel: 'Projets livrés dans les délais' },
  ];

  return (
    <section className="stats">
      <div className="stats__overlay"></div>
      <div className="stats__container">
        <div className="stats__grid">
          {stats.map((stat, index) => (
            <div key={index} className="stats__card">
              <div className="stats__number">
                {stat.number}
              </div>
              <div className="stats__label">
                {stat.label}
              </div>
              <div className="stats__sublabel">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;