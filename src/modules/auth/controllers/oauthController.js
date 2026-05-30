// oauthController.js - Manejador de callbacks y redirecciones OAuth
import * as googleProvider from '../services/googleProvider';
import * as githubProvider from '../services/githubProvider';
import * as microsoftProvider from '../services/microsoftProvider';
import * as appleProvider from '../services/appleProvider';
import * as dropboxProvider from '../services/dropboxProvider';
import * as smartsheetProvider from '../services/smartsheetProvider';
import * as boxProvider from '../services/boxProvider';
import * as salesforceProvider from '../services/salesforceProvider';

import { getAuthorizedUserByEmail } from '../../../database/dimensions/users';
import { signToken } from '../../../core/security/jwt';
import { getEnv } from '../../../core/config/env';

const providers = {
  google: googleProvider,
  github: githubProvider,
  microsoft: microsoftProvider,
  apple: appleProvider,
  dropbox: dropboxProvider,
  smartsheet: smartsheetProvider,
  box: boxProvider,
  salesforce: salesforceProvider
};

/**
 * Redirige al cliente a la URL de autorización del proveedor seleccionado.
 */
export function handleLoginRedirect(req, res) {
  const { provider } = req.query;

  if (!provider || !providers[provider]) {
    return res.status(400).json({ error: `[Auth Error]: Proveedor "${provider}" no válido o no soportado.` });
  }

  try {
    const authUrl = providers[provider].getAuthorizationUrl();
    return res.redirect(authUrl);
  } catch (error) {
    console.error(`[Auth Error]: Error al generar URL de login para ${provider}`, error);
    return res.status(500).json({ error: 'Error interno al redirigir al proveedor OAuth.' });
  }
}

/**
 * Procesa el callback retornado por el proveedor OAuth.
 * Intercambia el código por tokens y perfil de usuario, verifica contra la whitelist,
 * e inicia sesión emitiendo un JWT.
 */
export async function handleCallback(req, res) {
  const { provider } = req.query;
  const { code, id_token } = req.body || req.query; // Para soportar GET y POST (como Apple)

  if (!provider || !providers[provider]) {
    return res.status(400).json({ error: `[Auth Error]: Proveedor "${provider}" no válido o no soportado.` });
  }

  if (!code && !id_token) {
    return res.status(400).json({ error: '[Auth Error]: Código de autorización o token ausente.' });
  }

  try {
    // 1. Intercambiar código por perfil de usuario
    const providerService = providers[provider];
    const userProfile = await providerService.getUserByCode(code, id_token);

    if (!userProfile || !userProfile.email) {
      return res.status(400).json({ error: '[Auth Error]: No se pudo resolver el email del perfil OAuth.' });
    }

    // 2. Verificar si el correo existe en la tabla de dimensión de usuarios autorizados
    // Nota: El proveedor de persistencia activo y spreadsheetId se leen del backend
    const dbProvider = getEnv('DB_PERSISTENCE_PROVIDER', 'spreadsheet');
    const spreadsheetId = getEnv('DB_SPREADSHEET_ID');

    const authorizedUser = await getAuthorizedUserByEmail(userProfile.email, dbProvider, { spreadsheetId });

    // 3. Evaluar permisos y comportamiento
    if (authorizedUser.role === 'guest') {
      // El usuario no está en la lista blanca de autorizados, o es un invitado restrictivo
      // Podemos denegar el acceso inmediatamente, o clasificarlo como Guest.
      const denyGuests = getEnv('AUTH_DENY_UNAUTHORIZED_GUESTS', 'false') === 'true';
      if (denyGuests) {
        return res.status(403).json({
          error: '[Auth Access Denied]: Su dirección de correo electrónico no está en la lista de accesos autorizados.'
        });
      }
    }

    // 4. Inyectar mapa de permisos en el JWT
    const tokenPayload = {
      id: authorizedUser.id || userProfile.email,
      email: authorizedUser.email,
      name: authorizedUser.name || userProfile.name,
      picture: userProfile.picture,
      role: authorizedUser.role,
      permissions: authorizedUser.permissions, // Permisos RBAC/ACL dinámicos
      provider: userProfile.provider
    };

    const token = signToken(tokenPayload);

    // 5. Emitir el token de sesión (guardar en Cookie httpOnly o responder en JSON)
    const secureCookie = process.env.NODE_ENV === 'production';
    res.setHeader('Set-Cookie', `session_token=${token}; HttpOnly; Secure=${secureCookie}; SameSite=Lax; Path=/; Max-Age=28800`); // 8 horas

    // Redirigir de regreso al frontend con estado de éxito o token
    const frontendUrl = getEnv('FRONTEND_URL', 'http://localhost:3000');
    return res.redirect(`${frontendUrl}/auth/success?token=${token}`);
  } catch (error) {
    console.error(`[Auth Callback Error]: Error al procesar callback para ${provider}`, error);
    return res.status(500).json({ error: `Fallo al procesar autenticación con ${provider}.` });
  }
}
