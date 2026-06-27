import { useEffect, useRef } from 'react';

export function useScrollspy(
  ids: string[],
  onActiveIdChange: (id: string) => void,
  activeTab: string
) {
  const lastActiveIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (ids.length === 0 || activeTab !== 'Desarrollo') return;

    let ticking = false;

    const updateActiveSection = () => {
      const targetY = window.innerHeight * 0.25; // 25% of the screen from top is the "reading line"
      let currentActiveId: string | null = null;
      let minDistance = Infinity;

      // Find the element closest to the reading line
      for (const id of ids) {
        const el = document.getElementById(`scrollspy-${id}`);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        
        // If the top of the element is above the reading line, and the bottom is below it, it's the active one
        if (rect.top <= targetY && rect.bottom > targetY) {
          currentActiveId = id;
          break; // Found the perfect match
        }

        // Fallback: find the element whose top is closest to the reading line
        const distance = Math.abs(rect.top - targetY);
        if (distance < minDistance) {
          minDistance = distance;
          currentActiveId = id;
        }
      }

      if (currentActiveId && currentActiveId !== lastActiveIdRef.current) {
        lastActiveIdRef.current = currentActiveId;
        onActiveIdChange(currentActiveId);
      }
      
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    // Run once on mount
    updateActiveSection();

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Also listen to resize as it changes element positions
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ids.join(','), onActiveIdChange, activeTab]);
}

export function ScrollspyRegistry({ ids, onActiveIdChange, activeTab }: { ids: string[], onActiveIdChange: (id: string) => void, activeTab: string }) {
  useScrollspy(ids, onActiveIdChange, activeTab);
  return null;
}
