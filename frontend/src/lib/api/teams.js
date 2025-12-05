import { apiRequest } from './client.js';

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getAllTeams(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/teams?${query}`);
}

/**
 * @param {number} id
 */
export async function getTeamById(id) {
  return apiRequest(`/teams/${id}`);
}

/**
 * @param {Record<string, any>} data
 */
export async function createTeam(data) {
  return apiRequest('/teams', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 * @param {Record<string, any>} data
 */
export async function updateTeam(id, data) {
  return apiRequest(`/teams/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 */
export async function deleteTeam(id) {
  return apiRequest(`/teams/${id}`, { method: 'DELETE' });
}