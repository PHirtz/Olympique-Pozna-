<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { _ } from 'svelte-i18n';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import PlayerModal from '$lib/components/ui/PlayerModal.svelte';
  import * as teamsApi from '$lib/api/teams.js';
  import * as playersApi from '$lib/api/players.js';
  
  export let data;

  let isModalOpen = false;
  let selectedPlayer = null;
  let team = null;
  let players = [];
  let loading = true;
  let error = null;

  $: slug = $page.params.slug;

  onMount(async () => {
    await loadTeamData();
  });

  async function loadTeamData() {
    try {
      loading = true;
      error = null;
      
      // Récupère l'équipe par slug
      const teamResponse = await teamsApi.getTeamBySlug(slug);
      
      if (!teamResponse.success) {
        error = 'Équipe introuvable';
        return;
      }
      
      team = teamResponse.data;
      
      // Récupère les joueurs de cette équipe
      const playersResponse = await playersApi.getPlayersByTeam(team.id);
      
      if (playersResponse.success && playersResponse.data?.players) {
        players = playersResponse.data.players.map(player => ({
          id: player.id,
          number: player.jerseyNumber,
          firstName: player.firstName,
          lastName: player.lastName,
          name: `${player.firstName} ${player.lastName}`,
          photo: player.photoUrl || '/img-communes/gazon.jpg',
          position: player.position,
          positionPl: player.positionPl,
          origin: player.nationality,
          originPl: player.nationalityPl,
          nickname: player.nickname,
          birthYear: player.birthYear,
          distinctions: [
            player.distinction1,
            player.distinction2,
            player.distinction3,
            player.distinction4,
            player.distinction5
          ].filter(Boolean)
        }));
      }
    } catch (err) {
      console.error('❌ Erreur chargement équipe:', err);
      error = 'Impossible de charger l\'équipe';
    } finally {
      loading = false;
    }
  }

  function openPlayerModal(player) {
    selectedPlayer = player;
    isModalOpen = true;
  }
</script>

<svelte:head>
  {#if team}
    <title>{team.name} - Olympique Poznań</title>
    <meta name="description" content={team.description} />
  {/if}
</svelte:head>

<Navigation2 {data} />

<div class="team-page">
  {#if loading}
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p>Chargement de l'équipe...</p>
    </div>
  {:else if error}
    <div class="error-state">
      <p>{error}</p>
      <a href="/teams" class="btn-back">← Retour aux équipes</a>
    </div>
  {:else if team}
    <!-- Hero Section avec image dynamique -->
    <section class="hero-team">
      <div class="hero-background">
        <img 
          src={team.imagePath || `/team/${slug}.jpg`} 
          alt={team.name} 
          class="hero-image"
          on:error={(e) => {
            e.target.src = '/img-communes/fondteam.jpeg';
          }}
        />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <h1>{team.name}</h1>
        <p class="team-category">{team.category.toUpperCase()} • {team.season}</p>
        {#if team.description}
          <p class="team-description">{team.description}</p>
        {/if}
      </div>
    </section>

    <main class="main-content">
      <div class="container">
        {#if players.length === 0}
          <div class="empty-state">
            <p>Aucun joueur dans cette équipe pour le moment.</p>
          </div>
        {:else}
          <div class="teams-grid">
            {#each players as player}
              <button 
                class="team-card"
                on:click={() => openPlayerModal(player)}
                aria-label="Voir le profil de {player.name}"
              >
                <div class="team-image-wrapper">
                  <img 
                    src={player.photo} 
                    alt={player.name} 
                    class="team-photo"
                    on:error={(e) => {
                      e.target.src = '/img-communes/gazon.jpg';
                    }}
                  />
                </div>
                
                <div class="team-info">
                  <h3>{player.name}</h3>
                  {#if player.nickname}
                    <span class="player-nickname">"{player.nickname}"</span>
                  {/if}
                  {#if player.number}
                    <span class="player-number">#{player.number}</span>
                  {/if}
                </div>
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </main>
  {/if}
</div>

<PlayerModal
  bind:isOpen={isModalOpen}
  player={selectedPlayer}
  on:close={() => isModalOpen = false}
/>

<Footer {data} />

<style>
  .team-page {
    min-height: 100vh;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  /* Hero Section */
  .hero-team {
    position: relative;
    color: white;
    padding: 8rem 2rem 4rem;
    text-align: center;
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.9) 0%,
      rgba(26, 77, 122, 0.7) 50%,
      rgba(15, 45, 74, 0.5) 100%
    );
    z-index: 2;
  }

  .hero-content {
    position: relative;
    z-index: 3;
    max-width: 1200px;
    margin: 0 auto;
  }

  .hero-content h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 1rem;
    color: #ffffff;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }

  .team-category {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }

  .team-description {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.85);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .main-content {
    padding: 4rem 0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Loading, Error, Empty States */
  .loading-state, .error-state, .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #666;
  }

  .loading-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #1a4d7a;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .btn-back {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: #1a4d7a;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    margin-top: 1rem;
    transition: background 0.3s ease;
  }

  .btn-back:hover {
    background: #0f2d4a;
  }

  .player-nickname {
    display: block;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.9);
    font-style: italic;
    margin: 0.25rem 0;
  }

  /* Teams Grid */
  .teams-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  /* Card en button */
  .team-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 450px;
    border: none;
    padding: 0;
    cursor: pointer;
    width: 100%;
    text-align: left;
  }

  .team-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .team-image-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
  }

  .team-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }

  .team-card:hover .team-photo {
    transform: scale(1.1);
  }

  .team-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7), transparent);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    text-align: center;
    z-index: 10;
  }

  .team-info h3 {
    font-size: 1.3rem;
    color: #ffffff;
    margin: 0;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .player-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.75rem;
    background: rgba(212, 175, 55, 0.95);
    color: white;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-team {
      min-height: 400px;
      padding: 6rem 1rem 3rem;
    }
    .hero-image {
      object-position: center 10%;
    }

    .team-card {
      height: 350px;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .teams-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1025px) {
    .teams-grid {
      grid-template-columns: repeat(3, 1fr);
    }
    .hero-image {
      object-position: center 15%; 
    }
  }

  @media (min-width: 1400px) {
    .teams-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    .hero-image {
      object-position: center 20%;
    }
  }
</style>