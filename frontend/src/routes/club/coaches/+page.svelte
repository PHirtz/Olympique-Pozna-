<svelte:head>
  <title>{$_('coaches.title')}</title>
  <meta name="description" content={$_('coaches.metaDescription')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation from '$lib/components/ui/Navigation.svelte';
  import HeroSlider from '$lib/components/HeroSlider.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { Award, Heart, Target } from 'lucide-svelte';
  
  export let data;

  const heroSlides = [
    '/slides/trener.jpg',
    '/slides/trener1.jpg',
    '/slides/trener2.jpg',
    '/slides/trener3.jpg',
    '/slides/trener5.jpg',
    '/slides/trener6.jpg',
    '/slides/trener8.jpg',
    '/slides/trener9.jpg',
    '/slides/trener10.jpg',
    '/slides/trener11.jpg',
    '/slides/trener14.jpg',
    '/slides/trener15.jpg'
  ];

  const coaches = [
    {
      id: 'stephane-wutezi',
      name: 'coaches.stephane.name',
      role: 'coaches.stephane.tagline',
      photo: '/trener/stephane-trener.jpg',
      icon: 'award',
      highlight: false
    },
    {
      id: 'patryk-kamionka',
      name: 'coaches.patryk_k.name',
      role: 'coaches.patryk_k.tagline',
      photo: '/trener/patrikk-trener.jpg',
      icon: 'target',
      highlight: false
    },
    {
      id: 'patryk-wesolowski',
      name: 'coaches.patryk_w.name',
      role: 'coaches.patryk_w.tagline',
      photo: '/trener/patrikw-trener.jpg',
      icon: 'target',
      highlight: false
    },
    {
      id: 'dominika-klosowska',
      name: 'coaches.dominika.name',
      role: 'coaches.dominika.tagline',
      photo: '/trener/dominika-trener.jpg',
      icon: 'heart',
      highlight: false
    },
    {
      id: 'jakub-golanski',
      name: 'coaches.jakub.name',
      role: 'coaches.jakub.tagline',
      photo: '/trener/jakub-trener.jpg',
      icon: 'award',
      highlight: false
    },
    {
      id: 'pawel-kulesa',
      name: 'coaches.pawel.name',
      role: 'coaches.pawel.tagline',
      photo: '/trener/pawel-trener.jpg',
      icon: 'award',
      highlight: false
    }
  ];
</script>

<Navigation {data} />

<!-- Hero avec Slider -->
<HeroSlider 
  images={heroSlides}
  title={$_('coaches.hero.title')}
  subtitle={$_('coaches.hero.subtitle')}
/>

<div class="coaches-page">
  <main class="main-content">
    <div class="container">
      <section class="intro-section">
        <h2>{$_('coaches.intro.title')}</h2>
        <p>{$_('coaches.intro.description')}</p>
      </section>

      <div class="coaches-grid">
        {#each coaches as coach}
          <a 
            href={`/club/coaches/${coach.id}`} 
            class="coach-card"
            class:highlight={coach.highlight}
          >
            <div class="coach-image-wrapper">
              <img 
                src={coach.photo} 
                alt={$_(coach.name)} 
                class="coach-photo"
              />
              {#if coach.highlight}
                <div class="highlight-badge">⭐ Coach Principal</div>
              {/if}
            </div>
            
            <div class="coach-info">
              <h3>{$_(coach.name)}</h3>
              <p class="coach-role">
                {#if coach.icon === 'award'}
                  <Award size={18} />
                {:else if coach.icon === 'heart'}
                  <Heart size={18} />
                {:else}
                  <Target size={18} />
                {/if}
                {$_(coach.role)}
              </p>
              <span class="view-profile">{$_('coaches.viewProfile')}</span>
            </div>
          </a>
        {/each}
      </div>
    </div>
  </main>
</div>

<Footer {data} />

<style>

  .coaches-page {
    min-height: 100vh;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  /* Override du Hero - Style identique à la page d'accueil */
  :global(.hero-content) {
    position: relative;
    text-align: center;
    color: white;
    padding: 2rem;
    max-width: 800px;
    animation: fadeInUp 1s ease-out;
  }

  :global(.hero-content h1) {
    font-size: 4.5rem !important;
    font-weight: 800 !important;
    margin-bottom: 1rem !important;
    color: white !important;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.7) !important;
    line-height: 1.2 !important;
  }

  :global(.hero-content p) {
    font-size: 2.5rem !important;
    margin-bottom: 0.5rem !important;
    padding-top: 2rem !important;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7) !important;
    opacity: 0.9;
  }

  .main-content {
    padding: 4rem 0;
  }

  .container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  /* Intro Section */
  .intro-section {
    text-align: center;
    max-width: 800px;
    margin: 0 auto 4rem;
  }

  .intro-section h2 {
    font-size: 2.5rem;
    color: #1a4d7a;
    margin-bottom: 1.5rem;
  }

  .intro-section p {
    font-size: 1.2rem;
    color: #64748b;
    line-height: 1.8;
  }

  /* Coaches Grid */
  .coaches-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .coach-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(35, 16, 125, 0.32);
    transition: all 0.3s ease;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .coach-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .coach-card.highlight {
    border: 3px solid #d4af37;
  }

  .coach-image-wrapper {
    position: relative;
    width: 100%;
    height: 450px;
    overflow: hidden;
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
  }

  .coach-photo {
    width: 110%;
    height: 100%;
    object-fit: cover;
    object-position: center 1%;
    transition: transform 0.3s ease;
  }

  .coach-card:hover .coach-photo {
    transform: scale(1.05);
  }

  .highlight-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: linear-gradient(135deg, #d4af37 0%, #c9a02d 100%);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  }

  .coach-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .coach-info h3 {
    font-size: 1.5rem;
    color: #1a4d7a;
    margin: 0;
    font-weight: 700;
  }

  .coach-role {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #64748b;
    font-size: 1rem;
    font-style: italic;
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

  .coach-card:hover .view-profile {
    gap: 1rem;
    color: #d4af37;
  }

  /* Responsive */
  @media (max-width: 768px) {
    :global(.hero-content h1) {
      font-size: 2.5rem !important;
    }

    :global(.hero-content p) {
      font-size: 1.5rem !important;
      padding-top: 1rem !important;
    }

    .coach-image-wrapper {
      height: 350px;
    }

    .intro-section h2 {
      font-size: 2rem;
    }

    .intro-section p {
      font-size: 1.1rem;
    }

    .coaches-grid {
      grid-template-columns: 1fr;
    }

    .coach-image-wrapper {
      height: 350px;
    }

    .intro-section h2 {
      font-size: 2rem;
    }

    .intro-section p {
      font-size: 1.1rem;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    :global(.hero-content h1) {
      font-size: 3.5rem !important;
    }

    :global(.hero-content p) {
      font-size: 2rem !important;
    }

    .coaches-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>