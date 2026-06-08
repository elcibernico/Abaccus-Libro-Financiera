// middleware.js - Interceptor de rutas global de Next.js
import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Refrescar sesión
  const { data: { user } } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Evitar interceptar archivos estáticos o llamadas internas de Next.js
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/auth') || 
    pathname.includes('/api/') || 
    pathname.includes('.')
  ) {
    return response;
  }

  // Lógica de Redirección Global
  if (user) {
    // Si está logueado e intenta ir a /login, redirigir al Dashboard principal
    if (pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Evitar bucle de redirección en las páginas de onboarding y reactivación
    if (
      pathname.startsWith('/perfil/onboarding') ||
      pathname.startsWith('/perfil/reactivar')
    ) {
      return response;
    }

    try {
      const { data: dbUser } = await supabase
        .from('whitelist_users')
        .select('is_active, fecha_nacimiento, dni')
        .eq('email', user.email.toLowerCase().trim())
        .maybeSingle();

      if (dbUser) {
        // 1. Validar si está inactivo (Soft Deleted / Suspendido)
        if (dbUser.is_active === false) {
          return NextResponse.redirect(new URL('/perfil/reactivar', request.url));
        }

        // 2. Validar Onboarding (fecha de nacimiento o dni vacíos)
        if (!dbUser.fecha_nacimiento || !dbUser.dni) {
          return NextResponse.redirect(new URL('/perfil/onboarding', request.url));
        }
      }
    } catch (err) {
      console.error('[Middleware DB Query Error]:', err);
    }
  } else {
    // Si NO está logueado y trata de acceder a cualquier página que no sea /login, forzar login
    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
