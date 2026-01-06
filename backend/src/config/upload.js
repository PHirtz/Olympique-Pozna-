// ==============================================
// CONFIGURATION MULTER - UPLOAD LOCAL
// ==============================================

import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Créer les dossiers d'upload s'ils n'existent pas
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
const sponsorsDir = path.join(uploadsDir, 'sponsors');
const playersDir = path.join(uploadsDir, 'players');

[uploadsDir, sponsorsDir, playersDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`📁 Dossier créé: ${dir}`);
  }
});

// ==============================================
// CONFIGURATION STORAGE
// ==============================================

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Déterminer le dossier selon le type d'upload
    const uploadType = req.baseUrl.includes('sponsors') ? 'sponsors' : 'players';
    const destination = path.join(uploadsDir, uploadType);
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    // Générer un nom de fichier unique
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50);
    
    cb(null, `${basename}-${uniqueSuffix}${ext}`);
  }
});

// ==============================================
// FILTRES
// ==============================================

const fileFilter = (req, file, cb) => {
  // Types autorisés
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Type de fichier non autorisé: ${file.mimetype}. Formats acceptés: JPEG, PNG, GIF, WebP, SVG`), false);
  }
};

// ==============================================
// CONFIGURATION MULTER
// ==============================================

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
  }
});

// ==============================================
// HELPER - SUPPRIMER UN FICHIER
// ==============================================

export const deleteFile = (filePath) => {
  try {
    if (!filePath) return;
    
    // Construire le chemin complet
    const fullPath = path.join(__dirname, '..', 'public', filePath);
    
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`🗑️  Fichier supprimé: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.error(`❌ Erreur suppression fichier: ${error.message}`);
    return false;
  }
};

// ==============================================
// HELPER - OBTENIR L'URL PUBLIQUE
// ==============================================

export const getPublicUrl = (filename, type = 'players') => {
  if (!filename) return null;
  return `/uploads/${type}/${filename}`;
};

export default upload;