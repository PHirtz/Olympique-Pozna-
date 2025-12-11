import { PUBLIC_API_URL } from '$env/static/public';
import { getToken, logout } from '$lib/stores/auth';
import { browser } from '$app/environment';

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

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    // Gestion 401 : Token invalide ou expiré
    if (response.status === 401) {
      if (browser) {
        logout();
        window.location.href = '/login';
      }
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Une erreur est survenue');
    }

    return data;
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}
