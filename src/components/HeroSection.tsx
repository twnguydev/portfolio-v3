import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const HeroSection = (): JSX.Element => {
  return (
    <section className="hero">
      <div className="hero__overlay"></div>
      <div className="hero__pattern"></div>
      <div className="hero__bottom-fade"></div>

      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__badge">
            <Zap className="w-4 h-4" />
            Étudiant Développeur & Consultant en alternance
          </div>

          <h1 className="hero__title">
            <span className="hero__title-main">
              <span className="hero__title-main-colored">Hello</span>,{' '}
              je suis Tanguy
            </span> 👋🏻
            <br />
            <span className="hero__title-sub">
              Je code des <span className="hero__title-sub-colored">solutions pratiques</span>{' '}
              pour des problèmes concrets
            </span>
          </h1>

          <p className="hero__description">
            Étudiant à la Web@cadémie by Epitech et développeur en alternance, j'allie ma passion 
            pour le code à une approche pragmatique. J'aime créer des applications web qui simplifient 
            le quotidien et automatiser les processus répétitifs.
          </p>

          <div className="hero__buttons">
            <a href="#contact" className="hero__btn-primary">
              Discutons de votre projet
              <ArrowRight className="w-5 h-5 relative z-10" />
            </a>
            <a href="#portfolio" className="hero__btn-secondary">
              Découvrir mes projets
            </a>
          </div>
          
          <div className="hero__footnote">
            <ArrowRight className="w-5 h-5 relative z-10" style={{ marginRight: '0.5rem' }} />
            <span>Actuellement en alternance et disponible pour des projets</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;