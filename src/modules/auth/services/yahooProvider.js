// yahooProvider.js - Integración OAuth/OIDC con Yahoo
import { signInWithOAuthProvider } from '../controllers/oauthController';

export const yahooProvider = {
  id: 'yahoo',
  name: 'Yahoo',
  color: '#6001d2',
  icon: 'Yahoo',
  login: () => signInWithOAuthProvider('yahoo')
};
