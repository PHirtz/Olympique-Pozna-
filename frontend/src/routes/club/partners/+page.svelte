<script>
  import { onMount } from 'svelte';
  import { partners as partnersAPI } from '$lib/api';
  import { locale as currentLocale, _ } from 'svelte-i18n';
  import { get } from 'svelte/store';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  
  /** @type {import('./$types').PageData} */
  export let data;

  let partnersList = [];
  let loading = true;
  let error = false;

  // Configuration de l'URL du backend
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  onMount(async () => {
    try {
      const response = await partnersAPI.getAll({ isActive: true });
      partnersList = response.data?.partners || response.data || [];
      console.log('📋 Tous les sponsors chargés:', partnersList);
    } catch (err) {
      console.error('Erreur chargement sponsors:', err);
      error = true;
    } finally {
      loading = false;
    }
  });

  // Grouper les sponsors par catégorie (selon la BDD)
  $: sponsorsByCategory = {
    main_sponsor: partnersList.filter(p => p.category === 'main_sponsor'),
    official_partner: partnersList.filter(p => p.category === 'official_partner'),
    supplier: partnersList.filter(p => p.category === 'supplier'),
    media_partner: partnersList.filter(p => p.category === 'media_partner')
  };

  const categoryLabels = {
    main_sponsor: { 
      fr: 'Sponsor Principal', 
      en: 'Main Sponsor',
      pl: 'Główny Sponsor' 
    },
    official_partner: { 
      fr: 'Partenaires Officiels', 
      en: 'Official Partners',
      pl: 'Oficjalni Partnerzy' 
    },
    supplier: { 
      fr: 'Fournisseurs', 
      en: 'Suppliers',
      pl: 'Dostawcy' 
    },
    media_partner: { 
      fr: 'Partenaires Médias', 
      en: 'Media Partners',
      pl: 'Partnerzy Medialni' 
    }
  };

  $: getCategoryLabel = (category) => {
    const locale = $currentLocale;
    return categoryLabels[category]?.[locale] || categoryLabels[category]?.fr || category;
  };

  // Obtenir la bonne description selon la langue
  $: getDescription = (partner) => {
    const locale = $currentLocale;
    if (locale === 'pl') return partner.descriptionPl || partner.description || partner.descriptionEn;
    if (locale === 'en') return partner.descriptionEn || partner.description || partner.descriptionPl;
    return partner.description || partner.descriptionEn || partner.descriptionPl;
  };

  // Configuration de l'URL de base (sans /api/)
  const BASE_URL = import.meta.env.VITE_PUBLIC_URL || 'https://olympiquepoznan.pl';

  // Fonction pour obtenir l'URL complète de l'image
  function getImageUrl(partner) {
    const path = partner.logoUrl || partner.logoPath;
    if (!path) return '/logo.png';
    
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    return `${BASE_URL}${path}`;
  }
</script>

<svelte:head>
  <title>{$_('club.partners.hero.subtitle')}</title>
  <meta name="description" content="{$_('club.partners.metaDescription')}" />
</svelte:head>

<Navigation2 {data} />

<div class="partners-page">
  <!-- Hero Section -->
  <section class="hero-partners">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>{$_('club.partners.hero.subtitle')}</h1>
      <p>{$_('club.partners.metaDescription')}</p>
    </div>
  </section>

  <!-- Partners Content -->
  <section class="partners-content">
    <div class="container">
      {#if loading}
        <div class="loading-state">
          <div class="spinner"></div>
          <p>Chargement des partenaires...</p>
        </div>
      {:else if error}
        <div class="error-state">
          <p>❌ Impossible de charger les partenaires</p>
        </div>
      {:else if partnersList.length === 0}
        <div class="empty-state">
          <p>Aucun partenaire pour le moment</p>
        </div>
      {:else}
        <!-- Par catégorie -->
        {#each Object.entries(sponsorsByCategory) as [category, sponsors]}
          {#if sponsors.length > 0}
            <div class="category-section">
              <h2 class="category-title">{getCategoryLabel(category)}</h2>
              
              <div class="sponsors-grid" class:main-grid={category === 'main_sponsor'}>
                {#each sponsors as partner (partner.id)}
                  <div class="partner-card" class:main-card={category === 'main_sponsor'}>
                    {#if partner.websiteUrl}
                      <a 
                        href={partner.websiteUrl} 
                        class="partner-link"
                        target="_blank" 
                        rel="noopener noreferrer"
                        title={partner.name}
                      >
                        <div class="partner-logo">
                          <img 
                            src={getImageUrl(partner)}
                            alt={partner.name}
                            loading="lazy"
                          />
                        </div>
                        <div class="partner-info">
                          <h3>{partner.name}</h3>
                          {#if getDescription(partner)}
                            <p class="partner-description">
                              {getDescription(partner)}
                            </p>
                          {/if}
                        </div>
                      </a>
                    {:else}
                      <div class="partner-link no-link">
                        <div class="partner-logo">
                          <img 
                            src={getImageUrl(partner)}
                            alt={partner.name}
                            loading="lazy"
                          />
                        </div>
                        <div class="partner-info">
                          <h3>{partner.name}</h3>
                          {#if getDescription(partner)}
                            <p class="partner-description">
                              {getDescription(partner)}
                            </p>
                          {/if}
                        </div>
                      </div>
                    {/if}
                  </div>
                {/each}
              </div>
            </div>
          {/if}
        {/each}

        <!-- CTA -->
        <div class="cta-section">
          <h2>{$_('club.partners.cta.title')}</h2>
          <p>{$_('club.partners.cta.text')}</p>
          <a href="/contact" class="cta-button">{$_('club.partners.cta.button')}</a>
        </div>
      {/if}
    </div>
  </section>
</div>

<Footer {data} />

<style>
  /* ========================================
     MOBILE FIRST - Base (320px+)
     ======================================== */

  .partners-page {
    min-height: 100vh;
  }

  /* Hero Section */
  .hero-partners {
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

  .hero-content p {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    opacity: 0.95;
    font-weight: 300;
    color: #c9a961;
  }

  /* Content */
  .partners-content {
    padding: 3rem 0;
    background: #f8f9fa;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* États */
  .loading-state,
  .error-state,
  .empty-state {
    text-align: center;
    padding: 4rem 1rem;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #e0e0e0;
    border-top-color: #1a4d7a;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 1rem;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Category Section */
  .category-section {
    margin-bottom: 4rem;
  }

  .category-title {
    font-size: 1.5rem;
    color: #1a4d7a;
    margin-bottom: 2rem;
    text-align: center;
    position: relative;
    padding-bottom: 0.75rem;
  }

  .category-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #c9a961;
  }

  /* Sponsors Grid */
  .sponsors-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .main-grid {
    grid-template-columns: 1fr;
  }

  /* Partner Card */
  .partner-card {
    background: white;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.3s;
    height: 100%;
  }

  .partner-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }

  .main-card {
    border: 2px solid #c9a961;
  }

  .partner-link {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
    height: 100%;
  }

  .partner-link.no-link {
    cursor: default;
  }

  .partner-link.no-link:hover {
    transform: none;
  }

  .partner-card:has(.partner-link.no-link):hover {
    transform: none;
  }

  .partner-logo {
    padding: 2rem;
    background: #f8f9fa;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
  }

  .partner-logo img {
    max-width: 100%;
    max-height: 100px;
    width: auto;
    height: auto;
    object-fit: contain;
    transition: transform 0.3s;
  }

  .partner-card:hover:not(:has(.no-link)) .partner-logo img {
    transform: scale(1.05);
  }

  .partner-info {
    padding: 1.5rem;
    flex: 1;
  }

  .partner-info h3 {
    font-size: 1.125rem;
    color: #1a4d7a;
    margin-bottom: 0.5rem;
  }

  .partner-description {
    font-size: 0.875rem;
    color: #666;
    line-height: 1.5;
  }

  /* CTA */
  .cta-section {
    text-align: center;
    padding: 3rem 1rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    margin-top: 3rem;
  }

  .cta-section h2 {
    font-size: 1.75rem;
    color: #1a4d7a;
    margin-bottom: 0.5rem;
  }

  .cta-section p {
    font-size: 1rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    text-decoration: none;
    border-radius: 0.5rem;
    font-weight: 600;
    transition: all 0.3s;
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 77, 122, 0.3);
  }

  /* ========================================
     TABLET (640px+)
     ======================================== */

  @media (min-width: 640px) {
    .sponsors-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .main-grid {
      grid-template-columns: 1fr;
    }

    .hero-content h1 {
      font-size: 2.5rem;
    }

    .hero-content p {
      font-size: 1.125rem;
    }

    .category-title {
      font-size: 1.75rem;
    }
  }

  /* ========================================
     DESKTOP (768px+)
     ======================================== */

  @media (min-width: 768px) {
    .container {
      padding: 0 2rem;
    }

    .hero-partners {
      height: 300px;
    }

    .partners-content {
      padding: 4rem 0;
    }

    .sponsors-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .main-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .partner-logo {
      min-height: 180px;
    }

    .partner-logo img {
      max-height: 120px;
    }
  }

  /* ========================================
     LARGE DESKTOP (1024px+)
     ======================================== */

  @media (min-width: 1024px) {
    .hero-content h1 {
      font-size: 4rem;
    }

    .category-section {
      margin-bottom: 5rem;
    }

    .sponsors-grid {
      gap: 2.5rem;
    }
  }
</style>