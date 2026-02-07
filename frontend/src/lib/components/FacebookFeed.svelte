<script>
  import { _ } from 'svelte-i18n';
  import { locale } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let pageUrl = 'https://www.facebook.com/OlympiquePoz';
  export let height = 650;

  let loaded = false;
  let error = false;
  let fbContainer;

  // Locale Facebook
  $: fbLocale =
    $locale === 'pl' ? 'pl_PL'
    : $locale === 'en' ? 'en_US'
    : 'fr_FR';

  onMount(() => {
    if (browser) {
      loadFacebookSDK();
    }
  });

  function loadFacebookSDK() {
    // Supprimer anciens scripts
    document
      .querySelectorAll('script[src*="connect.facebook.net"]')
      .forEach(s => s.remove());

    // fb-root
    let fbRoot = document.getElementById('fb-root');

    if (!fbRoot) {
      fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }

    // Charger SDK
    const script = document.createElement('script');

    script.src = `https://connect.facebook.net/${fbLocale}/sdk.js#xfbml=1&version=v19.0`;

    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => {
      loaded = true;

      // Attendre que le layout soit prêt
      setTimeout(parseWidget, 400);
    };

    script.onerror = () => {
      error = true;
      console.error('Facebook SDK loading error');
    };

    document.body.appendChild(script);
  }

  function parseWidget() {
    if (window.FB && fbContainer) {
      window.FB.XFBML.parse(fbContainer);
    }
  }

  // Reparse quand la langue change
  $: if (browser && loaded && fbLocale) {
    setTimeout(parseWidget, 600);
  }

  function handleFallbackClick() {
    window.open(pageUrl, '_blank', 'noopener,noreferrer');
  }
</script>

<section class="facebook-section">

  <h2>{$_('facebook.latestPosts')}</h2>
  <p class="facebook-subtitle">
    {$_('facebook.followDescription')}
  </p>

  {#if error}

    <!-- Fallback -->
    <div class="facebook-fallback">

      <div class="fallback-card">

        <div class="fallback-icon">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M24 12.073c0-6.627-5.373-12-12-12s-12
              5.373-12 12c0 5.99 4.388 10.954 10.125
              11.854v-8.385H7.078v-3.47h3.047V9.43
              c0-3.007 1.792-4.669 4.533-4.669
              1.312 0 2.686.235 2.686.235v2.953
              H15.83c-1.491 0-1.956.925-1.956
              1.874v2.25h3.328l-.532 3.47h-2.796
              v8.385C19.612 23.027 24 18.062
              24 12.073z"/>
          </svg>
        </div>

        <h3>Olympique Poznań</h3>

        <p>{$_('facebook.followDescription')}</p>

        <button
          class="fallback-btn"
          on:click={handleFallbackClick}>

          {$_('facebook.viewOnFacebook')}

        </button>

      </div>

    </div>

  {:else if !loaded}

    <!-- Loading -->
    <div class="loading">

      <div class="spinner"></div>

      <p>{$_('common.loading')}...</p>

    </div>

  {:else}

    <!-- Widget -->
    <div
      class="facebook-widget-container"
      bind:this={fbContainer}>

      <div
        class="fb-page"
        data-href={pageUrl}
        data-tabs="timeline"
        data-height={height}
        data-adapt-container-width="true"
        data-small-header="false"
        data-hide-cover="false"
        data-show-facepile="true">

        <blockquote
          cite={pageUrl}
          class="fb-xfbml-parse-ignore">

          <a href={pageUrl}>
            Olympique Poznań
          </a>

        </blockquote>

      </div>

    </div>

  {/if}

</section>

<style>

  /* Section */

  .facebook-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 1rem;
    text-align: center;
  }

  .facebook-section h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
    font-weight: 600;
  }

  .facebook-subtitle {
    font-size: 1.1rem;
    color: #666;
  }

  /* Widget */

  .facebook-widget-container {
    width: 100%;
    max-width: 100%;

    background: white;
    border-radius: 16px;

    padding: 1rem;

    box-shadow: 0 4px 20px rgba(0,0,0,0.1);

    min-height: 525px;

    overflow: hidden;
  }

  /* Forcer largeur iframe */

  .facebook-widget-container,
  .facebook-widget-container .fb-page {
    width: 100% !important;
    max-width: 100% !important;
  }

  /* Loading */

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 1rem;

    padding: 4rem 2rem;

    min-height: 400px;

    justify-content: center;
  }

  .spinner {
    width: 48px;
    height: 48px;

    border: 4px solid #e5e7eb;
    border-top-color: #1877f2;

    border-radius: 50%;

    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .loading p {
    font-size: 1.1rem;
    color: #666;
  }

  /* Fallback */

  .facebook-fallback {
    display: flex;
    justify-content: center;

    padding: 2rem;
  }

  .fallback-card {
    background: white;
    border-radius: 16px;

    padding: 3rem 2rem;

    box-shadow: 0 4px 20px rgba(0,0,0,0.1);

    max-width: 500px;

    text-align: center;
  }

  .fallback-icon {
    width: 80px;
    height: 80px;

    margin: 0 auto 1.5rem;

    background: #1877f2;

    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    color: white;
  }

  .fallback-icon svg {
    width: 40px;
    height: 40px;
  }

  .fallback-card h3 {
    font-size: 1.5rem;

    margin-bottom: 1rem;

    color: #1a1a1a;
  }

  .fallback-card p {
    color: #666;

    margin-bottom: 2rem;

    line-height: 1.6;
  }

  .fallback-btn {
    background: #1877f2;
    color: white;

    border: none;

    padding: 1rem 2rem;

    font-size: 1rem;
    font-weight: 600;

    border-radius: 8px;

    cursor: pointer;

    transition: all 0.3s ease;
  }

  .fallback-btn:hover {
    background: #166fe5;
    transform: scale(1.05);
  }

  /* Responsive */

  @media (max-width: 768px) {

    .facebook-section {
      padding: 3rem 1rem;
    }

    .facebook-section h2 {
      font-size: 2rem;
    }

    .facebook-widget-container {
      min-height: 500px;
      padding: 0.5rem;
    }

    .fallback-card {
      padding: 2rem 1.5rem;
    }
  }

  @media (max-width: 480px) {

    .facebook-section {
      padding: 2rem 1rem;
    }

    .facebook-section h2 {
      font-size: 1.75rem;
    }

    .facebook-widget-container {
      padding: 0.25rem;
    }
  }

</style>
