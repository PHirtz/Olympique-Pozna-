import { apiRequest } from './client.js';

export async function getAll(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/partners?${query}`);
}

export async function getById(id) {
  return apiRequest(`/partners/${id}`);
}

export async function create(data) {
  return apiRequest('/partners', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function update(id, data) {
  return apiRequest(`/partners/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deletePartner(id) {
  return apiRequest(`/partners/${id}`, { method: 'DELETE' });
}