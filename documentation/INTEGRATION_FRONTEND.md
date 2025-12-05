# 🎨 Intégration Frontend SvelteKit - Olympique Poznan

## 📡 Configuration de l'API Client

### 1. Créer un fichier API client (`src/lib/api.js`)

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Une erreur est survenue');
  }

  return data;
}

// API Functions
export const api = {
  // Users
  users: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/users?${query}`);
    },
    getById: (id) => apiRequest(`/users/${id}`),
    create: (data) => apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => apiRequest(`/users/${id}`, { method: 'DELETE' }),
    login: (credentials) => apiRequest('/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
    getPlayersByTeam: (teamId) => apiRequest(`/users/team/${teamId}/players`),
  },

  // Teams
  teams: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/teams?${query}`);
    },
    getById: (id) => apiRequest(`/teams/${id}`),
    create: (data) => apiRequest('/teams', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => apiRequest(`/teams/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => apiRequest(`/teams/${id}`, { method: 'DELETE' }),
  },

  // Matches
  matches: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/matches?${query}`);
    },
    getUpcoming: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/matches/upcoming?${query}`);
    },
    getPast: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/matches/past?${query}`);
    },
    getById: (id) => apiRequest(`/matches/${id}`),
    create: (data) => apiRequest('/matches', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => apiRequest(`/matches/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => apiRequest(`/matches/${id}`, { method: 'DELETE' }),
  },

  // News
  news: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/news?${query}`);
    },
    getPublished: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/news/published?${query}`);
    },
    getLatest: (limit = 5) => apiRequest(`/news/latest?limit=${limit}`),
    getById: (id) => apiRequest(`/news/${id}`),
    getBySlug: (slug) => apiRequest(`/news/slug/${slug}`),
    create: (data) => apiRequest('/news', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => apiRequest(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    publish: (id) => apiRequest(`/news/${id}/publish`, { method: 'POST' }),
    delete: (id) => apiRequest(`/news/${id}`, { method: 'DELETE' }),
  },

  // Products
  products: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/products?${query}`);
    },
    getById: (id) => apiRequest(`/products/${id}`),
    create: (data) => apiRequest('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => apiRequest(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => apiRequest(`/products/${id}`, { method: 'DELETE' }),
  },

  // Events
  events: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/events?${query}`);
    },
    getUpcoming: (limit = 10) => apiRequest(`/events/upcoming?limit=${limit}`),
    getById: (id) => apiRequest(`/events/${id}`),
    create: (data) => apiRequest('/events', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => apiRequest(`/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => apiRequest(`/events/${id}`, { method: 'DELETE' }),
  },

  // Gallery
  gallery: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/gallery?${query}`);
    },
    getAlbums: () => apiRequest('/gallery/albums'),
    getById: (id) => apiRequest(`/gallery/${id}`),
    create: (data) => apiRequest('/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => apiRequest(`/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => apiRequest(`/gallery/${id}`, { method: 'DELETE' }),
  },

  // Partners
  partners: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/partners?${query}`);
    },
    getById: (id) => apiRequest(`/partners/${id}`),
    create: (data) => apiRequest('/partners', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => apiRequest(`/partners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => apiRequest(`/partners/${id}`, { method: 'DELETE' }),
  },

  // Statistics
  statistics: {
    getAll: (params = {}) => {
      const query = new URLSearchParams(params).toString();
      return apiRequest(`/statistics?${query}`);
    },
    getTopScorers: (season, limit = 10) => 
      apiRequest(`/statistics/top-scorers?season=${season}&limit=${limit}`),
    getById: (id) => apiRequest(`/statistics/${id}`),
    create: (data) => apiRequest('/statistics', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id, data) => apiRequest(`/statistics/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    delete: (id) => apiRequest(`/statistics/${id}`, { method: 'DELETE' }),
  },
};
```

## 🔧 Configuration `.env` frontend

```env
# .env (ou .env.local)
VITE_API_URL=http://localhost:3000/api
```

## 📄 Exemples d'utilisation dans les pages SvelteKit

### Page d'accueil avec dernières news (`src/routes/+page.server.js`)

```javascript
import { api } from '$lib/api';

export async function load() {
  try {
    const latestNews = await api.news.getLatest(5);
    const upcomingMatches = await api.matches.getUpcoming({ limit: 3 });
    const upcomingEvents = await api.events.getUpcoming(3);

    return {
      news: latestNews.data,
      matches: upcomingMatches.data,
      events: upcomingEvents.data
    };
  } catch (error) {
    console.error('Erreur chargement données:', error);
    return {
      news: [],
      matches: [],
      events: []
    };
  }
}
```

### Page d'accueil (`src/routes/+page.svelte`)

```svelte
<script>
  export let data;
</script>

<section class="hero">
  <h1>Bienvenue à Olympique Poznan</h1>
</section>

<section class="news">
  <h2>Dernières actualités</h2>
  <div class="news-grid">
    {#each data.news as article}
      <article class="news-card">
        <img src={article.imageUrl} alt={article.title} />
        <h3>{article.title}</h3>
        <p>{article.excerpt}</p>
        <a href="/news/{article.slug}">Lire la suite</a>
      </article>
    {/each}
  </div>
</section>

<section class="matches">
  <h2>Prochains matchs</h2>
  <div class="match-list">
    {#each data.matches as match}
      <div class="match-card">
        <time>{new Date(match.matchDate).toLocaleDateString('fr-FR')}</time>
        <h4>{match.team.name} vs {match.opponentName}</h4>
        <p>{match.location}</p>
      </div>
    {/each}
  </div>
</section>
```

### Page équipes avec pagination (`src/routes/teams/+page.server.js`)

```javascript
import { api } from '$lib/api';

export async function load({ url }) {
  const page = url.searchParams.get('page') || 1;
  const category = url.searchParams.get('category');
  const season = url.searchParams.get('season') || '2024-2025';

  try {
    const response = await api.teams.getAll({ 
      page, 
      limit: 12,
      category,
      season,
      isActive: true
    });

    return {
      teams: response.data.teams,
      pagination: response.data.pagination
    };
  } catch (error) {
    console.error('Erreur chargement équipes:', error);
    return { teams: [], pagination: {} };
  }
}
```

### Page équipes (`src/routes/teams/+page.svelte`)

```svelte
<script>
  export let data;
</script>

<h1>Nos équipes</h1>

<div class="teams-grid">
  {#each data.teams as team}
    <a href="/teams/{team.id}" class="team-card">
      <img src={team.imageUrl || '/placeholder-team.png'} alt={team.name} />
      <h3>{team.name}</h3>
      <p class="category">{team.category}</p>
      {#if team.coach}
        <p class="coach">Coach : {team.coach.firstName} {team.coach.lastName}</p>
      {/if}
    </a>
  {/each}
</div>

{#if data.pagination.totalPages > 1}
  <nav class="pagination">
    {#each Array(data.pagination.totalPages) as _, i}
      <a 
        href="?page={i + 1}" 
        class:active={data.pagination.page === i + 1}
      >
        {i + 1}
      </a>
    {/each}
  </nav>
{/if}
```

### Détails d'une équipe (`src/routes/teams/[id]/+page.server.js`)

```javascript
import { api } from '$lib/api';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const teamResponse = await api.teams.getById(params.id);
    const playersResponse = await api.users.getPlayersByTeam(params.id);
    const matchesResponse = await api.matches.getAll({ 
      teamId: params.id, 
      limit: 5 
    });

    return {
      team: teamResponse.data,
      players: playersResponse.data,
      matches: matchesResponse.data.matches
    };
  } catch (err) {
    throw error(404, 'Équipe introuvable');
  }
}
```

### Détails d'une équipe (`src/routes/teams/[id]/+page.svelte`)

```svelte
<script>
  export let data;
  const { team, players, matches } = data;
</script>

<div class="team-header">
  <img src={team.imageUrl} alt={team.name} />
  <div>
    <h1>{team.name}</h1>
    <p class="season">Saison {team.season}</p>
    {#if team.coach}
      <p class="coach">
        Entraîneur : {team.coach.firstName} {team.coach.lastName}
      </p>
    {/if}
  </div>
</div>

<section class="team-description">
  <h2>Présentation</h2>
  <p>{team.description}</p>
</section>

<section class="players">
  <h2>Effectif</h2>
  <div class="players-grid">
    {#each players.sort((a, b) => a.playerNumber - b.playerNumber) as player}
      <div class="player-card">
        <img src={player.imageUrl || '/placeholder-player.png'} alt={player.firstName} />
        <span class="number">#{player.playerNumber}</span>
        <h3>{player.firstName} {player.lastName}</h3>
        <p class="position">{player.position}</p>
      </div>
    {/each}
  </div>
</section>

<section class="recent-matches">
  <h2>Derniers matchs</h2>
  {#each matches as match}
    <div class="match-result">
      <time>{new Date(match.matchDate).toLocaleDateString('fr-FR')}</time>
      <div class="score">
        <span>{team.name}</span>
        <strong>{match.scoreHome} - {match.scoreAway}</strong>
        <span>{match.opponentName}</span>
      </div>
    </div>
  {/each}
</section>
```

### Page article de news (`src/routes/news/[slug]/+page.server.js`)

```javascript
import { api } from '$lib/api';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const response = await api.news.getBySlug(params.slug);
    return {
      article: response.data
    };
  } catch (err) {
    throw error(404, 'Article introuvable');
  }
}
```

### Store pour la langue ($lib/stores/language.js)

```javascript
import { writable } from 'svelte/store';

export const language = writable('fr');

export function t(obj, key) {
  const $language = language.get();
  if ($language === 'pl' && obj[`${key}Pl`]) {
    return obj[`${key}Pl`];
  }
  return obj[key];
}
```

### Utilisation du multilingue

```svelte
<script>
  import { language } from '$lib/stores/language';
  import { t } from '$lib/stores/language';
  
  export let data;
  const { article } = data;
</script>

<article>
  <h1>{$language === 'pl' && article.titlePl ? article.titlePl : article.title}</h1>
  <div class="content">
    {@html $language === 'pl' && article.contentPl ? article.contentPl : article.content}
  </div>
</article>

<!-- Ou avec la fonction helper -->
<h1>{t(article, 'title')}</h1>
```

## 🎯 Bonnes pratiques

### 1. Gestion des erreurs
```javascript
// Dans +page.server.js
try {
  const data = await api.teams.getAll();
  return { teams: data.data.teams };
} catch (error) {
  console.error('Erreur:', error);
  return { teams: [], error: error.message };
}
```

### 2. Loading states
```svelte
<script>
  import { api } from '$lib/api';
  
  let loading = false;
  let teams = [];
  
  async function loadTeams() {
    loading = true;
    try {
      const response = await api.teams.getAll();
      teams = response.data.teams;
    } catch (error) {
      console.error(error);
    } finally {
      loading = false;
    }
  }
</script>

{#if loading}
  <p>Chargement...</p>
{:else}
  <!-- Affichage des équipes -->
{/if}
```

### 3. Form Actions (SvelteKit)
```javascript
// src/routes/admin/teams/+page.server.js
import { api } from '$lib/api';
import { fail } from '@sveltejs/kit';

export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      await api.teams.create(data);
      return { success: true };
    } catch (error) {
      return fail(400, { error: error.message });
    }
  }
};
```

## 📱 Exemple complet: Composant réutilisable

```svelte
<!-- src/lib/components/MatchCard.svelte -->
<script>
  export let match;
  
  const date = new Date(match.matchDate);
  const isFinished = match.status === 'finished';
</script>

<div class="match-card" class:finished={isFinished}>
  <div class="match-date">
    <time datetime={match.matchDate}>
      {date.toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long',
        year: 'numeric'
      })}
    </time>
  </div>
  
  <div class="match-teams">
    <div class="team home">
      <span class="team-name">{match.team.name}</span>
      {#if isFinished}
        <span class="score">{match.scoreHome}</span>
      {/if}
    </div>
    
    <span class="vs">vs</span>
    
    <div class="team away">
      {#if isFinished}
        <span class="score">{match.scoreAway}</span>
      {/if}
      <span class="team-name">{match.opponentName}</span>
    </div>
  </div>
  
  <div class="match-location">
    <svg><!-- icon lieu --></svg>
    {match.location}
  </div>
  
  {#if match.competition}
    <div class="match-competition">
      {match.competition}
    </div>
  {/if}
</div>

<style>
  .match-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
  }
  
  .match-teams {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin: 1rem 0;
  }
  
  .score {
    font-size: 1.5rem;
    font-weight: bold;
  }
</style>
```

