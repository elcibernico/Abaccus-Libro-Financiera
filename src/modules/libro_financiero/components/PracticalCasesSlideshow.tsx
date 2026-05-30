'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Calculator, Lightbulb } from 'lucide-react';

import { CaseItem } from '@/types';

interface PracticalCasesSlideshowProps {
  cases: CaseItem[];
  renderContent: (content: any) => React.ReactNode;
}

export default function PracticalCasesSlideshow({ cases, renderContent }: PracticalCasesSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (nextIndex: number) => {
    setDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentIndex(nextIndex);
  };

  const goNext = () => { if (currentIndex < cases.length - 1) goTo(currentIndex + 1); };
  const goPrev = () => { if (currentIndex > 0) goTo(currentIndex - 1); };

  const currentCase = cases[currentIndex];

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <div className="practical-cases-slideshow">
      {/* Header with counter */}
      <div className="cases-header">
        <div className="cases-title-row">
          <span className="cases-counter">
            Ejercicio {currentIndex + 1} de {cases.length}
          </span>
          <div className="cases-dots">
            {cases.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`case-dot ${i === currentIndex ? 'active' : ''}`}
                aria-label={`Ir al ejercicio ${i + 1}`}
              />
            ))}
          </div>
        </div>
        <h3 className="cases-slide-title">{currentCase.title || 'Caso Práctico'}</h3>
      </div>

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="cases-slide"
        >
          {/* Block 1: Enunciado o Contenido */}
          {(currentCase.enunciado || currentCase.content) && (
            <div className="case-block enunciado-block">
              <div className="case-block-icon">
                <BookOpen size={18} />
              </div>
              <div className="case-block-content">
                {renderContent(currentCase.enunciado || currentCase.content || '')}
              </div>
            </div>
          )}

          {/* Block 2: Planteo y Solución */}
          {currentCase.planteo_solucion && (
            <div className="case-block solucion-block">
              <div className="case-block-icon">
                <Calculator size={18} />
              </div>
              <div className="case-block-content">
                {renderContent(currentCase.planteo_solucion)}
              </div>
            </div>
          )}

          {/* Block 3: Highlights (only if exists and is not empty) */}
          {currentCase.highlights && currentCase.highlights.trim() !== '' && (
            <div className="case-block highlights-block">
              <div className="case-block-icon">
                <Lightbulb size={18} />
              </div>
              <div className="case-block-content">
                {renderContent(currentCase.highlights)}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="cases-navigation">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="nav-arrow prev"
          aria-label="Ejercicio anterior"
        >
          <ChevronLeft size={22} />
          <span>Anterior</span>
        </button>

        <div className="cases-progress-bar">
          <div
            className="cases-progress-fill"
            style={{ width: `${((currentIndex + 1) / cases.length) * 100}%` }}
          />
        </div>

        <button
          onClick={goNext}
          disabled={currentIndex === cases.length - 1}
          className="nav-arrow next"
          aria-label="Siguiente ejercicio"
        >
          <span>Siguiente</span>
          <ChevronRight size={22} />
        </button>
      </div>

      <style jsx>{`
        .practical-cases-slideshow {
          background: var(--card-bg, rgba(255,255,255,0.04));
          border: 1px solid var(--border-color);
          border-radius: 1.25rem;
          overflow: hidden;
          box-shadow: 0 4px 32px rgba(0,0,0,0.12);
        }

        .cases-header {
          padding: 1.5rem 2rem 1rem;
          border-bottom: 1px solid var(--border-color);
          background: linear-gradient(135deg, rgba(var(--primary-rgb, 16,185,129), 0.06) 0%, transparent 100%);
        }

        .cases-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .cases-counter {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--primary-color);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .cases-dots {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .case-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: 2px solid var(--border-color);
          background: transparent;
          cursor: pointer;
          padding: 0;
          transition: all 0.2s ease;
        }

        .case-dot.active {
          background: var(--primary-color);
          border-color: var(--primary-color);
          transform: scale(1.3);
        }

        .cases-slide-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-color);
          margin: 0;
          line-height: 1.4;
        }

        .cases-slide {
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          min-height: 320px;
        }

        .case-block {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 1.25rem;
          border-radius: 0.875rem;
          border: 1px solid transparent;
          line-height: 1.75;
          font-size: 0.97rem;
        }

        .enunciado-block {
          background: rgba(var(--primary-rgb, 16,185,129), 0.05);
          border-color: rgba(var(--primary-rgb, 16,185,129), 0.2);
        }

        .solucion-block {
          background: rgba(99, 102, 241, 0.05);
          border-color: rgba(99, 102, 241, 0.2);
        }

        .highlights-block {
          background: rgba(245, 158, 11, 0.05);
          border-color: rgba(245, 158, 11, 0.2);
        }

        .case-block-icon {
          flex-shrink: 0;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1px;
        }

        .enunciado-block .case-block-icon {
          background: rgba(var(--primary-rgb, 16,185,129), 0.15);
          color: var(--primary-color);
        }

        .solucion-block .case-block-icon {
          background: rgba(99, 102, 241, 0.15);
          color: #818cf8;
        }

        .highlights-block .case-block-icon {
          background: rgba(245, 158, 11, 0.15);
          color: #f59e0b;
        }

        .case-block-content {
          flex: 1;
          min-width: 0;
        }

        .cases-navigation {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.5rem 1.25rem;
          border-top: 1px solid var(--border-color);
        }

        .nav-arrow {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.1rem;
          border-radius: 0.625rem;
          border: 1px solid var(--border-color);
          background: transparent;
          color: var(--text-color);
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          font-family: inherit;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .nav-arrow:hover:not(:disabled) {
          background: var(--primary-color);
          border-color: var(--primary-color);
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .nav-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .cases-progress-bar {
          flex: 1;
          height: 4px;
          background: var(--border-color);
          border-radius: 999px;
          overflow: hidden;
        }

        .cases-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-color), #818cf8);
          border-radius: 999px;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}
