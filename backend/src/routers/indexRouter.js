import express from 'express';
import { validate } from '../middlewares/validate.middleware.js';
import { authMiddleware, requireRole } from '../middlewares/auth.middleware.js'; // ← NOUVEAU

// Import controllers
import userController from '../controllers/user.controller.js';
import campController from '../controllers/camp.controller.js';
import campRegistrationController from '../controllers/camp-registration.controller.js';
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

const router = express.Router();

// ========== USER ROUTES ==========
const userRouter = express.Router();

// Routes publiques
userRouter.post('/login', validate(userLoginSchema), userController.login);
userRouter.get('/search', userController.search);
userRouter.get('/coaches', userController.getCoaches);

// Routes CRUD de base
userRouter.post('/', validate(userCreateSchema), userController.create);
userRouter.get('/', validate(userQuerySchema), userController.getAll);
userRouter.get('/:id', userController.getById);
userRouter.put('/:id', validate(userUpdateSchema), userController.update);
userRouter.delete('/:id', userController.delete);

// Routes spécifiques aux joueurs
userRouter.get('/team/:teamId/players', userController.getPlayersByTeam);
userRouter.get('/:id/statistics', userController.getUserWithStatistics);

// Routes profil privé (nécessitent authentification JWT)
// userRouter.get('/me/profile', authMiddleware, userController.getProfile);
// userRouter.put('/me/profile', authMiddleware, userController.updateProfile);
// userRouter.put('/me/password', authMiddleware, userController.updatePassword);
// userRouter.put('/me/picture', authMiddleware, userController.updateProfilePicture);

// ========== TEAM ROUTES ==========
const teamRouter = express.Router();
teamRouter.post('/', validate(teamCreateSchema), teamController.create);
teamRouter.get('/', validate(teamQuerySchema), teamController.getAll);
teamRouter.get('/:id', teamController.getById);
teamRouter.put('/:id', validate(teamUpdateSchema), teamController.update);
teamRouter.delete('/:id', teamController.delete);

// ========== MATCH ROUTES ==========
const matchRouter = express.Router();
matchRouter.get('/upcoming', matchController.getUpcoming);
matchRouter.get('/past', matchController.getPast);
matchRouter.post('/', validate(matchCreateSchema), matchController.create);
matchRouter.get('/', validate(matchQuerySchema), matchController.getAll);
matchRouter.get('/:id', matchController.getById);
matchRouter.put('/:id', validate(matchUpdateSchema), matchController.update);
matchRouter.delete('/:id', matchController.delete);

// ========== NEWS ROUTES ==========
const newsRouter = express.Router();
newsRouter.get('/published', newsController.getPublished);
newsRouter.get('/latest', newsController.getLatest);
newsRouter.post('/:id/publish', newsController.publish);
newsRouter.get('/slug/:slug', newsController.getBySlug);
newsRouter.post('/', validate(newsCreateSchema), newsController.create);
newsRouter.get('/', validate(newsQuerySchema), newsController.getAll);
newsRouter.get('/:id', newsController.getById);
newsRouter.put('/:id', validate(newsUpdateSchema), newsController.update);
newsRouter.delete('/:id', newsController.delete);

// ========== PRODUCT ROUTES ==========
const productRouter = express.Router();
productRouter.post('/', validate(productCreateSchema), productController.create);
productRouter.get('/', validate(productQuerySchema), productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.put('/:id', validate(productUpdateSchema), productController.update);
productRouter.delete('/:id', productController.delete);

// ========== EVENT ROUTES ==========
const eventRouter = express.Router();
eventRouter.get('/upcoming', eventController.getUpcoming);
eventRouter.post('/', validate(eventCreateSchema), eventController.create);
eventRouter.get('/', validate(eventQuerySchema), eventController.getAll);
eventRouter.get('/:id', eventController.getById);
eventRouter.put('/:id', validate(eventUpdateSchema), eventController.update);
eventRouter.delete('/:id', eventController.delete);

// ========== GALLERY ROUTES ==========
const galleryRouter = express.Router();
galleryRouter.get('/albums', galleryController.getAlbums);
galleryRouter.post('/', validate(galleryCreateSchema), galleryController.create);
galleryRouter.get('/', validate(galleryQuerySchema), galleryController.getAll);
galleryRouter.get('/:id', galleryController.getById);
galleryRouter.put('/:id', validate(galleryUpdateSchema), galleryController.update);
galleryRouter.delete('/:id', galleryController.delete);

// ========== PARTNER ROUTES ==========
const partnerRouter = express.Router();
partnerRouter.post('/', validate(partnerCreateSchema), partnerController.create);
partnerRouter.get('/', validate(partnerQuerySchema), partnerController.getAll);
partnerRouter.get('/:id', partnerController.getById);
partnerRouter.put('/:id', validate(partnerUpdateSchema), partnerController.update);
partnerRouter.delete('/:id', partnerController.delete);

// ========== STATISTICS ROUTES ==========
const statisticsRouter = express.Router();
statisticsRouter.get('/top-scorers', statisticsController.getTopScorers);
statisticsRouter.post('/', validate(statisticsCreateSchema), statisticsController.create);
statisticsRouter.get('/', validate(statisticsQuerySchema), statisticsController.getAll);
statisticsRouter.get('/:id', statisticsController.getById);
statisticsRouter.put('/:id', validate(statisticsUpdateSchema), statisticsController.update);
statisticsRouter.delete('/:id', statisticsController.delete);

// ========== CAMP ROUTES (STAGES) ==========
const campRouter = express.Router();
campRouter.get('/upcoming', campController.getUpcoming);
campRouter.get('/available', campController.getAvailable);
campRouter.get('/season/:type', campController.getBySeason);
campRouter.post('/', validate(campCreateSchema), campController.create);
campRouter.get('/', validate(campQuerySchema), campController.getAll);
campRouter.get('/:id', campController.getById);
campRouter.put('/:id', validate(campUpdateSchema), campController.update);
campRouter.delete('/:id', campController.delete);

// ========== CAMP REGISTRATION ROUTES (INSCRIPTIONS) ==========
const campRegistrationRouter = express.Router();
// Routes publiques
campRegistrationRouter.post('/', validate(campRegistrationCreateSchema), campRegistrationController.create);
campRegistrationRouter.get('/token/:token', campRegistrationController.getByToken);
campRegistrationRouter.post('/confirm/:token', campRegistrationController.confirm);
campRegistrationRouter.get('/parent', campRegistrationController.getByParentEmail);
// Routes admin/protégées
campRegistrationRouter.get('/', validate(campRegistrationQuerySchema), campRegistrationController.getAll);
campRegistrationRouter.get('/camp/:campId', campRegistrationController.getByCamp);
campRegistrationRouter.get('/:id', campRegistrationController.getById);
campRegistrationRouter.put('/:id', validate(campRegistrationUpdateSchema), campRegistrationController.update);
campRegistrationRouter.post('/:id/cancel', campRegistrationController.cancel);
campRegistrationRouter.post('/:id/pay', campRegistrationController.markAsPaid);
campRegistrationRouter.delete('/:id', campRegistrationController.delete);

// ========== CONTACT ROUTES ==========
const contactRouter = express.Router();
// Route publique
contactRouter.post('/', validate(contactCreateSchema), contactController.create);
// Routes admin
contactRouter.get('/', contactController.getAll);
contactRouter.get('/:id', contactController.getById);
contactRouter.patch('/:id/status', contactController.updateStatus);
contactRouter.delete('/:id', contactController.delete);

// ========================================
// ========== ROUTES ADMIN PROTÉGÉES ==========
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
      user: {
        id: req.userId,
        role: req.userRole,
        email: req.userEmail
      }
    }
  });
});

// PARTNERS (SPONSORS)
adminRouter.post('/partners', validate(partnerCreateSchema), partnerController.create);
adminRouter.get('/partners', partnerController.getAll);
adminRouter.get('/partners/:id', partnerController.getById);
adminRouter.put('/partners/:id', validate(partnerUpdateSchema), partnerController.update);
adminRouter.delete('/partners/:id', partnerController.delete);

// À ajouter plus tard :
// USERS
// adminRouter.get('/users', userController.getAll);
// adminRouter.put('/users/:id', userController.update);
// adminRouter.delete('/users/:id', userController.delete);

// TEAMS
// adminRouter.post('/teams', validate(teamCreateSchema), teamController.create);
// adminRouter.put('/teams/:id', validate(teamUpdateSchema), teamController.update);
// adminRouter.delete('/teams/:id', teamController.delete);

// ========================================
// Mount all routes
// ========================================
router.use('/users', userRouter);
router.use('/teams', teamRouter);
router.use('/matches', matchRouter);
router.use('/news', newsRouter);
router.use('/products', productRouter);
router.use('/events', eventRouter);
router.use('/gallery', galleryRouter);
router.use('/partners', partnerRouter);
router.use('/statistics', statisticsRouter);
router.use('/camps', campRouter);
router.use('/camp-registrations', campRegistrationRouter);
router.use('/contact', contactRouter);
router.use('/admin', adminRouter); // ← NOUVEAU : Routes admin protégées

export default router;