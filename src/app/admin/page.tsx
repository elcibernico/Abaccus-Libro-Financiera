'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePreferences } from '@/modules/libro_financiero/components/UserPreferencesProvider';

interface UserPermission {
  may_export_pdf: boolean;
  may_edit_records: boolean;
  may_view_advanced_charts: boolean;
  access_libro: boolean;
  edit_content: boolean;
  manage_users: boolean;
  manage_roles: boolean;
  view_metrics: boolean;
  [key: string]: boolean;
}

interface UserData {
  id: string;
  email: string;
  name: string;
  role: string;
  celular: string;
  permissions: UserPermission;
}

interface PendingUserData {
  id: string;
  email: string;
  name: string;
  celular: string;
  created_at: string;
}

interface IpData {
  id: string;
  ip_address: string;
  description: string;
  created_by: string;
  created_at?: string;
}

export default function AdminPage() {
  const { theme } = usePreferences();
  const [activeTab, setActiveTab] = useState<'users' | 'pending' | 'ips' | 'templates'>('users');
  const [users, setUsers] = useState<UserData[]>([]);
  const [pendingUsers, setPendingUsers] = useState<PendingUserData[]>([]);
  const [ips, setIps] = useState<IpData[]>([]);
  const [currentIp, setCurrentIp] = useState<string>('');
  
  // Plantillas de Correo
  const [templates, setTemplates] = useState<{ id: string; name: string; filename: string; content: string }[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('aviso_nuevo_usuario');
  const [templateContent, setTemplateContent] = useState<string>('');
  const [savingTemplate, setSavingTemplate] = useState<boolean>(false);
  
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');
  const [roles, setRoles] = useState<any[]>([]);

  // Formulario Usuarios
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserCelular, setNewUserCelular] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<string>('user');
  const [newUserPermissions, setNewUserPermissions] = useState<UserPermission>({
    may_export_pdf: false,
    may_edit_records: false,
    may_view_advanced_charts: false,
    access_libro: false,
    edit_content: false,
    manage_users: false,
    manage_roles: false,
    view_metrics: false,
  });
  const [submittingUser, setSubmittingUser] = useState<boolean>(false);

  // Formulario de Aprobación de Usuario Pendiente (Inline)
  const [approvingEmail, setApprovingEmail] = useState<string | null>(null);
  const [approveRole, setApproveRole] = useState<string>('user');
  const [approveCelular, setApproveCelular] = useState<string>('');
  const [submittingApprove, setSubmittingApprove] = useState<boolean>(false);

  // Formulario IPs
  const [newIpAddress, setNewIpAddress] = useState<string>('');
  const [newIpDescription, setNewIpDescription] = useState<string>('');
  const [submittingIp, setSubmittingIp] = useState<boolean>(false);

  // Estados para Edición de IPs
  const [editingIpId, setEditingIpId] = useState<string | null>(null);
  const [editIpAddress, setEditIpAddress] = useState<string>('');
  const [editIpDescription, setEditIpDescription] = useState<string>('');
  const [updatingIpId, setUpdatingIpId] = useState<string | null>(null);

  // Configuración del Firewall de IPs y Registro
  const [enableIpRestriction, setEnableIpRestriction] = useState<boolean>(true);
  const [allowPublicSignup, setAllowPublicSignup] = useState<boolean>(false);
  const [submittingSettings, setSubmittingSettings] = useState<boolean>(false);
  const [submittingSignupSetting, setSubmittingSignupSetting] = useState<boolean>(false);
  
  // Modal de Confirmación Personalizado
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: () => void;
  } | null>(null);


  useEffect(() => {
    // 1. Verificar si el usuario actual es admin
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && (data.user.role === 'admin' || data.user.role === 'root')) {
          setIsAdminUser(true);
          setCurrentUserEmail(data.user.email);
          // Cargar datos
          initData();
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

  const initData = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await Promise.all([fetchUsers(), fetchPendingUsers(), fetchIps(), fetchTemplates(), fetchSettings(), fetchRoles()]);
    } catch (err: any) {
      setErrorMsg('Error al inicializar datos del panel de control.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await fetch('/api/auth/roles');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setRoles(data.roles);
        }
      }
    } catch (err) {
      console.error('Error al obtener los roles del sistema:', err);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.enable_ip_restriction !== undefined) {
          setEnableIpRestriction(data.enable_ip_restriction);
        }
        if (data.allow_public_signup !== undefined) {
          setAllowPublicSignup(data.allow_public_signup);
        }
      }
    } catch (err) {
      console.error('Error al obtener la configuración del sistema:', err);
    }
  };

  const handleToggleIpRestriction = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmittingSettings(true);
    const newValue = !enableIpRestriction;
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enable_ip_restriction: newValue }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar la configuración del cortafuegos.');
      }

      setEnableIpRestriction(newValue);
      setSuccessMsg(`Cortafuegos de IPs ${newValue ? 'ACTIVADO' : 'DESACTIVADO'} correctamente.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmittingSettings(false);
    }
  };

  const handleTogglePublicSignup = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmittingSignupSetting(true);
    const newValue = !allowPublicSignup;
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ allow_public_signup: newValue }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar la política de registro.');
      }

      setAllowPublicSignup(newValue);
      setSuccessMsg(`Política de registro abierto ${newValue ? 'ACTIVADA' : 'DESACTIVADA'} correctamente.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmittingSignupSetting(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users', { cache: 'no-store' });
      if (!res.ok) throw new Error('Error al obtener la lista de usuarios.');
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const res = await fetch('/api/admin/users/pending', { cache: 'no-store' });
      if (!res.ok) throw new Error('Error al obtener la lista de usuarios pendientes.');
      const data = await res.json();
      setPendingUsers(data.pending || []);
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const fetchIps = async () => {
    try {
      const res = await fetch('/api/admin/ips', { cache: 'no-store' });
      if (!res.ok) throw new Error('Error al obtener la lista de IPs autorizadas.');
      const data = await res.json();
      setIps(data.ips || []);
      setCurrentIp(data.currentIp || '');
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/admin/templates', { cache: 'no-store' });
      if (!res.ok) throw new Error('Error al obtener las plantillas de correo.');
      const data = await res.json();
      setTemplates(data.templates || []);
      
      // Inicializar contenido con la seleccionada por defecto
      const defTemplate = (data.templates || []).find((t: any) => t.id === 'aviso_nuevo_usuario');
      if (defTemplate) {
        setTemplateContent(defTemplate.content);
      }
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const handleSaveTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setSavingTemplate(true);
    try {
      const res = await fetch('/api/admin/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedTemplateId,
          content: templateContent
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al guardar la plantilla.');
      }
      setSuccessMsg('Plantilla de correo guardada exitosamente.');
      // Actualizar estado local
      setTemplates(prev => prev.map(t => t.id === selectedTemplateId ? { ...t, content: templateContent } : t));
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSavingTemplate(false);
    }
  };

  const handleTemplateChange = (id: string) => {
    setSelectedTemplateId(id);
    const match = templates.find(t => t.id === id);
    if (match) {
      setTemplateContent(match.content);
    } else {
      setTemplateContent('');
    }
  };

  // Modificar rol, celular o permisos de usuario existente
  const handleUpdateUser = async (email: string, updatedFields: { role?: string; celular?: string; permissions?: Partial<UserPermission> }) => {
    setUpdatingUser(email);
    setErrorMsg(null);
    setSuccessMsg(null);

    const userToUpdate = users.find((u) => u.email === email);
    if (!userToUpdate) return;

    const updatedRole = updatedFields.role ?? userToUpdate.role;
    const updatedCelular = updatedFields.celular ?? userToUpdate.celular;
    const updatedPermissions: UserPermission = {
      ...userToUpdate.permissions,
      ...updatedFields.permissions,
    } as UserPermission;

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          role: updatedRole,
          celular: updatedCelular,
          permissions: updatedPermissions,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al guardar los cambios.');
      }

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.email === email
            ? { ...u, role: updatedRole, celular: updatedCelular, permissions: updatedPermissions }
            : u
        )
      );
      setSuccessMsg(`Usuario ${email} actualizado correctamente.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setUpdatingUser(null);
    }
  };

  // Agregar nuevo usuario a la lista blanca directamente
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserEmail) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmittingUser(true);

    try {
      const res = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newUserEmail.trim(),
          name: newUserName.trim(),
          celular: newUserCelular.trim(),
          role: newUserRole,
          permissions: newUserPermissions,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al agregar el usuario.');
      }

      await fetchUsers();
      
      // Limpiar formulario
      setNewUserEmail('');
      setNewUserName('');
      setNewUserCelular('');
      setNewUserRole('user');
      setNewUserPermissions({
        may_export_pdf: false,
        may_edit_records: false,
        may_view_advanced_charts: false,
      });

      setSuccessMsg('Usuario agregado exitosamente a la lista blanca.');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmittingUser(false);
    }
  };

  // Eliminar usuario de la lista blanca (Ejecución real)
  const executeDeleteUser = async (email: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/admin/users?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al eliminar el usuario.');
      }

      setUsers(users.filter((u) => u.email !== email));
      setSuccessMsg(`Usuario "${email}" eliminado exitosamente.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // Eliminar usuario de la lista blanca
  const handleDeleteUser = async (email: string) => {
    if (email === currentUserEmail) {
      setErrorMsg('No puedes eliminarte a ti mismo de la lista blanca.');
      return;
    }

    setConfirmConfig({
      isOpen: true,
      message: `¿Estás seguro de que deseas eliminar al usuario "${email}" de la lista blanca? Esto revocará su acceso de inmediato.`,
      onConfirm: () => executeDeleteUser(email)
    });
  };

  // Aprobar usuario en suspenso
  const handleApprovePending = async (pendingUser: PendingUserData) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmittingApprove(true);

    try {
      const res = await fetch('/api/admin/users/pending', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: pendingUser.email,
          role: approveRole,
          celular: approveCelular.trim() || pendingUser.celular || '',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al aprobar al usuario.');
      }

      // Actualizar estados locales
      setPendingUsers(pendingUsers.filter(u => u.email !== pendingUser.email));
      await fetchUsers(); // Recargar lista blanca activa
      setApprovingEmail(null);
      setSuccessMsg(`Usuario "${pendingUser.email}" aprobado y movido a la lista blanca.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmittingApprove(false);
    }
  };

  // Rechazar usuario en suspenso (Ejecución real)
  const executeRejectPending = async (email: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/admin/users/pending?email=${encodeURIComponent(email)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al rechazar la solicitud.');
      }

      setPendingUsers(pendingUsers.filter((u) => u.email !== email));
      setSuccessMsg(`Solicitud del usuario "${email}" rechazada y eliminada.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // Rechazar usuario en suspenso (borrar intento)
  const handleRejectPending = async (email: string) => {
    setConfirmConfig({
      isOpen: true,
      message: `¿Estás seguro de que deseas rechazar y borrar la solicitud del usuario "${email}"?`,
      onConfirm: () => executeRejectPending(email)
    });
  };

  // Agregar nueva IP
  const handleAddIp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIpAddress) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setSubmittingIp(true);

    try {
      const res = await fetch('/api/admin/ips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ip_address: newIpAddress.trim(),
          description: newIpDescription.trim() || 'Agregada desde Panel Admin',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al agregar la IP.');
      }

      await fetchIps();
      setNewIpAddress('');
      setNewIpDescription('');
      setSuccessMsg('Dirección IP agregada exitosamente a la lista blanca.');
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmittingIp(false);
    }
  };

  // Agregar mi IP actual automáticamente
  const handleAddCurrentIp = async () => {
    if (!currentIp) {
      setErrorMsg('No se detectó tu dirección IP actual.');
      return;
    }

    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch('/api/admin/ips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ip_address: currentIp,
          description: 'Mi IP actual (Autodetectada)',
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al autorizar la IP actual.');
      }

      await fetchIps();
      setSuccessMsg(`Tu IP actual (${currentIp}) ha sido autorizada correctamente.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // Actualizar una IP en la lista blanca (Edición / Reemplazo rápido)
  const handleUpdateIp = async (id: string, updatedFields: { ip_address?: string; description?: string }) => {
    setUpdatingIpId(id);
    setErrorMsg(null);
    setSuccessMsg(null);

    const ipToUpdate = ips.find((ip) => ip.id === id);
    if (!ipToUpdate) return;

    const ip_address = updatedFields.ip_address !== undefined ? updatedFields.ip_address.trim() : ipToUpdate.ip_address;
    const description = updatedFields.description !== undefined ? updatedFields.description.trim() : ipToUpdate.description;

    try {
      const res = await fetch('/api/admin/ips', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          ip_address,
          description,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al actualizar la IP.');
      }

      setIps((prevIps) =>
        prevIps.map((ip) =>
          ip.id === id
            ? { ...ip, ip_address, description }
            : ip
        )
      );
      setEditingIpId(null);
      setSuccessMsg(`Dirección IP "${ip_address}" actualizada correctamente.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setUpdatingIpId(null);
    }
  };

  // Eliminar IP de la lista blanca (Ejecución real)
  const executeDeleteIp = async (id: string, ipAddress: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`/api/admin/ips?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Error al eliminar la IP.');
      }

      setIps(ips.filter((ip) => ip.id !== id));
      setSuccessMsg(`Dirección IP "${ipAddress}" eliminada del cortafuegos.`);
    } catch (err: any) {
      setErrorMsg(err.message);
    }
  };

  // Eliminar IP de la lista blanca
  const handleDeleteIp = async (id: string, ipAddress: string) => {
    setConfirmConfig({
      isOpen: true,
      message: `¿Estás seguro de que deseas eliminar la IP "${ipAddress}" del cortafuegos de acceso?`,
      onConfirm: () => executeDeleteIp(id, ipAddress)
    });
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
        {/* Encabezado */}
        <div className="admin-header">
          <div className="admin-header-content-left">
            <h1 className="admin-title">Panel de Control de Seguridad</h1>
            <p className="admin-subtitle">
              Configura los correos aprobados, IP autorizadas y usuarios en suspenso.
            </p>
          </div>
          <div className="admin-header-content-right">
            <Link href="/" className="back-pi-link" title="Volver al Libro">
              π
            </Link>
          </div>
        </div>

        {/* Notificaciones */}
        {errorMsg && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <div className="alert-text">{errorMsg}</div>
          </div>
        )}
        {successMsg && (
          <div className="alert alert-success">
            <span className="alert-icon">✨</span>
            <div className="alert-text">{successMsg}</div>
          </div>
        )}

        {/* Métricas Generales */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Estado del Sistema</h3>
            <p className="stat-value">Activo</p>
            <p className="stat-desc">Supabase / RLS Protegido</p>
          </div>

          <div className="stat-card">
            <h3>Lista Blanca Activa</h3>
            <p className="stat-value">{users.length}</p>
            <p className="stat-desc">Correos autorizados</p>
          </div>

          <div className="stat-card">
            <h3>En Suspenso</h3>
            <p className="stat-value pending-value">{pendingUsers.length}</p>
            <p className="stat-desc">Usuarios esperando aprobación</p>
          </div>

          <div className="stat-card">
            <h3>IPs Permitidas</h3>
            <p className="stat-value">{ips.length}</p>
            <p className="stat-desc">Acceso firewall habilitado</p>
          </div>
        </div>

        {/* Menú de Pestañas */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('users');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
          >
            📂 Lista Blanca de Usuarios
          </button>
          <button
            className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('pending');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
          >
            ⏳ Usuarios en Suspenso {pendingUsers.length > 0 && <span className="tab-badge">{pendingUsers.length}</span>}
          </button>
          <button
            className={`tab-btn ${activeTab === 'ips' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('ips');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
          >
            🛡️ Firewall de IPs
          </button>
          <button
            className={`tab-btn ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('templates');
              setErrorMsg(null);
              setSuccessMsg(null);
            }}
          >
            ✉️ Plantillas de Correo
          </button>
        </div>

        {/* Pestaña de Usuarios (Lista Blanca) */}
        {activeTab === 'users' && (
          <div className="tab-pane fade-in">
            {/* Política de Registro Abierto */}
            <div className="quick-action-card" style={{ marginBottom: '1.5rem', borderLeft: `4px solid ${allowPublicSignup ? 'var(--primary-color, #10b981)' : '#ef4444'}` }}>
              <div className="quick-action-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    🔑 Política de Registro (Sign Up)
                  </h4>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.8 }}>
                    {allowPublicSignup 
                      ? 'Se permite el registro abierto. Los usuarios nuevos ingresan automáticamente como "Invitados".' 
                      : 'Registro restringido. Todo nuevo usuario de Google requerirá aprobación manual del administrador.'}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 'bold', color: allowPublicSignup ? '#10b981' : '#ef4444', fontSize: '1.05rem' }}>
                    {allowPublicSignup ? '🟢 REGISTRO ABIERTO' : '🔴 REQUERIR APROBACIÓN'}
                  </span>
                  <button 
                    onClick={handleTogglePublicSignup} 
                    className={allowPublicSignup ? 'btn-danger-toggle' : 'btn-success'}
                    disabled={submittingSignupSetting}
                    style={{ minWidth: '150px' }}
                  >
                    {submittingSignupSetting ? 'Guardando...' : allowPublicSignup ? 'Restringir' : 'Permitir'}
                  </button>
                </div>
              </div>
            </div>

            {/* Formulario para agregar usuario */}
            <div className="crud-form-card">
              <h3>Invitar / Agregar Nuevo Usuario</h3>
              <form onSubmit={handleAddUser} className="crud-form">
                <div className="form-group">
                  <label htmlFor="user-email">Correo Electrónico (Email Google)</label>
                  <input
                    id="user-email"
                    type="email"
                    placeholder="ejemplo@gmail.com"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user-name">Nombre (Opcional)</label>
                  <input
                    id="user-name"
                    type="text"
                    placeholder="Juan Pérez"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user-celular">Celular / Teléfono</label>
                  <input
                    id="user-celular"
                    type="text"
                    placeholder="+5493416123456"
                    value={newUserCelular}
                    onChange={(e) => setNewUserCelular(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user-role">Rol Inicial</label>
                  <select
                    id="user-role"
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                  >
                    {roles.length > 0 ? (
                      roles.map(r => (
                        <option key={r.id} value={r.id === 'alumno' ? 'user' : r.id}>
                          {r.is_active ? r.label : r.id}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="user">Alumno</option>
                        <option value="docente">Docente</option>
                        <option value="admin">Administrador</option>
                        <option value="guest">Invitado</option>
                      </>
                    )}
                  </select>
                </div>

                {newUserRole !== 'admin' && newUserRole !== 'root' && (
                  <div className="form-group full-width">
                    <label>Permisos Especiales (Excepciones)</label>
                    <div className="permissions-checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={newUserPermissions.access_libro}
                          onChange={(e) =>
                            setNewUserPermissions({
                              ...newUserPermissions,
                              access_libro: e.target.checked,
                            })
                          }
                        />
                        Acceso al Libro
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={newUserPermissions.edit_content}
                          onChange={(e) =>
                            setNewUserPermissions({
                              ...newUserPermissions,
                              edit_content: e.target.checked,
                            })
                          }
                        />
                        Editar Contenidos
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={newUserPermissions.manage_users}
                          onChange={(e) =>
                            setNewUserPermissions({
                              ...newUserPermissions,
                              manage_users: e.target.checked,
                            })
                          }
                        />
                        Gestionar Usuarios
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={newUserPermissions.manage_roles}
                          onChange={(e) =>
                            setNewUserPermissions({
                              ...newUserPermissions,
                              manage_roles: e.target.checked,
                            })
                          }
                        />
                        Gestionar Roles
                      </label>
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={newUserPermissions.view_metrics}
                          onChange={(e) =>
                            setNewUserPermissions({
                              ...newUserPermissions,
                              view_metrics: e.target.checked,
                            })
                          }
                        />
                        Ver Métricas
                      </label>
                    </div>
                  </div>
                )}

                <div className="form-actions">
                  <button type="submit" className="btn-primary" disabled={submittingUser}>
                    {submittingUser ? 'Agregando...' : '➕ Agregar a Lista Blanca'}
                  </button>
                </div>
              </form>
            </div>

            {/* Tabla de Usuarios */}
            <div className="whitelist-section">
              <div className="section-header">
                <h2>Usuarios Registrados</h2>
                <span className="badge">{users.length} total</span>
              </div>
              <div className="table-responsive">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Celular</th>
                      <th>Rol</th>
                      <th>Acceso Libro</th>
                      <th>Editar Contenido</th>
                      <th>Gestión Usuarios</th>
                      <th>Gestión Roles</th>
                      <th>Métricas</th>
                      <th style={{ textAlign: 'center' }}>Acciones</th>
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
                          <input
                            key={user.email + '_' + (user.celular || '')}
                            type="text"
                            defaultValue={user.celular || ''}
                            onBlur={(e) => handleUpdateUser(user.email, { celular: e.target.value })}
                            placeholder="Agregar celular"
                            className="inline-input"
                            disabled={updatingUser === user.email}
                          />
                        </td>
                        <td>
                          <select
                            value={user.role}
                            onChange={(e) => handleUpdateUser(user.email, { role: e.target.value })}
                            disabled={updatingUser === user.email || user.email === currentUserEmail || user.role === 'root'}
                            className="role-select"
                          >
                            {user.role === 'root' && (
                              <option value="root">
                                {roles.find(r => r.id === 'root')?.label || 'Root'}
                              </option>
                            )}
                            {roles.length > 0 ? (
                              roles.map(r => (
                                <option key={r.id} value={r.id === 'alumno' ? 'user' : r.id}>
                                  {r.is_active ? r.label : r.id}
                                </option>
                              ))
                            ) : (
                              <>
                                <option value="admin">Administrador</option>
                                <option value="docente">Docente</option>
                                <option value="user">Alumno</option>
                                <option value="guest">Invitado</option>
                              </>
                            )}
                          </select>
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={user.permissions?.access_libro || false}
                            onChange={(e) =>
                              handleUpdateUser(user.email, {
                                permissions: { access_libro: e.target.checked },
                              })
                            }
                            disabled={updatingUser === user.email || user.role === 'root'}
                            className="permission-checkbox"
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={user.permissions?.edit_content || false}
                            onChange={(e) =>
                              handleUpdateUser(user.email, {
                                permissions: { edit_content: e.target.checked },
                              })
                            }
                            disabled={updatingUser === user.email || user.role === 'root'}
                            className="permission-checkbox"
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={user.permissions?.manage_users || false}
                            onChange={(e) =>
                              handleUpdateUser(user.email, {
                                permissions: { manage_users: e.target.checked },
                              })
                            }
                            disabled={updatingUser === user.email || user.role === 'root'}
                            className="permission-checkbox"
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={user.permissions?.manage_roles || false}
                            onChange={(e) =>
                              handleUpdateUser(user.email, {
                                permissions: { manage_roles: e.target.checked },
                              })
                            }
                            disabled={updatingUser === user.email || user.role === 'root'}
                            className="permission-checkbox"
                          />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            checked={user.permissions?.view_metrics || false}
                            onChange={(e) =>
                              handleUpdateUser(user.email, {
                                permissions: { view_metrics: e.target.checked },
                              })
                            }
                            disabled={updatingUser === user.email || user.role === 'root'}
                            className="permission-checkbox"
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <button
                            onClick={() => handleDeleteUser(user.email)}
                            disabled={user.email === currentUserEmail || updatingUser === user.email}
                            className="btn-danger-action"
                            title="Eliminar de la lista blanca"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Pestaña de Usuarios en Suspenso */}
        {activeTab === 'pending' && (
          <div className="tab-pane fade-in">
            <div className="whitelist-section">
              <div className="section-header">
                <h2>Usuarios Esperando Aprobación</h2>
                <span className="badge">{pendingUsers.length} en espera</span>
              </div>
              <div className="table-responsive">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th>Usuario</th>
                      <th>Celular Opcional</th>
                      <th>Fecha de Intento</th>
                      <th style={{ textAlign: 'center', width: '220px' }}>Configuración de Aprobación</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingUsers.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', opacity: 0.6, padding: '2.5rem' }}>
                          No hay solicitudes de acceso pendientes en la cola. Todo está en orden.
                        </td>
                      </tr>
                    ) : (
                      pendingUsers.map((pending) => (
                        <tr key={pending.email}>
                          <td>
                            <div className="user-info">
                              <span className="user-name">{pending.name || 'Invitado sin Nombre'}</span>
                              <span className="user-email">{pending.email}</span>
                            </div>
                          </td>
                          <td>
                            <span className="celular-text">{pending.celular || 'No proveído'}</span>
                          </td>
                          <td>
                            <span className="date-text">
                              {new Date(pending.created_at).toLocaleString('es-AR')}
                            </span>
                          </td>
                          <td style={{ textAlign: 'center' }}>
                            {approvingEmail === pending.email ? (
                              <div className="approve-settings-box">
                                <div className="approve-setting-group">
                                  <label>Rol:</label>
                                  <select
                                    value={approveRole}
                                    onChange={(e) => setApproveRole(e.target.value)}
                                    className="role-select-small"
                                  >
                                    {roles.length > 0 ? (
                                      roles.filter(r => r.is_active !== false && r.id !== 'root').map(r => (
                                        <option key={r.id} value={r.id === 'alumno' ? 'user' : r.id}>{r.label}</option>
                                      ))
                                    ) : (
                                      <>
                                        <option value="user">Alumno</option>
                                        <option value="docente">Docente</option>
                                        <option value="admin">Administrador</option>
                                        <option value="guest">Invitado</option>
                                      </>
                                    )}
                                  </select>
                                </div>
                                <div className="approve-setting-group">
                                  <label>Celular:</label>
                                  <input
                                    type="text"
                                    value={approveCelular}
                                    onChange={(e) => setApproveCelular(e.target.value)}
                                    placeholder="Nro Celular"
                                    className="inline-input-small"
                                  />
                                </div>
                                <div className="approve-actions-row">
                                  <button
                                    onClick={() => handleApprovePending(pending)}
                                    disabled={submittingApprove}
                                    className="btn-approve-confirm"
                                    title="Confirmar Aprobación"
                                  >
                                    {submittingApprove ? '...' : '✓ Aprobar'}
                                  </button>
                                  <button
                                    onClick={() => setApprovingEmail(null)}
                                    className="btn-approve-cancel"
                                    title="Cancelar"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="actions-pending-row">
                                <button
                                  onClick={() => {
                                    setApprovingEmail(pending.email);
                                    setApproveRole('user');
                                    setApproveCelular(pending.celular || '');
                                  }}
                                  className="btn-approve-trigger"
                                  title="Configurar y Aprobar"
                                >
                                  👍 Aprobar...
                                </button>
                                <button
                                  onClick={() => handleRejectPending(pending.email)}
                                  className="btn-reject-trigger"
                                  title="Rechazar y Eliminar solicitud"
                                >
                                  ✕ Rechazar
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Pestaña de IPs */}
        {activeTab === 'ips' && (
          <div className="tab-pane fade-in">
            {/* Estado del Cortafuegos de IPs */}
            <div className="quick-action-card" style={{ marginBottom: '1rem', borderLeft: `4px solid ${enableIpRestriction ? 'var(--primary-color, #10b981)' : '#ef4444'}` }}>
              <div className="quick-action-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                    🛡️ Estado del Cortafuegos de IPs
                  </h4>
                  <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', opacity: 0.8 }}>
                    Si está activado, solo las direcciones de la lista blanca e IPs de Mega Admins podrán acceder al sistema.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 'bold', color: enableIpRestriction ? '#10b981' : '#ef4444', fontSize: '1.05rem' }}>
                    {enableIpRestriction ? '🟢 ACTIVADO' : '🔴 DESACTIVADO'}
                  </span>
                  <button 
                    onClick={handleToggleIpRestriction} 
                    className={enableIpRestriction ? 'btn-danger-toggle' : 'btn-success'}
                    disabled={submittingSettings}
                    style={{ minWidth: '150px' }}
                  >
                    {submittingSettings ? 'Guardando...' : enableIpRestriction ? 'Desactivar' : 'Activar'}
                  </button>
                </div>
              </div>
            </div>
            {/* Info de IP actual */}
            <div style={{ marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.9 }}>
              Dirección IP del administrador conectado actualmente: <code style={{ background: 'var(--hover-color)', border: '1px solid var(--border-color)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontWeight: 'bold', color: 'var(--primary-color)' }}>{currentIp || 'Buscando...'}</code>
            </div>

            {/* Formulario Manual de IP */}
            <div className="crud-form-card">
              <h3>Agregar Dirección IP Manualmente</h3>
              <form onSubmit={handleAddIp} className="crud-form">
                <div className="form-group" style={{ flex: 1.5 }}>
                  <label htmlFor="ip-address">Dirección IP (IPv4 o IPv6)</label>
                  <input
                    id="ip-address"
                    type="text"
                    placeholder="190.111.45.23"
                    value={newIpAddress}
                    onChange={(e) => setNewIpAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ flex: 2 }}>
                  <label htmlFor="ip-desc">Descripción / Nota</label>
                  <input
                    id="ip-desc"
                    type="text"
                    placeholder="Oficina central, casa de administrador, etc."
                    value={newIpDescription}
                    onChange={(e) => setNewIpDescription(e.target.value)}
                  />
                </div>
                <div className="form-actions" style={{ alignSelf: 'flex-end', marginBottom: '0.1rem' }}>
                  <button type="submit" className="btn-primary" disabled={submittingIp}>
                    {submittingIp ? 'Guardando...' : '➕ Agregar IP'}
                  </button>
                </div>
              </form>
            </div>

            {/* Tabla de IPs */}
            <div className="whitelist-section">
              <div className="section-header">
                <h2>IPs Autorizadas en el Cortafuegos</h2>
                <span className="badge">{ips.length} total</span>
              </div>
              <div className="table-responsive">
                <table className="user-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40%' }}>Dirección IP</th>
                      <th style={{ width: '30%' }}>Descripción / Nota</th>
                      <th style={{ width: '15%' }}>Creado Por</th>
                      <th style={{ textAlign: 'center', width: '15%' }}>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ips.length === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ textAlign: 'center', opacity: 0.6, padding: '2rem' }}>
                          No hay direcciones IP autorizadas. El firewall no está bloqueando ninguna IP, o todos están accediendo mediante bypass.
                        </td>
                      </tr>
                    ) : (
                      ips.map((ip) => {
                        const isEditing = editingIpId === ip.id;
                        return (
                          <tr key={ip.id} className={ip.ip_address === currentIp ? 'current-user-row' : ''}>
                            <td>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editIpAddress}
                                  onChange={(e) => setEditIpAddress(e.target.value)}
                                  className="inline-input"
                                  style={{ fontFamily: 'monospace', width: '100%', padding: '0.25rem 0.5rem' }}
                                  disabled={updatingIpId === ip.id}
                                />
                              ) : (
                                <div className="ip-info">
                                  <span className="ip-address">{ip.ip_address}</span>
                                  {ip.ip_address === currentIp && <span className="self-badge">Tu IP</span>}
                                </div>
                              )}
                            </td>
                            <td>
                              {isEditing ? (
                                <input
                                  type="text"
                                  value={editIpDescription}
                                  onChange={(e) => setEditIpDescription(e.target.value)}
                                  className="inline-input"
                                  style={{ width: '100%', padding: '0.25rem 0.5rem' }}
                                  placeholder="Notas..."
                                  disabled={updatingIpId === ip.id}
                                />
                              ) : (
                                <span className="ip-desc">{ip.description || 'Sin notas'}</span>
                              )}
                            </td>
                            <td>
                              <span className="ip-author">{ip.created_by || 'Sistema'}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                                {isEditing ? (
                                  <>
                                    <button
                                      onClick={() => handleUpdateIp(ip.id, { ip_address: editIpAddress, description: editIpDescription })}
                                      disabled={updatingIpId === ip.id}
                                      className="btn-success-action"
                                      title="Guardar cambios"
                                      style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                    >
                                      💾
                                    </button>
                                    <button
                                      onClick={() => setEditingIpId(null)}
                                      disabled={updatingIpId === ip.id}
                                      className="btn-cancel-action"
                                      title="Cancelar"
                                      style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                    >
                                      ✕
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      onClick={() => {
                                        if (currentIp) {
                                          handleUpdateIp(ip.id, { ip_address: currentIp });
                                        } else {
                                          setErrorMsg('No se pudo autodetectar tu dirección IP actual.');
                                        }
                                      }}
                                      disabled={updatingIpId !== null}
                                      className="btn-quick-ip-action"
                                      title="Reemplazar con mi IP actual"
                                      style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                    >
                                      ⚡
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditingIpId(ip.id);
                                        setEditIpAddress(ip.ip_address);
                                        setEditIpDescription(ip.description || '');
                                      }}
                                      disabled={updatingIpId !== null}
                                      className="btn-edit-action"
                                      title="Editar registro"
                                      style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                    >
                                      ✏️
                                    </button>
                                    <button
                                      onClick={() => handleDeleteIp(ip.id, ip.ip_address)}
                                      disabled={updatingIpId !== null}
                                      className="btn-danger-action"
                                      title="Remover de la lista blanca de IPs"
                                      style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem' }}
                                    >
                                      🗑️
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        )}

        {/* Pestaña de Plantillas de Correo */}
        {activeTab === 'templates' && (
          <div className="tab-pane fade-in">
            <div className="crud-form-card">
              <h3>Editor de Plantillas de Correo Electrónico</h3>
              <p style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '1.5rem', lineHeight: '1.4' }}>
                Modifica directamente los archivos de correo en el servidor de la aplicación. Estos archivos se utilizan para las notificaciones transaccionales automáticas. Puedes usar sintaxis HTML con las etiquetas correspondientes como <code>{"{{email}}"}</code>, <code>{"{{name}}"}</code>, <code>{"{{celular}}"}</code> y <code>{"{{date}}"}</code>.
              </p>

              <div className="template-selector-container" style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, marginRight: '1rem' }}>Seleccionar Plantilla:</label>
                <select
                  value={selectedTemplateId}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="role-select"
                  style={{ minWidth: '300px' }}
                >
                  {templates.map(t => (
                    <option key={t.id} value={t.id}>{t.name} ({t.filename})</option>
                  ))}
                </select>
              </div>

              <form onSubmit={handleSaveTemplate} className="space-y-4">
                <div className="form-group full-width">
                  <label htmlFor="template-editor-content">Contenido HTML / MD de la Plantilla</label>
                  <textarea
                    id="template-editor-content"
                    value={templateContent}
                    onChange={(e) => setTemplateContent(e.target.value)}
                    rows={18}
                    required
                    style={{
                      width: '100%',
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      background: 'var(--card-bg)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-color)',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      outline: 'none',
                      resize: 'vertical',
                      lineHeight: '1.5'
                    }}
                  />
                </div>
                <div className="form-actions" style={{ marginTop: '1rem' }}>
                  <button type="submit" className="btn-success" disabled={savingTemplate}>
                    {savingTemplate ? 'Guardando cambios...' : '💾 Guardar Plantilla'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Modal Personalizado de Confirmación */}
      {confirmConfig && confirmConfig.isOpen && (
        <div className="abaccus-modal-overlay">
          <div className="abaccus-modal-card">
            <div className="modal-header">
              <span className="modal-title">Ecosistema ABACCUS - Matemática Financiera</span>
            </div>
            <div className="modal-body">
              <p>{confirmConfig.message}</p>
            </div>
            <div className="modal-footer">
              <button 
                type="button"
                className="modal-btn-cancel" 
                onClick={() => setConfirmConfig(null)}
              >
                Cancelar
              </button>
              <button 
                type="button"
                className="modal-btn-confirm" 
                onClick={() => {
                  confirmConfig.onConfirm();
                  setConfirmConfig(null);
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

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

        /* Alertas */
        .alert {
          padding: 1rem 1.25rem;
          border-radius: 0.75rem;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .alert-icon {
          font-size: 1.25rem;
        }

        .alert-text {
          font-weight: 500;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.1);
          color: var(--primary-color);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }

        /* Pestañas */
        .admin-tabs {
          display: flex;
          gap: 0.5rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1px;
          margin-bottom: 2rem;
        }

        .tab-btn {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 0.75rem 1.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-color);
          opacity: 0.6;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tab-btn:hover {
          opacity: 0.9;
          background: var(--hover-color);
          border-radius: 0.5rem 0.5rem 0 0;
        }

        .tab-btn.active {
          opacity: 1;
          color: var(--primary-color);
          border-bottom-color: var(--primary-color);
        }

        .tab-badge {
          background: #ef4444;
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.1rem 0.4rem;
          border-radius: 10px;
          margin-left: 0.25rem;
        }

        .tab-pane {
          width: 100%;
        }

        .fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Formularios */
        .crud-form-card {
          background: var(--hover-color);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
        }

        .crud-form-card h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: var(--text-color);
        }

        .crud-form {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          flex: 1 1 200px;
        }

        .form-group.full-width {
          flex: 1 1 100%;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-color);
          opacity: 0.8;
        }

        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group select {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          padding: 0.6rem 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.95rem;
          outline: none;
          transition: var(--transition);
        }

        .form-group input:focus,
        .form-group select:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.15);
        }

        .permissions-checkbox-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          background: var(--card-bg);
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid var(--border-color);
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
        }

        .checkbox-label input {
          width: 1.1rem;
          height: 1.1rem;
          accent-color: var(--primary-color);
        }

        .form-actions {
          display: flex;
          align-items: center;
          margin-top: 0.5rem;
        }

        /* Botones Especiales */
        .btn-success {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-success:hover {
          background: var(--primary-hover);
        }

        .btn-danger-toggle {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-danger-toggle:hover {
          background: #dc2626;
        }

        .btn-danger-action {
          background: transparent;
          border: none;
          font-size: 1.1rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          transition: var(--transition);
        }

        .btn-danger-action:hover {
          background: rgba(239, 68, 68, 0.15);
          transform: scale(1.1);
        }

        /* Cartas de Acciones Rápidas (IP) */
        .quick-action-card {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(59, 130, 246, 0.05) 100%);
          border: 1px solid rgba(16, 185, 129, 0.15);
          border-radius: 1rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .quick-action-content h4 {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-color);
          margin-bottom: 0.5rem;
        }

        .quick-action-content p {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 1rem;
          line-height: 1.4;
        }

        .ip-display-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .ip-display-row code {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 700;
          font-size: 1rem;
          color: var(--primary-color);
        }

        /* Métricas */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
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
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }

        .stat-value.pending-value {
          color: #f59e0b;
        }

        .stat-value.ip-detected {
          font-size: 1.25rem;
          font-family: monospace;
          word-break: break-all;
          line-height: 2.1rem;
        }

        .stat-desc {
          font-size: 0.8rem;
          color: var(--text-color);
          opacity: 0.7;
        }

        /* Secciones de Tabla */
        .whitelist-section {
          margin-top: 1.5rem;
        }

        .section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .section-header h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-color);
        }

        .badge {
          background: var(--hover-color);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          padding: 0.25rem 0.6rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
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
          font-size: 0.825rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .user-table tr:last-child td {
          border-bottom: none;
        }

        .user-info, .ip-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          align-items: flex-start;
        }

        .user-name {
          font-weight: 600;
          color: var(--text-color);
        }

        .user-email, .ip-address {
          font-size: 0.85rem;
          color: var(--text-color);
          opacity: 0.6;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .ip-address {
          font-size: 1rem;
          font-family: monospace;
          font-weight: 700;
          color: var(--text-color);
          opacity: 1;
        }

        .ip-desc {
          font-weight: 500;
        }

        .ip-author {
          font-size: 0.85rem;
          opacity: 0.7;
        }

        .celular-text, .date-text {
          font-size: 0.9rem;
          font-weight: 500;
        }

        .self-badge {
          background: rgba(16, 185, 129, 0.15);
          color: var(--primary-color);
          padding: 0.1rem 0.4rem;
          border-radius: 0.25rem;
          font-weight: 700;
          font-size: 0.75rem;
        }

        .inline-input {
          background: transparent;
          border: 1px solid transparent;
          color: var(--text-color);
          padding: 0.3rem 0.5rem;
          border-radius: 0.375rem;
          width: 100%;
          min-width: 180px;
          max-width: 220px;
          font-size: 0.9rem;
          transition: var(--transition);
        }

        .inline-input:hover {
          border-color: var(--border-color);
          background: var(--hover-color);
        }

        .inline-input:focus {
          border-color: var(--primary-color);
          background: var(--card-bg);
          outline: none;
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
          transition: var(--transition);
        }

        .role-select:focus {
          border-color: var(--primary-color);
        }

        .permission-checkbox {
          width: 1.15rem;
          height: 1.15rem;
          accent-color: var(--primary-color);
          cursor: pointer;
        }

        /* Pending settings box & triggers */
        .actions-pending-row {
          display: flex;
          gap: 0.5rem;
          justify-content: center;
        }

        .btn-approve-trigger {
          background: rgba(16, 185, 129, 0.12);
          color: var(--primary-color);
          border: 1px solid rgba(16, 185, 129, 0.25);
          padding: 0.4rem 0.8rem;
          border-radius: 0.375rem;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-approve-trigger:hover {
          background: var(--primary-color);
          color: white;
        }

        .btn-reject-trigger {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.2);
          padding: 0.4rem 0.8rem;
          border-radius: 0.375rem;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-reject-trigger:hover {
          background: #ef4444;
          color: white;
        }

        .approve-settings-box {
          background: var(--hover-color);
          border: 1px solid var(--border-color);
          padding: 0.75rem;
          border-radius: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          text-align: left;
          width: 200px;
          margin: 0 auto;
        }

        .approve-setting-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: space-between;
        }

        .approve-setting-group label {
          font-size: 0.8rem;
          font-weight: 600;
          opacity: 0.8;
        }

        .role-select-small {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.8rem;
        }

        .inline-input-small {
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--text-color);
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.8rem;
          width: 110px;
        }

        .approve-actions-row {
          display: flex;
          justify-content: space-between;
          margin-top: 0.25rem;
          gap: 0.5rem;
        }

        .btn-approve-confirm {
          flex: 1;
          background: var(--primary-color);
          color: white;
          border: none;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 0.3rem;
          border-radius: 0.25rem;
          cursor: pointer;
        }

        .btn-approve-confirm:hover {
          background: var(--primary-hover);
        }

        .btn-approve-cancel {
          background: rgba(107, 114, 128, 0.15);
          color: var(--text-color);
          border: none;
          font-size: 0.8rem;
          padding: 0.3rem 0.5rem;
          border-radius: 0.25rem;
          cursor: pointer;
        }

        .btn-approve-cancel:hover {
          background: rgba(107, 114, 128, 0.25);
        }

        /* Modal de Confirmación Estilizado */
        .abaccus-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20000;
          animation: fadeIn 0.2s ease;
        }
        .abaccus-modal-card {
          background-color: var(--card-bg, #111115);
          border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          width: 90%;
          max-width: 420px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: scaleIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .modal-header {
          padding: 1.25rem 1.5rem 0.75rem;
          border-bottom: 1px solid var(--border-color, rgba(255, 255, 255, 0.05));
        }
        .modal-title {
          font-size: 0.8rem;
          font-weight: 750;
          color: var(--primary-color, #10b981);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .modal-body {
          padding: 1.5rem;
          font-size: 0.95rem;
          color: var(--text-color);
          line-height: 1.5;
        }
        .modal-footer {
          padding: 1rem 1.5rem 1.25rem;
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          border-top: 1px solid var(--border-color, rgba(255, 255, 255, 0.05));
        }
        .modal-btn-confirm {
          background-color: var(--primary-color, #10b981);
          color: white;
          border: none;
          padding: 0.55rem 1.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .modal-btn-confirm:hover {
          background-color: var(--primary-hover, #059669);
          transform: translateY(-1px);
        }
        .modal-btn-cancel {
          background-color: transparent;
          color: var(--text-color);
          border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
          padding: 0.55rem 1.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .modal-btn-cancel:hover {
          background-color: rgba(107, 114, 128, 0.1);
        }

        @media (max-width: 768px) {
          .admin-container {
            padding: 1rem 0.5rem;
          }
          .admin-card {
            padding: 1.25rem;
            border-radius: 1rem;
          }
          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          .admin-tabs {
            flex-direction: column;
            gap: 0.25rem;
          }
          .tab-btn {
            width: 100%;
            padding: 0.6rem 1rem;
          }
          .user-table th:nth-child(4),
          .user-table td:nth-child(4),
          .user-table th:nth-child(5),
          .user-table td:nth-child(5),
          .user-table th:nth-child(6),
          .user-table td:nth-child(6) {
            display: none; /* Ocultar checks de permisos en móvil */
          }
        }
      `}</style>
    </div>
  );
}
