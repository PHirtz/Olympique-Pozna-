import nodemailer from 'nodemailer';

class EmailService {
  constructor() {
    // Vérifier si nodemailer est bien importé
    if (!nodemailer || typeof nodemailer.createTransport !== 'function') {
      console.error('Nodemailer n\'est pas correctement installé');
      this.transporter = null;
      return;
    }

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true pour 465, false pour autres ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  /**
   * Envoyer notification admin
   */
  async sendContactNotification(contact) {
    if (!this.transporter) {
      console.warn('Email transporter non configuré');
      return;
    }

    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || '"Olympique Poznan" <noreply@olympiquepoznan.com>',
        to: process.env.ADMIN_EMAIL || 'contact@olympiquepoznan.com',
        subject: `📧 Nouveau message: ${contact.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #667eea;">Nouveau message de contact</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px; background: #f5f5f5;"><strong>De:</strong></td>
                <td style="padding: 10px;">${contact.firstName} ${contact.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 10px; background: #f5f5f5;"><strong>Email:</strong></td>
                <td style="padding: 10px;"><a href="mailto:${contact.email}">${contact.email}</a></td>
              </tr>
              ${contact.phone ? `
              <tr>
                <td style="padding: 10px; background: #f5f5f5;"><strong>Téléphone:</strong></td>
                <td style="padding: 10px;">${contact.phone}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px; background: #f5f5f5;"><strong>Sujet:</strong></td>
                <td style="padding: 10px;">${contact.subject}</td>
              </tr>
            </table>
            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-left: 4px solid #667eea;">
              <p style="margin: 0;"><strong>Message:</strong></p>
              <p style="margin-top: 10px;">${contact.message.replace(/\n/g, '<br>')}</p>
            </div>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 0.9em;">
              Reçu le ${new Date(contact.createdAt).toLocaleString('fr-FR')}
            </p>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email admin envoyé pour le contact #${contact.id}`);
    } catch (error) {
      console.error('❌ Erreur envoi email admin:', error.message);
      throw error;
    }
  }

  /**
   * Envoyer confirmation utilisateur
   */
  async sendContactConfirmation(contact) {
    if (!this.transporter) {
      console.warn('Email transporter non configuré');
      return;
    }

    try {
      const mailOptions = {
        from: process.env.SMTP_FROM || '"Olympique Poznan" <noreply@olympiquepoznan.com>',
        to: contact.email,
        subject: 'Message reçu - Olympique Poznan',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #667eea;">Bonjour ${contact.firstName},</h2>
            <p>Nous avons bien reçu votre message concernant :</p>
            <p style="padding: 10px; background: #f5f5f5; border-left: 4px solid #667eea;">
              <strong>${contact.subject}</strong>
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
      };

      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Email confirmation envoyé à ${contact.email}`);
    } catch (error) {
      console.error('❌ Erreur envoi email confirmation:', error.message);
      throw error;
    }
  }
}

export default new EmailService();