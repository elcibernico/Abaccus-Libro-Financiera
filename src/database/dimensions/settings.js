// settings.js - Dimensión de configuraciones globales del sistema (system_settings)
import { queryDatabase } from '../connection';

// Forzar el proveedor a Supabase según la directiva para evitar fallbacks incorrectos
const DB_PROVIDER = 'supabase';

/**
 * Obtiene el valor de una configuración del sistema por su clave.
 * @param {string} key Clave de la configuración
 * @returns {Promise<string|null>} Valor de la configuración o null si no se encuentra
 */
export async function getSetting(key) {
  try {
    const supabase = await queryDatabase({ provider: DB_PROVIDER, options: { useAdmin: true } });
    const { data, error } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', key)
      .maybeSingle();

    if (error) {
      console.warn(`[DB Settings Warning]: No se pudo obtener la clave "${key}" de Supabase.`, error.message);
      return null;
    }

    return data ? data.value : null;
  } catch (error) {
    console.error(`[DB Settings Error]: Excepción al obtener clave "${key}":`, error);
    return null;
  }
}

/**
 * Actualiza o crea (upsert) una configuración del sistema.
 * @param {string} key Clave de la configuración
 * @param {string} value Valor de la configuración (siempre se guarda como texto)
 * @returns {Promise<{success: boolean, data?: any, error?: any}>} Resultado de la operación
 */
export async function updateSetting(key, value) {
  try {
    const supabase = await queryDatabase({ provider: DB_PROVIDER, options: { useAdmin: true } });
    const { data, error } = await supabase
      .from('system_settings')
      .upsert(
        {
          key,
          value: String(value),
          updated_at: new Date().toISOString()
        },
        { onConflict: 'key' }
      )
      .select();

    if (error) {
      console.error(`[DB Settings Error]: Error al realizar upsert para clave "${key}":`, error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error(`[DB Settings Error]: Excepción al actualizar clave "${key}":`, error);
    return { success: false, error: error.message || error };
  }
}
