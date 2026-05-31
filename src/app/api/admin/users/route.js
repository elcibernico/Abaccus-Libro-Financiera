// route.js - API endpoint for administrator to view and modify user roles/permissions
import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import { getAllUsers, updateUserPermissions } from '@/modules/auth/controllers/permissionsController';

const DB_PROVIDER = process.env.NEXT_PUBLIC_DATABASE_PROVIDER || 'spreadsheet';
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

async function verifyAdmin() {
  const user = await requireAuth();
  if (!user) return { authorized: false, status: 401, error: 'No autenticado' };
  
  const authorizedUser = await getAuthorizedUserByEmail(user.email, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });
  if (!authorizedUser || authorizedUser.role !== 'admin') {
    return { authorized: false, status: 403, error: 'No autorizado. Se requiere rol de administrador' };
  }
  return { authorized: true, user: authorizedUser };
}

export async function GET() {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  const users = await getAllUsers();
  return NextResponse.json({ users });
}

export async function POST(request) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { email, permissions, role } = body;
    if (!email || !permissions || !role) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos (email, permissions, role)' }, { status: 400 });
    }

    const result = await updateUserPermissions(email, permissions, role);
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Error al actualizar permisos' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
