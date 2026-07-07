export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import { queryDatabase } from '@/database/connection';

const DB_PROVIDER = 'supabase';
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID || '';

async function verifyAdmin() {
  const user = await requireAuth() as any;
  if (!user) return { authorized: false, status: 401, error: 'No autenticado' };
  
  const authorizedUser = await getAuthorizedUserByEmail(user.email, DB_PROVIDER, { spreadsheetId: SPREADSHEET_ID }) as any;
  if (!authorizedUser || (authorizedUser.role !== 'admin' && authorizedUser.role !== 'root')) {
    return { authorized: false, status: 403, error: 'No autorizado. Se requiere rol de administrador' };
  }
  return { authorized: true, user: authorizedUser };
}

// GET: Obtiene las obras agrupadas por source_id desde paulita_its_embeddings
export async function GET() {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });
    
    // Consultar agrupando por source_id
    const { data, error } = await supabase
      .from('paulita_its_embeddings')
      .select('source_id, obra_titulo, autor')
      .order('obra_titulo', { ascending: true });

    if (error) throw error;

    // Agrupar manualmente en JS para tener títulos únicos basados en source_id
    const uniques: Record<string, any> = {};
    if (data) {
      data.forEach((item: any) => {
        if (item.source_id && !uniques[item.source_id]) {
          uniques[item.source_id] = {
            source_id: item.source_id,
            obra_titulo: item.obra_titulo || '',
            autor: item.autor || ''
          };
        }
      });
    }

    return NextResponse.json({ obras: Object.values(uniques) });
  } catch (error: any) {
    console.error('[API admin/obras GET] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Actualiza el título y autor de todos los fragmentos asociados a un source_id
export async function PUT(request: Request) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const body = await request.json();
    const { source_id, obra_titulo, autor } = body;

    if (!source_id) {
      return NextResponse.json({ error: 'Falta el parámetro requerido source_id' }, { status: 400 });
    }

    const supabase = await queryDatabase({ provider: 'supabase', options: { useAdmin: true } });

    // Actualizar todas las filas coincidentes con el source_id
    const { error } = await supabase
      .from('paulita_its_embeddings')
      .update({
        obra_titulo: obra_titulo || '',
        autor: autor || ''
      })
      .eq('source_id', source_id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[API admin/obras PUT] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
