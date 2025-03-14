import React, { useCallback } from 'react';
import { X, ExternalLink, Code } from 'lucide-react';
import Link from 'next/link';
import { ImageCarousel } from '@/components/projects/image-carousel';
import { SkillTooltip } from '@/components/projects/skill-tooltip';
import { Skill, ProjectModalProps } from '@/interfaces/project';


export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }): JSX.Element => {
  const groupedSkills: Record<string, Skill[]> = project.skills.reduce((acc, skill) => {
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
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal__button project-modal__button--demo"
              >
                <ExternalLink size={18} />
                Démo
              </Link>
            )}
            {project.sourceUrl && (
              <Link
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal__button project-modal__button--source"
              >
                <Code size={18} />
                Code source
              </Link>
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
                  <div
                    key={index}
                    className="project-modal__skill"
                    data-category={category}
                  >
                    <div className="project-modal__skill-header">
                      <h5 className="project-modal__skill-title">{skill.name}</h5>
                      {project.type === 'school' && (
                        <SkillTooltip skill={skill} />
                      )}
                    </div>
                    {skill.description ? (
                      <p className="project-modal__skill-description">
                        {skill.description}
                      </p>
                    ) : skill.descriptions && skill.descriptions.length > 0 ? (
                      <ul className="project-modal__skill-descriptions-list">
                        {skill.descriptions.map((description, descIndex) => (
                          <li key={descIndex} className="project-modal__skill-description-item">
                            {description}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="project-modal__skill-description">
                        Aucune description disponible.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
};