// githubProvider.js - Integración OAuth con GitHub
import { getEnv } from '../../../core/config/env';

const CLIENT_ID = getEnv('OAUTH_GITHUB_CLIENT_ID');
const CLIENT_SECRET = getEnv('OAUTH_GITHUB_CLIENT_SECRET');
const REDIRECT_URI = getEnv('OAUTH_GITHUB_REDIRECT_URI');

export function getAuthorizationUrl() {
  const rootUrl = 'https://github.com/login/oauth/authorize';
  const options = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: 'user:email read:user',
    state: 'github_state_nonce'
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

export async function getUserByCode(code) {
  const tokenUrl = 'https://github.com/login/oauth/access_token';
  const values = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
    redirect_uri: REDIRECT_URI
  };

  const response = await fetch(tokenUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(values)
  });

  if (!response.ok) {
    throw new Error(`[GitHub OAuth Error]: Failed to exchange code. Status: ${response.status}`);
  }

  const { access_token } = await response.json();

  // Obtener perfil del usuario
  const profileResponse = await fetch('https://api.github.com/user', {
    headers: { 'Authorization': `Bearer ${access_token}` }
  });

  if (!profileResponse.ok) {
    throw new Error('[GitHub OAuth Error]: Failed to fetch user profile.');
  }

  const profileData = await profileResponse.json();

  // Obtener email del usuario (GitHub puede tener emails privados en el perfil principal)
  let email = profileData.email;
  if (!email) {
    const emailsResponse = await fetch('https://api.github.com/user/emails', {
      headers: { 'Authorization': `Bearer ${access_token}` }
    });
    if (emailsResponse.ok) {
      const emailsList = await emailsResponse.json();
      const primaryEmailObj = emailsList.find(e => e.primary && e.verified);
      email = primaryEmailObj ? primaryEmailObj.email : (emailsList[0] ? emailsList[0].email : null);
    }
  }

  return {
    email: email || `${profileData.login}@github.com`,
    name: profileData.name || profileData.login,
    picture: profileData.avatar_url,
    provider: 'github'
  };
}
