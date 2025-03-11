import React from 'react';
import { ArrowRight, Zap, Code, Server, Terminal } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = (): JSX.Element => {
  return (
    <section className="hero">
      <div className="hero__overlay"></div>
      <div className="hero__pattern"></div>

      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__left">
            <div className="hero__badge">
              <Zap className="hero__badge-icon" />
              <span>Développeur & Consultant</span>
            </div>

            <h1 className="hero__title">
              <span className="hero__greeting">
                <span className="hero__greeting-accent">Hello</span>, je suis Tanguy
              </span>
              <span className="hero__tagline">
                Je code des <span className="hero__tagline-accent">solutions pratiques</span> pour des <span className="hero__tagline-accent">problèmes concrets</span>
              </span>
            </h1>

            <p className="hero__description">
              Développeur passionné, je conçois des applications web qui simplifient le quotidien et automatisent les processus répétitifs. Approche pragmatique, code propre, résultats concrets.
            </p>

            <div className="hero__skills">
              <div className="hero__skill">
                <Code size={16} />
                <span>Front-end</span>
              </div>
              <div className="hero__skill">
                <Server size={16} />
                <span>Back-end</span>
              </div>
              <div className="hero__skill">
                <Terminal size={16} />
                <span>DevOps</span>
              </div>
            </div>

            <div className="hero__actions">
              <Link href="#contact" className="hero__button hero__button--primary">
                Discutons de votre problème
                <ArrowRight size={18} />
              </Link>
              <Link href="#portfolio" className="hero__button hero__button--secondary">
                Voir mes réalisations
              </Link>
            </div>
          </div>
          
          <div className="hero__right">
            <div className="hero__image-container">
              <div className="hero__image-backdrop"></div>
              <Image
                src="/images/tg-linkedin.webp" 
                alt="Tanguy Gibrat"
                width={400}
                height={500}
                className="hero__image"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;