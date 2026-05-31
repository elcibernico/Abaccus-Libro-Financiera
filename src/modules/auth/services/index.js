// index.js - Exportador ordenado de proveedores de autenticación (Orden oficial de la UI)
import { googleProvider } from './googleProvider';
import { microsoftProvider } from './microsoftProvider';
import { appleProvider } from './appleProvider';
import { yahooProvider } from './yahooProvider';
import { dropboxProvider } from './dropboxProvider';
import { smartsheetProvider } from './smartsheetProvider';
import { boxProvider } from './boxProvider';
import { githubProvider } from './githubProvider';
import { salesforceProvider } from './salesforceProvider';

export const oauthProviders = [
  googleProvider,
  microsoftProvider,
  appleProvider,
  yahooProvider,
  dropboxProvider,
  smartsheetProvider,
  boxProvider,
  githubProvider,
  salesforceProvider
];
