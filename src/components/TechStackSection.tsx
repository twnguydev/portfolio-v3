import React from 'react';
import { features } from '@/data/tech-stack';

const TechStackSection = (): JSX.Element => {
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
                    <li key={itemIndex} className="tech-stack__list-item tech-stack__list-item--with-progress">
                      <div className="tech-stack__list-item-header">
                        <div 
                          className="tech-stack__list-dot"
                          data-gradient={feature.gradient}
                        ></div>
                        <span className="tech-stack__item-name">{item.name}</span>
                        <span className="tech-stack__progress-value">{item.proficiency}%</span>
                      </div>
                      <div className="tech-stack__progress-container">
                        <div 
                          className="tech-stack__progress-bar" 
                          data-gradient={feature.gradient}
                          style={{ width: `${item.proficiency}%` }}
                        ></div>
                      </div>
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