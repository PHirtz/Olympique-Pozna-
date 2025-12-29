<svelte:head>
  <title>L'académie</title>
  <meta name="description" content="Découvrez l'académie de l'Olympique Poznan et ses équipes jeunes" />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { Award, Heart, Target } from 'lucide-svelte';
  
  export let data;

  const teams = [
    {
      id: 'giroud',
      name: 'Olivier Giroud',
      photo: '/team/giroud.png',
      copyright: 'Richard Sellers / GettyImages',
    },
    {
      id: 'doue',
      name: 'Désiré Doué',
      photo: '/team/doue.jpg',
      copyright: 'Aleteia / AFP',
    },
    {
      id: 'griezmann',
      name: 'Antoine Griezmann',
      photo: '/team/antoine.png',
      copyright: 'Eurosport / Getty Images',
    },
    {
      id: 'coman',
      name: 'Kingsley Coman',
      photo: '/team/coman.jpg',
      copyright: 'Action Press / SIPA',
    },
    {
      id: 'diani',
      name: 'Kadidiatou Diani',
      photo: '/team/diani.png',
      copyright: 'Naomi Baker / GettyImages',
    },
    {
      id: 'renard',
      name: 'Wendie Renard',
      photo: '/team/wendie.jpg',
      copyright: ' FRANCK FIFE / AFP',
    },
    {
      id: 'lesommer',
      name: 'Eugénie Le Sommer',
      photo: '/team/eugenie.jpg',
      copyright: 'FRANCK FIFE / AFP',
    },
    {
      id: 'henry',
      name: 'Amandine Henry',
      photo: '/team/amandine.jpg',
      copyright: 'Le progres / AFP',
    }
  ];
</script>

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

      <div class="teams-grid">
        {#each teams as team}
          <a 
            href={`/club/teams/${team.id}`} 
            class="team-card"
          >
            <div class="team-image-wrapper">
              <img 
                src={team.photo} 
                alt={team.name} 
                class="team-photo"
              />
              {#if team.copyright}
                <div class="photo-copyright">
                  &copy; {team.copyright}
                </div>
              {/if}
            </div>
            
            <div class="team-info">
              <h3>{team.name}</h3>
              <span class="view-profile">{$_('teams.viewProfile')}</span>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </main>
</div>
</div>

<Footer {data} />

<style>
  .teams-page {
    min-height: 100vh;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  .main-content {
    padding: 4rem 0;
  }

  /* Hero Section */
  .hero-academy {
    background:linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
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

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
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
    height: 450px;
    overflow: hidden;
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
  }

  .team-photo {
    width: 110%;
    height: 100%;
    object-fit: cover;
    object-position: center 1%;
    transition: transform 0.3s ease;
  }

  .team-card:hover .team-photo {
    transform: scale(1.05);
  }

  .team-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .team-info h3 {
    font-size: 1.5rem;
    color: #1a4d7a;
    margin: 0;
    font-weight: 700;
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

  .photo-copyright {
    position: absolute;
    bottom: 8px;
    left: 8px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.65rem;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    z-index: 10;
  }

  .team-card:hover .photo-copyright {
    opacity: 1;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .teams-grid {
      grid-template-columns: 1fr;
    }

    .team-image-wrapper {
      height: 350px;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .teams-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>