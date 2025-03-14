import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { Skill } from '../../interfaces/project';

export const SkillTooltip = ({ skill }: { skill: Skill }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  if (!skill.rncpReference) return null;

  return (
    <div className="project-modal__skill-tooltip-container">
      <button
        className="project-modal__skill-tooltip-trigger"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(prev => !prev)}
        aria-label="Voir la référence RNCP"
      >
        <Info size={16} />
      </button>
      {showTooltip && (
        <div className="project-modal__skill-tooltip">
          <p>{skill.rncpReference}</p>
        </div>
      )}
    </div>
  );
};