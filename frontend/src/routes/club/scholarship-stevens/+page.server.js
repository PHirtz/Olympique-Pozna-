import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const nodemailer = require('nodemailer');

import { fail } from '@sveltejs/kit';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_RECEIVER } from '$env/static/private';

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

const i18n = {
  fr: {
    subject: 'Demande reçue — Bourse Michael Stevens',
    greeting: (name) => `Bonjour${name ? ` ${name}` : ''},`,
    received: 'Nous avons bien reçu votre demande concernant',
    camp: 'pour le',
    followUp: "L'équipe de la Bourse Michael Stevens étudiera votre dossier et vous contactera dans les plus brefs délais.",
    regards: "Cordialement,",
    team: "L'équipe Bourse Michael Stevens — Olympique Poznań",
    auto: "Ceci est un email automatique, merci de ne pas y répondre directement."
  },
  pl: {
    subject: 'Zgłoszenie otrzymane — Stypendium Michaela Stevensa',
    greeting: (name) => `Dzień dobry${name ? ` ${name}` : ''},`,
    received: 'Otrzymaliśmy Twoje zgłoszenie dotyczące',
    camp: 'na',
    followUp: "Zespół Stypendium Michaela Stevensa zapozna się z Twoim zgłoszeniem i skontaktuje się z Tobą jak najszybciej.",
    regards: "Z poważaniem,",
    team: "Zespół Stypendium Michaela Stevensa — Olympique Poznań",
    auto: "Ta wiadomość została wysłana automatycznie, prosimy na nią nie odpowiadać."
  },
  en: {
    subject: 'Application received — Michael Stevens Scholarship',
    greeting: (name) => `Hello${name ? ` ${name}` : ''},`,
    received: 'We have received your application regarding',
    camp: 'for the',
    followUp: "The Michael Stevens Scholarship team will review your application and contact you as soon as possible.",
    regards: "Kind regards,",
    team: "The Michael Stevens Scholarship Team — Olympique Poznań",
    auto: "This is an automated email, please do not reply directly."
  }
};

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
    const locale          = ['fr', 'pl', 'en'].includes(data.get('locale')) ? data.get('locale') : 'fr';

    const t = i18n[locale];

    if (!childFirstName || !childLastName) {
      return fail(400, {
        error: 'Le prénom et le nom de l\'enfant sont obligatoires.',
        values: { childFirstName, childLastName, childAge, isMember, clubName, parentFirstName, parentLastName, email, camp, message }
      });
    }

    if (!childAge) {
      return fail(400, {
        error: 'L\'âge de l\'enfant est obligatoire.',
        values: { childFirstName, childLastName, childAge, isMember, clubName, parentFirstName, parentLastName, email, camp, message }
      });
    }

    if (!email) {
      return fail(400, {
        error: 'L\'adresse email est obligatoire.',
        values: { childFirstName, childLastName, childAge, isMember, clubName, parentFirstName, parentLastName, email, camp, message }
      });
    }

    if (!message || message.length < 10) {
      return fail(400, {
        error: 'Le message doit contenir au moins 10 caractères.',
        values: { childFirstName, childLastName, childAge, isMember, clubName, parentFirstName, parentLastName, email, camp, message }
      });
    }

    const campLabels = {
      fr: {
        opalenica:  'Camp Opalenica (2-7 Août 2026)',
        januszkowo: 'Camp Januszkowo (23-28 Août 2026)',
        autre:      'Autre / À préciser'
      },
      pl: {
        opalenica:  'Obóz Opalenica (2-7 sierpnia 2026)',
        januszkowo: 'Obóz Januszkowo (23-28 sierpnia 2026)',
        autre:      'Inne / Do ustalenia'
      },
      en: {
        opalenica:  'Camp Opalenica (2-7 August 2026)',
        januszkowo: 'Camp Januszkowo (23-28 August 2026)',
        autre:      'Other / To be specified'
      }
    };
    const campLabel = (campLabels[locale] ?? campLabels.fr)[camp] ?? camp;

    const parentInfo = (parentFirstName || parentLastName)
      ? `${parentFirstName ?? ''} ${parentLastName ?? ''}`.trim()
      : 'Non renseigné';

    const memberInfo = isMember === 'oui'
      ? 'Oui — Olympique Poznań'
      : `Non${clubName ? ` — Club : ${clubName}` : ''}`;

    try {
      await Promise.allSettled([
        // Notification admin (toujours en français)
        transporter.sendMail({
          from: `"Bourse Stevens - Olympique Poznan" <${SMTP_USER}>`,
          replyTo: `<${email}>`,
          to: CONTACT_RECEIVER,
          subject: `Bourse Stevens — Demande pour ${childFirstName} ${childLastName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background:#ffffff; padding:20px;">
              <div style="text-align:center; margin-bottom:25px;">
                <img src="https://olympiquepoznan.pl/logo.png" alt="Olympique Poznan" width="80" style="display:block;margin:auto;" />
              </div>
              <h2 style="color:#1a4d7a; text-align:center;">Nouvelle demande — Bourse Stevens</h2>
              <table style="width:100%; border-collapse:collapse; margin-top:20px;">
                <tr>
                  <td style="padding:10px; background:#f5f5f5;"><strong>Enfant :</strong></td>
                  <td style="padding:10px;">${childFirstName} ${childLastName}</td>
                </tr>
                <tr>
                  <td style="padding:10px; background:#f5f5f5;"><strong>Âge :</strong></td>
                  <td style="padding:10px;">${childAge} ans</td>
                </tr>
                <tr>
                  <td style="padding:10px; background:#f5f5f5;"><strong>Membre Olympique Poznań :</strong></td>
                  <td style="padding:10px;">${memberInfo}</td>
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
                <tr>
                  <td style="padding:10px; background:#f5f5f5;"><strong>Langue :</strong></td>
                  <td style="padding:10px;">${locale.toUpperCase()}</td>
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

        // Confirmation à l'expéditeur — dans sa langue
        transporter.sendMail({
          from: `"Bourse Stevens - Olympique Poznan" <${SMTP_USER}>`,
          to: email,
          subject: t.subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background:#ffffff; padding:20px;">
              <div style="text-align:center; margin-bottom:25px;">
                <img src="https://olympiquepoznan.pl/logo.png" alt="Olympique Poznan" width="80" style="display:block;margin:auto;" />
              </div>
              <h2 style="color:#1a4d7a;">${t.greeting(parentFirstName || '')}</h2>
              <p>${t.received} <strong>${childFirstName} ${childLastName}</strong> ${t.camp} <strong>${campLabel}</strong>.</p>
              <p>${t.followUp}</p>
              <br>
              <p>${t.regards}</p>
              <p><strong>${t.team}</strong></p>
              <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;">
              <p style="color:#999; font-size:0.85em;">${t.auto}</p>
            </div>
          `
        })
      ]);

      return { success: true };

    } catch (err) {
      console.error('Erreur envoi Bourse Stevens :', err);
      return fail(500, {
        error: "L'envoi a échoué, veuillez réessayer.",
        values: { childFirstName, childLastName, childAge, isMember, clubName, parentFirstName, parentLastName, email, camp, message }
      });
    }
  }
};