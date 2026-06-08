import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import { cookies } from 'next/headers';
import { ROLE_HIERARCHY } from '@/config/rolesConfig';

// POST: Cambiar o limpiar el rol simulado
export async function POST(request) {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
    }

    const { role } = await request.json();
    const cookieStore = await cookies();

    // Si no viene rol, significa "Volver a la normalidad" (limpiar cookie)
    if (!role) {
      cookieStore.delete('active_role');
      return NextResponse.json({ success: true, message: 'Suplantación de rol cancelada. Rol restaurado.' });
    }

    // Buscar rol real
    const dbUser = await getAuthorizedUserByEmail(user.email, 'supabase');
    if (!dbUser) {
      return NextResponse.json({ error: 'Usuario no encontrado.' }, { status: 404 });
    }

    const realRole = dbUser.role || 'guest';

    // Validar jerarquía
    const targetHierarchy = ROLE_HIERARCHY[role];
    const realHierarchy = ROLE_HIERARCHY[realRole];

    if (!targetHierarchy) {
      return NextResponse.json({ error: 'Rol destino no válido.' }, { status: 400 });
    }

    if (targetHierarchy >= realHierarchy) {
      return NextResponse.json({ error: 'No tienes permisos para simular este rol.' }, { status: 403 });
    }

    // Setear la cookie
    cookieStore.set('active_role', role, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 1 día de duración
    });

    return NextResponse.json({
      success: true,
      message: `Simulando rol: ${role}`
    });
  } catch (err) {
    console.error('[API Impersonate POST Error]:', err);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
