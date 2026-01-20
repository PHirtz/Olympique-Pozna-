// ==============================================
// CONTROLLER - PLAYERS (JOUEURS)
// ==============================================

import playerService from '../services/player.service.js';
import { deleteFile, getPublicUrl } from '../config/upload.js';

class PlayerController {
  
  // ==============================================
  // GET /api/players - Liste tous les joueurs
  // ==============================================
  async getAll(req, res) {
    try {
      const result = await playerService.getAllPlayers(req.query);
      res.status(200).json({
        success: true,
        data: result
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
  // POST /api/players - Créer un joueur
  // ==============================================
  async create(req, res) {
    try {
      console.log('🔍 req.body reçu:', req.body);
      console.log('🔍 req.file reçu:', req.file);

      const player = await playerService.createPlayer(req.body, req.file);

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
      
      console.error('Erreur création joueur:', error);
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

      const player = await playerService.updatePlayer(
        req.params.id, 
        req.body, 
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

      console.error('Erreur modification joueur:', error);
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
}

export const playerController = new PlayerController();