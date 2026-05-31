// dropboxProvider.js - Integración OAuth con Dropbox
import { signInWithOAuthProvider } from '../controllers/oauthController';

export const dropboxProvider = {
  id: 'dropbox',
  name: 'Dropbox',
  color: '#0061FE',
  icon: 'Dropbox',
  login: () => signInWithOAuthProvider('dropbox')
};
