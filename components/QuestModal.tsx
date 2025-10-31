import React from 'react';
import type { Quest } from '../types';

interface QuestModalProps {
  quest: Quest;
  onClose: () => void;
  onComplete: (quest: Quest) => void;
}

export const QuestModal: React.FC<QuestModalProps> = ({ quest, onClose, onComplete }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md text-white transform transition-all duration-300 scale-95 animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">{quest.title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">&times;</button>
        </div>
        <p className="text-gray-300 mb-6">{quest.description}</p>
        
        <div className="bg-gray-700/50 p-4 rounded-lg mb-6">
          <p className="text-center font-semibold text-lg">
            Reward: <span className="text-yellow-400">{quest.xp} XP</span>
          </p>
        </div>

        <button 
          onClick={() => onComplete(quest)}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]"
        >
          Complete Quest
        </button>
        <style>{`
            @keyframes modal-enter {
                from { opacity: 0; transform: scale(0.95); }
                to { opacity: 1; transform: scale(1); }
            }
            .animate-modal-enter {
                animation: modal-enter 0.3s ease-out forwards;
            }
        `}</style>
      </div>
    </div>
  );
};