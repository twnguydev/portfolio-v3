import React, { useEffect, useState, useCallback, useMemo, Suspense, lazy } from 'react';
import { Backpack, Briefcase, Award } from 'lucide-react';
import { projectsData } from '@/data/projects';
import { Project } from '@/interfaces/project';
import { ProjectCard } from '@/components/projects/project-card';

const ProjectModal = lazy(() => import('./project-modal').then(mod => ({ default: mod.ProjectModal })));
const SkillsProgressModal = lazy(() => import('./skills-progress-modal'));

const Loader = (): JSX.Element => (
  <div className="projects__loader">
    <div className="projects__loader-spinner"></div>
    <p>Chargement des projets...</p>
  </div>
);

const ProjectSection = (): JSX.Element => {
  const [showProject, setShowProject] = useState<Project | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'professional' | 'school'>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSkillsModal, setShowSkillsModal] = useState<boolean>(false);

  const projects: Project[] = useMemo((): Project[] => projectsData, []);

  const allTags: string[] = useMemo(() =>
    [...new Set(projects.flatMap(project => project.tags))].sort(),
    [projects]);

  const filteredProjects: Project[] = useMemo((): Project[] => {
    let filtered: Project[] = projects;

    if (selectedType !== 'all') {
      filtered = filtered.filter(project => project.type === selectedType);
    }

    if (selectedTag) {
      filtered = filtered.filter(project => project.tags.includes(selectedTag));
    }
    
    return filtered;
  }, [projects, selectedTag, selectedType]);

  // Projets d'école uniquement pour l'analyse des compétences
  const schoolProjects = useMemo(() => 
    projects.filter(project => project.type === 'school'),
    [projects]
  );

  const selectProject = useCallback((project: Project) => {
    setShowProject(project);
  }, []);

  const closeModal = useCallback(() => {
    setShowProject(null);
  }, []);

  const handleTagFilter = useCallback((tag: string | null) => {
    setSelectedTag(tag);
  }, []);

  const handleTypeFilter = useCallback((type: 'all' | 'professional' | 'school') => {
    setSelectedType(type);
  }, []);

  const openSkillsModal = useCallback(() => {
    setShowSkillsModal(true);
  }, []);

  const closeSkillsModal = useCallback(() => {
    setShowSkillsModal(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const preloadImages = () => {
      projects.forEach(project => {
        const img = new window.Image();
        img.src = project.images[0];
      });
    };
    preloadImages();
  }, [projects]);

  return (
    <section className="projects" id="portfolio">
      <div className="projects__overlay"></div>
      <div className="projects__container">
        <div className="projects__header">
          <h2 className="projects__title">
            Des projets concrets qui<br />
            <span>répondent à des besoins réels</span>
          </h2>
          <p className="projects__description">
            Un aperçu de mes réalisations professionnelles et personnelles, alliant technique et valeur business.
          </p>
        </div>

        <div className="projects__type-filters">
          <button
            className={`projects__type-filter ${selectedType === 'all' ? 'active' : ''}`}
            onClick={() => handleTypeFilter('all')}
          >
            Tous les projets
          </button>
          <button
            className={`projects__type-filter ${selectedType === 'professional' ? 'active' : ''}`}
            onClick={() => handleTypeFilter('professional')}
          >
            <Briefcase size={16} />
            Projets professionnels
          </button>
          <button
            className={`projects__type-filter ${selectedType === 'school' ? 'active' : ''}`}
            onClick={() => handleTypeFilter('school')}
          >
            <Backpack size={16} />
            Projets d'école
          </button>
        </div>

        {/* Bouton pour afficher la progression des compétences (visible uniquement quand "Projets d'école" est sélectionné) */}
        {selectedType === 'school' && (
          <div className="projects__rncp-button-container">
            <button 
              className="projects__rncp-button"
              onClick={openSkillsModal}
            >
              <Award size={18} />
              Voir ma progression RNCP
            </button>
          </div>
        )}

        <div className="projects__filters">
          <button
            className={`projects__filter ${!selectedTag ? 'active' : ''}`}
            onClick={() => handleTagFilter(null)}
          >
            Tous
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`projects__filter ${selectedTag === tag ? 'active' : ''}`}
              onClick={() => handleTagFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {filteredProjects.length === 0 ? (
              <div className="projects__no-results">
                <p>Aucun projet ne correspond aux critères sélectionnés.</p>
              </div>
            ) : (
              <div className="projects__grid">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title + index}
                    project={project}
                    onClick={() => selectProject(project)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showProject && (
        <Suspense fallback={<div className="modal-loading">Chargement...</div>}>
          <ProjectModal
            project={showProject}
            onClose={closeModal}
          />
        </Suspense>
      )}

      {showSkillsModal && (
        <Suspense fallback={<div className="modal-loading">Chargement...</div>}>
          <SkillsProgressModal
            projects={schoolProjects}
            onClose={closeSkillsModal}
          />
        </Suspense>
      )}
    </section>
  );
};

export default ProjectSection;