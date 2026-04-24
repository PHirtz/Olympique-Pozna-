import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');

import { fail } from '@sveltejs/kit';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_RECEIVER } from '$env/static/private';

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: Number(SMTP_PORT),
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData();

    const childFirstName  = data.get('childFirstName')?.trim();
    const childLastName   = data.get('childLastName')?.trim();
    const childAge        = data.get('childAge')?.trim();
    const isMember        = data.get('isMember')?.trim();
    const clubName        = data.get('clubName')?.trim();
    const parentFirstName = data.get('parentFirstName')?.trim();
    const parentLastName  = data.get('parentLastName')?.trim();
    const email           = data.get('email')?.trim();
    const camp            = data.get('camp')?.trim();
    const message         = data.get('message')?.trim();

    if (!childFirstName || !childLastName) {
      return fail(400, {
        error: "Le prénom et le nom de l'enfant sont obligatoires.",
        values: { childFirstName, childLastName, childAge, isMember, clubName, parentFirstName, parentLastName, email, camp, message }
      });
    }

    if (!childAge) {
      return fail(400, {
        error: "L'âge de l'enfant est obligatoire.",
        values: { childFirstName, childLastName, childAge, isMember, clubName, parentFirstName, parentLastName, email, camp, message }
      });
    }

    if (!email) {
      return fail(400, {
        error: "L'adresse email est obligatoire.",
        values: { childFirstName, childLastName, childAge, isMember, clubName, parentFirstName, parentLastName, email, camp, message }
      });
    }

    if (!message || message.length < 10) {
      return fail(400, {
        error: 'Le message doit contenir au moins 10 caractères.',
        values: { childFirstName, childLastName, childAge, isMember, clubName, parentFirstName, parentLastName, email, camp, message }
      });
    }

    const campLabel = {
      opalenica:  'Camp Opalenica (2-7 Août 2026)',
      januszkowo: 'Camp Januszkowo (23-28 Août 2026)',
      autre:      'Autre / À préciser'
    }[camp] ?? camp;

    const parentInfo = (parentFirstName || parentLastName)
      ? `${parentFirstName ?? ''} ${parentLastName ?? ''}`.trim()
      : 'Non renseigné';

    try {
      await Promise.allSettled([
        // Notification admin
        transporter.sendMail({
          from: `"Fondation Stevens - Olympique Poznan" <${SMTP_USER}>`,
          replyTo: `<${email}>`,
          to: CONTACT_RECEIVER,
          subject: `Fondation Stevens — Demande pour ${childFirstName} ${childLastName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background:#ffffff; padding:20px;">
              <div style="text-align:center; margin-bottom:25px;">
                <img src="https://olympiquepoznan.pl/logo.png" alt="Olympique Poznan" width="80" style="display:block;margin:auto;" />
              </div>
              <h2 style="color:#1a4d7a; text-align:center;">Nouvelle demande — Fondation Stevens</h2>
              <table style="width:100%; border-collapse:collapse; margin-top:20px;">
                <tr>
                  <td style="padding:10px; background:#f5f5f5;"><strong>Enfant :</strong></td>
                  <td style="padding:10px;">${childFirstName} ${childLastName}</td>
                </tr>
                <tr>
                  <td style="padding:10px; background:#f5f5f5;"><strong>Parents :</strong></td>
                  <td style="padding:10px;">${parentInfo}</td>
                </tr>
                <tr>
                  <td style="padding:10px; background:#f5f5f5;"><strong>Email contact :</strong></td>
                  <td style="padding:10px;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:10px; background:#f5f5f5;"><strong>Camp souhaité :</strong></td>
                  <td style="padding:10px;">${campLabel}</td>
                </tr>
              </table>
              <div style="margin-top:25px; padding:15px; background:#f9f9f9; border-left:4px solid #c9a961;">
                <p style="margin:0;"><strong>Message :</strong></p>
                <p style="margin-top:10px; line-height:1.6;">${message.replace(/\n/g, '<br>')}</p>
              </div>
              <hr style="margin:25px 0; border:none; border-top:1px solid #ddd;">
              <p style="color:#666; font-size:0.9em; text-align:center;">
                Reçu le ${new Date().toLocaleString('fr-FR')}
              </p>
            </div>
          `
        }),

        // Confirmation expéditeur
        transporter.sendMail({
          from: `"Fondation Stevens - Olympique Poznan" <${SMTP_USER}>`,
          to: email,
          subject: 'Demande reçue — Fondation Stevens',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background:#ffffff; padding:20px;">
              <div style="text-align:center; margin-bottom:25px;">
                <img src="https://olympiquepoznan.pl/logo.png" alt="Olympique Poznan" width="80" style="display:block;margin:auto;" />
              </div>
              <h2 style="color:#1a4d7a;">Bonjour,</h2>
              <p>Nous avons bien reçu votre demande concernant <strong>${childFirstName} ${childLastName}</strong> pour le <strong>${campLabel}</strong>.</p>
              <p>L'équipe de la Fondation Stevens étudiera votre dossier et vous contactera dans les plus brefs délais.</p>
              <br>
              <p>Cordialement,</p>
              <p><strong>La Fondation Stevens — Olympique Poznan</strong></p>
              <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;">
              <p style="color:#999; font-size:0.85em;">Ceci est un email automatique, merci de ne pas y répondre directement.</p>
            </div>
          `
        })
      ]);

      return { success: true };

    } catch (err) {
      console.error('Erreur envoi Fondation Stevens :', err);
      return fail(500, {
        error: "L'envoi a échoué, veuillez réessayer.",
        values: { childFirstName, childLastName, childAge, isMember, clubName, parentFirstName, parentLastName, email, camp, message }
      });
    }
  }
};