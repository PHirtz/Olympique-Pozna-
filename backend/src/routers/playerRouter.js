// ==============================================
// ROUTES API - PLAYERS (JOUEURS)
// ==============================================

import express from 'express';
import { body, param, query, validationResult } from 'express-validator';
import { upload } from '../config/upload.js';
import { authMiddleware as authenticateToken, requireRole } from '../middlewares/auth.middleware.js';
import { playerController } from '../controllers/player.controller.js';

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
// MIDDLEWARE UPLOAD OPTIONNEL
// ==============================================
// Ce middleware permet l'upload optionnel : 
// soit un fichier, soit une URL dans le body

const optionalUpload = (req, res, next) => {
  // Si pas de fichier dans la requête, on continue sans erreur
  upload.single('photo')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ 
        success: false, 
        message: err.message 
      });
    }
    next();
  });
};

// ==============================================
// VALIDATION RULES
// ==============================================

const playerValidationRules = [
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
  body('photoUrl').optional().trim().isURL().withMessage('URL de photo invalide'),
  body('distinction1').optional().trim(),
  body('distinction2').optional().trim(),
  body('distinction3').optional().trim(),
  body('distinction4').optional().trim(),
  body('distinction5').optional().trim(),
  body('isActive').optional().isBoolean(),
];

const updateValidationRules = [
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
  body('photoUrl').optional().trim().isURL().withMessage('URL de photo invalide'),
  body('distinction1').optional().trim(),
  body('distinction2').optional().trim(),
  body('distinction3').optional().trim(),
  body('distinction4').optional().trim(),
  body('distinction5').optional().trim(),
  body('isActive').optional().isBoolean(),
];

// ==============================================
// ROUTES
// ==============================================

// GET /api/players - Liste tous les joueurs
router.get('/',
  [
    query('teamId').optional().isInt(),
    query('isActive').optional().isBoolean(),
    query('page').optional().isInt({ min: 1 }).default(1),
    query('limit').optional().isInt({ min: 1, max: 100 }).default(20),
  ],
  validate,
  playerController.getAll.bind(playerController)
);

// GET /api/players/:id - Détails d'un joueur
router.get('/:id',
  [param('id').isInt()],
  validate,
  playerController.getById.bind(playerController)
);

// POST /api/players - Créer un joueur
router.post('/',
  authenticateToken,
  requireRole('admin'),
  optionalUpload, // ← Upload optionnel (fichier OU URL)
  playerValidationRules,
  validate,
  playerController.create.bind(playerController)
);

// PUT /api/players/:id - Modifier un joueur
router.put('/:id',
  authenticateToken,
  requireRole('admin'),
  optionalUpload, // ← Upload optionnel (fichier OU URL)
  updateValidationRules,
  validate,
  playerController.update.bind(playerController)
);

// DELETE /api/players/:id - Supprimer un joueur
router.delete('/:id',
  authenticateToken,
  requireRole('admin'),
  [param('id').isInt()],
  validate,
  playerController.delete.bind(playerController)
);

export default router;