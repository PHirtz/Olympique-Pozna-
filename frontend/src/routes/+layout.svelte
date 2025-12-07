<script>
  import { onMount } from 'svelte';
  import { init, locale } from 'svelte-i18n';
  import '$lib/i18n/i18n.js'; // ← Import de ta config i18n (IMPORTANT)
  
  onMount(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
      locale.set(savedLang);
    }
  });
</script>

<slot />