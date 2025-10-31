import React, { useState } from 'react';
import type { Quest } from '../types';
import { VideoQuest } from './quests/VideoQuest';
import { QuizQuest } from './quests/QuizQuest';
import { CodeChallengeQuest } from './quests/CodeChallengeQuest';
import { DebugChallengeQuest } from './quests/DebugChallengeQuest';
import { MiniProjectQuest } from './quests/MiniProjectQuest';

interface QuestModalProps {
  quest: Quest;
  onClose: () => void;
  onComplete: (quest: Quest) => void;
}

const QuestContent: React.FC<QuestModalProps> = ({ quest, onComplete, onClose }) => {
  switch (quest.type) {
    case 'video':
      return <VideoQuest quest={quest} onComplete={onComplete} onClose={onClose} />;
    case 'quiz':
      return <QuizQuest quest={quest} onComplete={onComplete} onClose={onClose} />;
    case 'code':
      return <CodeChallengeQuest quest={quest} onComplete={onComplete} onClose={onClose} />;
    case 'debug':
        return <DebugChallengeQuest quest={quest} onComplete={onComplete} onClose={onClose} />;
    case 'project':
        return <MiniProjectQuest quest={quest} onComplete={onComplete} onClose={onClose} />;
    default:
      return <div>Error: Unknown quest type.</div>;
  }
}


export const QuestModal: React.FC<QuestModalProps> = ({ quest, onClose, onComplete }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
        onClose();
    }, 300);
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quest-title"
    >
      <div 
        className={`bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-lg text-white transform transition-all duration-300 scale-95 animate-modal-enter ${isClosing ? 'animate-modal-exit' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 id="quest-title" className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{quest.title}</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white transition-colors text-3xl leading-none" aria-label="Close">&times;</button>
        </div>
        <p className="text-gray-300 mb-6">{quest.description}</p>
        
        <QuestContent quest={quest} onComplete={onComplete} onClose={handleClose} />
        
        <style>{`
            @keyframes modal-enter {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
             @keyframes modal-exit {
                from { opacity: 1; transform: scale(1); }
                to { opacity: 0; transform: scale(0.95); }
            }
            .animate-modal-enter {
                animation: modal-enter 0.3s ease-out forwards;
            }
            .animate-modal-exit {
                animation: modal-exit 0.3s ease-out forwards;
            }
        `}</style>
      </div>
    </div>
  );
};