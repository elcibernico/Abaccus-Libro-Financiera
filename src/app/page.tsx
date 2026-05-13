'use client';

import { usePreferences } from '@/components/UserPreferencesProvider';
import InteractiveChart from '@/components/InteractiveChart';
import LatexRenderer from '@/components/LatexRenderer';
import QuizCard from '@/components/QuizCard';
import unitData from '@/data/unidad_01.json';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const { learningMode } = usePreferences();

  const renderContent = (content: string) => {
    // 1. $$...$$ for display math (can be multi-line)
    // 2. $...$ for inline math (must be on one line, no space after opening $)
    const parts = content.split(/(\$\$.*?\$\$|\$(?!\s)[^\$\n]+?\$)/g);
    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        // If it's something like $$100.000$$, it might be currency with double dollars
        if (/^\$\$\d+(\.\d+)*\$\$$/.test(part)) {
           return <span key={index}>{part.replace(/\$\$/g, '$')}</span>;
        }
        return <LatexRenderer key={index} formula={part} displayMode={true} />;
      }
      if (part.startsWith('$') && part.endsWith('$')) {
        // Currency detection: $100.000$ or $60%$
        // If it has digits and no typical math operators (like \ , ^, _, +, -)
        if (/^\$?\$\d+(\.\d+)*%?\$?$/.test(part) || /^\$\d+%?\$$/.test(part)) {
           const clean = part.replace(/^\$|\$$/g, '');
           // Ensure at least one $ remains if it was currency
           return <span key={index}>{clean.startsWith('$') ? clean : '$' + clean}</span>;
        }
        
        // Final check for math vs text
        const inner = part.slice(1, -1);
        if (/^[a-zA-Z]$/.test(inner) || inner.includes('\\') || inner.includes('^') || inner.includes('_') || inner.includes('=') || inner.includes('+')) {
          return <LatexRenderer key={index} formula={part} displayMode={false} />;
        }
        
        return <span key={index}>{part}</span>;
      }
      return (
        <span key={index}>
          {part.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < part.split('\n').length - 1 && <br />}
            </span>
          ))}
        </span>
      );
    });
  };

  return (
    <main>
      <div className="content">
        {unitData.sections.map((section) => (
          <section key={section.id} style={{ marginBottom: '4rem' }}>
            <h2 id={section.id} style={{ borderBottom: '2px solid var(--primary-color)', display: 'inline-block', marginBottom: '1.5rem' }}>
              {section.id} {section.title}
            </h2>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={learningMode}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
              >
                {section.items
                  .filter(item => item.mode === 'both' || item.mode === learningMode)
                  .map((item, idx) => {
                    if (item.type === 'chart') {
                      return <InteractiveChart key={idx} />;
                    }
                    if (item.mode === 'expert') {
                      return (
                        <div key={idx} className="expert-section">
                          <strong>Profundización Experta:</strong><br/>
                          {renderContent(item.content || '')}
                        </div>
                      );
                    }
                    if (item.type === 'example') {
                       return (
                         <div key={idx} className="glass-card" style={{ borderLeft: '4px solid var(--secondary-color)' }}>
                           <strong style={{ color: 'var(--secondary-color)' }}>Ejemplo Práctico:</strong><br/>
                           {renderContent(item.content || '')}
                         </div>
                       );
                    }
                    if (item.type === 'quiz') {
                      const quizItem = item as any;
                      return (
                        <QuizCard 
                          key={idx} 
                          question={quizItem.question || ''} 
                          options={quizItem.options || []} 
                          feedback={quizItem.feedback || ''}
                          correctIndex={quizItem.correctIndex || 0}
                          renderContent={renderContent}
                        />
                      );
                    }
                    return (
                      <div key={idx} className="glass-card">
                        {renderContent(item.content || '')}
                      </div>
                    );
                  })}
              </motion.div>
            </AnimatePresence>
          </section>
        ))}
      </div>
    </main>
  );
}
