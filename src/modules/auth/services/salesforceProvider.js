// salesforceProvider.js - Integración OAuth con Salesforce
import { signInWithOAuthProvider } from '../controllers/oauthController';

export const salesforceProvider = {
  id: 'salesforce',
  name: 'Salesforce',
  color: '#00A1E0',
  icon: 'Salesforce',
  login: () => signInWithOAuthProvider('salesforce')
};
