import React, { useState } from 'react';
import type { VideoQuestData, Quest } from '../../types';
import { CompletionAnimation } from '../CompletionAnimation';

interface Props {
  quest: VideoQuestData;
  onClose: () => void;
  onComplete: (quest: Quest) => void;
}

export const VideoQuest: React.FC<Props> = ({ quest, onComplete }) => {
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
      <div className="aspect-video w-full rounded-lg overflow-hidden mb-6 border-2 border-gray-700">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${quest.videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <button 
        onClick={handleComplete}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]"
      >
        Mark Complete
      </button>
    </div>
  );
};
