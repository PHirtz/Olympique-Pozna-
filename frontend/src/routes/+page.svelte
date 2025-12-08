<svelte:head>
  <title>Home - Olympique Poznan</title>
  <meta name="description" content="Olympique Poznan - Club de football" />
</svelte:head>

<script>
  import Hero from '$lib/components/ui/Hero.svelte';
  import Footer from '$lib/components/ui/Footer.svelte'
  import FacebookFeed from '$lib/components/FacebookFeed.svelte';
  
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Hero 
  image="/victory.jpg"
  title="Bienvenue sur le site d'Olympique Poznan"
  subtitle="Club de football de Poznań"
  description="Passion et partage sont nos moteurs"
/>

<FacebookFeed pageUrl="https://www.facebook.com/OlympiquePoz/" />

<Footer />

