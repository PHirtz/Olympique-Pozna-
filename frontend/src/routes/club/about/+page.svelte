<svelte:head>
  <title>{$_('about.title')}</title>
  <meta name="description" content={$_('about.metaDescription')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation from '$lib/components/ui/Navigation.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { Trophy, Users, Heart, Target, Instagram, Facebook } from 'lucide-svelte';
  
  export let data;
</script>

<Navigation {data} />

<div class="about-page">
  <!-- Hero Section -->
  <section class="hero-about">
    <div class="hero-content">
      <h1>{$_('about.hero.title')}</h1>
      <p class="hero-subtitle">{$_('about.hero.subtitle')}</p>
    </div>
  </section>

  <main class="main-content">
    <!-- Introduction -->
    <section class="intro-section">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-text">
            <p class="lead-text">
              {$_('about.intro.text')}
            </p>
          </div>
          <div class="intro-image">
            <img src="../logo.png" alt="Logo Olympique Poznań" />
          </div>
        </div>
      </div>
    </section>

    <!-- Valeurs du club -->
    <section class="values-section">
      <div class="container">
        <h2 class="section-title">{$_('about.values.title')}</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <Trophy size={40} />
            </div>
            <h3>{$_('about.values.excellence.title')}</h3>
            <p>{$_('about.values.excellence.description')}</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <Users size={40} />
            </div>
            <h3>{$_('about.values.teamSpirit.title')}</h3>
            <p>{$_('about.values.teamSpirit.description')}</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <Heart size={40} />
            </div>
            <h3>{$_('about.values.passion.title')}</h3>
            <p>{$_('about.values.passion.description')}</p>
          </div>
          
          <div class="value-card">
            <div class="value-icon">
              <Target size={40} />
            </div>
            <h3>{$_('about.values.training.title')}</h3>
            <p>{$_('about.values.training.description')}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Formation -->
    <section class="formation-section">
      <div class="container">
        <div class="content-block">
          <h2>{$_('about.formation.excellence.title')}</h2>
          <p>
            {$_('about.formation.excellence.text1')}
          </p>
          <p>
            {$_('about.formation.excellence.text2')}
          </p>
        </div>

        <div class="content-block">
          <h2>{$_('about.formation.coaches.title')}</h2>
          <p>
            {$_('about.formation.coaches.text1')}
          </p>
          <p>
            {$_('about.formation.coaches.text2')}
          </p>
        </div>

        <div class="content-block">
          <h2>{$_('about.formation.atmosphere.title')}</h2>
          <p>
            {$_('about.formation.atmosphere.text1')}
          </p>
          <p>
            {$_('about.formation.atmosphere.text2')}
          </p>
        </div>
      </div>
    </section>

    <!-- Communauté -->
    <section class="community-section">
      <div class="container">
        <h2 class="section-title">{$_('about.community.title')}</h2>
        <p class="community-intro">
          {$_('about.community.intro')}
        </p>
        
        <div class="social-links">
          <a href="https://www.instagram.com/olympiquepoznan/" target="_blank" rel="noopener noreferrer" class="social-card">
            <Instagram size={32} />
            <span>@olympiquepoznan</span>
          </a>
          
          <a href="https://www.facebook.com/OlympiquePoz" target="_blank" rel="noopener noreferrer" class="social-card">
            <Facebook size={32} />
            <span>Olympique Poznań</span>
          </a>
          
          <a href="https://www.tiktok.com/tag/olympiquepoznań" target="_blank" rel="noopener noreferrer" class="social-card">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
            <span>#olympiquepoznań</span>
          </a>
        </div>

        <div class="cta-section">
          <p class="cta-text">
            {$_('about.community.cta.text')}
            <strong>{$_('about.community.cta.textBold')}</strong>
          </p>
          <a href="/register" class="cta-button">{$_('about.community.cta.button')}</a>
        </div>
      </div>
    </section>
  </main>
</div>

<Footer {data} />

<style>
  .about-page {
    min-height: 100vh;
  }

  /* Hero Section */
  .hero-about {
    background:linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
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

  /* Container */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .main-content {
    background: #ffffff;
  }

  /* Introduction Section */
  .intro-section {
    padding: 4rem 0;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  .intro-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
  }

  @media (min-width: 768px) {
    .intro-grid {
      grid-template-columns: 2fr 1fr;
    }
  }

  .lead-text {
    font-size: 1.25rem;
    line-height: 1.8;
    color: #334155;
  }

  .intro-image {
    display: flex;
    justify-content: center;
  }

  .intro-image img {
    max-width: 300px;
    width: 100%;
    height: auto;
    border-radius: 16px;
  }

  /* Values Section */
  .values-section {
    padding: 5rem 0;
    background: #0f2d4a;
    color: white;
  }

  .section-title {
    text-align: center;
    font-size: clamp(2rem, 4vw, 2.5rem);
    margin-bottom: 3rem;
    font-weight: 700;
  }

  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .value-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    padding: 2rem;
    border-radius: 16px;
    text-align: center;
    transition: transform 0.3s ease, background 0.3s ease;
  }

  .value-card:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.15);
  }

  .value-icon {
    display: inline-flex;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    margin-bottom: 1rem;
  }

  .value-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  .value-card p {
    opacity: 0.9;
    line-height: 1.6;
  }

  /* Formation Section */
  .formation-section {
    padding: 5rem 0;
  }

  .content-block {
    margin-bottom: 3rem;
  }

  .content-block h2 {
    font-size: clamp(1.5rem, 3vw, 2rem);
    color: #1e3a8a;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  .content-block p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #475569;
    margin-bottom: 1rem;
  }

  /* Community Section */
  .community-section {
    padding: 5rem 0;
    background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
  }

  .community-intro {
    text-align: center;
    font-size: 1.15rem;
    max-width: 800px;
    margin: 0 auto 3rem;
    color: #475569;
    line-height: 1.8;
  }

  .social-links {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
  }

  .social-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: white;
    border-radius: 12px;
    text-decoration: none;
    color: #1e3a8a;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }

  .social-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 15px rgba(30, 58, 138, 0.2);
    color: #3b82f6;
  }

  .social-card span {
    font-weight: 500;
    font-size: 1.1rem;
  }

  /* CTA Section */
  .cta-section {
    text-align: center;
    padding: 3rem 2rem;
    background: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }

  .cta-text {
    font-size: 1.15rem;
    line-height: 1.8;
    color: #475569;
    max-width: 800px;
    margin: 0 auto 2rem;
  }

  .cta-button {
    display: inline-block;
    padding: 1rem 3rem;
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(30, 58, 138, 0.4);
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-about {
      padding: 6rem 1.5rem 3rem;
    }

    .values-grid {
      grid-template-columns: 1fr;
    }

    .social-links {
      grid-template-columns: 1fr;
    }
  }
</style>