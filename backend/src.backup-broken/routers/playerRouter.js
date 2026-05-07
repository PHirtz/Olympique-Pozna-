// ==============================================
// ROUTES API - PLAYERS (JOUEURS)
// ==============================================

import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { upload, deleteFile, getPublicUrl } from '../config/upload.js';
import { authMiddleware as authenticateToken, requireRole } from '../middlewares/auth.middleware.js';
import db from '../database/db.js';

const router = express.Router();

// ==============================================
// VALIDATION MIDDLEWARE
// ==============================================

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  next();
};

// ==============================================
// GET /api/players - Liste tous les joueurs
// ==============================================

router.get('/',
  [
    query('teamId').optional().isInt(),
    query('isActive').optional().isIn(['true', 'false']),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
  ],
  validate,
  async (req, res) => {
    try {
      console.log('🎯 Route GET / appelée');
      console.log('🎯 Query params:', req.query);
      
      const { teamId, isActive, page = 1, limit = 20 } = req.query;
      const offset = (page - 1) * limit;

      let whereConditions = [];

      if (teamId) {
        whereConditions.push(`p.team_id = ${parseInt(teamId)}`);
      }

      if (isActive !== undefined) {
        whereConditions.push(`p.is_active = ${isActive === 'true' ? 1 : 0}`);
      }

      const whereClause = whereConditions.length > 0 
        ? 'WHERE ' + whereConditions.join(' AND ') 
        : '';

      console.log('🎯 WHERE clause:', whereClause);

      // Construire la requête complète avec les valeurs
      const sqlQuery = `
        SELECT 
          p.*,
          t.name as teamName,
          t.name_pl as teamNamePl,
          t.category as teamCategory
        FROM players p
        LEFT JOIN teams t ON p.team_id = t.id
        ${whereClause}
        ORDER BY p.jersey_number ASC, p.last_name, p.first_name
        LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}
      `;

      console.log('🎯 SQL final:', sqlQuery);

      const players = await db.query(sqlQuery, {
        type: db.QueryTypes.SELECT
      });

      console.log('✅ Nombre de joueurs trouvés:', players.length);
      console.log('✅ Premier joueur:', players[0]);

      // Compter le total
      const countQuery = `
        SELECT COUNT(*) as total
        FROM players p
        ${whereClause}
      `;

      const countResult = await db.query(countQuery, {
        type: db.QueryTypes.SELECT
      });

      const total = countResult && countResult.length > 0 ? countResult[0].total : 0;

      res.json({
        success: true,
        data: {
          players: players.map(formatPlayer),
          pagination: {
            total: parseInt(total),
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(total / limit)
          }
        }
      });
    } catch (error) {
      console.error('Erreur récupération joueurs:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur serveur',
        error: error.message
      });
    }
  }
);

// ==============================================
// GET /api/players/:id - Détails d'un joueur
// ==============================================

router.get('/:id',
  [param('id').isInt()],
  validate,
  async (req, res) => {
    try {
      const players = await db.query(`
        SELECT 
          p.*,
          t.name as teamName,
          t.name_pl as teamNamePl,
          t.category as teamCategory
        FROM players p
        LEFT JOIN teams t ON p.team_id = t.id
        WHERE p.id = :id
      `, {
        replacements: { id: req.params.id },
        type: db.QueryTypes.SELECT
      });

      if (players.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Joueur non trouvé' 
        });
      }

      res.json({
        success: true,
        data: formatPlayer(players[0])
      });
    } catch (error) {
      console.error('Erreur récupération joueur:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur serveur' 
      });
    }
  }
);

// ==============================================
// POST /api/players - Créer un joueur
// ==============================================

router.post('/',
  authenticateToken,
  requireRole(['admin', 'coach']),
  upload.single('photo'),
  [
    body('teamId').isInt().withMessage('Team ID requis'),
    body('firstName').trim().notEmpty().withMessage('Prénom requis'),
    body('lastName').trim().notEmpty().withMessage('Nom requis'),
    body('nickname').optional().trim(),
    body('jerseyNumber').optional().isInt({ min: 0, max: 99 }),
    body('position').trim().notEmpty(),
    body('positionPl').trim().notEmpty(),
    body('birthYear').isInt({ min: 1950, max: new Date().getFullYear() }),
    body('nationality').trim().notEmpty(),
    body('nationalityPl').trim().notEmpty(),
    body('distinction1').optional().trim(),
    body('distinction2').optional().trim(),
    body('distinction3').optional().trim(),
    body('distinction4').optional().trim(),
    body('distinction5').optional().trim(),
    body('isActive').optional().isBoolean(),
  ],
  validate,
  async (req, res) => {
    try {
      const {
        teamId, firstName, lastName, nickname, jerseyNumber,
        position, positionPl, birthYear, nationality, nationalityPl,
        distinction1, distinction2, distinction3, distinction4, distinction5,
        isActive = true
      } = req.body;

      const photoPath = req.file ? getPublicUrl(req.file.filename, 'players') : null;

      const result = await db.query(`
        INSERT INTO players (
          team_id, first_name, last_name, nickname, jersey_number,
          position, position_pl, birth_year, nationality, nationality_pl,
          photo_path, distinction1, distinction2, distinction3, distinction4, distinction5,
          is_active, created_at, updated_at
        ) VALUES (:teamId, :firstName, :lastName, :nickname, :jerseyNumber, 
                  :position, :positionPl, :birthYear, :nationality, :nationalityPl,
                  :photoPath, :distinction1, :distinction2, :distinction3, :distinction4, :distinction5,
                  :isActive, NOW(), NOW())
      `, {
        replacements: {
          teamId, firstName, lastName, nickname: nickname || null, jerseyNumber: jerseyNumber || null,
          position, positionPl, birthYear, nationality, nationalityPl,
          photoPath, distinction1: distinction1 || null, distinction2: distinction2 || null, 
          distinction3: distinction3 || null, distinction4: distinction4 || null, distinction5: distinction5 || null,
          isActive: isActive ? 1 : 0
        },
        type: db.QueryTypes.INSERT
      });

      const players = await db.query('SELECT * FROM players WHERE id = :id', {
        replacements: { id: result[0] },
        type: db.QueryTypes.SELECT
      });

      res.status(201).json({
        success: true,
        message: 'Joueur créé avec succès',
        data: formatPlayer(players[0])
      });
    } catch (error) {
      if (req.file) {
        deleteFile(getPublicUrl(req.file.filename, 'players'));
      }
      console.error('Erreur création joueur:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur serveur' 
      });
    }
  }
);

// ==============================================
// PUT /api/players/:id - Modifier un joueur
// ==============================================

router.put('/:id',
  authenticateToken,
  requireRole(['admin', 'coach']),
  upload.single('photo'),
  [
    param('id').isInt(),
    body('teamId').optional().isInt(),
    body('firstName').optional().trim().notEmpty(),
    body('lastName').optional().trim().notEmpty(),
    body('nickname').optional().trim(),
    body('jerseyNumber').optional().isInt({ min: 0, max: 99 }),
    body('position').optional().trim(),
    body('positionPl').optional().trim(),
    body('birthYear').optional().isInt({ min: 1950, max: new Date().getFullYear() }),
    body('nationality').optional().trim(),
    body('nationalityPl').optional().trim(),
    body('distinction1').optional().trim(),
    body('distinction2').optional().trim(),
    body('distinction3').optional().trim(),
    body('distinction4').optional().trim(),
    body('distinction5').optional().trim(),
    body('isActive').optional().isBoolean(),
  ],
  validate,
  async (req, res) => {
    try {
      const existingPlayers = await db.query('SELECT * FROM players WHERE id = :id', {
        replacements: { id: req.params.id },
        type: db.QueryTypes.SELECT
      });
      
      if (existingPlayers.length === 0) {
        if (req.file) {
          deleteFile(getPublicUrl(req.file.filename, 'players'));
        }
        return res.status(404).json({ 
          success: false, 
          message: 'Joueur non trouvé' 
        });
      }

      const existingPlayer = existingPlayers[0];
      const updates = { ...req.body };

      if (req.file) {
        if (existingPlayer.photo_path) {
          deleteFile(existingPlayer.photo_path);
        }
        updates.photoPath = getPublicUrl(req.file.filename, 'players');
      }

      const fields = [];
      const replacements = { id: req.params.id };

      const fieldMapping = {
        teamId: 'team_id',
        firstName: 'first_name',
        lastName: 'last_name',
        nickname: 'nickname',
        jerseyNumber: 'jersey_number',
        position: 'position',
        positionPl: 'position_pl',
        birthYear: 'birth_year',
        nationality: 'nationality',
        nationalityPl: 'nationality_pl',
        photoPath: 'photo_path',
        distinction1: 'distinction1',
        distinction2: 'distinction2',
        distinction3: 'distinction3',
        distinction4: 'distinction4',
        distinction5: 'distinction5',
        isActive: 'is_active'
      };

      Object.entries(updates).forEach(([key, value]) => {
        if (fieldMapping[key]) {
          fields.push(`${fieldMapping[key]} = :${key}`);
          replacements[key] = key === 'isActive' ? (value ? 1 : 0) : value;
        }
      });

      if (fields.length > 0) {
        fields.push('updated_at = NOW()');

        await db.query(`
          UPDATE players 
          SET ${fields.join(', ')}
          WHERE id = :id
        `, {
          replacements,
          type: db.QueryTypes.UPDATE
        });
      }

      const updatedPlayers = await db.query('SELECT * FROM players WHERE id = :id', {
        replacements: { id: req.params.id },
        type: db.QueryTypes.SELECT
      });

      res.json({
        success: true,
        message: 'Joueur modifié avec succès',
        data: formatPlayer(updatedPlayers[0])
      });
    } catch (error) {
      if (req.file) {
        deleteFile(getPublicUrl(req.file.filename, 'players'));
      }
      console.error('Erreur modification joueur:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur serveur' 
      });
    }
  }
);

// ==============================================
// DELETE /api/players/:id - Supprimer un joueur
// ==============================================

router.delete('/:id',
  authenticateToken,
  requireRole(['admin']),
  [param('id').isInt()],
  validate,
  async (req, res) => {
    try {
      const players = await db.query('SELECT photo_path FROM players WHERE id = :id', {
        replacements: { id: req.params.id },
        type: db.QueryTypes.SELECT
      });
      
      if (players.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Joueur non trouvé' 
        });
      }

      if (players[0].photo_path) {
        deleteFile(players[0].photo_path);
      }

      await db.query('DELETE FROM players WHERE id = :id', {
        replacements: { id: req.params.id },
        type: db.QueryTypes.DELETE
      });

      res.json({
        success: true,
        message: 'Joueur supprimé avec succès'
      });
    } catch (error) {
      console.error('Erreur suppression joueur:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur serveur' 
      });
    }
  }
);

// ==============================================
// HELPER - Formater un joueur
// ==============================================

function formatPlayer(player) {
  return {
    id: player.id,
    teamId: player.team_id,
    teamName: player.teamName || null,
    teamNamePl: player.teamNamePl || null,
    teamCategory: player.teamCategory || null,
    firstName: player.first_name,
    lastName: player.last_name,
    nickname: player.nickname,
    jerseyNumber: player.jersey_number,
    position: player.position,
    positionPl: player.position_pl,
    birthYear: player.birth_year,
    nationality: player.nationality,
    nationalityPl: player.nationality_pl,
    photoUrl: player.photo_url,
    photoPath: player.photo_path,
    distinction1: player.distinction1,
    distinction2: player.distinction2,
    distinction3: player.distinction3,
    distinction4: player.distinction4,
    distinction5: player.distinction5,
    isActive: Boolean(player.is_active),
    createdAt: player.created_at,
    updatedAt: player.updated_at
  };
}

export default router;