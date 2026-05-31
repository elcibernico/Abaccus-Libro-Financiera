// users.js - Tabla de dimensión de usuarios autorizados y control de roles/permisos
import { queryDatabase } from '../connection';

/**
 * Verifica si un correo está en la lista blanca de usuarios autorizados.
 * Si no está, retorna null o rol "Guest".
 * @param {string} email Correo del usuario a verificar
 * @param {string} provider Motor de persistencia activo (firestore, prisma, spreadsheet)
 * @param {object} options Opciones adicionales (spreadsheetId, etc.)
 */
export async function getAuthorizedUserByEmail(email, provider, options = {}) {
  try {
    const formattedEmail = email.toLowerCase().trim();

    if (provider === 'spreadsheet') {
      // Consultar la hoja de usuarios autorizados
      const usersList = await queryDatabase({
        provider: 'spreadsheet',
        target: 'Usuarios!A1:E100', // Rango de la dimensión de usuarios
        options: {
          spreadsheetId: options.spreadsheetId,
          forceRefresh: options.forceRefresh || false
        }
      });

      const user = usersList.find(u => u.email && u.email.toLowerCase().trim() === formattedEmail);
      if (user) {
        return {
          id: user.id,
          email: user.email,
          name: user.name || '',
          role: user.role || 'guest',
          // Mapear permisos dinámicos a partir de columnas booleanas (casillas de verificación)
          permissions: {
            may_export_pdf: user.may_export_pdf === 'TRUE' || user.may_export_pdf === true,
            may_edit_records: user.may_edit_records === 'TRUE' || user.may_edit_records === true,
            may_view_advanced_charts: user.may_view_advanced_charts === 'TRUE' || user.may_view_advanced_charts === true,
          }
        };
      }
    } else if (provider === 'firestore') {
      // En Firestore consultamos la colección pública de usuarios autorizados
      const { path } = await queryDatabase({
        provider: 'firestore',
        target: 'authorized_users',
        options: { isPublic: true }
      });
      
      // Nota: La capa superior manejará la consulta de Firebase Firestore sobre el path devuelto
      // Aquí devolvemos el path estructurado para la consulta
      return { path, dbType: 'firestore' };
    } else if (provider === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'user' });
      const user = await prismaClient.findUnique({
        where: { email: formattedEmail },
        include: { permissions: true }
      });
      return user;
    }

    // Por defecto, rol de Invitado (Guest) con todos los permisos interactivos habilitados inicialmente
    return {
      email: formattedEmail,
      role: 'guest',
      permissions: {
        may_export_pdf: true,
        may_edit_records: true,
        may_view_advanced_charts: true
      }
    };
  } catch (error) {
    console.error('[DB Dimensions Error]: Error al buscar usuario autorizado.', error);
    return {
      email: email.toLowerCase().trim(),
      role: 'guest',
      permissions: {
        may_export_pdf: true,
        may_edit_records: true,
        may_view_advanced_charts: true
      }
    };
  }
}
