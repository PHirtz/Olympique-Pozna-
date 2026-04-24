<script>
  import { _ } from 'svelte-i18n';
  import Navigation2 from "$lib/components/ui/Navigation2.svelte";
  import SectionTeams from "$lib/components/SectionTeams.svelte";
  import Footer from "$lib/components/ui/Footer.svelte";
</script>

<Navigation2 />

<section class="hero-teams">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <img src="../logo.png" alt="Olympique Poznań" class="hero-logo" />
    <h1>{$_('nav.teams')}</h1>
    <div class="hero-divider"></div>
  </div>
</section>

<SectionTeams />
<Footer />

<style>
  .hero-teams {
    position: relative;
    background-image: url('/seniorsf/561102658_709701402159649_1053392351238307688_n.jpg');
    background-size: cover;
    background-position: center 30%;
    background-color: #0f2d4a;
    padding: 9rem 2rem 5rem;
    min-height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(15, 45, 74, 0.88) 0%, rgba(26, 77, 122, 0.75) 100%);
  }

  .hero-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: -40px;
    text-align: center;
  }

  .hero-logo {
    height: 80px;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
  }

  .hero-content h1 {
    font-size: clamp(2.2rem, 5vw, 3.5rem);
    font-weight: 800;
    color: #ffffff;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    margin: 0;
    letter-spacing: 1px;
  }

  .hero-divider {
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #c9a961, #ddc184);
    border-radius: 2px;
  }
</style>