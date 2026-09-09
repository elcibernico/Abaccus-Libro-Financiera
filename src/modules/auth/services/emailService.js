import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

/**
 * Envía un correo de notificación cuando un nuevo usuario queda en suspenso.
 * @param {object} params Datos del usuario
 * @param {string} params.email Correo electrónico del usuario
 * @param {string} params.name Nombre del usuario
 * @param {string} params.celular Celular del usuario
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function sendPendingUserAlertEmail({ email, name, celular }) {
  // Ejecutar el envío en segundo plano de manera no bloqueante para responder de inmediato al usuario
  (async () => {
    try {
      const adminEmail = 'ndemartis@fcecon.unr.edu.ar';
      const dateStr = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });

      // 1. Leer el template HTML desde la carpeta de templates
      const templatePath = path.join(process.cwd(), 'src', 'templates', 'emails', 'aviso_nuevo_usuario.html');
      let htmlContent = '';
      
      try {
        htmlContent = fs.readFileSync(templatePath, 'utf-8');
      } catch (readError) {
        // Fallback simple por si falla la lectura del archivo
        htmlContent = `
          <h2>Nuevo Usuario Pendiente</h2>
          <p>Email: ${email}</p>
          <p>Nombre: ${name}</p>
          <p>Celular: ${celular}</p>
          <p>Fecha: ${dateStr}</p>
        `;
      }

      // Reemplazar placeholders en el HTML
      htmlContent = htmlContent
        .replace(/\{\{email\}\}/g, email)
        .replace(/\{\{name\}\}/g, name || 'No provisto')
        .replace(/\{\{celular\}\}/g, celular || 'No provisto')
        .replace(/\{\{date\}\}/g, dateStr);

      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;
      const smtpFrom = process.env.SMTP_FROM || `"Ecosistema Abaccus" <${smtpUser}>`;

      // 2. Si no están configuradas las variables de SMTP, simulamos y no bloqueamos
      if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
        console.warn('⚠️ [Email Service Alert]: Credenciales SMTP no configuradas. Notificación simulada para:', email);
        return;
      }

      // 3. Configurar nodemailer con timeout estricto de 3 segundos para no colgar el proceso
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort, 10),
        secure: parseInt(smtpPort, 10) === 465,
        connectionTimeout: 3000,
        greetingTimeout: 3000,
        socketTimeout: 5000,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: smtpFrom,
        to: adminEmail,
        subject: `[Acceso Pendiente] Nuevo usuario en espera: ${email}`,
        html: htmlContent,
        text: `Nuevo usuario en espera de aprobación. Email: ${email}, Nombre: ${name}, Celular: ${celular}, Fecha: ${dateStr}. Ingrese al panel: https://abaccus-libro-financiera.vercel.app/admin`
      };

      const info = await transporter.sendMail(mailOptions);
      console.log(`[Email Service Success] Correo de alerta enviado: ${info.messageId}`);
    } catch (error) {
      console.error('[Email Service Error] Error al enviar correo de notificación en background:', error.message);
    }
  })();

  // Retornar éxito inmediato al caller para no bloquear la respuesta HTTP
  return { success: true };
}

