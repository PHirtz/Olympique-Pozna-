<svelte:head>
  <title>L'équipe Doué - Olympique Poznań</title>
  <meta name="description" content="Découvrez l'équipe Doué de l'Olympique Poznań" />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import PlayerModal from '$lib/components/ui/PlayerModal.svelte';
  
  export let data;

  // État de la modal
  let isModalOpen = false;
  let selectedPlayer = null;

  const doue = [
    {
      id: '10',
      number: '10',
      firstName: 'Oscar',
      lastName: 'Wutezi',
      name: 'Oscar Wutezi',
      photo: '/team/doue/10.JPG',
      position: 'Pomocnik',
      origin: 'France / Polska',
      nickname: 'Ozzy',
      distinctions: []
    },
    {
      id: '28',
      number: '28',
      firstName: 'Aleks',
      lastName: 'Zieliński',
      name: 'Aleks Zieliński',
      photo: '/team/doue/28.JPG',
      position: 'Wahadłowy',
      origin: 'Polska',
      nickname: 'Zielu',
      distinctions: []
    },
    {
      id: '19',
      number: '19',
      firstName: 'Krystian',
      lastName: 'Rulczyński',
      name: 'Krystian Rulczyński',
      photo: '/team/doue/19.JPG',
      position: 'Wahadłowy',
      origin: 'Polska',
      nickname: 'Rolex',
      distinctions: []
    },
    {
      id: '30',
      number: '30',
      firstName: 'Adam',
      lastName: 'Nawrot',
      name: 'Adam Nawrot',
      photo: '/team/doue/30.JPG',
      position: 'Napastnik',
      origin: 'Polska',
      nickname: 'Nawrocik',
      distinctions: []
    },
    {
      id: '54',
      number: '54',
      firstName: 'Szymon',
      lastName: 'Craczyk',
      name: 'Szymon Craczyk',
      photo: '/team/doue/54.JPG',
      position: 'Bramkarz',
      origin: 'Polska',
      nickname: null,
      distinctions: []
    },
    {
      id: '13',
      number: '13',
      firstName: 'Antoni',
      lastName: 'Włodarczyk',
      name: 'Antoni Włodarczyk',
      photo: '/team/doue/13.JPG',
      position: 'Pomocnik',
      origin: 'Polska',
      nickname: null,
      distinctions: []
    },
    {
      id: '12',
      number: '12',
      firstName: 'Aleksander',
      lastName: 'Majchrowicz',
      name: 'Aleksander Majchrowicz',
      photo: '/team/doue/12.JPG',
      position: 'Pomocnik',
      origin: 'Polska',
      nickname: null,
      distinctions: []
    },
    {
      id: '8',
      number: '8',
      firstName: 'Joueur',
      lastName: '8',
      name: 'Joueur 8',
      photo: '/seniorsh/blues.png',
      position: 'À déterminer',
      origin: 'Poznań, Pologne',
      nickname: null,
      distinctions: []
    },
    {
      id: '9',
      number: '9',
      firstName: 'Joueur',
      lastName: '9',
      name: 'Joueur 9',
      photo: '/seniorsh/blues.png',
      position: 'À déterminer',
      origin: 'Poznań, Pologne',
      nickname: null,
      distinctions: []
    },
    {
      id: '10b',
      number: '10',
      firstName: 'Joueur',
      lastName: '10',
      name: 'Joueur 10',
      photo: '/seniorsh/blues.png',
      position: 'À déterminer',
      origin: 'Poznań, Pologne',
      nickname: null,
      distinctions: []
    },
    {
      id: '11',
      number: '11',
      firstName: 'Joueur',
      lastName: '11',
      name: 'Joueur 11',
      photo: '/seniorsh/blues.png',
      position: 'À déterminer',
      origin: 'Poznań, Pologne',
      nickname: null,
      distinctions: []
    }
  ];

  // Fonction pour ouvrir la modal
  function openPlayerModal(player) {
    selectedPlayer = player;
    isModalOpen = true;
  }
</script>

<Navigation2 {data} />

<div class="doue-page">
  <!-- Hero Section -->
  <section class="hero-doue">
    <div class="hero-background">
      <img src="/team/doue.jpg" alt="Doué" class="hero-image" />
      <div class="hero-overlay"></div>
      <div class="hero-copyright">
        &copy; Aleteia/AFP
      </div>
    </div>
    <div class="hero-content">
      <h1>{$_('teams.doue.title')}</h1>
    </div>
  </section>

  <main class="main-content">
    <div class="container">
      <div class="teams-grid">
        {#each doue as player}
          <!-- Rendre la card cliquable -->
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
              />
            </div>
            
            <div class="team-info">
              <h3>{player.name}</h3>
              <span class="player-number">#{player.number}</span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </main>
</div>

<!-- Modal du joueur -->
<PlayerModal
  bind:isOpen={isModalOpen}
  player={selectedPlayer}
  on:close={() => isModalOpen = false}
/>

<Footer {data} />

<style>
  .doue-page {
    min-height: 100vh;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  /* Hero Section */
  .hero-doue {
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
    object-position: center;
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
    border: none; /* Enlever la bordure du button */
    padding: 0; /* Enlever le padding du button */
    cursor: pointer; /* Curseur pointer */
    width: 100%; /* Prendre toute la largeur */
    text-align: left; /* Aligner le texte à gauche */
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
    .hero-doue {
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