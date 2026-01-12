import { apiRequest } from '../client';

export function getAll(params = {}) {
  const searchParams = new URLSearchParams(params).toString();
  return apiRequest(`/players?${searchParams}`);
}

export function getById(id) {
  return apiRequest(`/players/${id}`);
}

export function create(formData) {
  return apiRequest('/players', {
    method: 'POST',
    body: formData
  });
}

export function update(id, formData) {
  return apiRequest(`/players/${id}`, {
    method: 'PUT',
    body: formData
  });
}

export function deletePlayer(id) {
  return apiRequest(`/players/${id}`, {
    method: 'DELETE'
  });
}