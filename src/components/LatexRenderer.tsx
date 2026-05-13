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
        katex.render(cleanFormula, containerRef.current, {
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

  return <Component ref={containerRef} className={displayMode ? "formula" : "inline-formula"} />;
}
