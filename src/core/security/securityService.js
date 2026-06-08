// securityService.js - Reglas unificadas de seguridad, Whitelist de usuarios y Firewall de IPs
import { getAuthorizedUserByEmail, MEGA_ADMINS } from '@/database/dimensions/users';
import { getWhitelistIps } from '@/database/dimensions/whitelistIps';
import { getSetting } from '@/database/dimensions/settings';

// Cache simple en memoria para evitar consultar la DB en cada petición API/Middleware
let cachedEnableIp = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60000; // 1 minuto de TTL

/**
 * Extrae de forma segura la IP real del cliente desde la lista de headers (evitando IP spoofing).
 * @param {Headers} headerList Objeto de headers de Next.js
 * @returns {string} IP extraída del cliente
 */
export function getClientIp(headerList) {
  if (!headerList) return '127.0.0.1';
  
  // 1. Priorizar cabeceras seguras inyectadas por proveedores de nube (Vercel, Cloudflare, etc.)
  const trustedIp = headerList.get('x-vercel-forwarded-for') || 
                    headerList.get('cf-connecting-ip') || 
                    headerList.get('x-real-ip');

  if (trustedIp) {
    return trustedIp.split(',')[0].trim();
  }

  // 2. Fallback a x-forwarded-for (tomando el último elemento para evitar spoofing)
  const forwardedFor = headerList.get('x-forwarded-for');
  if (forwardedFor) {
    const ips = forwardedFor.split(',').map(ip => ip.trim());
    return ips[ips.length - 1];
  }

  return '127.0.0.1';
}

/**
 * Valida de forma transversal si un usuario y su IP de origen tienen permitido el ingreso.
 * @param {string} email Correo a validar
 * @param {string} clientIp IP de origen del cliente
 * @returns {Promise<{authorized: boolean, error?: 'whitelist_rejected'|'ip_restricted', user?: object}>}
 */
export async function verifyUserAndIP(email, clientIp) {
  const provider = 'supabase';
  const spreadsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

  // 1. Validar existencia en Whitelist (Lista blanca) de usuarios
  const authorizedUser = await getAuthorizedUserByEmail(email, provider, { spreadsheetId });
  
  if (!authorizedUser) {
    return {
      authorized: false,
      error: 'whitelist_rejected'
    };
  }

  // 2. Si es Mega-Admin, eludir cualquier otra restricción (Bypass de IP automático)
  const isMegaAdmin = MEGA_ADMINS.includes(email.toLowerCase().trim()) || authorizedUser.role === 'root';
  if (isMegaAdmin) {
    return {
      authorized: true,
      user: authorizedUser
    };
  }

  // 3. Evaluar el Firewall de IP (leído de Supabase system_settings con fallback a ENV)
  let enableIpRestriction = process.env.NEXT_PUBLIC_ENABLE_IP_RESTRICTION === 'true';
  try {
    const now = Date.now();
    if (cachedEnableIp === null || now - lastCacheTime > CACHE_TTL_MS) {
      const dbValue = await getSetting('enable_ip_restriction');
      if (dbValue !== null) {
        cachedEnableIp = dbValue === 'true';
      } else {
        cachedEnableIp = process.env.NEXT_PUBLIC_ENABLE_IP_RESTRICTION === 'true';
      }
      lastCacheTime = now;
    }
    enableIpRestriction = cachedEnableIp;
  } catch (error) {
    console.error('[Firewall IP Error]: Error consultando enable_ip_restriction de DB, usando fallback:', error);
  }

  if (enableIpRestriction) {
    const ipsList = await getWhitelistIps(provider, { spreadsheetId });
    
    // Normalizar IP de cliente (ej: ::1 -> 127.0.0.1 en entornos locales)
    let normalizedClientIp = clientIp ? clientIp.trim() : '';
    if (normalizedClientIp === '::1' || normalizedClientIp === '::ffff:127.0.0.1') {
      normalizedClientIp = '127.0.0.1';
    }

    // Buscar coincidencia en la tabla de IPs
    const isIpWhitelisted = ipsList.some(item => {
      let registeredIp = item.ip_address ? item.ip_address.trim() : '';
      if (registeredIp === '::1' || registeredIp === '::ffff:127.0.0.1') {
        registeredIp = '127.0.0.1';
      }
      return registeredIp === normalizedClientIp;
    });

    if (!isIpWhitelisted) {
      console.warn(`[Firewall IP Alert]: Acceso denegado para el correo ${email} desde la IP no autorizada ${normalizedClientIp}`);
      return {
        authorized: false,
        error: 'ip_restricted'
      };
    }
  }

  return {
    authorized: true,
    user: authorizedUser
  };
}
