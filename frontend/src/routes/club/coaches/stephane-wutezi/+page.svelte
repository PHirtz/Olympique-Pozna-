<svelte:head>
  <title>{$_('coaches.stephane.name')} - {$_('coaches.title')}</title>
  <meta name="description" content={$_('coaches.stephane.tagline')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { Award, Heart, ArrowLeft } from 'lucide-svelte';
  
  export let data;
</script>

<Navigation2 {data} />

<div class="coach-page">
  <!-- Breadcrumb -->
  <nav class="breadcrumb">
    <a href="/club/coaches">
      <ArrowLeft size={20} />
      {$_('coaches.backToCoaches')}
    </a>
  </nav>

  <!-- Hero Section -->
  <section class="hero-coach">
    <div class="hero-content">
      <img 
        src="/trener/stephane-trener.jpg" 
        alt={$_('coaches.stephane.name')} 
        class="coach-hero-photo"
      />
      <div class="hero-info">
        <h1>{$_('coaches.stephane.name')}</h1>
        <p class="coach-tagline">
          <Award size={24} />
          {$_('coaches.stephane.tagline')}
        </p>
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <main class="main-content">
    <div class="container">
      
      <!-- Highlight Box -->
      <div class="highlight-box">
        <p class="since">⚽ {$_('coaches.stephane.since')}</p>
        <p class="motto">
          <Heart size={20} />
          <strong>{$_('coaches.stephane.motto')}</strong>
        </p>
      </div>

      <!-- Formations -->
      <section class="section-block">
        <h2>{$_('coaches.stephane.formations.title')}</h2>
        <ul class="styled-list">
          <li>{$_('coaches.stephane.formations.uefa_c')}</li>
          <li>{$_('coaches.stephane.formations.uefa_b')}</li>
          <li>{$_('coaches.stephane.formations.stages')}</li>
          <li>{$_('coaches.stephane.formations.conferences')}</li>
        </ul>
      </section>

      <!-- Experience Coach -->
      <section class="section-block">
        <h2>{$_('coaches.stephane.experience.coach.title')}</h2>
        <ul class="compact-list">
          <li>Tours FC</li>
          <li>Quick Tours Nord</li>
          <li>IEP Bordeaux</li>
          <li>JA Bréal</li>
          <li>David Beckham Football Academy</li>
          <li>Suchary Suchy Las</li>
          <li>Orkan Objezierze</li>
          <li>Olympique Poznań</li>
        </ul>
      </section>

      <!-- Experience Joueur -->
      <section class="section-block">
        <h2>{$_('coaches.stephane.experience.player.title')}</h2>
        <ul class="compact-list">
          <li>CA Vitry</li>
          <li>Montrouge FC</li>
          <li>Tours FC</li>
          <li>JA Bréal</li>
          <li>GKS Dopiewo</li>
          <li>Warta Międzychód</li>
          <li>Sokół Rakoniewice</li>
          <li>Polonia Poznań</li>
          <li>Olympique Poznań Les Bleus</li>
        </ul>
      </section>

      <!-- Idol -->
      <div class="quote-box">
        <h3>{$_('coaches.stephane.idol.title')}</h3>
        <p>{$_('coaches.stephane.idol.text')}</p>
      </div>

      <!-- Passion -->
      <div class="highlight-box passion">
        <h3>{$_('coaches.stephane.passion.title')}</h3>
        <p>{$_('coaches.stephane.passion.text')}</p>
      </div>

      <!-- Questions & Answers -->
      <section class="qa-section">
        <h2>{$_('coaches.stephane.questions.title')}</h2>
        
        <div class="question">
          <strong>➡️ {$_('coaches.stephane.questions.q1.question')}</strong>
          <p>{$_('coaches.stephane.questions.q1.answer')}</p>
        </div>

        <div class="question">
          <strong>➡️ {$_('coaches.stephane.questions.q2.question')}</strong>
          <p>{$_('coaches.stephane.questions.q2.answer')}</p>
        </div>

        <div class="question">
          <strong>➡️ {$_('coaches.stephane.questions.q3.question')}</strong>
          <p>{$_('coaches.stephane.questions.q3.answer')}</p>
        </div>
      </section>

      <!-- Back Link -->
      <div class="back-link">
        <a href="/club/coaches" class="btn-back">
          <ArrowLeft size={20} />
          {$_('coaches.backToCoaches')}
        </a>
      </div>

    </div>
  </main>
</div>

<Footer {data} />

<style>
  .coach-page {
    min-height: 100vh;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  /* Breadcrumb */
  .breadcrumb {
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .breadcrumb a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #1a4d7a;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .breadcrumb a:hover {
    color: #d4af37;
    gap: 0.75rem;
  }

  /* Hero Section */
  .hero-coach {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    padding: 4rem 2rem;
    margin-bottom: 4rem;
  }

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 3rem;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }

  .coach-hero-photo {
    width: 280px;
    height: 350px;
    border-radius: 16px;
    object-fit: cover;
    object-position: center 20%;
    border: 5px solid white;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  .hero-info {
    flex: 1;
    min-width: 300px;
    color: white;
  }

  .hero-info h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    margin-bottom: 1rem;
    color: white;
  }

  .coach-tagline {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.3rem;
    font-style: italic;
    opacity: 0.95;
  }

  /* Main Content */
  .main-content {
    padding: 0 2rem 4rem;
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
  }

  /* Highlight Box */
  .highlight-box {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    margin-bottom: 3rem;
  }

  .highlight-box.passion {
    background: linear-gradient(135deg, #d4af37 0%, #c9a02d 100%);
  }

  .highlight-box .since {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .highlight-box .motto {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.1rem;
  }

  .highlight-box h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .highlight-box p {
    line-height: 1.8;
  }

  /* Section Block */
  .section-block {
    margin-bottom: 3rem;
  }

  .section-block h2 {
    color: #1a4d7a;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    border-left: 5px solid #d4af37;
    padding-left: 1.5rem;
  }

  .styled-list {
    list-style: none;
    padding: 0;
  }

  .styled-list li {
    padding: 0.75rem 0;
    padding-left: 2rem;
    position: relative;
    font-size: 1.05rem;
    line-height: 1.6;
  }

  .styled-list li::before {
    content: '⚽';
    position: absolute;
    left: 0;
    color: #1a4d7a;
  }

  .compact-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    list-style: none;
    padding: 0;
  }

  .compact-list li {
    background: #f8fafc;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border-left: 3px solid #1a4d7a;
    transition: all 0.3s ease;
  }

  .compact-list li:hover {
    background: #e2e8f0;
    transform: translateX(5px);
  }

  /* Quote Box */
  .quote-box {
    background: #f1f5f9;
    border-left: 5px solid #1a4d7a;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 3rem;
  }

  .quote-box h3 {
    color: #1a4d7a;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .quote-box p {
    line-height: 1.8;
    font-size: 1.05rem;
    color: #475569;
  }

  /* Q&A Section */
  .qa-section {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }

  .qa-section h2 {
    color: #1a4d7a;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 3rem;
  }

  .question {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
  }

  .question:hover {
    transform: translateY(-4px);
  }

  .question strong {
    color: #1a4d7a;
    display: block;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  .question p {
    line-height: 1.8;
    color: #475569;
    font-size: 1.05rem;
  }

  /* Back Link */
  .back-link {
    text-align: center;
    margin-top: 4rem;
  }

  .btn-back {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    text-decoration: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(26, 77, 122, 0.3);
  }

  .btn-back:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(26, 77, 122, 0.4);
    gap: 1rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-content {
      flex-direction: column;
      text-align: center;
    }

    .coach-hero-photo {
      width: 220px;
      height: 280px;
    }

    .compact-list {
      grid-template-columns: 1fr;
    }

    .section-block h2 {
      font-size: 1.5rem;
    }
  }
</style>