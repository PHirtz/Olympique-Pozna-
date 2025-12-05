import { apiRequest } from './client.js';

/**
 * @param {Record<string, any>} data
 */
export async function createRegistration(data) {
  return apiRequest('/camp-registrations', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @param {string} email
 */
export async function getRegistrationsByParent(email) {
  return apiRequest(`/camp-registrations/parent?email=${encodeURIComponent(email)}`);
}

/**
 * @param {string} token
 */
export async function getRegistrationByToken(token) {
  return apiRequest(`/camp-registrations/token/${token}`);
}

/**
 * @param {string} token
 */
export async function confirmRegistration(token) {
  return apiRequest(`/camp-registrations/confirm/${token}`, {
    method: 'POST',
  });
}

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getAllRegistrations(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/camp-registrations?${query}`);
}

/**
 * @param {number} campId
 */
export async function getRegistrationsByCamp(campId) {
  return apiRequest(`/camp-registrations/camp/${campId}`);
}

/**
 * @param {number} id
 */
export async function getRegistrationById(id) {
  return apiRequest(`/camp-registrations/${id}`);
}

/**
 * @param {number} id
 * @param {Record<string, any>} data
 */
export async function updateRegistration(id, data) {
  return apiRequest(`/camp-registrations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 * @param {string} [reason]
 */
export async function cancelRegistration(id, reason) {
  return apiRequest(`/camp-registrations/${id}/cancel`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  });
}

/**
 * @param {number} id
 * @param {number} paymentAmount
 * @param {string} [paymentDate]
 */
export async function markRegistrationAsPaid(id, paymentAmount, paymentDate) {
  return apiRequest(`/camp-registrations/${id}/pay`, {
    method: 'POST',
    body: JSON.stringify({ paymentAmount, paymentDate }),
  });
}

/**
 * @param {number} id
 */
export async function deleteRegistration(id) {
  return apiRequest(`/camp-registrations/${id}`, { method: 'DELETE' });
}