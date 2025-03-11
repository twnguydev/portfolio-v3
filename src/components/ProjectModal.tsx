import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, ExternalLink, Code } from 'lucide-react';

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
  },
  skills: Skill[]
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ImageCarousel: React.FC<{ images: string[]; title: string }> = ({ images, title }): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="project-modal__carousel">
      <div className="project-modal__carousel-container">
        {images.map((image, index) => (
          <div
            key={index}
            className="project-modal__carousel-slide"
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
              opacity: index === currentIndex ? 1 : 0
            }}
          >
            <Image
              src={image}
              alt={`${title} - Image ${index + 1}`}
              className="project-modal__carousel-image"
              layout="fill"
              objectFit="contain"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="project-modal__carousel-button project-modal__carousel-button--prev"
            aria-label="Image précédente"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={goToNext}
            className="project-modal__carousel-button project-modal__carousel-button--next"
            aria-label="Image suivante"
          >
            <ChevronRight />
          </button>

          <div className="project-modal__carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`project-modal__carousel-dot ${index === currentIndex ? 'project-modal__carousel-dot--active' : ''
                  }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const groupedSkills = project.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getTag = (tag: string): string => {
    return tag.toLowerCase().replace(' ', '-');
  };

  const handleOutsideClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <div className="project-modal" onClick={handleOutsideClick}>
      <div className="project-modal__content">
        <button
          onClick={onClose}
          className="project-modal__close"
          aria-label="Fermer"
        >
          <X />
        </button>

        <ImageCarousel images={project.images} title={project.title} />

        <div className="project-modal__info">
          <h3 className="project-modal__title">{project.title}</h3>
          <p className="project-modal__description">{project.description}</p>

          <div className="project-modal__tags">
            {project.tags.map((tag, index) => (
              <span
                key={index}
                className={`project-modal__tag project-modal__tag--${getTag(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="project-modal__actions">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal__button project-modal__button--demo"
              >
                <ExternalLink size={18} />
                Démo
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal__button project-modal__button--source"
              >
                <Code size={18} />
                Code source
              </a>
            )}
          </div>
        </div>

        <div className="project-modal__skills">
          <h3 className="project-modal__skills-title">Compétences acquises</h3>

          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div key={category} className="project-modal__skills-category">
              <h4 className="project-modal__skills-category-title">{category}</h4>
              <div className="project-modal__skills-list">
                {skills.map((skill, index) => (
                  <div key={index} className="project-modal__skill">
                    <h5 className="project-modal__skill-title">{skill.name}</h5>
                    <p className="project-modal__skill-description">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}