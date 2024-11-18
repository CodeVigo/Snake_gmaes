import React from 'react';
import { Trophy, Star, Heart, Zap } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  level: number;
  highScore: number;
  lives: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({
  score,
  level,
  highScore,
  lives,
}) => {
  return (
    <div className="bg-white/5 rounded-lg p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-6">Stats</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-white/80">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Score</span>
            </div>
            <span className="text-xl font-bold text-white">{score}</span>
          </div>

          <div className="flex items-center justify-between text-white/80">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              <span>High Score</span>
            </div>
            <span className="text-xl font-bold text-white">{highScore}</span>
          </div>

          <div className="flex items-center justify-between text-white/80">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" />
              <span>Level</span>
            </div>
            <span className="text-xl font-bold text-white">{level}</span>
          </div>

          <div className="flex items-center justify-between text-white/80">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span>Lives</span>
            </div>
            <span className="text-xl font-bold text-white">{lives}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold text-white mb-3">Level Info</h3>
        <div className="text-sm text-white/70 space-y-2">
          <p>Speed: {300 - level * 30}ms</p>
          <p>Points needed: {5 - (score % 5)} points</p>
          <p>Bonus life every 3 levels!</p>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;