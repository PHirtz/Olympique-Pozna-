<svelte:head>
  <title>Olympique Poznań – Klub piłkarski z Poznania</title>
  <meta name="description" content="Olympique Poznań to klub piłkarski dla dzieci i dorosłych w Poznaniu. Akademia, drużyny kobiece i obozy sportowe." />
  <meta property="og:title" content="Olympique Poznań – Klub piłkarski z Poznania" />
  <meta property="og:description" content="Akademia, drużyny kobiece i obozy sportowe w Poznaniu." />
  <meta property="og:url" content="https://olympiquepoznan.pl/" />
  <meta property="og:image" content="https://olympiquepoznan.pl/victory.jpg" />
  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "SportsOrganization",
      "name": "Olympique Poznań",
      "url": "https://olympiquepoznan.pl",
      "logo": "https://olympiquepoznan.pl/logo.png",
      "description": "Olympique Poznań to klub piłkarski dla dzieci i dorosłych w Poznaniu. Akademia, drużyny kobiece i obozy sportowe.",
      "sport": "Football",
      "foundingDate": "2023",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Poznań",
        "addressCountry": "PL"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+48-669-091-910",
        "email": "olympique.poznan@wielkopolskizpn.pl",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.facebook.com/OlympiquePoz",
        "https://www.instagram.com/olympiquepoznan/",
        "https://www.tiktok.com/tag/olympiquepoznań"
      ]
    }
  </script>
</svelte:head>

<script>
  import Hero from '$lib/components/ui/Hero.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import BanniereCamp from '$lib/components/BanniereCamp.svelte';
  import Navigation from '$lib/components/ui/Navigation.svelte';
  import Externe from '$lib/components/Externe.svelte';
	import SectionTeamsShort from '$lib/components/SectionTeamsShort.svelte';

  // Tableau d'images pour le slider Hero
  const heroImages = [
    '/victory.jpg',
    '/victoire-psg.jpg',
    '/img-communes/fondteam.jpeg',
    '/img-communes/filles-pelouse.jpg',
    '/poignee-victoire.jpg',
    '/dab-drapeau.jpg'
  ];
</script>

<Navigation />

<!-- Hero avec slider d'images -->
<Hero images={heroImages} />

<SectionTeamsShort />

<Externe />

<BanniereCamp />
<Footer />

<style>

  /* Desktop : côte à côte */
  @media (min-width: 1024px) {
   
  }

  /* Très grand écran */
  @media (min-width: 1400px) {

  }

  
</style>