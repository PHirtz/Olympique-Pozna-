import { fail } from '@sveltejs/kit';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_RECEIVER } from '$env/static/private';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false,
  pool: true,
  maxConnections: 3,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const firstName = data.get('firstName')?.trim();
    const lastName  = data.get('lastName')?.trim();
    const email     = data.get('email')?.trim();
    const phone     = data.get('phone')?.trim();
    const subject   = data.get('subject')?.trim();
    const message   = data.get('message')?.trim();

    if (!firstName || !lastName || !email || !subject || !message) {
      return fail(400, {
        error: 'Tous les champs obligatoires doivent être remplis.',
        values: { firstName, lastName, email, phone, subject, message }
      });
    }

    if (message.length < 10) {
      return fail(400, {
        error: 'Le message doit contenir au moins 10 caractères.',
        values: { firstName, lastName, email, phone, subject, message }
      });
    }

    try {
      // Envoi des deux emails en parallèle — si la confirmation échoue, la notification passe quand même
      await Promise.allSettled([
        // Notification admin
        transporter.sendMail({
          from: `"Olympique Poznan" <${SMTP_USER}>`,
          replyTo: `"${firstName} ${lastName}" <${email}>`,
          to: CONTACT_RECEIVER,
          subject: `Olympique Poznan — ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background:#ffffff; padding:20px;">
              <div style="text-align: center; margin-bottom: 25px;">
                <img src="https://olympiquepoznan.pl/logo.png" alt="Olympique Poznan" width="80" style="display:block;margin:auto;" />
              </div>
              <h2 style="color: #1a4d7a; text-align:center;">Nouveau message de contact</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top:20px;">
                <tr>
                  <td style="padding: 10px; background: #f5f5f5;"><strong>De :</strong></td>
                  <td style="padding: 10px;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; background: #f5f5f5;"><strong>Email :</strong></td>
                  <td style="padding: 10px;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 10px; background: #f5f5f5;"><strong>Téléphone :</strong></td>
                  <td style="padding: 10px;">${phone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px; background: #f5f5f5;"><strong>Sujet :</strong></td>
                  <td style="padding: 10px;">${subject}</td>
                </tr>
              </table>
              <div style="margin-top: 25px; padding: 15px; background: #f9f9f9; border-left: 4px solid #1a4d7a;">
                <p style="margin: 0;"><strong>Message :</strong></p>
                <p style="margin-top: 10px; line-height:1.5;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              <hr style="margin: 25px 0; border: none; border-top: 1px solid #ddd;">
              <p style="color: #666; font-size: 0.9em; text-align:center;">
                Reçu le ${new Date().toLocaleString('fr-FR')}
              </p>
            </div>
          `
        }),

        // Confirmation utilisateur
        transporter.sendMail({
          from: `"Olympique Poznan" <${SMTP_USER}>`,
          to: email,
          subject: 'Message reçu - Olympique Poznan',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background:#ffffff; padding:20px;">
              <div style="text-align: center; margin-bottom: 25px;">
                <img src="https://olympiquepoznan.pl/logo.png" alt="Olympique Poznan" width="80" style="display:block;margin:auto;" />
              </div>
              <h2 style="color: #1a4d7a;">Bonjour ${firstName},</h2>
              <p>Nous avons bien reçu votre message concernant :</p>
              <p style="padding: 10px; background: #f5f5f5; border-left: 4px solid #1a4d7a;">
                <strong>${subject}</strong>
              </p>
              <p>Notre équipe vous répondra dans les plus brefs délais.</p>
              <br>
              <p>Cordialement,</p>
              <p><strong>L'équipe Olympique Poznan</strong></p>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
              <p style="color: #999; font-size: 0.85em;">
                Ceci est un email automatique, merci de ne pas y répondre directement.
              </p>
            </div>
          `
        })
      ]);

      return { success: true };

    } catch (err) {
      console.error('Erreur envoi email :', err);
      return fail(500, {
        error: "L'envoi a échoué, veuillez réessayer.",
        values: { firstName, lastName, email, phone, subject, message }
      });
    }
  }
};