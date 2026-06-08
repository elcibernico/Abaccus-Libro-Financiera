// authGuard.js - Interceptor de rutas protegidas y validación de ACL/RBAC en el servidor
import { createClient } from '@/core/security/supabaseServer';
import { verifyUserAndIP } from '@/core/security/securityService';
import { checkUserPermission } from '../controllers/permissionsController';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

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
  // 1. Priorizar cabeceras seguras inyectadas por proveedores de nube (Vercel, Cloudflare)
  const trustedIp = headerList.get('x-vercel-forwarded-for') || 
                    headerList.get('cf-connecting-ip') || 
                    headerList.get('x-real-ip');

  let clientIp = '127.0.0.1';

  if (trustedIp) {
    // Si existe una cabecera segura, suele venir limpia o con la IP real primero.
    clientIp = trustedIp.split(',')[0].trim();
  } else {
    // 2. Fallback a x-forwarded-for
    // Precaución: El cliente puede forjar "x-forwarded-for: IP_FALSA". 
    // El proxy añade la IP real al final de la cadena -> "IP_FALSA, IP_REAL_PROXY1"
    // Por ende, NUNCA debemos tomar el índice [0] ciegamente. Tomamos el último.
    const forwardedFor = headerList.get('x-forwarded-for');
    if (forwardedFor) {
      const ips = forwardedFor.split(',').map(ip => ip.trim());
      clientIp = ips[ips.length - 1];
    }
  }

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

  // Únicamente se permite el paso si el rol es admin o root
  if (authorizedUser.role !== 'admin' && authorizedUser.role !== 'root') {
    return {
      authorized: false,
      response: NextResponse.redirect(new URL('/?error=unauthorized', siteUrl))
    };
  }

  return { authorized: true, user: authorizedUser };
}
