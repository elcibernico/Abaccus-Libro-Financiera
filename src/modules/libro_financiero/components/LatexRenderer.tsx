'use client';
import { useEffect, useRef } from 'react';
import katex from 'katex';

interface LatexRendererProps {
  formula: string;
  displayMode?: boolean;
}

export default function LatexRenderer({ formula, displayMode = true }: LatexRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        const cleanFormula = formula.replace(/^\$\$|\$\$$|^\$|\$$/g, '');
        // Escapar cualquier signo de pesos ($) que no esté ya escapado (\$)
        const sanitizedFormula = cleanFormula.replace(/(?<!\\)\$/g, () => '\\$');
        katex.render(sanitizedFormula, containerRef.current, {
          throwOnError: false,
          displayMode: displayMode,
          trust: true,
          strict: false
        });
      } catch (e) {
        console.error("KaTeX error:", e);
        containerRef.current.textContent = formula;
      }
    }
  }, [formula, displayMode]);

  const Component = displayMode ? 'div' : 'span';
  const styles = displayMode 
    ? {} 
    : { display: 'inline', whiteSpace: 'nowrap' as const, verticalAlign: 'baseline' };

  return <Component ref={containerRef} className={displayMode ? "formula" : "inline-formula"} style={styles} />;
}
