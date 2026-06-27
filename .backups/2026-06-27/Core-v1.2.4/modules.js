// modules.js - Dimensión de módulos del ecosistema y reglas de acceso (RBAC)
import { queryDatabase } from '../connection';

// Declaración estática de los 8 módulos de la directiva y roles permitidos por defecto
export const MODULES_REGISTRY = [
  {
    id: 'login',
    name: 'Zona de Logueo',
    path: '/login',
    allowedRoles: ['all']
  },
  {
    id: 'biblioteca',
    name: 'Biblioteca Digital',
    path: '/biblioteca',
    allowedRoles: ['root', 'admin', 'jefe_catedra', 'adjunto', 'profesor', 'ayudante', 'alumno', 'docente']
  },
  {
    id: 'libro',
    name: 'Libro Digital Interactivo',
    path: '/libro',
    allowedRoles: ['root', 'admin', 'jefe_catedra', 'adjunto', 'profesor', 'ayudante', 'alumno', 'docente']
  },
  {
    id: 'clases',
    name: 'Clases Virtuales Grabadas',
    path: '/clases',
    allowedRoles: ['root', 'admin', 'jefe_catedra', 'adjunto', 'profesor', 'ayudante', 'alumno', 'docente']
  },
  {
    id: 'examenes',
    name: 'Exámenes y Evaluaciones',
    path: '/examenes',
    allowedRoles: ['root', 'admin', 'jefe_catedra', 'adjunto', 'profesor', 'ayudante', 'alumno', 'docente']
  },
  {
    id: 'alumnado',
    name: 'Alumnado y Estado Académico',
    path: '/alumnado',
    allowedRoles: ['root', 'admin', 'jefe_catedra', 'adjunto', 'profesor', 'ayudante', 'docente']
  },
  {
    id: 'investigacion',
    name: 'Trabajos de Investigación',
    path: '/investigacion',
    allowedRoles: ['root', 'admin', 'jefe_catedra', 'adjunto', 'profesor', 'ayudante', 'alumno', 'docente']
  },
  {
    id: 'reporteria',
    name: 'Reportería y Analítica',
    path: '/reporteria',
    allowedRoles: ['root', 'admin', 'jefe_catedra', 'adjunto', 'profesor', 'auditor', 'docente']
  },
  {
    id: 'ludica',
    name: 'Financiera Lúdica',
    path: '/ludica',
    allowedRoles: ['root', 'admin', 'jefe_catedra', 'adjunto', 'profesor', 'ayudante', 'alumno', 'docente']
  },
  {
    id: 'paulita',
    name: 'Chateá con Paulita de ABACCUS',
    path: '/paulita',
    allowedRoles: ['root', 'admin', 'jefe_catedra', 'adjunto', 'profesor', 'ayudante', 'alumno', 'docente']
  }
];

/**
 * Obtiene todos los módulos activos del ecosistema.
 */
export async function getModulesList(provider, options = {}) {
  try {
    if (provider === 'spreadsheet') {
      try {
        const modulesList = await queryDatabase({
          provider: 'spreadsheet',
          target: 'Modulos!A1:D30',
          options: {
            spreadsheetId: options.spreadsheetId,
            forceRefresh: options.forceRefresh || false
          }
        });
        if (modulesList && modulesList.length > 0) {
          return modulesList.map(m => ({
            ...m,
            allowedRoles: m.allowed_roles ? m.allowed_roles.split(',').map(r => r.trim()) : []
          }));
        }
      } catch (e) {
        console.warn('[DB Modules Warning]: No se encontró la pestaña "Modulos" en Sheets. Usando registro estático.');
      }
    } else if (provider === 'firestore') {
      const { path } = await queryDatabase({
        provider: 'firestore',
        target: 'modules',
        options: { isPublic: true }
      });
      return { path, dbType: 'firestore' };
    } else if (provider === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'module' });
      return await prismaClient.findMany();
    }
  } catch (error) {
    console.error('[DB Dimensions Error]: Error al obtener lista de módulos.', error);
  }

  return MODULES_REGISTRY;
}

/**
 * Verifica si un rol tiene acceso a un módulo específico.
 * @param {string} roleKey Clave del rol (ej. 'alumno')
 * @param {string} moduleId ID del módulo (ej. 'libro')
 */
export async function canRoleAccessModule(roleKey, moduleId, provider, options = {}) {
  // Las cuentas Mega-Admin (root) tienen pase directo a TODO
  if (roleKey === 'root' || roleKey === 'admin') return true;

  const modules = await getModulesList(provider, options);
  const targetModule = modules.find(m => m.id === moduleId);
  
  if (!targetModule) return false;

  const allowed = targetModule.allowedRoles || [];
  return allowed.includes('all') || allowed.includes(roleKey);
}
