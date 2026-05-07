import CampRegistration from '../models/camp-registration.model.js';
import Camp from '../models/camp.model.js';
import campService from './camp.service.js';
import { HttpNotFoundError, HttpConflictError, HttpBadRequestError } from '../errors/http.errors.js';
import crypto from 'crypto';

class CampRegistrationService {
  async createRegistration(registrationData) {
    const camp = await Camp.findByPk(registrationData.campId);

    if (!camp) {
      throw new HttpNotFoundError('Camp introuvable');
    }

    // Vérifier si le camp est ouvert aux inscriptions
    if (camp.status !== 'open') {
      throw new HttpBadRequestError('Les inscriptions pour ce camp sont fermées');
    }

    // Vérifier la date limite d'inscription
    if (camp.registrationDeadline && new Date() > new Date(camp.registrationDeadline)) {
      throw new HttpBadRequestError('La date limite d\'inscription est dépassée');
    }

    // Vérifier l'âge de l'enfant
    const childAge = this.calculateAge(registrationData.childDateOfBirth);
    if (camp.ageMin && childAge < camp.ageMin) {
      throw new HttpBadRequestError(`L'enfant doit avoir au moins ${camp.ageMin} ans`);
    }
    if (camp.ageMax && childAge > camp.ageMax) {
      throw new HttpBadRequestError(`L'enfant doit avoir au maximum ${camp.ageMax} ans`);
    }

    // Vérifier s'il reste des places
    if (camp.currentParticipants >= camp.maxParticipants) {
      // Ajouter à la liste d'attente
      registrationData.status = 'waiting_list';
    }

    // Générer un token de confirmation
    const confirmationToken = crypto.randomBytes(32).toString('hex');
    registrationData.confirmationToken = confirmationToken;
    registrationData.paymentAmount = camp.price;

    // Créer l'inscription
    const registration = await CampRegistration.create(registrationData);

    // Incrémenter le nombre de participants si confirmé
    if (registrationData.status !== 'waiting_list') {
      await campService.incrementParticipants(camp.id);
    }

    // TODO: Envoyer email de confirmation
    // await this.sendConfirmationEmail(registration, camp);

    return await this.getRegistrationById(registration.id);
  }

  async getAllRegistrations(filters = {}) {
    const { campId, status, paymentStatus, parentEmail, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const where = {};
    if (campId) where.campId = campId;
    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;
    if (parentEmail) where.parentEmail = parentEmail;

    const { count, rows } = await CampRegistration.findAndCountAll({
      where,
      include: [{
        model: Camp,
        as: 'camp',
        attributes: ['id', 'title', 'titlePl', 'startDate', 'endDate', 'location']
      }],
      limit,
      offset,
      order: [['registrationDate', 'DESC']]
    });

    return {
      registrations: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getRegistrationById(id) {
    const registration = await CampRegistration.findByPk(id, {
      include: [{
        model: Camp,
        as: 'camp',
        attributes: ['id', 'title', 'titlePl', 'startDate', 'endDate', 'location', 'price']
      }]
    });

    if (!registration) {
      throw new HttpNotFoundError('Inscription introuvable');
    }

    return registration;
  }

  async getRegistrationByToken(token) {
    const registration = await CampRegistration.findOne({
      where: { confirmationToken: token },
      include: [{
        model: Camp,
        as: 'camp'
      }]
    });

    if (!registration) {
      throw new HttpNotFoundError('Inscription introuvable');
    }

    return registration;
  }

  async confirmRegistration(token) {
    const registration = await this.getRegistrationByToken(token);

    if (registration.confirmedAt) {
      throw new HttpBadRequestError('Cette inscription a déjà été confirmée');
    }

    registration.status = 'confirmed';
    registration.confirmedAt = new Date();
    await registration.save();

    return registration;
  }

  async updateRegistration(id, updateData) {
    const registration = await CampRegistration.findByPk(id);

    if (!registration) {
      throw new HttpNotFoundError('Inscription introuvable');
    }

    // Empêcher la modification de certains champs critiques
    delete updateData.campId;
    delete updateData.confirmationToken;

    await registration.update(updateData);
    return await this.getRegistrationById(id);
  }

  async cancelRegistration(id, reason = null) {
    const registration = await CampRegistration.findByPk(id);

    if (!registration) {
      throw new HttpNotFoundError('Inscription introuvable');
    }

    if (registration.status === 'cancelled') {
      throw new HttpBadRequestError('Cette inscription est déjà annulée');
    }

    const previousStatus = registration.status;
    registration.status = 'cancelled';
    
    if (reason) {
      registration.comments = `Annulé: ${reason}. ${registration.comments || ''}`;
    }

    await registration.save();

    // Décrémenter le nombre de participants
    if (previousStatus !== 'waiting_list') {
      await campService.decrementParticipants(registration.campId);
    }

    // TODO: Envoyer email d'annulation
    // await this.sendCancellationEmail(registration);

    return registration;
  }

  async deleteRegistration(id) {
    const registration = await CampRegistration.findByPk(id);

    if (!registration) {
      throw new HttpNotFoundError('Inscription introuvable');
    }

    // Décrémenter si nécessaire
    if (registration.status !== 'waiting_list' && registration.status !== 'cancelled') {
      await campService.decrementParticipants(registration.campId);
    }

    await registration.destroy();
    return { success: true, message: 'Inscription supprimée avec succès' };
  }

  async getRegistrationsByCamp(campId) {
    return await CampRegistration.findAll({
      where: { 
        campId,
        status: { [Op.ne]: 'cancelled' }
      },
      order: [['registrationDate', 'ASC']]
    });
  }

  async getRegistrationsByParent(email) {
    return await CampRegistration.findAll({
      where: { parentEmail: email },
      include: [{
        model: Camp,
        as: 'camp',
        attributes: ['id', 'title', 'titlePl', 'startDate', 'endDate', 'location', 'imageUrl']
      }],
      order: [['registrationDate', 'DESC']]
    });
  }

  async markAsPaid(id, paymentAmount, paymentDate = new Date()) {
    const registration = await CampRegistration.findByPk(id);

    if (!registration) {
      throw new HttpNotFoundError('Inscription introuvable');
    }

    registration.paymentStatus = 'completed';
    registration.paymentAmount = paymentAmount;
    registration.paymentDate = paymentDate;
    registration.status = 'paid';

    await registration.save();

    // TODO: Envoyer email de confirmation de paiement
    // await this.sendPaymentConfirmationEmail(registration);

    return registration;
  }

  // Utilitaire pour calculer l'âge
  calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  // TODO: Méthodes d'envoi d'emails (à implémenter avec Nodemailer)
  async sendConfirmationEmail(registration, camp) {
    // Implémenter avec Nodemailer
    console.log(`Email de confirmation envoyé à ${registration.parentEmail}`);
  }

  async sendCancellationEmail(registration) {
    console.log(`Email d'annulation envoyé à ${registration.parentEmail}`);
  }

  async sendPaymentConfirmationEmail(registration) {
    console.log(`Email de confirmation de paiement envoyé à ${registration.parentEmail}`);
  }
}

export default new CampRegistrationService();