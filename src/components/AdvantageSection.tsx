import React from 'react';
import { Code, CheckCircle, Clock, Layout, Zap, Target } from 'lucide-react';

interface Advantage {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}

const AdvantageSection = (): JSX.Element => {
  const renderIcon = (iconName: string) => {
    const iconProps = { className: 'advantages__card-icon' };
    switch (iconName) {
      case 'Code': return <Code {...iconProps} />;
      case 'CheckCircle': return <CheckCircle {...iconProps} />;
      case 'Clock': return <Clock {...iconProps} />;
      case 'Layout': return <Layout {...iconProps} />;
      case 'Zap': return <Zap {...iconProps} />;
      case 'Target': return <Target {...iconProps} />;
      default: return null;
    }
  };

  const advantages: Advantage[] = [
    {
      title: "Tech moderne & scalable",
      description: "Solutions robustes construites avec les technologies les plus adaptées à votre contexte",
      icon: 'Code',
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Qualité & maintenabilité",
      description: "Code propre, testé et documenté pour une pérennité de vos investissements",
      icon: 'CheckCircle',
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Agilité & transparence",
      description: "Méthodologie de développement itérative avec communication régulière",
      icon: 'Clock',
      gradient: "from-pink-500 to-rose-500"
    },
    {
      title: "UX/UI orienté résultats",
      description: "Interfaces intuitives conçues pour maximiser la conversion et optimiser l'expérience utilisateur",
      icon: 'Layout',
      gradient: "from-rose-500 to-orange-500"
    },
    {
      title: "Performance optimisée",
      description: "Applications rapides et réactives pour une utilisation fluide sur tous les appareils",
      icon: 'Zap',
      gradient: "from-orange-500 to-amber-500"
    },
    {
      title: "Vision business",
      description: "Compréhension approfondie des enjeux métier pour des solutions adaptées à vos objectifs",
      icon: 'Target',
      gradient: "from-amber-500 to-yellow-500"
    }
  ];

  return (
    <section className="advantages">
      <div className="advantages__overlay"></div>
      <div className="advantages__container">
        <div className="advantages__header">
          <h2 className="advantages__title">
            Des solutions techniques<br />
            <span className="advantages__title-accent">
              au service de votre business
            </span>
          </h2>
          <p className="advantages__description">
            Mon approche technique est toujours guidée par la création de valeur tangible pour votre activité.
          </p>
        </div>

        <div className="advantages__grid">
          {advantages.map((advantage, index) => (
            <div key={index} className="advantages__card">
              <div className="advantages__card-overlay" data-gradient={advantage.gradient}></div>
              <div className="advantages__card-content">
                <div className="advantages__card-icon-wrapper" data-gradient={advantage.gradient}>
                  {renderIcon(advantage.icon)}
                </div>
                <h3 className="advantages__card-title">{advantage.title}</h3>
                <p className="advantages__card-description">{advantage.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdvantageSection;