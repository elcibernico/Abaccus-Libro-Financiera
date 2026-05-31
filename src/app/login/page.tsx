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
  const [emailCiudad, setEmailCiudad] = useState('');
  const [emailArnet, setEmailArnet] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Detect error params from URL
  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam === 'unauthorized') {
      setErrorMsg('Acceso denegado: Tu correo no se encuentra en la lista blanca de usuarios autorizados.');
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

  const handleOtpLogin = async (email: string, domain: string, type: string) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setErrorMsg(`Por favor ingresa un correo para @${domain}`);
      return;
    }

    const fullEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@${domain}`;
    
    if (!fullEmail.toLowerCase().endsWith(`@${domain}`)) {
      setErrorMsg(`El correo debe pertenecer al dominio @${domain}`);
      return;
    }

    setLoading(type);
    const result = await signInWithEmailOtp(fullEmail);
    setLoading(null);

    if (result.success) {
      setSuccessMsg(`Se ha enviado un enlace de acceso (Magic Link) a ${fullEmail}. Revisa tu bandeja de entrada.`);
    } else {
      setErrorMsg(`Error al enviar el enlace de acceso: ${result.error}`);
    }
  };

  return (
    <div className="login-card glass-card">
      <div className="login-header">
        <h1 className="login-title">Iniciar Sesión</h1>
        <p className="login-subtitle">Libro Digital Interactivo de Matemática Financiera</p>
      </div>

      {errorMsg && <div className="alert alert-error">{errorMsg}</div>}
      {successMsg && <div className="alert alert-success">{successMsg}</div>}

      <div className="providers-section">
        <h3>Proveedores de Acceso Activos</h3>
        <div className="oauth-grid">
          <button 
            className="provider-btn google-btn"
            onClick={() => handleOAuthLogin('google')}
            disabled={loading !== null}
          >
            {loading === 'google' ? 'Conectando...' : 'Entrar con Google'}
          </button>

          <button 
            className="provider-btn microsoft-btn"
            onClick={() => handleOAuthLogin('azure')}
            disabled={loading !== null}
          >
            {loading === 'azure' ? 'Conectando...' : 'Entrar con Microsoft'}
          </button>

          <button 
            className="provider-btn yahoo-btn"
            onClick={() => handleOAuthLogin('yahoo')}
            disabled={loading !== null}
          >
            {loading === 'yahoo' ? 'Conectando...' : 'Entrar con Yahoo'}
          </button>
        </div>

        <div className="otp-forms">
          <div className="otp-card">
            <label>Magic Link para @ciudad.com.ar</label>
            <div className="otp-input-group">
              <input 
                type="text" 
                placeholder="usuario" 
                value={emailCiudad}
                onChange={(e) => setEmailCiudad(e.target.value)}
                disabled={loading !== null}
              />
              <span className="domain-badge">@ciudad.com.ar</span>
              <button 
                onClick={() => handleOtpLogin(emailCiudad, 'ciudad.com.ar', 'ciudad')}
                disabled={loading !== null}
              >
                {loading === 'ciudad' ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>

          <div className="otp-card">
            <label>Magic Link para @arnet.com.ar</label>
            <div className="otp-input-group">
              <input 
                type="text" 
                placeholder="usuario" 
                value={emailArnet}
                onChange={(e) => setEmailArnet(e.target.value)}
                disabled={loading !== null}
              />
              <span className="domain-badge">@arnet.com.ar</span>
              <button 
                onClick={() => handleOtpLogin(emailArnet, 'arnet.com.ar', 'arnet')}
                disabled={loading !== null}
              >
                {loading === 'arnet' ? 'Enviando...' : 'Enviar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div className="providers-section disabled-section">
        <h3>Proveedores Deshabilitados Temporalmente</h3>
        <div className="disabled-grid">
          <div className="disabled-badge">Apple OAuth</div>
          <div className="disabled-badge">Dropbox OAuth</div>
          <div className="disabled-badge">Smartsheet OAuth</div>
          <div className="disabled-badge">Box OAuth</div>
          <div className="disabled-badge">GitHub OAuth</div>
          <div className="disabled-badge">Salesforce OAuth</div>
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

        .alert {
          padding: 1rem;
          border-radius: 0.75rem;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
          line-height: 1.5;
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
          gap: 1.25rem;
        }

        .providers-section h3 {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-color);
          opacity: 0.9;
          margin-bottom: 0.5rem;
        }

        .oauth-grid {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .provider-btn {
          width: 100%;
          padding: 0.85rem;
          border-radius: 0.75rem;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: var(--transition);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-color);
        }

        .google-btn {
          background: #ffffff;
          color: #1f2937;
        }

        .google-btn:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        .microsoft-btn {
          background: #2f2f2f;
          color: #ffffff;
          border-color: #2f2f2f;
        }

        .microsoft-btn:hover {
          background: #1f1f1f;
        }

        .yahoo-btn {
          background: #6001d2;
          color: #ffffff;
          border-color: #6001d2;
        }

        .yahoo-btn:hover {
          background: #4b00a8;
        }

        .otp-forms {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .otp-card {
          background: var(--hover-color);
          border: 1px solid var(--border-color);
          padding: 1rem;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .otp-card label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-color);
          opacity: 0.8;
        }

        .otp-input-group {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          padding: 0.25rem;
          border-radius: 0.5rem;
        }

        .otp-input-group input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 0.5rem;
          color: var(--text-color);
          font-size: 0.95rem;
          outline: none;
        }

        .domain-badge {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-color);
          opacity: 0.6;
          padding: 0.25rem 0.5rem;
          background: var(--hover-color);
          border-radius: 0.25rem;
        }

        .otp-input-group button {
          background: var(--primary-color);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.375rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition);
        }

        .otp-input-group button:hover {
          background: var(--primary-hover);
        }

        .divider {
          height: 1px;
          background: var(--border-color);
          margin: 2rem 0;
        }

        .disabled-section h3 {
          opacity: 0.5;
        }

        .disabled-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }

        .disabled-badge {
          background: var(--hover-color);
          border: 1px solid var(--border-color);
          padding: 0.75rem;
          border-radius: 0.5rem;
          text-align: center;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-color);
          opacity: 0.4;
          user-select: none;
        }

        [data-theme='dark'] .google-btn {
          background: #18181b;
          color: #ffffff;
          border-color: #27272a;
        }

        [data-theme='dark'] .google-btn:hover {
          background: #27272a;
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
