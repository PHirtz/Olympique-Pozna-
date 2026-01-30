import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js';

import playerRouter from './playerRouter.js';

// Import controllers
import userController from '../controllers/user.controller.js';
import campController from '../controllers/camp.controller.js';
import campRegistrationController from '../controllers/camp-registration.controller.js';
import { playerController } from '../controllers/player.controller.js'; 
import { 
  teamController, 
  matchController, 
  newsController, 
  productController,
  eventController,
  galleryController,
  partnerController,
  statisticsController
} from '../controllers/index.controller.js';
import contactController from '../controllers/contact.controller.js';

// Import schemas
import { userCreateSchema, userUpdateSchema, userLoginSchema, userQuerySchema } from '../schemas/user.schema.js';
import { teamCreateSchema, teamUpdateSchema, teamQuerySchema } from '../schemas/team.schema.js';
import { matchCreateSchema, matchUpdateSchema, matchQuerySchema } from '../schemas/match.schema.js';
import { newsCreateSchema, newsUpdateSchema, newsQuerySchema } from '../schemas/news.schema.js';
import { campCreateSchema, campUpdateSchema, campQuerySchema } from '../schemas/camp.schema.js';
import { campRegistrationCreateSchema, campRegistrationUpdateSchema, campRegistrationQuerySchema } from '../schemas/camp-registration.schema.js';
import {
  productCreateSchema, productUpdateSchema, productQuerySchema,
  eventCreateSchema, eventUpdateSchema, eventQuerySchema,
  galleryCreateSchema, galleryUpdateSchema, galleryQuerySchema,
  partnerCreateSchema, partnerUpdateSchema, partnerQuerySchema,
  statisticsCreateSchema, statisticsUpdateSchema, statisticsQuerySchema
} from '../schemas/others.schema.js';
import { contactCreateSchema } from '../schemas/contact.schema.js';

import { uploadSponsor } from '../config/upload.js';

const router = express.Router();

// ========================================
// PARSERS JSON (pour toutes les routes SAUF celles avec multer)
// ========================================
const jsonParser = express.json();
const urlencodedParser = express.urlencoded({ extended: true });

// ========================================
// PLAYER ROUTES (PUBLIC)
// ========================================
router.use('/players', playerRouter);

// ========================================
// USER ROUTES
// ========================================
const userRouter = express.Router();

// Routes publiques
userRouter.post('/login', jsonParser, validate(userLoginSchema), userController.login);
userRouter.get('/search', userController.search);
userRouter.get('/coaches', userController.getCoaches);

// Routes CRUD de base
userRouter.post('/', jsonParser, validate(userCreateSchema), userController.create);
userRouter.get('/', validate(userQuerySchema), userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.put('/:id', jsonParser, validate(userUpdateSchema), userController.update);
userRouter.delete('/:id', userController.delete);

// Routes spécifiques aux joueurs
userRouter.get('/team/:teamId/players', userController.getPlayersByTeam);
userRouter.get('/:id/statistics', userController.getUserWithStatistics);

// ========================================
// TEAM ROUTES
// ========================================
const teamRouter = express.Router();

teamRouter.get('/slug/:slug', teamController.getBySlug);
teamRouter.post('/', jsonParser, validate(teamCreateSchema), teamController.create);
teamRouter.get('/', validate(teamQuerySchema), teamController.getAll);
teamRouter.get('/:id', teamController.getById);
teamRouter.put('/:id', jsonParser, validate(teamUpdateSchema), teamController.update);
teamRouter.delete('/:id', teamController.delete);

// ========================================
// MATCH ROUTES
// ========================================
const matchRouter = express.Router();
matchRouter.get('/upcoming', matchController.getUpcoming);
matchRouter.get('/past', matchController.getPast);
matchRouter.post('/', jsonParser, validate(matchCreateSchema), matchController.create);
matchRouter.get('/', validate(matchQuerySchema), matchController.getAll);
matchRouter.get('/:id', matchController.getById);
matchRouter.put('/:id', jsonParser, validate(matchUpdateSchema), matchController.update);
matchRouter.delete('/:id', matchController.delete);

// ========================================
// NEWS ROUTES
// ========================================
const newsRouter = express.Router();
newsRouter.get('/published', newsController.getPublished);
newsRouter.get('/latest', newsController.getLatest);
newsRouter.post('/:id/publish', jsonParser, newsController.publish);
newsRouter.get('/slug/:slug', newsController.getBySlug);
newsRouter.post('/', jsonParser, validate(newsCreateSchema), newsController.create);
newsRouter.get('/', validate(newsQuerySchema), newsController.getAll);
newsRouter.get('/:id', newsController.getById);
newsRouter.put('/:id', jsonParser, validate(newsUpdateSchema), newsController.update);
newsRouter.delete('/:id', newsController.delete);

// ========================================
// PRODUCT ROUTES
// ========================================
const productRouter = express.Router();
productRouter.post('/', jsonParser, validate(productCreateSchema), productController.create);
productRouter.get('/', validate(productQuerySchema), productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.put('/:id', jsonParser, validate(productUpdateSchema), productController.update);
productRouter.delete('/:id', productController.delete);

// ========================================
// EVENT ROUTES
// ========================================
const eventRouter = express.Router();
eventRouter.get('/upcoming', eventController.getUpcoming);
eventRouter.post('/', jsonParser, validate(eventCreateSchema), eventController.create);
eventRouter.get('/', validate(eventQuerySchema), eventController.getAll);
eventRouter.get('/:id', eventController.getById);
eventRouter.put('/:id', jsonParser, validate(eventUpdateSchema), eventController.update);
eventRouter.delete('/:id', eventController.delete);

// ========================================
// GALLERY ROUTES
// ========================================
const galleryRouter = express.Router();
galleryRouter.get('/albums', galleryController.getAlbums);
galleryRouter.post('/', jsonParser, validate(galleryCreateSchema), galleryController.create);
galleryRouter.get('/', validate(galleryQuerySchema), galleryController.getAll);
galleryRouter.get('/:id', galleryController.getById);
galleryRouter.put('/:id', jsonParser, validate(galleryUpdateSchema), galleryController.update);
galleryRouter.delete('/:id', galleryController.delete);

// ========================================
// PARTNER ROUTES - ADMIN (avec upload)
// ========================================
const partnerAdminRouter = express.Router();
partnerAdminRouter.post('/', uploadSponsor.single('logo'), partnerController.create);
partnerAdminRouter.get('/', validate(partnerQuerySchema), partnerController.getAll);
partnerAdminRouter.get('/:id', partnerController.getById);
partnerAdminRouter.put('/:id', uploadSponsor.single('logo'), partnerController.update);
partnerAdminRouter.delete('/:id', partnerController.delete);

// ========================================
// PARTNER ROUTES - PUBLIC (pour affichage sur le site)
// ========================================
const partnerPublicRouter = express.Router();
partnerPublicRouter.get('/', validate(partnerQuerySchema), partnerController.getAll);
partnerPublicRouter.get('/:id', partnerController.getById);

// ========================================
// STATISTICS ROUTES
// ========================================
const statisticsRouter = express.Router();
statisticsRouter.get('/top-scorers', statisticsController.getTopScorers);
statisticsRouter.post('/', jsonParser, validate(statisticsCreateSchema), statisticsController.create);
statisticsRouter.get('/', validate(statisticsQuerySchema), statisticsController.getAll);
statisticsRouter.get('/:id', statisticsController.getById);
statisticsRouter.put('/:id', jsonParser, validate(statisticsUpdateSchema), statisticsController.update);
statisticsRouter.delete('/:id', statisticsController.delete);

// ========================================
// CAMP ROUTES (STAGES)
// ========================================
const campRouter = express.Router();
campRouter.get('/upcoming', campController.getUpcoming);
campRouter.get('/available', campController.getAvailable);
campRouter.get('/season/:type', campController.getBySeason);
campRouter.post('/', jsonParser, validate(campCreateSchema), campController.create);
campRouter.get('/', validate(campQuerySchema), campController.getAll);
campRouter.get('/:id', campController.getById);
campRouter.put('/:id', jsonParser, validate(campUpdateSchema), campController.update);
campRouter.delete('/:id', campController.delete);

// ========================================
// CAMP REGISTRATION ROUTES (INSCRIPTIONS)
// ========================================
const campRegistrationRouter = express.Router();
// Routes publiques
campRegistrationRouter.post('/', jsonParser, validate(campRegistrationCreateSchema), campRegistrationController.create);
campRegistrationRouter.get('/token/:token', campRegistrationController.getByToken);
campRegistrationRouter.post('/confirm/:token', jsonParser, campRegistrationController.confirm);
campRegistrationRouter.get('/parent', campRegistrationController.getByParentEmail);
// Routes admin/protégées
campRegistrationRouter.get('/', validate(campRegistrationQuerySchema), campRegistrationController.getAll);
campRegistrationRouter.get('/camp/:campId', campRegistrationController.getByCamp);
campRegistrationRouter.get('/:id', campRegistrationController.getById);
campRegistrationRouter.put('/:id', jsonParser, validate(campRegistrationUpdateSchema), campRegistrationController.update);
campRegistrationRouter.post('/:id/cancel', jsonParser, campRegistrationController.cancel);
campRegistrationRouter.post('/:id/pay', jsonParser, campRegistrationController.markAsPaid);
campRegistrationRouter.delete('/:id', campRegistrationController.delete);

// ========================================
// CONTACT ROUTES
// ========================================
const contactRouter = express.Router();
// Route publique
contactRouter.post('/', jsonParser, validate(contactCreateSchema), contactController.create);
// Routes admin
contactRouter.get('/', contactController.getAll);
contactRouter.get('/:id', contactController.getById);
contactRouter.patch('/:id/status', jsonParser, contactController.updateStatus);
contactRouter.delete('/:id', contactController.delete);

// ========================================
// ROUTES ADMIN PROTÉGÉES
// ========================================
const adminRouter = express.Router();

// Toutes les routes admin nécessitent authentification + rôle admin
adminRouter.use(authMiddleware);
adminRouter.use(requireRole('admin'));

// Dashboard
adminRouter.get('/dashboard', (req, res) => {
  res.json({
    success: true,
    message: 'Bienvenue dans l\'administration',
    data: {
      user: req.user
    }
  });
});

adminRouter.get('/teams/count', teamController.getCount.bind(teamController));

// ========================================
// MOUNT ALL ROUTES
// ========================================

// Routes publiques
router.use('/users', userRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchRouter);
router.use('/news', newsRouter);
router.use('/products', productRouter);
router.use('/events', eventRouter);
router.use('/gallery', galleryRouter);
router.use('/partners', partnerPublicRouter); // ← Route publique pour afficher les sponsors
router.use('/statistics', statisticsRouter);
router.use('/camps', campRouter);
router.use('/camp-registrations', campRegistrationRouter);
router.use('/contact', contactRouter);

// Routes admin protégées (avec auth + role)
router.use('/admin', adminRouter);
router.use('/admin/partners', authMiddleware, requireRole('admin'), partnerAdminRouter); // ← Route admin pour gérer les sponsors

export default router;