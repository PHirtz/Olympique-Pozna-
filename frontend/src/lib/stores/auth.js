import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Crée un store persistant dans localStorage
 * @param {string} key - Clé localStorage
 * @param {any} initial - Valeur initiale
 */
function persistStore(key, initial) {
  const store = writable(initial);
  
  if (browser) {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        store.set(JSON.parse(saved));
      } catch (e) {
        console.error(`Erreur parsing ${key} depuis localStorage:`, e);
      }
    }
    
    store.subscribe(value => {
      if (value === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    });
  }
  
  return store;
}

// Stores d'authentification
export const user = persistStore('olympique_user', null);
export const token = persistStore('olympique_token', null);

/**
 * Connecter un utilisateur
 * @param {Object} userData - Données utilisateur
 * @param {string} authToken - Token JWT
 */
export function loginUser(userData, authToken) {
  user.set(userData);
  token.set(authToken);
  
  if (import.meta.env.DEV) {
    console.log('✅ Utilisateur connecté:', userData);
    console.log('🔑 Token stocké');
  }
}

/**
 * Déconnecter l'utilisateur
 */
export function logout() {
  user.set(null);
  token.set(null);
  
  if (browser) {
    localStorage.removeItem('olympique_user');
    localStorage.removeItem('olympique_token');
  }
  
  if (import.meta.env.DEV) {
    console.log('👋 Utilisateur déconnecté');
  }
}

/**
 * Vérifier si l'utilisateur est connecté
 * @returns {boolean}
 */
export function isAuthenticated() {
  let isAuth = false;
  const unsubscribe = token.subscribe(t => {
    isAuth = !!t;
  });
  unsubscribe();
  return isAuth;
}

/**
 * Obtenir le token actuel
 * @returns {string|null}
 */
export function getToken() {
  let currentToken = null;
  const unsubscribe = token.subscribe(t => {
    currentToken = t;
  });
  unsubscribe();
  return currentToken;
}