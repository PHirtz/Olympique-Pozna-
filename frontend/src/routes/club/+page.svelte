<svelte:head>
  <title>Club - Olympique Poznań</title>
  <meta name="Notre club" content="Club d'Olympique Poznań - Club de football" />
</svelte:head>

<script>
  import Navigation from '$lib/components/ui/Navigation.svelte';
  
  export let data;
</script>

<Navigation {data} />

<section class="hero">
  <h1>Le club Olympique Poznań</h1>
  <p>Parlons un peu de nous</p>
</section>