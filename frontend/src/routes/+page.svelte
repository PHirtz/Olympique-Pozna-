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

  // Tableau d'images pour le slider Hero
  const heroImages = [
    '/victory.jpg',
    '/480253574_519592814503843_155183674564057428_n.jpg',
    '/img-communes/fondteam.jpeg',
    '/img-communes/515983768_627785960351194_4348364861543239483_n.jpg',
    '/480550232_520175491112242_6056627001798457656_n.jpg',
    '/480451313_519582431171548_3309691283841879797_n.jpg'
  ];
</script>

<!-- Navigation EN PREMIER pour éviter les problèmes de z-index -->
<Navigation />

<!-- Hero avec slider d'images -->
<Hero images={heroImages} />

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
    min-width: 0; /* Pour éviter les débordements dans les flex/grid */
  }
</style>