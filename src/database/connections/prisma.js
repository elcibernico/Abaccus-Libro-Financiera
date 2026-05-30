// prisma.js - Inicialización del cliente Prisma ORM con patrón Singleton para entornos Serverless (Vercel)
// Mitiga la falla de OperationalError de base de datos por agotamiento de sockets de conexión (Fuga de Conexiones).

import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    log: ['error'],
  });
} else {
  // En desarrollo, adjuntar el cliente al objeto global de node para evitar recargar múltiples instancias
  // debido al Hot Module Replacement (HMR) de Next.js
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    });
  }
  prisma = global.prisma;
}

export default prisma;
