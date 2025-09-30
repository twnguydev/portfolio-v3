import React, { useEffect, useState, useCallback, useMemo, Suspense, lazy } from 'react';
import { Backpack, Briefcase, Award } from 'lucide-react';
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [showProject, setShowProject] = useState<Project | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'professional' | 'school'>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSkillsModal, setShowSkillsModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour charger les projets depuis l'API
  const loadProjects = useCallback(async () => {
    try {
      setIsLoading(true);

      // Tenter d'utiliser l'import direct d'abord - c'est la solution la plus simple
      try {
        const projectsModule = await import('@/data/projects');
        setProjects(projectsModule.projectsData);
        setError(null);
        return;
      } catch (importErr) {
        console.log('Import direct échoué, tentative avec l\'API...', importErr);
      }

      // Option 1: Utiliser l'API pour obtenir le contenu brut
      const response = await fetch('/api/projects');
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des projets');
      }

      const data = await response.json();

      if (data.projectsContent) {
        // Si nous avons le contenu brut, importer directement le module getDescriptionById
        // et évaluer le contenu avec ce module
        try {
          // Import dynamique du module rncp-skills pour obtenir getDescriptionById
          const rncpModule = await import('@/data/rncp-skills');
          const getDescriptionById = rncpModule.getDescriptionById;

          // Utiliser Function constructor mais avec getDescriptionById dans le scope
          const evalCode = `
          const getDescriptionById = this.getDescriptionById;
          return [${data.projectsContent}];
        `;

          const evalContext = { getDescriptionById };
          const evalFunction = new Function('return ' + evalCode).bind(evalContext);
          const parsedProjects = evalFunction();

          setProjects(parsedProjects);
          setError(null);
        } catch (evalErr) {
          console.error('Erreur lors de l\'évaluation du contenu des projets:', evalErr);
          throw evalErr;
        }
      } else if (Array.isArray(data)) {
        // Si l'API a déjà retourné un tableau (ancienne version de l'API)
        setProjects(data);
        setError(null);
      } else {
        throw new Error('Format de réponse API invalide');
      }
    } catch (err) {
      console.error('Erreur de chargement des projets:', err);

      // Fallback en cas d'erreur - essayer une dernière fois l'import direct
      try {
        console.log('Fallback après erreur: dernière tentative d\'import direct');
        const projectsModule = await import('@/data/projects');
        setProjects(projectsModule.projectsData);
        setError(null);
      } catch (importErr) {
        console.error('Toutes les tentatives de chargement ont échoué:', importErr);
        setError('Impossible de charger les projets. Veuillez rafraîchir la page.');
      }
    } finally {
      // Délai pour éviter le flash de contenu
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, []);

  useEffect(() => {
    loadProjects();

    // Rafraîchir les projets toutes les 60 secondes en développement
    // Cela permet de voir les nouveaux projets sans avoir à rafraîchir manuellement
    let intervalId: NodeJS.Timeout;
    if (process.env.NODE_ENV === 'development') {
      intervalId = setInterval(loadProjects, 60000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [loadProjects]);

  const allTags: string[] = useMemo(() =>
    [...new Set(projects.flatMap(project => project.tags ?? []))].sort(),
    [projects]);

  const filteredProjects: Project[] = useMemo((): Project[] => {
    let filtered: Project[] = projects;

    if (selectedType !== 'all') {
      filtered = filtered.filter(project => project.type === selectedType);
    }

    if (selectedTag) {
      filtered = filtered.filter(project => project.tags?.includes(selectedTag));
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
    const preloadImages = () => {
      projects.forEach(project => {
        if (project.images && project.images.length > 0) {
          const img = new window.Image();
          img.src = project.images[0];
        }
      });
    };
    if (projects.length > 0) {
      preloadImages();
    }
  }, [projects]);

  // Bouton de rechargement manuel
  const handleManualRefresh = useCallback(() => {
    loadProjects();
  }, [loadProjects]);

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

          {/* Bouton de rechargement manuel (visible uniquement en développement) */}
          {process.env.NODE_ENV === 'development' && (
            <button
              onClick={handleManualRefresh}
              className="projects__refresh-button"
              title="Rafraîchir les projets"
            >
              🔄 Rafraîchir
            </button>
          )}
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
        ) : error ? (
          <div className="projects__error">
            <p>{error}</p>
            <button onClick={handleManualRefresh}>Réessayer</button>
          </div>
        ) : (
          <>
            {filteredProjects.length === 0 ? (
              <div className="projects__no-results">
                <p>Aucun projet ne correspond aux critères sélectionnés.</p>
                {projects.length === 0 && (
                  <button onClick={handleManualRefresh} className="projects__retry-button">
                    Charger les projets
                  </button>
                )}
              </div>
            ) : (
              <div className="projects__grid">
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={`${project.title}-${index}`}
                    project={project}
                    onClick={() => selectProject(project)}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* Afficher un décompte des projets en bas de page */}
        {!isLoading && !error && (
          <div className="projects__count">
            {filteredProjects.length} projet{filteredProjects.length !== 1 ? 's' : ''}
            {selectedTag && ` avec "${selectedTag}"`}
            {selectedType !== 'all' && ` de type "${selectedType === 'professional' ? 'professionnel' : 'école'}"`}
          </div>
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