import React from 'react';
import { Position } from '../types';

interface BoardProps {
  snake: Position[];
  food: Position;
}

const Board: React.FC<BoardProps> = ({ snake, food }) => {
  const boardSize = 20;
  const cells = Array(boardSize).fill(null);

  const isSnakeCell = (x: number, y: number) => {
    return snake.some((segment) => segment.x === x && segment.y === y);
  };

  const isSnakeHead = (x: number, y: number) => {
    return snake[0].x === x && snake[0].y === y;
  };

  const isFoodCell = (x: number, y: number) => {
    return food.x === x && food.y === y;
  };

  const getSnakeSegmentIndex = (x: number, y: number) => {
    return snake.findIndex((segment) => segment.x === x && segment.y === y);
  };

  const getEyePositions = () => {
    const head = snake[0];
    const neck = snake[1];
    
    let direction = 'RIGHT';
    if (head.x < neck.x || (head.x === 0 && neck.x === boardSize - 1)) direction = 'LEFT';
    else if (head.x > neck.x || (head.x === boardSize - 1 && neck.x === 0)) direction = 'RIGHT';
    else if (head.y < neck.y || (head.y === 0 && neck.y === boardSize - 1)) direction = 'UP';
    else if (head.y > neck.y || (head.y === boardSize - 1 && neck.y === 0)) direction = 'DOWN';

    return direction;
  };

  return (
    <div className="grid grid-cols-20 gap-[2px] bg-white/10 p-2 rounded-lg aspect-square">
      {cells.map((_, y) =>
        cells.map((_, x) => {
          const isSnake = isSnakeCell(x, y);
          const isHead = isSnakeHead(x, y);
          const isFood = isFoodCell(x, y);
          const segmentIndex = getSnakeSegmentIndex(x, y);
          const transitionDelay = isSnake ? `${segmentIndex * 20}ms` : '0ms';

          return (
            <div
              key={`${x}-${y}`}
              className={`
                relative aspect-square rounded-sm
                transition-all duration-100 ease-in-out
                ${isSnake ? 'bg-green-500' : ''}
                ${isHead ? 'scale-105 shadow-lg z-10' : ''}
                ${isFood ? 'bg-red-500 animate-pulse' : ''}
                ${!isSnake && !isFood ? 'bg-white/5' : ''}
              `}
              style={{ transitionDelay }}
            >
              {isHead && (
                <div className={`
                  absolute inset-0 flex items-center justify-center
                  transition-transform duration-100 ease-in-out
                  ${getEyePositions() === 'UP' && 'rotate-0'}
                  ${getEyePositions() === 'RIGHT' && 'rotate-90'}
                  ${getEyePositions() === 'DOWN' && 'rotate-180'}
                  ${getEyePositions() === 'LEFT' && '-rotate-90'}
                `}>
                  <div className="flex gap-1 -translate-y-[2px]">
                    <div className="w-[3px] h-[3px] rounded-full bg-black"></div>
                    <div className="w-[3px] h-[3px] rounded-full bg-black"></div>
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default Board;