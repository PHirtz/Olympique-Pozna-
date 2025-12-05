import Camp from '../models/camp.model.js';
import { Op } from 'sequelize';
import { HttpNotFoundError } from '../errors/http.errors.js';

class CampService {
  async createCamp(campData) {
    const camp = await Camp.create(campData);
    return camp;
  }

  async getAllCamps(filters = {}) {
    const { type, status, level, year, upcoming, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const where = {};
    
    if (type) where.type = type;
    if (status) where.status = status;
    if (level) where.level = level;
    
    // Filtrer par année
    if (year) {
      where.startDate = {
        [Op.gte]: new Date(`${year}-01-01`),
        [Op.lt]: new Date(`${parseInt(year) + 1}-01-01`)
      };
    }
    
    // Filtrer les camps à venir
    if (upcoming === true || upcoming === 'true') {
      where.startDate = { [Op.gte]: new Date() };
      where.status = { [Op.in]: ['open', 'draft'] };
    }

    const { count, rows } = await Camp.findAndCountAll({
      where,
      limit,
      offset,
      order: [['startDate', 'ASC']]
    });

    return {
      camps: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getCampById(id) {
    const camp = await Camp.findByPk(id);

    if (!camp) {
      throw new HttpNotFoundError('Camp/Stage introuvable');
    }

    return camp;
  }

  async updateCamp(id, updateData) {
    const camp = await Camp.findByPk(id);

    if (!camp) {
      throw new HttpNotFoundError('Camp/Stage introuvable');
    }

    await camp.update(updateData);
    return camp;
  }

  async deleteCamp(id) {
    const camp = await Camp.findByPk(id);

    if (!camp) {
      throw new HttpNotFoundError('Camp/Stage introuvable');
    }

    await camp.destroy();
    return { success: true, message: 'Camp/Stage supprimé avec succès' };
  }

  async getUpcomingCamps(limit = 10) {
    return await Camp.findAll({
      where: {
        startDate: { [Op.gte]: new Date() },
        status: { [Op.in]: ['open', 'draft'] },
        isActive: true
      },
      limit,
      order: [['startDate', 'ASC']]
    });
  }

  async getCampsBySeason(type, year = new Date().getFullYear()) {
    return await Camp.findAll({
      where: {
        type,
        startDate: {
          [Op.gte]: new Date(`${year}-01-01`),
          [Op.lt]: new Date(`${parseInt(year) + 1}-01-01`)
        },
        isActive: true
      },
      order: [['startDate', 'ASC']]
    });
  }

  async getAvailableCamps() {
    return await Camp.findAll({
      where: {
        status: 'open',
        startDate: { [Op.gte]: new Date() },
        [Op.or]: [
          { registrationDeadline: null },
          { registrationDeadline: { [Op.gte]: new Date() } }
        ],
        isActive: true
      },
      order: [['startDate', 'ASC']]
    });
  }

  async incrementParticipants(id) {
    const camp = await Camp.findByPk(id);

    if (!camp) {
      throw new HttpNotFoundError('Camp/Stage introuvable');
    }

    if (camp.currentParticipants >= camp.maxParticipants) {
      throw new Error('Camp complet');
    }

    camp.currentParticipants += 1;

    // Mettre à jour le statut si complet
    if (camp.currentParticipants >= camp.maxParticipants) {
      camp.status = 'full';
    }

    await camp.save();
    return camp;
  }

  async decrementParticipants(id) {
    const camp = await Camp.findByPk(id);

    if (!camp) {
      throw new HttpNotFoundError('Camp/Stage introuvable');
    }

    if (camp.currentParticipants > 0) {
      camp.currentParticipants -= 1;

      // Remettre en "open" si ce n'était plus le cas
      if (camp.status === 'full' && camp.currentParticipants < camp.maxParticipants) {
        camp.status = 'open';
      }

      await camp.save();
    }

    return camp;
  }
}

export default new CampService();