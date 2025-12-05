import campRegistrationService from '../services/camp-registration.service.js';

class CampRegistrationController {
  async create(req, res, next) {
    try {
      const registration = await campRegistrationService.createRegistration(req.body);
      res.status(201).json({
        success: true,
        message: 'Inscription créée avec succès',
        data: registration
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await campRegistrationService.getAllRegistrations(req.query);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const registration = await campRegistrationService.getRegistrationById(req.params.id);
      res.status(200).json({
        success: true,
        data: registration
      });
    } catch (error) {
      next(error);
    }
  }

  async getByToken(req, res, next) {
    try {
      const { token } = req.params;
      const registration = await campRegistrationService.getRegistrationByToken(token);
      res.status(200).json({
        success: true,
        data: registration
      });
    } catch (error) {
      next(error);
    }
  }

  async confirm(req, res, next) {
    try {
      const { token } = req.params;
      const registration = await campRegistrationService.confirmRegistration(token);
      res.status(200).json({
        success: true,
        message: 'Inscription confirmée avec succès',
        data: registration
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const registration = await campRegistrationService.updateRegistration(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Inscription mise à jour avec succès',
        data: registration
      });
    } catch (error) {
      next(error);
    }
  }

  async cancel(req, res, next) {
    try {
      const { reason } = req.body;
      const registration = await campRegistrationService.cancelRegistration(req.params.id, reason);
      res.status(200).json({
        success: true,
        message: 'Inscription annulée avec succès',
        data: registration
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await campRegistrationService.deleteRegistration(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }

  async getByCamp(req, res, next) {
    try {
      const registrations = await campRegistrationService.getRegistrationsByCamp(req.params.campId);
      res.status(200).json({
        success: true,
        data: registrations
      });
    } catch (error) {
      next(error);
    }
  }

  async getByParentEmail(req, res, next) {
    try {
      const { email } = req.query;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email requis'
        });
      }

      const registrations = await campRegistrationService.getRegistrationsByParent(email);
      res.status(200).json({
        success: true,
        data: registrations
      });
    } catch (error) {
      next(error);
    }
  }

  async markAsPaid(req, res, next) {
    try {
      const { paymentAmount, paymentDate } = req.body;
      const registration = await campRegistrationService.markAsPaid(
        req.params.id, 
        paymentAmount, 
        paymentDate
      );
      res.status(200).json({
        success: true,
        message: 'Paiement enregistré avec succès',
        data: registration
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CampRegistrationController();