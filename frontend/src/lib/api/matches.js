import { apiRequest } from './client.js';

export async function getAllMatches(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/matches?${query}`);
}

export async function getUpcomingMatches(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/matches/upcoming?${query}`);
}

export async function getPastMatches(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/matches/past?${query}`);
}

export async function getMatchById(id) {
  return apiRequest(`/matches/${id}`);
}

export async function createMatch(data) {
  return apiRequest('/matches', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateMatch(id, data) {
  return apiRequest(`/matches/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteMatch(id) {
  return apiRequest(`/matches/${id}`, { 
    method: 'DELETE' 
  });
}
