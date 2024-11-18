import { useState, useEffect, useCallback } from 'react';
import { Position, Direction } from '../types';

const BOARD_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

const useGameLogic = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('UP');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [lastDirection, setLastDirection] = useState<Direction>('UP');

  const wrapPosition = (pos: number): number => {
    if (pos < 0) return BOARD_SIZE - 1;
    if (pos >= BOARD_SIZE) return 0;
    return pos;
  };

  const generateFood = useCallback(() => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (
      snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y)
    );
    setFood(newFood);
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    const head = snake[0];
    let newHead: Position;

    // Prevent 180-degree turns
    const actualDirection = (() => {
      const opposites = {
        UP: 'DOWN',
        DOWN: 'UP',
        LEFT: 'RIGHT',
        RIGHT: 'LEFT'
      };
      if (opposites[direction] === lastDirection) {
        return lastDirection;
      }
      setLastDirection(direction);
      return direction;
    })();

    switch (actualDirection) {
      case 'UP':
        newHead = { x: head.x, y: wrapPosition(head.y - 1) };
        break;
      case 'DOWN':
        newHead = { x: head.x, y: wrapPosition(head.y + 1) };
        break;
      case 'LEFT':
        newHead = { x: wrapPosition(head.x - 1), y: head.y };
        break;
      case 'RIGHT':
        newHead = { x: wrapPosition(head.x + 1), y: head.y };
        break;
    }

    if (snake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
      if (lives > 1) {
        setLives((prev) => prev - 1);
        setSnake(INITIAL_SNAKE);
        setDirection('UP');
        setLastDirection('UP');
        return;
      } else {
        setGameOver(true);
        if (score > highScore) {
          setHighScore(score);
        }
        return;
      }
    }

    const newSnake = [newHead, ...snake];

    if (newHead.x === food.x && newHead.y === food.y) {
      setScore((prev) => {
        const newScore = prev + 1;
        if (newScore % 5 === 0) {
          setLevel((prevLevel) => {
            if (prevLevel % 3 === 0) {
              setLives((prevLives) => Math.min(prevLives + 1, 5));
            }
            return prevLevel + 1;
          });
        }
        return newScore;
      });
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, food, gameOver, isPaused, lives, score, highScore, generateFood, lastDirection]);

  useEffect(() => {
    const interval = setInterval(moveSnake, Math.max(50, 300 - level * 30));
    return () => clearInterval(interval);
  }, [moveSnake, level]);

  const startGame = () => {
    setGameOver(false);
    setIsPaused(false);
  };

  const pauseGame = () => {
    setIsPaused((prev) => !prev);
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection('UP');
    setLastDirection('UP');
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setLives(3);
    setIsPaused(false);
    generateFood();
  };

  return {
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
    resetGame,
  };
};

export default useGameLogic;