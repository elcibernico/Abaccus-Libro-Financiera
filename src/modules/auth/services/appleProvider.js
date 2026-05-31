// appleProvider.js - Integración OAuth con Apple
import { signInWithOAuthProvider } from '../controllers/oauthController';

export const appleProvider = {
  id: 'apple',
  name: 'Apple',
  color: '#000000',
  icon: 'Apple',
  disabled: true, // Deshabilitado temporalmente hasta pase a producción
  login: () => signInWithOAuthProvider('apple')
};
