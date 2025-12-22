<svelte:head>
  <title>{$_('coaches.patryk_w.name')} - {$_('coaches.title')}</title>
  <meta name="description" content={$_('coaches.patryk_w.tagline')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation from '$lib/components/ui/Navigation.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { Target, ArrowLeft } from 'lucide-svelte';
  
  export let data;
</script>

<Navigation {data} />

<div class="coach-page">
  <nav class="breadcrumb">
    <a href="/club/coaches">
      <ArrowLeft size={20} />
      {$_('coaches.backToCoaches')}
    </a>
  </nav>

  <section class="hero-coach">
    <div class="hero-content">
      <img 
        src="/trener/patrikw-trener.jpg" 
        alt={$_('coaches.patryk_w.name')} 
        class="coach-hero-photo"
      />
      <div class="hero-info">
        <h1>{$_('coaches.patryk_w.name')}</h1>
        <p class="coach-tagline">
          <Target size={24} />
          {$_('coaches.patryk_w.tagline')}
        </p>
      </div>
    </div>
  </section>

  <main class="main-content">
    <div class="container">
      
      <div class="highlight-box">
        <p class="since">⚽ {$_('coaches.patryk_w.since')}</p>
      </div>

      <section class="section-block">
        <h2>{$_('coaches.patryk_w.formations.title')}</h2>
        <ul class="styled-list">
          <li>{$_('coaches.patryk_w.formations.animator')}</li>
          <li>{$_('coaches.patryk_w.formations.camp')}</li>
          <li>{$_('coaches.patryk_w.formations.reissa')}</li>
          <li>{$_('coaches.patryk_w.formations.conferences')}</li>
        </ul>
      </section>

      <div class="quote-box">
        <h3>{$_('coaches.patryk_w.idol.title')}</h3>
        <p>{$_('coaches.patryk_w.idol.text')}</p>
      </div>

      <section class="qa-section">
        <h2>{$_('coaches.patryk_w.questions.title')}</h2>
        
        <div class="question">
          <strong>➡️ {$_('coaches.patryk_w.questions.q1.question')}</strong>
          <p>{$_('coaches.patryk_w.questions.q1.answer')}</p>
        </div>

        <div class="question">
          <strong>➡️ {$_('coaches.patryk_w.questions.q2.question')}</strong>
          <p>{$_('coaches.patryk_w.questions.q2.answer')}</p>
        </div>

        <div class="question">
          <strong>➡️ {$_('coaches.patryk_w.questions.q3.question')}</strong>
          <p>{$_('coaches.patryk_w.questions.q3.answer')}</p>
        </div>
      </section>

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

  .main-content {
    padding: 0 2rem 4rem;
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .highlight-box {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    padding: 2rem;
    border-radius: 16px;
    margin-bottom: 3rem;
  }

  .highlight-box .since {
    font-size: 1.2rem;
  }

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

  @media (max-width: 768px) {
    .hero-content {
      flex-direction: column;
      text-align: center;
    }

    .coach-hero-photo {
      width: 220px;
      height: 280px;
    }

    .section-block h2 {
      font-size: 1.5rem;
    }
  }
</style>