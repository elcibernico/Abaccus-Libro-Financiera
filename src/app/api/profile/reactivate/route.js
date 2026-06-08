import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { reactivateUser } from '@/modules/auth/controllers/permissionsController';

// POST: Reactivar la cuenta del usuario autenticado
export async function POST() {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado. Inicie sesión primero.' }, { status: 401 });
    }

    const result = await reactivateUser(user.email);

    if (result.success) {
      return NextResponse.json({ success: true, message: 'Cuenta reactivada con éxito.' });
    } else {
      return NextResponse.json({ error: result.error || 'No se pudo reactivar la cuenta.' }, { status: 500 });
    }
  } catch (err) {
    console.error('[API Profile Reactivate Error]:', err);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
