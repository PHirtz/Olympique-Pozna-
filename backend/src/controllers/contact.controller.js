import contactService from '../services/contact.service.js';

class ContactController {
  /**
   * Créer un message de contact
   */
  async create(req, res, next) {
    try {
      const contactData = req.body;
      const contact = await contactService.create(contactData);
      
      res.status(201).json({
        success: true,
        message: 'Message envoyé avec succès',
        data: contact
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Récupérer tous les messages
   */
  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 20, status } = req.query;
      const contacts = await contactService.getAll({ page, limit, status });
      
      res.json({
        success: true,
        data: contacts
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Récupérer un message par ID
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const contact = await contactService.getById(id);
      
      res.json({
        success: true,
        data: contact
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Mettre à jour le statut d'un message
   */
  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const contact = await contactService.updateStatus(id, status);
      
      res.json({
        success: true,
        message: 'Statut mis à jour',
        data: contact
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Supprimer un message
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      await contactService.delete(id);
      
      res.json({
        success: true,
        message: 'Message supprimé'
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ContactController();