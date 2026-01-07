const API_BASE_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:5000/api';

export async function getPlayers(params = {}) {
  const searchParams = new URLSearchParams();
  
  if (params.teamId) searchParams.append('teamId', params.teamId);
  if (params.isActive !== undefined) searchParams.append('isActive', params.isActive);
  if (params.page) searchParams.append('page', params.page);
  if (params.limit) searchParams.append('limit', params.limit);

  const url = `${API_BASE_URL}/players?${searchParams.toString()}`;
  
  console.log('🔍 Fetching players from:', url);
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des joueurs');
  }
  
  return response.json();
}

export async function getPlayer(id) {
  const response = await fetch(`${API_BASE_URL}/players/${id}`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération du joueur');
  }
  
  return response.json();
}

export async function getPlayersByTeam(teamId) {
  return getPlayers({ 
    teamId, 
    // isActive: true, // ← Commente cette ligne
    limit: 100
  });
}