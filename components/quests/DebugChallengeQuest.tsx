import React, { useState } from 'react';
import type { DebugChallengeQuestData, Quest } from '../../types';
import { CompletionAnimation } from '../CompletionAnimation';

interface Props {
  quest: DebugChallengeQuestData;
  onClose: () => void;
  onComplete: (quest: Quest) => void;
}

export const DebugChallengeQuest: React.FC<Props> = ({ quest, onComplete }) => {
  const [showFix, setShowFix] = useState(false);
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
        <div>
            <h3 className="font-semibold text-red-400 mb-2">Buggy Code:</h3>
            <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto"><code>{quest.buggyCode}</code></pre>
        </div>

        {showFix && (
             <div>
                <h3 className="font-semibold text-green-400 mb-2">Fixed Code:</h3>
                <pre className="bg-gray-900 p-4 rounded-lg text-sm overflow-x-auto"><code>{quest.fixedCode}</code></pre>
            </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
                onClick={() => setShowFix(true)}
                disabled={showFix}
                className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Show Fix
            </button>
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
