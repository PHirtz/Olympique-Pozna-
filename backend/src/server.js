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

// Pour servir les fichiers statiques
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));

// CORS - CONFIGURATION COMPLÈTE
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://olympiquepoznan.pl',
      'https://www.olympiquepoznan.pl',
      'https://olympiquepoznan.pl/api',
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:4000'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.options('*', cors());


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ========== SERVIR LES FICHIERS STATIQUES ==========
app.use('/uploads', express.static('/srv/customer/uploads'));
// ================================================

// Routes
app.get('/', (req, res) => {
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
      contact: '/api/contact' 
    }
  });
});

app.use('/api', routers);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Si c'est une erreur HTTP personnalisée
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      error: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
  
  // Erreur générique
  res.status(500).json({
    success: false,
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route introuvable'
  });
});

// Database connection and server start
const startServer = async () => {
  try {
    await db.authenticate();
    console.log('✅ Connexion à la base de données établie avec succès');
    
    // Sync database (in development only)
    // if (process.env.NODE_ENV === 'development') {
      // await db.sync();
      // console.log('✅ Base de données synchronisée');
    // }
    
    app.listen(PORT, () => {
      console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  }
};

startServer();

export default app;