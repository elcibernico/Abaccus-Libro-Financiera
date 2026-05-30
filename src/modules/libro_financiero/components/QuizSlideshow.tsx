'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';

import { QuizItem } from '@/types';

interface QuizSlideshowProps {
  questions: QuizItem[];
  renderContent: (content: string) => React.ReactNode;
}

function SingleQuestion({
  item,
  renderContent,
}: {
  item: QuizItem;
  renderContent: (content: string) => React.ReactNode;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const isCorrect = selected === item.correctIndex;

  const getOptStyle = (idx: number) => {
    const base: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '0.85rem',
      width: '100%',
      padding: '0.85rem 1.1rem',
      borderRadius: '0.75rem',
      border: '1.5px solid',
      fontFamily: 'inherit',
      fontSize: '0.95rem',
      textAlign: 'left',
      cursor: selected === null ? 'pointer' : 'default',
      transition: 'all 0.2s ease',
      marginBottom: '0.5rem',
    };

    if (selected === null) {
      return {
        ...base,
        borderColor: 'var(--border-color)',
        background: 'var(--bg-color)',
        color: 'var(--text-color)',
      };
    }

    if (idx === item.correctIndex) {
      return {
        ...base,
        borderColor: '#10b981',
        background: 'rgba(16,185,129,0.09)',
        color: 'var(--text-color)',
      };
    }

    if (idx === selected) {
      return {
        ...base,
        borderColor: '#ef4444',
        background: 'rgba(239,68,68,0.09)',
        color: 'var(--text-color)',
      };
    }

    return {
      ...base,
      borderColor: 'var(--border-color)',
      background: 'var(--bg-color)',
      color: 'var(--text-color)',
      opacity: 0.45,
    };
  };

  const getLetterStyle = (idx: number): React.CSSProperties => {
    const base: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      fontSize: '0.8rem',
      fontWeight: 700,
      transition: 'all 0.2s',
    };

    if (selected !== null && idx === item.correctIndex) {
      return { ...base, background: '#10b981', color: 'white' };
    }
    if (selected !== null && idx === selected && idx !== item.correctIndex) {
      return { ...base, background: '#ef4444', color: 'white' };
    }
    return { ...base, background: 'var(--border-color)', color: 'var(--text-color)' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Question */}
      <div style={{
        fontSize: '1.05rem',
        fontWeight: 600,
        lineHeight: 1.65,
        color: 'var(--text-color)',
        paddingBottom: '0.75rem',
        borderBottom: '1px solid var(--border-color)',
      }}>
        {renderContent(item.question)}
      </div>

      {/* Options */}
      <div>
        {item.options.map((opt, idx) => (
          <button
            key={idx}
            style={getOptStyle(idx)}
            onClick={() => { if (selected === null) setSelected(idx); }}
          >
            <span style={getLetterStyle(idx)}>
              {String.fromCharCode(65 + idx)}
            </span>
            <span style={{ flex: 1, lineHeight: 1.5 }}>
              {renderContent(opt)}
            </span>
            {selected !== null && idx === item.correctIndex && (
              <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0 }} />
            )}
            {selected !== null && idx === selected && idx !== item.correctIndex && (
              <XCircle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
            )}
          </button>
        ))}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              padding: '1rem 1.25rem',
              borderRadius: '0.875rem',
              border: `1.5px solid ${isCorrect ? '#10b981' : '#ef4444'}`,
              background: isCorrect ? 'rgba(16,185,129,0.07)' : 'rgba(239,68,68,0.07)',
            }}>
              <div style={{ flexShrink: 0, marginTop: 2, color: isCorrect ? '#10b981' : '#ef4444' }}>
                {isCorrect ? <CheckCircle2 size={22} /> : <XCircle size={22} />}
              </div>
              <div style={{ flex: 1, fontSize: '0.93rem', lineHeight: 1.6, color: 'var(--text-color)' }}>
                <strong style={{ display: 'block', marginBottom: '0.3rem' }}>
                  {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                </strong>
                {renderContent(item.feedback)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function QuizSlideshow({ questions, renderContent }: QuizSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (next: number) => {
    setDirection(next > currentIndex ? 1 : -1);
    setCurrentIndex(next);
  };

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -50 : 50 }),
  };

  return (
    <div style={{
      background: 'var(--card-bg, rgba(255,255,255,0.04))',
      border: '1px solid var(--border-color)',
      borderRadius: '1.25rem',
      overflow: 'hidden',
      boxShadow: '0 4px 32px rgba(0,0,0,0.12)',
    }}>
      {/* Header */}
      <div style={{
        padding: '1.25rem 2rem 1rem',
        borderBottom: '1px solid var(--border-color)',
        background: 'linear-gradient(135deg, rgba(99,102,241,0.07) 0%, transparent 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <span style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#818cf8',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          Pregunta {currentIndex + 1} de {questions.length}
        </span>
        <div style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir a pregunta ${i + 1}`}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                border: `2px solid ${i === currentIndex ? '#818cf8' : 'var(--border-color)'}`,
                background: i === currentIndex ? '#818cf8' : 'transparent',
                cursor: 'pointer',
                padding: 0,
                transform: i === currentIndex ? 'scale(1.3)' : 'scale(1)',
                transition: 'all 0.2s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Slide */}
      <div style={{ padding: '2rem', minHeight: 280, overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: 'easeInOut' }}
          >
            <SingleQuestion
              item={questions[currentIndex]}
              renderContent={renderContent}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.5rem 1.25rem',
        borderTop: '1px solid var(--border-color)',
      }}>
        <button
          onClick={() => goTo(currentIndex - 1)}
          disabled={currentIndex === 0}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.6rem 1.1rem',
            borderRadius: '0.625rem',
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-color)',
            fontFamily: 'inherit',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
            opacity: currentIndex === 0 ? 0.3 : 1,
            whiteSpace: 'nowrap',
          }}
        >
          <ChevronLeft size={20} />
          <span>Anterior</span>
        </button>

        <div style={{
          flex: 1,
          height: 4,
          background: 'var(--border-color)',
          borderRadius: 999,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            background: 'linear-gradient(90deg, #818cf8, #10b981)',
            borderRadius: 999,
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
            transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }} />
        </div>

        <button
          onClick={() => goTo(currentIndex + 1)}
          disabled={currentIndex === questions.length - 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.6rem 1.1rem',
            borderRadius: '0.625rem',
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-color)',
            fontFamily: 'inherit',
            fontSize: '0.9rem',
            fontWeight: 600,
            cursor: currentIndex === questions.length - 1 ? 'not-allowed' : 'pointer',
            opacity: currentIndex === questions.length - 1 ? 0.3 : 1,
            whiteSpace: 'nowrap',
          }}
        >
          <span>Siguiente</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
