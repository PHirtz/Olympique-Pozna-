<svelte:head>
  <title>shop - Olympique Poznań</title>
  <meta name="description" content="Shop d'Olympique Poznań - Club de football" />
</svelte:head>

<script>
  import Navigation from '$lib/components/ui/Navigation.svelte';
  
  export let data;
</script>

<Navigation {data} />

<section class="hero">
  <h1>Bienvenue sur le shop d'Olympique Poznań</h1>
  <p>Club de football de Poznań</p>
</section>