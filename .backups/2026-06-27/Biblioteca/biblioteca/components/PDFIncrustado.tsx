'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

interface PDFIncrustadoProps {
  id: string;
  googleDriveId: string;
  titulo: string;
  onClose: () => void;
}

export default function PDFIncrustado({ id, googleDriveId, titulo, onClose }: PDFIncrustadoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [numPages, setNumPages] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [errorLoading, setErrorLoading] = useState<string | null>(null);
  const [scrollAreaWidth, setScrollAreaWidth] = useState<number>(0);

  // Medir el ancho disponible del área de scroll en tiempo real
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setScrollAreaWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    setScrollAreaWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const pdfUrl = `/api/biblioteca/pdf/${googleDriveId}`;

  // Detectar qué página es visible al hacer scroll
  const handleScroll = useCallback(() => {
    if (!scrollRef.current || !numPages) return;
    const scrollTop = scrollRef.current.scrollTop;
    const containerHeight = scrollRef.current.clientHeight;

    let bestPage = 1;
    let bestVisibility = -1;

    pageRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const pageTop = ref.offsetTop - scrollTop;
      const pageBottom = pageTop + ref.clientHeight;
      const visible = Math.min(pageBottom, containerHeight) - Math.max(pageTop, 0);
      if (visible > bestVisibility) {
        bestVisibility = visible;
        bestPage = idx + 1;
      }
    });

    setCurrentPage(bestPage);
  }, [numPages]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Ir a una página específica
  const goToPage = (page: number) => {
    if (!numPages) return;
    const clamped = Math.max(1, Math.min(page, numPages));
    const ref = pageRefs.current[clamped - 1];
    if (ref && scrollRef.current) {
      scrollRef.current.scrollTo({ top: ref.offsetTop - 16, behavior: 'smooth' });
    }
  };

  // Pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleMaximize = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    pageRefs.current = new Array(numPages).fill(null);
    setErrorLoading(null);
  };

  const onDocumentLoadError = (err: Error) => {
    console.error('Error al renderizar PDF con react-pdf:', err);
    setErrorLoading('No se pudo cargar el visor de seguridad. Verificá los permisos del documento en Google Drive.');
  };

  return (
    <div
      ref={containerRef}
      onContextMenu={(e) => e.preventDefault()}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: '650px',
        backgroundColor: 'var(--card-bg)',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        border: '1px solid var(--border-color)',
        userSelect: 'text',
      }}
    >
      {/* ─── BARRA DE HERRAMIENTAS ─── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        backgroundColor: 'var(--bg-color)',
        borderBottom: '1px solid var(--border-color)',
        flexWrap: 'wrap',
        gap: '10px',
        flexShrink: 0,
      }}>
        {/* Título */}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '35%' }}>
          <span style={{ color: 'var(--text-color)', fontWeight: 700, fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {titulo}
          </span>
          <span style={{ color: 'var(--primary-color)', fontSize: '11px', fontWeight: 600 }}>
            Visor Seguro — Descargas bloqueadas
          </span>
        </div>

        {/* Indicador de página + zoom */}
        {!errorLoading && numPages && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Selector de página */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button className="toolbar-btn" onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}>◀</button>
              <span style={{ fontSize: '12px', color: 'var(--text-color)', minWidth: '80px', textAlign: 'center' }}>
                Pág. {currentPage} de {numPages}
              </span>
              <button className="toolbar-btn" onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= numPages}>▶</button>
            </div>

            <div style={{ width: '1px', height: '18px', backgroundColor: 'var(--border-color)' }} />

            {/* Zoom */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button className="toolbar-btn" onClick={() => setScale(s => Math.max(0.6, +(s - 0.1).toFixed(1)))} title="Alejar">−</button>
              <span style={{ fontSize: '12px', color: 'var(--text-color)', minWidth: '42px', textAlign: 'center' }}>
                {Math.round(scale * 100)}%
              </span>
              <button className="toolbar-btn" onClick={() => setScale(s => Math.min(2.0, +(s + 0.1).toFixed(1)))} title="Acercar">+</button>
            </div>
          </div>
        )}

        {/* Acciones */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleMaximize}
            style={{ padding: '7px 13px', backgroundColor: 'var(--border-color)', color: 'var(--text-color)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
          >
            {isFullscreen ? 'Restaurar' : 'Pantalla completa'}
          </button>
          <button
            onClick={onClose}
            style={{ padding: '7px 13px', backgroundColor: '#C80036', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#A5002C'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#C80036'}
          >
            Cerrar
          </button>
        </div>
      </div>

      {/* ─── ÁREA DE SCROLL CONTINUO ─── */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          backgroundColor: '#6b6b6b',
          padding: '24px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
        }}
      >
        {errorLoading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginTop: '100px', padding: '0 24px', textAlign: 'center' }}>
            <span style={{ color: '#ef4444', fontWeight: 600, fontSize: '15px' }}>⚠️ {errorLoading}</span>
            <span style={{ color: '#ccc', fontSize: '12px' }}>
              Asegurate de haber compartido la carpeta con el robot{' '}
              <code style={{ backgroundColor: '#444', padding: '2px 6px', borderRadius: '4px' }}>
                robot-biblioteca@dashboard-adsf.iam.gserviceaccount.com
              </code>
            </span>
          </div>
        ) : (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={
              <div style={{ color: '#fff', padding: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '32px', height: '32px', border: '3px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                <span style={{ fontSize: '14px' }}>Cargando de forma segura...</span>
              </div>
            }
          >
            {/* Renderizar TODAS las páginas seguidas para scroll continuo */}
            {numPages && Array.from({ length: numPages }, (_, i) => (
              <div
                key={`page_${i + 1}`}
                ref={el => { pageRefs.current[i] = el; }}
                style={{ marginBottom: '12px' }}
              >
                <Page
                  pageNumber={i + 1}
                  // En fullscreen: la página ocupa todo el ancho menos padding.
                  // En modo normal: se usa scale clásico.
                  {...(isFullscreen && scrollAreaWidth > 0
                    ? { width: Math.floor((scrollAreaWidth - 48) * scale) }
                    : { scale }
                  )}
                  renderTextLayer={true}
                  renderAnnotationLayer={false}
                  loading={
                    <div style={{
                      width: isFullscreen && scrollAreaWidth > 0
                        ? `${Math.floor((scrollAreaWidth - 48) * scale)}px`
                        : `${Math.round(595 * scale)}px`,
                      height: `${Math.round(842 * scale)}px`,
                      backgroundColor: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#999',
                      fontSize: '13px',
                    }}>
                      Cargando página {i + 1}...
                    </div>
                  }
                />
              </div>
            ))}
          </Document>
        )}
      </div>

      <style jsx>{`
        .toolbar-btn {
          background: var(--border-color);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          padding: 5px 11px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          transition: background-color 0.15s;
        }
        .toolbar-btn:hover:not(:disabled) {
          background-color: var(--card-bg);
        }
        .toolbar-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
