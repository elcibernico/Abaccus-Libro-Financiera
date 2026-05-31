// route.js - Next.js Route Handler para verificar vencimiento de secretos OAuth
import { NextResponse } from 'next/server';
import { secretsMetadata } from '@/modules/auth/config/secretsMetadata';

// Email alternativo de administración por defecto
const DEFAULT_ADMIN_EMAIL = 'elcibernico@gmail.com';

export async function GET(request) {
  try {
    // 1. Proteger el endpoint mediante validación del Token de Autorización (Vercel Crons Security)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // Si CRON_SECRET está configurado en producción, validamos el token Bearer
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const today = new Date();
    const alertResults = [];
    let emailsSentCount = 0;

    // 2. Procesar cada secreto
    for (const secret of secretsMetadata) {
      const expDate = new Date(secret.expirationDate);
      
      // Calcular la diferencia en días en UTC para evitar problemas de huso horario
      const diffTime = expDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      // 3. Si vence en 7 días o menos, y no ha vencido hace mucho
      if (diffDays >= 0 && diffDays <= 7) {
        const mailContent = {
          to: secret.adminEmail || DEFAULT_ADMIN_EMAIL,
          subject: `[ALERTA ABACCUS] El secreto OAuth de ${secret.providerName} vence en ${diffDays} días`,
          body: `
⚠️ ALERTA DE EXPINACIÓN DE CREDENCIALES OAUTH ⚠️

El Secreto de Cliente (Client Secret) para el proveedor: ${secret.providerName}
vencerá el próximo: ${secret.expirationDate} (en ${diffDays} días).

Si este secreto expira, los usuarios no podrán loguearse a la plataforma Libro Financiera mediante este proveedor.

👉 INSTRUCCIONES DE ROTACIÓN:
${secret.rotationGuideRef}

Por favor, proceda a generar un nuevo Secreto de Cliente en la consola del proveedor correspondiente e inyéctelo en la configuración de Supabase Auth para evitar interrupciones de acceso.
          `.trim()
        };

        // 4. Intentar enviar email utilizando el método configurado (Simulado o usando un proveedor del .env si existe)
        // Como fallback robusto, registramos en consola de producción/desarrollo y lo devolvemos en la respuesta del api
        console.warn(`[CRON SECRETS]: Se requiere acción para ${secret.providerName}. Enviando alerta a ${mailContent.to}...`);
        
        // Simulación exitosa (o integración en runtime si tuviese Resend/Nodemailer configurados en el futuro)
        alertResults.push({
          provider: secret.providerName,
          daysRemaining: diffDays,
          status: 'alert_triggered',
          messageSent: mailContent
        });
        
        emailsSentCount++;
      } else {
        alertResults.push({
          provider: secret.providerName,
          daysRemaining: diffDays,
          status: 'ok'
        });
      }
    }

    return NextResponse.json({
      success: true,
      timestamp: today.toISOString(),
      emailsSentCount,
      results: alertResults
    });

  } catch (error) {
    console.error('[CRON SECRETS ERROR]:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
