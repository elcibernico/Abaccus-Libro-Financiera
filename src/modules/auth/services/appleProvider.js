// appleProvider.js - Integración OAuth con Apple (Sign In with Apple)
import { getEnv } from '../../../core/config/env';
import jwt from 'jsonwebtoken'; // Asume dependencias de JWT en el proyecto

const CLIENT_ID = getEnv('OAUTH_APPLE_CLIENT_ID');
const TEAM_ID = getEnv('OAUTH_APPLE_TEAM_ID');
const KEY_ID = getEnv('OAUTH_APPLE_KEY_ID');
const PRIVATE_KEY = getEnv('OAUTH_APPLE_PRIVATE_KEY'); // Llave privada del desarrollador (.p8)
const REDIRECT_URI = getEnv('OAUTH_APPLE_REDIRECT_URI');

/**
 * Genera el client_secret firmado requerido por Apple OAuth.
 * Requiere la librería jsonwebtoken.
 */
function generateClientSecret() {
  const timeNow = Math.floor(Date.now() / 1000);
  const claims = {
    iss: TEAM_ID,
    iat: timeNow,
    exp: timeNow + 86400 * 30, // 30 días de validez
    aud: 'https://appleid.apple.com',
    sub: CLIENT_ID
  };

  return jwt.sign(claims, PRIVATE_KEY.replace(/\\n/g, '\n'), {
    algorithm: 'ES256',
    keyid: KEY_ID
  });
}

export function getAuthorizationUrl() {
  const rootUrl = 'https://appleid.apple.com/auth/authorize';
  const options = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code id_token',
    response_mode: 'form_post', // Apple requiere form_post para scopes adicionales
    scope: 'name email',
    state: 'apple_state_nonce'
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export async function getUserByCode(code, idTokenFromFormPost = null) {
  // Si tenemos el id_token directo del form_post (método preferido de Apple), lo decodificamos directamente
  if (idTokenFromFormPost) {
    const decoded = jwt.decode(idTokenFromFormPost);
    return {
      email: decoded.email,
      name: decoded.email ? decoded.email.split('@')[0] : 'Apple User',
      picture: null,
      provider: 'apple'
    };
  }

  // Si no, hacemos el intercambio de code clásico
  const tokenUrl = 'https://appleid.apple.com/auth/token';
  const clientSecret = generateClientSecret();

  const values = {
    grant_type: 'authorization_code',
    code,
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    client_secret: clientSecret
  };

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(values).toString()
  });

  if (!response.ok) {
    throw new Error(`[Apple OAuth Error]: Failed to exchange code. Status: ${response.status}`);
  }

  const data = await response.json();
  const decoded = jwt.decode(data.id_token);

  return {
    email: decoded.email,
    name: decoded.email ? decoded.email.split('@')[0] : 'Apple User',
    picture: null,
    provider: 'apple'
  };
}
