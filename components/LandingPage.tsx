import React from 'react';

interface LandingPageProps {
  onStart: () => void;
  isFadingOut: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, isFadingOut }) => {
  return (
    <div className={`w-full h-full flex-grow flex flex-col items-center justify-center text-center p-4 animate-fade-in ${isFadingOut ? 'animate-fade-out' : ''}`}>
      <h1 className="text-5xl sm:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 leading-tight">
        🎓 QuestLearn
      </h1>
      <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-2xl">
        Turn Learning into an Adventure
      </p>
      
      <button 
        onClick={onStart} 
        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-10 rounded-full text-xl transition-all duration-300 transform hover:scale-110 shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)]"
      >
        Start Quest
      </button>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        @keyframes fade-out {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-20px); }
        }
        .animate-fade-out {
          animation: fade-out 0.5s ease-in forwards;
        }
      `}</style>
    </div>
  );
};