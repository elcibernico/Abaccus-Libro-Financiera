'use client';
import { useState, useEffect } from 'react';
import { Sun, Moon, GraduationCap, Sparkles } from 'lucide-react';
import { usePreferences } from './UserPreferencesProvider';
import config from '@/config.json';
import Image from 'next/image';

export default function Header() {
  const { theme, toggleTheme, learningMode, setLearningMode } = usePreferences();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoUrl = theme === 'dark' ? config.header.logoDarkModeUrl : config.header.logoLightModeUrl;

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="header-content">
        <div className="header-left">
          <div style={{ position: 'relative', height: scrolled ? '50px' : '80px', width: scrolled ? '50px' : '80px', transition: 'var(--transition)' }}>
            <Image 
              src={logoUrl} 
              alt="Logo" 
              fill 
              style={{ objectFit: 'contain' }}
              className="logo"
            />
          </div>
          <div className="header-titles">
            <span className="title-line-1">{config.header.titleLine1}</span>
            <span className="title-line-2">{config.header.titleLine2}</span>
            <span className="title-line-3">{config.header.titleLine3}</span>
          </div>
        </div>

        <div className="header-right">
          {/* Learning Mode Toggle */}
          <div style={{ display: 'flex', background: 'var(--bg-color)', padding: '0.25rem', borderRadius: '0.75rem', gap: '0.25rem' }}>
            <button 
              className={`btn-secondary ${learningMode === 'essential' ? 'active' : ''}`}
              onClick={() => setLearningMode('essential')}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
            >
              <GraduationCap size={16} />
              <span className="hide-mobile">Esencial</span>
            </button>
            <button 
              className={`btn-secondary ${learningMode === 'expert' ? 'active' : ''}`}
              onClick={() => setLearningMode('expert')}
              style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
            >
              <Sparkles size={16} />
              <span className="hide-mobile">Experto</span>
            </button>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-color)', margin: '0 0.5rem' }} />

          {/* Theme Toggle */}
          <button className="btn-secondary" onClick={toggleTheme} title="Cambiar tema">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none; }
          .header-titles { display: ${scrolled ? 'none' : 'flex'}; }
        }
      `}</style>
    </header>
  );
}
