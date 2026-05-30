'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown } from 'lucide-react';

interface QuizCardProps {
  question: string;
  options: string[];
  feedback: string;
  correctIndex: number;
  renderContent: (content: string) => React.ReactNode;
}

export default function QuizCard({ question, options, feedback, correctIndex, renderContent }: QuizCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (index: number) => {
    setSelectedOption(index);
    setShowFeedback(true);
  };

  const isCorrect = selectedOption === correctIndex;
  const cardBorderColor = !showFeedback ? 'var(--border-color)' : (isCorrect ? 'var(--primary-color)' : '#ef4444');

  return (
    <div className="glass-card quiz-card" style={{ borderLeft: `4px solid ${cardBorderColor}` }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
          {renderContent(question)}
        </h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {options.map((option, idx) => {
          const isThisSelected = selectedOption === idx;
          const isThisCorrect = idx === correctIndex;
          
          let optionClass = 'quiz-option';
          if (showFeedback) {
            if (isThisCorrect) {
              optionClass += ' correct';
            } else if (isThisSelected) {
              optionClass += ' incorrect';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={showFeedback}
              className={optionClass}
            >
              <div className="option-indicator" />
              <span style={{ textAlign: 'left' }}>{renderContent(option)}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {isCorrect ? <CheckCircle2 size={20} /> : <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#ef4444' }}>×</div>}
              <div>
                <strong>{isCorrect ? '¡Excelente!' : 'Incorrecto. Repasar tema'}</strong><br/>
                {renderContent(isCorrect ? feedback : feedback.replace(/¡Correcto!\s*/i, ''))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .quiz-option {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--bg-color);
          border: 1px solid var(--border-color);
          border-radius: 0.75rem;
          cursor: pointer;
          transition: var(--transition);
          color: var(--text-color);
          font-family: inherit;
          font-size: 1rem;
        }

        .quiz-option:hover:not(:disabled) {
          background: var(--hover-color);
          border-color: var(--primary-color);
        }

        .quiz-option.correct {
          background: rgba(16, 185, 129, 0.1);
          border-color: var(--primary-color);
        }

        .quiz-option.incorrect {
          background: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
        }

        .option-indicator {
          width: 20px;
          height: 20px;
          border: 2px solid var(--border-color);
          border-radius: 50%;
          flex-shrink: 0;
          transition: var(--transition);
        }

        .quiz-option.correct .option-indicator {
          border-color: var(--primary-color);
          background: var(--primary-color);
          box-shadow: inset 0 0 0 3px var(--bg-color);
        }

        .quiz-option.incorrect .option-indicator {
          border-color: #ef4444;
          background: #ef4444;
          box-shadow: inset 0 0 0 3px var(--bg-color);
        }

        .quiz-feedback {
          margin-top: 1.5rem;
          padding: 1.25rem;
          border-radius: 0.75rem;
          display: flex;
          gap: 1rem;
          font-size: 0.95rem;
          line-height: 1.5;
          border: 1px solid transparent;
        }

        .quiz-feedback.correct {
          background: rgba(16, 185, 129, 0.05);
          border-color: var(--primary-color);
          color: var(--text-color);
        }

        .quiz-feedback.incorrect {
          background: rgba(239, 68, 68, 0.05);
          border-color: #ef4444;
          color: var(--text-color);
        }
      `}</style>
    </div>
  );
}
