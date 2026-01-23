<script>
  import { onMount } from 'svelte';
  import { init, locale } from 'svelte-i18n';
  import '$lib/i18n/i18n.js';
  import './layout.css';
  
  onMount(() => {
    // Si l'utilisateur a déjà choisi une langue, on la restaure
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      locale.set(savedLang);
    }
    // Sinon, on garde 'pl' qui est déjà l'initialLocale
  });
</script>

<slot />