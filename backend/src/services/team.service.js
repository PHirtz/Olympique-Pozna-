import Team from '../models/team.model.js';
import User from '../models/user.model.js';

class TeamService {
  async createTeam(teamData) {
    const team = await Team.create(teamData);
    return team;
  }

  async getAllTeams(filters = {}) {
    const { category, gender, season, isActive, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const where = {};
    if (category) where.category = category;
    if (gender) where.gender = gender;
    if (season) where.season = season;
    if (isActive !== undefined) where.isActive = isActive;

    const { count, rows } = await Team.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'coach',
          attributes: ['id', 'firstName', 'lastName', 'imageUrl']
        },
        {
          model: User,
          as: 'players',
          attributes: ['id', 'firstName', 'lastName', 'playerNumber', 'position', 'imageUrl']
        }
      ],
      limit,
      offset,
      order: [['category', 'ASC'], ['createdAt', 'DESC']]
    });

    return {
      teams: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getTeamById(id) {
    const team = await Team.findByPk(id, {
      include: [
        {
          model: User,
          as: 'coach',
          attributes: ['id', 'firstName', 'lastName', 'email', 'phoneNumber', 'imageUrl']
        },
        {
          model: User,
          as: 'players',
          attributes: ['id', 'firstName', 'lastName', 'playerNumber', 'position', 'dateOfBirth', 'imageUrl'],
          order: [['playerNumber', 'ASC']]
        }
      ]
    });

    if (!team) {
      throw new Error('Équipe introuvable');
    }

    return team;
  }

  async updateTeam(id, updateData) {
    const team = await Team.findByPk(id);
    
    if (!team) {
      throw new Error('Équipe introuvable');
    }

    await team.update(updateData);
    return team;
  }

  async deleteTeam(id) {
    const team = await Team.findByPk(id);
    
    if (!team) {
      throw new Error('Équipe introuvable');
    }

    await team.destroy();
    return { message: 'Équipe supprimée avec succès' };
  }

  async getTeamsBySeason(season) {
    return await Team.findAll({
      where: { season, isActive: true },
      include: [
        {
          model: User,
          as: 'coach',
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      order: [['category', 'ASC']]
    });
  }

  async getTeamsByCategory(category) {
    return await Team.findAll({
      where: { category, isActive: true },
      include: [
        {
          model: User,
          as: 'coach',
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      order: [['season', 'DESC']]
    });
  }
}

export default new TeamService();