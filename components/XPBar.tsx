import React from 'react';

interface XPBarProps {
  xp: number;
  maxXp: number;
  level: number;
}

export const XPBar: React.FC<XPBarProps> = ({ xp, maxXp, level }) => {
  const percentage = maxXp > 0 ? (xp / maxXp) * 100 : 0;

  return (
    <div className="mt-6 w-full">
      <div className="flex justify-between items-center mb-1 text-sm font-medium">
        <span className="text-cyan-300">Level {level}</span>
        <span className="text-gray-300">{xp} / {maxXp} XP</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden border-2 border-gray-600">
        <div 
          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};
