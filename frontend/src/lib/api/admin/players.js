import { apiRequest } from '../client.js';

// Liste des joueurs (admin avec pagination)
export function getAll(params = {}) {
  const searchParams = new URLSearchParams(params).toString();
  return apiRequest(`/players/admin?${searchParams}`);
}

// Détails d'un joueur
export function getById(id) {
  return apiRequest(`/players/admin/${id}`);
}

// Créer un joueur
export function create(formData) {
  return apiRequest('/players/admin', {
    method: 'POST',
    body: formData
  });
}

// Modifier un joueur
export function update(id, formData) {
  return apiRequest(`/players/admin/${id}`, {
    method: 'PUT',
    body: formData
  });
}

// Supprimer un joueur
export function deletePlayer(id) {
  return apiRequest(`/players/admin/${id}`, {
    method: 'DELETE'
  });
}