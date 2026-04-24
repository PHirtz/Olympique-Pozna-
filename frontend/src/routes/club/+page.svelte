<svelte:head>
  <title>{$_('about.title')}</title>
  <meta name="description" content={$_('about.metaDescription')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Copyright from '$lib/components/ui/copyright.svelte';

  const club = [
    {
      slug: 'about',
      titleKey: 'club.about',
      image: '../club/about.jpg',
      link: '/club/about',
      external: false
    },
    {
      slug: 'shop',
      titleKey: 'club.shop',
      image: '../club/logo-shop.jpeg',
      link: "https://olympique.pl/",
      external: true
    },
    {
      slug: 'coaches',
      titleKey: 'club.coaches',
      image: '../club/treners.jpg',
      link: '/club/coaches',
      external: false
    },
    {
      slug: 'partners',
      titleKey: 'club.partners.title',  
      image: '../club/part.jpg',
      link: '/club/partners',
      external: false
    },
    {      
      slug: 'scholarship',
      titleKey: 'scholarship.title',
      image: '../slides/stevens4.jpg',
      link: '/club/scholarship',
      external: false
    },
    {
      slug: 'documents',
      titleKey: 'club.documents.title',
      image: '../logo.svg',
      link: "https://docs.google.com/document/d/1GDOQUc8G9FQZjQTDuLBw_grxg1bKWg1a2V8GhbsnGU0/edit?tab=t.0",
      external: true
    }
  ];
</script>

<Navigation2 />

<section class="hero-club">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <img src="../logo.png" alt="Olympique Poznań" class="hero-logo" />
    <h1>{$_('club.title')}</h1>
    <div class="hero-divider"></div>
    <p class="hero-subtitle">{$_('club.subtitle') || 'Olympique Poznań'}</p>
  </div>
</section>

<section class="club-section">
  <div class="club-cards">
    {#each club as team (team.slug)}
      <a 
        href={team.link} 
        class="team-card"
        aria-label={$_(team.titleKey)}
        target={team.external ? '_blank' : '_self'}
        rel={team.external ? 'noopener noreferrer' : ''}
      >
        <div class="team-image">
          <img 
            src={team.image} 
            alt={$_(team.titleKey)}
            loading="lazy"
          />
          <div class="overlay"></div>
        </div>
        <div class="team-content">
          <h3>{$_(team.titleKey)}</h3>
        </div>
      </a>
    {/each}
  </div>
</section>

<Copyright />

<style>
  /* Hero Section */
  .hero-club {
    position: relative;
    background-image: url('/club/about.jpg');
    background-size: cover;
    background-position: center 30%;
    background-color: #0f2d4a;
    color: white;
    padding: 10rem 2rem 10rem;
    text-align: center;
    overflow: hidden;
    min-height: 380px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      rgba(15, 45, 74, 0.88) 0%,
      rgba(26, 77, 122, 0.75) 100%
    );
  }

  .hero-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: -120px;
  }

  .hero-logo {
    height: 90px;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
    margin-bottom: 0.5rem;
    animation: fadeInDown 0.8s ease-out;
  }

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-content h1 {
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 800;
    color: #ffffff;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    margin: 0;
    letter-spacing: 1px;
    animation: fadeInUp 0.8s ease-out 0.2s backwards;
  }

  .hero-divider {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #c9a961, #ddc184);
    border-radius: 2px;
    animation: fadeInUp 0.8s ease-out 0.3s backwards;
  }

  .hero-subtitle {
    font-size: 1.1rem;
    color: rgba(255,255,255,0.7);
    font-weight: 300;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin: 0;
    animation: fadeInUp 0.8s ease-out 0.4s backwards;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Section club */
  .club-section {
    padding: 4rem 2rem;
    background: var(--bg-secondary, #f5f5f5);
  }

  .club-cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1500px;
    margin: 0 auto;
  }

  .team-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    color: inherit;
    display: block;
    cursor: pointer;
    position: relative;
    height: 400px;
  }

  .team-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  }

  .team-image {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .team-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .team-card:hover .team-image img {
    transform: scale(1.08);
  }

  .overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(15, 45, 74, 0) 0%,
      rgba(15, 45, 74, 0.4) 50%,
      rgba(15, 45, 74, 0.95) 100%
    );
    transition: all 0.4s ease;
  }

  .team-card:hover .overlay {
    background: linear-gradient(
      to bottom,
      rgba(15, 45, 74, 0.1) 0%,
      rgba(15, 45, 74, 0.5) 50%,
      rgba(26, 77, 122, 0.98) 100%
    );
  }

  .team-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 2rem;
    z-index: 2;
    transform: translateY(0);
    transition: transform 0.4s ease;
  }

  .team-card:hover .team-content {
    transform: translateY(-8px);
  }

  .team-content h3 {
    font-size: clamp(1.25rem, 2vw, 1.75rem);
    font-weight: 700;
    color: white;
    margin: 0;
    text-align: center;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
  }

  .team-card:hover .team-content h3 {
    color: #c9a961;
    text-shadow: 2px 2px 12px rgba(201, 169, 97, 0.4);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .club-section {
      padding: 3rem 1rem;
    }

    .club-cards {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    .team-card {
      height: 320px;
    }

    .team-content {
      padding: 1.5rem;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    .club-cards {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>