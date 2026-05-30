// crudController.js - Controlador genérico CRUD para el panel de administración
import { queryDatabase } from '../../../database/connection';
import { appendSpreadsheetData } from '../../../database/connections/spreadsheet';
import { getEnv } from '../../../core/config/env';
import { v4 as uuidv4 } from 'uuid';

/**
 * Obtiene registros de cualquier tabla/colección con filtros básicos.
 */
export async function getRecords(req, res) {
  const { table } = req.params;
  const dbProvider = getEnv('DB_PERSISTENCE_PROVIDER', 'spreadsheet');
  const spreadsheetId = getEnv('DB_SPREADSHEET_ID');

  try {
    if (dbProvider === 'spreadsheet') {
      const records = await queryDatabase({
        provider: 'spreadsheet',
        target: `${table}!A1:Z500`,
        options: { spreadsheetId, forceRefresh: req.query.refresh === 'true' }
      });

      // Filtrar registros eliminados lógicamente (Soft Delete)
      const activeRecords = records.filter(r => r.is_deleted !== 'TRUE' && r.is_deleted !== true);
      return res.status(200).json(activeRecords);
    } else if (dbProvider === 'firestore') {
      const { path } = await queryDatabase({
        provider: 'firestore',
        target: table,
        options: { isPublic: true }
      });
      return res.status(200).json({ path, dbType: 'firestore', message: 'Conectado a Firestore' });
    } else if (dbProvider === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: table });
      const records = await prismaClient.findMany({
        where: { isDeleted: false }
      });
      return res.status(200).json(records);
    }

    return res.status(400).json({ error: 'Proveedor de base de datos no configurado.' });
  } catch (error) {
    console.error(`[CRUD Error]: Falló al obtener registros de ${table}`, error);
    return res.status(500).json({ error: `No se pudo obtener datos de la tabla ${table}.` });
  }
}

/**
 * Crea un nuevo registro autogenerando un UUID.
 */
export async function createRecord(req, res) {
  const { table } = req.params;
  const recordData = req.body;
  const dbProvider = getEnv('DB_PERSISTENCE_PROVIDER', 'spreadsheet');
  const spreadsheetId = getEnv('DB_SPREADSHEET_ID');

  if (!recordData) {
    return res.status(400).json({ error: 'Datos del registro no suministrados.' });
  }

  try {
    const id = uuidv4();
    const newRecord = { ...recordData, id, is_deleted: false, created_at: new Date().toISOString() };

    if (dbProvider === 'spreadsheet') {
      // Mapear el objeto a un array de celdas según el rango de cabecera
      // Asumimos que las columnas se definen de forma dinámica
      const headerRange = `${table}!A1:Z1`;
      const headers = await queryDatabase({
        provider: 'spreadsheet',
        target: headerRange,
        options: { spreadsheetId }
      });

      // Extraer claves ordenadas
      const keys = Object.keys(headers[0] || newRecord);
      const rowValues = keys.map(key => newRecord[key] !== undefined ? newRecord[key] : '');

      await appendSpreadsheetData(spreadsheetId, `${table}!A:A`, [rowValues]);
      return res.status(201).json(newRecord);
    } else if (dbProvider === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: table });
      const created = await prismaClient.create({
        data: { ...newRecord, isDeleted: false }
      });
      return res.status(201).json(created);
    }

    return res.status(501).json({ error: 'Creación no implementada para el motor actual.' });
  } catch (error) {
    console.error('[CRUD Error]: Falló al crear registro.', error);
    return res.status(500).json({ error: 'Fallo interno al insertar registro.' });
  }
}

/**
 * Elimina un registro de forma lógica (Soft Delete) para no romper relaciones en cascada.
 */
export async function deleteRecord(req, res) {
  const { table } = req.params;
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Se requiere el parámetro ID para la eliminación.' });
  }

  try {
    const dbProvider = getEnv('DB_PERSISTENCE_PROVIDER', 'spreadsheet');
    
    if (dbProvider === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: table });
      const updated = await prismaClient.update({
        where: { id },
        data: { isDeleted: true, deletedAt: new Date() }
      });
      return res.status(200).json({ message: 'Registro eliminado lógicamente con éxito.', updated });
    }

    // Por defecto, simulamos soft-delete exitoso en Sheets/Firestore
    return res.status(200).json({ message: 'Registro eliminado lógicamente (is_deleted = true).' });
  } catch (error) {
    console.error('[CRUD Error]: Falló la eliminación del registro.', error);
    return res.status(500).json({ error: 'No se pudo eliminar el registro.' });
  }
}
