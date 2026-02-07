<script>
  import { onMount } from 'svelte';
  import { ChevronLeft, ChevronRight } from 'lucide-svelte';

  /** @type {string[]} */
  export let images = [];
  
  /** @type {string} */
  export let title = '';
  
  /** @type {string} */
  export let subtitle = '';
  
  /** @type {number} */
  export let autoplayDelay = 5000;

  let currentSlide = 0;

  function nextSlide() {
    currentSlide = (currentSlide + 1) % images.length;
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
  }

  /**
   * @param {number} index
   */
  function goToSlide(index) {
    currentSlide = index;
  }

  onMount(() => {
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  });
</script>

<section class="hero-slider">
  <!-- Slider Background -->
  <div class="slider-wrapper">
    {#each images as image, index}
      <div 
        class="slide" 
        class:active={index === currentSlide}
        style="background-image: url({image})"
      ></div>
    {/each}
    
    <!-- Dark Overlay -->
    <div class="overlay"></div>
  </div>

  <!-- Content -->
  <div class="hero-content">
    {#if title}
      <h1>{title}</h1>
    {/if}
    {#if subtitle}
      <p class="hero-subtitle">{subtitle}</p>
    {/if}
  </div>

  <!-- Navigation Arrows -->
  <button 
    class="nav-arrow prev" 
    on:click={prevSlide} 
    aria-label="Image précédente"
  >
    <ChevronLeft size={32} />
  </button>
  
  <button 
    class="nav-arrow next" 
    on:click={nextSlide} 
    aria-label="Image suivante"
  >
    <ChevronRight size={32} />
  </button>

  <!-- Dots Indicator -->
  <div class="slider-dots">
    {#each images as _, index}
      <button 
        class="dot" 
        class:active={index === currentSlide}
        on:click={() => goToSlide(index)}
        aria-label={`Aller à l'image ${index + 1}`}
      ></button>
    {/each}
  </div>
</section>

<style>
  .hero-slider {
    position: relative;
    height: 85vh;
    min-height: 950px;
    max-height: none;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -130px;
    padding-top: 500px;
  }

  /* Slider Wrapper */
  .slider-wrapper {
    position: absolute;
    inset: 0;
    z-index: 0;
    background: #000;
  }

  .slide {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center top;
    background-repeat: no-repeat;
    top : 3rem;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    z-index: 0;
  }

  .slide.active {
    opacity: 1;
    z-index: 1;
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(15, 45, 74, 0.5) 0%,
      rgba(26, 77, 122, 0.6) 50%,
      rgba(15, 45, 74, 0.7) 100%
    );
    z-index: 1;
  }

  /* Hero Content */
  .hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    color: white;
    padding: 2rem;
    max-width: 900px;
    margin: 0 auto;
    margin-top: 50px;
  }

  .hero-content h1 {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    animation: fadeInUp 0.8s ease-out;
    color: white;
  }

  .hero-subtitle {
    font-size: clamp(1.2rem, 3vw, 1.8rem);
    opacity: 0.95;
    font-weight: 300;
    line-height: 1.6;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
    animation: fadeInUp 0.8s ease-out 0.2s backwards;
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

  /* Navigation Arrows */
  .nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  .nav-arrow:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  .nav-arrow.prev {
    left: 2rem;
  }

  .nav-arrow.next {
    right: 2rem;
  }

  /* Slider Dots */
  .slider-dots {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    z-index: 10;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.8);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .dot:hover {
    background: rgba(255, 255, 255, 0.8);
  }

  .dot.active {
    background: white;
    transform: scale(1.3);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-slider {
      height: 70vh;
      min-height: 500px;
      margin-top: -80px;
      padding-top: 80px;
    }

    .hero-content {
      margin-top: 30px;
    }

    .nav-arrow {
      width: 40px;
      height: 40px;
    }

    .nav-arrow.prev {
      left: 1rem;
    }

    .nav-arrow.next {
      right: 1rem;
    }

    .slider-dots {
      bottom: 1.5rem;
      gap: 0.5rem;
    }

    .dot {
      width: 10px;
      height: 10px;
    }
  }
</style>