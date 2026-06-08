// connection.js - Orquestador y Selector Dinámico de Persistencia Global (Multiorigen)
// Permite desviar de forma transparente las consultas al motor seleccionado por el usuario.

/**
 * Orquestador Global para consultar registros según el motor de base de datos asignado.
 * @param {object} params Parámetros de consulta
 * @param {'firestore'|'prisma'|'spreadsheet'} params.provider Proveedor de persistencia
 * @param {string} params.target Identificador (Colección, Tabla Prisma, o Rango Sheets)
 * @param {object} params.options Opciones de filtrado, ID de Sheets, etc.
 */
export async function queryDatabase({ provider, target, options = {} }) {
  switch (provider) {
    case 'firestore': {
      // Firestore: Retorna la ruta segura y el conector listo
      const { getStrictCollectionPath } = await import('./connections/firestore');
      const isPublic = options.isPublic !== false;
      const path = getStrictCollectionPath(target, isPublic, options.userId);
      return { path, dbType: 'firestore' };
    }

    case 'prisma': {
      // Prisma (Cloud SQL / Supabase / PostgreSQL): Acceso al modelo dinámico
      const { getPrismaClient } = await import('./connections/prisma');
      const client = await getPrismaClient();
      if (typeof client[target] === 'undefined') {
        throw new Error(`[Database Error]: El modelo ${target} no existe en el cliente Prisma.`);
      }
      return client[target];
    }

    case 'spreadsheet': {
      // Google Sheets / Excel de Drive
      const { getSpreadsheetData } = await import('./connections/spreadsheet');
      if (!options.spreadsheetId) {
        throw new Error('[Database Error]: Se requiere spreadsheetId para consultas Spreadsheet.');
      }
      return await getSpreadsheetData(options.spreadsheetId, target, options.forceRefresh);
    }

    case 'supabase': {
      // Cliente Supabase Server
      const { createClient, createAdminClient } = await import('@/core/security/supabaseServer');
      if (options.useAdmin) {
        const adminClient = await createAdminClient();
        if (adminClient) return adminClient;
      }
      return await createClient();
    }

    default:
      throw new Error(`[Database Error]: Proveedor de persistencia "${provider}" no soportado.`);
  }
}
