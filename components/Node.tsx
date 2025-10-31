import React from 'react';
import type { Quest } from '../types';

type NodeStatus = 'completed' | 'unlocked' | 'locked';

interface NodeProps {
  quest: Quest;
  status: NodeStatus;
  onClick: (quest: Quest) => void;
}

const statusStyles: Record<NodeStatus, string> = {
  completed: 'bg-green-500/80 border-green-400 shadow-[0_0_20px_7px_rgba(74,222,128,0.6)] cursor-pointer hover:shadow-[0_0_30px_10px_rgba(74,222,128,0.8)]',
  unlocked: 'bg-cyan-500/80 border-cyan-300 shadow-[0_0_20px_7px_rgba(34,211,238,0.5)] animate-pulse-glow cursor-pointer hover:shadow-[0_0_30px_10px_rgba(34,211,238,0.7)] hover:animate-none',
  locked: 'bg-gray-800 border-gray-600 cursor-not-allowed text-gray-500',
};

const Icon = ({ status }: { status: NodeStatus }) => {
  const iconSize = "h-10 w-10 sm:h-12 sm:w-12";
  if (status === 'completed') {
    return <svg xmlns="http://www.w3.org/2000/svg" className={`${iconSize} text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
  }
  if (status === 'unlocked') {
    return <svg xmlns="http://www.w3.org/2000/svg" className={`${iconSize} text-white`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
  }
  return <svg xmlns="http://www.w3.org/2000/svg" className={`${iconSize} text-gray-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>;
};


export const Node: React.FC<NodeProps> = ({ quest, status, onClick }) => {
  const handleClick = () => {
    if (status !== 'locked') {
      onClick(quest);
    }
  };

  return (
    <div 
      className={`relative w-24 h-24 sm:w-32 sm:h-32 rounded-full flex flex-col items-center justify-center p-2 text-center border-4 transition-all duration-300 transform hover:scale-110 ${statusStyles[status]}`}
      onClick={handleClick}
      aria-label={`${quest.title} - ${status}`}
    >
      <Icon status={status} />
      <span className="text-xs sm:text-sm font-bold mt-1 leading-tight hidden sm:block">{quest.title}</span>
       <span className="absolute -bottom-6 text-xs font-semibold sm:hidden">{quest.title}</span>
       <style>{`
            @keyframes pulse-glow {
                0%, 100% {
                    box-shadow: 0 0 20px 7px rgba(34, 211, 238, 0.5);
                }
                50% {
                    box-shadow: 0 0 30px 10px rgba(34, 211, 238, 0.7);
                }
            }
            .animate-pulse-glow {
                animation: pulse-glow 2.5s infinite ease-in-out;
            }
       `}</style>
    </div>
  );
};