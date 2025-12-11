<svelte:head>
  <title>Home - Olympique Poznań</title>
  <meta name="description" content="Olympique Poznań - Club de football" />
</svelte:head>

<script>
  import Hero from '$lib/components/ui/Hero.svelte';
  import Footer from '$lib/components/ui/Footer.svelte'
  import SectionTeams from '$lib/components/SectionTeams.svelte';
  import FacebookFeed from '$lib/components/FacebookFeed.svelte';
  import BanniereCamp from '$lib/components/BanniereCamp.svelte';
  import BanniereShop from '$lib/components/BanniereShop.svelte';
  
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Hero 
  image="/victory.jpg"
  title="Bienvenue sur le site d'Olympique Poznań"
  subtitle="Club de football de Poznań"
  description="Passion et partage sont nos moteurs"
/>

<SectionTeams />

<BanniereCamp />

<BanniereShop />

<FacebookFeed pageUrl="https://www.facebook.com/OlympiquePoz/" />

<Footer />

