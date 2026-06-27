import React from 'react';
import { ObraBiblioteca } from '@/database/dimensions/biblioteca_dim';
import { ValoracionBiblioteca } from '@/database/facts/ratings_fact';
import ObraCard from './ObraCard';

interface ObraListProps {
  obras: ObraBiblioteca[];
  ratings: ValoracionBiblioteca[];
  onSelect: (obra: ObraBiblioteca) => void;
}

export default function ObraList({ obras, ratings, onSelect }: ObraListProps) {
  if (obras.length === 0) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
          backgroundColor: 'var(--card-bg)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          textAlign: 'center',
          color: 'var(--text-color)',
        }}
      >
        <span style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</span>
        <h4 style={{ color: 'var(--text-color)', margin: '0 0 8px 0', fontSize: '16px' }}>
          No se encontraron obras
        </h4>
        <p style={{ fontSize: '13px', margin: 0 }}>
          Prueba cambiando los términos de búsqueda o desactivando algunos filtros.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
        width: '100%',
      }}
    >
      {obras.map((obra) => (
        <ObraCard
          key={obra.id}
          obra={obra}
          ratings={ratings}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
