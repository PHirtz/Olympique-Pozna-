<svelte:head>
  <title>{$_('coaches.dominika.name')} - {$_('coaches.title')}</title>
  <meta name="description" content={$_('coaches.dominika.tagline')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { Heart, ArrowLeft, Star } from 'lucide-svelte';
  
  export let data;
</script>

<Navigation2 {data} />

<div class="coach-page highlight-page">
  <nav class="breadcrumb">
    <a href="/club/coaches">
      <ArrowLeft size={20} />
      {$_('coaches.backToCoaches')}
    </a>
  </nav>

  <section class="hero-coach">
    <div class="hero-content">
      <img 
        src="/trener/dominika-trener.jpg" 
        alt={$_('coaches.dominika.name')} 
        class="coach-hero-photo"
      />
      <div class="hero-info">
        <h1>{$_('coaches.dominika.name')}</h1>
        <p class="coach-tagline">
          <Heart size={24} />
          {$_('coaches.dominika.tagline')}
        </p>
      </div>
    </div>
  </section>

  <main class="main-content">
    <div class="container">
      
      <div class="highlight-box">
        <p class="since">⚽ {$_('coaches.dominika.since')}</p>
      </div>

      <section class="section-block">
        <h2>{$_('coaches.dominika.formations.title')}</h2>
        <ul class="styled-list">
          <li>{$_('coaches.dominika.formations.assistant')}</li>
          <li>{$_('coaches.dominika.formations.animator')}</li>
          <li>{$_('coaches.dominika.formations.women')}</li>
          <li>{$_('coaches.dominika.formations.intro_uefa')}</li>
          <li>{$_('coaches.dominika.formations.uefa_progress')}</li>
        </ul>
      </section>

      <div class="quote-box">
        <h3>{$_('coaches.dominika.mottos.title')}</h3>
        <ul class="motto-list">
          <li>{$_('coaches.dominika.mottos.motto1')}</li>
          <li>{$_('coaches.dominika.mottos.motto2')}</li>
          <li>{$_('coaches.dominika.mottos.motto3')}</li>
        </ul>
      </div>

      <div class="highlight-box passion">
        <h3>{$_('coaches.dominika.idol.title')}</h3>
        <p>{$_('coaches.dominika.idol.text')}</p>
      </div>

      <section class="qa-section">
        <h2>{$_('coaches.dominika.questions.title')}</h2>
        
        <div class="question">
          <strong>➡️ {$_('coaches.dominika.questions.q1.question')}</strong>
          <p>{$_('coaches.dominika.questions.q1.answer')}</p>
        </div>

        <div class="question">
          <strong>➡️ {$_('coaches.dominika.questions.q2.question')}</strong>
          <p>{$_('coaches.dominika.questions.q2.answer')}</p>
        </div>

        <div class="question">
          <strong>➡️ {$_('coaches.dominika.questions.q3.question')}</strong>
          <p>{$_('coaches.dominika.questions.q3.answer')}</p>
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

  .highlight-page {
    border-top: 5px solid #d4af37;
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
    position: relative;
  }

  .hero-badge {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: linear-gradient(135deg, #d4af37 0%, #c9a02d 100%);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
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
    border: 5px solid #d4af37;
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

  .highlight-box.passion {
    background: linear-gradient(135deg, #d4af37 0%, #c9a02d 100%);
  }

  .highlight-box .since {
    font-size: 1.2rem;
  }

  .highlight-box h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .highlight-box p {
    line-height: 1.8;
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
    border-left: 5px solid #d4af37;
    padding: 2rem;
    border-radius: 12px;
    margin-bottom: 3rem;
  }

  .quote-box h3 {
    color: #1a4d7a;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .motto-list {
    list-style: none;
    padding: 0;
  }

  .motto-list li {
    padding: 0.75rem 0;
    padding-left: 2rem;
    position: relative;
    line-height: 1.8;
    font-size: 1.05rem;
    color: #475569;
  }

  .motto-list li::before {
    content: '✨';
    position: absolute;
    left: 0;
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
    border-left: 4px solid #d4af37;
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
    background: linear-gradient(135deg, #d4af37 0%, #c9a02d 100%);
    color: white;
    text-decoration: none;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  }

  .btn-back:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
    gap: 1rem;
  }

  @media (max-width: 768px) {
    .hero-badge {
      position: static;
      margin: 0 auto 2rem;
      width: fit-content;
    }

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