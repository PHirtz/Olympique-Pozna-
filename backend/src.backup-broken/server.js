import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from './database/db.js';
import routers from './routers/indexRouter.js';
// Import models and associations
import './models/associations.js';
import './models/contact.model.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
}));

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? 'https://olympiquepoznan.pl'
    : 'http://localhost:5173',
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== SERVIR LES FICHIERS STATIQUES ==========
app.use('/uploads', express.static(join(__dirname, '../public/uploads')));

// ========== ROUTES API (AVANT le frontend) ==========
app.use('/api', routers);

// ========== PAGE D'ACCUEIL API (optionnel) ==========
app.get('/api', (req, res) => {
  res.json({
    message: 'Bienvenue sur l\'API Olympique Poznan',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      teams: '/api/teams',
      matches: '/api/matches',
      news: '/api/news',
      products: '/api/products',
      events: '/api/events',
      gallery: '/api/gallery',
      partners: '/api/partners',
      statistics: '/api/statistics',
      camps: '/api/camps',
      campRegistrations: '/api/camp-registrations',
      contact: '/api/contact',
      players: '/api/players'
    }
  });
});

// ========== SERVIR LE FRONTEND SVELTEKIT ==========
// Servir les fichiers statiques du build (_app/, images, etc)
app.use(express.static(join(__dirname, '../../frontend/build/client'), {
  maxAge: '1h'
}));


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }

  res.status(500).json({
    success: false,
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    await db.authenticate();
    console.log('✅ Connexion à la base de données établie avec succès');

    if (process.env.NODE_ENV === 'development') {
      await db.sync();
      console.log('✅ Base de données synchronisée');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
      console.log(`📱 Frontend: http://localhost:${PORT}`);
      console.log(`🔌 API: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};

startServer();

export default app;
