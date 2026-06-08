'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Calendar, Hash, Phone, Check, AlertCircle, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [legajo, setLegajo] = useState('');
  const [celular, setCelular] = useState('');
  const [email, setEmail] = useState('');

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
        setNombre(p.nombre || '');
        setApellido(p.apellido || '');
        setDni(p.dni || '');
        setFechaNacimiento(p.fecha_nacimiento ? p.fecha_nacimiento.substring(0, 10) : '');
        setLegajo(p.legajo || '');
        setCelular(p.celular || '');
        setEmail(p.email || '');
        
        // Si ya tiene cargada la fecha de nacimiento y dni, ya completó el onboarding, redirigir
        if (p.fecha_nacimiento && p.dni) {
          router.push('/');
        }
      } else {
        setErrorMsg(data.error || 'No se pudieron verificar tus datos.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de red al comprobar tu perfil.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !apellido.trim()) {
      setErrorMsg('El Nombre y Apellido son obligatorios.');
      return;
    }
    if (!dni.trim()) {
      setErrorMsg('El DNI es obligatorio.');
      return;
    }
    if (!fechaNacimiento) {
      setErrorMsg('La Fecha de Nacimiento es obligatoria.');
      return;
    }
    if (!celular.trim()) {
      setErrorMsg('El Número de Celular es obligatorio.');
      return;
    }

    setSaving(true);
    setErrorMsg('');

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
          fecha_nacimiento: fechaNacimiento,
          legajo: legajo.trim() || null,
          celular: celular.trim()
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Redirigir al inicio ahora que está todo cargado
        router.push('/');
      } else {
        setErrorMsg(data.error || 'Ocurrió un error al guardar tu perfil.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de conexión al enviar el formulario.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="onboarding-container loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Verificando estado del perfil...</p>
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
    <div className="onboarding-container">
      <div className="glass-card onboarding-card">
        <div className="onboarding-header">
          <div className="step-indicator">
            <span className="step-badge">Paso 1 de 1</span>
          </div>
          <h2 className="onboarding-title">Completa tu Perfil</h2>
          <p className="onboarding-desc">
            Para finalizar el alta en el <strong>Ecosistema de Matemática Financiera</strong> y poder acceder a las herramientas, por favor completa los siguientes datos obligatorios.
          </p>
        </div>

        {errorMsg && (
          <div className="alert alert-error">
            <AlertCircle size={18} className="alert-icon" />
            <div className="alert-text">{errorMsg}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="onboarding-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">Correo Electrónico (No editable)</label>
              <div className="input-wrapper active-wrapper" style={{ opacity: 0.7, background: 'rgba(255,255,255,0.03)' }}>
                <User className="input-icon" size={16} style={{ color: 'var(--primary-color)' }} />
                <input
                  type="email"
                  value={email}
                  disabled
                  className="onboarding-input"
                  style={{ cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label highlight-label">Nombre *</label>
              <div className="input-wrapper active-wrapper">
                <User className="input-icon active-icon" size={16} />
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="onboarding-input active-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label highlight-label">Apellido *</label>
              <div className="input-wrapper active-wrapper">
                <User className="input-icon active-icon" size={16} />
                <input
                  type="text"
                  placeholder="Tu apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  required
                  className="onboarding-input active-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label highlight-label">DNI *</label>
              <div className="input-wrapper active-wrapper">
                <Hash className="input-icon active-icon" size={16} />
                <input
                  type="text"
                  placeholder="Tu DNI"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  required
                  className="onboarding-input active-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label highlight-label">Fecha de Nacimiento *</label>
              <div className="input-wrapper active-wrapper">
                <Calendar className="input-icon active-icon" size={16} />
                <input
                  type="date"
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                  required
                  className="onboarding-input active-input date-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label highlight-label">Número de Celular *</label>
              <div className="input-wrapper active-wrapper">
                <Phone className="input-icon active-icon" size={16} />
                <input
                  type="tel"
                  placeholder="Ej. +5493416123456"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  required
                  className="onboarding-input active-input"
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label className="form-label highlight-label">Número de Legajo (Opcional)</label>
              <div className="input-wrapper active-wrapper">
                <Hash className="input-icon active-icon" size={16} />
                <input
                  type="text"
                  placeholder="Ej. L-41235 (Exclusivo Alumnos)"
                  value={legajo}
                  onChange={(e) => setLegajo(e.target.value)}
                  className="onboarding-input active-input"
                />
              </div>
              <p className="hint-text">Utilizado para validar tu condición académica si eres alumno.</p>
            </div>
          </div>

          <button type="submit" disabled={saving} className="btn-submit">
            {saving ? 'Guardando...' : 'Completar Registro'}
            {!saving && <ArrowRight size={16} className="arrow-icon" />}
          </button>
        </form>
      </div>

      <style jsx>{`
        .onboarding-container {
          min-height: calc(100vh - 120px);
          max-width: 600px;
          margin: 0 auto;
          padding: 8rem 1.5rem 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .onboarding-card {
          width: 100%;
          padding: 3rem 2.5rem;
          position: relative;
          overflow: hidden;
        }

        .onboarding-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, var(--primary-color), #2dd4bf, var(--primary-color));
        }

        .onboarding-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .step-indicator {
          margin-bottom: 0.75rem;
        }

        .step-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--primary-color);
          background: rgba(16, 185, 129, 0.08);
          padding: 0.25rem 0.75rem;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .onboarding-title {
          font-size: 1.8rem;
          font-weight: 850;
          color: var(--text-color);
          margin-bottom: 0.5rem;
          letter-spacing: -0.03em;
        }

        .onboarding-desc {
          font-size: 0.9rem;
          color: var(--text-color);
          opacity: 0.7;
          line-height: 1.5;
        }

        .onboarding-form {
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

        .full-width {
          grid-column: span 2;
        }

        .form-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-color);
          opacity: 0.6;
        }

        .highlight-label {
          opacity: 0.85;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          position: relative;
          border-radius: 0.85rem;
          border: 1px solid var(--border-color);
          transition: var(--transition);
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

        .onboarding-input {
          width: 100%;
          border: none;
          background: transparent;
          padding: 0.8rem 1rem 0.8rem 2.75rem;
          font-size: 0.9rem;
          outline: none;
          color: var(--text-color);
        }

        .date-input {
          color-scheme: dark;
        }

        [data-theme='light'] .date-input {
          color-scheme: light;
        }

        .hint-text {
          font-size: 0.75rem;
          color: var(--text-color);
          opacity: 0.5;
          margin-top: 0.2rem;
        }

        .btn-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.9rem;
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
          box-shadow: 0 8px 16px rgba(16, 185, 129, 0.2);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .arrow-icon {
          transition: transform 0.2s ease;
        }

        .btn-submit:hover .arrow-icon {
          transform: translateX(3px);
        }

        /* Alertas */
        .alert {
          padding: 1rem;
          border-radius: 0.75rem;
          font-size: 0.85rem;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: slideDown 0.3s ease-out;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.15);
        }

        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 500px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .full-width {
            grid-column: span 1;
          }
          .onboarding-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
