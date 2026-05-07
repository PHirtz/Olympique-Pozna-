import { g as getToken } from './auth-By6dChTT.js';
import { U as BROWSER } from './utils2-Bf5dtsip.js';
import './index-BEapQtpA.js';

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

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cq7uPTtE.js')).default;
const server_id = "src/routes/+page.server.js";
const imports = ["_app/immutable/nodes/3.BJi0kj-v.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/DCkW3Mu1.js","_app/immutable/chunks/BOH49W78.js","_app/immutable/chunks/CiD4EkAc.js","_app/immutable/chunks/CpWiCzCL.js","_app/immutable/chunks/DrSB0OLp.js","_app/immutable/chunks/K0__0awE.js","_app/immutable/chunks/DwbAyKq7.js","_app/immutable/chunks/Bht1pefN.js","_app/immutable/chunks/Cje3Gi54.js","_app/immutable/chunks/Dm1SwslI.js","_app/immutable/chunks/DhWTIj6G.js","_app/immutable/chunks/UkXSlYdl.js","_app/immutable/chunks/CoNcDfu4.js","_app/immutable/chunks/BxBirpYo.js","_app/immutable/chunks/D5lIx47y.js","_app/immutable/chunks/BQGBOVGT.js","_app/immutable/chunks/CPqUt7tK.js","_app/immutable/chunks/DD6Sbjxb.js","_app/immutable/chunks/KjhYifJJ.js","_app/immutable/chunks/DUyr6-Vh.js","_app/immutable/chunks/FZ8hIzBP.js","_app/immutable/chunks/CKZYx0-9.js"];
const stylesheets = ["_app/immutable/assets/Footer.BXR3axXK.css","_app/immutable/assets/Navigation.BKrAffR-.css","_app/immutable/assets/3.DXzhHaXe.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=3-DJOeAs-I.js.map
