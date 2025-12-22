<svelte:head>
  <title>{$_('about.title')}</title>
  <meta name="description" content={$_('about.metaDescription')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation from '$lib/components/ui/Navigation.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { Trophy, Users, Heart, Target, Instagram, Facebook } from 'lucide-svelte';
  
  export let data;
</script>

<Navigation {data} />