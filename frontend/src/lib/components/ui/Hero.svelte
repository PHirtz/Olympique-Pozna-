<script>
  import { onMount } from 'svelte';
  import Navigation from './Navigation.svelte';
  import { _ } from 'svelte-i18n';

  /** @type {string[]} */
  export let images = ['/victory.jpg'];

  let currentIndex = 0;
  let interval;

  onMount(() => {
    // Démarrer le slider seulement s'il y a plusieurs images
    if (images.length > 1) {
      startSlider();
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  });

  function startSlider() {
    interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
    }, 5000); // Change toutes les 5 secondes
  }

  function goToSlide(index) {
    currentIndex = index;
    // Réinitialiser le timer
    if (interval) clearInterval(interval);
    startSlider();
  }
</script>

<section class="hero">
  <!-- Navigation intégrée dans le hero -->
  <div class="hero-navigation">
    <Navigation />
  </div>

  <!-- Background images avec transition -->
  <div class="hero-background">
    {#each images as image, index}
      <div 
        class="hero-slide" 
        class:active={currentIndex === index}
      >
        <img src={image} alt="Olympique Poznań - Image {index + 1}" />
      </div>
    {/each}
    <div class="hero-overlay"></div>
  </div>

  <!-- Contenu -->
  <div class="hero-content">
    <h1>{$_('hero.title')}</h1>
    <p class="hero-subtitle">{$_('hero.subtitle')}</p>
    <p class="hero-description">{$_('hero.description')}</p>
  </div>

  <!-- Indicateurs (seulement si plusieurs images) -->
  {#if images.length > 1}
    <div class="hero-indicators">
      {#each images as _, index}
        <button
          class="indicator"
          class:active={currentIndex === index}
          on:click={() => goToSlide(index)}
          aria-label="Voir image {index + 1}"
        ></button>
      {/each}
    </div>
  {/if}
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
    z-index: 100;
  }

  /* Background avec slides */
  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .hero-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1.5s ease-in-out;
  }

  .hero-slide.active {
    opacity: 1;
  }

  .hero-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    animation: zoomIn 10s ease-out forwards;
  }

  @keyframes zoomIn {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.1);
    }
  }

  /* Réinitialiser l'animation à chaque changement */
  .hero-slide.active img {
    animation: zoomIn 10s ease-out forwards;
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
    z-index: 1;
  }

  /* Contenu */
  .hero-content {
    position: relative;
    text-align: center;
    color: white;
    padding: 2rem;
    max-width: 800px;
    animation: fadeInUp 1s ease-out;
    z-index: 2;
  }

  .hero-content h1 {
    font-size: 4.5rem;
    font-weight: 800;
    margin-bottom: 1rem;
    color: white;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
    line-height: 1.2;
  }

  .hero-subtitle {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    padding-top: 2rem;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  }

  .hero-description {
    font-size: 1.5rem;
    font-style: italic;
    opacity: 0.9;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
  }

  /* Indicateurs */
  .hero-indicators {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.75rem;
    z-index: 3;
  }

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid white;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .indicator.active {
    background: white;
    width: 35px;
    border-radius: 6px;
  }

  .indicator:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: scale(1.1);
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

    .hero-indicators {
      bottom: 1rem;
    }

    .indicator {
      width: 10px;
      height: 10px;
    }

    .indicator.active {
      width: 28px;
    }
  }

  @media (max-width: 480px) {
    .hero-content h1 {
      font-size: 1.5rem;
    }

    .hero-subtitle {
      font-size: 1rem;
      padding-top: 1rem;
    }

    .hero-description {
      font-size: 0.9rem;
    }
  }
</style>