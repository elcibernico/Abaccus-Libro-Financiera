// googleProvider.js - Integración OAuth con Google
import { signInWithOAuthProvider } from '../controllers/oauthController';

export const googleProvider = {
  id: 'google',
  name: 'Google',
  color: '#DB4437',
  icon: 'Google',
  login: () => signInWithOAuthProvider('google')
};
