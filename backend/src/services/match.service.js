import Match from '../models/match.model.js';
import Team from '../models/team.model.js';
import { Op } from 'sequelize';

class MatchService {
  async createMatch(matchData) {
    const match = await Match.create(matchData);
    return await this.getMatchById(match.id);
  }

  async getAllMatches(filters = {}) {
    const { teamId, status, isHome, startDate, endDate, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const where = {};
    if (teamId) where.teamId = teamId;
    if (status) where.status = status;
    if (isHome !== undefined) where.isHome = isHome;
    
    if (startDate || endDate) {
      where.matchDate = {};
      if (startDate) where.matchDate[Op.gte] = new Date(startDate);
      if (endDate) where.matchDate[Op.lte] = new Date(endDate);
    }

    const { count, rows } = await Match.findAndCountAll({
      where,
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'namePl', 'category']
      }],
      limit,
      offset,
      order: [['matchDate', 'DESC']]
    });

    return {
      matches: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getMatchById(id) {
    const match = await Match.findByPk(id, {
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'namePl', 'category', 'imageUrl']
      }]
    });

    if (!match) {
      throw new Error('Match introuvable');
    }

    return match;
  }

  async updateMatch(id, updateData) {
    const match = await Match.findByPk(id);
    
    if (!match) {
      throw new Error('Match introuvable');
    }

    await match.update(updateData);
    return await this.getMatchById(id);
  }

  async deleteMatch(id) {
    const match = await Match.findByPk(id);
    
    if (!match) {
      throw new Error('Match introuvable');
    }

    await match.destroy();
    return { message: 'Match supprimé avec succès' };
  }

  async getUpcomingMatches(teamId = null, limit = 10) {
    const limitNumber = parseInt(limit) || 10;  // ← AJOUTE
    
    const where = {
      matchDate: { [Op.gte]: new Date() },
      status: { [Op.in]: ['scheduled', 'in_progress'] }
    };
    if (teamId) where.teamId = teamId;
    
    return await Match.findAll({
      where,
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'namePl', 'category']
      }],
      limit: limitNumber,  // ← CHANGE
      order: [['matchDate', 'ASC']]
    });
  }

  async getPastMatches(teamId = null, limit = 10) {
    const limitNumber = parseInt(limit) || 10;  // ← AJOUTE
    
    const where = {
      matchDate: { [Op.lt]: new Date() },
      status: 'finished'
    };
    if (teamId) where.teamId = teamId;
    
    return await Match.findAll({
      where,
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'namePl', 'category']
      }],
      limit: limitNumber,  // ← CHANGE
      order: [['matchDate', 'DESC']]
    });
  }

  async getMatchesByTeam(teamId, filters = {}) {
    const { status, startDate, endDate } = filters;
    
    const where = { teamId };
    if (status) where.status = status;
    
    if (startDate || endDate) {
      where.matchDate = {};
      if (startDate) where.matchDate[Op.gte] = new Date(startDate);
      if (endDate) where.matchDate[Op.lte] = new Date(endDate);
    }

    return await Match.findAll({
      where,
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'namePl', 'category']
      }],
      order: [['matchDate', 'DESC']]
    });
  }
}

export default new MatchService();