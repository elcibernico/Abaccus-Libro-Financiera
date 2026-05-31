// prisma.js - Inicialización del cliente Prisma ORM con patrón Singleton dinámico para evitar fallos de compilación si no está generado
let prisma = null;

export async function getPrismaClient() {
  if (prisma) return prisma;
  
  try {
    const { PrismaClient } = await import('@prisma/client');
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
  } catch (error) {
    console.warn('[Prisma Warning]: No se pudo cargar @prisma/client, usando proxy mock:', error.message);
    // Retornamos un proxy que falla solo cuando intentamos invocar consultas
    prisma = new Proxy({}, {
      get(target, prop) {
        return () => {
          throw new Error(`[Database Prisma Error]: No se puede acceder a "${String(prop)}" porque @prisma/client no está configurado o no se ha ejecutado 'prisma generate'.`);
        };
      }
    });
  }
  
  return prisma;
}

export default prisma;
