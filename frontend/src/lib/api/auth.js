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
  const response = await apiRequest('/users', {
    method: 'POST',
    body: userData,
  });
  
  console.log('REGISTER RESPONSE', response);
  
  if (response?.success && response?.data) {
    setLoginUser(response.data.user, response.data.token);
  }
  
  return response;
}

/**
 * Connexion utilisateur
 * @param {string} username
 * @param {string} password
 */
export async function login(username, password) {
  const response = await apiRequest('/users/login', {
    method: 'POST',
    body: { username, password },
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
