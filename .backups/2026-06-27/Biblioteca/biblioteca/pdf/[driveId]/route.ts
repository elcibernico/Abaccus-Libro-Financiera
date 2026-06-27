import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

// Ruta absoluta del archivo de credenciales de Google
const keyPath = path.join(process.cwd(), 'src', 'config', 'keys', 'google-service-account.json');

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ driveId: string }> }
) {
  try {
    const { driveId } = await params;

    if (!driveId) {
      return NextResponse.json({ error: 'Falta el ID del documento' }, { status: 400 });
    }

    // Verificar si existe el archivo de claves locales
    if (!fs.existsSync(keyPath)) {
      console.error('[Gdrive Proxy Error]: No se encontró el archivo de credenciales en:', keyPath);
      return NextResponse.json({ error: 'Configuración del servidor incompleta (Keys)' }, { status: 500 });
    }

    // Inicializar autenticación con la cuenta de servicio
    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // Obtener los bytes del archivo directamente de Google Drive como un stream
    const response = await drive.files.get(
      { fileId: driveId, alt: 'media' },
      { responseType: 'stream' }
    );

    // Retornar los bytes directamente en la respuesta como aplicación de PDF
    return new NextResponse(response.data as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline', // Muestra en pantalla en lugar de forzar descarga
        'Cache-Control': 'private, max-age=3600', // Cachear localmente por seguridad
      },
    });

  } catch (error: any) {
    console.error('[Gdrive Proxy Error]: Falló la descarga del PDF de Drive:', error);
    
    // Devolver respuestas de error claras
    if (error.code === 404) {
      return NextResponse.json({ error: 'El archivo no existe en Google Drive o no tiene permisos' }, { status: 404 });
    }
    
    return NextResponse.json({ error: 'Error al obtener el PDF de Google Drive' }, { status: 500 });
  }
}
