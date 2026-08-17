import { HttpUnauthorizedError } from '../errors/http.errors.js';

/**
 * Middleware de vérification du token API
 * Utilisé pour les accès externes (ex: intégration Football Academy Manager)
 * Vérifie la présence et la validité de la clé API dans le header X-API-Key
 */
export const verifyApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.ACADEMY_API_KEY) {
    return next(new HttpUnauthorizedError('Clé API invalide ou manquante'));
  }

  next();
};