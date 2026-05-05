<script>
  import { onMount } from 'svelte';
  import { init, locale } from 'svelte-i18n';
  import '$lib/i18n/i18n.js';
  import './layout.css';

  onMount(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      locale.set(savedLang);
    }
  });
</script>

<svelte:head>
  <!-- Open Graph par défaut (fallback toutes pages) -->
  <meta property="og:site_name" content="Olympique Poznań" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pl_PL" />
  <meta property="og:image" content="https://olympiquepoznan.pl/logo.png" />
  <meta property="og:image:width" content="800" />
  <meta property="og:image:height" content="800" />

  <!-- Twitter Card par défaut -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:image" content="https://olympiquepoznan.pl/logo.png" />
</svelte:head>

<slot />