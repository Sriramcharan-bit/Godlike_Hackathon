import React, { useState, useEffect, useMemo } from 'react';
import { XPBar } from './components/XPBar';
import { LearningMap } from './components/LearningMap';
import { QuestModal } from './components/QuestModal';
import { QUESTS, MAX_XP_PER_LEVEL } from './constants';
import type { Quest } from './types';

const App: React.FC = () => {
  const [totalXp, setTotalXp] = useState<number>(() => {
    const savedXp = localStorage.getItem('questlearn_xp');
    return savedXp ? JSON.parse(savedXp) : 0;
  });

  const [completedNodes, setCompletedNodes] = useState<number[]>(() => {
    const savedNodes = localStorage.getItem('questlearn_completedNodes');
    return savedNodes ? JSON.parse(savedNodes) : [];
  });
  
  const [activeQuest, setActiveQuest] = useState<Quest | null>(null);

  useEffect(() => {
    localStorage.setItem('questlearn_xp', JSON.stringify(totalXp));
  }, [totalXp]);

  useEffect(() => {
    localStorage.setItem('questlearn_completedNodes', JSON.stringify(completedNodes));
  }, [completedNodes]);

  const handleNodeClick = (quest: Quest) => {
    setActiveQuest(quest);
  };

  const handleCloseModal = () => {
    setActiveQuest(null);
  };

  const handleCompleteQuest = (quest: Quest) => {
    if (!completedNodes.includes(quest.id)) {
      setTotalXp(prevXp => prevXp + quest.xp);
      setCompletedNodes(prevNodes => [...prevNodes, quest.id]);
    }
    handleCloseModal();
  };

  const { level, currentLevelXp, xpForNextLevel } = useMemo(() => {
    let level = 1;
    let xpForCurrentLevel = 0;
    let xpForNextLevel = MAX_XP_PER_LEVEL;
    let xpAccumulator = MAX_XP_PER_LEVEL;

    while (totalXp >= xpAccumulator) {
        level++;
        xpForCurrentLevel = xpAccumulator;
        xpForNextLevel = Math.floor(MAX_XP_PER_LEVEL * Math.pow(1.1, level - 1));
        xpAccumulator += xpForNextLevel;
    }
    
    const currentLevelXp = totalXp - xpForCurrentLevel;
    
    return { level, currentLevelXp, xpForNextLevel };
  }, [totalXp]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020024] via-[#090979] to-[#001b3b] text-white font-sans flex flex-col items-center p-4 sm:p-8 overflow-hidden">
      <header className="w-full max-w-4xl mb-8 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">QuestLearn</h1>
        <p className="text-center text-gray-400">Your interactive learning journey</p>
        <XPBar xp={currentLevelXp} maxXp={xpForNextLevel} level={level} />
      </header>
      
      <main className="flex-grow flex items-center justify-center w-full">
        <LearningMap 
          quests={QUESTS}
          completedNodes={completedNodes}
          onNodeClick={handleNodeClick}
        />
      </main>

      {activeQuest && (
        <QuestModal 
          quest={activeQuest}
          onClose={handleCloseModal}
          onComplete={handleCompleteQuest}
        />
      )}
    </div>
  );
};

export default App;