// permissionsController.js - Gestión y validación de permisos de usuario (RBAC/ACL)
import { queryDatabase } from '@/database/connection';
import { updateSpreadsheetRow } from '@/database/connections/spreadsheet';
import { getAuthorizedUserByEmail, MEGA_ADMINS } from '@/database/dimensions/users';
import { sendPendingUserAlertEmail } from '../services/emailService';
import { getDefaultPermissionsForRole } from '@/config/rolesConfig';

const DB_PROVIDER = 'supabase';
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

/**
 * Obtiene la lista completa de usuarios autorizados con sus respectivos roles y permisos.
 * @returns {Promise<Array<object>>}
 */
export async function getAllUsers() {
  try {
    if (DB_PROVIDER === 'spreadsheet') {
      const usersList = await queryDatabase({
        provider: 'spreadsheet',
        target: 'Usuarios!A1:G100',
        options: {
          spreadsheetId: SPREADSHEET_ID,
          forceRefresh: true
        }
      });

      return usersList.map(u => ({
        id: u.id,
        email: u.email,
        name: u.name || '',
        celular: u.celular || '',
        role: u.role || 'guest',
        permissions: {
          may_export_pdf: u.may_export_pdf === 'TRUE' || u.may_export_pdf === true || String(u.may_export_pdf).toUpperCase() === 'TRUE',
          may_edit_records: u.may_edit_records === 'TRUE' || u.may_edit_records === true || String(u.may_edit_records).toUpperCase() === 'TRUE',
          may_view_advanced_charts: u.may_view_advanced_charts === 'TRUE' || u.may_view_advanced_charts === true || String(u.may_view_advanced_charts).toUpperCase() === 'TRUE',
        }
      }));
    } else if (DB_PROVIDER === 'firestore') {
      return [];
    } else if (DB_PROVIDER === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'user' });
      return await prismaClient.findMany({
        include: { permissions: true }
      });
    } else if (DB_PROVIDER === 'supabase') {
      const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
      const { data: users, error } = await supabase
        .from('whitelist_users')
        .select('*')
        .order('email', { ascending: true });
      if (error) {
        throw error;
      }
      return (users || []).map(u => {
        // Combinar columna jsonb con individuales para máxima compatibilidad
        const jsonbPermissions = typeof u.permissions === 'object' ? u.permissions : {};
        return {
          id: u.id,
          email: u.email,
          name: u.name || '',
          celular: u.celular || '',
          role: u.role || 'guest',
          permissions: {
            may_export_pdf: u.may_export_pdf === true || jsonbPermissions.may_export_pdf === true,
            may_edit_records: u.may_edit_records === true || jsonbPermissions.may_edit_records === true,
            may_view_advanced_charts: u.may_view_advanced_charts === true || jsonbPermissions.may_view_advanced_charts === true,
            ...jsonbPermissions
          }
        };
      });
    }
    return [];
  } catch (error) {
    console.error('[Permissions Controller Error] Error al listar usuarios:', error);
    return [];
  }
}

/**
 * Actualiza los permisos, celular y rol de un usuario específico.
 * @param {string} email Correo del usuario
 * @param {object} permissions Mapa de permisos a actualizar
 * @param {string} role Rol del usuario
 * @param {string} celular Celular opcional a actualizar
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function updateUserPermissions(email, permissions, role, celular = undefined) {
  try {
    const formattedEmail = email.toLowerCase().trim();

    if (DB_PROVIDER === 'spreadsheet') {
      const rawUsers = await queryDatabase({
        provider: 'spreadsheet',
        target: 'Usuarios!A1:G100',
        options: {
          spreadsheetId: SPREADSHEET_ID,
          forceRefresh: true
        }
      });

      const userIndex = rawUsers.findIndex(u => u.email && u.email.toLowerCase().trim() === formattedEmail);
      if (userIndex === -1) {
        return { success: false, error: 'Usuario no encontrado en la lista blanca.' };
      }

      const rowNumber = userIndex + 2; 
      const userObj = rawUsers[userIndex];

      const updatedRowValues = [
        userObj.id,
        userObj.email,
        userObj.name || '',
        role,
        permissions.may_export_pdf ? 'TRUE' : 'FALSE',
        permissions.may_edit_records ? 'TRUE' : 'FALSE',
        permissions.may_view_advanced_charts ? 'TRUE' : 'FALSE',
        celular !== undefined ? celular : (userObj.celular || '')
      ];

      await updateSpreadsheetRow(SPREADSHEET_ID, `Usuarios!A${rowNumber}:H${rowNumber}`, updatedRowValues);
      return { success: true };
    } else if (DB_PROVIDER === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'user' });
      const updateData = { role };
      if (celular !== undefined) {
        updateData.celular = celular;
      }
      await prismaClient.update({
        where: { email: formattedEmail },
        data: {
          ...updateData,
          permissions: {
            update: permissions
          }
        }
      });
      return { success: true };
    } else if (DB_PROVIDER === 'supabase') {
      const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
      const updatePayload = {
        role,
        permissions: permissions, // Guardar objeto JSONB
      };

      if (celular !== undefined) {
        updatePayload.celular = celular;
      }

      const { error } = await supabase
        .from('whitelist_users')
        .update(updatePayload)
        .eq('email', formattedEmail);
      if (error) {
        throw error;
      }
      return { success: true };
    }

    return { success: false, error: 'Proveedor de base de datos no compatible.' };
  } catch (error) {
    console.error('[Permissions Controller Error] Error al actualizar permisos:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Valida si un usuario posee un permiso específico.
 */
export async function checkUserPermission(email, permissionKey) {
  try {
    const user = await getAuthorizedUserByEmail(email, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });
    if (!user) return false;
    if (user.role === 'admin' || user.role === 'root') return true;

    return !!user.permissions?.[permissionKey];
  } catch (error) {
    console.error(`[Permissions Verification Error] Error al verificar ${permissionKey}:`, error);
    return false;
  }
}

/**
 * Agrega un nuevo usuario a la lista blanca.
 */
export async function addAuthorizedUser(email, name = '', role = 'user', celular = '', permissions = {}, nombre = '', apellido = '', fecha_nacimiento = null, legajo = '', dni = '') {
  try {
    const formattedEmail = email.toLowerCase().trim();
    const formattedName = name.trim();
    const formattedCelular = celular.trim();
    
    // Obtener los permisos por defecto según el rol si no se envían explícitamente
    const defaultRolePerms = getDefaultPermissionsForRole(role);
    const defaults = {
      ...defaultRolePerms,
      ...permissions
    };

    if (DB_PROVIDER === 'spreadsheet') {
      const newId = `usr_${Date.now()}`;
      const rowValues = [
        newId,
        formattedEmail,
        formattedName || `${nombre.trim()} ${apellido.trim()}`.trim(),
        role,
        defaults.may_export_pdf ? 'TRUE' : 'FALSE',
        defaults.may_edit_records ? 'TRUE' : 'FALSE',
        defaults.may_view_advanced_charts ? 'TRUE' : 'FALSE',
        formattedCelular
      ];

      const { appendSpreadsheetData } = await import('@/database/connections/spreadsheet');
      await appendSpreadsheetData(SPREADSHEET_ID, 'Usuarios!A2:H2', [rowValues]);
      return { success: true };
    } else if (DB_PROVIDER === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'user' });
      await prismaClient.create({
        data: {
          email: formattedEmail,
          name: formattedName || `${nombre.trim()} ${apellido.trim()}`.trim(),
          role,
          celular: formattedCelular,
          permissions: {
            create: defaults
          }
        }
      });
      return { success: true };
    } else if (DB_PROVIDER === 'supabase') {
      const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
      const { error } = await supabase
        .from('whitelist_users')
        .insert([
          {
            email: formattedEmail,
            name: formattedName || `${nombre.trim()} ${apellido.trim()}`.trim(),
            role,
            celular: formattedCelular,
            permissions: defaults, // Guardar objeto JSONB
            nombre: nombre.trim() || null,
            apellido: apellido.trim() || null,
            dni: dni.trim() || null,
            fecha_nacimiento: fecha_nacimiento || null,
            legajo: legajo.trim() || null,
            is_active: true
          }
        ]);

      if (error) {
        throw error;
      }
      return { success: true };
    }

    return { success: false, error: 'Proveedor de base de datos no compatible.' };
  } catch (error) {
    console.error('[Permissions Controller Error] Error al agregar usuario:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Elimina un usuario de la lista blanca.
 */
export async function removeAuthorizedUser(email) {
  try {
    const formattedEmail = email.toLowerCase().trim();

    if (DB_PROVIDER === 'spreadsheet') {
      return await updateUserPermissions(formattedEmail, {
        may_export_pdf: false,
        may_edit_records: false,
        may_view_advanced_charts: false
      }, 'guest');
    } else if (DB_PROVIDER === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'user' });
      await prismaClient.delete({
        where: { email: formattedEmail }
      });
      return { success: true };
    } else if (DB_PROVIDER === 'supabase') {
      const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
      const { error } = await supabase
        .from('whitelist_users')
        .delete()
        .eq('email', formattedEmail);

      if (error) {
        throw error;
      }
      return { success: true };
    }

    return { success: false, error: 'Proveedor de base de datos no compatible.' };
  } catch (error) {
    console.error('[Permissions Controller Error] Error al eliminar usuario:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Registra un intento de acceso fallido en la lista de usuarios en suspenso.
 */
export async function registerPendingUser(email, name = '', celular = '', nombre = '', apellido = '') {
  try {
    const formattedEmail = email.toLowerCase().trim();
    if (DB_PROVIDER !== 'supabase') {
      console.warn(`[Register Pending]: Registro de pendientes solo soportado en Supabase. Saltando para ${email}`);
      return { success: true };
    }

    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
    
    // Verificar si ya está registrado para no duplicar filas
    const { data: existing } = await supabase
      .from('whitelist_pending')
      .select('email')
      .eq('email', formattedEmail)
      .maybeSingle();

    if (existing) {
      console.log(`[Register Pending]: El usuario ${formattedEmail} ya se encuentra registrado como pendiente.`);
      return { success: true };
    }

    // Insertar en la tabla con los nuevos campos
    const { error } = await supabase
      .from('whitelist_pending')
      .insert([
        {
          email: formattedEmail,
          name: name.trim() || `${nombre.trim()} ${apellido.trim()}`.trim(),
          celular: celular.trim(),
          nombre: nombre.trim() || null,
          apellido: apellido.trim() || null
        }
      ]);

    if (error) {
      throw error;
    }

    // Disparar correo de aviso a ndemartis@fcecon.unr.edu.ar
    await sendPendingUserAlertEmail({
      email: formattedEmail,
      name: name.trim() || `${nombre.trim()} ${apellido.trim()}`.trim(),
      celular
    });

    return { success: true };
  } catch (error) {
    console.error('[Permissions Controller Error] Error en registerPendingUser:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Obtiene la lista de usuarios en suspenso.
 */
export async function getPendingUsers() {
  try {
    if (DB_PROVIDER !== 'supabase') return [];

    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
    const { data, error } = await supabase
      .from('whitelist_pending')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('[Permissions Controller Error] Error en getPendingUsers:', error);
    return [];
  }
}

/**
 * Aprueba a un usuario pendiente, moviéndolo a la lista blanca y eliminándolo de la cola.
 */
export async function approvePendingUser(email, role = 'user', celular = '') {
  try {
    const formattedEmail = email.toLowerCase().trim();
    if (DB_PROVIDER !== 'supabase') return { success: false, error: 'No soportado' };

    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });

    // 1. Buscar los datos en la tabla pendiente
    const { data: pending, error: fetchErr } = await supabase
      .from('whitelist_pending')
      .select('*')
      .eq('email', formattedEmail)
      .maybeSingle();

    if (fetchErr || !pending) {
      return { success: false, error: 'No se encontraron registros pendientes para este email.' };
    }

    // Usar celular de la cola si no se pasa uno nuevo
    const userCelular = celular || pending.celular || '';

    // 2. Mover a la lista blanca con todos los datos disponibles
    const addRes = await addAuthorizedUser(
      formattedEmail,
      pending.name || '',
      role,
      userCelular,
      {},
      pending.nombre || '',
      pending.apellido || '',
      pending.fecha_nacimiento || null,
      pending.legajo || '',
      pending.dni || ''
    );
    if (!addRes.success) {
      return addRes;
    }

    // 3. Eliminar de la cola de pendientes
    const { error: delErr } = await supabase
      .from('whitelist_pending')
      .delete()
      .eq('email', formattedEmail);

    if (delErr) {
      console.error('[Permissions Controller Warning] Usuario aprobado pero falló al removerlo de pendientes:', delErr);
    }

    return { success: true };
  } catch (error) {
    console.error('[Permissions Controller Error] Error al aprobar usuario pendiente:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Rechaza a un usuario pendiente, eliminándolo de la cola.
 */
export async function rejectPendingUser(email) {
  try {
    const formattedEmail = email.toLowerCase().trim();
    if (DB_PROVIDER !== 'supabase') return { success: false, error: 'No soportado' };

    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
    const { error } = await supabase
      .from('whitelist_pending')
      .delete()
      .eq('email', formattedEmail);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('[Permissions Controller Error] Error al rechazar usuario pendiente:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Actualiza el perfil de un usuario registrado en whitelist_users.
 */
export async function updateUserProfile(email, profileData) {
  try {
    const formattedEmail = email.toLowerCase().trim();
    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
    
    // Verificar si el usuario ya existe en whitelist_users
    const { data: existingUser, error: checkErr } = await supabase
      .from('whitelist_users')
      .select('email')
      .eq('email', formattedEmail)
      .maybeSingle();

    if (checkErr) throw checkErr;

    if (!existingUser) {
      const isMega = MEGA_ADMINS.includes(formattedEmail);
      if (isMega) {
        // Es un Mega Admin que no tiene fila aún, lo insertamos
        const { error: insertErr } = await supabase
          .from('whitelist_users')
          .insert([
            {
              email: formattedEmail,
              name: `${profileData.nombre || ''} ${profileData.apellido || ''}`.trim() || 'Mega Admin',
              nombre: profileData.nombre?.trim() || 'Mega',
              apellido: profileData.apellido?.trim() || 'Admin',
              role: 'root',
              celular: profileData.celular?.trim() || 'System',
              dni: profileData.dni?.trim() || '',
              fecha_nacimiento: profileData.fecha_nacimiento || null,
              legajo: profileData.legajo?.trim() || '',
              is_active: true,
              permissions: {
                may_export_pdf: true,
                may_edit_records: true,
                may_view_advanced_charts: true
              }
            }
          ]);
        if (insertErr) throw insertErr;
        return { success: true };
      }
      return { success: false, error: 'Usuario no encontrado en la whitelist.' };
    }
    
    const { error } = await supabase
      .from('whitelist_users')
      .update({
        nombre: profileData.nombre?.trim() || null,
        apellido: profileData.apellido?.trim() || null,
        dni: profileData.dni?.trim() || null,
        fecha_nacimiento: profileData.fecha_nacimiento || null,
        legajo: profileData.legajo?.trim() || null,
        celular: profileData.celular?.trim() || null,
        name: `${profileData.nombre || ''} ${profileData.apellido || ''}`.trim()
      })
      .eq('email', formattedEmail);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('[Permissions Controller Error] Error en updateUserProfile:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Desuscribir a un usuario (Soft Delete: is_active = false, deleted_at = NOW()).
 */
export async function softDeleteUser(email) {
  try {
    const formattedEmail = email.toLowerCase().trim();
    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
    
    const { error } = await supabase
      .from('whitelist_users')
      .update({
        is_active: false,
        deleted_at: new Date().toISOString()
      })
      .eq('email', formattedEmail);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('[Permissions Controller Error] Error en softDeleteUser:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Reactivar un usuario (is_active = true, deleted_at = null).
 */
export async function reactivateUser(email) {
  try {
    const formattedEmail = email.toLowerCase().trim();
    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
    
    const { error } = await supabase
      .from('whitelist_users')
      .update({
        is_active: true,
        deleted_at: null
      })
      .eq('email', formattedEmail);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('[Permissions Controller Error] Error en reactivateUser:', error);
    return { success: false, error: error.message };
  }
}
