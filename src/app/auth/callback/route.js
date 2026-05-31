// route.js - Callback de Autenticación para intercambio de código por sesión
import { NextResponse } from 'next/server';
import { createClient } from '@/core/security/supabaseServer';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/';

  if (code) {
    const supabase = await createClient();
    const { data: { session }, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!exchangeError && session?.user) {
      const email = session.user.email;
      
      // Obtener proveedor de persistencia activa y spreadsheetId desde env
      const dbProvider = process.env.NEXT_PUBLIC_DATABASE_PROVIDER || 'spreadsheet';
      const spreadsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';
      
      // Consultar la dimensión de usuarios autorizados (whitelist)
      const authorizedUser = await getAuthorizedUserByEmail(email, dbProvider, { spreadsheetId });
      
      // Si no existe ID de usuario (no está registrado en la lista blanca) o tiene rol restrictivo 'guest'
      // Cerramos la sesión de inmediato por seguridad y denegamos el ingreso.
      if (!authorizedUser || !authorizedUser.id || authorizedUser.role === 'guest') {
        console.warn(`[Auth Security Whitelist]: Acceso denegado para el correo: ${email}`);
        await supabase.auth.signOut();
        return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
      }
      
      return NextResponse.redirect(new URL(next, request.url));
    }
    
    console.error('[Auth Callback Error]:', exchangeError);
  }

  return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
}
