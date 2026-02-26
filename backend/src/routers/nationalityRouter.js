import express from 'express';
import nationalityController from '../controllers/nationality.controller.js';

const router = express.Router();

router.get('/', nationalityController.getAll);

export default router;