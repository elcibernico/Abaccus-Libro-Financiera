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
  try {
    const adminEmail = 'ndemartis@fcecon.unr.edu.ar';
    const dateStr = new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' });

    // 1. Leer el template HTML desde la carpeta de templates
    const templatePath = path.join(process.cwd(), 'src', 'templates', 'emails', 'aviso_nuevo_usuario.html');
    let htmlContent = '';
    
    try {
      htmlContent = fs.readFileSync(templatePath, 'utf-8');
    } catch (readError) {
      console.error('[Email Service Error] No se pudo leer el template HTML:', readError);
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

    // 2. Si no están configuradas las variables de SMTP, hacemos un log y fallamos silenciosamente sin romper el login
    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.warn('⚠️ [Email Service Alert]: Credenciales SMTP no configuradas. Notificación simulada:');
      console.warn(`Para: ${adminEmail}`);
      console.warn(`Asunto: [Acceso Pendiente] Nuevo usuario en espera: ${email}`);
      console.warn(`Contenido:\n- Nombre: ${name}\n- Celular: ${celular}\n- Fecha: ${dateStr}`);
      return { success: true, simulated: true };
    }

    // 3. Configurar nodemailer y enviar correo real
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: parseInt(smtpPort, 10) === 465, // true para 465, false para otros puertos
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
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error('[Email Service Error] Error al enviar correo de notificación:', error);
    // Retornamos success: false pero no lanzamos el error para no romper la experiencia del usuario final
    return { success: false, error: error.message };
  }
}
