import { Player, Team } from '../models/index.js';

export const getPlayersByTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    const players = await Player.findAll({
      where: { 
        teamId: teamId,
        isActive: true 
      },
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name']
      }],
      order: [['jerseyNumber', 'ASC']]
    });

    res.json({
      success: true,
      data: players
    });
  } catch (error) {
    console.error('Erreur récupération joueurs équipe:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des joueurs'
    });
  }
};

// Endpoint public pour tous les joueurs actifs
export const getPublicPlayers = async (req, res) => {
  try {
    const { teamId } = req.query;

    const whereClause = {
      isActive: true
    };

    if (teamId) {
      whereClause.teamId = teamId;
    }

    const players = await Player.findAll({
      where: whereClause,
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name']
      }],
      order: [
        ['teamId', 'ASC'],
        ['jerseyNumber', 'ASC']
      ]
    });

    res.json({
      success: true,
      data: players
    });
  } catch (error) {
    console.error('Erreur récupération joueurs publics:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des joueurs'
    });
  }
};