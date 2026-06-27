import React from 'react';
import { ObraBiblioteca } from '@/database/dimensions/biblioteca_dim';
import { ValoracionBiblioteca } from '@/database/facts/ratings_fact';

interface ObraCardProps {
  obra: ObraBiblioteca;
  ratings: ValoracionBiblioteca[];
  onSelect: (obra: ObraBiblioteca) => void;
}

export default function ObraCard({ obra, ratings, onSelect }: ObraCardProps) {
  // Calcular valoraciones
  const obraRatings = ratings.filter((r) => r.idObra === obra.id);
  const totalVotos = obraRatings.length;
  const promedio =
    totalVotos > 0
      ? (obraRatings.reduce((acc, curr) => acc + curr.estrellas, 0) / totalVotos).toFixed(1)
      : '0.0';

  // Badge de categoría
  const isBasica = obra.categoria.toLowerCase().includes('básica') || obra.categoria.toLowerCase().includes('obligatoria');

  return (
    <div
      onClick={() => onSelect(obra)}
      style={{
        backgroundColor: '#1E1E24',
        border: '1px solid #2D2D35',
        borderRadius: '8px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
      className="obra-card"
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = '#00C896';
        e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 200, 150, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = '#2D2D35';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Cabecera: Categoría y Estrellas */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            padding: '3px 8px',
            borderRadius: '4px',
            backgroundColor: isBasica ? 'rgba(0, 200, 150, 0.12)' : 'rgba(142, 142, 159, 0.15)',
            color: isBasica ? '#00C896' : '#8E8E9F',
            letterSpacing: '0.5px'
          }}
        >
          {obra.categoria}
        </span>

        {/* Rating al lado del título (o en la esquina) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#FFB800', fontSize: '14px' }}>★</span>
          <span style={{ color: '#EAEAEA', fontSize: '12px', fontWeight: 600 }}>{promedio}</span>
          <span style={{ color: '#8E8E9F', fontSize: '10px' }}>({totalVotos})</span>
        </div>
      </div>

      {/* Título de la obra */}
      <h3
        style={{
          color: '#FFF',
          fontSize: '15px',
          fontWeight: 600,
          margin: 0,
          lineHeight: '1.4',
        }}
      >
        {obra.tituloObra}
      </h3>

      {/* Autores */}
      <p style={{ color: '#C8C8D2', fontSize: '12px', margin: 0, fontStyle: 'italic' }}>
        {obra.autores}
      </p>

      {/* Footer de la tarjeta: Año y Unidad */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          color: '#8E8E9F',
          marginTop: 'auto',
          paddingTop: '8px',
          borderTop: '1px solid #2D2D35',
        }}
      >
        <span>Unidad: {obra.unidadTematica}</span>
        <span>Año: {obra.anioEdicion}</span>
      </div>
    </div>
  );
}
