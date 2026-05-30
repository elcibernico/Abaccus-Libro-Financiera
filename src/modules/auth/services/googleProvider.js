// googleProvider.js - Integración OAuth con Google bajo cuenta unificada elcibernico@gmail.com
import { getEnv } from '../../../core/config/env';

const CLIENT_ID = getEnv('OAUTH_GOOGLE_CLIENT_ID');
const CLIENT_SECRET = getEnv('OAUTH_GOOGLE_CLIENT_SECRET');
const REDIRECT_URI = getEnv('OAUTH_GOOGLE_REDIRECT_URI');

/**
 * Obtiene la URL de redirección a Google OAuth.
 * @returns {string}
 */
export function getAuthorizationUrl() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: REDIRECT_URI,
    client_id: CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

/**
 * Intercambia el código de autorización por el perfil del usuario.
 * @param {string} code Código retornado por el callback de Google
 * @returns {Promise<object>} Perfil del usuario autenticado
 */
export async function getUserByCode(code) {
  const tokenUrl = 'https://oauth2.googleapis.com/token';
  const values = {
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code'
  };

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(values).toString()
  });

  if (!response.ok) {
    throw new Error(`[Google OAuth Error]: Failed to fetch access token. Status: ${response.status}`);
  }

  const { access_token } = await response.json();

  // Obtener perfil del usuario
  const userProfileUrl = `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${access_token}`;
  const profileResponse = await fetch(userProfileUrl);
  
  if (!profileResponse.ok) {
    throw new Error('[Google OAuth Error]: Failed to fetch user profile.');
  }

  const profileData = await profileResponse.json();
  return {
    email: profileData.email,
    name: profileData.name,
    picture: profileData.picture,
    provider: 'google'
  };
}
