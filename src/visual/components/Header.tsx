'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import config from '../../../data_content/locales/config.json';
import { usePreferences } from '@/modules/libro_financiero/components/UserPreferencesProvider';
import { signOutUser } from '@/modules/auth/controllers/oauthController';
import { supabase } from '@/core/security/supabaseClient';

export default function Header() {
  const { theme, toggleTheme } = usePreferences();
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [roleInfo, setRoleInfo] = useState<{ role: string; realRole: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Escuchar cambios de estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetch('/api/auth/me')
        .then(res => res.json())
        .then(data => {
          if (data.authenticated) {
            setRoleInfo({
              role: data.user.role,
              realRole: data.user.realRole
            });
          }
        })
        .catch(err => console.error('Error fetching role info:', err));
    } else {
      setRoleInfo(null);
    }
  }, [user]);

  const handleLogout = async () => {
    const res = await signOutUser();
    if (res.success) {
      router.push('/login');
    } else {
      alert('Error al cerrar sesión: ' + res.error);
    }
  };

  const logoUrl = theme === 'dark' 
    ? config.header.logoDarkModeUrl 
    : config.header.logoLightModeUrl;

  return (
    <header className={`header-main ${scrolled ? 'scrolled' : ''}`}>
      {roleInfo && roleInfo.role !== roleInfo.realRole && (
        <div className="impersonation-banner">
          <span>
            Simulando rol: <strong>{roleInfo.role.toUpperCase()}</strong> (Rol real: {roleInfo.realRole.toUpperCase()})
          </span>
          <button onClick={async () => {
            await fetch('/api/auth/impersonate', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ role: null })
            });
            window.location.reload();
          }} className="banner-restore-btn">
            Restaurar Rol Real
          </button>
        </div>
      )}
      <div className="header-content">
        {/* Lado Izquierdo: Logo y Títulos */}
        <div className="header-left">
          <Link href="/" className="logo-link" title="Ir al Dashboard del Ecosistema">
            <div className="logo-wrapper">
              <Image 
                src={logoUrl} 
                alt="Logo Principal" 
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>
          <div className="header-titles">
            <h1 className="title-line-1">
              <span className="desktop-title">{config.header.titleLine1}</span>
              <span className="mobile-title">Matemática Financiera</span>
            </h1>
            <h2 className="title-line-2">{config.header.titleLine2}</h2>
            <h3 className="title-line-3">{config.header.titleLine3}</h3>
          </div>
        </div>

        {/* Lado Derecho: Acciones (Notificaciones, Simular Rol, Toggle Tema, Logout) */}
        <div className="header-right">
          {user && (
            <>
              {/* 1. Botón de Notificaciones */}
              <button 
                className="header-btn notification-btn" 
                title="Notificaciones" 
                aria-label="Ver notificaciones"
                onClick={() => alert('No tienes notificaciones pendientes.')}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="tooltip-text">Notificaciones</span>
              </button>

              {/* 2. Acceso directo a Simular Rol (solo administradores/docentes) */}
              {roleInfo && ['root', 'admin', 'docente'].includes(roleInfo.realRole?.toLowerCase()) && (
                <Link 
                  href="/perfil" 
                  className="header-btn impersonate-btn" 
                  title="Simular Rol" 
                  aria-label="Ir a Simulación de Roles"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span className="tooltip-text">Simular Rol</span>
                </Link>
              )}
            </>
          )}

          {/* 3. Toggle de Tema (Modo Claro/Oscuro) */}
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

          {/* 4. Botón de Salir (Cerrar Sesión) */}
          {user && (
            <button 
              className="logout-btn" 
              onClick={handleLogout}
              title="Salir"
              aria-label="Cerrar sesión"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span className="tooltip-text">Salir</span>
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .impersonation-banner {
          background-color: #ea580c;
          color: white;
          padding: 0.5rem 2rem;
          font-size: 0.85rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          font-weight: 600;
          width: calc(100% + 4rem);
          margin-top: -1rem;
          margin-left: -2rem;
          margin-bottom: 1rem;
        }
        .header-main.scrolled .impersonation-banner {
          margin-top: -0.6rem;
          margin-bottom: 0.6rem;
        }
        .banner-restore-btn {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid white;
          color: white;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 750;
          font-size: 0.75rem;
          transition: var(--transition);
        }
        .banner-restore-btn:hover {
          background: white;
          color: #ea580c;
        }
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
        .logo-link {
          display: flex;
          align-items: center;
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
        .header-main.scrolled .title-line-2,
        .header-main.scrolled .title-line-3 {
          opacity: 0;
          height: 0;
          overflow: hidden;
          margin: 0;
          transform: translateY(-5px);
        }
        .header-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .theme-toggle-btn, .logout-btn, .header-btn {
          position: relative;
          background: transparent;
          color: var(--text-color);
          opacity: 0.85;
          border: none;
          padding: 0.6rem;
          border-radius: var(--radius, 8px);
          cursor: pointer;
          transition: var(--transition, all 0.2s ease);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
        }
        .theme-toggle-btn:hover, .header-btn:hover {
          color: var(--primary-color, #10b981);
          opacity: 1;
          transform: translateY(-2px);
          background: rgba(16, 185, 129, 0.06);
        }
        .logout-btn:hover {
          color: #ef4444;
          opacity: 1;
          transform: translateY(-2px);
          background: rgba(239, 68, 68, 0.08);
        }
        .theme-toggle-btn .tooltip-text, .logout-btn .tooltip-text, .header-btn .tooltip-text {
          visibility: hidden;
          background-color: var(--card-bg, #1e1e1e);
          color: var(--text-color, #fff);
          text-align: center;
          border-radius: 6px;
          padding: 6px 10px;
          position: absolute;
          z-index: 1001;
          top: 135%;
          left: 50%;
          transform: translateX(-50%) translateY(5px);
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          font-size: 0.75rem;
          font-weight: 600;
          pointer-events: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
          white-space: nowrap;
        }
        .theme-toggle-btn:hover .tooltip-text, .logout-btn:hover .tooltip-text, .header-btn:hover .tooltip-text {
          visibility: visible;
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        @media (max-width: 768px) {
          .logout-btn {
            padding: 0.5rem;
          }
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
        }
      `}</style>
    </header>
  );
}
