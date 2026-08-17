import { HttpUnauthorizedError } from '../errors/http.errors.js';

export const verifyApiKey = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const apiKey = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!apiKey || apiKey !== process.env.ACADEMY_API_KEY) {
    return next(new HttpUnauthorizedError('Clé API invalide ou manquante'));
  }

  next();
};
