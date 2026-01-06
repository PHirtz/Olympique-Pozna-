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
    query('isActive').optional().isBoolean(),
    query('page').optional().isInt({ min: 1 }).default(1),
    query('limit').optional().isInt({ min: 1, max: 100 }).default(20),
  ],
  validate,
  async (req, res) => {
    try {
      const { teamId, isActive, page = 1, limit = 20 } = req.query;
      const offset = (page - 1) * limit;

      let whereConditions = [];
      let replacements = {};

      if (teamId) {
        whereConditions.push('p.team_id = :teamId');
        replacements.teamId = teamId;
      }

      if (isActive !== undefined) {
        whereConditions.push('p.is_active = :isActive');
        replacements.isActive = isActive === 'true' ? 1 : 0;
      }

      const whereClause = whereConditions.length > 0 
        ? 'WHERE ' + whereConditions.join(' AND ') 
        : '';

      // Récupérer les joueurs avec infos de l'équipe
      const [players] = await db.query(`
        SELECT 
          p.*,
          t.name as teamName,
          t.name_pl as teamNamePl,
          t.category as teamCategory
        FROM players p
        LEFT JOIN teams t ON p.team_id = t.id
        ${whereClause}
        ORDER BY t.name, p.last_name, p.first_name
        LIMIT :limit OFFSET :offset
      `, { ...replacements, limit: parseInt(limit), offset: parseInt(offset) });

      // Compter le total
      const [[{ total }]] = await db.query(`
        SELECT COUNT(*) as total
        FROM players p
        ${whereClause}
      `, replacements);

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
        message: 'Erreur serveur' 
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
      const [players] = await db.query(`
        SELECT 
          p.*,
          t.name as teamName,
          t.name_pl as teamNamePl,
          t.category as teamCategory
        FROM players p
        LEFT JOIN teams t ON p.team_id = t.id
        WHERE p.id = ?
      `, [req.params.id]);

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

      // Générer le chemin de la photo si uploadée
      const photoPath = req.file ? getPublicUrl(req.file.filename, 'players') : null;

      const [result] = await db.query(`
        INSERT INTO players (
          team_id, first_name, last_name, nickname, jersey_number,
          position, position_pl, birth_year, nationality, nationality_pl,
          photo_path, distinction1, distinction2, distinction3, distinction4, distinction5,
          is_active, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `, [
        teamId, firstName, lastName, nickname || null, jerseyNumber || null,
        position, positionPl, birthYear, nationality, nationalityPl,
        photoPath, distinction1 || null, distinction2 || null, distinction3 || null,
        distinction4 || null, distinction5 || null, isActive ? 1 : 0
      ]);

      // Récupérer le joueur créé
      const [players] = await db.query('SELECT * FROM players WHERE id = ?', [result.insertId]);

      res.status(201).json({
        success: true,
        message: 'Joueur créé avec succès',
        data: formatPlayer(players[0])
      });
    } catch (error) {
      // Supprimer la photo si erreur
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
      // Vérifier que le joueur existe
      const [existingPlayers] = await db.query('SELECT * FROM players WHERE id = ?', [req.params.id]);
      
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

      // Gérer la nouvelle photo
      if (req.file) {
        // Supprimer l'ancienne photo
        if (existingPlayer.photo_path) {
          deleteFile(existingPlayer.photo_path);
        }
        updates.photoPath = getPublicUrl(req.file.filename, 'players');
      }

      // Construire la requête UPDATE dynamiquement
      const fields = [];
      const values = [];

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
          fields.push(`${fieldMapping[key]} = ?`);
          values.push(key === 'isActive' ? (value ? 1 : 0) : value);
        }
      });

      if (fields.length > 0) {
        fields.push('updated_at = NOW()');
        values.push(req.params.id);

        await db.query(`
          UPDATE players 
          SET ${fields.join(', ')}
          WHERE id = ?
        `, values);
      }

      // Récupérer le joueur mis à jour
      const [updatedPlayers] = await db.query('SELECT * FROM players WHERE id = ?', [req.params.id]);

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
      // Récupérer le joueur pour supprimer sa photo
      const [players] = await db.query('SELECT photo_path FROM players WHERE id = ?', [req.params.id]);
      
      if (players.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: 'Joueur non trouvé' 
        });
      }

      // Supprimer la photo
      if (players[0].photo_path) {
        deleteFile(players[0].photo_path);
      }

      // Supprimer le joueur
      await db.query('DELETE FROM players WHERE id = ?', [req.params.id]);

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