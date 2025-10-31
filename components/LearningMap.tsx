import React from 'react';
import { Node } from './Node';
import type { Quest } from '../types';

interface LearningMapProps {
  quests: Quest[];
  completedNodes: number[];
  onNodeClick: (quest: Quest) => void;
}

export const LearningMap: React.FC<LearningMapProps> = ({ quests, completedNodes, onNodeClick }) => {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="relative flex items-center justify-between w-full max-w-3xl">
        {quests.map((quest, index) => {
          const isCompleted = completedNodes.includes(quest.id);
          const isUnlocked = index === 0 || completedNodes.includes(quests[index - 1].id);
          const status = isCompleted ? 'completed' : isUnlocked ? 'unlocked' : 'locked';

          return (
            <React.Fragment key={quest.id}>
              <Node 
                quest={quest}
                status={status}
                onClick={onNodeClick}
              />
              {index < quests.length - 1 && (
                <div className={`flex-grow h-2 mx-2 rounded-full transition-all duration-500
                  ${completedNodes.includes(quest.id) ? 'bg-gradient-to-r from-teal-400 to-cyan-400 shadow-[0_0_10px_2px_rgba(45,212,191,0.6)]' : 'bg-gray-700'}
                `}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};