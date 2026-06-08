// route.js - API endpoint to fetch current authenticated user profile and permissions
import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import { headers } from 'next/headers';
import { verifyUserAndIP, getClientIp } from '@/core/security/securityService';

const DB_PROVIDER = 'supabase';
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

export async function GET() {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ authenticated: false });
  }

  // Validar la IP contra el cortafuegos
  const headerList = await headers();
  const clientIp = getClientIp(headerList);
  const securityCheck = await verifyUserAndIP(user.email, clientIp);

  if (!securityCheck.authorized) {
    return NextResponse.json(
      { 
        authenticated: false, 
        error: securityCheck.error || 'unauthorized', 
        blocked: true 
      },
      { status: 403 }
    );
  }

  const authorizedUser = securityCheck.user;
  return NextResponse.json({
    authenticated: true,
    user: {
      email: user.email,
      id: user.id,
      name: authorizedUser?.name || user.user_metadata?.full_name || '',
      role: authorizedUser?.role || 'guest',
      permissions: authorizedUser?.permissions || {
        may_export_pdf: false,
        may_edit_records: false,
        may_view_advanced_charts: false
      }
    }
  });
}
