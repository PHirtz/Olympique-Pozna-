import { apiRequest } from '../client.js';

/**
 * Récupérer tous les sponsors (admin)
 */
export async function getAll(params = {}) {
  const queryParams = new URLSearchParams(params).toString();
  const endpoint = `/admin/partners${queryParams ? `?${queryParams}` : ''}`;
  return apiRequest(endpoint, { method: 'GET' });
}

/**
 * Récupérer un sponsor par ID (admin)
 */
export async function getById(id) {
  return apiRequest(`/admin/partners/${id}`, { method: 'GET' });
}

/**
 * Créer un nouveau sponsor (admin)
 */
export async function create(data) {
  return apiRequest('/admin/partners', {
    method: 'POST',
    body: data,
  });
}

/**
 * Mettre à jour un sponsor (admin)
 */
export async function update(id, data) {
  return apiRequest(`/admin/partners/${id}`, {
    method: 'PUT',
    body: data,
  });
}

/**
 * Supprimer un sponsor (admin)
 */
export async function deletePartner(id) {
  return apiRequest(`/admin/partners/${id}`, { method: 'DELETE' });
}