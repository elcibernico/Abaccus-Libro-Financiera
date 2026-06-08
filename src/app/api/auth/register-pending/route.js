import { NextResponse } from 'next/server';
import { registerPendingUser } from '@/modules/auth/controllers/permissionsController';

// Helper para detectar código de país por IP con timeout de 2 segundos
async function getPhonePrefixByIp(ip) {
  const defaultRes = { country: 'AR', prefix: '+549' };
  
  if (!ip || ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return defaultRes; // Default local testing
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: controller.signal,
      next: { revalidate: 3600 }
    });
    
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.country_calling_code) {
        let prefix = data.country_calling_code.replace(/\s/g, ''); // Ej: +54
        // Argentina requiere el 9 intermedio para números móviles internacionales
        if (data.country_code === 'AR' && !prefix.endsWith('9')) {
          prefix = '+549';
        }
        return { country: data.country_code, prefix };
      }
    }
  } catch (err) {
    console.warn('[Register Pending]: No se pudo auto-detectar prefijo de IP:', err.message);
  }
  return defaultRes;
}

// Limpieza específica para números móviles de Argentina (remoción de 0 de área y 15 local)
function cleanArgentinaMobile(number) {
  let cleaned = number;
  if (cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }
  
  // Si tiene 12 dígitos, es altamente probable que contenga el "15" local metido
  if (cleaned.length === 12) {
    // Caso de código de área de 2 dígitos (ej: 11 15 61776234 -> 1161776234)
    if (cleaned.substring(2, 4) === '15') {
      cleaned = cleaned.substring(0, 2) + cleaned.substring(4);
    }
    // Caso de código de área de 3 dígitos (ej: 341 15 6177623 -> 3416177623)
    else if (cleaned.substring(3, 5) === '15') {
      cleaned = cleaned.substring(0, 3) + cleaned.substring(5);
    }
    // Caso de código de área de 4 dígitos (ej: 2944 15 617762 -> 2944617762)
    else if (cleaned.substring(4, 6) === '15') {
      cleaned = cleaned.substring(0, 4) + cleaned.substring(6);
    }
  }
  return cleaned;
}

// Formateador inteligente de celular
function formatPhoneNumber(rawPhone, countryPrefix) {
  let cleaned = rawPhone.trim().replace(/[\s\-\(\)]/g, ''); // Remover espacios, guiones y paréntesis
  
  // Caso 1: El usuario ya ingresó el número con el signo '+'
  if (cleaned.startsWith('+')) {
    if (cleaned.startsWith('+54')) {
      // Extraer la parte del número nacional
      let nationalPart = cleaned.startsWith('+549') ? cleaned.substring(4) : cleaned.substring(3);
      nationalPart = cleanArgentinaMobile(nationalPart);
      return `+549${nationalPart}`;
    }
    return cleaned;
  }

  // Caso 2: El usuario omitió el '+' pero empezó con el código de Argentina '54'
  if (cleaned.startsWith('54') && cleaned.length >= 10) {
    let nationalPart = cleaned.startsWith('549') ? cleaned.substring(3) : cleaned.substring(2);
    nationalPart = cleanArgentinaMobile(nationalPart);
    return `+549${nationalPart}`;
  }

  // Caso 3: El número se ingresó de forma puramente local. Se aplica la IP detectada.
  if (countryPrefix.startsWith('+54')) {
    cleaned = cleanArgentinaMobile(cleaned);
  } else {
    // Para otros países, solo remover el 0 inicial si lo tuviera
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.substring(1);
    }
  }

  return `${countryPrefix}${cleaned}`;
}

export async function POST(request) {
  try {
    const { email, name, celular } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'El email es requerido.' }, { status: 400 });
    }

    if (!celular) {
      return NextResponse.json({ error: 'El número de celular es obligatorio.' }, { status: 400 });
    }

    // Obtener IP del cliente
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1';

    // Obtener el prefijo por geolocalización de IP
    const ipInfo = await getPhonePrefixByIp(ip);
    
    // Formatear celular
    const formattedCelular = formatPhoneNumber(celular, ipInfo.prefix);
    
    console.log(`[Register Pending]: Registrando ${email} con celular formateado: ${formattedCelular} (IP: ${ip}, País: ${ipInfo.country})`);

    const result = await registerPendingUser(email, name, formattedCelular);

    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: result.error || 'Error desconocido al guardar en la cola.' }, { status: 500 });
    }
  } catch (error) {
    console.error('[API Register Pending Error]:', error);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}

