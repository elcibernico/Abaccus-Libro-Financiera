'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/core/security/supabaseClient';
import { mapObraFromDb } from '../services/supabaseBibliotecaService';
import { ObraBiblioteca } from '@/database/dimensions/biblioteca_dim';

interface FullscreenPDFReaderProps {
  id: string;
}

export default function FullscreenPDFReader({ id }: FullscreenPDFReaderProps) {
  const [obra, setObra] = useState<ObraBiblioteca | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadObra() {
      try {
        const { data, error } = await supabase
          .from('biblioteca_obras')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (data) {
          setObra(mapObraFromDb(data));
        }
      } catch (err) {
        console.error('Error al cargar la obra para lectura:', err);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadObra();
    }
  }, [id]);

  const handleClose = () => {
    // Si se abrió con target="_blank", intentamos cerrar la pestaña, sino redirigimos
    if (window.history.length > 1) {
      window.close();
    } else {
      router.push('/biblioteca');
    }
  };

  const getDriveEmbedUrl = (val: string) => {
    if (!val) return '';
    if (val.includes('drive.google.com')) {
      const match = val.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }
    return `https://drive.google.com/file/d/${val}/preview`;
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-color)',
        fontFamily: 'sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div className="animate-spin" style={{
            border: '4px solid rgba(255, 255, 255, 0.1)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            borderLeftColor: 'var(--primary-color)',
            margin: '0 auto 16px auto',
            animation: 'spin 1s linear infinite'
          }}></div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
          <p>Cargando lector seguro...</p>
        </div>
      </div>
    );
  }

  if (!obra) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'var(--card-bg)',
        color: 'var(--text-color)',
        fontFamily: 'sans-serif',
        gap: '16px'
      }}>
        <h2>Obra no encontrada</h2>
        <p>No se pudo recuperar la obra solicitada.</p>
        <button 
          onClick={handleClose}
          style={{
            padding: '10px 20px',
            backgroundColor: 'var(--primary-color)',
            color: 'var(--text-color)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cerrar Lector
        </button>
      </div>
    );
  }

  const embedUrl = getDriveEmbedUrl(obra.googleDriveId);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'var(--card-bg)',
      overflow: 'hidden',
      fontFamily: 'sans-serif'
    }}>
      {/* Header flotante */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px',
        backgroundColor: 'var(--bg-color)',
        borderBottom: '1px solid var(--border-color)',
        zIndex: 10
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '16px', color: 'var(--text-color)', fontWeight: 600 }}>
            {obra.tituloObra}
          </h1>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: 'var(--text-color)' }}>
            {obra.autores} • {obra.unidadTematica}
          </p>
        </div>
        <button 
          onClick={handleClose}
          style={{
            padding: '8px 16px',
            backgroundColor: '#C80036',
            color: 'var(--text-color)',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '13px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#A5002C'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#C80036'}
        >
          Salir del Lector
        </button>
      </div>

      {/* Visor Iframe */}
      <div style={{ flex: 1, position: 'relative', backgroundColor: 'var(--bg-color)' }}>
        {embedUrl ? (
          <iframe 
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            allow="autoplay; fullscreen"
            title={obra.tituloObra}
          />
        ) : (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            color: 'var(--text-color)'
          }}>
            Esta obra no cuenta con un archivo digitalizado cargado.
          </div>
        )}
      </div>
    </div>
  );
}
