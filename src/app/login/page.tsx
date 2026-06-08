'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { signInWithOAuthProvider, signInWithEmailOtp } from '@/modules/auth/controllers/oauthController';
import { usePreferences } from '@/modules/libro_financiero/components/UserPreferencesProvider';
import { supabase } from '@/core/security/supabaseClient';

function LoginForm() {
  const { theme } = usePreferences();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [emailOtp, setEmailOtp] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Detect error params from URL
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'unauthorized') {
      setErrorMsg('Acceso denegado: Tu correo no se encuentra en la lista blanca de usuarios autorizados.');
    } else if (errorParam === 'ip_restricted') {
      setErrorMsg('Acceso bloqueado: Tu dirección IP actual no se encuentra en la lista de acceso permitido por el cortafuegos.');
    } else if (errorParam === 'pending') {
      setErrorMsg('Acceso en suspenso: Tu solicitud de ingreso ha sido registrada. Podrás acceder una vez que sea aprobada por el administrador.');
    } else if (errorParam === 'auth_failed') {
      setErrorMsg('Error de autenticación: Hubo un problema al iniciar sesión. Inténtalo de nuevo.');
    } else if (errorParam === 'session_expired') {
      setErrorMsg('Tu sesión ha expirado. Por favor inicia sesión de nuevo.');
    }

    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/');
      }
    });
  }, [searchParams, router]);

  const handleOAuthLogin = async (provider: any) => {
    setLoading(provider);
    setErrorMsg(null);
    setSuccessMsg(null);
    const result = await signInWithOAuthProvider(provider);
    if (!result.success) {
      setErrorMsg(`Error al conectar con ${provider}: ${result.error}`);
      setLoading(null);
    }
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    const cleanEmail = emailOtp.trim();

    if (!cleanEmail) {
      setErrorMsg('Por favor ingresa tu dirección de correo electrónico.');
      return;
    }

    if (!cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setErrorMsg('Por favor ingresa una dirección de correo electrónico válida (ejemplo@dominio.com).');
      return;
    }

    setLoading('otp');
    const result = await signInWithEmailOtp(cleanEmail);
    setLoading(null);

    if (result.success) {
      setSuccessMsg(`Se ha enviado un enlace de acceso (Magic Link) a ${cleanEmail}. Revisa tu bandeja de entrada.`);
      setEmailOtp('');
    } else {
      setErrorMsg(`Error al enviar el enlace de acceso: ${result.error}`);
    }
  };

  return (
    <div className="login-card glass-card">
      <div className="login-header">
        <h1 className="login-title">Iniciar Sesión</h1>
        <p className="login-subtitle">Ecosistema Digital de Matemática Financiera</p>
      </div>

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

      {/* Proveedores Activos */}
      <div className="providers-section">
        <h3>Proveedores de Acceso Activos</h3>
        <div className="oauth-row">
          <button 
            className="provider-btn"
            onClick={() => handleOAuthLogin('google')}
            disabled={loading !== null}
            title="Entrar con Google"
          >
            {loading === 'google' ? (
              <div className="spinner"></div>
            ) : (
              <img 
                src="https://www.vectorlogo.zone/logos/google/google-icon.svg" 
                alt="Google" 
                className="provider-logo"
              />
            )}
          </button>

          <button 
            className="provider-btn"
            onClick={() => handleOAuthLogin('azure')}
            disabled={loading !== null}
            title="Entrar con Microsoft"
          >
            {loading === 'azure' ? (
              <div className="spinner"></div>
            ) : (
              <img 
                src="https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg" 
                alt="Microsoft" 
                className="provider-logo"
              />
            )}
          </button>

          <button 
            className="provider-btn"
            onClick={() => handleOAuthLogin('yahoo')}
            disabled={loading !== null}
            title="Entrar con Yahoo"
          >
            {loading === 'yahoo' ? (
              <div className="spinner"></div>
            ) : (
              <img 
                src="https://www.vectorlogo.zone/logos/yahoo/yahoo-icon.svg" 
                alt="Yahoo" 
                className="provider-logo"
              />
            )}
          </button>
        </div>

        {/* Acceso por Magic Link Unificado */}
        <div className="otp-section">
          <h3>Acceso por Enlace Directo (Magic Link)</h3>
          <form onSubmit={handleOtpLogin} className="otp-form">
            <div className="otp-input-group">
              <input 
                type="email" 
                placeholder="tu-correo@ejemplo.com" 
                value={emailOtp}
                onChange={(e) => setEmailOtp(e.target.value)}
                disabled={loading !== null}
                required
              />
              <button 
                type="submit"
                disabled={loading !== null}
              >
                {loading === 'otp' ? 'Enviando...' : 'Recibir Enlace'}
              </button>
            </div>
            <p className="otp-desc">
              Ingresa cualquier dirección de correo electrónico autorizada para recibir un enlace de acceso instantáneo en tu bandeja de entrada.
            </p>
          </form>
        </div>
      </div>

      <style jsx>{`
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .login-title {
          font-size: 2rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }

        .login-subtitle {
          font-size: 0.95rem;
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
          line-height: 1.4;
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

        .providers-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .providers-section h3 {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-color);
          opacity: 0.6;
          margin-bottom: 0.25rem;
          text-align: center;
        }

        /* Fila de OAuth estilo Squircle */
        .oauth-row {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          margin-bottom: 0.5rem;
        }

        .provider-btn {
          width: 72px;
          height: 72px;
          border-radius: 1.25rem;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          box-shadow: var(--shadow-sm);
        }

        .provider-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          border-color: var(--primary-color);
          box-shadow: var(--shadow-md), 0 0 12px rgba(16, 185, 129, 0.15);
        }

        .provider-logo {
          width: 32px;
          height: 32px;
          object-fit: contain;
          transition: var(--transition);
        }

        .provider-btn:hover .provider-logo {
          transform: scale(1.1);
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid var(--border-color);
          border-top: 3px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Magic Link Unificado */
        .otp-section {
          background: var(--hover-color);
          border: 1px solid var(--border-color);
          padding: 1.5rem;
          border-radius: 1.25rem;
          margin-top: 0.5rem;
        }

        .otp-section h3 {
          text-align: left;
          font-size: 0.95rem;
          margin-bottom: 1rem;
        }

        .otp-form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .otp-input-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          padding: 0.35rem;
          border-radius: 0.75rem;
          transition: var(--transition);
        }

        .otp-input-group:focus-within {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

        .otp-input-group input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 0.5rem 0.75rem;
          color: var(--text-color);
          font-size: 0.95rem;
          outline: none;
        }

        .otp-input-group button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.6rem 1.25rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .otp-input-group button:hover:not(:disabled) {
          background: var(--primary-hover);
        }

        .otp-desc {
          font-size: 0.8rem;
          opacity: 0.6;
          line-height: 1.4;
          margin-left: 0.25rem;
        }

        [data-theme='dark'] .provider-btn {
          background: #141416;
        }

        [data-theme='dark'] .provider-btn:hover {
          background: #1e1e21;
        }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="login-container">
      <Suspense fallback={
        <div className="login-card glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
          <p style={{ opacity: 0.7 }}>Cargando formulario de acceso...</p>
        </div>
      }>
        <LoginForm />
      </Suspense>

      <style jsx>{`
        .login-container {
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

