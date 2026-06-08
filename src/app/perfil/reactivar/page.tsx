'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, ShieldAlert, LogOut, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/core/security/supabaseClient';

export default function ReactivarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [reactivating, setReactivating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.user) {
        router.push('/login');
      } else {
        setUserEmail(session.user.email || '');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReactivate = async () => {
    setReactivating(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/profile/reactivate', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      } else {
        setErrorMsg(data.error || 'No se pudo procesar la solicitud de reincorporación.');
        setReactivating(false);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de red al intentar reactivar la cuenta.');
      setReactivating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="reactivar-container loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando verificación...</p>
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
            border: 3px solid rgba(239, 68, 68, 0.1);
            border-top-color: #ef4444;
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

  if (success) {
    return (
      <div className="reactivar-container">
        <div className="glass-card success-card">
          <div className="success-badge">
            <CheckCircle2 size={48} className="success-icon" />
          </div>
          <h2 className="success-title">¡Cuenta Reactivada!</h2>
          <p className="success-desc">
            Tu suscripción al Ecosistema Abaccus ha sido reestablecida con éxito. Redirigiéndote al Dashboard...
          </p>
          <div className="loader-line"></div>
        </div>

        <style jsx>{`
          .reactivar-container {
            min-height: calc(100vh - 180px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1.5rem;
          }
          .success-card {
            width: 100%;
            max-width: 460px;
            text-align: center;
            padding: 3rem 2rem;
            position: relative;
            overflow: hidden;
            border-color: rgba(16, 185, 129, 0.2);
          }
          .success-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: #10b981;
          }
          .success-badge {
            display: inline-flex;
            padding: 1rem;
            border-radius: 50%;
            background: rgba(16, 185, 129, 0.1);
            color: #10b981;
            margin-bottom: 1.5rem;
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
            opacity: 0.8;
            line-height: 1.6;
          }
          .loader-line {
            height: 3px;
            width: 100%;
            background-color: rgba(16, 185, 129, 0.1);
            position: absolute;
            bottom: 0;
            left: 0;
            overflow: hidden;
          }
          .loader-line::after {
            content: '';
            display: block;
            height: 100%;
            background-color: #10b981;
            width: 50%;
            animation: loadingBar 2s infinite ease-in-out;
          }
          @keyframes loadingBar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="reactivar-container">
      <div className="glass-card quarantine-card">
        <div className="quarantine-header">
          <div className="alert-badge">
            <ShieldAlert size={32} />
          </div>
          <h2 className="quarantine-title">Cuenta Desactivada</h2>
          <p className="quarantine-subtitle">
            Suscripción inactiva para el correo: <strong>{userEmail}</strong>
          </p>
        </div>

        <div className="quarantine-body">
          <div className="info-box">
            <AlertTriangle className="info-icon" size={24} />
            <p className="info-text">
              Habías solicitado la baja voluntaria de tu cuenta en la plataforma. 
              Al desactivarse, tu acceso global queda restringido de inmediato.
            </p>
          </div>
          <p className="prompt-text">
            ¿Deseas solicitar la reincorporación al sistema? Esto reactivará tu perfil al instante con todo tu historial de datos intacto.
          </p>
        </div>

        {errorMsg && (
          <div className="alert alert-error">
            <span className="alert-icon">⚠️</span>
            <div className="alert-text">{errorMsg}</div>
          </div>
        )}

        <div className="quarantine-actions">
          <button 
            onClick={handleReactivate} 
            disabled={reactivating} 
            className="btn-reactivate"
          >
            {reactivating ? 'Reactivando...' : 'Sí, Reactivar mi Cuenta'}
          </button>
          
          <button 
            onClick={handleLogout} 
            className="btn-logout"
            title="Cerrar sesión e ir a login"
          >
            <LogOut size={16} />
            Salir de la cuenta
          </button>
        </div>
      </div>

      <style jsx>{`
        .reactivar-container {
          min-height: calc(100vh - 180px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8rem 1.5rem 3rem;
        }

        .quarantine-card {
          width: 100%;
          max-width: 480px;
          padding: 3rem 2.5rem;
          position: relative;
          overflow: hidden;
          border-color: rgba(239, 68, 68, 0.2);
        }

        .quarantine-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: #ef4444;
        }

        .quarantine-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .alert-badge {
          display: inline-flex;
          padding: 0.85rem;
          border-radius: 1rem;
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
          margin-bottom: 1rem;
        }

        .quarantine-title {
          font-size: 1.8rem;
          font-weight: 850;
          color: var(--text-color);
          margin-bottom: 0.5rem;
          letter-spacing: -0.03em;
        }

        .quarantine-subtitle {
          font-size: 0.9rem;
          opacity: 0.7;
          color: var(--text-color);
        }

        .quarantine-body {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .info-box {
          display: flex;
          gap: 0.75rem;
          padding: 1.25rem;
          border-radius: 0.85rem;
          background: rgba(239, 68, 68, 0.04);
          border: 1px solid rgba(239, 68, 68, 0.1);
        }

        .info-icon {
          color: #ef4444;
          flex-shrink: 0;
        }

        .info-text {
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--text-color);
          opacity: 0.95;
        }

        .prompt-text {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--text-color);
          opacity: 0.85;
          text-align: center;
        }

        .quarantine-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .btn-reactivate {
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

        .btn-reactivate:hover:not(:disabled) {
          background: var(--primary-hover);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(16, 185, 129, 0.2);
        }

        .btn-reactivate:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-logout {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: transparent;
          color: var(--text-color);
          opacity: 0.7;
          border: 1px solid var(--border-color);
          padding: 0.9rem;
          border-radius: 0.85rem;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: var(--transition);
        }

        .btn-logout:hover {
          opacity: 1;
          background: rgba(120, 120, 120, 0.05);
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
        }

        .alert-error {
          background: rgba(239, 68, 68, 0.08);
          color: #ef4444;
          border: 1px solid rgba(239, 68, 68, 0.15);
        }

        @media (max-width: 500px) {
          .quarantine-card {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
