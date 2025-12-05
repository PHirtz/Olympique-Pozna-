import { apiRequest } from './client.js';

/**
 * Envoyer un message de contact
 * @param {Object} data
 * @param {string} data.firstName
 * @param {string} data.lastName
 * @param {string} data.email
 * @param {string} [data.phone]
 * @param {string} data.subject
 * @param {string} data.message
 */
export async function sendContactForm(data) {
  return apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}