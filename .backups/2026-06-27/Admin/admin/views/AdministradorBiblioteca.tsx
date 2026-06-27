'use client';

import React, { useState, useEffect } from 'react';
import { ObraBiblioteca } from '@/database/dimensions/biblioteca_dim';
import {
  fetchObras,
  createObra,
  updateObra,
  deleteObra
} from '../../biblioteca/services/supabaseBibliotecaService';

export default function AdministradorBiblioteca() {
  const [obras, setObras] = useState<ObraBiblioteca[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingObra, setEditingObra] = useState<Partial<ObraBiblioteca> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const loadObrasData = async () => {
    setLoading(true);
    const data = await fetchObras(true); // Pasar true para traer obras ocultas
    setObras(data);
    setLoading(false);
  };

  useEffect(() => {
    loadObrasData();
  }, []);

  const handleEdit = (obra: ObraBiblioteca) => {
    setEditingObra({ ...obra });
    setIsModalOpen(true);
  };

  const handleCreateNew = () => {
    setEditingObra({
      categoria: 'Básica / Obligatoria',
      unidadTematica: '',
      autores: '',
      anioEdicion: new Date().getFullYear().toString(),
      tituloObra: '',
      capituloSeccion: '',
      rangoPaginas: '',
      editorialLugar: '',
      vinculoWeb: 'N/A',
      googleDriveId: '',
      tags: [],
      formato: 'PDF',
      tipoRecurso: 'Libro / Capítulo',
      etiquetaNotebookLM: '',
      oculta: false
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Está seguro de que desea eliminar esta obra? Esta acción no se puede deshacer.')) {
      const success = await deleteObra(id);
      if (success) {
        alert('Obra eliminada con éxito.');
        loadObrasData();
      } else {
        alert('Error al eliminar la obra.');
      }
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingObra) return;

    if (!editingObra.tituloObra || !editingObra.googleDriveId) {
      alert('Por favor complete los campos obligatorios: Título de la Obra y URL/ID de Archivo (Google Drive ID).');
      return;
    }

    // Convertir tags si es string
    let parsedTags: string[] = [];
    if (typeof editingObra.tags === 'string') {
      parsedTags = (editingObra.tags as string)
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
    } else if (Array.isArray(editingObra.tags)) {
      parsedTags = editingObra.tags;
    }

    const obraData = {
      ...editingObra,
      tags: parsedTags
    } as Omit<ObraBiblioteca, 'id'>;

    let success = false;
    if ('id' in editingObra && editingObra.id) {
      success = await updateObra(editingObra.id, obraData);
      if (success) alert('Obra actualizada con éxito.');
    } else {
      const newObra = await createObra(obraData);
      success = !!newObra;
      if (success) alert('Obra creada con éxito.');
    }

    if (success) {
      setIsModalOpen(false);
      setEditingObra(null);
      loadObrasData();
    } else {
      alert('Ocurrió un error al guardar la obra.');
    }
  };

  const filteredObras = obras.filter((obra) =>
    obra.tituloObra.toLowerCase().includes(searchQuery.toLowerCase()) ||
    obra.autores.toLowerCase().includes(searchQuery.toLowerCase()) ||
    obra.unidadTematica.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ color: 'var(--text-color)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ color: 'var(--text-color)', fontSize: '20px', fontWeight: 600, margin: '0 0 4px 0' }}>
            Gestión del Catálogo de Biblioteca
          </h2>
          <p style={{ color: 'var(--text-color)', fontSize: '13px', margin: 0 }}>
            Administre las obras del catálogo digital, asigne sus metadatos y configure sus IDs de Google Drive.
          </p>
        </div>

        <button
          onClick={handleCreateNew}
          style={{
            backgroundColor: 'var(--primary-color)',
            color: 'var(--text-color)',
            border: 'none',
            borderRadius: '4px',
            padding: '10px 18px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
        >
          + Agregar Nueva Obra
        </button>
      </div>

      {/* Buscador interno */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
        <input
          type="text"
          placeholder="Filtrar por título, autor o unidad..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '6px',
            padding: '10px 14px',
            color: 'var(--text-color)',
            fontSize: '13px',
            outline: 'none',
          }}
        />
      </div>

      {loading ? (
        <div style={{ color: 'var(--text-color)', padding: '40px 0', textAlign: 'center' }}>
          Cargando catálogo de obras...
        </div>
      ) : filteredObras.length === 0 ? (
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
          No se encontraron obras registradas.
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
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Unidad / Categoría</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Título de la Obra</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Autores</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>ID Google Drive</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600, textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredObras.map((obra) => (
                  <tr
                    key={obra.id}
                    style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.01)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '12px 16px', color: 'var(--text-color)' }}>
                      <div style={{ fontWeight: 500, color: 'var(--primary-color)' }}>{obra.unidadTematica}</div>
                      <div style={{ fontSize: '11px', marginTop: '2px' }}>{obra.categoria}</div>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-color)', fontWeight: 500, maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={obra.tituloObra}>
                      {obra.tituloObra}
                      {obra.oculta && (
                        <span style={{ marginLeft: '8px', padding: '2px 6px', backgroundColor: 'var(--border-color)', color: 'var(--text-color)', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>
                          OCULTA
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-color)' }}>
                      {obra.autores}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '11px', color: obra.googleDriveId ? 'var(--primary-color)' : '#C80036' }}>
                      {obra.googleDriveId ? obra.googleDriveId : '[SIN ID DE ARCHIVO]'}
                    </td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleEdit(obra)}
                          style={{
                            backgroundColor: 'var(--border-color)',
                            color: 'var(--text-color)',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--border-color)'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--border-color)'}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(obra.id)}
                          style={{
                            backgroundColor: '#C80036',
                            color: 'var(--text-color)',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#A5002C'}
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#C80036'}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Formulario de Obras */}
      {isModalOpen && editingObra && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            width: '100%',
            maxWidth: '650px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, color: 'var(--text-color)', fontSize: '18px' }}>
                {editingObra.id ? 'Editar Obra de Biblioteca' : 'Agregar Nueva Obra'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-color)', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Título de la Obra *</label>
                  <input
                    type="text"
                    required
                    value={editingObra.tituloObra || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, tituloObra: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Autores *</label>
                  <input
                    type="text"
                    required
                    value={editingObra.autores || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, autores: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Categoría de Biblioteca</label>
                  <select
                    value={editingObra.categoria || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, categoria: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  >
                    <option value="Básica / Obligatoria">Básica / Obligatoria</option>
                    <option value="Complementaria">Complementaria</option>
                    <option value="Libro Principal">Libro Principal</option>
                    <option value="Libro Principal / Práctica">Libro Principal / Práctica</option>
                    <option value="Documento de Cátedra">Documento de Cátedra</option>
                    <option value="Documento Oficial / Resoluciones">Documento Oficial / Resoluciones</option>
                  </select>
                </div>

                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Unidad Temática (ej. Unidad 1)</label>
                  <input
                    type="text"
                    value={editingObra.unidadTematica || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, unidadTematica: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Google Drive ID o URL del PDF *</label>
                  <input
                    type="text"
                    required
                    placeholder="ej: 11yPjQ-GzG4v22sE-Jv3hN5_SgQ2s8w5B"
                    value={editingObra.googleDriveId || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, googleDriveId: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--primary-color)', fontSize: '13px', fontWeight: 500 }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Año Edición</label>
                  <input
                    type="text"
                    value={editingObra.anioEdicion || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, anioEdicion: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Capítulo / Sección</label>
                  <input
                    type="text"
                    value={editingObra.capituloSeccion || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, capituloSeccion: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Rango de Páginas</label>
                  <input
                    type="text"
                    value={editingObra.rangoPaginas || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, rangoPaginas: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Editorial y Lugar</label>
                  <input
                    type="text"
                    value={editingObra.editorialLugar || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, editorialLugar: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Vínculo Web Externo (opcional)</label>
                  <input
                    type="text"
                    value={editingObra.vinculoWeb || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, vinculoWeb: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Temas / Tags (separados por coma)</label>
                  <input
                    type="text"
                    placeholder="ej: Capitalización, Descuento, TIR"
                    value={Array.isArray(editingObra.tags) ? editingObra.tags.join(', ') : (editingObra.tags || '')}
                    onChange={(e) => setEditingObra({ ...editingObra, tags: e.target.value as any })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Etiqueta NotebookLM</label>
                  <input
                    type="text"
                    value={editingObra.etiquetaNotebookLM || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, etiquetaNotebookLM: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Formato</label>
                  <select
                    value={editingObra.formato || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, formato: e.target.value as any })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  >
                    <option value="PDF">PDF</option>
                    <option value="DOCX">DOCX</option>
                    <option value="HTML">HTML</option>
                  </select>
                </div>

                <div style={{ flex: 1, minWidth: '150px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-color)' }}>Tipo Recurso</label>
                  <input
                    type="text"
                    value={editingObra.tipoRecurso || ''}
                    onChange={(e) => setEditingObra({ ...editingObra, tipoRecurso: e.target.value })}
                    style={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '8px 12px', color: 'var(--text-color)', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', backgroundColor: 'rgba(200,0,54,0.1)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(200,0,54,0.3)' }}>
                <input
                  type="checkbox"
                  id="ocultar-obra"
                  checked={!!editingObra.oculta}
                  onChange={(e) => setEditingObra({ ...editingObra, oculta: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="ocultar-obra" style={{ fontSize: '13px', color: 'var(--text-color)', cursor: 'pointer' }}>
                  <strong>Ocultar Obra</strong> (No visible en la Biblioteca Digital)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    backgroundColor: 'transparent',
                    color: 'var(--text-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    fontSize: '13px',
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--primary-color)',
                    color: 'var(--text-color)',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '10px 20px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                  }}
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
