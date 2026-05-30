// boxProvider.js - Integración OAuth con Box
import { getEnv } from '../../../core/config/env';

const CLIENT_ID = getEnv('OAUTH_BOX_CLIENT_ID');
const CLIENT_SECRET = getEnv('OAUTH_BOX_CLIENT_SECRET');
const REDIRECT_URI = getEnv('OAUTH_BOX_REDIRECT_URI');

export function getAuthorizationUrl() {
  const rootUrl = 'https://account.box.com/api/oauth2/authorize';
  const options = {
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state: 'box_state_nonce'
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export async function getUserByCode(code) {
  const tokenUrl = 'https://api.box.com/oauth2/token';
  const values = {
    grant_type: 'authorization_code',
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: REDIRECT_URI
  };

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(values).toString()
  });

  if (!response.ok) {
    throw new Error(`[Box OAuth Error]: Failed to exchange code. Status: ${response.status}`);
  }

  const { access_token } = await response.json();

  // Obtener perfil del usuario
  const profileResponse = await fetch('https://api.box.com/2.0/users/me', {
    headers: { 'Authorization': `Bearer ${access_token}` }
  });

  if (!profileResponse.ok) {
    throw new Error('[Box OAuth Error]: Failed to fetch user profile.');
  }

  const profileData = await profileResponse.json();
  return {
    email: profileData.login, // Box almacena el correo en el atributo 'login'
    name: profileData.name,
    picture: profileData.avatar_url || null,
    provider: 'box'
  };
}
