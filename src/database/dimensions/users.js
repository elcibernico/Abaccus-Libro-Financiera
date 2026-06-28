// users.js - Tabla de dimensión de usuarios autorizados y control de roles/permisos
import { queryDatabase } from '../connection';

// Cuentas Mega-Admin con privilegios de bypass absoluto a nivel de sistema (Root Nivel 0)
export const MEGA_ADMINS = [
  'ndemartis@fcecon.unr.edu.ar',
  'elcibernico@gmail.com',
  'estudiocontableid@gmail.com'
];

/**
 * Verifica si un correo está en la lista blanca de usuarios autorizados.
 * Si no está, retorna null (si sign-up está cerrado) o rol "guest" (si sign-up está abierto).
 * @param {string} email Correo del usuario a verificar
 * @param {string} provider Motor de persistencia activo (firestore, prisma, spreadsheet)
 * @param {object} options Opciones adicionales (spreadsheetId, etc.)
 */
export async function getAuthorizedUserByEmail(email, provider, options = {}) {
  try {
    const formattedEmail = email.toLowerCase().trim();

    // REGLA DE BYPASS: root tiene acceso total, pero igual buscamos su nombre real en Supabase
    if (MEGA_ADMINS.includes(formattedEmail)) {
      try {
        const supabase = await queryDatabase({ provider: 'supabase' });
        const { data: rootUser } = await supabase
          .from('whitelist_users')
          .select('name, celular')
          .eq('email', formattedEmail)
          .maybeSingle();

        return {
          id: 'mega_admin_root',
          email: formattedEmail,
          name: rootUser?.name || '',   // nombre real de Supabase
          role: 'root',
          celular: rootUser?.celular || 'System',
          permissions: {
            may_export_pdf: true,
            may_edit_records: true,
            may_view_advanced_charts: true,
          }
        };
      } catch {
        // Si Supabase falla, seguimos sin bloquear al root
        return {
          id: 'mega_admin_root',
          email: formattedEmail,
          name: '',
          role: 'root',
          celular: 'System',
          permissions: {
            may_export_pdf: true,
            may_edit_records: true,
            may_view_advanced_charts: true,
          }
        };
      }
    }

    let dbUser = null;

    if (provider === 'spreadsheet') {
      const usersList = await queryDatabase({
        provider: 'spreadsheet',
        target: 'Usuarios!A1:G100', // Ampliado para cubrir más columnas
        options: {
          spreadsheetId: options.spreadsheetId,
          forceRefresh: options.forceRefresh || false
        }
      });

      const user = usersList.find(u => u.email && u.email.toLowerCase().trim() === formattedEmail);
      if (user) {
        dbUser = {
          id: user.id,
          email: user.email,
          name: user.name || '',
          celular: user.celular || '',
          role: user.role || 'guest',
          permissions: {
            may_export_pdf: user.may_export_pdf === 'TRUE' || user.may_export_pdf === true,
            may_edit_records: user.may_edit_records === 'TRUE' || user.may_edit_records === true,
            may_view_advanced_charts: user.may_view_advanced_charts === 'TRUE' || user.may_view_advanced_charts === true,
          }
        };
      }
    } else if (provider === 'firestore') {
      const { path } = await queryDatabase({
        provider: 'firestore',
        target: 'authorized_users',
        options: { isPublic: true }
      });
      return { path, dbType: 'firestore' };
    } else if (provider === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'user' });
      const user = await prismaClient.findUnique({
        where: { email: formattedEmail },
        include: { permissions: true }
      });
      if (user) {
        dbUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          celular: user.celular || '',
          role: user.role || 'guest',
          permissions: user.permissions || {}
        };
      }
    } else if (provider === 'supabase') {
      const supabase = await queryDatabase({ provider: 'supabase' });
      const { data: user, error } = await supabase
        .from('whitelist_users')
        .select('*')
        .eq('email', formattedEmail)
        .maybeSingle();

      if (error) {
        console.error('[DB Dimensions User Error]:', error);
      }

      if (user) {
        // 1. Obtener permisos por defecto del rol
        const { data: rolePerms } = await supabase
          .from('roles_permissions')
          .select('permission_name')
          .eq('role_id', user.role || 'guest');

        // 2. Obtener excepciones del usuario (overrides)
        const { data: customPerms } = await supabase
          .from('user_custom_permissions')
          .select('permission_name, is_granted')
          .eq('user_email', formattedEmail);

        // 3. Compilar los permisos finales
        const rbacPermissions = {};
        
        if (rolePerms) {
          rolePerms.forEach(rp => {
            rbacPermissions[rp.permission_name] = true;
          });
        }
        
        if (customPerms) {
          customPerms.forEach(cp => {
            rbacPermissions[cp.permission_name] = cp.is_granted;
          });
        }

        const jsonbPermissions = typeof user.permissions === 'object' ? user.permissions : {};
        
        // Construir name de forma robusta a partir de nombre y apellido si existen
        let displayName = user.name || '';
        if (user.nombre || user.apellido) {
          displayName = `${user.nombre || ''} ${user.apellido || ''}`.trim();
        }

        dbUser = {
          id: user.id,
          email: user.email,
          name: displayName,
          nombre: user.nombre || '',
          apellido: user.apellido || '',
          dni: user.dni || '',
          fecha_nacimiento: user.fecha_nacimiento || null,
          legajo: user.legajo || '',
          celular: user.celular || '',
          role: user.role || 'guest',
          is_active: user.is_active !== false,
          deleted_at: user.deleted_at || null,
          permissions: {
            may_export_pdf: user.may_export_pdf === true || jsonbPermissions.may_export_pdf === true,
            may_edit_records: user.may_edit_records === true || jsonbPermissions.may_edit_records === true,
            may_view_advanced_charts: user.may_view_advanced_charts === true || jsonbPermissions.may_view_advanced_charts === true,
            ...jsonbPermissions,
            ...rbacPermissions
          }
        };
      }
    }

    // SI EL USUARIO EXISTE EN LA BASE DE DATOS
    if (dbUser) {
      return dbUser;
    }

    // SI NO EXISTE EN LA BASE DE DATOS, EVALUAR LA POLÍTICA DE SIGN-UP
    const allowPublicSignup = process.env.NEXT_PUBLIC_ALLOW_PUBLIC_SIGNUP === 'true';

    if (allowPublicSignup) {
      // Registrar dinámicamente como Invitado (Guest) sin permisos
      return {
        email: formattedEmail,
        role: 'guest', // No tiene acceso a módulos cerrados
        celular: '',
        permissions: {
          may_export_pdf: false,
          may_edit_records: false,
          may_view_advanced_charts: false
        }
      };
    }

    // Sign-Up cerrado: Retornar null para denegar el acceso completamente
    return null;

  } catch (error) {
    console.error('[DB Dimensions Error]: Error al buscar usuario autorizado.', error);
    return null;
  }
}
