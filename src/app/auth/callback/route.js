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
      const dbProvider = 'supabase';
      const spreadsheetId = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';
      
      // Consultar la dimensión de usuarios autorizados (whitelist)
      const authorizedUser = await getAuthorizedUserByEmail(email, dbProvider, { spreadsheetId });
      
      // Si no existe el usuario en la lista blanca, lo redirigimos a completar celular
      if (!authorizedUser || !authorizedUser.id) {
        console.warn(`[Auth Security Whitelist]: Usuario no registrado en la lista blanca: ${email}. Redirigiendo a registro de celular.`);
        
        const name = session.user.user_metadata?.full_name || session.user.user_metadata?.name || '';
        
        // Cerramos la sesión activa de Supabase inmediatamente por seguridad
        await supabase.auth.signOut();
        
        // Redirigir a la página de carga de celular
        const redirectUrl = new URL('/auth/registro-celular', request.url);
        redirectUrl.searchParams.set('email', email);
        redirectUrl.searchParams.set('name', name);
        return NextResponse.redirect(redirectUrl);
      }

      // Si existe pero su rol es restrictivo 'guest' (invitado / suspendido voluntariamente)
      if (authorizedUser.role === 'guest') {
        console.warn(`[Auth Security Whitelist]: Acceso denegado por rol restrictivo 'guest' para el correo: ${email}`);
        await supabase.auth.signOut();
        return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
      }
      
      return NextResponse.redirect(new URL(next, request.url));
    }
    
    console.error('[Auth Callback Error]:', exchangeError);
  }

  return NextResponse.redirect(new URL('/login?error=auth_failed', request.url));
}
