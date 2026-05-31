// permissionsController.js - Gestión y validación de permisos de usuario (RBAC/ACL)
import { queryDatabase } from '@/database/connection';
import { updateSpreadsheetRow } from '@/database/connections/spreadsheet';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';

const DB_PROVIDER = process.env.NEXT_PUBLIC_DATABASE_PROVIDER || 'spreadsheet';
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

/**
 * Obtiene la lista completa de usuarios autorizados con sus respectivos roles y permisos.
 * @returns {Promise<Array<object>>}
 */
export async function getAllUsers() {
  try {
    if (DB_PROVIDER === 'spreadsheet') {
      // Usamos un rango A1:G100 para abarcar todas las columnas de permisos
      const usersList = await queryDatabase({
        provider: 'spreadsheet',
        target: 'Usuarios!A1:G100',
        options: {
          spreadsheetId: SPREADSHEET_ID,
          forceRefresh: true // Forzar refresco para ver cambios en tiempo real
        }
      });

      return usersList.map(u => ({
        id: u.id,
        email: u.email,
        name: u.name || '',
        role: u.role || 'guest',
        permissions: {
          may_export_pdf: u.may_export_pdf === 'TRUE' || u.may_export_pdf === true || String(u.may_export_pdf).toUpperCase() === 'TRUE',
          may_edit_records: u.may_edit_records === 'TRUE' || u.may_edit_records === true || String(u.may_edit_records).toUpperCase() === 'TRUE',
          may_view_advanced_charts: u.may_view_advanced_charts === 'TRUE' || u.may_view_advanced_charts === true || String(u.may_view_advanced_charts).toUpperCase() === 'TRUE',
        }
      }));
    } else if (DB_PROVIDER === 'firestore') {
      // Implementación Firestore si aplica en el futuro
      return [];
    } else if (DB_PROVIDER === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'user' });
      return await prismaClient.findMany({
        include: { permissions: true }
      });
    }
    return [];
  } catch (error) {
    console.error('[Permissions Controller Error] Error al listar usuarios:', error);
    return [];
  }
}

/**
 * Actualiza los permisos y rol de un usuario específico.
 * @param {string} email Correo del usuario
 * @param {object} permissions Mapa de permisos a actualizar
 * @param {string} role Rol del usuario (ej: 'admin', 'user', 'guest')
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function updateUserPermissions(email, permissions, role) {
  try {
    const formattedEmail = email.toLowerCase().trim();

    if (DB_PROVIDER === 'spreadsheet') {
      // 1. Obtener los usuarios para encontrar el índice de fila
      const rawUsers = await queryDatabase({
        provider: 'spreadsheet',
        target: 'Usuarios!A1:G100',
        options: {
          spreadsheetId: SPREADSHEET_ID,
          forceRefresh: true
        }
      });

      // El índice de fila en Sheets es 1-based y la fila 1 son las cabeceras.
      // Así que sumamos 2 al índice encontrado en rawUsers.
      const userIndex = rawUsers.findIndex(u => u.email && u.email.toLowerCase().trim() === formattedEmail);
      
      if (userIndex === -1) {
        return { success: false, error: 'Usuario no encontrado en la lista blanca.' };
      }

      const rowNumber = userIndex + 2; 
      const userObj = rawUsers[userIndex];

      // 2. Preparar los nuevos valores manteniendo ID y Nombre intactos
      // Columnas: id, email, name, role, may_export_pdf, may_edit_records, may_view_advanced_charts
      const updatedRowValues = [
        userObj.id,
        userObj.email,
        userObj.name || '',
        role,
        permissions.may_export_pdf ? 'TRUE' : 'FALSE',
        permissions.may_edit_records ? 'TRUE' : 'FALSE',
        permissions.may_view_advanced_charts ? 'TRUE' : 'FALSE'
      ];

      await updateSpreadsheetRow(SPREADSHEET_ID, `Usuarios!A${rowNumber}:G${rowNumber}`, updatedRowValues);
      return { success: true };
    } else if (DB_PROVIDER === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'user' });
      await prismaClient.update({
        where: { email: formattedEmail },
        data: {
          role,
          permissions: {
            update: permissions
          }
        }
      });
      return { success: true };
    }

    return { success: false, error: 'Proveedor de base de datos no compatible con actualizaciones dinámicas.' };
  } catch (error) {
    console.error('[Permissions Controller Error] Error al actualizar permisos:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Valida si un usuario posee un permiso específico.
 * @param {string} email Correo del usuario
 * @param {string} permissionKey Clave del permiso (ej: 'may_export_pdf')
 * @returns {Promise<boolean>}
 */
export async function checkUserPermission(email, permissionKey) {
  try {
    const user = await getAuthorizedUserByEmail(email, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });
    if (!user) return false;
    
    // Si es administrador tiene todos los permisos por defecto
    if (user.role === 'admin') return true;

    return !!user.permissions?.[permissionKey];
  } catch (error) {
    console.error(`[Permissions Verification Error] Error al verificar ${permissionKey}:`, error);
    return false;
  }
}
