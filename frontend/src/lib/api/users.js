import { apiRequest } from './client.js';

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getAllUsers(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/users?${query}`);
}

/**
 * @param {number} id
 */
export async function getUserById(id) {
  return apiRequest(`/users/${id}`);
}

/**
 * @param {Record<string, any>} data
 */
export async function createUser(data) {
  return apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 * @param {Record<string, any>} data
 */
export async function updateUser(id, data) {
  return apiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 */
export async function deleteUser(id) {
  return apiRequest(`/users/${id}`, { method: 'DELETE' });
}

/**
 * @param {number} teamId
 */
export async function getPlayersByTeam(teamId) {
  return apiRequest(`/users/team/${teamId}/players`);
}