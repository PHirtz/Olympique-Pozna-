import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js';

// Import controllers
import userController from '../controllers/user.controller.js';
import { partnerController } from '../controllers/index.controller.js';
import { teamController } from '../controllers/index.controller.js'; 

// Import schemas
import { partnerCreateSchema, partnerUpdateSchema } from '../schemas/others.schema.js';

const router = express.Router();


// ========== TOUTES LES ROUTES ADMIN NÉCESSITENT L'AUTHENTIFICATION ==========
router.use(authMiddleware);
router.use(requireRole('admin'));

// ========== DASHBOARD ==========
router.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    message: 'Bienvenue dans l\'administration',
    data: {
      user: {
        id: req.user.id,
        role: req.user.role,
        email: req.user.email
      }
    }
  });
});

// ========== PARTNERS (SPONSORS) ==========
router.post('/partners', validate(partnerCreateSchema), partnerController.create);
router.get('/partners', partnerController.getAll);
router.get('/partners/:id', partnerController.getById);
router.put('/partners/:id', validate(partnerUpdateSchema), partnerController.update);
router.delete('/partners/:id', partnerController.delete);

// ========== TEAMS ========== 
router.get('/teams/count', teamController.getCount.bind(teamController));
router.get('/teams/:id', teamController.getById.bind(teamController));
router.get('/teams', teamController.getAll.bind(teamController));
router.post('/teams', teamController.create.bind(teamController));
router.put('/teams/:id', teamController.update.bind(teamController));
router.delete('/teams/:id', teamController.delete.bind(teamController));

// ========== USERS (à venir) ==========
// router.get('/users', userController.getAll);
// router.put('/users/:id', userController.update);
// router.delete('/users/:id', userController.delete);

export default router;