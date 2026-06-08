// route.js - API endpoint for administrator to view and modify global system settings
import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import { getSetting, updateSetting } from '@/database/dimensions/settings';

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

  try {
    const dbValue = await getSetting('enable_ip_restriction');
    
    // Si no existe el registro en la base de datos, usamos la variable de entorno como fallback
    let isEnabled = process.env.NEXT_PUBLIC_ENABLE_IP_RESTRICTION === 'true';
    if (dbValue !== null) {
      isEnabled = dbValue === 'true';
    }

    return NextResponse.json({ enable_ip_restriction: isEnabled });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { enable_ip_restriction } = body;
    
    if (enable_ip_restriction === undefined) {
      return NextResponse.json({ error: 'Falta parámetro requerido (enable_ip_restriction)' }, { status: 400 });
    }

    const valueStr = enable_ip_restriction ? 'true' : 'false';
    const result = await updateSetting('enable_ip_restriction', valueStr);
    
    if (!result.success) {
      return NextResponse.json({ error: result.error || 'Error al guardar configuración' }, { status: 500 });
    }

    return NextResponse.json({ success: true, enable_ip_restriction });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
