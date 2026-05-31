// smartsheetProvider.js - Integración OAuth con Smartsheet
import { signInWithOAuthProvider } from '../controllers/oauthController';

export const smartsheetProvider = {
  id: 'smartsheet',
  name: 'Smartsheet',
  color: '#2461D1',
  icon: 'Smartsheet',
  login: () => signInWithOAuthProvider('smartsheet')
};
