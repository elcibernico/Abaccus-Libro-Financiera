'use client';
import { useRouter } from 'next/navigation';
import { 
  BookOpen, 
  Book, 
  Video, 
  GraduationCap, 
  Users, 
  FileText, 
  BarChart2, 
  Settings, 
  Lock,
  Gamepad2,
  Bot
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ROLES_DICTIONARY } from '@/config/rolesConfig';

interface DashboardClientProps {
  user: {
    email: string;
    name: string;
    role: string;
    celular?: string;
  };
  modules: Array<{
    id: string;
    name: string;
    path: string;
    allowedRoles: string[];
  }>;
  versions: Record<string, string>;
}

export default function DashboardClient({ user, modules, versions }: DashboardClientProps) {
  const router = useRouter();

  // Lista de configuraciones estéticas y de icono para cada módulo
  const MODULES_UI_MAP: Record<string, { icon: any; color: string; desc: string; label: string }> = {
    libro: {
      icon: BookOpen,
      color: 'from-indigo-500 to-purple-600',
      desc: 'Acceso al Libro Digital interactivo con simuladores y renders LaTeX.',
      label: 'Acceso Habilitado'
    },
    biblioteca: {
      icon: Book,
      color: 'from-emerald-500 to-teal-600',
      desc: 'Consultá las obras científicas publicadas en la biblioteca.',
      label: 'Acceso Habilitado'
    },
    clases: {
      icon: Video,
      color: 'from-pink-500 to-rose-600',
      desc: 'Clases virtuales grabadas analizadas semánticamente por IA.',
      label: 'Próximamente'
    },
    examenes: {
      icon: GraduationCap,
      color: 'from-amber-500 to-orange-600',
      desc: 'Evaluaciones y exámenes prácticos interactivos estilo Moodle.',
      label: 'Próximamente'
    },
    alumnado: {
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      desc: 'Gestión y consulta del estado académico de los alumnos.',
      label: 'Próximamente'
    },
    investigacion: {
      icon: FileText,
      color: 'from-indigo-500 to-blue-600',
      desc: 'Repaso de trabajos de investigación aportados por el equipo.',
      label: 'Próximamente'
    },
    reporteria: {
      icon: BarChart2,
      color: 'from-purple-500 to-pink-600',
      desc: 'Estadísticas e informes analíticos de rendimiento global.',
      label: 'Próximamente'
    },
    ludica: {
      icon: Gamepad2,
      color: 'from-fuchsia-500 to-purple-600',
      desc: 'El juego para aprender financiera, aplicándola a casos reales.',
      label: 'Próximamente'
    },
    paulita: {
      icon: Bot,
      color: 'from-sky-400 to-blue-600',
      desc: 'Tu asistente virtual basada en IA para resolver dudas al instante.',
      label: 'Próximamente'
    }
  };

  const getRoleBadge = (role: string) => {
    const roleKey = (role || '').toLowerCase();
    const config = ROLES_DICTIONARY[roleKey] || ROLES_DICTIONARY.guest;
    return {
      text: config.label,
      bg: config.theme
    };
  };

  const badge = getRoleBadge(user.role);

  return (
    <div className="dashboard-wrapper">
      {/* Header del Dashboard */}
      <div className="dashboard-hero">
        <div className="hero-content">
          <div className={`role-badge ${badge.bg}`}>{badge.text}</div>
          <h2 className="welcome-title">
            ¡Hola, {user.name || user.email.split('@')[0]}!
          </h2>
          <p className="welcome-subtitle">
            Bienvenido al portal central del <strong>Ecosistema de Matemática Financiera</strong>.
          </p>
        </div>
      </div>

      {/* Grid de Módulos */}
      <section className="modules-grid-section">
        <h3 className="section-title">Módulos del Ecosistema</h3>
        <div className="modules-grid">
          {modules
            .filter(m => m.id !== 'login') // Ocultar login
            .map((module) => {
              const ui = MODULES_UI_MAP[module.id] || {
                icon: BookOpen,
                color: 'from-zinc-500 to-zinc-600',
                desc: 'Módulo del ecosistema.',
                label: 'Próximamente'
              };
              
              const IconComponent = ui.icon;
              
              // 1. Verificar si el rol base tiene acceso
              const isRoleAllowed = module.allowedRoles.includes('all') || 
                                module.allowedRoles.includes(user.role.toLowerCase());
                                
              // 2. Verificar excepciones en los permisos individuales del usuario
              // (Utilizamos un cast "as any" rápido para typescript ya que user.permissions no está fuertemente tipado en los props actuales)
              const userPerms = (user as any).permissions || {};
              const isUserExcepted = userPerms[`access_${module.id}`] === true;
              const isUserExplicitlyDenied = userPerms[`access_${module.id}`] === false;

              // 3. Resultado final: Tiene acceso si su rol lo permite (y no está denegado) o si tiene excepción directa
              const hasAccess = (isRoleAllowed && !isUserExplicitlyDenied) || isUserExcepted;

              // El libro digital y la biblioteca están habilitados
              const isAvailable = module.id === 'libro' || module.id === 'biblioteca';

              const handleNavigate = () => {
                if (hasAccess && isAvailable) {
                  router.push(module.path);
                }
              };

              const getModuleVersionKey = (id: string) => {
                switch (id) {
                  case 'libro': return 'Modulo_Libro';
                  case 'biblioteca': return 'Modulo_Biblioteca';
                  case 'clases': return 'Modulo_Clases';
                  case 'examenes': return 'Modulo_Examenes';
                  case 'alumnado': return 'Modulo_Alumnado';
                  case 'investigacion': return 'Modulo_Investigacion';
                  case 'reporteria': return 'Modulo_Reporteria';
                  default: return '';
                }
              };

              const versionKey = getModuleVersionKey(module.id);
              const moduleVersion = versionKey ? versions[versionKey] : null;

              return (
                <div 
                  key={module.id} 
                  className={`module-card glass-card ${!hasAccess ? 'locked' : ''} ${!isAvailable && hasAccess ? 'upcoming' : 'clickable'}`}
                  onClick={handleNavigate}
                >
                  <div className={`card-gradient bg-gradient-to-br ${ui.color}`} />
                  <div className="card-content-inner">
                    <div className="card-header">
                      <div className="icon-wrapper">
                        {hasAccess ? <IconComponent size={24} /> : <Lock size={24} />}
                      </div>
                      <span className={`status-tag ${!hasAccess ? 'tag-locked' : isAvailable ? 'tag-active' : 'tag-upcoming'}`}>
                        {!hasAccess ? 'Bloqueado' : isAvailable ? 'Ingresar' : ui.label}
                      </span>
                    </div>

                    <h4 className="module-name">{module.name}</h4>
                    <p className="module-desc">{ui.desc}</p>
                    
                    {moduleVersion && (
                      <span className="card-version">v{moduleVersion}</span>
                    )}
                  </div>
                </div>
              );
            })}

          {/* Tarjeta especial "Mi Perfil" */}
          <div 
            className="module-card glass-card clickable profile-card"
            onClick={() => router.push('/perfil')}
            style={{ cursor: 'pointer' }}
          >
            <div className="card-gradient bg-gradient-to-br from-emerald-500 to-teal-600" />
            <div className="card-content-inner">
              <div className="card-header">
                <div className="icon-wrapper profile-icon" style={{ color: 'hsl(var(--primary))' }}>
                  <Users size={24} />
                </div>
                <span className="status-tag tag-active" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>Ingresar</span>
              </div>
              <h4 className="module-name">Mi Perfil</h4>
              <p className="module-desc">Visualiza tu legajo, edita tu información personal y gestiona el estado de tu suscripción.</p>
            </div>
          </div>

          {/* Tarjeta especial del Administrador */}
          {(user.role === 'admin' || user.role === 'root') && (
            <div 
              className="module-card glass-card clickable admin-card"
              onClick={() => router.push('/admin')}
            >
              <div className="card-gradient bg-gradient-to-br from-red-500 to-indigo-600" />
              <div className="card-content-inner">
                <div className="card-header">
                  <div className="icon-wrapper admin-icon">
                    <Settings size={24} />
                  </div>
                  <span className="status-tag tag-active admin-tag">Administrar</span>
                </div>
                <h4 className="module-name">Configuración de Tablas</h4>
                <p className="module-desc">Administra el Whitelist de usuarios, edita registros y gestiona la lista de IPs autorizadas.</p>
                {versions.Modulo_Admin && (
                  <span className="card-version">v{versions.Modulo_Admin}</span>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CSS Encapsulado */}
      <style jsx>{`
        .dashboard-wrapper {
          min-height: calc(100vh - 80px);
          padding-top: 80px;
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
        }

        .dashboard-hero {
          padding: 3.5rem 2rem 2.5rem;
          text-align: left;
        }

        .role-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          border: 1px solid;
          margin-bottom: 1rem;
        }

        .welcome-title {
          font-size: 2.5rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: var(--text-color);
          margin: 0 0 0.5rem 0;
        }

        .welcome-subtitle {
          font-size: 1.1rem;
          opacity: 0.8;
          color: var(--text-color);
          margin: 0;
        }

        .modules-grid-section {
          padding: 0 2rem 4rem;
          flex: 1;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-color);
          opacity: 0.95;
          margin-bottom: 2rem;
        }

        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .module-card {
          position: relative;
          border-radius: 1.25rem;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s;
          display: flex;
          flex-direction: column;
        }

        .module-card.clickable {
          cursor: pointer;
        }

        .module-card.clickable:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.08);
        }

        .card-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 6px;
        }

        .card-content-inner {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 1rem;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .icon-wrapper {
          color: var(--primary-color);
          opacity: 0.9;
        }

        .status-tag {
          font-size: 0.72rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: 0.25rem;
        }

        .tag-active {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .tag-upcoming {
          background: rgba(100, 116, 139, 0.1);
          color: #64748b;
        }

        .tag-locked {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .module-name {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-color);
          margin: 0;
        }

        .module-desc {
          font-size: 0.9rem;
          opacity: 0.75;
          line-height: 1.5;
          margin: 0;
        }

        /* Bloqueado por RBAC */
        .module-card.locked {
          opacity: 0.5;
          cursor: not-allowed;
          filter: grayscale(1);
        }

        /* Módulos Próximamente habilitados para el rol pero no construidos físicamente */
        .module-card.upcoming {
          cursor: not-allowed;
        }

        .admin-card {
          background: linear-gradient(135deg, rgba(239, 68, 68, 0.05), rgba(79, 70, 229, 0.05));
          border: 1px dashed rgba(79, 70, 229, 0.3);
        }

        .admin-icon {
          color: #ef4444;
        }

        .admin-tag {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .card-version {
          position: absolute;
          bottom: 0.75rem;
          right: 1rem;
          font-size: 0.75rem;
          font-weight: 700;
          opacity: 0.5;
          color: var(--text-color);
          background: rgba(0, 0, 0, 0.05);
          padding: 0.1rem 0.4rem;
          border-radius: 0.25rem;
          backdrop-filter: blur(4px);
        }

        @media (max-width: 768px) {
          .dashboard-wrapper {
            padding-top: 60px;
            min-height: calc(100vh - 60px);
          }
          .welcome-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
