import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClientMiddleware } from '@/lib/supabaseServer';

export async function middleware(request: NextRequest) {
  // Crear una respuesta por defecto
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Crear el cliente de Supabase optimizado para Middleware
  const supabase = createClientMiddleware(request, response);

  // Obtener la sesión actual y renovar el token automáticamente
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nextUrl = request.nextUrl;
  const pathname = nextUrl.pathname;

  // Si el usuario no está autenticado e intenta entrar a una ruta protegida
  const isProtectedRoute = 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/docente') || 
    pathname.startsWith('/alumno') ||
    pathname.startsWith('/dashboard');

  if (!user && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url);
    // Redirigir a login
    return NextResponse.redirect(loginUrl);
  }

  // Si está autenticado, podemos comprobar los roles a nivel de metadata o perfiles
  if (user && isProtectedRoute) {
    // Leer el rol desde la metadata de la app
    const userRole = user.app_metadata?.role || 'alumno';

    // Restricciones de rutas
    if (pathname.startsWith('/admin') && userRole !== 'admin' && userRole !== 'admin_suplente') {
      // Redirigir a una página de acceso denegado o al dashboard de su rol
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    if (pathname.startsWith('/docente') && userRole !== 'admin' && userRole !== 'docente') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
  }

  // Si ya está logueado e intenta ir a /login, redirigir al index o su dashboard
  if (user && pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
