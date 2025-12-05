import { apiRequest } from './client.js';

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getAllPartners(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/partners?${query}`);
}

/**
 * @param {number} id
 */
export async function getPartnerById(id) {
  return apiRequest(`/partners/${id}`);
}

/**
 * @param {Record<string, any>} data
 */
export async function createPartner(data) {
  return apiRequest('/partners', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 * @param {Record<string, any>} data
 */
export async function updatePartner(id, data) {
  return apiRequest(`/partners/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 */
export async function deletePartner(id) {
  return apiRequest(`/partners/${id}`, { method: 'DELETE' });
}