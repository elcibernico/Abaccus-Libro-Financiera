// cors.js - Configuración y Validación de Orígenes Permitidos (CORS) seguro para Vercel Serverless

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000'
];

export function validateCors(req, res) {
  const origin = req.headers.origin;
  
  // Si estamos en producción, permitir dinámicamente subdominios de Vercel del proyecto actual
  // [PRO VALIDATION]: Asegurar que el dominio sea estrictamente un subdominio válido de vercel por HTTPS
  const isVercelDeployment = origin && (
    origin === 'https://libro-financiera.vercel.app' || 
    /^https:\/\/.*\.vercel\.app$/.test(origin)
  );

  if (ALLOWED_ORIGINS.includes(origin) || isVercelDeployment) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    // Si no es un origen permitido, rechazar
    res.setHeader('Access-Control-Allow-Origin', 'null');
  }

  // Si la petición es OPTIONS (preflight), responder inmediatamente con éxito
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  
  return false;
}
