<svelte:head>
  <title>Home - Olympique Poznan</title>
  <meta name="description" content="Olympique Poznan - Club de football" />
</svelte:head>

<script>
  import Hero from '$lib/components/ui/Hero.svelte';
  import NewsSection from '$lib/components/NewsSection.svelte';
  import MatchesSection from '$lib/components/MatchesSection.svelte';
  
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Hero 
  image="/victory.jpg"
  title="Bienvenue sur le site d'Olympique Poznan"
  subtitle="Club de football de Poznań"
  description="Passion et partage sont nos moteurs"
/>

<NewsSection news={data?.news || []} />

<MatchesSection matches={data?.matches || []} />
