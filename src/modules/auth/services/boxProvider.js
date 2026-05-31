// boxProvider.js - Integración OAuth con Box
import { signInWithOAuthProvider } from '../controllers/oauthController';

export const boxProvider = {
  id: 'box',
  name: 'Box',
  color: '#0061D5',
  icon: 'Box',
  login: () => signInWithOAuthProvider('box')
};
