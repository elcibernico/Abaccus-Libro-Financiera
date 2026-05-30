'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    // Escuchar el estado de autenticación. Si el usuario ya inició sesión con éxito, redirigir a la raíz '/'
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (session) {
        router.push('/');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const handleOAuthLogin = async (provider: 'google' | 'github' | 'azure' | 'apple') => {
    try {
      setLoading(provider);
      setError(null);

      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          // Supabase redirigirá automáticamente de vuelta a la URL raíz tras el inicio de sesión exitoso
          redirectTo: `${window.location.origin}/`,
        },
      });

      if (signInError) throw signInError;
    } catch (err: any) {
      console.error(`Error de login con ${provider}:`, err);
      setError(err.message || 'Ocurrió un error inesperado al intentar iniciar sesión.');
      setLoading(null);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      setLoading('email');
      setError(null);
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (otpError) throw otpError;
      setEmailSent(true);
    } catch (err: any) {
      console.error('Error de login con email:', err);
      setError(err.message || 'Ocurrió un error al intentar enviar el enlace de acceso.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="blur-circle circle-1"></div>
        <div className="blur-circle circle-2"></div>
      </div>

      <div className="login-card glass-card">
        <div className="login-header">
          <span className="app-badge">Matemática Financiera Digital</span>
          <h1 className="login-title">Bienvenido a ABACCUS</h1>
          <p className="login-subtitle">
            Accede al Libro Financiero Digital interactivo usando tu cuenta institucional o personal.
          </p>
        </div>

        {error && (
          <div className="login-error-card">
            <span className="error-icon">⚠️</span>
            <p className="error-message">{error}</p>
          </div>
        )}

        {emailSent ? (
          <div className="email-sent-card">
            <span className="sent-icon">✉️</span>
            <h3 className="sent-title">¡Enlace enviado!</h3>
            <p className="sent-desc">
              Hemos enviado un enlace de acceso seguro a <strong>{email}</strong>. Revisa tu bandeja de entrada (y la carpeta de spam) para ingresar.
            </p>
            <button onClick={() => setEmailSent(false)} className="login-btn btn-secondary">
              Volver al inicio
            </button>
          </div>
        ) : (
          <>
            <div className="login-actions">
              {/* Botón de Google OAuth */}
              <button
                onClick={() => handleOAuthLogin('google')}
                disabled={loading !== null}
                className="login-btn btn-google"
              >
                {loading === 'google' ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <svg className="btn-icon" viewBox="0 0 24 24" width="20" height="20">
                      <path
                        fill="#EA4335"
                        d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.99 5.99 0 0 1 8 12.5a5.99 5.99 0 0 1 5.99-6.012c1.49 0 2.845.55 3.9 1.455l3.076-3.078C19.123 3.107 16.74 2 13.99 2A10.5 10.5 0 0 0 3.5 12.5a10.5 10.5 0 0 0 10.49 10.5c5.783 0 10.4-4.18 10.4-10.5 0-.71-.082-1.393-.243-2.215H12.24Z"
                      />
                    </svg>
                    <span>Acceder con Google</span>
                  </>
                )}
              </button>

              {/* Botón de Microsoft OAuth */}
              <button
                onClick={() => handleOAuthLogin('azure')}
                disabled={loading !== null}
                className="login-btn btn-microsoft"
              >
                {loading === 'azure' ? (
                  <div className="spinner"></div>
                ) : (
                  <>
                    <svg className="btn-icon" viewBox="0 0 23 23" width="20" height="20">
                      <path fill="#f35325" d="M0 0h11v11H0z" />
                      <path fill="#81bc06" d="M12 0h11v11H12z" />
                      <path fill="#05a6f0" d="M0 12h11v11H0z" />
                      <path fill="#ffba08" d="M12 12h11v11H12z" />
                    </svg>
                    <span>Acceder con Microsoft</span>
                  </>
                )}
              </button>

              <div className="oauth-row-two">
                {/* Botón de Apple OAuth */}
                <button
                  onClick={() => handleOAuthLogin('apple')}
                  disabled={loading !== null}
                  className="login-btn btn-apple"
                >
                  {loading === 'apple' ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <svg className="btn-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5M15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16 1.04 14.9 1.6 14.24 2.38C13.68 3.04 13.19 4.14 13.34 5.39C14.39 5.47 15.4 4.88 15.97 4.17Z" />
                      </svg>
                      <span>Apple</span>
                    </>
                  )}
                </button>

                {/* Botón de GitHub OAuth */}
                <button
                  onClick={() => handleOAuthLogin('github')}
                  disabled={loading !== null}
                  className="login-btn btn-github"
                >
                  {loading === 'github' ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <svg className="btn-icon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                      </svg>
                      <span>GitHub</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="login-divider">
              <span className="divider-line"></span>
              <span className="divider-text">O ingresa con tu correo</span>
              <span className="divider-line"></span>
            </div>

            {/* Formulario de Email Magic Link */}
            <form onSubmit={handleEmailLogin} className="email-login-form">
              <div className="input-group">
                <input
                  type="email"
                  placeholder="nombre@ejemplo.com (Yahoo, Fibertel, etc.)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading !== null}
                  required
                  className="email-input"
                />
              </div>
              <button
                type="submit"
                disabled={loading !== null || !email}
                className="login-btn btn-email"
              >
                {loading === 'email' ? (
                  <div className="spinner"></div>
                ) : (
                  <span>Enviar enlace de acceso</span>
                )}
              </button>
            </form>
          </>
        )}

        <div className="login-footer">
          <p>
            Al ingresar, aceptas las políticas de acceso y uso académico de la plataforma.
          </p>
        </div>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: #090d16;
          color: #ffffff;
          padding: 1.5rem;
          overflow: hidden;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .login-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          overflow: hidden;
        }

        .blur-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          background: #3b82f6;
          top: -100px;
          left: -100px;
        }

        .circle-2 {
          width: 500px;
          height: 500px;
          background: #ec4899;
          bottom: -150px;
          right: -100px;
        }

        .login-card {
          width: 100%;
          max-width: 450px;
          padding: 2.5rem;
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(13, 20, 35, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 1;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .login-header {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          text-align: center;
        }

        .app-badge {
          align-self: center;
          padding: 0.25rem 0.75rem;
          background: rgba(59, 130, 246, 0.15);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 9999px;
          color: #60a5fa;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .login-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .login-subtitle {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.6;
        }

        .login-error-card {
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.2);
          border-radius: 0.75rem;
          padding: 1rem;
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .error-icon {
          font-size: 1.1rem;
        }

        .error-message {
          font-size: 0.85rem;
          color: #fca5a5;
          line-height: 1.5;
        }

        .login-actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .login-btn {
          width: 100%;
          padding: 0.85rem 1.25rem;
          border-radius: 0.75rem;
          font-size: 0.95rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .btn-google {
          background: #ffffff;
          color: #1e293b;
        }

        .btn-google:hover:not(:disabled) {
          background: #f1f5f9;
          transform: translateY(-2px);
        }

        .btn-github {
          background: #24292f;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .btn-github:hover:not(:disabled) {
          background: #2f363d;
          transform: translateY(-2px);
        }

        .btn-microsoft {
          background: #2f2f2f;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-microsoft:hover:not(:disabled) {
          background: #3f3f3f;
          transform: translateY(-2px);
        }

        .oauth-row-two {
          display: flex;
          gap: 1rem;
        }

        .btn-apple {
          flex: 1;
          background: #111111;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .btn-apple:hover:not(:disabled) {
          background: #222222;
          transform: translateY(-2px);
        }

        .btn-github {
          flex: 1;
        }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 0.5rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
        }

        .divider-text {
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .email-login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .email-input {
          width: 100%;
          padding: 0.85rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 0.75rem;
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .email-input:focus {
          border-color: rgba(59, 130, 246, 0.5);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
        }

        .btn-email {
          background: rgba(59, 130, 246, 0.1);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .btn-email:hover:not(:disabled) {
          background: rgba(59, 130, 246, 0.2);
          transform: translateY(-2px);
        }

        .email-sent-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(16, 185, 129, 0.05);
          border: 1px solid rgba(16, 185, 129, 0.2);
          border-radius: 1rem;
        }

        .sent-icon {
          font-size: 2rem;
        }

        .sent-title {
          font-size: 1.25rem;
          font-weight: 750;
          color: #34d399;
        }

        .sent-desc {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.6;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-icon {
          flex-shrink: 0;
        }

        .login-footer {
          font-size: 0.75rem;
          color: #64748b;
          text-align: center;
          line-height: 1.5;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: currentColor;
          animation: spin 0.8s linear infinite;
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
