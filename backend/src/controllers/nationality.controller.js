import nationalityService from '../services/nationality.service.js';

class NationalityController {
  async getAll(req, res, next) {
    try {
      const { locale } = req.query;
      const nationalities = await nationalityService.getAllNationalities(locale);
      
      res.status(200).json({
        success: true,
        data: nationalities
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NationalityController();