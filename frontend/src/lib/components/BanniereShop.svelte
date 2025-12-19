<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';

  const shopImages = [
    {
      src: '../vitrine/Veste1.jpg',
      alt: 'veste domicile Olympique Poznań',
      titleKey: 'shop.items.jacket',
      link: '' // À compléter avec l'URL du produit
    },
    {
      src: '../vitrine/maillot.jpg',
      alt: 'maillot domicile Olympique Poznań',
      titleKey: 'shop.items.homeJersey',
      link: 'https://olympique.pl/products/koszulka-meczowa-olympique-domowa'
    },
    {
      src: '../vitrine/vestehv.jpg',
      alt: 'veste hiver Olympique Poznań',
      titleKey: 'shop.items.scarf',
      link: '' // À compléter avec l'URL du produit
    },
    {
      src: '../vitrine/Bidon.jpg',
      alt: 'Gourde Olympique Poznań',
      titleKey: 'shop.items.bottle',
      link: '' // À compléter avec l'URL du produit
    },
    {
      src: '../vitrine/roller.png',
      alt: 'Roller Olympique Poznań',
      titleKey: 'shop.items.roller',
      link: '' // À compléter avec l'URL du produit
    },
    {
      src: '../vitrine/chaussettes2.png',
      alt: 'Chaussettes Olympique Poznań',
      titleKey: 'shop.items.socks',
      link: 'https://olympique.pl/products/skarpetogetry'
    },
    {
      src: '../vitrine/sweatpluie.jpg',
      alt: 'Veste pluie officielle Olympique Poznań',
      titleKey: 'shop.items.rainJacket',
      link: '' // À compléter avec l'URL du produit
    },
    {
      src: '../vitrine/ShortBlanc3.png',
      alt: 'Short blanc Olympique Poznań',
      titleKey: 'shop.items.whiteShorts',
      link: 'https://olympique.pl/products/meskie-spodenki-meczowe-olympique?ownerid=126459513&noProxyRedirect=true&ownerid=126459513'
    },
    {
      src: '../vitrine/ShortBleu4.jpg',
      alt: 'Short bleu Olympique Poznań',
      titleKey: 'shop.items.blueShorts',
      link: 'https://olympique.pl/products/damskie-spodenki-meczowe-olympique?ownerid=126459513&noProxyRedirect=true&ownerid=126459513'
    },
    {
      src: '../vitrine/sweatfilles.jpg',
      alt: 'sweat Olympique Poznań',
      titleKey: 'shop.items.sweatshirt',
      link: '' // À compléter avec l'URL du produit
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
    }, 4000);
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
    window.open('https://olympique.pl', '_blank', 'noopener,noreferrer');
  }

  function handleProductClick(link) {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }
</script>

<section class="banniere-shop">
  <div class="banniere-container">
    <div class="content-wrapper">
      <!-- En-tête avec titre et bouton -->
      <div class="text-content">
        <h2>{$_('shop.banner.title')}</h2>
        <button class="shop-btn" on:click={handleShopClick}>
          {$_('shop.banner.cta')}
        </button>
      </div>

      <!-- Slider en dessous -->
      <div class="slider">
        <div class="slides" style="transform: translateX(-{currentSlide * 100}%)">
          {#each shopImages as product, index}
            {#if product.link}
              <!-- Si le produit a un lien, utilise un bouton -->
              <button 
                class="slide clickable"
                on:click={() => handleProductClick(product.link)}
                aria-label="Voir {$_(product.titleKey)}"
              >
                <img src={product.src} alt={product.alt} loading="lazy" />
                <div class="product-info">
                  <h3>{$_(product.titleKey)}</h3>
                  <span class="view-product">{$_('shop.viewProduct')}</span>
                </div>
              </button>
            {:else}
              <!-- Si pas de lien, utilise une div simple -->
              <div class="slide">
                <img src={product.src} alt={product.alt} loading="lazy" />
                <div class="product-info">
                  <h3>{$_(product.titleKey)}</h3>
                </div>
              </div>
            {/if}
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
  /* Mobile First */
  .banniere-shop {
    padding: 3rem 1rem;
  }

  .banniere-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* En-tête */
  .text-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
    padding: 1rem;
  }

  .text-content h2 {
    font-size: 2rem;
    color: var(--primary-color);
    font-weight: bold;
    margin: 0;
  }

  .shop-btn {
    background: var(--primary-color);
    color: #1a4d7a;
    border: none;
    padding: 1rem 2rem;
    font-size: 1.0625rem;
    font-weight: 800;
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

  /* Slider */
  .slider {
    position: relative;
    width: 100%;
    height: 400px;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(47, 5, 235, 0.264);
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
    transition: transform 0.3s ease;
    border: none;
    padding: 0;
    background: none;
    text-align: left;
  }

  .slide.clickable {
    cursor: pointer;
  }

  .slide.clickable:hover {
    transform: scale(1.02);
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
    background: linear-gradient(to top, rgba(45, 42, 42, 0.8), transparent);
    padding: 2rem 1.5rem 1.5rem;
    color: white;
  }

  .product-info h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.66);
  }

  .view-product {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.2);
    border: 2px solid white;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 0.5rem;
    transition: all 0.3s ease;
  }

  .slide.clickable:hover .view-product {
    background: rgb(85, 86, 96);
    color: var(--primary-color);
  }

  /* Boutons de navigation */
  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.95);
    border: none;
    width: 36px;
    height: 36px;
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
    left: 0.5rem;
  }

  .nav-btn.next {
    right: 0.5rem;
  }

  /* Indicateurs */
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

  /* Tablette (768px+) */
  @media (min-width: 768px) {
    .banniere-shop {
      padding: 4rem 2rem;
    }

    .content-wrapper {
      gap: 2.5rem;
    }

    .text-content h2 {
      font-size: 2.5rem;
    }

    .slider {
      height: 450px;
    }

    .product-info h3 {
      font-size: 1.5rem;
    }

    .nav-btn {
      width: 40px;
      height: 40px;
    }

    .nav-btn.prev {
      left: 1rem;
    }

    .nav-btn.next {
      right: 1rem;
    }
  }

  /* Desktop (1024px+) */
  @media (min-width: 1024px) {
    .banniere-shop {
      padding: 5rem 3rem;
    }

    .text-content {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      text-align: left;
    }

    .text-content h2 {
      font-size: 2.75rem;
    }

    .slider {
      height: 500px;
    }
  }

  /* Grand Desktop (1200px+) */
  @media (min-width: 1200px) {
    .text-content h2 {
      font-size: 3.5rem;
    }

    .slider {
      height: 550px;
    }
  }
</style>