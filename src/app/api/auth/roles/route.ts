import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { queryDatabase } from '@/database/connection';

export async function GET() {
  try {
    const user = await requireAuth();
    if (!user) {
      return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
    }

    const supabase = await queryDatabase({ provider: 'supabase' });
    const { data: roles, error } = await supabase
      .from('system_roles')
      .select('id, label, default_permissions, is_active')
      .order('id', { ascending: true });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      roles: roles || []
    });
  } catch (err) {
    console.error('[API Roles GET Error]:', err);
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 });
  }
}
