import React, { useState } from 'react';
import type { MiniProjectQuestData, Quest } from '../../types';
import { CompletionAnimation } from '../CompletionAnimation';

interface Props {
  quest: MiniProjectQuestData;
  onClose: () => void;
  onComplete: (quest: Quest) => void;
}

export const MiniProjectQuest: React.FC<Props> = ({ quest, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => onComplete(quest), 2000);
  };

  if (isCompleted) {
    return <CompletionAnimation />;
  }
  
  return (
    <div className="space-y-4">
        <p className="text-gray-400">{quest.instructions}</p>
        <div>
            <pre className="bg-gray-900 p-4 rounded-lg text-lg overflow-x-auto text-center">
                <code>{quest.codeSnippet}</code>
            </pre>
        </div>
         <div className="pt-4">
            <button 
                onClick={handleComplete}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]"
            >
                Mark Complete
            </button>
        </div>
    </div>
  );
};
