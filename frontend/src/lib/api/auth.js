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
 * @param {string} identifier - Username ou Email
 * @param {string} password
 */
export async function login(identifier, password) {
  const response = await apiRequest('/users/login', {
    method: 'POST',
    body: { identifier, password }, // Envoie identifier au lieu de username
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

/**
 * Mot de passe oublié
 * @param {string} email
 */
export async function forgotPassword(email, locale = 'pl') {
  return await apiRequest('/auth/forgot-password', {
    method: 'POST',
    body: { email, locale },
  });
}

/**
 * Réinitialiser le mot de passe
 * @param {string} token
 * @param {string} newPassword
 */
export async function resetPassword(token, newPassword) {
  return await apiRequest('/auth/reset-password', {
    method: 'POST',
    body: { token, newPassword },
  });
}

/**
 * Changer le mot de passe (connecté)
 * @param {string} currentPassword
 * @param {string} newPassword
 */
export async function changePassword(currentPassword, newPassword) {
  return await apiRequest('/auth/change-password', {
    method: 'PUT',
    body: { currentPassword, newPassword },
  });
}