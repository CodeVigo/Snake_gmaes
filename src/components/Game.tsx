import React, { useCallback } from 'react';
import { Trophy, Heart, Gamepad2 } from 'lucide-react';
import useGameLogic from '../hooks/useGameLogic';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
import TouchControls from './TouchControls';

const Game = () => {
  const {
    snake,
    food,
    direction,
    gameOver,
    score,
    level,
    highScore,
    lives,
    isPaused,
    setDirection,
    startGame,
    pauseGame,
    resetGame
  } = useGameLogic();

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        setDirection('UP');
        break;
      case 'ArrowDown':
        setDirection('DOWN');
        break;
      case 'ArrowLeft':
        setDirection('LEFT');
        break;
      case 'ArrowRight':
        setDirection('RIGHT');
        break;
      case ' ':
        pauseGame();
        break;
      default:
        break;
    }
  }, [setDirection, pauseGame]);

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-4xl w-full">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Gamepad2 className="w-8 h-8" />
            Snake Game
          </h1>
          <div className="flex justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span>High Score: {highScore}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span>Lives: {lives}</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_300px] gap-8">
          <div className="relative">
            <Board snake={snake} food={food} />
            
            {(gameOver || isPaused) && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {gameOver ? 'Game Over!' : 'Paused'}
                  </h2>
                  <button
                    onClick={gameOver ? resetGame : pauseGame}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    {gameOver ? 'Play Again' : 'Resume'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <ScoreBoard
            score={score}
            level={level}
            highScore={highScore}
            lives={lives}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm md:block hidden">
            Use arrow keys to move • Space to pause • Level up every 5 points
          </p>
          <p className="text-white/70 text-sm md:hidden">
            Use on-screen controls to play • Level up every 5 points
          </p>
        </div>
      </div>
      
      <TouchControls onDirectionChange={setDirection} onPause={pauseGame} />
    </div>
  );
};

export default Game;