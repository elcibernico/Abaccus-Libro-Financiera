// secretsMetadata.js - Metadatos de expiración de secretos de clientes OAuth
export const secretsMetadata = [
  {
    providerName: 'Microsoft Entra ID',
    expirationDate: '2028-05-31', // Expira en 2 años
    rotationGuideRef: 'Ver sección 6 de directivas/arquitectura/03-auth-permisos.md',
    clientId: process.env.AZURE_CLIENT_ID || 'Configurado en Azure Portal'
  },
  {
    providerName: 'Yahoo OAuth',
    expirationDate: '2026-06-05', // Expira en 5 días (menor o igual a 7 días desde hoy 2026-05-31, para testing)
    rotationGuideRef: 'Ver sección 7 de directivas/arquitectura/03-auth-permisos.md',
    clientId: 'dj0yJmk5b1VQWUM3R2pSRGRPJmQ9WVdrOWVnVWnRTSHB1U204bWNHbzlNMTk5Y29uc3ZXZzZWNnYzXQmc3Y9MCZ4PWI1'
  }
];
