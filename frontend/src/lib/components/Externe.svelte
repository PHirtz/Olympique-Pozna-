<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import FacebookFeed from './FacebookFeed.svelte';

  const shopImages = [
    {
      src: '../vitrine/Veste1.jpg',
      alt: 'veste domicile Olympique Poznań',
      titleKey: 'shop.items.jacket',
      link: ''
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
      link: ''
    },
    {
      src: '../vitrine/Bidon.jpg',
      alt: 'Gourde Olympique Poznań',
      titleKey: 'shop.items.bottle',
      link: ''
    },
    {
      src: '../vitrine/roller.png',
      alt: 'Roller Olympique Poznań',
      titleKey: 'shop.items.roller',
      link: ''
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
      link: ''
    },
    {
      src: '../vitrine/ShortBlanc3.png',
      alt: 'Short blanc Olympique Poznań',
      titleKey: 'shop.items.whiteShorts',
      link: 'https://olympique.pl/products/meskie-spodenki-meczowe-olympique'
    },
    {
      src: '../vitrine/ShortBleu4.jpg',
      alt: 'Short bleu Olympique Poznań',
      titleKey: 'shop.items.blueShorts',
      link: 'https://olympique.pl/products/damskie-spodenki-meczowe-olympique'
    },
    {
      src: '../vitrine/sweatfilles.jpg',
      alt: 'sweat Olympique Poznań',
      titleKey: 'shop.items.sweatshirt',
      link: ''
    }
  ];

  export let pageUrl = 'https://www.facebook.com/OlympiquePoz';

  let currentSlide = 0;
  let interval;

  onMount(() => {
    startAutoSlide();

    return () => {
      clearInterval(interval);
    };
  });

  function startAutoSlide() {
    interval = setInterval(nextSlide, 4000);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % shopImages.length;
  }

  function prevSlide() {
    currentSlide =
      currentSlide === 0
        ? shopImages.length - 1
        : currentSlide - 1;
  }

  function goToSlide(index) {
    currentSlide = index;
    clearInterval(interval);
    startAutoSlide();
  }

  function handleShopClick() {
    window.open('https://olympique.pl', '_blank');
  }

  function handleProductClick(link) {
    if (link) {
      window.open(link, '_blank');
    }
  }
</script>

<section class="combined-section">

  <div class="container">

    <!-- SHOP -->
    <div class="shop-column">

      <div class="text-content">
        <h2>{$_('shop.banner.title')}</h2>

        <button
          class="shop-btn"
          on:click={handleShopClick}
        >
          {$_('shop.banner.cta')}
        </button>
      </div>


      <div class="slider">

        <div
          class="slides"
          style="transform: translateX(-{currentSlide * 100}%)"
        >

          {#each shopImages as product}

            {#if product.link}

              <button
                class="slide clickable"
                on:click={() => handleProductClick(product.link)}
              >

                <img
                  src={product.src}
                  alt={product.alt}
                  loading="lazy"
                />

                <div class="product-info">
                  <h3>{$_(product.titleKey)}</h3>
                  <span class="view-product">
                    {$_('shop.viewProduct')}
                  </span>
                </div>

              </button>

            {:else}

              <div class="slide">

                <img
                  src={product.src}
                  alt={product.alt}
                  loading="lazy"
                />

                <div class="product-info">
                  <h3>{$_(product.titleKey)}</h3>
                </div>

              </div>

            {/if}

          {/each}

        </div>


        <!-- NAV -->

        <button
          class="nav-btn prev"
          on:click={prevSlide}
        >
          ‹
        </button>

        <button
          class="nav-btn next"
          on:click={nextSlide}
        >
          ›
        </button>


        <!-- INDICATORS -->

        <div class="indicators">

          {#each shopImages as _, i}

            <button
              class="indicator"
              class:active={currentSlide === i}
              on:click={() => goToSlide(i)}
              aria-label="Go to slide {i + 1}"
            ></button>

          {/each}

        </div>

      </div>

    </div>


    <!-- FACEBOOK -->

    <div class="facebook-column">

      <FacebookFeed pageUrl={pageUrl} />

    </div>

  </div>

</section>


<style>

/* BASE */

.combined-section {
  padding: 3rem 1rem;
  background: #f8fafc;
}

.container {
  max-width: 1400px;
  margin: auto;

  display: flex;
  flex-direction: column;
  gap: 3rem;
}


/* SHOP */

.shop-column {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}


.text-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}


.shop-btn {
  background: #e8ecef;
  border: 2px solid #1a4d7a;
  padding: 1rem 2rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  color: #0f2d4a;
  
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.shop-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: #0f2d4a;
  transition: left 0.3s ease;
  z-index: -1;
}

.shop-btn:hover::before {
  left: 0;
}

.shop-btn:hover {
  color: white;
  border-color: #1a4d7a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.shop-btn:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}


.slider {
  height: 750px;
  border-radius: 16px;
  overflow: hidden;
  background: white;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}


.slides {
  display: flex;
  height: 100%;
  transition: transform 0.5s ease;
}


.slide {
  min-width: 100%;
  height: 100%;
  position: relative;
  background: none;
  border: none;
  padding: 0;
  display: block;
}

.slide.clickable {
  cursor: pointer;
}


.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}


.product-info {
  position: absolute;
  bottom: 0;
  inset-inline: 0;

  padding: 1.5rem;
  color: white;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.3) 60%,
    transparent
  );
  
  transition: background 0.3s ease;
}

.product-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  color: #d32f2f;
}


/* Bouton "Voir le produit" dans les slides cliquables */

.view-product {
  display: inline-block;
  margin-top: 1.75rem;
  margin-bottom: 2rem;
  padding: 0.625rem 1.25rem;
  background: white;
  color: #1a1a1a;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.slide.clickable:hover .view-product {
  background: #1a4d7a;
  color: white;
  transform: translateX(6px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.slide.clickable:hover .product-info {
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9),
    rgba(0, 0, 0, 0.4) 60%,
    transparent
  );
}


/* NAV */

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  width: 48px;
  height: 48px;

  border-radius: 50%;
  border: none;

  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  color: #1a1a1a;

  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.nav-btn:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.nav-btn:active {
  transform: translateY(-50%) scale(0.95);
}


.prev { left: 1rem; }
.next { right: 1rem; }


/* INDICATORS */

.indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;

  transform: translateX(-50%);

  display: flex;
  gap: 0.5rem;
}


.indicator {
  width: 10px;
  height: 10px;

  border-radius: 50%;
  border: none;
  cursor: pointer;

  background: rgba(255, 255, 255, 0.6);
  
  transition: all 0.3s ease;
}

.indicator:hover {
  background: rgba(255, 255, 255, 0.8);
  transform: scale(1.2);
}


.indicator.active {
  width: 26px;
  border-radius: 6px;
  background: white;
}


/* FACEBOOK */

.facebook-column {
  width: 100%;
}


/* DESKTOP */

@media (min-width: 1024px) {

  .container {
    flex-direction: row;
    align-items: flex-start;
  }


  .shop-column {
    flex: 2;
    min-width: 0;
  }


  .facebook-column {
    flex: 1;
    min-width: 0;
  }


  .text-content {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }

}

</style>