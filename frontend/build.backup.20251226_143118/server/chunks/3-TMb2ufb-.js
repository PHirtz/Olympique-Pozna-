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
const imports = ["_app/immutable/nodes/3.BlwfuNT7.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/69_IOA4Y.js","_app/immutable/chunks/DIeogL5L.js","_app/immutable/chunks/BCiTZPL4.js","_app/immutable/chunks/DcbGj4HI.js","_app/immutable/chunks/BqSiu8H-.js","_app/immutable/chunks/BWK43h2m.js","_app/immutable/chunks/BlfuTCKK.js","_app/immutable/chunks/CaVwYMDW.js","_app/immutable/chunks/BeisVtk3.js","_app/immutable/chunks/BMLd0klQ.js","_app/immutable/chunks/C3ne98XX.js","_app/immutable/chunks/BADDifj7.js","_app/immutable/chunks/CMQPevso.js","_app/immutable/chunks/B8EHdlT2.js","_app/immutable/chunks/C-74er22.js","_app/immutable/chunks/BOCGGk5l.js","_app/immutable/chunks/KR6DCaM1.js","_app/immutable/chunks/DoAo2tbP.js","_app/immutable/chunks/-kz0PtXj.js","_app/immutable/chunks/VAe3KUUh.js","_app/immutable/chunks/JA9YZJfr.js","_app/immutable/chunks/nmIcSjbl.js","_app/immutable/chunks/D9Q4NdxF.js","_app/immutable/chunks/NQKgz6wV.js"];
const stylesheets = ["_app/immutable/assets/Footer.BXR3axXK.css","_app/immutable/assets/Navigation.sCUOQSaz.css","_app/immutable/assets/3.DXzhHaXe.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=3-TMb2ufb-.js.map
