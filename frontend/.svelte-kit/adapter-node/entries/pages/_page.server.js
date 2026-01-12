import { g as getToken, l as logout } from "../../chunks/auth.js";
import { D as DEV } from "../../chunks/false.js";
const browser = DEV;
const PUBLIC_API_URL = "https://olympiquepoznan.pl/api";
async function apiRequest(endpoint, options = {}) {
  const url = `${PUBLIC_API_URL}${endpoint}`;
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...token ? { Authorization: `Bearer ${token}` } : {},
    ...isFormData ? {} : { "Content-Type": "application/json" },
    ...options.headers || {}
  };
  const config = {
    ...options,
    headers
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
