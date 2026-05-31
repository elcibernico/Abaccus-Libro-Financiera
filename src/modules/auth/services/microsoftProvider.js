// microsoftProvider.js - Integración OAuth con Microsoft (Azure AD)
import { signInWithOAuthProvider } from '../controllers/oauthController';

export const microsoftProvider = {
  id: 'azure',
  name: 'Microsoft',
  color: '#00A4EF',
  icon: 'Microsoft',
  login: () => signInWithOAuthProvider('azure')
};
