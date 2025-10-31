import React from 'react';

interface Props {
  level: number;
}

export const LevelUpAnimation: React.FC<Props> = ({ level }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-[100]">
      <div className="level-up-container text-center">
        <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300 level-up-text">
          Level Up!
        </h2>
        <p className="text-3xl font-semibold text-white mt-2 level-up-subtext">You've reached Level {level}</p>
      </div>
      <style>{`
        @keyframes level-up-text-anim {
          0% { transform: scale(0.5); opacity: 0; }
          20% { transform: scale(1.2); opacity: 1; }
          40% { transform: scale(1); }
          80% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes level-up-subtext-anim {
          0%, 30% { transform: translateY(20px); opacity: 0; }
          50% { transform: translateY(0); opacity: 1; }
          80% { transform: translateY(0); opacity: 1; }
          100% { opacity: 0; }
        }
        .level-up-text {
          animation: level-up-text-anim 2.5s ease-in-out forwards;
        }
        .level-up-subtext {
          animation: level-up-subtext-anim 2.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};
