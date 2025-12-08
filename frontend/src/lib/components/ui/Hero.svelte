<script>
  import Navigation from './Navigation.svelte';
  import { _ } from 'svelte-i18n';
  
  /** @type {string} */
  export let image = '/victory.jpg';
  /** @type {string} */
  export let title = 'Bienvenue sur le site d\'Olympique Poznan';
  /** @type {string} */
  export let subtitle = 'Club de football de Poznań';
  /** @type {string} */
  export let description = 'Passion et partage sont nos moteurs';
</script>

<section class="hero">
  <!-- Navigation intégrée dans le hero -->
  <div class="hero-navigation">
    <Navigation />
  </div>

  <!-- Background image -->
  <div class="hero-background">
    <img src={image} alt={title} />
    <div class="hero-overlay"></div>
  </div>

  <!-- Contenu -->
  <div class="hero-content">
    <h1>{$_('hero.title')}</h1>
    <p class="hero-subtitle">{$_('hero.subtitle')}</p>
    <p class="hero-description">{$_('hero.description')}</p>
  </div>
</section>

<style>
  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  /* Navigation intégrée en haut du hero */
  .hero-navigation {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }

  /* Background */
  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .hero-background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    -ms-zoom-animation: 10%;
  }

  /* Overlay sombre */
  .hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: 2;
  }

  /* Contenu */
  .hero-content {
    position: relative;
    z-index: 3;
    text-align: center;
    color: white;
    padding: 2rem;
    max-width: 800px;
    animation: fadeInUp 1s ease-out;
  }

  .hero-content h1 {
    font-size: 3.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  }

  .hero-description {
    font-size: 1.2rem;
    font-style: italic;
    opacity: 0.9;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-content h1 {
      font-size: 2rem;
    }

    .hero-subtitle {
      font-size: 1.2rem;
    }

    .hero-description {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .hero-content h1 {
      font-size: 1.5rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }

    .hero-description {
      font-size: 0.9rem;
    }
  }
</style>