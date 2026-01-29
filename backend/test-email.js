import 'dotenv/config';
import nodemailer from 'nodemailer';

console.log('📧 Test envoi email Gmail\n');
console.log('Configuration:');
console.log('- Host:', process.env.SMTP_HOST);
console.log('- Port:', process.env.SMTP_PORT);
console.log('- User:', process.env.SMTP_USER);
console.log('- Admin:', process.env.ADMIN_EMAIL);
console.log('\n⏳ Envoi en cours...\n');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function test() {
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: '✅ Test Olympique Poznan - Ça marche !',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #1a4d7a;">🎉 Bravo Pauline !</h1>
          <p>La configuration SMTP Gmail fonctionne parfaitement.</p>
          <p>Tu vas maintenant recevoir tous les messages de contact de ton site Olympique Poznań.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 14px;">
            Envoyé le ${new Date().toLocaleString('fr-FR')}
          </p>
        </div>
      `,
    });

    console.log('✅ SUCCESS ! Email envoyé avec succès');
    console.log('📬 Message ID:', info.messageId);
    console.log('\n👉 Vérifie ta boîte mail:', process.env.ADMIN_EMAIL);
  } catch (error) {
    console.error('\n❌ ERREUR:', error.message);
  }
}

test();