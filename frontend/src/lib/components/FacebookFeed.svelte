<script>
  import { _ } from 'svelte-i18n';
  import { locale } from 'svelte-i18n';
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  /** @type {string} */
  export let pageUrl = 'https://www.facebook.com/OlympiquePoznan';
  
  /** @type {number} */
  export let width = 500;
  
  /** @type {number} */
  export let height = 700;
  
  let loaded = false;
  
  $: fbLocale = $locale === 'pl' ? 'pl_PL' : 'fr_FR';
  
  onMount(() => {
    if (browser) {
      // Charger le SDK Facebook
      loadFacebookSDK();
      loaded = true;
    }
  });
  
  /**
   * Charge le SDK Facebook dynamiquement
   */
  function loadFacebookSDK() {
    // Créer le div fb-root s'il n'existe pas
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }
    
    // Charger le script SDK
    const script = document.createElement('script');
    script.src = `https://connect.facebook.net/${fbLocale}/sdk.js#xfbml=1&version=v18.0`;
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    
    script.onload = () => {
      if (window.FB?.XFBML?.parse) {
        window.FB.XFBML.parse();
      }
    };
    
    document.body.appendChild(script);
  }
  
  // Recharger quand la langue change
  $: if (browser && loaded && fbLocale) {
    setTimeout(() => {
      if (window.FB?.XFBML?.parse) {
        window.FB.XFBML.parse();
      }
    }, 100);
  }
</script>

<section class="facebook-section">
  <h2>{$_('facebook.latestPosts')}</h2>
  <p class="facebook-subtitle">{$_('facebook.followDescription')}</p>
  
  {#if loaded}
    <div class="facebook-widget-container">
      <div 
        class="fb-page" 
        data-href={pageUrl}
        data-tabs="timeline" 
        data-width={width}
        data-height={height}
        data-small-header="false" 
        data-adapt-container-width="true" 
        data-hide-cover="false" 
        data-show-facepile="true">
        <blockquote cite={pageUrl} class="fb-xfbml-parse-ignore">
          <a href={pageUrl}>{$_('facebook.pageLink')}</a>
        </blockquote>
      </div>
    </div>
  {:else}
    <div class="loading">
      <p>⏳ {$_('common.loading')}</p>
    </div>
  {/if}
</section>

<style>
  .facebook-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
    text-align: center;
  }

  .facebook-section h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
    font-weight: 700;
  }

  .facebook-subtitle {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 2rem;
  }

  .facebook-widget-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .loading {
    text-align: center;
    padding: 4rem 2rem;
    font-size: 1.2rem;
    color: var(--color-primary, #1a4d7a);
  }

  @media (max-width: 768px) {
    .facebook-section h2 {
      font-size: 1.8rem;
    }

    .facebook-widget-container {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .facebook-section {
      padding: 2rem 1rem;
    }

    .facebook-widget-container {
      padding: 0.5rem;
    }
  }
</style>