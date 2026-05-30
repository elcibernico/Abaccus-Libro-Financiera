// dropboxProvider.js - Integración OAuth con Dropbox
import { getEnv } from '../../../core/config/env';

const CLIENT_ID = getEnv('OAUTH_DROPBOX_CLIENT_ID');
const CLIENT_SECRET = getEnv('OAUTH_DROPBOX_CLIENT_SECRET');
const REDIRECT_URI = getEnv('OAUTH_DROPBOX_REDIRECT_URI');

export function getAuthorizationUrl() {
  const rootUrl = 'https://www.dropbox.com/oauth2/authorize';
  const options = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    state: 'dropbox_state_nonce'
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export async function getUserByCode(code) {
  const tokenUrl = 'https://api.dropboxapi.com/oauth2/token';
  const values = {
    code,
    grant_type: 'authorization_code',
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
    throw new Error(`[Dropbox OAuth Error]: Failed to exchange code. Status: ${response.status}`);
  }

  const { access_token } = await response.json();

  // Obtener cuenta del usuario
  const profileResponse = await fetch('https://api.dropboxapi.com/2/users/get_current_account', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!profileResponse.ok) {
    throw new Error('[Dropbox OAuth Error]: Failed to fetch user profile.');
  }

  const profileData = await profileResponse.json();
  return {
    email: profileData.email,
    name: profileData.name.display_name,
    picture: profileData.profile_photo_url || null,
    provider: 'dropbox'
  };
}
