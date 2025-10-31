import React, { useState } from 'react';
import type { CodeChallengeQuestData, Quest } from '../../types';
import { CompletionAnimation } from '../CompletionAnimation';

interface Props {
  quest: CodeChallengeQuestData;
  onClose: () => void;
  onComplete: (quest: Quest) => void;
}

export const CodeChallengeQuest: React.FC<Props> = ({ quest, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    setTimeout(() => onComplete(quest), 2000);
  };

  if (isCompleted) {
    return <CompletionAnimation />;
  }

  return (
    <div>
      <div className="w-full h-80 rounded-lg overflow-hidden mb-6 border-2 border-gray-700 bg-white">
        <iframe
          src={quest.embedUrl}
          width="100%"
          height="100%"
          title="Code Challenge"
        ></iframe>
      </div>
      <button 
        onClick={handleComplete}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]"
      >
        I've Completed the Challenge
      </button>
    </div>
  );
};
