import db from './src/database/db.js';
import './src/models/associations.js';

async function syncDatabase() {
  try {
    console.log('🔄 Synchronisation de la base de données...');
    
    await db.authenticate();
    console.log('✅ Connexion établie');
    
    // alter: true = modifie les tables existantes sans les supprimer
    await db.sync({ alter: true });
    
    console.log('✅ Base de données synchronisée avec succès');
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur:', error);
    process.exit(1);
  }
}

syncDatabase();
