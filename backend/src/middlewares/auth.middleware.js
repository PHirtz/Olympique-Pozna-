import jwt from 'jsonwebtoken';
import { HttpUnauthorizedError, HttpForbiddenError } from '../errors/http.errors.js';

/**
 * Middleware d'authentification JWT
 * Vérifie la présence et la validité du token JWT
 * Ajoute userId et req.user.role à req
 */

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpUnauthorizedError('Token d\'authentification manquant');
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId,
      role: decoded.role?.toLowerCase(),
      email: decoded.email,
      username: decoded.username
    };

    console.log("Auth user:", req.user);
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      next(new HttpUnauthorizedError('Token invalide'));
    } else if (error.name === 'TokenExpiredError') {
      next(new HttpUnauthorizedError('Token expiré'));
    } else {
      next(error);
    }
  }
};

/**
 * Middleware de vérification des rôles
 * Vérifie que l'utilisateur a l'un des rôles autorisés
 * À utiliser APRÈS authMiddleware
 */

export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return next(new HttpUnauthorizedError('Authentification requise'));
    }

    // Normaliser les rôles autorisés en minuscules
    const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase());
    
    if (!normalizedAllowedRoles.includes(req.user.role)) {
      // Ajouter des logs pour déboguer
      console.log('❌ Rôle refusé:', {
        userRole: req.user.role,
        allowedRoles: normalizedAllowedRoles,
        originalRoles: allowedRoles
      });
      return next(new HttpForbiddenError('Accès refusé : rôle insuffisant'));
    }

    next();
  };
};

/**
 * Middleware optionnel : authentification si token présent
 * Utile pour des routes publiques qui peuvent avoir un comportement différent pour les users connectés
 */

export const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId,
      role: decoded.role?.toLowerCase(),
      email: decoded.email,
      username: decoded.username
    };

    next();
  } catch (error) {
    next();
  }
};

/**
 * Middleware de vérification d'ownership
 * Vérifie que l'utilisateur est propriétaire de la ressource OU est admin
 * À utiliser APRÈS authMiddleware
 */
export const requireOwnership = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    const resourceUserId = parseInt(req.params[resourceUserIdField] || req.params.id);
    const currentUserId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!isAdmin && resourceUserId !== currentUserId) {
      return next(new HttpForbiddenError('Accès refusé : vous n\'êtes pas le propriétaire de cette ressource'));
    }

    next();
  };
};

/**
 * Utilitaire pour générer un token JWT
 */
export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      role: user.role?.toLowerCase(),
      email: user.email,
      username: user.username
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d'
    }
  );
};

/**
 * Utilitaire pour générer un refresh token (durée plus longue)
 */
export const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
      type: 'refresh'
    },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  );
};