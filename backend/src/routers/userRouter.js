import express from 'express';
import userController from '../controllers/user.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { userCreateSchema, userUpdateSchema, userLoginSchema, userQuerySchema } from '../schemas/user.schema.js';

const router = express.Router();

// Routes publiques
router.post('/login', validate(userLoginSchema), userController.login);
router.get('/search', userController.search);

// Routes CRUD
router.post('/', validate(userCreateSchema), userController.create);
router.get('/', validate(userQuerySchema), userController.getAll);
router.get('/:id', userController.getById);
router.put('/:id', validate(userUpdateSchema), userController.update);
router.delete('/:id', userController.delete);

// Routes spécifiques
router.get('/team/:teamId/players', userController.getPlayersByTeam);

export default router;