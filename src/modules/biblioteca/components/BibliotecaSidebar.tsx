import React from 'react';
import { Search } from 'lucide-react';
import { SearchFilters } from '../services/searchEngine';

interface BibliotecaSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onQueryChange: (q: string) => void;
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function BibliotecaSidebar({
  isOpen,
  onClose,
  query,
  onQueryChange,
  filters,
  onFilterChange,
  sortBy,
  onSortChange
}: BibliotecaSidebarProps) {
  const toggleFilter = (key: keyof SearchFilters) => {
    onFilterChange({
      ...filters,
      [key]: !filters[key]
    });
  };

  const filterLabels: { key: keyof SearchFilters; label: string }[] = [
    { key: 'tituloObra', label: 'Título' },
    { key: 'autores', label: 'Autor' },
    { key: 'unidadTematica', label: 'Unidad' },
    { key: 'editorialLugar', label: 'Editorial' },
    { key: 'tags', label: 'Temas/Tags' },
  ];

  return (
    <aside
      style={{
        width: '320px',
        backgroundColor: 'var(--bg-color)',
        borderRight: '1px solid var(--border-color)',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: isOpen ? 0 : '-320px',
        zIndex: 1000,
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: isOpen ? '10px 0 30px rgba(0, 0, 0, 0.3)' : 'none',
      }}
    >
      {/* Header Sidebar — siempre visible, usa padding-top para respetar el header de la app */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px',
          paddingTop: 'calc(var(--header-height, 120px) + 20px)',
          borderBottom: '1px solid var(--border-color)',
          flexShrink: 0,
        }}
      >
        <span style={{ color: 'var(--text-color)', fontWeight: 700, fontSize: '16px', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Search size={18} strokeWidth={1.75} />
          BUSCADOR DIGITAL
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-color)',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px',
            lineHeight: 1,
          }}
          title="Cerrar panel"
        >
          ×
        </button>
      </div>

      {/* Contenido del Buscador */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
        
        {/* Campo de búsqueda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '11px', color: 'var(--text-color)', fontWeight: 600 }}>
            TÉRMINO A BUSCAR
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Escribe autor, tema o palabra clave..."
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-color)',
              fontSize: '13px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--primary-color)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
          />
        </div>

        {/* Botones de segmentación (Toggles) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ fontSize: '11px', color: 'var(--text-color)', fontWeight: 600 }}>
            RESTRINGIR BÚSQUEDA POR (METADATO)
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {filterLabels.map(({ key, label }) => {
              const active = filters[key];
              return (
                <button
                  key={key}
                  onClick={() => toggleFilter(key)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '20px',
                    border: '1px solid',
                    borderColor: active ? 'var(--primary-color)' : 'var(--border-color)',
                    backgroundColor: active ? 'rgba(0, 200, 150, 0.1)' : 'var(--card-bg)',
                    color: active ? 'var(--primary-color)' : 'var(--text-color)',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {active && <span style={{ fontSize: '10px' }}>✓</span>}
                  {label}
                </button>
              );
            })}
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-color)', fontStyle: 'italic', marginTop: '4px' }}>
            * Si todos están desactivados, se realiza una búsqueda general de texto.
          </span>
        </div>

        {/* Criterio de Ordenamiento */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '11px', color: 'var(--text-color)', fontWeight: 600 }}>
            ORDENAR RESULTADOS POR:
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              padding: '12px 14px',
              backgroundColor: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '6px',
              color: 'var(--text-color)',
              fontSize: '13px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="titulo">Título (A-Z)</option>
            <option value="autor">Autor</option>
            <option value="tema">Unidad Temática</option>
            <option value="valoracion">Valoración (Estrellas)</option>
            <option value="anio">Año de Publicación</option>
          </select>
        </div>

      </div>
    </aside>
  );
}
