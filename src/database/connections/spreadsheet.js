// spreadsheet.js - Conector optimizado para Google Sheets / Excel API (Drive)
// Implementa seguridad de backend serverless, caché en memoria anti-límites de cuotas y mapeo estricto de filas a JSON con UUID.

import { google } from 'googleapis';
import { getGoogleCredentials } from '../../core/config/env';
import { v4 as uuidv4 } from 'uuid';

let sheetsClient = null;
const CACHE = new Map();
const CACHE_TTL_MS = 60 * 1000; // 1 minuto de caché por defecto para dimensiones

/**
 * Inicializa el cliente oficial de Google Sheets API de forma segura.
 */
function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  const credentials = getGoogleCredentials();
  if (!credentials) {
    throw new Error('[Spreadsheet Connection Error]: Credenciales de Google Cloud no válidas o ausentes.');
  }

  const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );

  sheetsClient = google.sheets({ version: 'v4', auth });
  return sheetsClient;
}

/**
 * Obtiene y mapea filas de Google Sheets a objetos JSON interactivos, implementando caché temporal.
 * @param {string} spreadsheetId ID de la hoja de cálculo en Drive
 * @param {string} range Rango de la hoja (ej. "Productos!A1:Z100")
 * @param {boolean} forceRefresh Ignorar la caché y consultar la API directamente
 */
export async function getSpreadsheetData(spreadsheetId, range, forceRefresh = false) {
  const cacheKey = `${spreadsheetId}_${range}`;
  const cached = CACHE.get(cacheKey);

  // Validar expiración de caché
  if (!forceRefresh && cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
    return cached.data;
  }

  const sheets = getSheetsClient();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const rows = response.data.values;
  if (!rows || rows.length === 0) return [];

  // Fila 1 son las cabeceras en formato snake_case o camelCase
  const headers = rows[0].map(header => header.trim());
  const jsonData = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const item = {};
    
    headers.forEach((header, index) => {
      item[header] = row[index] !== undefined ? row[index] : '';
    });

    // Validar y forzar columna identificadora unívoca 'id'
    if (!item.id) {
      item.id = uuidv4();
    }

    jsonData.push(item);
  }

  // Guardar en caché temporal
  CACHE.set(cacheKey, {
    timestamp: Date.now(),
    data: jsonData
  });

  return jsonData;
}

/**
 * [PRO VALIDATION]: Sistema de Cola/Mutex simple para prevenir colisiones 
 * y errores 429 (Quota Exceeded) durante escrituras concurrentes en Serverless.
 */
let isWriting = false;
const writeQueue = [];

async function processWriteQueue() {
  if (isWriting || writeQueue.length === 0) return;
  isWriting = true;
  
  const { spreadsheetId, range, values, resolve, reject } = writeQueue.shift();
  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values }
    });
    
    // Invalidate Cache for this spreadsheet/range after a successful write
    CACHE.delete(`${spreadsheetId}_${range}`);
    resolve(response.data);
  } catch (error) {
    reject(error);
  } finally {
    isWriting = false;
    // Delay to respect API limits (1 sec) before processing next write
    setTimeout(processWriteQueue, 1000); 
  }
}

/**
 * Agrega datos a la hoja de cálculo de forma segura utilizando la cola de escritura.
 * @param {string} spreadsheetId ID de la hoja
 * @param {string} range Rango de la hoja
 * @param {Array<Array<any>>} values Matriz de filas y columnas a insertar
 */
export function appendSpreadsheetData(spreadsheetId, range, values) {
  return new Promise((resolve, reject) => {
    writeQueue.push({ spreadsheetId, range, values, resolve, reject });
    processWriteQueue();
  });
}

/**
 * Actualiza una fila específica de la hoja de cálculo.
 * @param {string} spreadsheetId ID de la hoja
 * @param {string} range Rango exacto de la fila (ej. "Usuarios!A2:E2")
 * @param {Array<any>} values Array con los valores de la fila
 */
export async function updateSpreadsheetRow(spreadsheetId, range, values) {
  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [values] }
    });
    
    // Invalidar caché
    const sheetName = range.split('!')[0];
    for (const key of CACHE.keys()) {
      if (key.startsWith(`${spreadsheetId}_${sheetName}`)) {
        CACHE.delete(key);
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('[Spreadsheet Update Error]:', error);
    throw error;
  }
}

