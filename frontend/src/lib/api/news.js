import { apiRequest } from './client.js';

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getAllNews(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/news?${query}`);
}

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getPublishedNews(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/news/published?${query}`);
}

/**
 * @param {number} [limit=5]
 */
export async function getLatestNews(limit = 5) {
  return apiRequest(`/news/latest?limit=${limit}`);
}

export async function getPinnedNews() {
  return apiRequest('/news/pinned');
}

/**
 * @param {number} id
 */
export async function getNewsById(id) {
  return apiRequest(`/news/${id}`);
}

/**
 * @param {string} slug
 */
export async function getNewsBySlug(slug) {
  return apiRequest(`/news/slug/${slug}`);
}

/**
 * @param {Record<string, any>} data
 */
export async function createNews(data) {
  return apiRequest('/news', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 * @param {Record<string, any>} data
 */
export async function updateNews(id, data) {
  return apiRequest(`/news/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 */
export async function publishNews(id) {
  return apiRequest(`/news/${id}/publish`, { method: 'POST' });
}

/**
 * @param {number} id
 */
export async function deleteNews(id) {
  return apiRequest(`/news/${id}`, { method: 'DELETE' });
}