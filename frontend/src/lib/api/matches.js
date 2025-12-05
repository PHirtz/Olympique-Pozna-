import { apiRequest } from './client.js';

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getAllMatches(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/matches?${query}`);
}

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getUpcomingMatches(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/matches/upcoming?${query}`);
}

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getPastMatches(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/matches/past?${query}`);
}

/**
 * @param {number} id
 */
export async function getMatchById(id) {
  return apiRequest(`/matches/${id}`);
}

/**
 * @param {Record<string, any>} data
 */
export async function createMatch(data) {
  return apiRequest('/matches', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 * @param {Record<string, any>} data
 */
export async function updateMatch(id, data) {
  return apiRequest(`/matches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 */
export async function deleteMatch(id) {
  return apiRequest(`/matches/${id}`, { method: 'DELETE' });
}