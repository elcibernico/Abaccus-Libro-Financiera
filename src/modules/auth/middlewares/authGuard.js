// authGuard.js - Interceptor de rutas protegidas y validación de ACL/RBAC en el servidor
import { createClient } from '@/core/security/supabaseServer';
import { checkUserPermission } from '../controllers/permissionsController';
import { NextResponse } from 'next/server';

/**
 * Verifica si el usuario actual está autenticado.
 * Si no está autenticado, puede redirigir o retornar null.
 * @returns {Promise<object|null>} Retorna el objeto user de Supabase si está autenticado.
 */
export async function requireAuth() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }
  return user;
}

/**
 * Guard para APIs (Route Handlers) que exige un permiso granular específico.
 * @param {string} permissionKey Clave del permiso requerido (ej. 'may_edit_records')
 * @returns {Promise<{authorized: boolean, user?: object, response?: NextResponse}>}
 */
export async function requirePermission(permissionKey) {
  const user = await requireAuth();
  
  if (!user) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'No autenticado. Por favor inicie sesión.' },
        { status: 401 }
      )
    };
  }

  const hasPermission = await checkUserPermission(user.email, permissionKey);
  
  if (!hasPermission) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Acceso denegado. Permisos insuficientes.' },
        { status: 403 }
      )
    };
  }

  return { authorized: true, user };
}

/**
 * Guard para proteger vistas de administración (requiere rol de administrador).
 * @returns {Promise<{authorized: boolean, user?: object, response?: NextResponse}>}
 */
export async function requireAdmin() {
  const user = await requireAuth();
  
  if (!user) {
    return {
      authorized: false,
      response: NextResponse.redirect(new URL('/login?error=session_expired', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
    };
  }

  // Obtenemos los detalles del usuario autorizado para validar si es administrador
  const DB_PROVIDER = process.env.NEXT_PUBLIC_DATABASE_PROVIDER || 'spreadsheet';
  const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';
  const { getAuthorizedUserByEmail } = require('@/database/dimensions/users');
  const authorizedUser = await getAuthorizedUserByEmail(user.email, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });

  if (!authorizedUser || authorizedUser.role !== 'admin') {
    return {
      authorized: false,
      response: NextResponse.redirect(new URL('/?error=unauthorized', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
    };
  }

  return { authorized: true, user: authorizedUser };
}
