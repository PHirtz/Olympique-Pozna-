import { apiRequest } from '../client.js';

/**
 * API Admin - Gestion des joueurs (players)
 * Toutes ces routes nécessitent une authentification admin
 */

/**
 * Récupérer tous les joueurs (admin)
 * @param {Object} params - Paramètres de filtre (teamId, isActive, page, limit)
 * @returns {Promise<Object>}
 */
export async function getAll(params = {}) {
  const queryParams = new URLSearchParams(params).toString();
  const endpoint = `/players${queryParams ? `?${queryParams}` : ''}`;
  return apiRequest(endpoint, { method: 'GET' });
}

/**
 * Récupérer un joueur par ID (admin)
 * @param {number} id - ID du joueur
 * @returns {Promise<Object>}
 */
export async function getById(id) {
  return apiRequest(`/players/${id}`, { method: 'GET' });
}

/**
 * Créer un nouveau joueur (admin)
 * @param {FormData} formData - Données du joueur avec photo
 * @returns {Promise<Object>}
 */
export async function create(formData) {
  // Pour FormData, on ne met pas de Content-Type
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/players`, {
    method: 'POST',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: formData // FormData directement
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la création');
  }
  return data;
}

/**
 * Mettre à jour un joueur (admin)
 * @param {number} id - ID du joueur
 * @param {FormData} formData - Données à mettre à jour avec photo optionnelle
 * @returns {Promise<Object>}
 */
export async function update(id, formData) {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`${import.meta.env.PUBLIC_API_URL}/players/${id}`, {
    method: 'PUT',
    headers: {
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
    body: formData
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Erreur lors de la modification');
  }
  return data;
}

/**
 * Supprimer un joueur (admin)
 * @param {number} id - ID du joueur
 * @returns {Promise<Object>}
 */
export async function deletePlayer(id) {
  return apiRequest(`/players/${id}`, { method: 'DELETE' });
}