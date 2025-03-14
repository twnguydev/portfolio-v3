import Image from 'next/image';
import { Briefcase, Backpack, Clock, Trophy, Rocket, Brain } from 'lucide-react';
import { Project } from '@/interfaces/project';

export const ProjectCard = ({ project, onClick }: { project: Project, onClick: () => void }): JSX.Element => {
  const { title, shortDescription, images, tags, badges, type } = project;

  return (
    <div
      onClick={onClick}
      className="projects__card"
    >
      <div className="projects__card-content">
        <Image
          src={images[0]}
          alt={title}
          className="projects__image"
          width={480}
          height={270}
          quality={75}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJc8Zps7QAAAABJRU5ErkJggg=="
          loading="lazy"
        />
        <div className="projects__blur-overlay"></div>
        <div className="projects__gradient-overlay"></div>
        <div className="projects__theme-overlay"></div>

        {badges && (
          <div className="projects__badges">
            {type === 'professional' ? (
              <span className="projects__badge projects__badge--professional">
                <Briefcase className="projects__badge-icon" size={14} />
                Pro
              </span>
            ) : (
              <span className="projects__badge projects__badge--school">
                <Backpack className="projects__badge-icon" size={14} />
                École
              </span>
            )}
            
            {badges.inProgress && (
              <span className="projects__badge projects__badge--in-progress">
                <Clock className="projects__badge-icon" size={14} />
                En cours
              </span>
            )}
            {badges.winner && (
              <span className="projects__badge projects__badge--winner">
                <Trophy className="projects__badge-icon" size={14} />
                Lauréat
              </span>
            )}
            {badges.hackathon && (
              <span className="projects__badge projects__badge--hackathon">
                <Rocket className="projects__badge-icon" size={14} />
                Hackathon
              </span>
            )}
            {badges.ia && (
              <span className="projects__badge projects__badge--ia">
                <Brain className="projects__badge-icon" size={14} />
                IA
              </span>
            )}
          </div>
        )}

        <div className="projects__info">
          <h3 className="projects__info-title">{title}</h3>
          <p className="projects__info-description">{shortDescription}</p>
          <div className="projects__tags">
            {tags.slice(0, 3).map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className={`projects__tag projects__tag--${tag.toLowerCase().replace(' ', '-').replace('.', '')}`}
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="projects__tag projects__tag--more">
                +{tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};