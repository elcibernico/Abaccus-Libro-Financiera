// env.js - Sanitización y carga segura de variables de entorno confidenciales en backend serverless

/**
 * Obtiene y sanitiza una variable de entorno.
 * @param {string} key Nombre de la variable de entorno
 * @param {string} defaultValue Valor por defecto si no existe
 * @returns {string}
 */
export function getEnv(key, defaultValue = '') {
  return process.env[key] ? process.env[key].trim() : defaultValue;
}

/**
 * Obtiene y parsea de forma segura strings de credenciales JSON complejos de Google.
 * Mitiga el error común de saltos de línea mal formateados (\n) en Vercel.
 * @param {string} key Nombre de la variable de entorno (ej. GOOGLE_CREDENTIALS_STRING)
 * @returns {object|null} Objeto JSON parseado o null si falla
 */
export function getGoogleCredentials(key = 'GOOGLE_CREDENTIALS_STRING') {
  const rawCredentials = getEnv(key);
  if (!rawCredentials) {
    console.warn(`[Env Warning]: La variable de entorno ${key} no está configurada.`);
    return null;
  }

  try {
    // [PRO VALIDATION]: Sanitización robusta anti-colapso de Vercel. 
    // Trata tanto saltos de línea físicos (\n) como literales escapados (\\n).
    let sanitized = rawCredentials.trim();
    
    // Si el string está rodeado por comillas extra (común al pegar en Vercel UI), las removemos
    if (sanitized.startsWith('"') && sanitized.endsWith('"')) {
      sanitized = sanitized.slice(1, -1);
    }
    
    // Convertir saltos físicos o escapes rotos en un literal \n válido para JSON
    sanitized = sanitized.replace(/\\n/g, '\\n').replace(/\n/g, '\\n');
    
    return JSON.parse(sanitized);
  } catch (error) {
    console.error(`[Env Error]: Falló al parsear las credenciales JSON de ${key}. Verifique el formato en Vercel.`);
    return null;
  }
}
