<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';

  const campImages = [
    {
      src: '../camps/537378575_666839196445870_7205819773690376839_n.jpg',
      alt: 'Camp Olympique - Entraînement'
    },
    {
      src: '../camps/538546293_666839159779207_5349435575611989785_n.jpg',
      alt: 'Camp Olympique - Activités'
    },
    {
      src: '../camps/565101131_710263548770101_4822435177271192086_n.jpg',
      alt: 'Camp Olympique - Groupe'
    },
    {
      src: '../camps/511562436_618032664659857_2760144674956014663_n.jpg',
      alt: 'Camp Olympique - Match'
    },
    {
      src: '../camps/510558630_616454818150975_2848625339731913587_n.jpg',
      alt: 'Camp Olympique - Fun'
    },
    {
      src: '../camps/485693359_545062581956866_8217956033877381566_n.jpg',
      alt: 'Camp Olympique - Amis'
    },
    {
      src: '../camps/480541685_525020913961033_7575004528192900917_n.jpg',
      alt: 'Camp Olympique - Sourires'
    },
    {
      src: '../camps/480828745_525012433961881_1776206399951794533_n.jpg',
      alt: 'Camp Olympique - Entraîneurs'
    },
    {
      src: '../camps/478278206_518114947984963_3727456241404200799_n.jpg',
      alt: 'Camp Olympique - Terrain'
    },
    {
      src: '../camps/479544477_516514228145035_3370660487461680180_n.jpg',
      alt: 'Camp Olympique - Équipe'
    }
  ];

  let currentSlide = 0;
  let interval;

  onMount(() => {
    startAutoSlide();
    return () => {
      if (interval) clearInterval(interval);
    };
  });

  function startAutoSlide() {
    interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change toutes les 5 secondes
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % campImages.length;
  }

  function prevSlide() {
    currentSlide = currentSlide === 0 ? campImages.length - 1 : currentSlide - 1;
  }

  function goToSlide(index) {
    currentSlide = index;
    // Réinitialise le timer auto
    clearInterval(interval);
    startAutoSlide();
  }
</script>

<section class="banniere-camp">
  <div class="banniere-container">
    <div class="banniere-content">
      <h2>{$_('camps.title', { default: 'Le Camp Olympique' })}</h2>
      <p>{$_('camps.subtitle', { default: 'Des vacances sportives inoubliables' })}</p>
    </div>

    <div class="slider">
      <div class="slides" style="transform: translateX(-{currentSlide * 100}%)">
        {#each campImages as image, index}
          <div class="slide">
            <img src={image.src} alt={image.alt} loading="lazy" />
          </div>
        {/each}
      </div>

        <!-- Boutons de navigation -->
        <button class="nav-btn prev" on:click={prevSlide} aria-label="Image précédente">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        </button>

        <button class="nav-btn next" on:click={nextSlide} aria-label="Image suivante">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
        </button>

        <!-- Indicateurs -->
        <div class="indicators">
        {#each campImages as _, index}
            <button
            class="indicator"
            class:active={currentSlide === index}
            on:click={() => goToSlide(index)}
            aria-label="Aller à l'image {index + 1}"
            ></button>
        {/each}
        </div>
    </div>
  </div>
</section>

<style>
  .banniere-camp {
    padding: 4rem 2rem;
    background: linear-gradient(135deg, #1a4d7a 0%, #2563a8 100%);
    position: relative;
    overflow: hidden;
  }

  .banniere-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .banniere-content {
    text-align: center;
    margin-bottom: 2rem;
    color: white;
  }

  .banniere-content h2 {
    font-size: 2.5rem;
    margin-bottom: 0.75rem;
    color: white;
    font-weight: bold;
  }

  .banniere-content p {
    font-size: 1.25rem;
    opacity: 0.95;
  }

  .slider {
    position: relative;
    width: 100%;
    height: 500px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .slides {
    display: flex;
    height: 100%;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .slide {
    min-width: 100%;
    height: 100%;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    color: var(--primary-color, #1e40af);
  }

  .nav-btn:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  .nav-btn.prev {
    left: 1rem;
  }

  .nav-btn.next {
    right: 1rem;
  }

  .indicators {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.75rem;
    z-index: 10;
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
    width: 32px;
    border-radius: 6px;
  }

  .indicator:hover {
    background: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 768px) {
    .banniere-camp {
      padding: 3rem 1rem;
    }

    .banniere-content h2 {
      font-size: 2rem;
    }

    .banniere-content p {
      font-size: 1rem;
    }

    .slider {
      height: 300px;
    }

    .nav-btn {
      width: 40px;
      height: 40px;
    }

    .nav-btn.prev {
      left: 0.5rem;
    }

    .nav-btn.next {
      right: 0.5rem;
    }
  }
</style>