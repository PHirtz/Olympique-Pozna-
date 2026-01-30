// ==============================================
// CONFIGURATION MULTER - UPLOAD LOCAL PERSISTANT
// ==============================================
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// IMPORTANT : Gestion des chemins selon l'environnement
const isProduction = process.env.NODE_ENV === 'production';

// Dossier racine des uploads
const uploadsDir = isProduction 
  ? '/srv/customer/uploads' // Production Infomaniak
  : path.join(__dirname, '../../public/uploads'); // Dev local (corrigé : 2 niveaux)

const sponsorsDir = path.join(uploadsDir, 'sponsors');
const playersDir = path.join(uploadsDir, 'players');

console.log(`📁 Environnement: ${process.env.NODE_ENV || 'development'}`);
console.log(`📁 Dossier uploads: ${uploadsDir}`);

// Créer les dossiers d'upload s'ils n'existent pas
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
    const uploadType = req.baseUrl.includes('sponsors') ? 'sponsors' : 'players';
    const destination = path.join(uploadsDir, uploadType);
    cb(null, destination);
  },
  filename: (req, file, cb) => {
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
    fileSize: 10 * 1024 * 1024, // 10MB max
  }
});

// ==============================================
// HELPER - SUPPRIMER UN FICHIER
// ==============================================
export const deleteFile = (filePath) => {
  try {
    if (!filePath) return;

    // Si c'est déjà un chemin complet
    let fullPath = filePath;

    // Si c'est un chemin relatif (/uploads/players/xxx.jpg)
    if (filePath.startsWith('/uploads/')) {
      if (isProduction) {
        fullPath = filePath.replace('/uploads/', '/srv/customer/uploads/');
      } else {
        fullPath = path.join(__dirname, '../public', filePath);
      }
    }

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

// ==============================================
// EXPORTS SPÉCIFIQUES PAR TYPE
// ==============================================
export const uploadSponsor = upload;
export const uploadPlayer = upload;

export default upload;