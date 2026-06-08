// whitelistIps.js - Dimensión de control de IPs autorizadas (Whitelist IP)
import { queryDatabase } from '../connection';
import { appendSpreadsheetData } from '../connections/spreadsheet';

let localIpsCache = [];

/**
 * Obtiene la lista de IPs autorizadas de la base de datos.
 */
export async function getWhitelistIps(provider, options = {}) {
  try {
    if (provider === 'spreadsheet') {
      try {
        const ips = await queryDatabase({
          provider: 'spreadsheet',
          target: 'WhitelistIP!A1:D100',
          options: {
            spreadsheetId: options.spreadsheetId,
            forceRefresh: options.forceRefresh || false
          }
        });
        if (ips && ips.length > 0) {
          localIpsCache = ips;
          return ips;
        }
      } catch (e) {
        console.warn('[DB WhitelistIP Warning]: No se pudo leer la hoja WhitelistIP. Usando caché local/vacío.');
      }
    } else if (provider === 'firestore') {
      const { path } = await queryDatabase({
        provider: 'firestore',
        target: 'whitelist_ips',
        options: { isPublic: false }
      });
      return { path, dbType: 'firestore' };
    } else if (provider === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'whitelistIP' });
      return await prismaClient.findMany();
    } else if (provider === 'supabase') {
      const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
      const { data: ips, error } = await supabase
        .from('whitelist_ips')
        .select('*');
      if (error) {
        console.error('[DB WhitelistIP Error]:', error);
        return localIpsCache;
      }
      localIpsCache = ips || [];
      return localIpsCache;
    }
  } catch (error) {
    console.error('[DB Dimensions Error]: Error al obtener lista de IPs.', error);
  }

  return localIpsCache;
}

/**
 * Registra una nueva IP en la base de datos de forma dinámica.
 */
export async function addWhitelistIp(ipAddress, description, createdBy, provider, options = {}) {
  try {
    const formattedIp = ipAddress.trim();
    const formattedDesc = (description || 'Cargada desde App').trim();
    const formattedUser = (createdBy || 'admin').trim();

    if (provider === 'spreadsheet') {
      if (!options.spreadsheetId) {
        throw new Error('spreadsheetId es requerido para guardar en Sheets.');
      }

      // Columnas: id, ip_address, description, created_by
      const newId = `ip_${Date.now()}`;
      await appendSpreadsheetData(options.spreadsheetId, 'WhitelistIP!A2:D2', [
        [newId, formattedIp, formattedDesc, formattedUser]
      ]);
      
      // Actualizar caché
      localIpsCache.push({
        id: newId,
        ip_address: formattedIp,
        description: formattedDesc,
        created_by: formattedUser
      });

      return { success: true, ip: formattedIp };
    } else if (provider === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'whitelistIP' });
      const created = await prismaClient.create({
        data: {
          ipAddress: formattedIp,
          description: formattedDesc,
          createdBy: formattedUser
        }
      });
      return { success: true, ip: created.ipAddress };
    } else if (provider === 'supabase') {
      const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
      const { data: created, error } = await supabase
        .from('whitelist_ips')
        .insert([
          {
            ip_address: formattedIp,
            description: formattedDesc,
            created_by: formattedUser
          }
        ])
        .select()
        .single();
      if (error) {
        console.error('[DB WhitelistIP Insert Error]:', error);
        return { success: false, error: error.message };
      }
      return { success: true, ip: created.ip_address };
    } else if (provider === 'firestore') {
      // Escritura ficticia o directa a Firebase si está activo
      return { success: true, ip: formattedIp, note: 'Firestore write stub' };
    }
    
    // Inyectar en memoria
    localIpsCache.push({
      id: `ip_${Date.now()}`,
      ip_address: formattedIp,
      description: formattedDesc,
      created_by: formattedUser
    });
    return { success: true, ip: formattedIp, note: 'Saved to local memory' };

  } catch (error) {
    console.error('[DB Dimensions Error]: Error al registrar IP.', error);
    return { success: false, error: error.message };
  }
}

/**
 * Elimina una IP de la base de datos de forma dinámica.
 */
export async function removeWhitelistIp(ipIdOrAddress, provider, options = {}) {
  try {
    if (provider === 'spreadsheet') {
      // Nota: Eliminar de Sheets por API es complejo, por lo general se limpia la fila o requiere rediseño.
      // Como migramos a Supabase, mantendremos soporte Supabase/Prisma y actualizaremos caché local.
      localIpsCache = localIpsCache.filter(item => item.id !== ipIdOrAddress && item.ip_address !== ipIdOrAddress);
      return { success: true, note: 'Removido de caché local' };
    } else if (provider === 'prisma') {
      const prismaClient = await queryDatabase({ provider: 'prisma', target: 'whitelistIP' });
      await prismaClient.deleteMany({
        where: {
          OR: [
            { id: ipIdOrAddress },
            { ipAddress: ipIdOrAddress }
          ]
        }
      });
      return { success: true };
    } else if (provider === 'supabase') {
      const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
      
      // Intentar eliminar por id o ip_address de forma segura para los tipos de PostgREST
      const isIpAddress = String(ipIdOrAddress).includes('.') || String(ipIdOrAddress).includes(':');
      
      let query = supabase.from('whitelist_ips').delete();
      
      if (isIpAddress) {
        query = query.eq('ip_address', ipIdOrAddress);
      } else {
        query = query.eq('id', ipIdOrAddress);
      }
      
      const { error } = await query;

      if (error) {
        console.error('[DB WhitelistIP Delete Error]:', error);
        return { success: false, error: error.message };
      }
      
      localIpsCache = localIpsCache.filter(item => String(item.id) !== String(ipIdOrAddress) && item.ip_address !== ipIdOrAddress);
      return { success: true };
    }
    
    localIpsCache = localIpsCache.filter(item => String(item.id) !== String(ipIdOrAddress) && item.ip_address !== ipIdOrAddress);
    return { success: true, note: 'Removed from local memory' };
  } catch (error) {
    console.error('[DB Dimensions Error]: Error al eliminar IP.', error);
    return { success: false, error: error.message };
  }
}

/**
 * Actualiza una IP existente en la base de datos.
 */
export async function updateWhitelistIp(id, newData, provider, options = {}) {
  try {
    const formattedIp = newData.ip_address ? newData.ip_address.trim() : undefined;
    const formattedDesc = newData.description !== undefined ? newData.description.trim() : undefined;

    if (provider === 'supabase') {
      const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
      const updateData = {};
      if (formattedIp !== undefined) updateData.ip_address = formattedIp;
      if (formattedDesc !== undefined) updateData.description = formattedDesc;
      
      const { data, error } = await supabase
        .from('whitelist_ips')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
        
      if (error) {
        console.error('[DB WhitelistIP Update Error]:', error);
        return { success: false, error: error.message };
      }
      
      // Actualizar caché
      localIpsCache = localIpsCache.map(item => String(item.id) === String(id) ? { ...item, ...updateData } : item);
      return { success: true, data };
    }
    
    // Fallback memoria local
    localIpsCache = localIpsCache.map(item => {
      if (String(item.id) === String(id)) {
        const updated = { ...item };
        if (formattedIp !== undefined) updated.ip_address = formattedIp;
        if (formattedDesc !== undefined) updated.description = formattedDesc;
        return updated;
      }
      return item;
    });
    
    return { success: true, note: 'Updated in local memory or unsupported provider' };
  } catch (error) {
    console.error('[DB Dimensions Error]: Error al actualizar IP.', error);
    return { success: false, error: error.message };
  }
}


