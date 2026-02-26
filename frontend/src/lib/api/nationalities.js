import { apiRequest } from './client.js';

/**
 * Récupérer toutes les nationalités
 * @param {string} locale - Langue (fr, pl, en)
 */
export async function getAll(locale = 'fr') {
  return await apiRequest(`/nationalities?locale=${locale}`);
}