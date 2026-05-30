// smartsheetProvider.js - Integración OAuth con Smartsheet
import { getEnv } from '../../../core/config/env';
import crypto from 'crypto';

const CLIENT_ID = getEnv('OAUTH_SMARTSHEET_CLIENT_ID');
const CLIENT_SECRET = getEnv('OAUTH_SMARTSHEET_CLIENT_SECRET');
const REDIRECT_URI = getEnv('OAUTH_SMARTSHEET_REDIRECT_URI');

export function getAuthorizationUrl() {
  const rootUrl = 'https://app.smartsheet.com/b/authorize';
  const options = {
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'READ_USERS',
    state: 'smartsheet_state_nonce'
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export async function getUserByCode(code) {
  const tokenUrl = 'https://api.smartsheet.com/2.0/token';
  
  // Generar hash SHA-256 de client_secret para autenticación en Smartsheet OAuth
  const hash = crypto.createHash('sha256').update(`${CLIENT_SECRET}|${code}`).digest('hex');

  const values = {
    grant_type: 'authorization_code',
    client_id: CLIENT_ID,
    code,
    hash
  };

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(values).toString()
  });

  if (!response.ok) {
    throw new Error(`[Smartsheet OAuth Error]: Failed to exchange code. Status: ${response.status}`);
  }

  const { access_token } = await response.json();

  // Obtener perfil de usuario
  const profileResponse = await fetch('https://api.smartsheet.com/2.0/users/me', {
    headers: { 'Authorization': `Bearer ${access_token}` }
  });

  if (!profileResponse.ok) {
    throw new Error('[Smartsheet OAuth Error]: Failed to fetch user profile.');
  }

  const profileData = await profileResponse.json();
  return {
    email: profileData.email,
    name: `${profileData.firstName || ''} ${profileData.lastName || ''}`.trim() || profileData.email,
    picture: null,
    provider: 'smartsheet'
  };
}
