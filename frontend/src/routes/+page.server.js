import { getLatestNews } from '$lib/api/news';
import { getUpcomingMatches } from '$lib/api/matches';
// Note: il faut créer events.js aussi (je te le donne après)

export async function load() {
  try {
    const [newsResponse, matchesResponse] = await Promise.all([
      getLatestNews(5),
      getUpcomingMatches({ limit: 3 })
    ]);

    return {
      news: newsResponse.data || [],
      matches: matchesResponse.data?.matches || []
    };
  } catch (error) {
    console.error('Erreur chargement données:', error);
    return {
      news: [],
      matches: []
    };
  }
}