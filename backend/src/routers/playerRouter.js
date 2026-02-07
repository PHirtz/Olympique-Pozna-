import express from 'express';
import { param, query, validationResult } from 'express-validator';
import { upload } from '../config/upload.js';
import { authMiddleware as authenticateToken, requireRole } from '../middlewares/auth.middleware.js';
import { playerController } from '../controllers/player.controller.js';

const router = express.Router();

const jsonParser = express.json({ limit: '50mb' });

// ==============================================
// VALIDATION MIDDLEWARE
// ==============================================
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('❌ Erreurs de validation:', errors.array());
    return res.status(400).json({ 
      success: false, 
      errors: errors.array() 
    });
  }
  next();
};

// ==============================================
// ROUTES ADMIN DOIVENT ÊTRE AVANT LES ROUTES PUBLIQUES /:id
// ==============================================

// GET /api/players/admin - Liste admin avec pagination
router.get('/admin',
  authenticateToken,
  requireRole('admin'),
  playerController.getAll.bind(playerController)
);

// POST /api/players/admin - Créer un joueur
router.post('/admin',
  authenticateToken,
  requireRole('admin'),
  jsonParser,
  playerController.handleBase64Photo.bind(playerController),
  upload.single('photo'),
  playerController.create.bind(playerController)
);

// GET /api/players/admin/:id - Détails pour admin
router.get('/admin/:id',
  authenticateToken,
  requireRole('admin'),
  [param('id').isInt()],
  validate,
  playerController.getById.bind(playerController)
);

// PUT /api/players/admin/:id - Modifier
router.put('/admin/:id',
  authenticateToken,
  requireRole('admin'),
  jsonParser, // ← AJOUT : Parser AVANT handleBase64Photo
  playerController.handleBase64Photo.bind(playerController),
  upload.single('photo'),
  [param('id').isInt()],
  validate,
  playerController.update.bind(playerController)
);

// DELETE /api/players/admin/:id - Supprimer un joueur (admin)
router.delete('/admin/:id',
  authenticateToken,
  requireRole('admin'),
  [param('id').isInt()],
  validate,
  playerController.delete.bind(playerController)
);

// ==============================================
// ROUTES PUBLIQUES (APRÈS LES ROUTES ADMIN)
// ==============================================

// GET /api/players - Liste tous les joueurs (public)
router.get('/', playerController.getAll.bind(playerController));

// GET /api/players/:id - Détails d'un joueur (public)
router.get('/:id',
  [param('id').isInt()],
  validate,
  playerController.getById.bind(playerController)
);

export default router;