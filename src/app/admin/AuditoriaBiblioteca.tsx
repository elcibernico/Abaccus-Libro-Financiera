'use client';

import React, { useState, useEffect } from 'react';
import { ObraBiblioteca } from '@/database/dimensions/biblioteca_dim';
import { ValoracionBiblioteca } from '@/database/facts/ratings_fact';
import { fetchObras, subscribeToRatings } from '@/modules/biblioteca/services/supabaseBibliotecaService';

export default function AuditoriaBiblioteca() {
  const [obras, setObras] = useState<ObraBiblioteca[]>([]);
  const [ratings, setRatings] = useState<ValoracionBiblioteca[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar las obras una vez al montar para traducción de IDs a Títulos
  useEffect(() => {
    async function loadObras() {
      const loadedObras = await fetchObras();
      setObras(loadedObras);
    }
    loadObras();
  }, []);

  // Suscribirse a las valoraciones en tiempo real (Supabase Realtime)
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToRatings((realtimeRatings) => {
      setRatings(realtimeRatings);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Auxiliar para obtener el nombre del libro por ID
  const getObraTitle = (idObra: string) => {
    const obra = obras.find((o) => o.id === idObra);
    return obra ? obra.tituloObra : `Obra ID: ${idObra}`;
  };

  // Formatear fecha
  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });
    } catch {
      return isoString;
    }
  };

  return (
    <div style={{ color: 'var(--text-color)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h2 style={{ color: 'var(--text-color)', fontSize: '20px', fontWeight: 600, margin: '0 0 4px 0' }}>
          Auditoría de Valoraciones
        </h2>
        <p style={{ color: 'var(--text-color)', fontSize: '13px', margin: 0 }}>
          Supervisión administrativa de las puntuaciones emitidas por los alumnos en la Biblioteca Digital.
        </p>
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-color)', padding: '40px 0', textAlign: 'center' }}>
          Cargando auditoría de ratings...
        </div>
      ) : ratings.length === 0 ? (
        <div
          style={{
            padding: '40px 20px',
            backgroundColor: 'var(--card-bg)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            textAlign: 'center',
            color: 'var(--text-color)',
          }}
        >
          No hay valoraciones registradas en el sistema todavía.
        </div>
      ) : (
        <div
          style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-color)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Usuario (Email)</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Obra Valorada</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'center' }}>Puntuación</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Fecha y Hora</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>UID Usuario</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((rating) => (
                  <tr
                    key={rating.id}
                    style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.15s ease' }}
                    className="admin-table-row"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px', color: 'var(--primary-color)', fontWeight: 500 }}>
                      {rating.emailUsuario}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-color)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={getObraTitle(rating.idObra)}>
                      {getObraTitle(rating.idObra)}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'center', color: '#FFB800', fontSize: '15px' }}>
                      {'★'.repeat(rating.estrellas)}
                      <span style={{ color: '#4E4E5A' }}>{'★'.repeat(5 - rating.estrellas)}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-color)' }}>
                      {formatDate(rating.fecha)}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-color)', fontFamily: 'monospace', fontSize: '11px' }}>
                      {rating.idUsuario}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
