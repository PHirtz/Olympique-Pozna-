import express from 'express';
import userController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware, requireRole, requireOwnership } from '../middlewares/auth.middleware.js';
import { userCreateSchema, userUpdateSchema, userLoginSchema, userQuerySchema } from '../schemas/user.schema.js';

const router = express.Router();

// ============================================
// ROUTES PUBLIQUES (sans authentification)
// ============================================

/**
 * POST /api/users/login
 * Connexion utilisateur
 */
router.post('/login', validate(userLoginSchema), userController.login);

/**
 * GET /api/users/search?q=query
 * Recherche d'utilisateurs (profils publics)
 */
router.get('/search', userController.search);

/**
 * GET /api/users/coaches
 * Liste de tous les coachs
 */
router.get('/coaches', userController.getCoaches);

/**
 * GET /api/users/:id
 * Profil public d'un utilisateur
 */
router.get('/:id', userController.getById);

/**
 * GET /api/users/:id/statistics?season=2024-2025
 * Statistiques publiques d'un joueur
 */
router.get('/:id/statistics', userController.getUserWithStatistics);

/**
 * GET /api/users/team/:teamId/players
 * Liste des joueurs d'une équipe
 */
router.get('/team/:teamId/players', userController.getPlayersByTeam);

// ============================================
// ROUTES PROTÉGÉES (authentification requise)
// ============================================

/**
 * GET /api/users/me/profile
 * Récupérer son profil complet
 * Nécessite: Token JWT
 */
router.get('/me/profile', authMiddleware, userController.getProfile);

/**
 * PUT /api/users/me/profile
 * Modifier son profil
 * Nécessite: Token JWT
 * Body: { firstName, lastName, bio, phoneNumber, etc. }
 */
router.put('/me/profile', authMiddleware, userController.updateProfile);

/**
 * PUT /api/users/me/password
 * Changer son mot de passe
 * Nécessite: Token JWT
 * Body: { currentPassword, newPassword }
 */
router.put('/me/password', authMiddleware, userController.updatePassword);

/**
 * PUT /api/users/me/picture
 * Changer sa photo de profil
 * Nécessite: Token JWT
 * Body: { imageUrl, imagePath }
 */
router.put('/me/picture', authMiddleware, userController.updateProfilePicture);

// ============================================
// ROUTES ADMIN (role: admin uniquement)
// ============================================

/**
 * POST /api/users
 * Créer un nouvel utilisateur
 * Nécessite: Token JWT + Role Admin
 */
router.post(
  '/',
  authMiddleware,
  requireRole('admin'),
  validate(userCreateSchema),
  userController.create
);

/**
 * GET /api/users
 * Liste de tous les utilisateurs (avec données complètes)
 * Nécessite: Token JWT + Role Admin
 */
router.get(
  '/',
  authMiddleware,
  requireRole('admin'),
  validate(userQuerySchema),
  userController.getAll
);

/**
 * PUT /api/users/:id
 * Modifier un utilisateur (par admin)
 * Nécessite: Token JWT + Role Admin
 */
router.put(
  '/:id',
  authMiddleware,
  requireRole('admin'),
  validate(userUpdateSchema),
  userController.update
);

/**
 * DELETE /api/users/:id
 * Supprimer un utilisateur
 * Nécessite: Token JWT + Role Admin
 */
router.delete(
  '/:id',
  authMiddleware,
  requireRole('admin'),
  userController.delete
);

// ============================================
// ROUTES COACH (role: coach ou admin)
// ============================================

/**
 * PUT /api/users/:id/player-info
 * Modifier les infos d'un joueur (numéro, position)
 * Nécessite: Token JWT + Role Coach ou Admin
 */
// router.put(
//   '/:id/player-info',
//   authMiddleware,
//   requireRole('coach', 'admin'),
//   userController.updatePlayerInfo
// );

export default router;