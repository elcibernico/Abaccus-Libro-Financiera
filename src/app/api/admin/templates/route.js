import { NextResponse } from 'next/server';
import { requireAuth } from '@/modules/auth/middlewares/authGuard';
import { getAuthorizedUserByEmail } from '@/database/dimensions/users';
import fs from 'fs';
import path from 'path';

const DB_PROVIDER = process.env.NEXT_PUBLIC_DATABASE_PROVIDER || 'spreadsheet';
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
    const templatesDir = path.join(process.cwd(), 'src', 'templates', 'emails');
    const files = [
      { id: 'aviso_nuevo_usuario', filename: 'aviso_nuevo_usuario.html', name: 'Aviso de Nuevo Usuario Pendiente (Administrador)' },
      { id: 'magic_link_template', filename: 'magic_link_template.html', name: 'Magic Link / OTP Template (Referencia Supabase)' }
    ];

    const templates = files.map(file => {
      const filePath = path.join(templatesDir, file.filename);
      let content = '';
      try {
        content = fs.readFileSync(filePath, 'utf-8');
      } catch (err) {
        console.warn(`[Admin Templates API] No se pudo leer ${file.filename}, se creará vacío.`);
      }
      return {
        id: file.id,
        name: file.name,
        filename: file.filename,
        content
      };
    });

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('[Admin Templates GET Error]:', error);
    return NextResponse.json({ error: 'Error al obtener las plantillas.' }, { status: 500 });
  }
}

export async function POST(request) {
  const auth = await verifyAdmin();
  if (!auth.authorized) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { id, content } = await request.json();

    if (!id || content === undefined) {
      return NextResponse.json({ error: 'Faltan parámetros requeridos (id, content).' }, { status: 400 });
    }

    const filename = id === 'aviso_nuevo_usuario' ? 'aviso_nuevo_usuario.html' : 
                     id === 'magic_link_template' ? 'magic_link_template.html' : null;

    if (!filename) {
      return NextResponse.json({ error: 'Identificador de plantilla no válido.' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'templates', 'emails', filename);

    // Asegurarse de que el directorio existe
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Admin Templates POST Error]:', error);
    return NextResponse.json({ error: 'Error al guardar la plantilla.' }, { status: 500 });
  }
}
