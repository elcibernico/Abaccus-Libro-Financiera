// securityService.js - Reglas unificadas de seguridad, Whitelist de usuarios y Firewall de IPs
import { getAuthorizedUserByEmail, MEGA_ADMINS } from '@/database/dimensions/users';
import { getWhitelistIps } from '@/database/dimensions/whitelistIps';

/**
 * Valida de forma transversal si un usuario y su IP de origen tienen permitido el ingreso.
 * @param {string} email Correo a validar
 * @param {string} clientIp IP de origen del cliente
 * @returns {Promise<{authorized: boolean, error?: 'whitelist_rejected'|'ip_restricted', user?: object}>}
 */
export async function verifyUserAndIP(email, clientIp) {
  const provider = process.env.NEXT_PUBLIC_DATABASE_PROVIDER || 'supabase';
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

  // 3. Evaluar el Firewall de IP
  const enableIpRestriction = process.env.NEXT_PUBLIC_ENABLE_IP_RESTRICTION === 'true';
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
