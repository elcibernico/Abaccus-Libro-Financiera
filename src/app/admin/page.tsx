'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePreferences } from '@/modules/libro_financiero/components/UserPreferencesProvider';

interface UserPermission {
  may_export_pdf: boolean;
  may_edit_records: boolean;
  may_view_advanced_charts: boolean;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  permissions: UserPermission;
}

export default function AdminPage() {
  const { theme } = usePreferences();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');

  useEffect(() => {
    // 1. Verificar si el usuario actual es admin
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user.role === 'admin') {
          setIsAdminUser(true);
          setCurrentUserEmail(data.user.email);
          // 2. Cargar lista de usuarios
          fetchUsers();
        } else {
          setIsAdminUser(false);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error al verificar sesión:', err);
        setErrorMsg('No se pudo verificar la sesión de administrador.');
        setLoading(false);
      });
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const res = await fetch('/api/admin/users');
      if (!res.ok) throw new Error('Error al obtener la lista de usuarios.');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (email: string, updatedFields: { role?: string; permissions?: Partial<UserPermission> }) => {
    setUpdatingUser(email);
    setErrorMsg(null);

    // Encontrar el usuario actual en el estado local
    const userToUpdate = users.find((u) => u.email === email);
    if (!userToUpdate) return;

    // Fusionar los valores
    const updatedRole = updatedFields.role ?? userToUpdate.role;
    const updatedPermissions = {
      ...userToUpdate.permissions,
      ...updatedFields.permissions,
    };

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role: updatedRole,
          permissions: updatedPermissions,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al guardar los cambios.');
      }

      // Actualizar estado local si el backend fue exitoso
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.email === email
            ? { ...u, role: updatedRole, permissions: updatedPermissions }
            : u
        )
      );
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setUpdatingUser(null);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando panel de administración...</p>
        <style jsx>{`
          .loading-container {
            min-height: 60vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 4px solid var(--border-color);
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAdminUser) {
    return (
      <div className="unauthorized-container">
        <div className="glass-card error-card">
          <h2>Acceso No Autorizado</h2>
          <p>Debes iniciar sesión con una cuenta de administrador para ver este panel.</p>
          <div className="actions" style={{ marginTop: '1.5rem' }}>
            <Link href="/login" className="btn-primary-link">
              Ir a Iniciar Sesión
            </Link>
          </div>
        </div>
        <style jsx>{`
          .unauthorized-container {
            min-height: 60vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
          }
          .error-card {
            max-width: 500px;
            text-align: center;
            padding: 2.5rem;
            border-color: rgba(239, 68, 68, 0.2);
          }
          .error-card h2 {
            color: #ef4444;
            margin-bottom: 1rem;
          }
          .btn-primary-link {
            background: var(--primary-color);
            color: white;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            text-decoration: none;
            font-weight: 600;
            display: inline-block;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-card glass-card">
        <div className="admin-header">
          <div className="admin-header-content-left">
            <h1 className="admin-title">Panel de Control General</h1>
            <p className="admin-subtitle">
              Estado general y gestión en tiempo real de permisos y lista blanca.
            </p>
          </div>
          <div className="admin-header-content-right">
            <Link href="/" className="back-pi-link" title="Volver al Libro">
              π
            </Link>
          </div>
        </div>

        {errorMsg && <div className="alert alert-error">{errorMsg}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Seguridad y Accesos</h3>
            <p className="stat-value">Activo</p>
            <p className="stat-desc">OAuth / Whitelist Protegido</p>
          </div>

          <div className="stat-card">
            <h3>Usuarios Autorizados</h3>
            <p className="stat-value">{users.length}</p>
            <p className="stat-desc">Usuarios registrados en lista blanca</p>
          </div>

          <div className="stat-card">
            <h3>Administradores</h3>
            <p className="stat-value">
              {users.filter((u) => u.role === 'admin').length}
            </p>
            <p className="stat-desc">Con control total de permisos</p>
          </div>

          <div className="stat-card">
            <h3>Tema Visual</h3>
            <p className="stat-value" style={{ textTransform: 'capitalize' }}>
              {theme}
            </p>
            <p className="stat-desc">Preferencia de visualización activa</p>
          </div>
        </div>

        <div className="whitelist-section">
          <h2>Gestión de Permisos y Lista Blanca</h2>
          <p className="section-desc">
            Los cambios se guardan automáticamente en tiempo real en la base de datos de persistencia.
          </p>

          <div className="table-responsive">
            <table className="user-table">
              <thead>
                <tr>
                  <th>Usuario</th>
                  <th>Rol</th>
                  <th>Exportar PDF</th>
                  <th>Editar Registros</th>
                  <th>Gráficos Avanzados</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className={user.email === currentUserEmail ? 'current-user-row' : ''}>
                    <td>
                      <div className="user-info">
                        <span className="user-name">{user.name || 'Sin Nombre'}</span>
                        <span className="user-email">
                          {user.email} {user.email === currentUserEmail && <span className="self-badge">(Tú)</span>}
                        </span>
                      </div>
                    </td>
                    <td>
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdate(user.email, { role: e.target.value })}
                        disabled={updatingUser === user.email}
                        className="role-select"
                      >
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                        <option value="guest">Invitado (Bloqueado)</option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={user.permissions.may_export_pdf}
                        onChange={(e) =>
                          handleUpdate(user.email, {
                            permissions: { may_export_pdf: e.target.checked },
                          })
                        }
                        disabled={updatingUser === user.email || user.role === 'admin'}
                        className="permission-checkbox"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={user.permissions.may_edit_records}
                        onChange={(e) =>
                          handleUpdate(user.email, {
                            permissions: { may_edit_records: e.target.checked },
                          })
                        }
                        disabled={updatingUser === user.email || user.role === 'admin'}
                        className="permission-checkbox"
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        checked={user.permissions.may_view_advanced_charts}
                        onChange={(e) =>
                          handleUpdate(user.email, {
                            permissions: { may_view_advanced_charts: e.target.checked },
                          })
                        }
                        disabled={updatingUser === user.email || user.role === 'admin'}
                        className="permission-checkbox"
                      />
                    </td>
                    <td className="status-cell">
                      {updatingUser === user.email ? (
                        <span className="saving-text">Guardando...</span>
                      ) : user.role === 'admin' ? (
                        <span className="all-granted-badge" title="Los administradores tienen todos los permisos">Todo Permitido</span>
                      ) : (
                        <span className="saved-badge">Guardado</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .admin-container {
          min-height: calc(100vh - 130px);
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding: 2rem 1.5rem;
        }

        .admin-card {
          width: 100%;
          max-width: 1000px;
          padding: 2.5rem;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          box-shadow: var(--shadow-lg);
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .admin-header-content-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .admin-header-content-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .admin-header :global(.back-pi-link) {
          font-family: 'Cambria', serif !important;
          font-size: 2.5rem !important;
          color: var(--primary-color) !important;
          opacity: 0.8 !important;
          line-height: 1 !important;
          text-decoration: none !important;
          border-bottom: none !important;
          outline: none !important;
          box-shadow: none !important;
          cursor: pointer !important;
          transition: var(--transition) !important;
          display: inline-block !important;
        }

        .admin-header :global(.back-pi-link:hover) {
          opacity: 1 !important;
          transform: scale(1.15) !important;
          color: var(--primary-hover) !important;
          text-decoration: none !important;
        }

        .admin-title {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }

        .admin-subtitle {
          font-size: 0.9rem;
          color: var(--text-color);
          opacity: 0.7;
        }

        .alert {
          padding: 1rem;
          border-radius: 0.75rem;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .stat-card {
          background: var(--hover-color);
          border: 1px solid var(--border-color);
          padding: 1.5rem;
          border-radius: 1rem;
          text-align: center;
        }

        .stat-card h3 {
          font-size: 0.825rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-color);
          opacity: 0.6;
          margin-bottom: 0.75rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }

        .stat-desc {
          font-size: 0.8rem;
          color: var(--text-color);
          opacity: 0.7;
        }

        .whitelist-section h2 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: var(--text-color);
        }

        .section-desc {
          font-size: 0.9rem;
          color: var(--text-color);
          opacity: 0.7;
          margin-bottom: 1.5rem;
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          background: var(--card-bg);
        }

        .user-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .user-table th,
        .user-table td {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid var(--border-color);
          font-size: 0.95rem;
        }

        .user-table th {
          background: var(--hover-color);
          font-weight: 700;
          color: var(--text-color);
          opacity: 0.8;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .user-table tr:last-child td {
          border-bottom: none;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .user-name {
          font-weight: 600;
          color: var(--text-color);
        }

        .user-email {
          font-size: 0.85rem;
          color: var(--text-color);
          opacity: 0.6;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .self-badge {
          background: rgba(16, 185, 129, 0.15);
          color: var(--primary-color);
          padding: 0.1rem 0.4rem;
          border-radius: 0.25rem;
          font-weight: 700;
          font-size: 0.75rem;
        }

        .role-select {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          padding: 0.4rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.9rem;
          outline: none;
          cursor: pointer;
        }

        .permission-checkbox {
          width: 1.15rem;
          height: 1.15rem;
          accent-color: var(--primary-color);
          cursor: pointer;
        }

        .status-cell {
          font-size: 0.85rem;
          font-weight: 600;
        }

        .saving-text {
          color: var(--accent-color);
        }

        .saved-badge {
          color: var(--primary-color);
          background: rgba(16, 185, 129, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
        }

        .all-granted-badge {
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.8rem;
        }

        .current-user-row {
          background: rgba(16, 185, 129, 0.02);
        }
      `}</style>
    </div>
  );
}
