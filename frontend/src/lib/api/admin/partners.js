import { apiRequest } from '../client.js';

/**
 * API Admin - Gestion des sponsors (partners)
 * Toutes ces routes nécessitent une authentification admin
 */

/**
 * Récupérer tous les sponsors (admin)
 * @param {Object} params - Paramètres de filtre
 * @returns {Promise<Object>}
 */
export async function getAll(params = {}) {
  const queryParams = new URLSearchParams(params).toString();
  const endpoint = `/admin/partners${queryParams ? `?${queryParams}` : ''}`;
  return apiRequest(endpoint, { method: 'GET' });
}

/**
 * Récupérer un sponsor par ID (admin)
 * @param {number} id - ID du sponsor
 * @returns {Promise<Object>}
 */
export async function getById(id) {
  return apiRequest(`/admin/partners/${id}`, { method: 'GET' });
}

/**
 * Créer un nouveau sponsor (admin)
 * @param {Object} data - Données du sponsor
 * @returns {Promise<Object>}
 */
export async function create(data) {
  return apiRequest('/admin/partners', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Mettre à jour un sponsor (admin)
 * @param {number} id - ID du sponsor
 * @param {Object} data - Données à mettre à jour
 * @returns {Promise<Object>}
 */
export async function update(id, data) {
  return apiRequest(`/admin/partners/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Supprimer un sponsor (admin)
 * @param {number} id - ID du sponsor
 * @returns {Promise<Object>}
 */
export async function deletePartner(id) {
  return apiRequest(`/admin/partners/${id}`, { method: 'DELETE' });
}
