import * as teamsApi from '$lib/api/teams.js';
import * as playersApi from '$lib/api/players.js';

export async function load({ params }) {
  const { slug } = params;
  
  try {
    const teamResponse = await teamsApi.getTeamBySlug(slug);
    if (!teamResponse.success) {
      return {
        team: null,
        players: [],
        error: 'Équipe introuvable'
      };
    }

    const team = teamResponse.data;
    const playersResponse = await playersApi.getPlayersByTeam(team.id);
    
    // 🔍 DEBUG : Voir ce que retourne l'API
    console.log('🔍 Premier joueur brut:', playersResponse.data?.players?.[0]);
    
  const players = playersResponse.success && playersResponse.data?.players
    ? playersResponse.data.players.map(player => {
        return {
          id: player.id,
          number: player.jerseyNumber,
          firstName: player.firstName,
          lastName: player.lastName,
          name: `${player.firstName} ${player.lastName}`,
          photo: player.photoUrl || '/no-pics.jpg',
          // Utilise camelCase comme le backend retourne
          positionPL: player.positionPl,
          position: player.position,
          originPL: player.nationalityPl,
          origin: player.nationality,
          nickname: player.nickname,
          birthYear: player.birthYear,
          distinctions: [
            player.distinction1,
            player.distinction2,
            player.distinction3,
            player.distinction4,
            player.distinction5
          ].filter(Boolean)
        };
      })
    : [];

    return {
      team,
      players,
      error: null
    };
  } catch (err) {
    console.error('❌ Erreur chargement équipe:', err);
    return {
      team: null,
      players: [],
      error: 'Impossible de charger l\'équipe'
    };
  }
}