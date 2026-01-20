import { apiRequest } from './client.js';

export async function getAllNews(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/news?${query}`);
}

export async function getPublishedNews(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/news/published?${query}`);
}

export async function getLatestNews(limit = 5) {
  return apiRequest(`/news/latest?limit=${limit}`);
}

export async function getPinnedNews() {
  return apiRequest('/news/pinned');
}

export async function getNewsById(id) {
  return apiRequest(`/news/${id}`);
}

export async function getNewsBySlug(slug) {
  return apiRequest(`/news/slug/${slug}`);
}

export async function createNews(data) {
  return apiRequest('/news', {
    method: 'POST',
    body: JSON.stringify(data)
  });
}

export async function updateNews(id, data) {
  return apiRequest(`/news/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data)
  });
}

export async function deleteNews(id) {
  return apiRequest(`/news/${id}`, {
    method: 'DELETE'
  });
}