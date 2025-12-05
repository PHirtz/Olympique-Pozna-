# 🏕️ Module Camps/Stages - Olympique Poznan

## 📋 Vue d'ensemble

Le module **Camps** permet de gérer les stages sportifs organisés par Olympique Poznan pendant les vacances (été, hiver, printemps, automne).

## 🎯 Fonctionnalités

### ✅ Ce que tu peux faire
- Créer/modifier/supprimer des camps
- Gérer les places disponibles automatiquement
- Support multilingue FR/PL
- Filtrer par saison, niveau, statut
- Afficher les camps à venir
- Afficher les camps disponibles (avec places)
- Gérer les inscriptions (compteur de participants)

### 📊 Informations gérées
- Titre, description (FR/PL)
- Dates (début, fin, date limite d'inscription)
- Lieu (FR/PL)
- Prix et devise
- Âge minimum/maximum
- Nombre de participants (max et actuel)
- Type de camp (summer, winter, spring, autumn, special)
- Niveau (beginner, intermediate, advanced, all)
- Activités proposées
- Services inclus
- Prérequis (FR/PL)
- Contact (email, téléphone)
- Statut (draft, open, full, closed, cancelled)
- Image

## 🔌 API Endpoints

### Routes publiques

#### Récupérer tous les camps
```http
GET /api/camps
```

**Query params** (optionnels) :
- `type` : summer | winter | spring | autumn | special
- `status` : draft | open | full | closed | cancelled
- `level` : beginner | intermediate | advanced | all
- `year` : 2024, 2025, etc.
- `upcoming` : true (pour les camps à venir)
- `page` : 1, 2, 3...
- `limit` : 10, 20, 50...

**Exemples** :
```bash
# Tous les camps d'été 2025
GET /api/camps?type=summer&year=2025

# Camps à venir
GET /api/camps?upcoming=true

# Camps ouverts aux inscriptions
GET /api/camps?status=open

# Camps pour débutants
GET /api/camps?level=beginner
```

#### Récupérer un camp spécifique
```http
GET /api/camps/:id
```

#### Camps à venir (raccourci)
```http
GET /api/camps/upcoming?limit=5
```

#### Camps disponibles (avec places)
```http
GET /api/camps/available
```

#### Camps par saison
```http
GET /api/camps/season/:type?year=2025
```

**Types** : summer | winter | spring | autumn | special

**Exemples** :
```bash
# Camps d'été 2025
GET /api/camps/season/summer?year=2025

# Camps d'hiver 2024
GET /api/camps/season/winter?year=2024
```

### Routes admin (nécessitent authentification)

#### Créer un camp
```http
POST /api/camps
Authorization: Bearer <token>
```

**Body** :
```json
{
  "title": "Stage d'été Football 2025",
  "titlePl": "Letni obóz piłkarski 2025",
  "description": "Stage intensif de football pour les jeunes...",
  "descriptionPl": "Intensywny obóz piłkarski dla młodzieży...",
  "startDate": "2025-07-01T00:00:00Z",
  "endDate": "2025-07-15T00:00:00Z",
  "location": "Poznań, Stade Municipal",
  "locationPl": "Poznań, Stadion Miejski",
  "price": 350.00,
  "currency": "EUR",
  "ageMin": 8,
  "ageMax": 16,
  "maxParticipants": 30,
  "type": "summer",
  "level": "all",
  "activities": ["Football", "Jeux collectifs", "Tournoi"],
  "includedServices": ["Repas", "Encadrement professionnel", "Maillot"],
  "requirements": "Certificat médical obligatoire",
  "requirementsPl": "Obowiązkowe zaświadczenie lekarskie",
  "contactEmail": "camps@olympiquepoznan.com",
  "contactPhone": "+48 123 456 789",
  "registrationDeadline": "2025-06-20T00:00:00Z",
  "status": "open"
}
```

#### Modifier un camp
```http
PUT /api/camps/:id
Authorization: Bearer <token>
```

#### Supprimer un camp
```http
DELETE /api/camps/:id
Authorization: Bearer <token>
```

## 💻 Exemples d'utilisation Frontend

### Page d'accueil - Afficher les 3 prochains camps

**SvelteKit - +page.server.js** :
```javascript
import { api } from '$lib/api';

export async function load() {
  try {
    const upcomingCamps = await api.camps.getUpcoming(3);
    
    return {
      camps: upcomingCamps.data
    };
  } catch (error) {
    console.error('Erreur chargement camps:', error);
    return { camps: [] };
  }
}
```

**+page.svelte** :
```svelte
<script>
  export let data;
</script>

<section class="camps-preview">
  <h2>Nos prochains stages</h2>
  
  <div class="camps-grid">
    {#each data.camps as camp}
      <a href="/camps/{camp.id}" class="camp-card">
        <img src={camp.imageUrl || '/placeholder-camp.png'} alt={camp.title} />
        
        <div class="camp-info">
          <span class="camp-type">{camp.type}</span>
          <h3>{camp.title}</h3>
          
          <div class="camp-dates">
            <span>📅 {new Date(camp.startDate).toLocaleDateString('fr-FR')}</span>
            <span>au {new Date(camp.endDate).toLocaleDateString('fr-FR')}</span>
          </div>
          
          <div class="camp-details">
            <span>👥 {camp.currentParticipants}/{camp.maxParticipants} places</span>
            <span>💰 {camp.price}€</span>
          </div>
          
          {#if camp.status === 'full'}
            <span class="badge badge-full">Complet</span>
          {:else if camp.status === 'open'}
            <span class="badge badge-open">Places disponibles</span>
          {/if}
        </div>
      </a>
    {/each}
  </div>
  
  <a href="/camps" class="btn-primary">Voir tous les stages</a>
</section>
```

### Page dédiée aux camps

**src/routes/camps/+page.server.js** :
```javascript
import { api } from '$lib/api';

export async function load({ url }) {
  const type = url.searchParams.get('type');
  const year = url.searchParams.get('year') || new Date().getFullYear();
  const page = url.searchParams.get('page') || 1;

  try {
    const response = await api.camps.getAll({ 
      type,
      year,
      status: 'open',
      page,
      limit: 12
    });

    return {
      camps: response.data.camps,
      pagination: response.data.pagination,
      filters: { type, year }
    };
  } catch (error) {
    console.error('Erreur chargement camps:', error);
    return { camps: [], pagination: {} };
  }
}
```

**src/routes/camps/+page.svelte** :
```svelte
<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  
  export let data;
  
  function filterByType(type) {
    const params = new URLSearchParams($page.url.search);
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    goto(`?${params.toString()}`);
  }
</script>

<h1>Nos stages sportifs</h1>

<!-- Filtres -->
<div class="filters">
  <button on:click={() => filterByType(null)}>Tous</button>
  <button on:click={() => filterByType('summer')}>Été</button>
  <button on:click={() => filterByType('winter')}>Hiver</button>
  <button on:click={() => filterByType('spring')}>Printemps</button>
  <button on:click={() => filterByType('autumn')}>Automne</button>
</div>

<!-- Liste des camps -->
<div class="camps-list">
  {#each data.camps as camp}
    <article class="camp-card-detailed">
      <img src={camp.imageUrl} alt={camp.title} />
      
      <div class="camp-content">
        <h2>{camp.title}</h2>
        <p>{camp.description}</p>
        
        <div class="camp-meta">
          <div>
            <strong>📅 Dates :</strong>
            {new Date(camp.startDate).toLocaleDateString('fr-FR')} 
            au 
            {new Date(camp.endDate).toLocaleDateString('fr-FR')}
          </div>
          
          <div>
            <strong>📍 Lieu :</strong> {camp.location}
          </div>
          
          <div>
            <strong>👶 Âge :</strong> 
            {camp.ageMin} - {camp.ageMax} ans
          </div>
          
          <div>
            <strong>💰 Prix :</strong> {camp.price}€
          </div>
          
          <div>
            <strong>👥 Places :</strong>
            {camp.maxParticipants - camp.currentParticipants} disponibles
          </div>
        </div>
        
        {#if camp.activities?.length > 0}
          <div class="activities">
            <strong>Activités :</strong>
            <ul>
              {#each camp.activities as activity}
                <li>{activity}</li>
              {/each}
            </ul>
          </div>
        {/if}
        
        <a href="/camps/{camp.id}" class="btn-primary">
          Voir les détails
        </a>
      </div>
    </article>
  {/each}
</div>

{#if data.camps.length === 0}
  <p class="no-results">Aucun stage disponible pour cette période.</p>
{/if}
```

### Détails d'un camp

**src/routes/camps/[id]/+page.server.js** :
```javascript
import { api } from '$lib/api';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
  try {
    const response = await api.camps.getById(params.id);
    return {
      camp: response.data
    };
  } catch (err) {
    throw error(404, 'Stage introuvable');
  }
}
```

**src/routes/camps/[id]/+page.svelte** :
```svelte
<script>
  export let data;
  const { camp } = data;
  
  const startDate = new Date(camp.startDate);
  const endDate = new Date(camp.endDate);
  const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
</script>

<article class="camp-detail">
  <img src={camp.imageUrl} alt={camp.title} class="hero-image" />
  
  <div class="camp-header">
    <h1>{camp.title}</h1>
    
    <div class="badges">
      <span class="badge badge-type">{camp.type}</span>
      <span class="badge badge-level">{camp.level}</span>
      
      {#if camp.status === 'full'}
        <span class="badge badge-full">Complet</span>
      {:else if camp.status === 'open'}
        <span class="badge badge-open">Places disponibles</span>
      {/if}
    </div>
  </div>
  
  <div class="camp-body">
    <section class="description">
      <h2>Description</h2>
      <p>{camp.description}</p>
    </section>
    
    <aside class="camp-info-box">
      <h3>Informations pratiques</h3>
      
      <div class="info-item">
        <strong>📅 Dates</strong>
        <p>
          Du {startDate.toLocaleDateString('fr-FR')} 
          au {endDate.toLocaleDateString('fr-FR')}
          <br />
          <small>({duration} jours)</small>
        </p>
      </div>
      
      <div class="info-item">
        <strong>📍 Lieu</strong>
        <p>{camp.location}</p>
      </div>
      
      <div class="info-item">
        <strong>👶 Âge</strong>
        <p>{camp.ageMin} - {camp.ageMax} ans</p>
      </div>
      
      <div class="info-item">
        <strong>💰 Tarif</strong>
        <p class="price">{camp.price} {camp.currency}</p>
      </div>
      
      <div class="info-item">
        <strong>👥 Places</strong>
        <p>
          {camp.currentParticipants} / {camp.maxParticipants} inscrits
          <br />
          <small>{camp.maxParticipants - camp.currentParticipants} places restantes</small>
        </p>
      </div>
      
      {#if camp.registrationDeadline}
        <div class="info-item">
          <strong>⏰ Date limite d'inscription</strong>
          <p>{new Date(camp.registrationDeadline).toLocaleDateString('fr-FR')}</p>
        </div>
      {/if}
      
      <button class="btn-primary btn-large">
        S'inscrire au stage
      </button>
    </aside>
    
    {#if camp.activities?.length > 0}
      <section class="activities">
        <h2>🎯 Activités proposées</h2>
        <ul>
          {#each camp.activities as activity}
            <li>{activity}</li>
          {/each}
        </ul>
      </section>
    {/if}
    
    {#if camp.includedServices?.length > 0}
      <section class="included">
        <h2>✅ Services inclus</h2>
        <ul>
          {#each camp.includedServices as service}
            <li>{service}</li>
          {/each}
        </ul>
      </section>
    {/if}
    
    {#if camp.requirements}
      <section class="requirements">
        <h2>📋 Prérequis</h2>
        <p>{camp.requirements}</p>
      </section>
    {/if}
    
    <section class="contact">
      <h2>📞 Contact</h2>
      {#if camp.contactEmail}
        <p>Email : <a href="mailto:{camp.contactEmail}">{camp.contactEmail}</a></p>
      {/if}
      {#if camp.contactPhone}
        <p>Téléphone : <a href="tel:{camp.contactPhone}">{camp.contactPhone}</a></p>
      {/if}
    </section>
  </div>
</article>
```

## 🎨 Client API pour le frontend

Ajoute dans ton fichier `src/lib/api.js` :

```javascript
// Camps
camps: {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiRequest(`/camps?${query}`);
  },
  getUpcoming: (limit = 10) => apiRequest(`/camps/upcoming?limit=${limit}`),
  getAvailable: () => apiRequest('/camps/available'),
  getBySeason: (type, year) => apiRequest(`/camps/season/${type}?year=${year}`),
  getById: (id) => apiRequest(`/camps/${id}`),
  create: (data) => apiRequest('/camps', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/camps/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/camps/${id}`, { method: 'DELETE' }),
}
```

## ✅ Checklist d'installation

- [ ] Copier `/models/camp.model.js`
- [ ] Copier `/migrations/010_create_camps.js`
- [ ] Copier `/schemas/camp.schema.js`
- [ ] Copier `/services/camp.service.js`
- [ ] Copier `/controllers/camp.controller.js`
- [ ] Routes déjà ajoutées dans `/routes/index.routes.js`
- [ ] Relancer le serveur : `npm run dev`
- [ ] Tester : `GET http://localhost:3000/api/camps`

## 🎉 Résultat

Tu as maintenant un module complet de gestion des camps/stages pour Olympique Poznan ! 🏕️⚽

Les parents pourront voir les stages disponibles, les détails, et tu pourras gérer tout ça depuis le backend.

---

**KAMIICODE**