'use client';

import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface ObraEmbeddingsMeta {
  source_id: string;
  obra_titulo: string;
  autor: string;
}

export default function EditorObras() {
  const [obras, setObras] = useState<ObraEmbeddingsMeta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // Obra actualmente en edición
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitulo, setEditTitulo] = useState<string>('');
  const [editAutor, setEditAutor] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);

  const fetchObras = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch('/api/admin/obras');
      if (!res.ok) {
        throw new Error('Error al obtener la lista de obras de la base de datos de embeddings.');
      }
      const data = await res.json();
      setObras(data.obras || []);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchObras();
  }, []);

  const startEdit = (obra: ObraEmbeddingsMeta) => {
    setEditingId(obra.source_id);
    setEditTitulo(obra.obra_titulo || '');
    setEditAutor(obra.autor || '');
    setSuccessMsg(null);
    setErrorMsg(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitulo('');
    setEditAutor('');
  };

  const handleSave = async (sourceId: string) => {
    try {
      setSaving(true);
      setErrorMsg(null);
      setSuccessMsg(null);

      const res = await fetch('/api/admin/obras', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source_id: sourceId,
          obra_titulo: editTitulo.trim(),
          autor: editAutor.trim()
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar los datos de la obra.');
      }

      setSuccessMsg('Título y autor actualizados con éxito en todos los fragmentos vectoriales correspondientes.');
      setEditingId(null);
      await fetchObras();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="crud-form-card" style={{ marginTop: '20px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px 0', color: 'var(--text-color)' }}>
        Editor de Títulos de Obras (Paulita ITS)
      </h2>
      <p style={{ fontSize: '13px', margin: '0 0 20px 0', color: 'var(--text-color)', opacity: 0.8 }}>
        Administre los nombres y autores de las obras indexadas en los fragmentos vectoriales de Paulita ITS. La edición actualizará todos los fragmentos asociados a la obra en la base de datos de Supabase.
      </p>

      {errorMsg && (
        <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>
          ⚠️ {errorMsg}
        </div>
      )}

      {successMsg && (
        <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>
          ✨ {successMsg}
        </div>
      )}

      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', gap: '8px', color: 'var(--text-color)' }}>
          <Loader2 className="animate-spin" size={20} />
          <span>Cargando listado de obras desde los embeddings...</span>
        </div>
      ) : obras.length === 0 ? (
        <div style={{ padding: '30px', textAlign: 'center', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-color)', opacity: 0.7 }}>
          No hay obras registradas con fragmentos de embeddings cargados en Paulita ITS.
        </div>
      ) : (
        <div style={{ overflowX: 'auto', background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left', color: 'var(--text-color)' }}>
            <thead>
              <tr style={{ background: 'rgba(255, 255, 255, 0.02)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>ID de la Obra (Source ID)</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Título de la Obra</th>
                <th style={{ padding: '12px 16px', fontWeight: 600 }}>Autor</th>
                <th style={{ padding: '12px 16px', fontWeight: 600, width: '160px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {obras.map((obra) => (
                <tr key={obra.source_id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px', opacity: 0.8 }}>
                    {obra.source_id}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {editingId === obra.source_id ? (
                      <input
                        type="text"
                        value={editTitulo}
                        onChange={(e) => setEditTitulo(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-color)',
                          color: 'var(--text-color)',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                    ) : (
                      obra.obra_titulo || <span style={{ fontStyle: 'italic', opacity: 0.5 }}>Sin título asignado</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {editingId === obra.source_id ? (
                      <input
                        type="text"
                        value={editAutor}
                        onChange={(e) => setEditAutor(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-color)',
                          color: 'var(--text-color)',
                          fontSize: '13px',
                          outline: 'none'
                        }}
                      />
                    ) : (
                      obra.autor || <span style={{ fontStyle: 'italic', opacity: 0.5 }}>Sin autor asignado</span>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {editingId === obra.source_id ? (
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => handleSave(obra.source_id)}
                          disabled={saving}
                          style={{
                            background: '#10b981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '6px 10px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            fontWeight: 600
                          }}
                        >
                          {saving ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button
                          onClick={cancelEdit}
                          disabled={saving}
                          style={{
                            background: 'transparent',
                            color: 'var(--text-color)',
                            border: '1px solid var(--border-color)',
                            borderRadius: '4px',
                            padding: '6px 10px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(obra)}
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          color: 'var(--text-color)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '4px',
                          padding: '6px 12px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          transition: 'all 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
                        onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                      >
                        ✏️ Editar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
