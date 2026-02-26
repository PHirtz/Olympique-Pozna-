import Nationality from '../models/nationality.model.js';

class NationalityService {
  async getAllNationalities(locale = 'fr') {
    const nationalities = await Nationality.findAll({
      attributes: ['id', 'code', 'nameFr', 'nameEn', 'namePl', 'flagEmoji'],
      order: [[this.getNameField(locale), 'ASC']]
    });

    return nationalities;
  }

  getNameField(locale) {
    const fields = {
      'fr': 'nameFr',
      'en': 'nameEn',
      'pl': 'namePl'
    };
    return fields[locale] || 'nameFr';
  }
}

export default new NationalityService();