import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ driveId: string }> }
) {
  try {
    const { driveId } = await params;

    if (!driveId) {
      return NextResponse.json({ error: 'Falta el ID del documento' }, { status: 400 });
    }

    // ── Leer credenciales desde variable de entorno (funciona en Vercel y en local) ──
    const rawCredentials = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!rawCredentials) {
      console.error('[Gdrive Proxy]: Falta la variable de entorno GOOGLE_SERVICE_ACCOUNT_JSON');
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta (credenciales no configuradas)' },
        { status: 500 }
      );
    }

    let credentials: object;
    try {
      credentials = JSON.parse(rawCredentials);
    } catch {
      console.error('[Gdrive Proxy]: La variable GOOGLE_SERVICE_ACCOUNT_JSON no es un JSON válido');
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta (JSON inválido)' },
        { status: 500 }
      );
    }

    // ── Autenticar con Google via Service Account ──
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // ── Obtener el PDF como stream directo desde Google Drive ──
    const response = await drive.files.get(
      { fileId: driveId, alt: 'media' },
      { responseType: 'stream' }
    );

    // ── Retornar los bytes en la respuesta (nunca se guarda en disco) ──
    return new NextResponse(response.data as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline',
        'Cache-Control': 'private, max-age=3600',
      },
    });

  } catch (error: any) {
    console.error('[Gdrive Proxy]: Error al obtener PDF:', error?.message ?? error);

    if (error?.code === 404 || error?.status === 404) {
      return NextResponse.json(
        { error: 'Archivo no encontrado en Drive o sin permisos de acceso' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno al obtener el PDF de Google Drive' },
      { status: 500 }
    );
  }
}
