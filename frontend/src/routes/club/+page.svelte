<script>
  import { get } from 'svelte/store';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  
  /** @type {import('./$types').PageData} */
  export let data;

</script>

<svelte:head>
  <title>Le Club - Olympique Poznań</title>
  <meta name="description" content="Découvrez notre club" />
</svelte:head>

<Navigation2 {data} />