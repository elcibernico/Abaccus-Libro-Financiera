// authGuard.js - Interceptor de peticiones para rutas protegidas y validación ACL
import { verifyToken } from '../../../core/security/jwt';

/**
 * Middleware base para validar que el usuario esté autenticado mediante un JWT válido.
 * Inyecta el perfil decodificado en `req.user`.
 */
export function requireAuth(req, res, next) {
  // Obtener token desde la cabecera Authorization o desde las Cookies
  let token = null;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7);
  } else if (req.cookies && req.cookies.session_token) {
    token = req.cookies.session_token;
  }

  if (!token) {
    return res.status(401).json({ error: '[Auth Access Denied]: Sesión no iniciada o token no provisto.' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ error: '[Auth Access Denied]: Token inválido, expirado o adulterado.' });
  }

  // Inyectar usuario en la petición
  req.user = decoded;
  
  if (next) {
    return next();
  }
}

/**
 * Creador de middlewares dinámicos para validar permisos específicos (ACL).
 * @param {string} permissionName Nombre del permiso requerido (ej. 'may_export_pdf')
 */
export function requirePermission(permissionName) {
  return (req, res, next) => {
    // Primero asegurar autenticación
    requireAuth(req, res, () => {
      const user = req.user;
      
      // Los Administradores saltan las restricciones individuales
      if (user.role === 'admin') {
        return next();
      }

      // Validar si el permiso existe y está en true
      if (user.permissions && user.permissions[permissionName] === true) {
        return next();
      }

      return res.status(403).json({
        error: `[Auth Forbidden]: No cuenta con el permiso requerido (${permissionName}) para realizar esta acción.`
      });
    });
  };
}

/**
 * Middleware para asegurar que el usuario tenga el rol de Administrador.
 */
export function requireAdmin(req, res, next) {
  requireAuth(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      return next();
    }
    return res.status(403).json({ error: '[Auth Forbidden]: Acceso restringido únicamente a Administradores.' });
  });
}
