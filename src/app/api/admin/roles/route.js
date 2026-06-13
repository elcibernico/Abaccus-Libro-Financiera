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
    
    // Obtener todos los roles de la base de datos
    const { data: rolesList, error: rolesErr } = await supabase
      .from('system_roles')
      .select('*')
      .order('id', { ascending: true });

    if (rolesErr) throw rolesErr;

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

    return NextResponse.json({ rolesMap, roles: rolesList || [] });
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
    const { role_id, permissions, is_active } = body;
    
    if (!role_id) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos (role_id)' }, { status: 400 });
    }

    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });

    // 1. Si se proporciona is_active, actualizar en system_roles
    if (typeof is_active === 'boolean') {
      const { error: activeErr } = await supabase
        .from('system_roles')
        .update({ is_active })
        .eq('id', role_id);
      if (activeErr) throw activeErr;
    }

    // 2. Si se proporcionan los permisos, borrar y re-insertar
    if (permissions && typeof permissions === 'object') {
      // Borrar permisos actuales para ese rol
      const { error: delErr } = await supabase
        .from('roles_permissions')
        .delete()
        .eq('role_id', role_id);

      if (delErr) throw delErr;

      // Insertar los nuevos permisos otorgados
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
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API admin/roles] POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
