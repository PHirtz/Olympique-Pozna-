<svelte:head>
  <title>Status Olympique</title>
  <meta name="description" content={$_('status.metaDescription')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation from '$lib/components/ui/Navigation.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { HeartHandshake, ChevronLeft, ChevronRight, Award, Heart, Target } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  export let data;
</script>

<Navigation {data} />

<div class="coaches-page">
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <h1>Page</h1>
      <p class="hero-subtitle">en construction</p>
    </div>
  </section>
</div>
<style>
  /* Hero Section */
  .hero {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    padding: 8rem 2rem 4rem;
    text-align: center;
  }

  .hero-content h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .hero-subtitle {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    opacity: 0.95;
    font-weight: 300;
  }
</style>