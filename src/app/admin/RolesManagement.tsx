'use client';
import { useState, useEffect } from 'react';
import { ROLES_DICTIONARY } from '@/config/rolesConfig';

export default function RolesManagement() {
  const [roles, setRoles] = useState<any[]>([]);
  const [rolesMap, setRolesMap] = useState<Record<string, Record<string, boolean>>>({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const availablePermissions = [
    { key: 'access_libro', label: 'Acceso Libro' },
    { key: 'edit_content', label: 'Edición Contenido' },
    { key: 'manage_users', label: 'Gestionar Usuarios' },
    { key: 'manage_roles', label: 'Gestionar Roles' },
    { key: 'view_metrics', label: 'Ver Métricas' },
  ];

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/roles');
      if (!res.ok) {
        throw new Error('Error al obtener la configuración de roles');
      }
      const data = await res.json();
      setRolesMap(data.rolesMap || {});
      setRoles(data.roles || []);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleUpdateRole = async (roleKey: string, newPermissions: Record<string, boolean>) => {
    try {
      setErrorMsg(null);
      setSuccessMsg(null);
      const res = await fetch('/api/admin/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role_id: roleKey,
          permissions: newPermissions
        })
      });

      if (!res.ok) {
        throw new Error('Error al actualizar rol');
      }

      setRolesMap(prev => ({
        ...prev,
        [roleKey]: newPermissions
      }));
      setSuccessMsg(`Permisos del rol "${ROLES_DICTIONARY[roleKey]?.label || roleKey}" actualizados.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  const handleToggleActive = async (roleKey: string, isActive: boolean) => {
    try {
      setErrorMsg(null);
      setSuccessMsg(null);
      const res = await fetch('/api/admin/roles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role_id: roleKey,
          is_active: isActive
        })
      });

      if (!res.ok) {
        throw new Error('Error al actualizar estado del rol');
      }

      setRoles(prev => prev.map(r => r.id === roleKey ? { ...r, is_active: isActive } : r));
      setSuccessMsg(`Estado de activación del rol "${ROLES_DICTIONARY[roleKey]?.label || roleKey}" actualizado.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Cargando roles...</div>;
  }

  return (
    <div className="card glass-card">
      <div className="card-header">
        <h3>Matriz de Permisos y Control de Roles</h3>
        <p>Define cuáles roles están activos en el ecosistema y cuáles son sus permisos predeterminados.</p>
      </div>

      {errorMsg && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem' }}>
          {successMsg}
        </div>
      )}

      <div className="table-responsive">
        <table className="users-table">
          <thead>
            <tr>
              <th>Rol (Key)</th>
              <th>Etiqueta Visual</th>
              <th style={{ textAlign: 'center' }}>Activo (Ecosistema)</th>
              {availablePermissions.map(p => (
                <th key={p.key} style={{ textAlign: 'center' }}>{p.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => {
              const roleKey = role.id;
              if (roleKey === 'root') return null; // Root siempre tiene todo por defecto en código
              
              const config = ROLES_DICTIONARY[roleKey] || {
                label: role.label || roleKey.toUpperCase(),
                theme: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
              };
              
              const rolePerms = rolesMap[roleKey] || {};
              
              return (
                <tr key={roleKey} style={{ opacity: role.is_active ? 1 : 0.6 }}>
                  <td><code>{roleKey}</code></td>
                  <td>
                    <span className={`role-badge ${config.theme}`} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: '1rem' }}>
                      {config.label}
                    </span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <input 
                      type="checkbox"
                      className="permission-checkbox"
                      checked={role.is_active || false}
                      onChange={(e) => handleToggleActive(roleKey, e.target.checked)}
                    />
                  </td>
                  {availablePermissions.map(p => (
                    <td key={p.key} style={{ textAlign: 'center' }}>
                      <input 
                        type="checkbox"
                        className="permission-checkbox"
                        checked={rolePerms[p.key] || false}
                        disabled={!role.is_active}
                        onChange={(e) => {
                          const newPerms = { ...rolePerms, [p.key]: e.target.checked };
                          handleUpdateRole(roleKey, newPerms);
                        }}
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .permission-checkbox {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
