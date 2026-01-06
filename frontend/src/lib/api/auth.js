import { apiRequest } from './client.js';
import {
  loginUser as setLoginUser,
  logout as clearAuth,
  getToken,
  user
} from '$lib/stores/auth';
import { get } from 'svelte/store';

/**
 * Inscription utilisateur
 * @param {Object} userData - Données utilisateur
 */
export async function register(userData) {
  // ✅ route correcte côté backend
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
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

  if (response?.success && response?.data) {
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
 */
export function isAuthenticated() {
  return !!getToken();
}

/**
 * Vérifier si l'utilisateur est admin
 */
export function isAdmin() {
  const currentUser = get(user);
  return currentUser?.role === 'admin';
}

/**
 * Récupérer l'utilisateur actuel
 */
export function getCurrentUser() {
  return get(user);
}
