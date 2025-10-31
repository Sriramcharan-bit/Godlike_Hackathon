import React from 'react';

const CONFETTI_COUNT = 100;

export const Confetti: React.FC = () => {
  const confetti = Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 4}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
      '--bg-color': `hsl(${180 + Math.random() * 120}, 100%, 60%)`
    } as React.CSSProperties;
    return <div key={i} className="confetti-piece" style={style}></div>;
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {confetti}
      <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .confetti-piece {
          position: absolute;
          top: 0;
          width: 8px;
          height: 16px;
          background-color: var(--bg-color);
          opacity: 0;
          animation: fall linear forwards;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};
