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

    const dbSignupValue = await getSetting('allow_public_signup');
    let allowPublicSignup = process.env.NEXT_PUBLIC_ALLOW_PUBLIC_SIGNUP === 'true';
    if (dbSignupValue !== null) {
      allowPublicSignup = dbSignupValue === 'true';
    }

    return NextResponse.json({ 
      enable_ip_restriction: isEnabled,
      allow_public_signup: allowPublicSignup
    });
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
    const { enable_ip_restriction, allow_public_signup } = body;
    
    let updatedValues = {};

    if (enable_ip_restriction !== undefined) {
      const valueStr = enable_ip_restriction ? 'true' : 'false';
      const result = await updateSetting('enable_ip_restriction', valueStr);
      if (!result.success) {
        return NextResponse.json({ error: result.error || 'Error al guardar configuración de IP' }, { status: 500 });
      }
      updatedValues.enable_ip_restriction = enable_ip_restriction;
    }

    if (allow_public_signup !== undefined) {
      const valueStr = allow_public_signup ? 'true' : 'false';
      const result = await updateSetting('allow_public_signup', valueStr);
      if (!result.success) {
        return NextResponse.json({ error: result.error || 'Error al guardar configuración de registro' }, { status: 500 });
      }
      updatedValues.allow_public_signup = allow_public_signup;
    }

    if (Object.keys(updatedValues).length === 0) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos (enable_ip_restriction o allow_public_signup)' }, { status: 400 });
    }

    return NextResponse.json({ success: true, ...updatedValues });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
