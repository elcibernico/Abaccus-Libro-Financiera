import React from 'react';
import { ObraBiblioteca } from '@/database/dimensions/biblioteca_dim';
import { ValoracionBiblioteca } from '@/database/facts/ratings_fact';
import StarRatingInteraction from './StarRatingInteraction';

interface ObraDetalleProps {
  obra: ObraBiblioteca;
  ratings: ValoracionBiblioteca[];
  onBack: () => void;
  onRead: (obra: ObraBiblioteca) => void;
  onRate: (idObra: string, rating: number) => void;
}

export default function ObraDetalle({
  obra,
  ratings,
  onBack,
  onRead,
  onRate
}: ObraDetalleProps) {
  // Filtrar valoraciones y sacar promedio
  const obraRatings = ratings.filter((r) => r.idObra === obra.id);
  const totalVotos = obraRatings.length;
  const promedio =
    totalVotos > 0
      ? (obraRatings.reduce((acc, curr) => acc + curr.estrellas, 0) / totalVotos).toFixed(1)
      : '0.0';

  return (
    <div
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '24px',
        color: 'var(--text-color)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      {/* Botón de retroceso */}
      <button
        onClick={onBack}
        style={{
          alignSelf: 'flex-start',
          background: 'none',
          border: 'none',
          color: 'var(--primary-color)',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: 0,
        }}
      >
        ← Volver al listado
      </button>

      {/* Cabecera del detalle */}
      <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
        <h2 style={{ color: 'var(--text-color)', fontSize: '22px', margin: '0 0 8px 0', fontWeight: 700, lineHeight: 1.3 }}>
          {obra.tituloObra}
        </h2>
        <p style={{ color: 'var(--text-color)', fontSize: '15px', margin: '0 0 12px 0', fontStyle: 'italic' }}>
          Por {obra.autores}
        </p>

        {/* Bloque de Calificación y Promedio */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            backgroundColor: 'var(--bg-color)',
            padding: '12px 16px',
            borderRadius: '6px',
            marginTop: '12px',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-color)', display: 'block', marginBottom: '2px' }}>
              CALIFICACIÓN GENERAL
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#FFB800', fontSize: '18px' }}>★</span>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: 'var(--text-color)' }}>{promedio}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-color)' }}>({totalVotos} valoraciones)</span>
            </div>
          </div>

          <div style={{ height: '30px', width: '1px', backgroundColor: 'var(--border-color)' }} />

          <div>
            <span style={{ fontSize: '11px', color: 'var(--text-color)', display: 'block', marginBottom: '4px' }}>
              ¿QUÉ TE PARECIÓ ESTA OBRA?
            </span>
            <StarRatingInteraction
              initialRating={0}
              onRate={(val) => onRate(obra.id, val)}
            />
          </div>
        </div>
      </div>

      {/* Grid de Metadatos de Segmentación */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-color)' }}>Categoría de Bibliografía</span>
          <span style={{ fontSize: '13px', color: 'var(--text-color)', fontWeight: 500 }}>{obra.categoria}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-color)' }}>Unidad Temática</span>
          <span style={{ fontSize: '13px', color: 'var(--text-color)', fontWeight: 500 }}>{obra.unidadTematica}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-color)' }}>Año de Publicación</span>
          <span style={{ fontSize: '13px', color: 'var(--text-color)', fontWeight: 500 }}>{obra.anioEdicion}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-color)' }}>Editorial y Origen</span>
          <span style={{ fontSize: '13px', color: 'var(--text-color)', fontWeight: 500 }}>{obra.editorialLugar}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-color)' }}>Sección / Capítulo</span>
          <span style={{ fontSize: '13px', color: 'var(--text-color)', fontWeight: 500 }}>{obra.capituloSeccion}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-color)' }}>Rango de Páginas</span>
          <span style={{ fontSize: '13px', color: 'var(--text-color)', fontWeight: 500 }}>{obra.rangoPaginas}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-color)' }}>Tipo de Recurso / Formato</span>
          <span style={{ fontSize: '13px', color: 'var(--text-color)', fontWeight: 500 }}>
            {obra.tipoRecurso} ({obra.formato})
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-color)' }}>Vínculo Web Recomendado</span>
          {obra.vinculoWeb !== 'N/A' ? (
            <a
              href={obra.vinculoWeb}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '13px', color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 500 }}
            >
              Acceder a enlace externo ↗
            </a>
          ) : (
            <span style={{ fontSize: '13px', color: 'var(--text-color)' }}>N/A</span>
          )}
        </div>
      </div>

      {/* Etiquetas / Palabras Clave */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <span style={{ fontSize: '11px', color: 'var(--text-color)' }}>Palabras Clave (Tags)</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {obra.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                backgroundColor: 'var(--border-color)',
                color: 'var(--text-color)',
                borderRadius: '12px',
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Botón de acción principal: Leer */}
      <button
        onClick={() => onRead(obra)}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: 'var(--primary-color)',
          color: 'var(--text-color)',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.2s ease, transform 0.1s ease',
          boxShadow: '0 4px 15px rgba(0, 200, 150, 0.2)',
          marginTop: '10px',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-color)')}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.98)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        📖 Leer Obra Completa
      </button>
    </div>
  );
}
