'use client';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card glass-card">
        <div className="icon-wrapper">
          <span className="lock-icon">🔒</span>
        </div>
        <h1 className="unauthorized-title">Acceso Restringido</h1>
        <p className="unauthorized-message">
          Tu cuenta no cuenta con los permisos o el rol académico requerido para acceder a esta sección de la plataforma.
        </p>
        <div className="actions">
          <Link href="/" className="home-btn">
            Volver al Inicio
          </Link>
        </div>
      </div>

      <style jsx>{`
        .unauthorized-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #090d16;
          color: #ffffff;
          padding: 1.5rem;
          font-family: 'Inter', sans-serif;
        }

        .unauthorized-card {
          width: 100%;
          max-width: 400px;
          padding: 2.5rem;
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(13, 20, 35, 0.6);
          backdrop-filter: blur(12px);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        }

        .icon-wrapper {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lock-icon {
          font-size: 1.8rem;
        }

        .unauthorized-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ef4444;
          letter-spacing: -0.01em;
        }

        .unauthorized-message {
          font-size: 0.9rem;
          color: #94a3b8;
          line-height: 1.6;
        }

        .actions {
          width: 100%;
          margin-top: 0.5rem;
        }

        .home-btn {
          display: block;
          width: 100%;
          padding: 0.85rem;
          background: #3b82f6;
          color: #ffffff;
          font-weight: 600;
          border-radius: 0.75rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .home-btn:hover {
          background: #2563eb;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
