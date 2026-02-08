import argon2 from 'argon2';
import User from '../models/user.model.js';
import Team from '../models/team.model.js';
import Statistics from '../models/statistics.model.js';
import { Op } from 'sequelize';
import { 
  HttpNotFoundError, 
  HttpConflictError,
  HttpBadRequestError 
} from '../errors/http.errors.js';

class UserService {
  // Attributs publics (profil visible par tous)
  static PUBLIC_ATTRIBUTES = [
    'id',
    'username',
    'imageUrl',
    'imagePath',
    'bio',
    'playerNumber',
    'position',
    'nationality',
    'role'
  ];

  // Attributs privés (profil complet)
  static PRIVATE_ATTRIBUTES = [
    ...UserService.PUBLIC_ATTRIBUTES,
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'dateOfBirth',
    'teamId',
    'membershipStatus',
    'membershipStartDate',
    'membershipEndDate',
    'preferredLanguage',
    'isActive',
    'createdAt',
    'updatedAt'
  ];

  // ============= CRUD DE BASE =============

  async createUser(userData) {
    // Vérifier si l'email existe déjà
    const existingEmail = await User.findOne({ where: { email: userData.email } });
    if (existingEmail) {
      throw new HttpConflictError('Cet email est déjà utilisé');
    }

    // Vérifier si le username existe déjà
    const existingUsername = await User.findOne({ where: { username: userData.username } });
    if (existingUsername) {
      throw new HttpConflictError('Ce nom d\'utilisateur est déjà utilisé');
    }

    // Hasher le mot de passe
    const hashedPassword = await argon2.hash(userData.password);
    
    const user = await User.create({
      ...userData,
      password: hashedPassword
    });

    // RETOURNE LE MODÈLE SEQUELIZE DIRECTEMENT
    return user;
  }

  async getAllUsers(filters = {}) {
    const { role, teamId, membershipStatus, isActive, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const where = {};
    if (role) where.role = role;
    if (teamId) where.teamId = teamId;
    if (membershipStatus) where.membershipStatus = membershipStatus;
    if (isActive !== undefined) where.isActive = isActive;

    const { count, rows } = await User.findAndCountAll({
      where,
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'namePl', 'category']
      }],
      attributes: { exclude: ['password'] },
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    return {
      users: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async getUserById(id, includePrivate = false) {
    const user = await User.findByPk(id, {
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'namePl', 'category']
      }],
      attributes: includePrivate ? UserService.PRIVATE_ATTRIBUTES : UserService.PUBLIC_ATTRIBUTES
    });

    if (!user) {
      throw new HttpNotFoundError('Utilisateur introuvable');
    }

    return user;
  }

  async getUserByIdPublic(id) {
    return await this.getUserById(id, false);
  }

  async getUserByIdPrivate(id) {
    return await this.getUserById(id, true);
  }

  async getUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async getUserByUsername(username) {
    return await User.findOne({ where: { username } });
  }

  // Cherche par username OU email
  async getUserByUsernameOrEmail(identifier) {
    return await User.findOne({
      where: {
        [Op.or]: [
          { username: identifier },
          { email: identifier }
        ]
      }
    });
  }

  // ============= PROFIL PRIVÉ (utilisateur connecté) =============

  async getUserPrivateProfile(userId) {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Team,
          as: 'team',
          attributes: ['id', 'name', 'namePl', 'category']
        },
        {
          model: Statistics,
          as: 'statistics',
          limit: 5,
          order: [['season', 'DESC']]
        }
      ],
      attributes: { exclude: ['password'] }
    });
    
    if (!user) {
      throw new HttpNotFoundError('Utilisateur introuvable en base');
    }

    return user;
  }

  // ============= MISE À JOUR PROFIL =============

  async updateUserProfile(userId, updateData) {
    const { firstName, lastName, email, username, phoneNumber, bio, nationality } = updateData;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new HttpNotFoundError('Utilisateur non trouvé');
    }

    // Vérification unicité email
    if (email && email !== user.email) {
      const existsEmail = await User.findOne({ where: { email } });
      if (existsEmail && existsEmail.id !== userId) {
        throw new HttpConflictError('Email déjà utilisé');
      }
    }

    // Vérification unicité username
    if (username && username !== user.username) {
      const existsUsername = await User.findOne({ where: { username } });
      if (existsUsername && existsUsername.id !== userId) {
        throw new HttpConflictError('Nom d\'utilisateur déjà utilisé');
      }
    }

    // Mise à jour uniquement des champs autorisés
    const allowedFields = { firstName, lastName, email, username, phoneNumber, bio, nationality };
    Object.keys(allowedFields).forEach(key => {
      if (allowedFields[key] !== undefined) {
        user[key] = allowedFields[key];
      }
    });

    await user.save();

    const updatedUser = user.toJSON();
    delete updatedUser.password;
    
    return updatedUser;
  }

  async updateUser(id, updateData) {
    const user = await User.findByPk(id);
    
    if (!user) {
      throw new HttpNotFoundError('Utilisateur introuvable');
    }

    // Vérification unicité email
    if (updateData.email && updateData.email !== user.email) {
      const existsEmail = await User.findOne({ where: { email: updateData.email } });
      if (existsEmail && existsEmail.id !== id) {
        throw new HttpConflictError('Email déjà utilisé');
      }
    }

    // Vérification unicité username
    if (updateData.username && updateData.username !== user.username) {
      const existsUsername = await User.findOne({ where: { username: updateData.username } });
      if (existsUsername && existsUsername.id !== id) {
        throw new HttpConflictError('Nom d\'utilisateur déjà utilisé');
      }
    }

    // Hash du mot de passe si fourni
    if (updateData.password) {
      updateData.password = await argon2.hash(updateData.password);
    }

    await user.update(updateData);

    const updatedUser = user.toJSON();
    delete updatedUser.password;
    
    return updatedUser;
  }

  // ============= CHANGEMENT MOT DE PASSE =============

  async updateUserPassword(userId, currentPassword, newPassword) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new HttpNotFoundError('Utilisateur non trouvé');
    }

    const passMatch = await argon2.verify(user.password, currentPassword);
    if (!passMatch) {
      throw new HttpConflictError('Mot de passe actuel incorrect');
    }

    user.password = await argon2.hash(newPassword);
    await user.save();

    return { success: true, message: 'Mot de passe modifié avec succès' };
  }

  async updatePassword(userId, newPasswordHash) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new HttpNotFoundError('Utilisateur non trouvé');
    }

    user.password = newPasswordHash;
    await user.save();

    return user;
  }

  // ============= UPLOAD IMAGE =============

  async updateUserProfilePicture(userId, imageUrl, imagePath = null) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new HttpNotFoundError('Utilisateur non trouvé');
    }

    user.imageUrl = imageUrl;
    if (imagePath) {
      user.imagePath = imagePath;
    }
    await user.save();

    const updatedUser = user.toJSON();
    delete updatedUser.password;
    
    return updatedUser;
  }

  // ============= SUPPRESSION =============

  async deleteUser(id) {
    const user = await User.findByPk(id);
    
    if (!user) {
      throw new HttpNotFoundError('Utilisateur introuvable');
    }

    await user.destroy();
    return { success: true, message: 'Utilisateur supprimé avec succès' };
  }

  // ============= AUTHENTIFICATION =============

  async verifyPassword(user, password) {
    return await argon2.verify(user.password, password);
  }

  // ============= JOUEURS =============

  async getPlayersByTeam(teamId) {
    const players = await User.findAll({
      where: {
        teamId,
        role: 'player',
        isActive: true
      },
      include: [{
        model: Statistics,
        as: 'statistics',
        where: { season: '2024-2025' },
        required: false
      }],
      attributes: { exclude: ['password'] },
      order: [['playerNumber', 'ASC']]
    });

    return players;
  }

  async getPlayersByRole(role = 'player', filters = {}) {
    const { teamId, isActive = true } = filters;
    
    const where = { role, isActive };
    if (teamId) where.teamId = teamId;

    return await User.findAll({
      where,
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'namePl', 'category']
      }],
      attributes: { exclude: ['password'] },
      order: [['playerNumber', 'ASC']]
    });
  }

  async getCoaches() {
    return await User.findAll({
      where: {
        role: 'coach',
        isActive: true
      },
      include: [{
        model: Team,
        as: 'coachedTeams',
        attributes: ['id', 'name', 'namePl', 'category']
      }],
      attributes: { exclude: ['password'] },
      order: [['lastName', 'ASC']]
    });
  }

  // ============= RECHERCHE =============

  async searchUsers(query) {
    if (!query || query.trim().length === 0) {
      throw new HttpBadRequestError('Le terme de recherche est requis');
    }

    return await User.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${query}%` } },
          { lastName: { [Op.iLike]: `%${query}%` } },
          { username: { [Op.iLike]: `%${query}%` } }
        ],
        isActive: true
      },
      include: [{
        model: Team,
        as: 'team',
        attributes: ['id', 'name', 'category']
      }],
      attributes: UserService.PUBLIC_ATTRIBUTES,
      limit: 10
    });
  }

  // ============= STATISTIQUES =============

  async getUserWithStatistics(userId, season = null) {
    const include = [{
      model: Team,
      as: 'team',
      attributes: ['id', 'name', 'namePl', 'category']
    }];

    if (season) {
      include.push({
        model: Statistics,
        as: 'statistics',
        where: { season }
      });
    } else {
      include.push({
        model: Statistics,
        as: 'statistics',
        order: [['season', 'DESC']],
        limit: 5
      });
    }

    const user = await User.findByPk(userId, {
      include,
      attributes: UserService.PUBLIC_ATTRIBUTES
    });

    if (!user) {
      throw new HttpNotFoundError('Utilisateur introuvable');
    }

    return user;
  }
}

export default new UserService();