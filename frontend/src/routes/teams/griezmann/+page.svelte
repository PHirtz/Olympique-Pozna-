<svelte:head>
  <title>L'équipe Griezmann - Olympique Poznań</title>
  <meta name="description" content="Découvrez l'équipe Griezmann de l'Olympique Poznań" />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  
  export let data;

  const griezmann = [
    {
      id: '1',
      name: 'Joueur 1',
      photo: '/seniorsh/blues.png',
    },
    {
      id: '2',
      name: 'Joueur 2',
      photo: '/seniorsh/blues.png',
    },
    {
      id: '3',
      name: 'Joueur 3',
      photo: '/seniorsh/blues.png',
    },
    {
      id: '4',
      name: 'Joueur 4',
      photo: '/seniorsh/blues.png',
    },
    {
      id: '5',
      name: 'Joueur 5',
      photo: '/seniorsh/blues.png',
    },
    {
      id: '6',
      name: 'Joueur 6',
      photo: '/seniorsh/blues.png',
    },
    {
      id: '7',
      name: 'Joueur 7',
      photo: '/seniorsh/blues.png',
    },
    {
      id: '8',
      name: 'Joueur 8',
      photo: '/seniorsh/blues.png',
    },
    {
      id: '9',
      name: 'Joueur 9',
      photo: '/seniorsh/blues.png',
    },
    {
      id: '10',
      name: 'Joueur 10',
      photo: '/seniorsh/blues.png',
    },
    {
      id: '11',
      name: 'Joueur 11',
      photo: '/seniorsh/blues.png',
    }
  ];
</script>

<Navigation2 {data} />

<div class="griezmann-page">
  <!-- Hero Section -->
  <section class="hero-griezmann">
    <div class="hero-background">
      <img src="/team/antoine.png" alt="Griezmann" class="hero-image" />
      <div class="hero-overlay"></div>
      <div class="hero-copyright">
        &copy; Eurosport/Getty Images
      </div>
    </div>
    <div class="hero-content">
      <h1>{$_('teams.griezmann')}</h1>
    </div>
  </section>

  <main class="main-content">
    <div class="container">

      <div class="teams-grid">
        {#each griezmann as player}
          <div class="team-card">
            <div class="team-image-wrapper">
              <img 
                src={player.photo} 
                alt={player.name} 
                class="team-photo"
              />
            </div>
            
            <div class="team-info">
              <h3>{player.name}</h3>
              <span class="player-number">#{player.id}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </main>
</div>

<Footer {data} />

<style>
  .griezmann-page {
    min-height: 100vh;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  /* Hero Section */
  .hero-griezmann {
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

  .hero-copyright {
    position: absolute;
    bottom: 12px;
    left: 12px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.7rem;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.9);
    z-index: 4; 
    background: rgba(0, 0, 0, 0.5);
    padding: 6px 10px;
    border-radius: 4px;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
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

  .hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center; /* Position par défaut (mobile) */
  }

  .hero-content h1 {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    margin-bottom: 1rem;
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
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
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(26, 77, 122, 0.7) 50%,
    rgba(15, 45, 74, 0.5) 100%
  );
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
    margin: 0;
    color: #ffffff;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }

  .main-content {
    padding: 4rem 0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Teams Grid */
  .teams-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }
  .team-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 450px; /* Hauteur fixe pour la card */
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
    object-fit: cover; /* Cover au lieu de contain */
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
    color: #ffffff; /* Blanc pour contraster avec le fond sombre */
    margin: 0;
    font-weight: 700;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .player-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.75rem;
    background: rgba(212, 175, 55, 0.95); /* Or semi-transparent */
    color: white;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-griezmann {
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