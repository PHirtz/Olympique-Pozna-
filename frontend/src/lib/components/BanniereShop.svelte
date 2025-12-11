<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { goto } from '$app/navigation';

  const shopImages = [
    {
      src: '../vitrine/maillots.jpg',
      alt: 'Maillots domicile Olympique Poznań',
      title: 'Maillots domicile Officiels',
    },
    {
      src: '../vitrine/Veste1.jpg',
      alt: 'veste domicile Olympique Poznań',
      title: 'Veste pluie officielle',
    },
    {
      src: '../vitrine/vestehv.jpg',
      alt: 'veste hiver  Olympique Poznań',
      title: 'Veste Hiver officielle',
    },
    {
      src: '../vitrine/Bidon.jpg',
      alt: 'Gourde Olympique Poznań',
      title: 'Gourde Officielle',
    },
    {
      src: '../vitrine/chaussettes2.png',
      alt: 'Chaussettes Olympique Poznań',
      title: 'Chaussettes',
    },
    {
      src: '../vitrine/Echarpe1.jpg',
      alt: 'Echarpe Olympique Poznań',
      title: 'Echarpe Officielle',
    },
    {
      src: '../vitrine/Getry.png',
      alt: 'Guêtre Olympique Poznań',
      title: 'Guêtre',
    },
    {
      src: '../vitrine/sweatpluie.jpg',
      alt: 'Veste pluie officielle Olympique Poznań',
      title: 'Veste pluie officielle',
    },
    {
      src: '../vitrine/ShortBlanc3.png',
      alt: 'Short blanc Olympique Poznań',
      title: 'Short blanc',
    },
        {
      src: '../vitrine/ShortBleu4.jpg',
      alt: 'Short bleu Olympique Poznań',
      title: 'Short bleu',
    },
    {
      src: '../vitrine/Gardien1.jpg',
      alt: 'Gants Olympique Poznań',
      title: 'Gants de gardien',
    },
    {
      src: '../vitrine/Jogging1.jpg',
      alt: 'Jogging Olympique Poznań',
      title: 'Jogging Officiel',
    },
    {
      src: '../vitrine/sweatfilles.jpg',
      alt: 'sweat Olympique Poznań',
      title: 'Sweat Officiel',
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
    }, 4000); // Change toutes les 4 secondes
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % shopImages.length;
  }

  function prevSlide() {
    currentSlide = currentSlide === 0 ? shopImages.length - 1 : currentSlide - 1;
  }

  function goToSlide(index) {
    currentSlide = index;
    clearInterval(interval);
    startAutoSlide();
  }

  function handleShopClick() {
    goto('www.olympique.pl');
  }
</script>

<section class="banniere-shop">
  <div class="banniere-container">
    <div class="content-wrapper">
      <div class="text-content">
        <h2>{$_('shop.banner.title', { default: 'Boutique Olympique' })}</h2>
        <p>{$_('shop.banner.subtitle', { default: 'Portez fièrement les couleurs du club' })}</p>
        <button class="shop-btn" on:click={handleShopClick}>
          {$_('shop.banner.cta', { default: 'Découvrir la boutique' })}
        </button>
      </div>

      <div class="slider">
        <div class="slides" style="transform: translateX(-{currentSlide * 100}%)">
          {#each shopImages as product, index}
            <div class="slide">
              <img src={product.src} alt={product.alt} loading="lazy" />
              <div class="product-info">
                <h3>{product.title}</h3>
              </div>
            </div>
          {/each}
        </div>

        <!-- Boutons de navigation -->
        <button class="nav-btn prev" on:click={prevSlide} aria-label="Produit précédent">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="nav-btn next" on:click={nextSlide} aria-label="Produit suivant">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <!-- Indicateurs -->
        <div class="indicators">
        {#each shopImages as _, index}
            <button
            class="indicator"
            class:active={currentSlide === index}
            on:click={() => goToSlide(index)}
            aria-label="Voir produit {index + 1}"
            ></button>
        {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .banniere-shop {
    padding: 4rem 2rem;
    background: var(--bg-secondary, #f5f5f5);
  }

  .banniere-container {
    max-width: 1400px;
    margin: 0 auto;
  }

  .content-wrapper {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
    align-items: center;
  }

  .text-content {
    padding: 2rem;
  }

  .text-content h2 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-weight: bold;
  }

  .text-content p {
    font-size: 1.125rem;
    color: var(--text-secondary);
    margin-bottom: 2rem;
    line-height: 1.6;
  }

  .shop-btn {
    background: var(--primary-color);
    color: rgba(30, 64, 175, 0.2);
    border: none;
    padding: 1rem 2rem;
    font-size: 1.0625rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(30, 64, 175, 0.2);
  }

  .shop-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30, 64, 175, 0.3);
    background: var(--primary-color-dark, #1a4d7a);
    color: white;
  }

  .slider {
    position: relative;
    width: 100%;
    height: 450px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    background: white;
  }

  .slides {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease-in-out;
  }

  .slide {
    min-width: 100%;
    height: 100%;
    position: relative;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .product-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
    padding: 2rem 1.5rem 1.5rem;
    color: white;
  }

  .product-info h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.95);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    color: var(--primary-color);
  }

  .nav-btn:hover {
    background: white;
    transform: translateY(-50%) scale(1.15);
  }

  .nav-btn.prev {
    left: 1rem;
  }

  .nav-btn.next {
    right: 1rem;
  }

  .indicators {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
    z-index: 10;
  }

  .indicator {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid white;
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
  }

  .indicator.active {
    background: white;
    width: 28px;
    border-radius: 5px;
  }

  .indicator:hover {
    background: rgba(255, 255, 255, 0.8);
  }

  @media (max-width: 968px) {
    .content-wrapper {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .text-content {
      text-align: center;
      padding: 1rem;
    }

    .slider {
      height: 350px;
    }
  }

  @media (max-width: 768px) {
    .banniere-shop {
      padding: 3rem 1rem;
    }

    .text-content h2 {
      font-size: 2rem;
    }

    .text-content p {
      font-size: 1rem;
    }

    .slider {
      height: 300px;
    }

    .nav-btn {
      width: 36px;
      height: 36px;
    }

    .nav-btn.prev {
      left: 0.5rem;
    }

    .nav-btn.next {
      right: 0.5rem;
    }

    .product-info h3 {
      font-size: 1.25rem;
    }

    .price {
      font-size: 1.125rem;
    }
  }
</style>