'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import config from '../../../data_content/locales/config.json';

import { usePreferences } from '@/modules/libro_financiero/components/UserPreferencesProvider';
import { useNavigation } from '@/modules/libro_financiero/components/NavigationProvider';

export default function Header() {
  const { theme, toggleTheme } = usePreferences();
  const { toggleSidebar } = useNavigation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoUrl = theme === 'dark' 
    ? config.header.logoDarkModeUrl 
    : config.header.logoLightModeUrl;

  return (
    <header className={`header-main ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        {/* Lado Izquierdo: Logo y 3 Líneas de Título */}
        <div className="header-left">
          <button 
            className="menu-toggle-btn" 
            onClick={toggleSidebar} 
            aria-label="Toggle menu"
            title="Abrir/Cerrar Menú del Programa"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div 
            className="logo-wrapper" 
            onClick={toggleSidebar} 
            style={{ cursor: 'pointer' }}
            title="Contraer / Expandir Menú Lateral"
          >
            <Image 
              src={logoUrl} 
              alt="Logo Principal" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="header-titles">
            <h1 className="title-line-1">
              <span className="desktop-title">{config.header.titleLine1}</span>
              <span className="mobile-title">Matemática Financiera</span>
            </h1>
            <h2 className="title-line-2">{config.header.titleLine2}</h2>
            <h3 className="title-line-3">{config.header.titleLine3}</h3>
          </div>
        </div>

        {/* Lado Derecho: Acciones / Toggle de Tema */}
        <div className="header-right">
          {toggleTheme && (
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme} 
              aria-label="Cambiar tema"
              title="Cambiar Modo Claro/Oscuro"
            >
              {theme === 'light' ? (
                // Icono de Luna 🌙
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              ) : (
                // Icono de Sol ☀️
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              )}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .header-main {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          background-color: var(--card-bg);
          border-bottom: 1px solid var(--border-color);
          padding: 1rem 2rem;
          transition: var(--transition);
        }
        .header-main.scrolled {
          padding: 0.6rem 2rem;
          box-shadow: var(--shadow-md);
        }
        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .logo-wrapper {
          position: relative;
          height: 64px;
          width: 64px;
          transition: var(--transition);
        }
        .header-main.scrolled .logo-wrapper {
          height: 48px;
          width: 48px;
        }
        .header-titles {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          transition: var(--transition);
        }
        .title-line-1 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-color);
          line-height: 1.25;
        }
        .title-line-2 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--primary-color);
          line-height: 1.2;
          transition: var(--transition);
        }
        .title-line-3 {
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-color);
          opacity: 0.65;
          line-height: 1.2;
          transition: var(--transition);
        }
        .mobile-title {
          display: none;
        }
        .desktop-title {
          display: inline;
        }
        /* Colapsar líneas secundarias en scroll */
        .header-main.scrolled .title-line-2,
        .header-main.scrolled .title-line-3 {
          opacity: 0;
          height: 0;
          overflow: hidden;
          margin: 0;
          transform: translateY(-5px);
        }
        .menu-toggle-btn {
          display: none;
          background: transparent;
          color: var(--text-color);
          opacity: 0.8;
          border: none;
          padding: 0.5rem;
          cursor: pointer;
          transition: var(--transition);
          align-items: center;
          justify-content: center;
          margin-right: 0.1rem;
        }
        .menu-toggle-btn:hover {
          color: var(--primary-color);
          opacity: 1;
          transform: scale(1.1);
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .theme-toggle-btn {
          background: transparent;
          color: var(--text-color);
          opacity: 0.8;
          border: none;
          padding: 0.5rem;
          border-radius: var(--radius);
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .theme-toggle-btn:hover {
          color: var(--primary-color);
          opacity: 1;
          transform: scale(1.1);
        }
        @media (max-width: 768px) {
          .header-main {
            padding: 0.5rem 1rem !important;
            height: 60px !important;
          }
          .header-main.scrolled {
            padding: 0.5rem 1rem !important;
            height: 60px !important;
          }
          .title-line-1 { font-size: 1rem !important; }
          .title-line-2 { display: none !important; }
          .title-line-3 { display: none !important; }
          .mobile-title { display: inline !important; }
          .desktop-title { display: none !important; }
          .logo-wrapper {
            height: 36px !important;
            width: 36px !important;
          }
          .menu-toggle-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
}
