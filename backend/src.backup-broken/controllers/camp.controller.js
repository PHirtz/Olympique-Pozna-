import campService from '../services/camp.service.js';

class CampController {
  async create(req, res, next) {
    try {
      const camp = await campService.createCamp(req.body);
      res.status(201).json({
        success: true,
        message: 'Camp/Stage créé avec succès',
        data: camp
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await campService.getAllCamps(req.query);
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
      const camp = await campService.getCampById(req.params.id);
      res.status(200).json({
        success: true,
        data: camp
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const camp = await campService.updateCamp(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Camp/Stage mis à jour avec succès',
        data: camp
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await campService.deleteCamp(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }

  async getUpcoming(req, res, next) {
    try {
      const camps = await campService.getUpcomingCamps(req.query.limit);
      res.status(200).json({
        success: true,
        data: camps
      });
    } catch (error) {
      next(error);
    }
  }

  async getAvailable(req, res, next) {
    try {
      const camps = await campService.getAvailableCamps();
      res.status(200).json({
        success: true,
        data: camps
      });
    } catch (error) {
      next(error);
    }
  }

  async getBySeason(req, res, next) {
    try {
      const { type } = req.params;
      const { year } = req.query;
      const camps = await campService.getCampsBySeason(type, year);
      res.status(200).json({
        success: true,
        data: camps
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new CampController();