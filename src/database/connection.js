// connection.js - Orquestador y Selector Dinámico de Persistencia Global (Multiorigen)
// Permite desviar de forma transparente las consultas al motor seleccionado por el usuario.

import prisma from './connections/prisma';
import { getStrictCollectionPath } from './connections/firestore';
import { getSpreadsheetData } from './connections/spreadsheet';

/**
 * Orquestador Global para consultar registros según el motor de base de datos asignado.
 * @param {object} params Parámetros de consulta
 * @param {'firestore'|'prisma'|'spreadsheet'} params.provider Proveedor de persistencia
 * @param {string} params.target Identificador (Colección, Tabla Prisma, o Rango Sheets)
 * @param {object} params.options Opciones de filtrado, ID de Sheets, etc.
 */
export async function queryDatabase({ provider, target, options = {} }) {
  switch (provider) {
    case 'firestore':
      // Firestore: Retorna la ruta segura y el conector listo
      const isPublic = options.isPublic !== false;
      const path = getStrictCollectionPath(target, isPublic, options.userId);
      return { path, dbType: 'firestore' };

    case 'prisma':
      // Prisma (Cloud SQL / Supabase / PostgreSQL): Acceso al modelo dinámico
      if (typeof prisma[target] === 'undefined') {
        throw new Error(`[Database Error]: El modelo ${target} no existe en el cliente Prisma.`);
      }
      return prisma[target];

    case 'spreadsheet':
      // Google Sheets / Excel de Drive
      if (!options.spreadsheetId) {
        throw new Error('[Database Error]: Se requiere spreadsheetId para consultas Spreadsheet.');
      }
      return await getSpreadsheetData(options.spreadsheetId, target, options.forceRefresh);

    default:
      throw new Error(`[Database Error]: Proveedor de persistencia "${provider}" no soportado.`);
  }
}
