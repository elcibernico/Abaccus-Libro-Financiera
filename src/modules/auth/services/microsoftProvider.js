// microsoftProvider.js - Integración OAuth con Microsoft (Azure AD / Entra ID)
import { getEnv } from '../../../core/config/env';

const CLIENT_ID = getEnv('OAUTH_MICROSOFT_CLIENT_ID');
const CLIENT_SECRET = getEnv('OAUTH_MICROSOFT_CLIENT_SECRET');
const REDIRECT_URI = getEnv('OAUTH_MICROSOFT_REDIRECT_URI');
const TENANT_ID = getEnv('OAUTH_MICROSOFT_TENANT_ID', 'common'); // common por defecto para multi-tenant

export function getAuthorizationUrl() {
  const rootUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`;
  const options = {
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    response_mode: 'query',
    scope: 'openid email profile User.Read',
    state: 'microsoft_state_nonce'
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export async function getUserByCode(code) {
  const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
  const values = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
    redirect_uri: REDIRECT_URI,
    grant_type: 'authorization_code'
  };

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(values).toString()
  });

  if (!response.ok) {
    throw new Error(`[Microsoft OAuth Error]: Failed to exchange code. Status: ${response.status}`);
  }

  const { access_token } = await response.json();

  // Obtener perfil mediante Microsoft Graph API
  const profileResponse = await fetch('https://graph.microsoft.com/v1.0/me', {
    headers: { 'Authorization': `Bearer ${access_token}` }
  });

  if (!profileResponse.ok) {
    throw new Error('[Microsoft OAuth Error]: Failed to fetch user profile.');
  }

  const profileData = await profileResponse.json();
  return {
    email: profileData.mail || profileData.userPrincipalName,
    name: profileData.displayName,
    picture: null, // Microsoft Graph requiere llamadas extras para fotos
    provider: 'microsoft'
  };
}
