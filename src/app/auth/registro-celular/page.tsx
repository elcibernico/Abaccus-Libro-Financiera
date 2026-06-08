'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShieldAlert, Phone, User, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

function RegistroCelularForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [celular, setCelular] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    const nameParam = searchParams.get('name');
    if (emailParam) {
      setEmail(emailParam);
    } else {
      router.push('/login');
    }
    if (nameParam) {
      setName(nameParam);
    }
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!celular.trim()) {
      setErrorMsg('Por favor ingresa tu número de celular.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/auth/register-pending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          celular: celular.trim(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        setTimeout(() => {
          router.push('/login?error=pending');
        }, 5000);
      } else {
        setErrorMsg(data.error || 'Hubo un error al registrar tu solicitud. Por favor intenta de nuevo.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('No se pudo establecer conexión con el servidor. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="register-card glass-card success-state">
        <div className="success-badge">
          <CheckCircle2 size={48} className="success-badge-icon" />
        </div>
        <h2 className="success-title">¡Solicitud Registrada!</h2>
        <p className="success-desc">
          Tu número de celular ha sido procesado e ingresado a la lista de espera.
          Se ha enviado una alerta al administrador para autorizar tu acceso al Ecosistema Abaccus.
        </p>
        <div className="redirect-notice">
          <span className="notice-dot"></span>
          Redirigiéndote al portal de inicio de sesión...
        </div>

        <style jsx>{`
          .success-state {
            text-align: center;
            padding: 3rem 2rem;
            position: relative;
          }
          .success-state::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, var(--primary-color), #2dd4bf, var(--primary-color));
          }
          .success-badge {
            display: inline-flex;
            padding: 1rem;
            border-radius: 50%;
            background: rgba(16, 185, 129, 0.1);
            color: var(--primary-color);
            margin-bottom: 1.5rem;
          }
          :global(.success-badge-icon) {
            animation: pulse 2s infinite ease-in-out;
          }
          .success-title {
            font-size: 1.75rem;
            font-weight: 800;
            color: var(--text-color);
            margin-bottom: 1rem;
            letter-spacing: -0.02em;
          }
          .success-desc {
            font-size: 0.95rem;
            color: var(--text-color);
            opacity: 0.75;
            line-height: 1.6;
            margin-bottom: 2rem;
            max-width: 320px;
            margin-left: auto;
            margin-right: auto;
          }
          .redirect-notice {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.85rem;
            font-weight: 600;
            color: var(--accent-color);
            background: rgba(245, 158, 11, 0.08);
            padding: 0.6rem 1.2rem;
            border-radius: 50px;
          }
          .notice-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--accent-color);
            animation: blink 1.5s infinite ease-in-out;
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
          @keyframes blink {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="register-card glass-card">
      <div className="register-header">
        <div className="shield-icon-wrapper">
          <ShieldAlert size={32} />
        </div>
        <h1 className="register-title">Primer Acceso Detectado</h1>
        <p className="register-subtitle">
          Tu cuenta requiere validación. Para solicitar acceso al administrador, por favor ingresa tu celular.
        </p>
      </div>

      {errorMsg && (
        <div className="alert alert-error">
          <span className="alert-icon">⚠️</span>
          <div className="alert-text">{errorMsg}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="form-label">Correo Electrónico</label>
          <div className="input-wrapper disabled-wrapper">
            <Mail className="input-icon" size={16} />
            <input
              type="email"
              value={email}
              disabled
              className="register-input"
            />
          </div>
        </div>

        {name && (
          <div className="form-group">
            <label className="form-label">Nombre Completo</label>
            <div className="input-wrapper disabled-wrapper">
              <User className="input-icon" size={16} />
              <input
                type="text"
                value={name}
                disabled
                className="register-input"
              />
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="form-label highlight-label">Número de Celular / Teléfono</label>
          <div className="input-wrapper active-wrapper">
            <Phone className="input-icon active-icon" size={16} />
            <input
              type="tel"
              placeholder="Ej. 341 6123456"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              required
              className="register-input active-input"
            />
          </div>
          <p className="field-hint">
            Si omites el prefijo de país (ej. +549), se detectará por tu ubicación de red.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-submit"
        >
          {loading ? 'Procesando...' : 'Solicitar Acceso'}
          {!loading && <ArrowRight size={16} className="btn-arrow" />}
        </button>
      </form>

      <style jsx>{`
        .register-card {
          width: 100%;
          max-width: 460px;
          margin: 0 auto;
          padding: 2.5rem;
          border-radius: 1.5rem;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          box-shadow: var(--shadow-lg), 0 20px 25px -5px rgba(0, 0, 0, 0.05);
          position: relative;
          overflow: hidden;
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .register-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.2), var(--primary-color), rgba(16, 185, 129, 0.2));
        }

        .register-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .shield-icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem;
          border-radius: 1rem;
          background: rgba(16, 185, 129, 0.08);
          color: var(--primary-color);
          margin-bottom: 1rem;
        }

        .register-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--text-color);
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
        }

        .register-subtitle {
          font-size: 0.85rem;
          color: var(--text-color);
          opacity: 0.6;
          line-height: 1.5;
        }

        /* Alertas */
        .alert {
          padding: 1rem;
          border-radius: 0.75rem;
          font-size: 0.85rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          animation: slideDown 0.3s ease-out;
        }

        .alert-icon {
          font-size: 1.1rem;
        }

        .alert-text {
          font-weight: 500;
          line-height: 1.4;
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.15);
        }

        /* Formulario */
        .register-form {
          display: flex;
          flex-direction: column;
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

        .highlight-label {
          opacity: 0.85;
          color: var(--text-color);
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

        .register-input {
          width: 100%;
          border: none;
          background: transparent;
          padding: 0.8rem 1rem 0.8rem 2.75rem;
          font-size: 0.9rem;
          outline: none;
        }

        /* Evitar que disabled dibuje bordes o fondos por defecto del navegador */
        .register-input:disabled {
          color: var(--text-color);
          opacity: 0.45;
          cursor: not-allowed;
          -webkit-text-fill-color: var(--text-color); /* Fix para Safari iOS */
        }

        .active-input {
          color: var(--text-color);
        }

        .field-hint {
          font-size: 0.75rem;
          color: var(--text-color);
          opacity: 0.5;
          line-height: 1.3;
          margin-top: 0.15rem;
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
          margin-top: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.1);
        }

        .btn-submit:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.2);
        }

        .btn-submit:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        :global(.btn-arrow) {
          transition: transform 0.2s ease;
        }

        .btn-submit:hover :global(.btn-arrow) {
          transform: translateX(3px);
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default function RegistroCelularPage() {
  return (
    <div className="register-container">
      <Suspense fallback={
        <div className="register-card glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
          <p style={{ opacity: 0.7 }}>Cargando formulario...</p>
        </div>
      }>
        <RegistroCelularForm />
      </Suspense>

      <style jsx>{`
        .register-container {
          min-height: calc(100vh - 180px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
        }
      `}</style>
    </div>
  );
}
