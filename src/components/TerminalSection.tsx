import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Code, Mail, ExternalLink, Check, Terminal as TerminalIcon } from 'lucide-react';
import SnakeGame from './SnakeGame';

const TerminalSection = (): JSX.Element => {
  const [showCopyConfirmation, setShowCopyConfirmation] = useState<string | null>(null);
  const terminalContentRef = useRef<HTMLDivElement>(null);
  const [commandOutput, setCommandOutput] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [showSnake, setShowSnake] = useState<boolean>(false);
  const [inputHistory] = useState<string[]>([
    'help',
    'whoami',
    'skills',
    'projects',
    'contact',
    'snake'
  ]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [gameScore, setGameScore] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSnakeActive, setIsSnakeActive] = useState<boolean>(false);
  const [shouldScroll, setShouldScroll] = useState<boolean>(false);

  const GITHUB_URL = 'https://github.com/twnguydev/twnguydev';
  const EMAIL = 'hello@tanguygibrat.fr';
  const CLONE_COMMAND = `git clone ${GITHUB_URL}.git`;

  const commands = useMemo(() => [
    {
      command: 'help',
      description: 'Affiche la liste des commandes disponibles',
      output: [
        '🚀 Commandes disponibles:',
        '   whoami    - À propos de Tanguy',
        '   skills    - Mes compétences techniques',
        '   projects  - Voir mes projets récents',
        '   contact   - Comment me contacter',
        '   snake     - Jouer au jeu Snake',
        '   clear     - Nettoyer le terminal',
        '',
        'Astuce: Utilisez les flèches haut/bas pour naviguer dans l\'historique'
      ]
    },
    {
      command: 'whoami',
      description: 'Informations personnelles',
      output: [
        '👨‍💻 Tanguy Gibrat',
        '   Développeur Web Full-Stack & Consultant',
        '   Étudiant à la Web@cadémie by Epitech',
        '   Passion pour l\'automatisation et les solutions SaaS',
        '',
        '🎯 Objectif: Développer des applications qui résolvent des problèmes concrets'
      ]
    },
    {
      command: 'skills',
      description: 'Compétences techniques',
      output: [
        '💻 Compétences techniques:',
        '   Frontend: React, Next.js, Angular, TypeScript',
        '   Backend: Laravel, Spring Boot, Node.js',
        '   DevOps: Docker, CI/CD, Déploiement',
        '   Autres: IA Générative, Automatisation'
      ]
    },
    {
      command: 'projects',
      description: 'Projets récents',
      output: [
        '🛠️ Projets récents:',
        '   - Modernisation complète d\'un ERP (Laravel/Angular)',
        '   - SaaS d\'optimisation de workflows (Next.js)',
        '   - Solutions d\'éditique pour le secteur santé (C#)',
        '   - Appli de gestion universitaire (React) - Lauréat Hackathon',
        '',
        'Tapez `projects --details` pour plus d\'informations'
      ]
    },
    {
      command: 'projects --details',
      description: 'Détails des projets',
      output: [
        '📂 Modernisation ERP:',
        '   - Migration d\'architecture monolithique vers API/Frontend',
        '   - Mise en place Docker et CI/CD',
        '   - Amélioration UX et performances',
        '',
        '📂 Twool Labs Workflow Optimizer:',
        '   - Plateforme de simulation et optimisation de processus',
        '   - Stack Next.js, TypeScript, Node.js, PostgreSQL',
        '',
        '📂 UniTeam (Hackathon - 1er prix):',
        '   - Plateforme de gestion de salles universitaires',
        '   - React, TypeScript, FastAPI, Supabase',
        '',
        '📂 IA 4 Good (Hackathon - 1er prix):',
        '   - Tableau de bord de suivi et de prédiction de l\'activité polluante du port Marseille-Fos',
        '   - React, TypeScript, Ollama, GPT-4o',
      ]
    },
    {
      command: 'contact',
      description: 'Informations de contact',
      output: [
        '📫 Contact:',
        '   Email: hello@tanguygibrat.fr',
        '   GitHub: github.com/twnguydev',
        '   LinkedIn: linkedin.com/in/tanguy-gibrat',
        '',
        'Utilisez le formulaire de contact pour discuter de votre projet!'
      ]
    },
    {
      command: 'snake',
      description: 'Jouer au jeu Snake',
      output: [
        '🐍 Lancement du jeu Snake...',
        'Chargement du jeu, veuillez patienter...',
        'Utilisez les flèches pour contrôler le serpent. Appuyez sur ESC pour quitter.'
      ]
    }
  ], []);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyConfirmation(type);
      setTimeout(() => setShowCopyConfirmation(null), 2000);
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
    }
  };

  const handleOpenGitHub = () => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
  };

  const scrollToBottom = useCallback(() => {
    if (!shouldScroll) return;
    
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  }, [shouldScroll]);

  useEffect(() => {
    if (shouldScroll) {
      scrollToBottom();
      setShouldScroll(false);
    }
  }, [shouldScroll, scrollToBottom]);

  const handleCommand = useCallback((cmd: string) => {
    if (cmd.trim() === '') return;
    
    setCommandOutput(prev => [...prev, `$ ${cmd}`]);
    setShouldScroll(true);
    
    if (cmd === 'clear') {
      setCommandOutput([]);
      return;
    }
    
    if (cmd === 'snake') {
      const snakeCommand = commands.find(c => c.command === 'snake');
      if (snakeCommand) {
        setCommandOutput(prev => [...prev, ...snakeCommand.output]);
        setTimeout(() => {
          setShowSnake(true);
          setIsSnakeActive(true);
        }, 500);
      }
      return;
    }
    
    const foundCommand = commands.find(c => c.command === cmd.trim());
    
    if (foundCommand) {
      setCommandOutput(prev => [...prev, ...foundCommand.output]);
    } else {
      setCommandOutput(prev => [...prev, `Commande non reconnue: ${cmd}`, 'Tapez "help" pour voir les commandes disponibles']);
    }
  }, [commands]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isSnakeActive) return;
    
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = inputValue.trim();
      handleCommand(cmd);
      setInputValue('');
      setHistoryIndex(-1);
      setShouldScroll(true);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.min(historyIndex + 1, inputHistory.length - 1);
      if (newIndex >= 0 && newIndex < inputHistory.length) {
        setInputValue(inputHistory[newIndex]);
        setHistoryIndex(newIndex);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.max(historyIndex - 1, -1);
      if (newIndex >= 0) {
        setInputValue(inputHistory[newIndex]);
      } else {
        setInputValue('');
      }
      setHistoryIndex(newIndex);
    }
  }, [handleCommand, historyIndex, inputHistory, inputValue, isSnakeActive]);

  const handleSnakeGameOver = useCallback((score: number) => {
    setGameScore(score);
    setShouldScroll(true);
  }, []);

  const handleSnakeExit = useCallback(() => {
    setShowSnake(false);
    setIsSnakeActive(false);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (gameScore !== null) {
      setCommandOutput(prev => [...prev, `🎮 Jeu terminé! Score: ${gameScore}`]);
      setShouldScroll(true);
      setGameScore(null);
    }
  }, [gameScore]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current && !isSnakeActive) {
        inputRef.current.focus();
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isSnakeActive]);

  return (
    <section className="terminal-section">
      <div className="terminal-section__overlay"></div>
      <div className="terminal-section__container">
        <div className="terminal-section__header">
          <div className="terminal-section__badge">
            <TerminalIcon className="w-4 h-4" />
            <span>Mode développeur</span>
          </div>
          <h2 className="terminal-section__title">
            Explorez mon profil<br />
            <span className="terminal-section__title-accent">en ligne de commande</span>
          </h2>
          <p className="terminal-section__description">
            Pour les développeurs et les curieux, interagissez directement avec mon portfolio en mode terminal.
          </p>
        </div>

        <div className="terminal">
          <div className="terminal__window">
            <div className="terminal__header">
              <div className="terminal__buttons">
                <div className="terminal__button terminal__button--red" />
                <div className="terminal__button terminal__button--yellow" />
                <div className="terminal__button terminal__button--green" />
              </div>
              <div className="terminal__title">tanguy@portfolio:~$</div>
            </div>

            <div 
              className={`terminal__content ${isSnakeActive ? 'terminal__content--game-active' : ''}`} 
              ref={terminalContentRef}
            >
              <div className="terminal__welcome">
                <div className="terminal__ascii-art">
{`  _______                            
 |__   __|                           
    | | __ _ _ __   __ _ _   _ _   _ 
    | |/ _\` | '_ \\ / _\` | | | | | | |
    | | (_| | | | | (_| | |_| | |_| |
    |_|\\__,_|_| |_|\\__, |\\__,_|\\__, |
                    __/ |       __/ |
                   |___/       |___/ `}
                </div>
                <div className="terminal__welcome-text">
                  Bienvenue dans mon portfolio en ligne de commande! Tapez <span className="terminal__highlight">help</span> pour commencer.
                </div>
              </div>
              
              <div className="terminal__lines">
                {commandOutput.map((line, index) => (
                  <div key={index} className={`terminal__line ${line.startsWith('$') ? 'terminal__line--command' : ''}`}>
                    {line.startsWith('$') ? (
                      <>
                        <span className="terminal__prompt">$</span>
                        <span className="terminal__command">{line.substring(2)}</span>
                      </>
                    ) : (
                      <span className={line.startsWith('   ') ? 'terminal__output--indented' : 'terminal__output'}>
                        {line}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {showSnake && (
                <div className="terminal__modal-overlay">
                  <SnakeGame
                    onGameOver={handleSnakeGameOver}
                    onExit={handleSnakeExit}
                  />
                </div>
              )}
              
              {!isSnakeActive && (
                <div className="terminal__input-line">
                  <span className="terminal__prompt">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    className="terminal__input"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    spellCheck={false}
                    placeholder={'Tapez une commande...'}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="terminal__actions">
            <button
              className="terminal__action"
              onClick={() => copyToClipboard(CLONE_COMMAND, 'command')}
              title="Copier la commande git clone"
              disabled={isSnakeActive}
            >
              {showCopyConfirmation === 'command' ? (
                <>
                  <Check className="terminal__action-icon text-green-400" />
                  <span>Commande copiée !</span>
                </>
              ) : (
                <>
                  <Code className="terminal__action-icon" />
                  <span>Copier le git clone</span>
                </>
              )}
            </button>

            <button
              className="terminal__action"
              onClick={() => copyToClipboard(EMAIL, 'email')}
              title="Copier l'adresse email"
              disabled={isSnakeActive}
            >
              {showCopyConfirmation === 'email' ? (
                <>
                  <Check className="terminal__action-icon text-green-400" />
                  <span>Email copié !</span>
                </>
              ) : (
                <>
                  <Mail className="terminal__action-icon" />
                  <span>Copier l'e-mail</span>
                </>
              )}
            </button>

            <button
              className="terminal__action"
              onClick={handleOpenGitHub}
              title="Voir le code source sur GitHub"
              disabled={isSnakeActive}
            >
              <ExternalLink className="terminal__action-icon" />
              <span>Voir sur GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TerminalSection;