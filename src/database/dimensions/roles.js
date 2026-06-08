// roles.js - Dimensión de roles y niveles de seguridad (RBAC)
import { queryDatabase } from '../connection';

// Matriz universal estática de 14 niveles para fallback e integridad
export const ROLES_MATRIX = {
  0: { key: 'root', name: 'Root / Infrastructure Owner' },
  1: { key: 'admin', name: 'Platform / Multi-Tenant Admin' },
  2: { key: 'dpo', name: 'Data Protection Officer (DPO)' },
  3: { key: 'finops', name: 'FinOps / Billing Admin' },
  4: { key: 'jefe_catedra', name: 'Jefe de Cátedra / Tenant Owner' },
  5: { key: 'devops', name: 'DevOps / Site Reliability Engineer' },
  6: { key: 'adjunto', name: 'Adjunto / Workspace Manager' },
  7: { key: 'profesor', name: 'Profesor / Supervisor' },
  8: { key: 'ayudante', name: 'Ayudante / Power User / Creator' },
  9: { key: 'alumno', name: 'Alumno Suscripto / Standard User' },
  10: { key: 'b2b_partner', name: 'B2B Partner' },
  11: { key: 'service_account', name: 'Service Account / AI Agent' },
  12: { key: 'guest', name: 'End-Client / Guest' },
  13: { key: 'auditor', name: 'Global Auditor / Viewer' },
  14: { key: 'quarantined', name: 'Quarantined / Suspended State' }
};

/**
 * Obtiene la lista completa de roles disponibles en el sistema.
 */
export async function getRolesList(provider, options = {}) {
  try {
    if (provider === 'spreadsheet') {
      try {
        const rolesList = await queryDatabase({
          provider: 'spreadsheet',
          target: 'Roles!A1:C30',
          options: {
            spreadsheetId: options.spreadsheetId,
            forceRefresh: options.forceRefresh || false
          }
        });
        if (rolesList && rolesList.length > 0) return rolesList;
      } catch (e) {
        console.warn('[DB Roles Warning]: No se encontró la pestaña "Roles" en Sheets. Usando matriz estática.');
      }
    } else if (provider === 'firestore') {
      const { path } = await queryDatabase({
        provider: 'firestore',
        target: 'roles',
        options: { isPublic: true }
      });
      return { path, dbType: 'firestore' };
    } else if (provider === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'role' });
      return await prismaClient.findMany();
    }
  } catch (error) {
    console.error('[DB Dimensions Error]: Error al obtener lista de roles.', error);
  }

  // Fallback a matriz estática formateada
  return Object.values(ROLES_MATRIX).map((r, idx) => ({
    id: String(idx),
    level: idx,
    key: r.key,
    name: r.name
  }));
}

/**
 * Obtiene los detalles de un rol específico por su key (ej: 'admin').
 */
export async function getRoleByKey(key, provider, options = {}) {
  const roles = await getRolesList(provider, options);
  if (Array.isArray(roles)) {
    return roles.find(r => r.key === key) || null;
  }
  return null;
}
