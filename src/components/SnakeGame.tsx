import React, { useState, useEffect, useCallback, useRef } from 'react';
import { XCircle } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

interface SnakeGameProps {
  onGameOver?: (score: number) => void;
  onExit?: () => void;
}

const SnakeGame: React.FC<SnakeGameProps> = ({
  onGameOver,
  onExit
}) => {
  const width = 15;
  const height = 10;
  const speed = 200;
  
  const [snake, setSnake] = useState<Point[]>([{ x: 5, y: 5 }]);
  const [food, setFood] = useState<Point>({ x: 10, y: 5 });
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const createFood = () => {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    return { x, y };
  };

  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setSnake([{ x: 5, y: 5 }]);
    setFood(createFood());
    setDirection(Direction.RIGHT);
    setIsPaused(false);
  }, []);

  useEffect(() => {
    if (gameOver && onGameOver && gameStarted) {
      const timeout = setTimeout(() => {
        onGameOver(score);
      }, 50);
      
      return () => clearTimeout(timeout);
    }
  }, [gameOver, score, onGameOver, gameStarted]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameAreaRef.current) return;
      if (!gameAreaRef.current.contains(document.activeElement)) return;

      if (e.key === 'Enter' && !gameStarted) {
        e.preventDefault();
        startGame();
        return;
      }

      if (e.key === 'Enter' && gameOver) {
        e.preventDefault();
        startGame();
        return;
      }

      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setIsPaused(prev => !prev);
        return;
      }
      
      if (e.key === 'Escape') {
        e.preventDefault();
        if (onExit) onExit();
        return;
      }

      if (isPaused || !gameStarted || gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          if (direction !== Direction.DOWN) {
            setDirection(Direction.UP);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (direction !== Direction.LEFT) {
            setDirection(Direction.RIGHT);
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (direction !== Direction.UP) {
            setDirection(Direction.DOWN);
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (direction !== Direction.RIGHT) {
            setDirection(Direction.LEFT);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted, gameOver, direction, isPaused, onExit, startGame]);

  useEffect(() => {
    if (gameAreaRef.current && gameStarted) {
      const focusInterval = setInterval(() => {
        if (gameAreaRef.current && document.activeElement !== gameAreaRef.current) {
          gameAreaRef.current.focus();
        }
      }, 100);
      
      return () => clearInterval(focusInterval);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake(currentSnake => {
        const head = { ...currentSnake[0] };
        
        switch (direction) {
          case Direction.UP:
            head.y -= 1;
            break;
          case Direction.RIGHT:
            head.x += 1;
            break;
          case Direction.DOWN:
            head.y += 1;
            break;
          case Direction.LEFT:
            head.x -= 1;
            break;
        }

        if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
          setGameOver(true);
          clearInterval(gameLoop);
          return currentSnake;
        }

        if (currentSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          clearInterval(gameLoop);
          return currentSnake;
        }

        const newSnake = [head, ...currentSnake];

        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 1);
          setFood(createFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [food, direction, gameOver, isPaused, gameStarted, width, height, speed]);

  return (
    <div className="terminal__snake-game-wrapper">
      <div className="terminal__snake-header">
        <div className="terminal__snake-title">Snake Game</div>
        <button 
          className="terminal__snake-close"
          onClick={onExit}
          title="Fermer le jeu"
        >
          <XCircle size={16} />
        </button>
      </div>
      
      <div 
        className="terminal__snake-game" 
        ref={gameAreaRef} 
        tabIndex={0}
        data-active={gameStarted ? "true" : "false"}
      >
        {!gameStarted ? (
          <div className="terminal__snake-start">
            <h3>🐍 SNAKE</h3>
            <p>Appuyez sur ENTER pour commencer</p>
            <p className="terminal__snake-controls">
              ↑↓←→ : Déplacer le serpent<br />
              P : Pause<br />
              ESC : Quitter
            </p>
            <button 
              onClick={startGame}
              className="terminal__snake-start-button"
            >
              Commencer le jeu
            </button>
          </div>
        ) : (
          <div className="terminal__snake-container">
            <div className="terminal__snake-info">
              <div className="terminal__snake-score">Score: {score}</div>
              {isPaused && <div className="terminal__snake-paused">PAUSE</div>}
            </div>

            <div className="terminal__snake-board">
              {Array.from({ length: height }).map((_, y) => (
                <div key={y} className="terminal__snake-row">
                  {Array.from({ length: width }).map((_, x) => {
                    const isSnakeHead = snake[0].x === x && snake[0].y === y;
                    const isSnakeBody = snake.slice(1).some(segment => segment.x === x && segment.y === y);
                    const isFood = food.x === x && food.y === y;
                    
                    let cellContent = '·';
                    let cellClass = 'terminal__snake-cell';
                    
                    if (isSnakeHead) {
                      cellContent = '@';
                      cellClass += ' terminal__snake-head';
                    } else if (isSnakeBody) {
                      cellContent = 'O';
                      cellClass += ' terminal__snake-body';
                    } else if (isFood) {
                      cellContent = '*';
                      cellClass += ' terminal__snake-food';
                    }
                    
                    return (
                      <span 
                        key={x}
                        className={cellClass}
                      >
                        {cellContent}
                      </span>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="terminal__snake-touch-controls">
              <button onClick={() => direction !== Direction.DOWN && setDirection(Direction.UP)}>↑</button>
              <div className="terminal__snake-touch-controls-row">
                <button onClick={() => direction !== Direction.RIGHT && setDirection(Direction.LEFT)}>←</button>
                <button onClick={() => direction !== Direction.LEFT && setDirection(Direction.RIGHT)}>→</button>
              </div>
              <button onClick={() => direction !== Direction.UP && setDirection(Direction.DOWN)}>↓</button>
            </div>

            {gameOver && (
              <div className="terminal__snake-game-over">
                <h3>Game Over!</h3>
                <p>Score: {score}</p>
                <p>Appuyez sur ENTER pour recommencer</p>
                <button onClick={startGame} className="terminal__snake-restart-button">
                  Recommencer
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SnakeGame;