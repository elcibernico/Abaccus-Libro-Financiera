// route.js - API endpoint to fetch current authenticated user profile and permissions
import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import { headers, cookies } from 'next/headers';
import { verifyUserAndIP, getClientIp } from '@/core/security/securityService';
import { ROLE_HIERARCHY, getDefaultPermissionsForRole } from '@/config/rolesConfig';

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

  // Evaluar Role Impersonation
  const cookieStore = await cookies();
  const activeRoleCookie = cookieStore.get('active_role')?.value;
  const realRole = authorizedUser?.role || 'guest';
  let activeRole = realRole;

  if (activeRoleCookie && ROLE_HIERARCHY[activeRoleCookie] < ROLE_HIERARCHY[realRole]) {
    activeRole = activeRoleCookie;
  }

  let permissions = authorizedUser?.permissions || {
    may_export_pdf: false,
    may_edit_records: false,
    may_view_advanced_charts: false
  };

  if (activeRole !== realRole) {
    permissions = getDefaultPermissionsForRole(activeRole);
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      email: user.email,
      id: user.id,
      name: authorizedUser?.name || user.user_metadata?.full_name || '',
      role: activeRole,
      realRole: realRole,
      permissions: permissions
    }
  });
}

