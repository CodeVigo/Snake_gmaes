import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Pause } from 'lucide-react';
import { Direction } from '../types';

interface TouchControlsProps {
  onDirectionChange: (direction: Direction) => void;
  onPause: () => void;
}

const TouchControls: React.FC<TouchControlsProps> = ({ onDirectionChange, onPause }) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:hidden">
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg">
        <div className="grid grid-cols-3 gap-2 w-48">
          {/* Top button */}
          <button
            onClick={() => onDirectionChange('UP')}
            className="col-start-2 bg-indigo-600/80 p-3 rounded-lg active:bg-indigo-700"
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </button>
          
          {/* Middle row */}
          <button
            onClick={() => onDirectionChange('LEFT')}
            className="bg-indigo-600/80 p-3 rounded-lg active:bg-indigo-700"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => onPause()}
            className="bg-indigo-600/80 p-3 rounded-lg active:bg-indigo-700"
          >
            <Pause className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => onDirectionChange('RIGHT')}
            className="bg-indigo-600/80 p-3 rounded-lg active:bg-indigo-700"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
          
          {/* Bottom button */}
          <button
            onClick={() => onDirectionChange('DOWN')}
            className="col-start-2 bg-indigo-600/80 p-3 rounded-lg active:bg-indigo-700"
          >
            <ArrowDown className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TouchControls;