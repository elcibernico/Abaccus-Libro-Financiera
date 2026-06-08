'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Mail, Calendar, Hash, Phone, Shield, ArrowLeft, Check, AlertTriangle, Trash2 } from 'lucide-react';
import { supabase } from '@/core/security/supabaseClient';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [legajo, setLegajo] = useState('');
  const [celular, setCelular] = useState('');
  const [role, setRole] = useState('guest');
  const [realRole, setRealRole] = useState('guest');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setErrorMsg('');

      const response = await fetch('/api/profile');
      const data = await response.json();

      if (response.ok && data.success) {
        const p = data.profile;
        setEmail(p.email);
        setNombre(p.nombre);
        setApellido(p.apellido);
        setDni(p.dni || '');
        setFechaNacimiento(p.fecha_nacimiento ? p.fecha_nacimiento.substring(0, 10) : '');
        setLegajo(p.legajo || '');
        setCelular(p.celular || '');
        setRole(p.role || 'guest');
      } else {
        setErrorMsg(data.error || 'No se pudieron cargar los datos de perfil.');
      }

      // Obtener el rol real e impersonated del endpoint /api/auth/me
      const meResponse = await fetch('/api/auth/me');
      const meData = await meResponse.json();
      if (meResponse.ok && meData.authenticated) {
        setRealRole(meData.user.realRole || meData.user.role || 'guest');
        setRole(meData.user.role || 'guest');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de red al obtener datos de perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim()) {
      setErrorMsg('Nombre y Apellido son campos obligatorios.');
      return;
    }
    if (!dni.trim()) {
      setErrorMsg('El DNI es obligatorio.');
      return;
    }

    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          apellido: apellido.trim(),
          dni: dni.trim(),
          fecha_nacimiento: fechaNacimiento || null,
          legajo: legajo.trim() || null,
          celular: celular.trim() || null,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg('¡Perfil actualizado con éxito!');
        // Desvanecer el mensaje de éxito después de 4 segundos
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(data.error || 'Ocurrió un error al actualizar los datos.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('No se pudo establecer conexión para guardar los cambios.');
    } finally {
      setSaving(false);
    }
  };

  const handleImpersonate = async (targetRole: string) => {
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('/api/auth/impersonate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: targetRole }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg(data.message);
        window.location.reload();
      } else {
        setErrorMsg(data.error || 'No se pudo simular el rol.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de red al intentar simular el rol.');
    } finally {
      setSaving(false);
    }
  };

  const handleRestoreRole = async () => {
    setSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('/api/auth/impersonate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: null }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccessMsg(data.message);
        window.location.reload();
      } else {
        setErrorMsg(data.error || 'No se pudo restaurar el rol original.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de red al intentar restaurar el rol.');
    } finally {
      setSaving(false);
    }
  };

  const handleUnsubscribe = async () => {
    setErrorMsg('');
    setSaving(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Cerrar sesión en Supabase Auth
        await supabase.auth.signOut();
        // Redirigir a login indicando que se dio de baja
        router.push('/login?error=unsubscribed');
      } else {
        setErrorMsg(data.error || 'No se pudo procesar la baja voluntaria.');
        setSaving(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de conexión al solicitar la baja.');
      setSaving(false);
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role.toLowerCase()) {
      case 'root':
        return { text: 'MEGA ADMIN / OWNER', bg: 'bg-red' };
      case 'admin':
        return { text: 'ADMINISTRADOR', bg: 'bg-admin' };
      case 'docente':
      case 'profesor':
        return { text: 'DOCENTE / CÁTEDRA', bg: 'bg-docente' };
      case 'alumno':
        return { text: 'ALUMNO', bg: 'bg-alumno' };
      default:
        return { text: 'INVITADO', bg: 'bg-guest' };
    }
  };

  const IMPERSONATION_TARGETS: Record<string, string[]> = {
    root: ['admin', 'docente', 'user', 'guest'],
    admin: ['docente', 'user', 'guest'],
    docente: ['user', 'guest']
  };

  const targets = IMPERSONATION_TARGETS[realRole] || [];
  const isImpersonating = role !== realRole;

  const badge = getRoleBadge(role);

  if (loading) {
    return (
      <div className="profile-container loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando datos de perfil...</p>
        <style jsx>{`
          .loading-container {
            min-height: calc(100vh - 180px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
          }
          .spinner {
            width: 40px;
            height: 40px;
            border: 3px solid rgba(16, 185, 129, 0.1);
            border-top-color: var(--primary-color);
            border-radius: 50%;
            animation: spin 1s infinite linear;
          }
          .loading-text {
            font-size: 0.95rem;
            opacity: 0.7;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Botón de retorno al dashboard */}
      <button className="back-btn" onClick={() => router.push('/')}>
        <ArrowLeft size={16} />
        Volver al Dashboard
      </button>

      <div className="profile-layout">
        {/* Lado izquierdo: Tarjeta de Estado/Resumen */}
        <div className="profile-aside">
          <div className="glass-card user-summary-card">
            <div className="user-avatar-wrapper">
              <div className="user-avatar-initial">
                {nombre ? nombre[0].toUpperCase() : email[0].toUpperCase()}
              </div>
            </div>
            <h3 className="aside-name">
              {nombre || apellido ? `${nombre} ${apellido}`.trim() : 'Usuario'}
            </h3>
            <p className="aside-email">{email}</p>
            <div className={`role-badge-style ${badge.bg}`}>{badge.text}</div>
          </div>
        </div>

        {/* Lado derecho: Formulario de edición + Zona de peligro */}
        <div className="profile-main">
          {errorMsg && (
            <div className="alert alert-error">
              <span className="alert-icon">⚠️</span>
              <div className="alert-text">{errorMsg}</div>
            </div>
          )}

          {successMsg && (
            <div className="alert alert-success">
              <Check size={16} className="alert-icon-check" />
              <div className="alert-text">{successMsg}</div>
            </div>
          )}

          {/* Formulario */}
          <div className="glass-card form-card">
            <h3 className="card-title">Información Personal</h3>
            <form onSubmit={handleSave} className="profile-form">
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Nombre</label>
                  <div className="input-wrapper active-wrapper">
                    <User className="input-icon active-icon" size={16} />
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                      className="profile-input active-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Apellido</label>
                  <div className="input-wrapper active-wrapper">
                    <User className="input-icon active-icon" size={16} />
                    <input
                      type="text"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      required
                      className="profile-input active-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">DNI *</label>
                  <div className="input-wrapper active-wrapper">
                    <Hash className="input-icon active-icon" size={16} />
                    <input
                      type="text"
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      required
                      className="profile-input active-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Correo Electrónico (No editable)</label>
                  <div className="input-wrapper disabled-wrapper">
                    <Mail className="input-icon" size={16} />
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="profile-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Número de Celular</label>
                  <div className="input-wrapper active-wrapper">
                    <Phone className="input-icon active-icon" size={16} />
                    <input
                      type="tel"
                      value={celular}
                      onChange={(e) => setCelular(e.target.value)}
                      placeholder="Ej. +5493416123456"
                      className="profile-input active-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Fecha de Nacimiento</label>
                  <div className="input-wrapper active-wrapper">
                    <Calendar className="input-icon active-icon" size={16} />
                    <input
                      type="date"
                      value={fechaNacimiento}
                      onChange={(e) => setFechaNacimiento(e.target.value)}
                      required
                      className="profile-input active-input date-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Número de Legajo (Opcional)</label>
                  <div className="input-wrapper active-wrapper">
                    <Hash className="input-icon active-icon" size={16} />
                    <input
                      type="text"
                      value={legajo}
                      onChange={(e) => setLegajo(e.target.value)}
                      placeholder="Ej. L-41235"
                      className="profile-input active-input"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={saving} className="btn-submit">
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </form>
          </div>

          {/* Simulación de Roles */}
          {(targets.length > 0 || isImpersonating) && (
            <div className="glass-card impersonation-card">
              <h3 className="card-title">Simulación de Roles (Role Impersonation)</h3>
              <p className="impersonation-desc">
                Como usuario con rol jerárquico (<strong>{realRole.toUpperCase()}</strong>), puedes simular temporalmente un rol inferior para ver el sistema tal como lo vería ese usuario.
              </p>

              {isImpersonating ? (
                <div className="impersonation-active-box">
                  <div className="active-warning">
                    <Shield className="warning-icon" size={20} style={{ color: '#eab308' }} />
                    <span>
                      Estás navegando en modo de simulación como: <strong>{role.toUpperCase()}</strong>.
                    </span>
                  </div>
                  <button 
                    type="button" 
                    className="btn-restore" 
                    disabled={saving}
                    onClick={handleRestoreRole}
                  >
                    Restaurar Rol Real ({realRole.toUpperCase()})
                  </button>
                </div>
              ) : (
                <div className="impersonation-select-box">
                  <div className="form-group select-group">
                    <label className="form-label">Selecciona el rol a simular</label>
                    <div className="select-wrapper">
                      <select 
                        onChange={(e) => {
                          if (e.target.value) {
                            handleImpersonate(e.target.value);
                          }
                        }}
                        defaultValue=""
                        className="impersonation-select"
                      >
                        <option value="" disabled>-- Selecciona un rol --</option>
                        {targets.map(t => (
                          <option key={t} value={t}>
                            {t === 'user' ? 'Alumno/Usuario' : t.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Zona de peligro (Desuscripción) */}
          <div className="glass-card danger-card">
            <h3 className="card-title text-destructive">Zona de Peligro</h3>
            <p className="danger-desc">
              Si solicitas la baja del sistema, ya no podrás acceder a los módulos de aprendizaje. 
              Tus datos quedarán guardados de forma inactiva y podrás solicitar la reincorporación al volver a loguearte.
            </p>

            {!confirmDelete ? (
              <button 
                type="button" 
                className="btn-danger-outline" 
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 size={16} />
                Desuscribirme de la Plataforma
              </button>
            ) : (
              <div className="delete-confirmation-box">
                <div className="confirmation-warning">
                  <AlertTriangle className="warning-icon" size={20} />
                  <span>¿Estás seguro de que deseas darte de baja? Perderás el acceso inmediato al sistema.</span>
                </div>
                <div className="confirmation-actions">
                  <button 
                    type="button" 
                    disabled={saving} 
                    className="btn-danger-confirm" 
                    onClick={handleUnsubscribe}
                  >
                    Sí, confirmar baja
                  </button>
                  <button 
                    type="button" 
                    className="btn-cancel" 
                    onClick={() => setConfirmDelete(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-container {
          min-height: calc(100vh - 120px);
          max-width: 1000px;
          margin: 0 auto;
          padding: 7rem 1.5rem 3rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          border: none;
          color: var(--text-color);
          opacity: 0.7;
          cursor: pointer;
          font-size: 0.9rem;
          font-weight: 600;
          align-self: flex-start;
          transition: var(--transition);
        }

        .back-btn:hover {
          opacity: 1;
          color: var(--primary-color);
          transform: translateX(-3px);
        }

        .profile-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
          align-items: flex-start;
        }

        .user-summary-card {
          padding: 2.5rem 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .user-avatar-wrapper {
          position: relative;
          margin-bottom: 1.25rem;
        }

        .user-avatar-initial {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color), #2dd4bf);
          color: white;
          font-size: 2.2rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 16px rgba(16, 185, 129, 0.2);
        }

        .aside-name {
          font-size: 1.3rem;
          font-weight: 750;
          color: var(--text-color);
          margin-bottom: 0.25rem;
        }

        .aside-email {
          font-size: 0.85rem;
          opacity: 0.6;
          color: var(--text-color);
          margin-bottom: 1.5rem;
          word-break: break-all;
        }

        .role-badge-style {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 0.3rem 0.8rem;
          border-radius: 9999px;
          border: 1px solid;
        }

        .bg-red { background: rgba(239, 68, 68, 0.1); color: #ef4444; border-color: rgba(239, 68, 68, 0.2); }
        .bg-admin { background: rgba(99, 102, 241, 0.1); color: #6366f1; border-color: rgba(99, 102, 241, 0.2); }
        .bg-docente { background: rgba(16, 185, 129, 0.1); color: #10b981; border-color: rgba(16, 185, 129, 0.2); }
        .bg-alumno { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border-color: rgba(59, 130, 246, 0.2); }
        .bg-guest { background: rgba(156, 163, 175, 0.1); color: #9ca3af; border-color: rgba(156, 163, 175, 0.2); }

        .profile-main {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 750;
          color: var(--text-color);
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .text-destructive {
          color: #ef4444;
        }

        .form-card {
          padding: 2.2rem;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .form-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-color);
          opacity: 0.6;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          position: relative;
          border-radius: 0.85rem;
          border: 1px solid var(--border-color);
          transition: var(--transition);
        }

        .disabled-wrapper {
          background: rgba(120, 120, 120, 0.08);
          border-color: rgba(120, 120, 120, 0.12);
        }

        [data-theme='dark'] .disabled-wrapper {
          background: rgba(30, 30, 35, 0.5);
          border-color: rgba(255, 255, 255, 0.04);
        }

        .active-wrapper {
          background: var(--card-bg);
        }

        .active-wrapper:focus-within {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.12);
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          color: var(--text-color);
          opacity: 0.35;
        }

        .active-icon {
          color: var(--primary-color);
          opacity: 0.8;
        }

        .profile-input {
          width: 100%;
          border: none;
          background: transparent;
          padding: 0.8rem 1rem 0.8rem 2.75rem;
          font-size: 0.9rem;
          outline: none;
        }

        .profile-input:disabled {
          color: var(--text-color);
          opacity: 0.45;
          cursor: not-allowed;
        }

        .active-input {
          color: var(--text-color);
        }

        .date-input {
          color-scheme: dark;
        }

        [data-theme='light'] .date-input {
          color-scheme: light;
        }

        .btn-submit {
          align-self: flex-start;
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.8rem 2rem;
          border-radius: 0.85rem;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.1);
        }

        .btn-submit:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(16, 185, 129, 0.15);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Impersonation card */
        .impersonation-card {
          padding: 2.2rem;
          border-color: rgba(99, 102, 241, 0.2);
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.02), rgba(0, 0, 0, 0));
        }
        .impersonation-desc {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }
        .impersonation-active-box {
          background: rgba(234, 179, 8, 0.05);
          border: 1px solid rgba(234, 179, 8, 0.2);
          padding: 1.25rem;
          border-radius: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .active-warning {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          font-weight: 600;
        }
        .btn-restore {
          background: #eab308;
          color: black;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 0.6rem;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition);
        }
        .btn-restore:hover {
          background: #ca8a04;
          color: white;
        }
        .impersonation-select {
          width: 100%;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          padding: 0.8rem 1rem;
          border-radius: 0.85rem;
          color: var(--text-color);
          outline: none;
          cursor: pointer;
          font-weight: 600;
        }
        .impersonation-select:focus {
          border-color: var(--primary-color);
        }

        /* Danger card */
        .danger-card {
          padding: 2.2rem;
          border-color: rgba(239, 68, 68, 0.2);
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.01), rgba(0, 0, 0, 0));
        }

        .danger-desc {
          font-size: 0.9rem;
          opacity: 0.8;
          line-height: 1.5;
          margin-bottom: 1.5rem;
        }

        .btn-danger-outline {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: transparent;
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.4);
          padding: 0.8rem 1.5rem;
          border-radius: 0.85rem;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-danger-outline:hover {
          background: #ef4444;
          color: white;
          border-color: #ef4444;
          box-shadow: 0 6px 12px rgba(239, 68, 68, 0.15);
        }

        .delete-confirmation-box {
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.15);
          padding: 1.25rem;
          border-radius: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          animation: slideDown 0.3s ease-out;
        }

        .confirmation-warning {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: #ef4444;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .warning-icon {
          flex-shrink: 0;
        }

        .confirmation-actions {
          display: flex;
          gap: 0.75rem;
        }

        .btn-danger-confirm {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 0.6rem;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-danger-confirm:hover {
          background: #dc2626;
        }

        .btn-cancel {
          background: transparent;
          color: var(--text-color);
          opacity: 0.7;
          border: 1px solid var(--border-color);
          padding: 0.6rem 1.2rem;
          border-radius: 0.6rem;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-cancel:hover {
          opacity: 1;
          background: rgba(120, 120, 120, 0.05);
        }

        /* Alertas */
        .alert {
          padding: 1rem 1.25rem;
          border-radius: 0.85rem;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.15);
        }

        .alert-success {
          background: rgba(16, 185, 129, 0.08);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.15);
        }

        .alert-icon-check {
          color: #10b981;
          flex-shrink: 0;
        }

        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .profile-layout {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
          .form-grid {
            grid-template-columns: 1fr;
          }
          .profile-container {
            padding-top: 6rem;
          }
        }
      `}</style>
    </div>
  );
}
