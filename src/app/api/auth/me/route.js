// route.js - API endpoint to fetch current authenticated user profile and permissions
import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';

const DB_PROVIDER = process.env.NEXT_PUBLIC_DATABASE_PROVIDER || 'spreadsheet';
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

export async function GET() {
  const user = await requireAuth();
  if (!user) {
    return NextResponse.json({ authenticated: false });
  }

  const authorizedUser = await getAuthorizedUserByEmail(user.email, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID });
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
