import { g as getToken, l as logout } from "../../chunks/auth.js";
import { B as BROWSER } from "../../chunks/false.js";
const browser = BROWSER;
const PUBLIC_API_URL = "http://localhost:5000/api";
async function apiRequest(endpoint, options = {}) {
  const url = `${PUBLIC_API_URL}${endpoint}`;
  const token = getToken();
  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...token ? { "Authorization": `Bearer ${token}` } : {},
      ...options.headers || {}
    }
  };
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (response.status === 401) {
      if (browser) ;
      throw new Error("Session expirée. Veuillez vous reconnecter.");
    }
    if (!response.ok) {
      throw new Error(data.message || "Une erreur est survenue");
    }
    return data;
  } catch (error) {
    console.error("Erreur API:", error);
    throw error;
  }
}
async function getUpcomingMatches(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/matches/upcoming?${query}`);
}
async function getLatestNews(limit = 5) {
  return apiRequest(`/news/latest?limit=${limit}`);
}
async function load() {
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
    console.error("Erreur chargement données:", error);
    return {
      news: [],
      matches: []
    };
  }
}
export {
  load
};
