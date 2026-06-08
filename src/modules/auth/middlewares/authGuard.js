// authGuard.js - Interceptor de rutas protegidas y validación de ACL/RBAC en el servidor
import { createClient } from '@/core/security/supabaseServer';
import { verifyUserAndIP, getClientIp } from '@/core/security/securityService';
import { checkUserPermission } from '../controllers/permissionsController';
import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';
import { ROLE_HIERARCHY, getDefaultPermissionsForRole } from '@/config/rolesConfig';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';

/**
 * Verifica si el usuario actual está autenticado en Supabase.
 * @returns {Promise<object|null>} Retorna el objeto user si está autenticado.
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

  // Obtener el rol real de la base de datos
  const dbUser = await getAuthorizedUserByEmail(user.email, 'supabase');
  if (!dbUser) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: 'Acceso denegado. Usuario no encontrado en la whitelist.' },
        { status: 403 }
      )
    };
  }

  const cookieStore = await cookies();
  const activeRoleCookie = cookieStore.get('active_role')?.value;

  const realRole = dbUser.role || 'guest';
  let activeRole = realRole;

  if (activeRoleCookie && ROLE_HIERARCHY[activeRoleCookie] < ROLE_HIERARCHY[realRole]) {
    activeRole = activeRoleCookie;
  }

  let hasPermission = false;
  if (activeRole !== realRole) {
    const defaultPerms = getDefaultPermissionsForRole(activeRole);
    hasPermission = !!defaultPerms[permissionKey];
  } else {
    hasPermission = await checkUserPermission(user.email, permissionKey);
  }
  
  if (!hasPermission) {
    return {
      authorized: false,
      response: NextResponse.json(
        { error: `Acceso denegado. Permisos insuficientes${activeRole !== realRole ? ` (simulando ${activeRole})` : ''}.` },
        { status: 403 }
      )
    };
  }

  return { authorized: true, user: { ...user, role: activeRole } };
}

/**
 * Guard para proteger vistas de administración (requiere rol de administrador/root e IP autorizada).
 */
export async function requireAdmin() {
  const headerList = await headers();
  const host = headerList.get('host') || 'localhost:3000';
  const isLocal = host.includes('localhost') || host.includes('127.0.0.1');
  const protocol = isLocal ? 'http' : (headerList.get('x-forwarded-proto') || 'https');
  const siteUrl = `${protocol}://${host}`;

  const user = await requireAuth();
  
  if (!user) {
    return {
      authorized: false,
      response: NextResponse.redirect(new URL('/login?error=session_expired', siteUrl))
    };
  }

  // Detectar la IP del cliente (Evitando IP Spoofing)
  const clientIp = getClientIp(headerList);

  // Validar IP e integridad de Whitelist del usuario
  const securityCheck = await verifyUserAndIP(user.email, clientIp);

  if (!securityCheck.authorized) {
    const errorType = securityCheck.error || 'unauthorized';
    return {
      authorized: false,
      response: NextResponse.redirect(new URL(`/login?error=${errorType}`, siteUrl))
    };
  }

  const authorizedUser = securityCheck.user;

  // Evaluar suplantación de rol (Role Impersonation)
  const cookieStore = await cookies();
  const activeRoleCookie = cookieStore.get('active_role')?.value;
  const realRole = authorizedUser.role || 'guest';
  let activeRole = realRole;

  if (activeRoleCookie && ROLE_HIERARCHY[activeRoleCookie] < ROLE_HIERARCHY[realRole]) {
    activeRole = activeRoleCookie;
    // Sobrescribir los datos en memoria para esta validación
    authorizedUser.role = activeRole;
    authorizedUser.permissions = getDefaultPermissionsForRole(activeRole);
  }

  // Únicamente se permite el paso si el rol es admin o root
  if (authorizedUser.role !== 'admin' && authorizedUser.role !== 'root') {
    return {
      authorized: false,
      response: NextResponse.redirect(new URL('/?error=unauthorized', siteUrl))
    };
  }

  return { authorized: true, user: authorizedUser };
}

