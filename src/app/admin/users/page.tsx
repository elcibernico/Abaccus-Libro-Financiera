'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

interface Profile {
  id: string;
  email: string;
  role: 'admin' | 'admin_suplente' | 'manager' | 'docente' | 'alumno';
  created_at: string;
}

export default function AdminUsersPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, role, created_at')
        .order('email', { ascending: true });

      if (error) throw error;
      setProfiles(data || []);
    } catch (err: any) {
      console.error('Error al cargar perfiles:', err);
      setMessage({ text: 'No se pudieron cargar los perfiles de usuario.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: Profile['role']) => {
    try {
      setUpdatingId(userId);
      setMessage(null);

      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) throw error;

      // Actualizar el estado local
      setProfiles(prev =>
        prev.map(profile =>
          profile.id === userId ? { ...profile, role: newRole } : profile
        )
      );

      setMessage({ text: 'Rol actualizado correctamente.', type: 'success' });
    } catch (err: any) {
      console.error('Error al actualizar rol:', err);
      setMessage({ text: 'No tienes permisos para modificar este rol o falló la conexión.', type: 'error' });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-card glass-card">
        <div className="admin-header">
          <div className="header-left">
            <Link href="/" className="back-link">
              ← Volver al Libro
            </Link>
            <h1 className="admin-title">Gestión de Usuarios y Roles</h1>
            <p className="admin-subtitle">
              Administra los accesos y cambia los roles de alumnos, docentes y administradores.
            </p>
          </div>
          <div className="header-right">
            <span className="pi-badge">π</span>
          </div>
        </div>

        {message && (
          <div className={`message-banner ${message.type}`}>
            <span>{message.type === 'success' ? '✅' : '⚠️'}</span>
            <p>{message.text}</p>
          </div>
        )}

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando lista de usuarios...</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Usuario (Email)</th>
                  <th>Fecha de Registro</th>
                  <th>Rol Actual</th>
                  <th style={{ textAlign: 'right' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map(profile => (
                  <tr key={profile.id}>
                    <td>
                      <div className="user-email-col">
                        <span className="user-avatar">
                          {profile.email.charAt(0).toUpperCase()}
                        </span>
                        <span className="email-text">{profile.email}</span>
                      </div>
                    </td>
                    <td>
                      {new Date(profile.created_at).toLocaleDateString('es-AR', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td>
                      <span className={`role-badge ${profile.role}`}>
                        {profile.role}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="actions-cell">
                        <select
                          value={profile.role}
                          onChange={(e) => handleRoleChange(profile.id, e.target.value as Profile['role'])}
                          disabled={updatingId === profile.id}
                          className="role-select"
                        >
                          <option value="alumno">Alumno</option>
                          <option value="docente">Docente</option>
                          <option value="manager">Manager</option>
                          <option value="admin_suplente">Admin Suplente</option>
                          <option value="admin">Admin</option>
                        </select>
                        {updatingId === profile.id && <div className="small-spinner"></div>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          background: #090d16;
          color: #ffffff;
          padding: 2.5rem 1.5rem;
          font-family: 'Inter', sans-serif;
        }

        .admin-card {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 2.5rem;
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(13, 20, 35, 0.6);
          backdrop-filter: blur(12px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .back-link {
          color: #60a5fa;
          font-size: 0.85rem;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 0.75rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .back-link:hover {
          color: #3b82f6;
        }

        .admin-title {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }

        .admin-subtitle {
          font-size: 0.9rem;
          color: #94a3b8;
        }

        .pi-badge {
          font-family: 'Cambria', serif;
          font-size: 2.5rem;
          color: #3b82f6;
          opacity: 0.8;
          line-height: 1;
        }

        .message-banner {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .message-banner.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #a7f3d0;
        }

        .message-banner.error {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          color: #fca5a5;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 0;
          gap: 1rem;
          color: #94a3b8;
        }

        .spinner {
          width: 35px;
          height: 35px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border-top-color: #3b82f6;
          animation: spin 0.8s linear infinite;
        }

        .small-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          border-top-color: #3b82f6;
          animation: spin 0.8s linear infinite;
        }

        .table-responsive {
          overflow-x: auto;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .users-table th {
          padding: 1rem;
          font-size: 0.8rem;
          text-transform: uppercase;
          color: #64748b;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .users-table td {
          padding: 1.25rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          font-size: 0.9rem;
          vertical-align: middle;
        }

        .user-email-col {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #60a5fa;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .email-text {
          font-weight: 500;
          color: #e2e8f0;
        }

        .role-badge {
          display: inline-block;
          padding: 0.25rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .role-badge.admin {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #fca5a5;
        }

        .role-badge.admin_suplente {
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.3);
          color: #fde68a;
        }

        .role-badge.manager {
          background: rgba(139, 92, 246, 0.15);
          border: 1px solid rgba(139, 92, 246, 0.3);
          color: #ddd6fe;
        }

        .role-badge.docente {
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
          color: #bfdbfe;
        }

        .role-badge.alumno {
          background: rgba(100, 116, 139, 0.15);
          border: 1px solid rgba(100, 116, 139, 0.3);
          color: #cbd5e1;
        }

        .actions-cell {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .role-select {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.5rem;
          color: #ffffff;
          padding: 0.4rem 1.8rem 0.4rem 0.6rem;
          font-size: 0.85rem;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.6)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.6rem center;
          background-size: 0.8rem;
        }

        .role-select:focus {
          border-color: rgba(59, 130, 246, 0.5);
          background-color: rgba(255, 255, 255, 0.05);
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
