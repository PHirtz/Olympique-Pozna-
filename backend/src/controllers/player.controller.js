  // ==============================================
  // CONTROLLER - PLAYERS (JOUEURS)
  // ==============================================
  import playerService from '../services/player.service.js';
  import { deleteFile, getPublicUrl } from '../config/upload.js';
  import fs from 'fs';
  import path from 'path';
  import { fileURLToPath } from 'url';
  import { dirname } from 'path';

  const __filename = fileURLToPath(import.meta.url); 
  const __dirname = dirname(__filename); 

  class PlayerController {
  
  // ==============================================
  // GET /api/players - Liste tous les joueurs
  // ==============================================
async getAll(req, res) {
  try {
    console.log('🔍 Route appelée:', req.path);
    console.log('🔍 Query params:', req.query);
    const result = await playerService.getAllPlayers(req.query);
    console.log('🔍 Total joueurs retourné:', result.pagination.total);
    console.log('🔍 Nombre de joueurs dans la page:', result.players.length);
    
    res.status(200).json({
      success: true,
      data: {
        players: result.players,
        total: result.pagination.total,
        page: result.pagination.page,
        totalPages: result.pagination.totalPages,
        limit: result.pagination.limit
      }
    });
  } catch (error) {
    console.error('Erreur récupération joueurs:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur',
      error: error.message 
    });
  }
}

  // ==============================================
  // GET /api/players/:id - Détails d'un joueur
  // ==============================================
  async getById(req, res) {
    try {
      const player = await playerService.getPlayerById(req.params.id);
      res.status(200).json({
        success: true,
        data: player
      });
    } catch (error) {
      if (error.name === 'HttpNotFoundError') {
        return res.status(404).json({ 
          success: false, 
          message: error.message 
        });
      }
      console.error('Erreur récupération joueur:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur serveur',
        error: error.message 
      });
    }
  }

  // ==============================================
  // MIDDLEWARE - Décoder base64 si présent
  // ==============================================

  async handleBase64Photo(req, res, next) {
    try {
      // Si pas de photoBase64, continuer normalement
      if (!req.body.photoBase64) {
        return next();
      }

      const { photoBase64 } = req.body;
      
      // Extraire type et données
      const matches = photoBase64.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!matches) {
        return res.status(400).json({ 
          success: false, 
          message: 'Format base64 invalide' 
        });
      }

      const ext = matches[1];
      const data = matches[2];
      const buffer = Buffer.from(data, 'base64');

      // Créer un objet file simulé (comme multer)
      const filename = `player-${Date.now()}-${Math.round(Math.random() * 1E9)}.${ext}`;
      const uploadsDir = process.env.NODE_ENV === 'production' 
        ? '/srv/customer/uploads/players'
        : path.join(__dirname, '../../public/uploads/players');
      
      const filepath = path.join(uploadsDir, filename);

      // Écrire le fichier (PROPREMENT, pas corrompu)
      fs.writeFileSync(filepath, buffer);

      // Simuler req.file comme si c'était multer
      req.file = {
        filename: filename,
        path: filepath,
        size: buffer.length
      };

      console.log('✅ Photo base64 décodée:', filename);
      next();

    } catch (error) {
      console.error('❌ Erreur décodage base64:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur traitement image' 
      });
    }
  }

  // ==============================================
  // POST /api/players - Créer un joueur
  // ==============================================
  async create(req, res) {
    try {
      console.log('🔍 req.body reçu:', req.body);
      console.log('🔍 req.file reçu:', req.file);

      // ====== VALIDATION MANUELLE ======
      const errors = [];
      
      if (!req.body.teamId || isNaN(parseInt(req.body.teamId, 10))) {
        errors.push('Team ID requis');
      }
      if (!req.body.firstName || !req.body.firstName.trim()) {
        errors.push('Prénom requis');
      }
      if (!req.body.lastName || !req.body.lastName.trim()) {
        errors.push('Nom requis');
      }
      if (!req.body.position || !req.body.position.trim()) {
        errors.push('Poste requis');
      }
      if (!req.body.positionPl || !req.body.positionPl.trim()) {
        errors.push('Poste en polonais requis');
      }
      if (!req.body.birthYear) {
        errors.push('Année de naissance requise');
      } else {
        const year = parseInt(req.body.birthYear, 10);
        const currentYear = new Date().getFullYear();
        if (isNaN(year) || year < 1950 || year > currentYear) {
          errors.push(`Année de naissance entre 1950 et ${currentYear}`);
        }
      }
      if (!req.body.nationality || !req.body.nationality.trim()) {
        errors.push('Nationalité requise');
      }
      if (!req.body.nationalityPl || !req.body.nationalityPl.trim()) {
        errors.push('Nationalité en polonais requise');
      }
      if (req.body.jerseyNumber) {
        const num = parseInt(req.body.jerseyNumber, 10);
        if (isNaN(num) || num < 0 || num > 99) {
          errors.push('Numéro de maillot entre 0 et 99');
        }
      }

      if (errors.length > 0) {
        // Nettoyer le fichier uploadé si erreur de validation
        if (req.file) {
          deleteFile(getPublicUrl(req.file.filename, 'players'));
        }
        return res.status(400).json({
          success: false,
          message: 'Erreurs de validation',
          errors
        });
      }
      // ====== FIN VALIDATION ======

      const playerData = {
        teamId: parseInt(req.body.teamId, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nickname: req.body.nickname || null,
        jerseyNumber: req.body.jerseyNumber ? parseInt(req.body.jerseyNumber, 10) : null,
        position: req.body.position,
        positionPl: req.body.positionPl,
        birthYear: parseInt(req.body.birthYear, 10),
        nationality: req.body.nationality,
        nationalityPl: req.body.nationalityPl,
        photoUrl: req.body.photoUrl,
        distinction1: req.body.distinction1 || null,
        distinction2: req.body.distinction2 || null,
        distinction3: req.body.distinction3 || null,
        distinction4: req.body.distinction4 || null,
        distinction5: req.body.distinction5 || null,
        isActive: req.body.isActive === 'true' || req.body.isActive === true || req.body.isActive === 1 || req.body.isActive === '1'
      };

      console.log('📝 playerData after parsing:', playerData);

      const player = await playerService.createPlayer(playerData, req.file);

      res.status(201).json({
        success: true,
        message: 'Joueur créé avec succès',
        data: player
      });
    } catch (error) {
      // Si erreur et fichier uploadé, supprimer le fichier
      if (req.file) {
        deleteFile(getPublicUrl(req.file.filename, 'players'));
      }
      
      console.error('❌ Erreur création joueur:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Erreur lors de la création du joueur'
      });
    }
  }

  // ==============================================
  // PUT /api/players/:id - Modifier un joueur
  // ==============================================
  async update(req, res) {
    try {
      console.log('🔍 User making request:', {
        userId: req.user?.id,
        role: req.user?.role,
        email: req.user?.email
      });
      console.log('🔍 req.body:', req.body);
      console.log('🔍 req.file:', req.file);

      // ====== VALIDATION MANUELLE ======
      const errors = [];
      
      if (req.body.teamId && isNaN(parseInt(req.body.teamId, 10))) {
        errors.push('Team ID invalide');
      }
      if (req.body.firstName !== undefined && !req.body.firstName.trim()) {
        errors.push('Prénom requis');
      }
      if (req.body.lastName !== undefined && !req.body.lastName.trim()) {
        errors.push('Nom requis');
      }
      if (req.body.jerseyNumber && (isNaN(parseInt(req.body.jerseyNumber, 10)) || 
          parseInt(req.body.jerseyNumber, 10) < 0 || 
          parseInt(req.body.jerseyNumber, 10) > 99)) {
        errors.push('Numéro de maillot entre 0 et 99');
      }
      if (req.body.birthYear) {
        const year = parseInt(req.body.birthYear, 10);
        const currentYear = new Date().getFullYear();
        if (isNaN(year) || year < 1950 || year > currentYear) {
          errors.push(`Année de naissance entre 1950 et ${currentYear}`);
        }
      }

      if (errors.length > 0) {
        // Nettoyer le fichier uploadé si erreur de validation
        if (req.file) {
          deleteFile(getPublicUrl(req.file.filename, 'players'));
        }
        return res.status(400).json({
          success: false,
          message: 'Erreurs de validation',
          errors
        });
      }
      // ====== FIN VALIDATION ======

      // Convertir les données
      const updateData = {
        teamId: req.body.teamId ? parseInt(req.body.teamId, 10) : undefined,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nickname: req.body.nickname || null,
        jerseyNumber: req.body.jerseyNumber ? parseInt(req.body.jerseyNumber, 10) : null,
        position: req.body.position,
        positionPl: req.body.positionPl,
        birthYear: req.body.birthYear ? parseInt(req.body.birthYear, 10) : undefined,
        nationality: req.body.nationality,
        nationalityPl: req.body.nationalityPl,
        photoUrl: req.body.photoUrl,
        distinction1: req.body.distinction1 || null,
        distinction2: req.body.distinction2 || null,
        distinction3: req.body.distinction3 || null,
        distinction4: req.body.distinction4 || null,
        distinction5: req.body.distinction5 || null,
        isActive: req.body.isActive === 'true' || req.body.isActive === true || req.body.isActive === 1 || req.body.isActive === '1'
      };

      console.log('📝 updateData after parsing:', updateData);

      const player = await playerService.updatePlayer(
        req.params.id, 
        updateData, 
        req.file
      );

      res.status(200).json({
        success: true,
        message: 'Joueur modifié avec succès',
        data: player
      });
    } catch (error) {
      // Si erreur et nouveau fichier uploadé, supprimer le fichier
      if (req.file) {
        deleteFile(getPublicUrl(req.file.filename, 'players'));
      }

      if (error.name === 'HttpNotFoundError') {
        return res.status(404).json({ 
          success: false, 
          message: error.message 
        });
      }

      console.error('❌ Erreur modification joueur:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message || 'Erreur lors de la modification du joueur'
      });
    }
  }

  // ==============================================
  // DELETE /api/players/:id - Supprimer un joueur
  // ==============================================
  async delete(req, res) {
    try {
      const result = await playerService.deletePlayer(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      if (error.name === 'HttpNotFoundError') {
        return res.status(404).json({ 
          success: false, 
          message: error.message 
        });
      }
      
      console.error('Erreur suppression joueur:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur serveur',
        error: error.message 
      });
    }
  }

  // ==============================================
  // GET /api/academy/export - Export des joueurs pour l'académie
  // ==============================================
  async getAcademyExport(req, res) {
    try {
      const result = await playerService.getAllPlayers({ 
        isActive: 'true', 
        limit: 1000
      });
      
      res.status(200).json({
        success: true,
        data: {
          players: result.players,
          total: result.pagination.total
        }
      });
    } catch (error) {
      console.error('Erreur export académie:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Erreur serveur',
        error: error.message 
      });
    }
  }
}

export const playerController = new PlayerController();