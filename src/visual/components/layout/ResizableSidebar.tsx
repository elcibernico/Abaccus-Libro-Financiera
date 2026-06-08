'use client';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ResizableSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export default function ResizableSidebar({
  isOpen,
  setIsOpen,
  title,
  children
}: ResizableSidebarProps) {
  const [width, setWidth] = useState(300);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--sidebar-width', isOpen ? `${width}px` : '0px');
    }
  }, [width, isOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;
      // Limitar el ancho entre 240px y 480px
      const newWidth = Math.max(240, Math.min(480, e.clientX));
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  return (
    <>
      {/* Sidebar Flotante/Colapsable con Glassmorphism */}
      <aside
        className={`resizable-sidebar-container ${isOpen ? 'open' : 'closed'} ${isResizing ? 'resizing' : ''}`}
        style={{ width: isOpen ? `${width}px` : '0px' }}
      >
        <div className="sidebar-inner">
          <div className="sidebar-header-section">
            <h4>{title}</h4>
          </div>
          <div className="sidebar-content-scroll">
            {children}
          </div>
        </div>

        {/* Resizer Handle */}
        {isOpen && (
          <div
            className={`resizable-sidebar-handle ${isResizing ? 'active' : ''}`}
            onMouseDown={startResizing}
            title="Arrastra para redimensionar"
          />
        )}
      </aside>

      {/* Botón Flotante para Abrir/Cerrar el Sidebar si no está abierto */}
      <button
        className={`sidebar-toggle-trigger ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? "Ocultar Menú" : "Mostrar Menú"}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Backdrop en Mobile */}
      {isOpen && (
        <div
          className="resizable-sidebar-backdrop"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* CSS Encapsulado */}
      <style jsx>{`
        .resizable-sidebar-container {
          position: fixed;
          top: 80px;
          left: 0;
          height: calc(100vh - 80px);
          z-index: 900;
          background: var(--sidebar-bg-glass, rgba(255, 255, 255, 0.75));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-right: 1px solid var(--border-color, rgba(0,0,0,0.1));
          box-shadow: 4px 0 24px var(--shadow-color-light, rgba(0,0,0,0.02));
          transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease;
          display: flex;
          flex-direction: column;
          color: var(--text-color);
        }

        @media (min-width: 769px) {
          .resizable-sidebar-container {
            position: sticky;
            top: 80px;
            height: calc(100vh - 80px);
          }
        }

        :global([data-theme='dark']) .resizable-sidebar-container {
          background: var(--sidebar-bg-glass-dark, rgba(28, 28, 30, 0.9));
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);
          color: var(--text-color);
        }

        .resizable-sidebar-container.resizing {
          transition: none; /* Desactivar transición durante el arrastre */
        }

        .resizable-sidebar-container.resizing + .sidebar-toggle-trigger {
          transition: none !important; /* El botón sigue al cursor instantáneamente */
        }

        .resizable-sidebar-container.closed {
          transform: translateX(-100%);
          width: 0 !important;
        }

        .sidebar-inner {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: calc(100% - 8px); /* Dejar espacio libre para que el resizer no pise el scrollbar */
          overflow: hidden;
        }

        .sidebar-header-section {
          padding: 1.25rem 1.5rem 1.25rem 3.5rem; /* Espacio para el botón circular a la izquierda */
          border-bottom: 1px solid var(--border-color, rgba(0,0,0,0.1));
        }

        .sidebar-header-section h4 {
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--primary-color, #4f46e5);
          margin: 0;
        }

        .sidebar-content-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
        }

        /* Estilo moderno y limpio para scrollbars */
        .sidebar-content-scroll::-webkit-scrollbar {
          width: 6px;
          transition: width 0.2s ease;
        }
        /* Cuando el usuario se posiciona sobre el área de scroll o el menú, el scrollbar se ensancha */
        .sidebar-content-scroll:hover::-webkit-scrollbar,
        .sidebar-content-scroll::-webkit-scrollbar:hover {
          width: 12px;
        }
        .sidebar-content-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-content-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          transition: background-color 0.2s;
        }
        :global([data-theme='dark']) .sidebar-content-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.25);
        }
        /* Pintar de verde cuando se posiciona sobre el scrollbar thumb */
        .sidebar-content-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--primary-color, #10b981) !important;
        }

        /* Handle de redimensionamiento */
        .resizable-sidebar-handle {
          position: absolute;
          top: 0;
          right: 0;
          width: 8px;
          height: 100%;
          cursor: col-resize;
          z-index: 1001;
          transition: background-color 0.2s;
        }

        .resizable-sidebar-handle:hover,
        .resizable-sidebar-handle.active {
          background-color: var(--primary-color, #10b981);
        }

        /* Botón de gatillo flotante (Trigger) - Siempre a la izquierda */
        .sidebar-toggle-trigger {
          position: fixed;
          left: 12px;
          top: 92px; /* Centrado verticalmente con el título del menú */
          z-index: 1002; /* Por encima del menú lateral */
          width: 32px;
          height: 32px;
          background: var(--primary-color, #10b981);
          color: white;
          border: none;
          border-radius: 50%; /* Botón circular premium */
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s, background-color 0.2s;
        }

        .sidebar-toggle-trigger:hover {
          transform: scale(1.1);
          background-color: var(--primary-hover, #059669);
        }

        /* Mobile specific styling */
        @media (max-width: 768px) {
          .resizable-sidebar-container {
            position: fixed !important; /* Siempre fijo en móvil */
            top: 60px;
            height: calc(100vh - 60px);
            width: 85vw !important;
            max-width: 320px;
          }
          .resizable-sidebar-handle {
            display: none; /* Sin redimensionar en móviles */
          }
          .resizable-sidebar-backdrop {
            position: fixed;
            top: 60px;
            left: 0;
            width: 100vw;
            height: calc(100vh - 60px);
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            z-index: 850;
          }
          .sidebar-toggle-trigger {
            top: 72px;
            left: 12px;
          }
        }
      `}</style>
    </>
  );
}
