import React, { useState, useEffect, useMemo, useRef } from 'react';
import { XPBar } from './components/XPBar';
import { LearningMap } from './components/LearningMap';
import { QuestModal } from './components/QuestModal';
import { QUESTS, XP_PER_LEVEL } from './constants';
import type { Quest } from './types';
import { LevelUpAnimation } from './components/LevelUpAnimation';
import { Confetti } from './components/Confetti';
import { LandingPage } from './components/LandingPage';
import { EndScreen } from './components/EndScreen';


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
  const [showConfetti, setShowConfetti] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState<{ show: boolean; level: number | null }>({ show: false, level: null });

  const [gameStarted, setGameStarted] = useState<boolean>(() => {
    return localStorage.getItem('questlearn_started') === 'true';
  });
  const [isFadingOut, setIsFadingOut] = useState(false);


  useEffect(() => {
    localStorage.setItem('questlearn_xp', JSON.stringify(totalXp));
  }, [totalXp]);

  useEffect(() => {
    localStorage.setItem('questlearn_completedNodes', JSON.stringify(completedNodes));
  }, [completedNodes]);

  const { level, currentLevelXp, xpForNextLevel } = useMemo(() => {
    const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
    const currentLevelXp = totalXp % XP_PER_LEVEL;
    return { level, currentLevelXp, xpForNextLevel: XP_PER_LEVEL };
  }, [totalXp]);
  
  const prevLevelRef = useRef(level);

  useEffect(() => {
    if (level > prevLevelRef.current) {
        setLevelUpInfo({ show: true, level: level });
        setTimeout(() => {
            setLevelUpInfo({ show: false, level: null });
        }, 2500); // Duration of the animation
    }
    prevLevelRef.current = level;
  }, [level]);

  const allQuestsCompleted = useMemo(() => completedNodes.length === QUESTS.length, [completedNodes]);
  const prevAllQuestsCompleted = useRef(allQuestsCompleted);

  useEffect(() => {
      if (allQuestsCompleted && !prevAllQuestsCompleted.current) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000); // Longer confetti for final win
      }
      prevAllQuestsCompleted.current = allQuestsCompleted;
  }, [allQuestsCompleted]);


  const handleStartQuest = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setGameStarted(true);
      localStorage.setItem('questlearn_started', 'true');
    }, 500); // Match fade-out duration
  };

  const handleRestart = () => {
    setTotalXp(0);
    setCompletedNodes([]);
    setActiveQuest(null);
    setGameStarted(false);
    setIsFadingOut(false);
    prevLevelRef.current = 1;

    localStorage.removeItem('questlearn_xp');
    localStorage.removeItem('questlearn_completedNodes');
    localStorage.removeItem('questlearn_started');
  };

  const handleResetClick = () => {
    if (window.confirm("Are you sure you want to reset all your progress? This action cannot be undone.")) {
      handleRestart();
    }
  };

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
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000); // show confetti for 4 seconds
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020024] via-[#090979] to-[#001b3b] text-white font-sans flex flex-col items-center p-4 sm:p-8 overflow-hidden">
      {showConfetti && <Confetti />}
      {levelUpInfo.show && levelUpInfo.level && <LevelUpAnimation level={levelUpInfo.level} />}

      {!gameStarted && <LandingPage onStart={handleStartQuest} isFadingOut={isFadingOut} />}

      {gameStarted && (
        <div className="w-full flex flex-col items-center flex-grow animate-fade-in-main">
          <header className="relative w-full max-w-4xl mb-8 sm:mb-16">
            <button 
              onClick={handleResetClick}
              className="absolute top-0 right-0 mt-1 mr-1 text-xs text-gray-400 hover:text-red-400 transition-colors duration-200 border border-gray-600 hover:border-red-500 rounded-full px-3 py-1 z-10"
              aria-label="Reset all progress"
            >
              Reset Progress
            </button>
            <h1 className="text-4xl sm:text-5xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">QuestLearn</h1>
            <p className="text-center text-gray-400">Your interactive learning journey</p>
            <XPBar xp={currentLevelXp} maxXp={xpForNextLevel} level={level} />
          </header>
          
          <main className="flex-grow flex items-center justify-center w-full">
            {allQuestsCompleted ? (
              <EndScreen onRestart={handleRestart} />
            ) : (
              <LearningMap 
                quests={QUESTS}
                completedNodes={completedNodes}
                onNodeClick={handleNodeClick}
              />
            )}
          </main>
        </div>
      )}

      {activeQuest && (
        <QuestModal 
          quest={activeQuest}
          onClose={handleCloseModal}
          onComplete={handleCompleteQuest}
        />
      )}
      <style>{`
          @keyframes fade-in-main {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-main {
              animation: fade-in-main 0.5s ease-out forwards;
          }
      `}</style>
    </div>
  );
};

export default App;