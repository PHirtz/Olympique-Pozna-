<svelte:head>
  <title>{$_('about.title')}</title>
  <meta name="description" content={$_('about.metaDescription')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
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
      slug: 'partners.title',
      titleKey: 'club.partners.title',  
      image: '../club/part.jpg',
      link: '/club/partners',
      external: false
    },
    {      
      slug: 'status',
      titleKey: 'club.status',
      image: '../club/statut.png',
      link: "https://docs.google.com/document/d/1GDOQUc8G9FQZjQTDuLBw_grxg1bKWg1a2V8GhbsnGU0/edit?tab=t.0",
      external: true
    },
    {
      slug: 'documents.title',
      titleKey: 'club.documents.title',
      image: '../logo.svg',
      link: "https://docs.google.com/document/d/1GDOQUc8G9FQZjQTDuLBw_grxg1bKWg1a2V8GhbsnGU0/edit?tab=t.0",
      external: true
    }
  ];
</script>

<Navigation2 />

<section class="hero-club">
  <div class="hero-content">
    <h1>{$_('club.title')}</h1>
  </div>
</section>

<section class="club-section">
  <div class="club-cards">
    {#each club as team}
      <a 
        href={team.link} 
        class="team-card"
        aria-label={$_(`club.${team.slug}`)}
        target={team.external ? '_blank' : '_self'}
        rel={team.external ? 'noopener noreferrer' : ''}
      >
        <div class="team-image">
          <img 
            src={team.image} 
            alt={$_(`club.${team.slug}`)}
            loading="lazy"
          />
          <div class="overlay"></div>
        </div>
        <div class="team-content">
          <h3>{$_(`club.${team.slug}`)}</h3>
        </div>
      </a>
    {/each}
  </div>
</section>

<Copyright />

<style>
  /* Hero Section */
  .hero-club {
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