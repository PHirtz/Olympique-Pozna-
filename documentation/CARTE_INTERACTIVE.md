# 🗺️ Carte Interactive des Stages - Olympique Poznan

## 🎯 Concept

Une carte du monde interactive où chaque stage est marqué par un point. Comme un carnet de voyage où on marque tous les lieux visités !

## 🏗️ Architecture : Backend + Frontend

### Backend ✅ (Déjà fait)
- Stockage des coordonnées GPS (latitude, longitude)
- API pour récupérer tous les camps avec leurs positions

### Frontend 🎨 (À faire)
- Carte interactive (Leaflet recommandé)
- Marqueurs pour chaque stage
- Popups avec infos du stage

---

## 📊 Modifications Backend (Déjà appliquées)

### Modèle Camp mis à jour
Deux nouveaux champs ajoutés :
```javascript
latitude: {
  type: DataTypes.DECIMAL(10, 8),
  allowNull: true,
  // Ex: 52.4064 pour Poznań
}
longitude: {
  type: DataTypes.DECIMAL(11, 8),
  allowNull: true,
  // Ex: 16.9252 pour Poznań
}
```

### Création d'un camp avec coordonnées
```bash
POST /api/camps
{
  "title": "Stage d'été Poznań 2025",
  "location": "Poznań, Pologne",
  "latitude": 52.4064,
  "longitude": 16.9252,
  "startDate": "2025-07-01",
  "endDate": "2025-07-15",
  "price": 350,
  ...
}
```

---

## 🗺️ Solution Frontend : Leaflet (Recommandé)

### Pourquoi Leaflet ?
- ✅ **Gratuit** et open-source
- ✅ **Léger** (~40KB)
- ✅ **Simple** à utiliser
- ✅ **Personnalisable**
- ✅ Fonctionne sans clé API
- ✅ Parfait pour SvelteKit

### Alternatives
- **Mapbox** : Plus moderne, nécessite une clé API (gratuit jusqu'à 50k vues/mois)
- **Google Maps** : Payant après 28k vues/mois
- **OpenLayers** : Très puissant mais plus complexe

---

## 🚀 Implémentation avec Leaflet + SvelteKit

### Étape 1 : Installation

```bash
npm install leaflet
npm install -D @types/leaflet
```

### Étape 2 : Page avec la carte

**src/routes/camps/map/+page.svelte**

```svelte
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let data;
  
  let mapContainer;
  let map;
  
  onMount(async () => {
    if (browser) {
      // Import dynamique de Leaflet (côté client uniquement)
      const L = (await import('leaflet')).default;
      
      // Créer la carte centrée sur l'Europe
      map = L.map(mapContainer).setView([50.0, 10.0], 4);
      
      // Ajouter le fond de carte OpenStreetMap
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);
      
      // Créer une icône personnalisée
      const campIcon = L.icon({
        iconUrl: '/icons/camp-marker.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
      
      // Ajouter un marqueur pour chaque camp
      data.camps.forEach(camp => {
        if (camp.latitude && camp.longitude) {
          const marker = L.marker([camp.latitude, camp.longitude], { 
            icon: campIcon 
          }).addTo(map);
          
          // Créer le contenu du popup
          const popupContent = `
            <div class="camp-popup">
              <h3>${camp.title}</h3>
              <p><strong>📍</strong> ${camp.location}</p>
              <p><strong>📅</strong> ${new Date(camp.startDate).toLocaleDateString('fr-FR')} - ${new Date(camp.endDate).toLocaleDateString('fr-FR')}</p>
              <p><strong>💰</strong> ${camp.price}€</p>
              ${camp.imageUrl ? `<img src="${camp.imageUrl}" alt="${camp.title}" style="width: 100%; max-width: 200px; border-radius: 8px; margin-top: 8px;">` : ''}
              <a href="/camps/${camp.id}" class="btn-view-camp">Voir les détails</a>
            </div>
          `;
          
          marker.bindPopup(popupContent);
        }
      });
    }
  });
</script>

<svelte:head>
  <link 
    rel="stylesheet" 
    href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin=""
  />
</svelte:head>

<div class="map-page">
  <div class="map-header">
    <h1>🗺️ Carte des stages Olympique Poznan</h1>
    <p>Découvrez tous les lieux où nous organisons nos stages sportifs</p>
  </div>
  
  <div class="map-container" bind:this={mapContainer}></div>
  
  <div class="map-legend">
    <h3>Légende</h3>
    <div class="legend-item">
      <img src="/icons/camp-marker.png" alt="Camp" />
      <span>{data.camps.length} stages organisés</span>
    </div>
  </div>
</div>

<style>
  .map-page {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .map-header {
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
  }
  
  .map-header h1 {
    margin: 0 0 0.5rem 0;
    font-size: 2rem;
  }
  
  .map-header p {
    margin: 0;
    opacity: 0.9;
  }
  
  .map-container {
    flex: 1;
    width: 100%;
    position: relative;
    z-index: 0;
  }
  
  .map-legend {
    padding: 1rem 2rem;
    background: white;
    border-top: 1px solid #ddd;
  }
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .legend-item img {
    width: 24px;
    height: 24px;
  }
  
  /* Styles du popup */
  :global(.camp-popup) {
    min-width: 200px;
  }
  
  :global(.camp-popup h3) {
    margin: 0 0 0.5rem 0;
    color: #667eea;
  }
  
  :global(.camp-popup p) {
    margin: 0.25rem 0;
    font-size: 0.9rem;
  }
  
  :global(.btn-view-camp) {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background: #667eea;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: background 0.3s;
  }
  
  :global(.btn-view-camp:hover) {
    background: #5568d3;
  }
</style>
```

### Étape 3 : Charger les données

**src/routes/camps/map/+page.server.js**

```javascript
import { api } from '$lib/api';

export async function load() {
  try {
    // Récupérer tous les camps avec coordonnées
    const response = await api.camps.getAll({ 
      limit: 1000, // Tous les camps
      status: 'open' // Ou tous : 'draft,open,full,closed'
    });
    
    // Filtrer uniquement les camps avec coordonnées
    const campsWithCoordinates = response.data.camps.filter(
      camp => camp.latitude && camp.longitude
    );
    
    return {
      camps: campsWithCoordinates
    };
  } catch (error) {
    console.error('Erreur chargement camps:', error);
    return { camps: [] };
  }
}
```

---

## 🎨 Version Améliorée : Style "Carnet de Voyage"

Pour un effet plus "voyage avec des croix sur les lieux visités" :

**src/routes/camps/map-travel/+page.svelte**

```svelte
<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let data;
  
  let mapContainer;
  let map;
  
  onMount(async () => {
    if (browser) {
      const L = (await import('leaflet')).default;
      
      // Carte avec style vintage/papier
      map = L.map(mapContainer, {
        center: [50.0, 10.0],
        zoom: 4,
        minZoom: 2,
        maxZoom: 10
      });
      
      // Fond de carte style vintage
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© CartoDB',
        maxZoom: 19
      }).addTo(map);
      
      // Icône personnalisée en forme de X ou punaise
      const visitedIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-pin">
            <svg viewBox="0 0 24 24" width="40" height="40">
              <circle cx="12" cy="12" r="10" fill="#e63946" stroke="#fff" stroke-width="2"/>
              <text x="12" y="16" text-anchor="middle" fill="white" font-size="14" font-weight="bold">✓</text>
            </svg>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });
      
      // Tracer des lignes entre les camps pour montrer le "parcours"
      const coordinates = data.camps
        .filter(c => c.latitude && c.longitude)
        .map(c => [c.latitude, c.longitude]);
      
      if (coordinates.length > 1) {
        // Ligne en pointillés reliant les stages
        L.polyline(coordinates, {
          color: '#e63946',
          weight: 2,
          opacity: 0.5,
          dashArray: '10, 10'
        }).addTo(map);
      }
      
      // Ajouter les marqueurs
      data.camps.forEach((camp, index) => {
        if (camp.latitude && camp.longitude) {
          const marker = L.marker([camp.latitude, camp.longitude], {
            icon: visitedIcon
          }).addTo(map);
          
          const popupContent = `
            <div class="vintage-popup">
              <div class="popup-header">
                <span class="camp-number">#${index + 1}</span>
                <h3>${camp.title}</h3>
              </div>
              <div class="popup-body">
                <p>📍 ${camp.location}</p>
                <p>📅 ${new Date(camp.startDate).getFullYear()}</p>
                ${camp.imageUrl ? `<img src="${camp.imageUrl}" alt="${camp.title}">` : ''}
              </div>
              <a href="/camps/${camp.id}">En savoir plus →</a>
            </div>
          `;
          
          marker.bindPopup(popupContent);
          
          // Animation au survol
          marker.on('mouseover', function() {
            this.getElement().style.transform = 'scale(1.2)';
          });
          
          marker.on('mouseout', function() {
            this.getElement().style.transform = 'scale(1)';
          });
        }
      });
    }
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
</svelte:head>

<div class="travel-map">
  <div class="map-title">
    <h1>🗺️ Notre Voyage Sportif</h1>
    <p>{data.camps.length} destinations visitées</p>
  </div>
  
  <div class="map-wrapper" bind:this={mapContainer}></div>
  
  <div class="camp-list">
    <h3>Nos étapes</h3>
    <ul>
      {#each data.camps as camp, i}
        <li>
          <span class="step-number">#{i + 1}</span>
          <strong>{camp.location}</strong>
          <span class="year">{new Date(camp.startDate).getFullYear()}</span>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style>
  .travel-map {
    width: 100%;
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 300px;
    grid-template-rows: auto 1fr;
    background: #f5f1e8;
  }
  
  .map-title {
    grid-column: 1 / -1;
    padding: 2rem;
    background: linear-gradient(135deg, #e63946 0%, #a4161a 100%);
    color: white;
    text-align: center;
  }
  
  .map-wrapper {
    position: relative;
    border: 10px solid #8b7355;
    border-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><rect fill="%238b7355" width="10" height="10"/></svg>') 10;
  }
  
  .camp-list {
    padding: 2rem;
    background: white;
    overflow-y: auto;
    border-left: 2px solid #8b7355;
  }
  
  .camp-list h3 {
    margin-top: 0;
    color: #e63946;
    font-family: 'Georgia', serif;
  }
  
  .camp-list ul {
    list-style: none;
    padding: 0;
  }
  
  .camp-list li {
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background: #f5f1e8;
    border-left: 3px solid #e63946;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: transform 0.2s;
  }
  
  .camp-list li:hover {
    transform: translateX(5px);
  }
  
  .step-number {
    background: #e63946;
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  .year {
    margin-left: auto;
    color: #666;
    font-size: 0.85rem;
  }
  
  /* Style vintage du popup */
  :global(.vintage-popup) {
    font-family: 'Georgia', serif;
    min-width: 200px;
  }
  
  :global(.vintage-popup .popup-header) {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  :global(.vintage-popup .camp-number) {
    background: #e63946;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
  }
  
  :global(.vintage-popup h3) {
    margin: 0;
    color: #e63946;
    font-size: 1rem;
  }
  
  :global(.vintage-popup img) {
    width: 100%;
    border-radius: 4px;
    margin: 0.5rem 0;
  }
  
  :global(.vintage-popup a) {
    display: inline-block;
    margin-top: 0.5rem;
    color: #e63946;
    text-decoration: none;
    font-weight: bold;
  }
  
  /* Animation des marqueurs */
  :global(.custom-marker) {
    transition: transform 0.3s;
  }
</style>
```

---

## 🎨 Créer l'icône du marqueur

**static/icons/camp-marker.png** (ou utilise une icône SVG)

Tu peux créer une icône personnalisée ou utiliser :
- Une punaise rouge
- Une croix comme sur les cartes
- Le logo d'Olympique Poznan

Sinon, utilise Font Awesome :
```html
<i class="fa-solid fa-location-dot"></i>
```

---

## 🌍 Récupérer les coordonnées GPS

### Option 1 : Manuelle (sites utiles)
- **Google Maps** : Clic droit → "Lat, Long"
- **OpenStreetMap** : Clic → Coordonnées en bas
- **LatLong.net** : Recherche par adresse

### Option 2 : API Geocoding (automatique)

**Service gratuit recommandé** : Nominatim (OpenStreetMap)

```javascript
// Dans ton service camp
async geocodeLocation(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'OlympiquePoznan/1.0'
    }
  });
  
  const data = await response.json();
  
  if (data.length > 0) {
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon)
    };
  }
  
  return null;
}
```

---

## 📋 Checklist d'implémentation

### Backend (✅ Déjà fait)
- [x] Ajouter `latitude` et `longitude` au modèle
- [x] Mettre à jour la migration
- [x] Mettre à jour les schemas de validation

### Frontend (À faire)
- [ ] Installer Leaflet : `npm install leaflet`
- [ ] Créer la page `/camps/map`
- [ ] Charger les camps avec coordonnées
- [ ] Afficher la carte
- [ ] Ajouter les marqueurs
- [ ] Personnaliser les popups
- [ ] Styliser la carte (optionnel)

---

## 🎯 Résultat final

Une carte interactive où :
- ✅ Chaque stage est marqué sur la carte
- ✅ Clic sur un marqueur → Popup avec infos
- ✅ Style "carnet de voyage"
- ✅ Liste des étapes à côté
- ✅ Ligne reliant les différents lieux (optionnel)

---

## 💡 Idées bonus

1. **Filtres** : Par année, par saison, par type
2. **Animations** : Marqueurs qui s'animent au chargement
3. **Clusters** : Regrouper les marqueurs proches
4. **Mode sombre** : Fond de carte sombre pour la nuit
5. **Statistiques** : "12 pays visités, 45 stages organisés"

---

**Besoin d'aide pour l'implémentation frontend ?** 🗺️

Développé par **KAMIICODE**