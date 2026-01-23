import { apiRequest } from '../client.js';

/**
 * Récupère le nombre total d'équipes
 */
export async function getCount() {
  return apiRequest('/admin/teams/count');
}

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getAll(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/admin/teams${query ? `?${query}` : ''}`);
}

/**
 * @param {number} id
 */
export async function getById(id) {
  return apiRequest(`/admin/teams/${id}`);
}

/**
 * @param {Record<string, any>} data
 */
export async function createTeam(data) {
  return apiRequest('/admin/teams', {
    method: 'POST',
    body: data,
  });
}

/**
 * @param {number} id
 * @param {Record<string, any>} data
 */
export async function updateTeam(id, data) {
  return apiRequest(`/admin/teams/${id}`, {
    method: 'PUT',
    body: data,
  });
}

/**
 * @param {number} id
 */
export async function deleteTeam(id) {
  return apiRequest(`/admin/teams/${id}`, { method: 'DELETE' }); 
}