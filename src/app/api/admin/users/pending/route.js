export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import { getPendingUsers, approvePendingUser, rejectPendingUser } from '@/modules/auth/controllers/permissionsController';

const DB_PROVIDER = 'supabase';
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

async function verifyAdmin() {
  const user = await requireAuth();
  if (!user) return { authorized: false, status: 401, error: 'No autenticado' };
  
  const authorizedUser = await getAuthorizedUserByEmail(user.email, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });
  if (!authorizedUser || (authorizedUser.role !== 'admin' && authorizedUser.role !== 'root')) {
    return { authorized: false, status: 403, error: 'No autorizado. Se requiere rol de administrador' };
  }
  return { authorized: true, user: authorizedUser };
}

export async function GET() {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const pendingUsers = await getPendingUsers();
  return NextResponse.json({ pending: pendingUsers });
}

export async function POST(request) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { email, role, celular } = body;
    if (!email) {
      return NextResponse.json({ error: 'Falta parámetro requerido email' }, { status: 400 });
    }

    const result = await approvePendingUser(email, role || 'user', celular || '');
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Error al aprobar usuario' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    if (!email) {
      return NextResponse.json({ error: 'Falta parámetro requerido email en query' }, { status: 400 });
    }

    const result = await rejectPendingUser(email);
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Error al rechazar usuario' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
