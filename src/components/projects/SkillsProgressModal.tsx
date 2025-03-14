import React, { useEffect, useRef } from 'react';
import { X, CheckCircle, Circle } from 'lucide-react';
import { Project } from '@/interfaces/project';
import { SkillBlocProgress, analyzeSkillsCoverage } from '@/utils/skills-progress-utils';

interface SkillsProgressModalProps {
  projects: Project[];
  onClose: () => void;
}

export const SkillsProgressModal: React.FC<SkillsProgressModalProps> = ({ projects, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { coveragePercentage, skillsByBloc } = analyzeSkillsCoverage(projects);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const getStatusIcon = (progress: number) => {
    return progress === 100 
      ? <CheckCircle className="text-emerald-500" size={18} /> 
      : <Circle className="text-gray-400" size={18} />;
  };

  return (
    <div className="skills-modal__overlay">
      <div ref={modalRef} className="skills-modal">
        <div className="skills-modal__header">
          <h3 className="skills-modal__title">Progression des compétences RNCP</h3>
          <button
            onClick={onClose}
            className="project-modal__close"
            aria-label="Fermer"
          >
            <X />
          </button>
        </div>

        <div className="skills-modal__overview">
          <div className="skills-modal__progress-circle">
            <svg viewBox="0 0 120 120" className="skills-modal__progress-svg">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="12"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#skillsGradient)"
                strokeWidth="12"
                strokeDasharray="339.3"
                strokeDashoffset={339.3 - (339.3 * coveragePercentage) / 100}
                strokeLinecap="round"
                transform="rotate(-90 60 60)"
              />
              <defs>
                <linearGradient id="skillsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-purple-500)" />
                  <stop offset="100%" stopColor="var(--color-pink-500)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="skills-modal__progress-text">
              <span className="skills-modal__progress-percentage">{Math.round(coveragePercentage)}%</span>
              <span className="skills-modal__progress-label">complété</span>
            </div>
          </div>
          <div className="skills-modal__legend">
            <div className="skills-modal__legend-item">
              <CheckCircle className="text-emerald-500" size={16} />
              <span>Compétence acquise</span>
            </div>
            <div className="skills-modal__legend-item">
              <Circle className="text-gray-400" size={16} />
              <span>Non encore acquise</span>
            </div>
          </div>
        </div>

        <div className="skills-modal__content">
          {skillsByBloc.map((bloc: SkillBlocProgress) => (
            <div key={bloc.blocId} className="skills-modal__bloc">
              <div className="skills-modal__bloc-header">
                <h4 className="skills-modal__bloc-title">{bloc.title}</h4>
                <div className="skills-modal__bloc-progress">
                  <div 
                    className="skills-modal__bloc-progress-bar" 
                    style={{ width: `${bloc.overallProgress}%` }}
                  ></div>
                </div>
                <span className="skills-modal__bloc-percentage">
                  {Math.round(bloc.overallProgress)}%
                </span>
              </div>
              
              <div className="skills-modal__skills-list">
                {bloc.skills.map((skillProgress) => (
                  <div key={skillProgress.skill.id} className="skills-modal__skill-item">
                    <div className="skills-modal__skill-status">
                      {getStatusIcon(skillProgress.progress)}
                    </div>
                    <div className="skills-modal__skill-content">
                      <div className="skills-modal__skill-header">
                        <h5 className="skills-modal__skill-id">{skillProgress.skill.id}</h5>
                      </div>
                      <p className="skills-modal__skill-description">
                        {skillProgress.skill.description}
                      </p>
                      {skillProgress.projects.length > 0 && (
                        <div className="skills-modal__skill-projects">
                          <span className="skills-modal__skill-projects-label">
                            Projets associés:
                          </span>
                          <div className="skills-modal__skill-projects-list">
                            {skillProgress.projects.map((project) => (
                              <span 
                                key={project.title} 
                                className="skills-modal__skill-project-tag"
                              >
                                {project.title}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsProgressModal;