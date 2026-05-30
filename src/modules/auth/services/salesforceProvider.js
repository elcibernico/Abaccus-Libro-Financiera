// salesforceProvider.js - Integración OAuth con Salesforce
import { getEnv } from '../../../core/config/env';

const CLIENT_ID = getEnv('OAUTH_SALESFORCE_CLIENT_ID');
const CLIENT_SECRET = getEnv('OAUTH_SALESFORCE_CLIENT_SECRET');
const REDIRECT_URI = getEnv('OAUTH_SALESFORCE_REDIRECT_URI');
const INSTANCE_URL = getEnv('OAUTH_SALESFORCE_INSTANCE_URL', 'https://login.salesforce.com'); // login por defecto, test para sandboxes

export function getAuthorizationUrl() {
  const rootUrl = `${INSTANCE_URL}/services/oauth2/authorize`;
  const options = {
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state: 'salesforce_state_nonce'
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export async function getUserByCode(code) {
  const tokenUrl = `${INSTANCE_URL}/services/oauth2/token`;
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
    throw new Error(`[Salesforce OAuth Error]: Failed to exchange code. Status: ${response.status}`);
  }

  const tokenData = await response.json();
  const access_token = tokenData.access_token;
  const userProfileUrl = tokenData.id; // Salesforce retorna la URL del endpoint de datos del usuario en la prop 'id'

  // Obtener perfil del usuario
  const profileResponse = await fetch(userProfileUrl, {
    headers: { 'Authorization': `Bearer ${access_token}` }
  });

  if (!profileResponse.ok) {
    throw new Error('[Salesforce OAuth Error]: Failed to fetch user profile.');
  }

  const profileData = await profileResponse.json();
  return {
    email: profileData.email,
    name: profileData.display_name,
    picture: profileData.photos ? profileData.photos.picture : null,
    provider: 'salesforce'
  };
}
