// exportService.js - Exportaciones seguras de tablas administrativas en formatos tabulares puros (CSV, JSON)
import { getAuthorizedUserByEmail } from '../../../database/dimensions/users';
import { getEnv } from '../../../core/config/env';

/**
 * Genera y sirve un archivo CSV seguro con filtrado de permisos.
 * @param {Array<object>} records Lista de registros a exportar
 * @param {Array<string>} allowedFields Columnas autorizadas para el rol del usuario
 * @param {string} filename Nombre de archivo
 * @param {object} res Objeto de respuesta Express
 */
export function exportToCSV(records, allowedFields, filename, res) {
  if (!records || records.length === 0) {
    return res.status(400).json({ error: 'No hay registros para exportar.' });
  }

  try {
    // 1. Filtrar las columnas basadas en los permisos del usuario
    const headers = allowedFields && allowedFields.length > 0
      ? allowedFields
      : Object.keys(records[0]);

    // 2. Construir cabeceras CSV
    let csvContent = headers.join(',') + '\n';

    // 3. Serializar filas escapando comas y saltos de línea
    records.forEach(record => {
      const row = headers.map(header => {
        const val = record[header] !== undefined ? record[header] : '';
        const stringVal = typeof val === 'object' ? JSON.stringify(val) : String(val);
        // Escapar comillas dobles y encerrar en comillas si contiene comas
        const escaped = stringVal.replace(/"/g, '""');
        return escaped.includes(',') || escaped.includes('\n') || escaped.includes('"')
          ? `"${escaped}"`
          : escaped;
      });
      csvContent += row.join(',') + '\n';
    });

    // 4. Configurar cabeceras de descarga de Express
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'export'}.csv"`);
    return res.status(200).send(csvContent);
  } catch (error) {
    console.error('[Export Error]: Falló la generación de CSV.', error);
    return res.status(500).json({ error: 'Error interno al exportar los datos.' });
  }
}

/**
 * Genera y sirve un archivo JSON estructurado filtrado.
 */
export function exportToJSON(records, allowedFields, filename, res) {
  try {
    const filtered = records.map(record => {
      const item = {};
      const fields = allowedFields && allowedFields.length > 0 ? allowedFields : Object.keys(record);
      fields.forEach(field => {
        item[field] = record[field];
      });
      return item;
    });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'export'}.json"`);
    return res.status(200).json(filtered);
  } catch (error) {
    console.error('[Export Error]: Falló la generación de JSON.', error);
    return res.status(500).json({ error: 'Error interno al exportar JSON.' });
  }
}
