import { apiRequest } from './client';

export function getPlayers(params = {}) {
  const searchParams = new URLSearchParams(params).toString();
  return apiRequest(`/players?${searchParams}`);
}

export function getPlayer(id) {
  return apiRequest(`/players/${id}`);
}

export function getPlayersByTeam(teamId) {
  return getPlayers({
    teamId,
    // isActive: true,
    limit: 100
  });
}