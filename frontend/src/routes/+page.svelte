<svelte:head>
  <title>Home - Olympique Poznań</title>
  <meta name="description" content="Olympique Poznań - Club de football" />
</svelte:head>

<script>
  import Hero from '$lib/components/ui/Hero.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import SectionTeams from '$lib/components/SectionTeams.svelte';
  import FacebookFeed from '$lib/components/FacebookFeed.svelte';
  import BanniereCamp from '$lib/components/BanniereCamp.svelte';
  import BanniereShop from '$lib/components/BanniereShop.svelte';
  import Navigation from '$lib/components/ui/Navigation.svelte';
  
  /** @type {import('./$types').PageData} */
  export let data;
</script>

<Navigation />
<Hero 
  image="/victory.jpg"
  title="Bienvenue sur le site d'Olympique Poznań"
  subtitle="Club de football de Poznań"
  description="Passion et partage sont nos moteurs"
/>
<SectionTeams />

<!-- Container pour Shop et Facebook côte à côte -->
<div class="content-grid">
  <div class="shop-section">
    <BanniereShop />
  </div>
  <div class="facebook-section">
    <FacebookFeed pageUrl="https://www.facebook.com/OlympiquePoz/" />
  </div>
</div>

<BanniereCamp />
<Footer />

<style>
  .content-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    max-width: 3000px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }

  /* Desktop : côte à côte */
  @media (min-width: 1024px) {
    .content-grid {
      grid-template-columns: 1.5fr 1fr;
      gap: 3rem;
      padding: 2rem;
    }
  }

  /* Très grand écran */
  @media (min-width: 1400px) {
    .content-grid {
      padding: 2rem 4rem;
    }
  }

  .shop-section,
  .facebook-section {
    min-width: 0; /* Important pour éviter l'overflow */
  }
</style>