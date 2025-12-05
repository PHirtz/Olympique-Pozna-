import { apiRequest } from './client.js';

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getAllCamps(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/camps?${query}`);
}

/**
 * @param {number} [limit=5]
 */
export async function getUpcomingCamps(limit = 5) {
  return apiRequest(`/camps/upcoming?limit=${limit}`);
}

export async function getAvailableCamps() {
  return apiRequest('/camps/available');
}

/**
 * @param {string} type
 * @param {string} year
 */
export async function getCampsBySeason(type, year) {
  return apiRequest(`/camps/season/${type}?year=${year}`);
}

/**
 * @param {number} id
 */
export async function getCampById(id) {
  return apiRequest(`/camps/${id}`);
}

/**
 * @param {Record<string, any>} data
 */
export async function createCamp(data) {
  return apiRequest('/camps', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 * @param {Record<string, any>} data
 */
export async function updateCamp(id, data) {
  return apiRequest(`/camps/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 */
export async function deleteCamp(id) {
  return apiRequest(`/camps/${id}`, { method: 'DELETE' });
}