import express from 'express';
import contactController from '../controllers/contact.controller.js';
import { authenticate, authorize } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { contactCreateSchema } from '../schemas/contact.schema.js';

const router = express.Router();

// Route publique : Créer un message de contact
router.post('/', validate(contactCreateSchema), contactController.create);

// Routes admin : Gérer les messages
router.get('/', authenticate, authorize(['admin']), contactController.getAll);
router.get('/:id', authenticate, authorize(['admin']), contactController.getById);
router.patch('/:id/status', authenticate, authorize(['admin']), contactController.updateStatus);
router.delete('/:id', authenticate, authorize(['admin']), contactController.delete);

export default router;