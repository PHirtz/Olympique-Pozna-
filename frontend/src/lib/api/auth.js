import { apiRequest } from './client.js';
import { loginUser as setLoginUser, logout as clearAuth, getToken, user } from '$lib/stores/auth';
import { get } from 'svelte/store';

/**
 * Inscription utilisateur
 * @param {Object} userData - Données utilisateur
 */
export async function register(userData) {
  const response = await apiRequest('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  
  return response;
}

/**
 * Connexion utilisateur
 * @param {string} username - Nom d'utilisateur
 * @param {string} password - Mot de passe
 */
export async function login(username, password) {
  const response = await apiRequest('/users/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });

  if (response.success && response.data) {
    // Stocker l'utilisateur et le token
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

/**
 * Vérifier si l'utilisateur est authentifié
 * @returns {boolean}
 */
export function isAuthenticated() {
  return !!getToken();
}

/**
 * Vérifier si l'utilisateur est admin
 * @returns {boolean}
 */
export function isAdmin() {
  const currentUser = get(user);
  return currentUser?.role === 'admin';
}

/**
 * Récupérer l'utilisateur actuel
 * @returns {Object|null}
 */
export function getCurrentUser() {
  return get(user);
}