import { Project, Skill } from "@/interfaces/project";
import { RNCPSkill, rncpSkills, getBlocTitle } from "@/data/rncp-skills";

export interface SkillProgress {
  skill: RNCPSkill;
  projects: Project[];
  progress: number;
  status: 'completed' | 'not-started';
}

export interface SkillBlocProgress {
  blocId: string;
  title: string;
  skills: SkillProgress[];
  overallProgress: number;
}

export const checkSkillsProgress = (projects: Project[]): SkillProgress[] => {
  return rncpSkills.map(skill => {
    const projectsWithSkill = projects.filter(project => 
      project.skills && project.skills.some((projectSkill: Skill) => 
        Array.isArray(projectSkill.rncpSkillIds) 
          ? projectSkill.rncpSkillIds.includes(skill.id)
          : projectSkill.rncpSkillIds === skill.id
      )
    );

    const progress = projectsWithSkill.length > 0 ? 100 : 0;
    const status = progress === 100 ? 'completed' : 'not-started';
    
    return {
      skill,
      projects: projectsWithSkill,
      progress,
      status
    };
  });
};

export const getSkillsProgressByBloc = (skillsProgress: SkillProgress[]): SkillBlocProgress[] => {
  const uniqueBlocs = [...new Set(rncpSkills.map(skill => skill.bloc))];
  
  return uniqueBlocs.map(blocId => {
    const blocSkills = skillsProgress.filter(item => item.skill.bloc === blocId);

    const completedSkills: SkillProgress[] = blocSkills.filter(item => item.progress === 100);
    const overallProgress = blocSkills.length > 0 
      ? (completedSkills.length / blocSkills.length) * 100
      : 0;
    
    return {
      blocId,
      title: getBlocTitle(blocId),
      skills: blocSkills,
      overallProgress
    };
  });
};

export const analyzeSkillsCoverage = (projects: Project[]) => {
  const skillsProgress: SkillProgress[] = checkSkillsProgress(projects);
  
  const coveredSkills: SkillProgress[] = skillsProgress.filter(item => item.progress === 100);
  const uncoveredSkills: SkillProgress[] = skillsProgress.filter(item => item.progress === 0);
  
  const coveragePercentage = (coveredSkills.length / rncpSkills.length) * 100;
  
  return {
    totalSkills: rncpSkills.length,
    coveredSkills: coveredSkills.length,
    uncoveredSkills: uncoveredSkills.length,
    coveragePercentage,
    skillsProgress,
    skillsByBloc: getSkillsProgressByBloc(skillsProgress)
  };
};