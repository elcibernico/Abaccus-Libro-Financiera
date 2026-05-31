'use client';
import Link from 'next/link';
import { usePreferences } from '@/modules/libro_financiero/components/UserPreferencesProvider';

export default function AdminPage() {
  const { theme } = usePreferences();

  return (
    <div className="admin-container">
      <div className="admin-card glass-card">
        <div className="admin-header">
          <div className="admin-header-content-left">
            <Link href="/" className="back-pi-link" title="Volver al Libro">
              π
            </Link>
            <h1 className="admin-title">Panel de Control General</h1>
            <p className="admin-subtitle">
              Estado general y estadísticas locales del Libro Digital Interactivo.
            </p>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Seguridad y Accesos</h3>
            <p className="stat-value">Público</p>
            <p className="stat-desc">Autenticación desactivada (Acceso libre total)</p>
          </div>

          <div className="stat-card">
            <h3>Unidades Académicas</h3>
            <p className="stat-value">8</p>
            <p className="stat-desc">Unidades del plan de estudios</p>
          </div>

          <div className="stat-card">
            <h3>Temas Cargados</h3>
            <p className="stat-value">73</p>
            <p className="stat-desc">Temas con desarrollo y autoevaluaciones</p>
          </div>

          <div className="stat-card">
            <h3>Tema Visual Activo</h3>
            <p className="stat-value" style={{ textTransform: 'capitalize' }}>{theme}</p>
            <p className="stat-desc">Modo oscuro/claro preferido del navegador</p>
          </div>
        </div>

        <div className="info-section">
          <h3>Información del Sistema</h3>
          <p>Esta es la puerta de entrada discreta (Acceso <strong>π</strong>) de la aplicación. Todo el sistema de autenticación de base de datos ha sido removido de forma exitosa y segura para permitir el consumo 100% libre de los contenidos de la Facultad de Ciencias Económicas y Estadística.</p>
        </div>
      </div>

      <style jsx>{`
        .admin-container {
          min-height: calc(100vh - 130px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
        }

        .admin-card {
          width: 100%;
          max-width: 900px;
          padding: 2.5rem;
          background: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 1.5rem;
          box-shadow: var(--shadow-lg);
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .admin-header-content-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 100%;
        }

        .back-pi-link {
          font-family: 'Cambria', serif;
          font-size: 2.5rem;
          color: var(--primary-color);
          opacity: 0.8;
          line-height: 1;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 0.75rem;
          transition: var(--transition);
        }

        .back-pi-link:hover {
          opacity: 1;
          transform: scale(1.15);
          color: var(--primary-hover);
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-color);
          opacity: 0.6;
          margin-bottom: 0.75rem;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 0.5rem;
        }

        .stat-desc {
          font-size: 0.8rem;
          color: var(--text-color);
          opacity: 0.7;
        }

        .info-section {
          background: var(--hover-color);
          border-left: 4px solid var(--primary-color);
          padding: 1.25rem;
          border-radius: 0 0.75rem 0.75rem 0;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .info-section h3 {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-color);
        }

        .info-section p {
          color: var(--text-color);
          opacity: 0.85;
        }
      `}</style>
    </div>
  );
}
