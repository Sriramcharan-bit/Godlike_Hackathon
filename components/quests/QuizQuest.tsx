import React, { useState } from 'react';
import type { QuizQuestData, Quest } from '../../types';
import { CompletionAnimation } from '../CompletionAnimation';

interface Props {
  quest: QuizQuestData;
  onClose: () => void;
  onComplete: (quest: Quest) => void;
}

export const QuizQuest: React.FC<Props> = ({ quest, onComplete }) => {
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quest.questions.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectAnswer = (questionIndex: number, optionIndex: number) => {
    if (submitted) return;
    const newAnswers = [...answers];
    newAnswers[questionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const allCorrect = quest.questions.every((q, i) => q.correctAnswerIndex === answers[i]);
    if (allCorrect) {
      setIsCorrect(true);
      setTimeout(() => onComplete(quest), 2000);
    }
  };

  if (isCorrect) {
    return <CompletionAnimation />;
  }

  return (
    <div>
      <div className="space-y-6 mb-6">
        {quest.questions.map((q, qIndex) => (
          <div key={qIndex}>
            <p className="font-semibold mb-2 text-gray-200">{qIndex + 1}. {q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((option, oIndex) => {
                const isSelected = answers[qIndex] === oIndex;
                let buttonClass = 'bg-gray-700 hover:bg-gray-600';
                if (submitted) {
                  if (q.correctAnswerIndex === oIndex) {
                    buttonClass = 'bg-green-500/80 border-green-400';
                  } else if (isSelected) {
                    buttonClass = 'bg-red-500/80 border-red-400';
                  }
                } else if (isSelected) {
                  buttonClass = 'bg-cyan-600';
                }

                return (
                  <button
                    key={oIndex}
                    onClick={() => handleSelectAnswer(qIndex, oIndex)}
                    disabled={submitted}
                    className={`p-3 rounded-lg text-left transition-all duration-200 border-2 border-transparent ${buttonClass}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
       {submitted && !isCorrect && (
          <p className="text-red-400 text-center mb-4 font-semibold">Some answers are incorrect. Please try again!</p>
        )}
      <button 
        onClick={handleSubmit}
        disabled={answers.includes(null) || submitted}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
      >
        Submit Answers
      </button>
    </div>
  );
};
