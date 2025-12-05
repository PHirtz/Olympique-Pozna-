import { apiRequest } from './client.js';
import { loginUser as setLoginUser, logout as clearAuth } from '$lib/stores/auth';

/**
 * Connexion utilisateur
 * @param {Object} credentials
 * @param {string} [credentials.email] - Email de l'utilisateur
 * @param {string} [credentials.username] - Username de l'utilisateur
 * @param {string} credentials.password - Mot de passe
 */
export async function login(credentials) {
  const response = await apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (response.success && response.data) {
    // Stocker l'utilisateur et le token
    setLoginUser(response.data.user, response.data.token);
  }

  return response;
}

/**
 * Inscription utilisateur
 * @param {Object} data - Données utilisateur
 */
export async function register(data) {
  const response = await apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  // Optionnel : connexion automatique après inscription
  if (response.success && response.data?.token) {
    setLoginUser(response.data.user, response.data.token);
  }

  return response;
}

/**
 * Déconnexion
 */
export async function logout() {
  clearAuth();
  return { success: true };
}