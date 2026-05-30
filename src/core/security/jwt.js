// jwt.js - Firmado y verificación de Tokens JWT para autenticación
import jwt from 'jsonwebtoken';
import { getEnv } from '../config/env';

const JWT_SECRET = getEnv('JWT_SECRET', 'libro_financiera_super_secret_key_123');
const JWT_EXPIRES_IN = getEnv('JWT_EXPIRES_IN', '8h');

/**
 * Firma un token JWT con la información de sesión y permisos del usuario.
 * @param {object} payload Datos a incluir en el token
 * @returns {string} Token firmado
 */
export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifica y decodifica un token JWT.
 * @param {string} token Token a verificar
 * @returns {object|null} Payload decodificado o null si es inválido/expirado
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    console.error('[JWT Error]: Falló la verificación del token.', error.message);
    return null;
  }
}
