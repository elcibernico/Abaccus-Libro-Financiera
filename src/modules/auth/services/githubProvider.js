// githubProvider.js - Integración OAuth con GitHub
import { signInWithOAuthProvider } from '../controllers/oauthController';

export const githubProvider = {
  id: 'github',
  name: 'GitHub',
  color: '#24292e',
  icon: 'GitHub',
  login: () => signInWithOAuthProvider('github')
};
