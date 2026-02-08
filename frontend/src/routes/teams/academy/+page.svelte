<script>
  import { onMount } from 'svelte';
  import { _, locale } from 'svelte-i18n';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import * as teamsApi from '$lib/api/teams.js';
  
  export let data;

  let teams = [];
  let loading = true;
  let error = null;

  // Variable réactive qui se recalcule automatiquement quand $locale ou teams change
  $: teamsWithLocalizedDescriptions = teams.map(team => ({
    ...team,
    localizedDescription: getLocalizedDescription(team)
  }));

  function getLocalizedDescription(team) {
    const currentLocale = $locale;
    
    if (currentLocale === 'pl' && team.descriptionPl) {
      return team.descriptionPl;
    }
    if (currentLocale === 'en' && team.descriptionEn) {
      return team.descriptionEn;
    }
    return team.description || '';
  }

  onMount(async () => {
    await loadAcademyTeams();
  });

  async function loadAcademyTeams() {
    try {
      loading = true;
      error = null;
      
      const response = await teamsApi.getAllTeams({ isActive: true });
      
      if (response.success && response.data?.teams) {
        teams = response.data.teams.filter(team => {
          const cat = team.category.toLowerCase();
          return !cat.includes('seniors') && !cat.includes('dames') && !cat.includes('bleus');
        });
      }
    } catch (err) {
      console.error('❌ Erreur chargement académie:', err);
      error = 'Impossible de charger les équipes';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>{$_('home.junior.name')} - Olympique Poznań</title>
  <meta name="description" content={$_('teams.academy.subtitle')} />
</svelte:head>

<Navigation2 {data} />

<div class="academy-page">
  <!-- Hero Section -->
  <section class="hero-academy">
    <div class="hero-content">
      <h1>{$_('teams.hero.title')}</h1>
      <p class="teams-hero-subtitle">{$_('teams.hero.subtitle')}</p>
    </div>
  </section>

  <div class="teams-page">
    <main class="main-content">
      <div class="container">
        {#if loading}
          <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>{$_('common.loadingTeams')}</p>
          </div>
        {:else if error}
          <div class="error-state">
            <p>{error}</p>
            <button on:click={loadAcademyTeams} class="btn-retry">
              {$_('common.tryAgain')}
            </button>
          </div>
        {:else if teams.length === 0}
          <div class="empty-state">
            <p>{$_('teams.noTeams')}</p>
          </div>
        {:else}
          <div class="teams-grid">
            {#each teamsWithLocalizedDescriptions as team}
              <a 
                href={`/teams/${team.slug}`} 
                class="team-card"
              >
                <div class="team-image-wrapper">
                  <img 
                    src={team.imagePath || `/team/${team.slug}.jpg`}
                    alt={team.name}
                    class="team-photo"
                    on:error={(e) => {
                      e.target.src = '/img-communes/fondteam.jpeg';
                    }}
                  />
                </div>
                
                <div class="team-info">
                  <h3>{team.name}</h3>
                  <!-- Utilise directement la propriété calculée -->
                  <p class="team-description">{team.localizedDescription}</p>
                  <span class="view-profile">{$_('teams.viewProfile')}</span>
                </div>
              </a>
            {/each}
          </div>
        {/if}
      </div>
    </main>
  </div>
</div>

<Footer {data} />

<style>
  .academy-page {
    min-height: 100vh;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  .teams-page {
    min-height: 100vh;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  /* Hero Section */
  .hero-academy {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    padding: 8rem 2rem 4rem;
    text-align: center;
  }

  .hero-content h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .teams-hero-subtitle {
    font-size: 1.2rem;
    color: rgba(255, 255, 255, 0.9);
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

  .btn-retry {
    padding: 0.75rem 1.5rem;
    background: #1a4d7a;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 1rem;
    transition: background 0.3s ease;
  }

  .btn-retry:hover {
    background: #0f2d4a;
  }

  /* Teams Grid */
  .teams-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .team-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .team-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .team-image-wrapper {
    position: relative;
    width: 100%;
    height: 300px;
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
    transform: scale(1.05);
  }

  .team-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .team-info h3 {
    font-size: 1.5rem;
    color: #1a4d7a;
    margin: 0;
    font-weight: 700;
  }

  .team-description {
    font-size: 0.9rem;
    font-weight: 600;
    color: #c9a961;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
  }

  .view-profile {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #1a4d7a;
    font-weight: 600;
    margin-top: 0.5rem;
    transition: gap 0.3s ease;
  }

  .view-profile::after {
    content: '→';
    font-size: 1.2rem;
  }

  .team-card:hover .view-profile {
    gap: 1rem;
    color: #d4af37;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .teams-grid {
      grid-template-columns: 1fr;
    }

    .team-image-wrapper {
      height: 250px;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .teams-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>