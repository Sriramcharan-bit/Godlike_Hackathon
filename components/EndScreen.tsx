import React from 'react';

interface EndScreenProps {
  onRestart: () => void;
}

export const EndScreen: React.FC<EndScreenProps> = ({ onRestart }) => {
  return (
    <div className="w-full h-full flex-grow flex flex-col items-center justify-center text-center p-4 animate-fade-in">
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-teal-300 to-cyan-400">
          Congratulations, Hero!
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg">
          You have successfully completed the Python Loop Quest and mastered the fundamentals of iteration.
        </p>
        <button 
          onClick={onRestart}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-110 shadow-[0_0_20px_rgba(167,139,250,0.5)] hover:shadow-[0_0_35px_rgba(167,139,250,0.7)]"
        >
          Restart Journey
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};