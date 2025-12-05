import { PUBLIC_API_URL } from '$env/static/public';
import { getToken } from '$lib/stores/auth';

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {any} data
 * @property {string} [message]
 */

/**
 * Effectue une requête HTTP vers l'API
 * @param {string} endpoint - Le chemin de l'endpoint
 * @param {RequestInit} [options={}] - Options fetch
 * @returns {Promise<ApiResponse>}
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${PUBLIC_API_URL}${endpoint}`;
  
  // Récupérer le token automatiquement
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue');
  }

  return data;
}