export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import { queryDatabase } from '@/database/connection';

const DB_PROVIDER = 'supabase';
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

async function verifyRoot() {
  const user = await requireAuth();
  if (!user) return { authorized: false, status: 401, error: 'No autenticado' };
  
  const authorizedUser = await getAuthorizedUserByEmail(user.email, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });
  if (!authorizedUser || authorizedUser.role !== 'root') {
    return { authorized: false, status: 403, error: 'Acceso restringido. Se requiere rol Root.' };
  }
  return { authorized: true, user: authorizedUser };
}

export async function GET() {
  const auth = await verifyRoot();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
    
    // Obtener todos los roles y sus permisos
    const { data: rolePerms, error } = await supabase
      .from('roles_permissions')
      .select('*');

    if (error) throw error;

    // Agrupar por rol
    const rolesMap = {};
    if (rolePerms) {
      for (const rp of rolePerms) {
        if (!rolesMap[rp.role_id]) {
          rolesMap[rp.role_id] = {};
        }
        rolesMap[rp.role_id][rp.permission_name] = true;
      }
    }

    return NextResponse.json({ rolesMap });
  } catch (error) {
    console.error('[API admin/roles] GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = await verifyRoot();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { role_id, permissions } = body;
    
    if (!role_id || typeof permissions !== 'object') {
      return NextResponse.json({ error: 'Faltan parámetros requeridos (role_id, permissions)' }, { status: 400 });
    }

    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });

    // 1. Borrar permisos actuales para ese rol
    const { error: delErr } = await supabase
      .from('roles_permissions')
      .delete()
      .eq('role_id', role_id);

    if (delErr) throw delErr;

    // 2. Insertar los nuevos permisos otorgados
    const inserts = [];
    for (const [permName, isGranted] of Object.entries(permissions)) {
      if (isGranted) {
        inserts.push({
          role_id,
          permission_name: permName
        });
      }
    }

    if (inserts.length > 0) {
      const { error: insErr } = await supabase
        .from('roles_permissions')
        .insert(inserts);

      if (insErr) throw insErr;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API admin/roles] POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
