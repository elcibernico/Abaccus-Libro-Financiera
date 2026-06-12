import { NextResponse } from 'next/server';
import { sendPendingUserAlertEmail } from '@/modules/auth/services/emailService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const testEmail = searchParams.get('email') || 'test-prod@fcecon.unr.edu.ar';
    const testName = searchParams.get('name') || 'Test Vercel';
    const testCelular = searchParams.get('celular') || '+5493416177623';

    console.log('[Diagnostic Email Route]: Iniciando prueba de envío en producción...');
    
    // Ejecutar envío
    const result = await sendPendingUserAlertEmail({
      email: testEmail,
      name: testName,
      celular: testCelular
    });

    console.log('[Diagnostic Email Route] Resultado:', result);

    return NextResponse.json({
      timestamp: new Date().toISOString(),
      env_check: {
        has_host: !!process.env.SMTP_HOST,
        has_port: !!process.env.SMTP_PORT,
        has_user: !!process.env.SMTP_USER,
        has_pass: !!process.env.SMTP_PASS,
        host: process.env.SMTP_HOST || null,
        port: process.env.SMTP_PORT || null,
        user: process.env.SMTP_USER || null,
      },
      result
    });
  } catch (error) {
    console.error('[Diagnostic Email Route Error]:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}
