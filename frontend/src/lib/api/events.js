import { apiRequest } from './client.js';

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getAllEvents(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/events?${query}`);
}

/**
 * @param {number} [limit=10]
 */
export async function getUpcomingEvents(limit = 10) {
  return apiRequest(`/events/upcoming?limit=${limit}`);
}

/**
 * @param {number} id
 */
export async function getEventById(id) {
  return apiRequest(`/events/${id}`);
}

/**
 * @param {Record<string, any>} data
 */
export async function createEvent(data) {
  return apiRequest('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 * @param {Record<string, any>} data
 */
export async function updateEvent(id, data) {
  return apiRequest(`/events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 */
export async function deleteEvent(id) {
  return apiRequest(`/events/${id}`, { method: 'DELETE' });
}