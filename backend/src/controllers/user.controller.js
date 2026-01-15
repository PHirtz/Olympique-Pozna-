import userService from '../services/user.service.js';
import { HttpBadRequestError } from '../errors/http.errors.js';
import { generateToken, generateRefreshToken } from '../middlewares/auth.middleware.js';

class UserController {
  async create(req, res, next) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({
        success: true,
        message: 'Utilisateur créé avec succès',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await userService.getAllUsers(req.query);
      res.status(200).json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  async getProfile(req, res, next) {
    try {
      // req.user.id vient du middleware d'auth JWT
      const user = await userService.getUserPrivateProfile(req.user.id);
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Utilisateur mis à jour avec succès',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      // req.user.id vient du middleware d'auth JWT
      const user = await userService.updateUserProfile(req.user.id, req.body);
      res.status(200).json({
        success: true,
        message: 'Profil mis à jour avec succès',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req, res, next) {
    try {
      const { currentPassword, newPassword } = req.body;
      
      if (!currentPassword || !newPassword) {
        throw new HttpBadRequestError('Mot de passe actuel et nouveau mot de passe requis');
      }

      // req.user.id vient du middleware d'auth JWT
      await userService.updateUserPassword(req.user.id, currentPassword, newPassword);
      
      res.status(200).json({
        success: true,
        message: 'Mot de passe modifié avec succès'
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfilePicture(req, res, next) {
    try {
      const { imageUrl, imagePath } = req.body;
      
      if (!imageUrl) {
        throw new HttpBadRequestError('URL de l\'image requise');
      }

      // req.user.id vient du middleware d'auth JWT
      const user = await userService.updateUserProfilePicture(req.user.id, imageUrl, imagePath);
      
      res.status(200).json({
        success: true,
        message: 'Photo de profil mise à jour avec succès',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      
      const user = await userService.getUserByUsername(username);
      console.log('User role:', user.role);
      if (!user) {
        throw new HttpBadRequestError('Identifiants incorrects');
      }

      const isPasswordValid = await userService.verifyPassword(user, password);
      if (!isPasswordValid) {
        throw new HttpBadRequestError('Identifiants incorrects');
      }

      const userWithoutPassword = user.toJSON();
      delete userWithoutPassword.password;

      // Générer les tokens JWT
      const token = generateToken(user);
      const refreshToken = generateRefreshToken(user);

      res.status(200).json({
        success: true,
        message: 'Connexion réussie',
        data: {
          user: userWithoutPassword,
          token,
          refreshToken
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getPlayersByTeam(req, res, next) {
    try {
      const players = await userService.getPlayersByTeam(req.params.teamId);
      res.status(200).json({
        success: true,
        data: players
      });
    } catch (error) {
      next(error);
    }
  }

  async getCoaches(req, res, next) {
    try {
      const coaches = await userService.getCoaches();
      res.status(200).json({
        success: true,
        data: coaches
      });
    } catch (error) {
      next(error);
    }
  }

  async search(req, res, next) {
    try {
      const { q } = req.query;
      
      if (!q) {
        throw new HttpBadRequestError('Paramètre de recherche (q) manquant');
      }

      const users = await userService.searchUsers(q);
      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserWithStatistics(req, res, next) {
    try {
      const { season } = req.query;
      const user = await userService.getUserWithStatistics(req.params.id, season);
      res.status(200).json({
        success: true,
        data: user
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();