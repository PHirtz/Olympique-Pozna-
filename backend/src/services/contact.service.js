import Contact from '../models/contact.model.js';
import { HttpNotFoundError } from '../errors/http.errors.js';
import emailService from './email.service.js';

class ContactService {
  async create(contactData) {
    const contact = await Contact.create(contactData);
    
    // Envoyer un email de notification à l'admin
    try {
      await emailService.sendContactNotification(contact);
    } catch (error) {
      console.error('Erreur envoi email admin:', error);
    }
    
    // Envoyer un email de confirmation à l'utilisateur
    try {
      await emailService.sendContactConfirmation(contact);
    } catch (error) {
      console.error('Erreur envoi email confirmation:', error);
    }
    
    return contact;
  }

  async getAll({ page = 1, limit = 20, status = null }) {
    const offset = (page - 1) * limit;
    const where = {};
    
    if (status) {
      where.status = status;
    }
    
    const { count, rows } = await Contact.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']]
    });
    
    return {
      contacts: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getById(id) {
    const contact = await Contact.findByPk(id);
    
    if (!contact) {
      throw new HttpNotFoundError('Message non trouvé');
    }
    
    // Marquer comme lu si nouveau
    if (contact.status === 'new') {
      await contact.update({ status: 'read' });
    }
    
    return contact;
  }

  async updateStatus(id, status) {
    const contact = await this.getById(id);
    
    await contact.update({ 
      status,
      repliedAt: status === 'replied' ? new Date() : contact.repliedAt,
      replied: status === 'replied' ? true : contact.replied
    });
    
    return contact;
  }

  async delete(id) {
    const contact = await this.getById(id);
    await contact.destroy();
  }
}

export default new ContactService();