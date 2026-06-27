'use client';

import React, { useState, useEffect } from 'react';
import { ObraBiblioteca } from '@/database/dimensions/biblioteca_dim';
import { ValoracionBiblioteca } from '@/database/facts/ratings_fact';
import {
  fetchObras,
  subscribeToRatings,
  submitRating
} from '../services/supabaseBibliotecaService';
import { searchAndFilterObras, SearchFilters } from '../services/searchEngine';
import { Search } from 'lucide-react';
import BibliotecaSidebar from '../components/BibliotecaSidebar';
import ObraList from '../components/ObraList';
import ObraDetalle from '../components/ObraDetalle';
import dynamic from 'next/dynamic';

const PDFIncrustado = dynamic(() => import('../components/PDFIncrustado'), {
  ssr: false,
  loading: () => (
    <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-color)' }}>
      Cargando visor seguro...
    </div>
  ),
});

export default function BibliotecaPage() {
  // Estado de Datos
  const [obras, setObras] = useState<ObraBiblioteca[]>([]);
  const [ratings, setRatings] = useState<ValoracionBiblioteca[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Estado de Búsqueda y Filtros
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilters>({
    autores: false,
    unidadTematica: false,
    tituloObra: false,
    editorialLugar: false,
    tags: false,
  });
  const [sortBy, setSortBy] = useState<string>('titulo');

  // Estado de Navegación Interna
  const [selectedObra, setSelectedObra] = useState<ObraBiblioteca | null>(null);
  const [readingObra, setReadingObra] = useState<ObraBiblioteca | null>(null);

  // Inicializar Datos (Seed si está vacío, y luego Fetch)
  useEffect(() => {
    async function initData() {
      setLoading(true);
      const loadedObras = await fetchObras();
      setObras(loadedObras);
      setLoading(false);
    }
    
    initData();
  }, []);

  // Suscribirse a las valoraciones en tiempo real
  useEffect(() => {
    const unsubscribe = subscribeToRatings((realtimeRatings) => {
      setRatings(realtimeRatings);
    });
    
    return () => unsubscribe();
  }, []);

  // Enviar valoración
  const handleRate = async (idObra: string, estrellas: number) => {
    const success = await submitRating(idObra, estrellas);
    if (success) {
      alert(`¡Gracias por calificar la obra con ${estrellas} estrellas!`);
    } else {
      alert('Hubo un error al guardar tu puntuación. Por favor, inicia sesión.');
    }
  };

  // Filtrar y ordenar las obras
  const filteredObras = searchAndFilterObras(obras, ratings, query, filters, sortBy);

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '80vh', position: 'relative' }}>
      
      {/* Botón flotante para abrir el sidebar (Buscador) */}
      {!isSidebarOpen && !readingObra && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          style={{
            position: 'fixed',
            top: '140px', // Debajo del header principal
            left: '0px',
            width: '40px',
            height: '48px',
            borderTopRightRadius: '8px',
            borderBottomRightRadius: '8px',
            backgroundColor: 'var(--primary-color)',
            color: 'var(--text-color)',
            border: '1px solid var(--border-color)',
            borderLeft: 'none',
            cursor: 'pointer',
            boxShadow: '4px 0 10px rgba(0,0,0,0.1)',
            zIndex: 900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease, width 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.width = '48px';
            e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.width = '40px';
            e.currentTarget.style.backgroundColor = 'var(--primary-color)';
          }}
          title="Abrir Buscador"
        >
          <Search size={20} />
        </button>
      )}

      {/* Sidebar de Búsqueda */}
      <BibliotecaSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        query={query}
        onQueryChange={setQuery}
        filters={filters}
        onFilterChange={setFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Margen de desplazamiento si el sidebar está abierto (para layouts fluidos en escritorio) */}
      <div
        style={{
          flex: 1,
          padding: '24px',
          marginLeft: isSidebarOpen ? '320px' : '0',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <div style={{ color: 'var(--text-color)', marginTop: '100px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div className="spinner" style={{ width: '40px', height: '40px', border: '4px solid var(--border-color)', borderTopColor: 'var(--primary-color)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <span>Cargando biblioteca digital...</span>
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}} />
          </div>
        ) : readingObra ? (
          /* Sub-vista: Lector PDF Incrustado */
          <PDFIncrustado
            id={readingObra.id}
            googleDriveId={readingObra.googleDriveId}
            titulo={readingObra.tituloObra}
            onClose={() => setReadingObra(null)}
          />
        ) : selectedObra ? (
          /* Sub-vista: Ficha Detallada de Obra */
          <ObraDetalle
            obra={selectedObra}
            ratings={ratings}
            onBack={() => setSelectedObra(null)}
            onRead={(obra) => setReadingObra(obra)}
            onRate={handleRate}
          />
        ) : (
          /* Vista Principal: Listado / Grilla de Libros */
          <div style={{ width: '100%', maxWidth: '1200px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h1 style={{ color: 'var(--text-color)', fontSize: '24px', fontWeight: 700, margin: 0 }}>
                  Biblioteca Digital de Matemática Financiera
                </h1>
                <p style={{ color: 'var(--text-color)', fontSize: '13px', margin: '4px 0 0 0' }}>
                  {query ? `Resultados de búsqueda: ${filteredObras.length} obras encontradas` : `Catálogo completo (${obras.length} recursos disponibles)`}
                </p>
              </div>

              {query && (
                <button
                  onClick={() => {
                    setQuery('');
                    setFilters({
                      autores: false,
                      unidadTematica: false,
                      tituloObra: false,
                      editorialLugar: false,
                      tags: false,
                    });
                  }}
                  style={{
                    backgroundColor: 'var(--border-color)',
                    color: 'var(--text-color)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 14px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  Limpiar Filtros
                </button>
              )}
            </div>

            <ObraList
              obras={filteredObras}
              ratings={ratings}
              onSelect={(obra) => setSelectedObra(obra)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
