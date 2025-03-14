export type ProjectType = 'professional' | 'school';
export type SkillCategory = 'Back-end' | 'Front-end' | 'Développement' | 'Qualité' | 'DevOps' | 'Sécurité' | 'Architecture' | 'Data' | 'Management';

export interface Skill {
  id?: string;
  name: string;
  description?: string;
  descriptions?: string[];
  category: SkillCategory;
  rncpSkillIds?: string[];
  rncpReference?: string;
}

export interface Project {
  title: string;
  shortDescription: string;
  description: string;
  images: string[];
  tags: string[];
  gradient: string;
  type: ProjectType;
  demoUrl?: string;
  sourceUrl?: string;
  badges?: BadgesProject;
  skills: Skill[];
}

export interface BadgesProject {
  inProgress?: boolean;
  winner?: boolean;
  hackathon?: boolean;
  ia?: boolean;
  professional?: boolean;
}

export interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}