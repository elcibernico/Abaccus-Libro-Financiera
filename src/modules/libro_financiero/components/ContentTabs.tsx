'use client';

import { motion } from 'framer-motion';

export type TabType = 'Desarrollo' | 'Glosario' | 'Gráficos' | 'Casos Prácticos' | 'Autoevaluación' | 'Bibliografía' | 'Ejercitación';

interface ContentTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  availableTabs: TabType[];
}

export default function ContentTabs({ activeTab, setActiveTab, availableTabs }: ContentTabsProps) {
  if (availableTabs.length === 0) return null;

  return (
    <div className="content-tabs-container">
      <div className="content-tabs">
        {availableTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-button ${activeTab === tab ? 'active' : ''}`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTabIndicator"
                className="active-tab-indicator"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
      
      <style jsx>{`
        .content-tabs-container {
          width: 100%;
          border-top: 1px solid var(--border-color);
          background: var(--card-bg);
          overflow-x: auto;
          scrollbar-width: none;
        }
        .content-tabs-container::-webkit-scrollbar {
          display: none;
        }
        .content-tabs {
          display: flex;
          justify-content: flex-start;
          gap: 1.5rem;
          padding: 0 1.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .tab-button {
          background: none;
          border: none;
          padding: 1rem 0.5rem;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-color);
          opacity: 0.7;
          cursor: pointer;
          position: relative;
          white-space: nowrap;
          transition: var(--transition);
        }
        .tab-button:hover {
          opacity: 1;
        }
        .tab-button.active {
          opacity: 1;
          color: var(--primary-color);
          font-weight: 600;
        }
        .active-tab-indicator {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: var(--primary-color);
          border-radius: 3px 3px 0 0;
        }
      `}</style>
    </div>
  );
}
