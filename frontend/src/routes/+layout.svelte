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

<slot />