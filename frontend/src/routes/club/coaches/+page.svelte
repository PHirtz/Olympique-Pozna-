<svelte:head>
  <title>{$_('coaches.title')}</title>
  <meta name="description" content={$_('coaches.metaDescription')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation from '$lib/components/ui/Navigation.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { HeartHandshake, ChevronLeft, ChevronRight, Award, Heart, Target } from 'lucide-svelte';
  import { onMount } from 'svelte';
  
  export let data;

  let currentSlide = 0;
  const slides = [
    '../slides/tener0.jpg',
    '../slides/tener.jpg',
    '../slides/tener1.jpg',
    '../slides/tener2.jpg',
    '../slides/tener3.jpg',
    '../slides/tener4.jpg',
    '../slides/tener5.jpg',
    '../slides/tener6.jpg',
    '../slides/tener7.jpg',
    '../slides/tener8.jpg',
    '../slides/tener9.jpg',
    '../slides/tener10.jpg',
    '../slides/tener11.jpg',
    '../slides/tener12.jpg',
    '../slides/tener13.jpg',
    '../slides/tener14.jpg',
    '../slides/tener15.jpg'
   ];

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  }

  onMount(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  });
</script>

<Navigation {data} />

<div class="coaches-page">
  <!-- Hero Section -->
  <section class="hero-coaches">
    <div class="hero-content">
      <h1>{$_('coaches.hero.title')}</h1>
      <p class="hero-subtitle">{$_('coaches.hero.subtitle')}</p>
    </div>
  </section>

  <!-- Slider Section -->
  <section class="slider-section">
    <div class="slider-container">
      <button class="nav-arrow prev" on:click={prevSlide} aria-label="Image précédente">
        <ChevronLeft size={32} />
      </button>
      
      <div class="slider">
        {#each slides as slide, index}
          <div class="slide" class:active={index === currentSlide}>
            <img src={slide} alt={`Coach ${index + 1}`} />
          </div>
        {/each}
      </div>

      <button class="nav-arrow next" on:click={nextSlide} aria-label="Image suivante">
        <ChevronRight size={32} />
      </button>

      <div class="slider-dots">
        {#each slides as _, index}
          <button 
            class="dot" 
            class:active={index === currentSlide}
            on:click={() => currentSlide = index}
            aria-label={`Aller à l'image ${index + 1}`}
          ></button>
        {/each}
      </div>
    </div>
  </section>

  <main class="main-content">
    <!-- Coach 1: Stéphane Wutezi -->
    <section class="coach-section">
      <div class="container">
        <article class="coach-card">
          <div class="coach-header">
            <img src="/trener/stephane-trener.jpg" alt="Stéphane Wutezi" class="coach-photo" />
            <div class="coach-intro">
              <h2>{$_('coaches.stephane.name')}</h2>
              <p class="coach-tagline">
                <Award size={20} />
                {$_('coaches.stephane.tagline')}
              </p>
            </div>
          </div>

          <div class="coach-content">
            <div class="highlight-box">
              <p>⚽ {$_('coaches.stephane.since')}</p>
              <p class="motto">
                <Heart size={18} />
                <strong>{$_('coaches.stephane.motto')}</strong>
              </p>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.stephane.formations.title')}</h3>
              <ul>
                <li>{$_('coaches.stephane.formations.uefa_c')}</li>
                <li>{$_('coaches.stephane.formations.uefa_b')}</li>
                <li>{$_('coaches.stephane.formations.stages')}</li>
                <li>{$_('coaches.stephane.formations.conferences')}</li>
              </ul>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.stephane.experience.coach.title')}</h3>
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
            </div>

            <div class="section-block">
              <h3>{$_('coaches.stephane.experience.player.title')}</h3>
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
            </div>

            <div class="quote-box">
              <h4>{$_('coaches.stephane.idol.title')}</h4>
              <p>{$_('coaches.stephane.idol.text')}</p>
            </div>

            <div class="highlight-box passion">
              <h4>{$_('coaches.stephane.passion.title')}</h4>
              <p>{$_('coaches.stephane.passion.text')}</p>
            </div>

            <div class="qa-section">
              <h4>{$_('coaches.stephane.questions.title')}</h4>
              
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
            </div>
          </div>
        </article>

        <!-- Coach 2: Patryk Kamionka -->
        <article class="coach-card">
          <div class="coach-header">
            <img src="/trener/patrikk-trener.jpg" alt="Patryk Kamionka" class="coach-photo" />
            <div class="coach-intro">
              <h2>{$_('coaches.patryk_k.name')}</h2>
              <p class="coach-tagline">
                <Target size={20} />
                {$_('coaches.patryk_k.tagline')}
              </p>
            </div>
          </div>

          <div class="coach-content">
            <div class="highlight-box">
              <p>⚽ {$_('coaches.patryk_k.since')}</p>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.patryk_k.formations.title')}</h3>
              <ul>
                <li>{$_('coaches.patryk_k.formations.wopr')}</li>
                <li>{$_('coaches.patryk_k.formations.teacher')}</li>
                <li>{$_('coaches.patryk_k.formations.kinesiology')}</li>
                <li>{$_('coaches.patryk_k.formations.goalkeeper')}</li>
                <li>{$_('coaches.patryk_k.formations.uefa')}</li>
              </ul>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.patryk_k.experience.player.title')}</h3>
              <ul class="compact-list">
                <li>Polonia Poznań</li>
                <li>TPS Winogrady</li>
                <li>Przemysław Poznań</li>
                <li>Złoci Złotkowo</li>
                <li>Antares Zalasewo</li>
                <li>Phytopharm Klęka</li>
                <li>FC Polonia Paris</li>
              </ul>
            </div>

            <div class="quote-box">
              <h4>{$_('coaches.patryk_k.idol.title')}</h4>
              <p>{$_('coaches.patryk_k.idol.text')}</p>
            </div>

            <div class="qa-section">
              <h4>{$_('coaches.patryk_k.questions.title')}</h4>
              
              <div class="question">
                <strong>➡️ {$_('coaches.patryk_k.questions.q1.question')}</strong>
                <p>{$_('coaches.patryk_k.questions.q1.answer')}</p>
              </div>

              <div class="question">
                <strong>➡️ {$_('coaches.patryk_k.questions.q2.question')}</strong>
                <p>{$_('coaches.patryk_k.questions.q2.answer')}</p>
              </div>

              <div class="question">
                <strong>➡️ {$_('coaches.patryk_k.questions.q3.question')}</strong>
                <p>{$_('coaches.patryk_k.questions.q3.answer')}</p>
              </div>
            </div>
          </div>
        </article>

        <!-- Coach 3: Patryk Wesołowski -->
        <article class="coach-card">
          <div class="coach-header">
            <img src="/trener/patrikw-trener.jpg" alt="Patryk Wesołowski" class="coach-photo" />
            <div class="coach-intro">
              <h2>{$_('coaches.patryk_w.name')}</h2>
              <p class="coach-tagline">
                <Target size={20} />
                {$_('coaches.patryk_w.tagline')}
              </p>
            </div>
          </div>

          <div class="coach-content">
            <div class="highlight-box">
              <p>⚽ {$_('coaches.patryk_w.since')}</p>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.patryk_w.formations.title')}</h3>
              <ul>
                <li>{$_('coaches.patryk_w.formations.animator')}</li>
                <li>{$_('coaches.patryk_w.formations.camp')}</li>
                <li>{$_('coaches.patryk_w.formations.reissa')}</li>
                <li>{$_('coaches.patryk_w.formations.conferences')}</li>
              </ul>
            </div>

            <div class="quote-box">
              <h4>{$_('coaches.patryk_w.idol.title')}</h4>
              <p>{$_('coaches.patryk_w.idol.text')}</p>
            </div>

            <div class="qa-section">
              <h4>{$_('coaches.patryk_w.questions.title')}</h4>
              
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
            </div>
          </div>
        </article>

        <!-- Coach 4: Dominika Kłosowska -->
        <article class="coach-card highlight">
          <div class="coach-header">
            <img src="../trener/dominika-trener.jpg" alt="Dominika Kłosowska" class="coach-photo" />
            <div class="coach-intro">
              <h2>{$_('coaches.dominika.name')}</h2>
              <p class="coach-tagline">
                <Heart size={20} />
                {$_('coaches.dominika.tagline')}
              </p>
            </div>
          </div>

          <div class="coach-content">
            <div class="highlight-box">
              <p>⚽ {$_('coaches.dominika.since')}</p>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.dominika.formations.title')}</h3>
              <ul>
                <li>{$_('coaches.dominika.formations.assistant')}</li>
                <li>{$_('coaches.dominika.formations.animator')}</li>
                <li>{$_('coaches.dominika.formations.women')}</li>
                <li>{$_('coaches.dominika.formations.intro_uefa')}</li>
                <li>{$_('coaches.dominika.formations.uefa_progress')}</li>
              </ul>
            </div>

            <div class="quote-box">
              <h4>{$_('coaches.dominika.mottos.title')}</h4>
              <ul>
                <li>{$_('coaches.dominika.mottos.motto1')}</li>
                <li>{$_('coaches.dominika.mottos.motto2')}</li>
                <li>{$_('coaches.dominika.mottos.motto3')}</li>
              </ul>
            </div>

            <div class="highlight-box passion">
              <h4>{$_('coaches.dominika.idol.title')}</h4>
              <p>{$_('coaches.dominika.idol.text')}</p>
            </div>

            <div class="qa-section">
              <h4>{$_('coaches.dominika.questions.title')}</h4>
              
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
            </div>
          </div>
        </article>

<!-- Après l'article de Dominika, avant la fermeture de </div> container -->

        <!-- Coach 5: Jakub Golański -->
        <article class="coach-card">
          <div class="coach-header">
            <img src="/trener/jakub-trener.jpg" alt="Jakub Golański" class="coach-photo" />
            <div class="coach-intro">
              <h2>{$_('coaches.jakub.name')}</h2>
              <p class="coach-tagline">
                <Award size={20} />
                {$_('coaches.jakub.tagline')}
              </p>
            </div>
          </div>

          <div class="coach-content">
            <div class="highlight-box">
              <p>⚽ {$_('coaches.jakub.since')}</p>
              <p class="motto">
                <Heart size={18} />
                <strong>{$_('coaches.jakub.motto')}</strong>
              </p>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.jakub.formations.title')}</h3>
              <ul>
                <li>{$_('coaches.jakub.formations.uefa_a')}</li>
                <li>{$_('coaches.jakub.formations.motor_coach')}</li>
                <li>{$_('coaches.jakub.formations.teacher')}</li>
                <li>{$_('coaches.jakub.formations.bachelor')}</li>
                <li>{$_('coaches.jakub.formations.master')}</li>
                <li>{$_('coaches.jakub.formations.warta')}</li>
                <li>{$_('coaches.jakub.formations.ajax')}</li>
                <li>{$_('coaches.jakub.formations.coerver')}</li>
                <li>{$_('coaches.jakub.formations.first_aid')}</li>
                <li>{$_('coaches.jakub.formations.corrective')}</li>
              </ul>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.jakub.experience.coach.title')}</h3>
              <ul class="compact-list">
                <li>Złoci Złotkowo</li>
                <li>TMS Suchary Suchy Las</li>
                <li>FC Poznaniak Poznań</li>
                <li>Poznańska 13</li>
                <li>TPS Winogrady</li>
                <li>UAM Poznań</li>
                <li>Sparks Poznań</li>
                <li>Olympique Poznań</li>
              </ul>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.jakub.experience.player.title')}</h3>
              <ul class="compact-list">
                <li>TPS Winogrady</li>
                <li>TMS Suchary Suchy Las</li>
                <li>Złoci Złotkowo</li>
              </ul>
            </div>

            <div class="quote-box">
              <h4>{$_('coaches.jakub.idol.title')}</h4>
              <p>{$_('coaches.jakub.idol.text')}</p>
            </div>

            <div class="highlight-box passion">
              <h4>{$_('coaches.jakub.passion.title')}</h4>
              <p>{$_('coaches.jakub.passion.text')}</p>
            </div>

            <div class="section-block">
              <h4>{$_('coaches.jakub.favorite_club.title')}</h4>
              <p>{$_('coaches.jakub.favorite_club.text')}</p>
            </div>

            <div class="qa-section">
              <h4>{$_('coaches.jakub.questions.title')}</h4>
              
              <div class="question">
                <strong>➡️ {$_('coaches.jakub.questions.q1.question')}</strong>
                <p>{$_('coaches.jakub.questions.q1.answer')}</p>
              </div>

              <div class="question">
                <strong>➡️ {$_('coaches.jakub.questions.q2.question')}</strong>
                <p>{$_('coaches.jakub.questions.q2.answer')}</p>
              </div>

              <div class="question">
                <strong>➡️ {$_('coaches.jakub.questions.q3.question')}</strong>
                <p>{$_('coaches.jakub.questions.q3.answer')}</p>
              </div>
            </div>
          </div>
        </article>

        <!-- Coach 6: Paweł Kulesa -->
        <article class="coach-card">
          <div class="coach-header">
            <img src="/trener/pawel-trener.jpg" alt="Paweł Kulesa" class="coach-photo" />
            <div class="coach-intro">
              <h2>{$_('coaches.pawel.name')}</h2>
              <p class="coach-tagline">
                <Award size={20} />
                {$_('coaches.pawel.tagline')}
              </p>
            </div>
          </div>

          <div class="coach-content">
            <div class="highlight-box">
              <p>⚽ {$_('coaches.pawel.since')}</p>
              <p class="motto">
                <Heart size={18} />
                <strong>{$_('coaches.pawel.motto')}</strong>
              </p>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.pawel.formations.title')}</h3>
              <ul>
                <li>{$_('coaches.pawel.formations.uefa')}</li>
                <li>{$_('coaches.pawel.formations.conferences')}</li>
              </ul>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.pawel.experience.coach.title')}</h3>
              <ul class="compact-list">
                <li>Akademia Piłkarska Reissa</li>
                <li>Koziołek Poznań</li>
                <li>MKS Przemysław Poznań</li>
                <li>GKS Dopiewo</li>
                <li>Korona Zakrzewo</li>
                <li>UKS Orlik Mosina</li>
                <li>Olympique Poznań</li>
              </ul>
            </div>

            <div class="section-block">
              <h3>{$_('coaches.pawel.experience.player.title')}</h3>
              <ul class="compact-list">
                <li>MKS Czarni Połaniec (3 liga)</li>
                <li>Akademia Piłkarska Reissa</li>
                <li>Olympique Les Bleus</li>
              </ul>
            </div>

            <div class="quote-box">
              <h4>{$_('coaches.pawel.idol.title')}</h4>
              <p>{$_('coaches.pawel.idol.text')}</p>
            </div>

            <div class="highlight-box passion">
              <h4>{$_('coaches.pawel.passion.title')}</h4>
              <p>{$_('coaches.pawel.passion.text')}</p>
            </div>

            <div class="section-block">
              <h4>{$_('coaches.pawel.favorite_club.title')}</h4>
              <p>{$_('coaches.pawel.favorite_club.text')}</p>
            </div>

            <div class="qa-section">
              <h4>{$_('coaches.pawel.questions.title')}</h4>
              
              <div class="question">
                <strong>➡️ {$_('coaches.pawel.questions.q1.question')}</strong>
                <p>{$_('coaches.pawel.questions.q1.answer')}</p>
              </div>

              <div class="question">
                <strong>➡️ {$_('coaches.pawel.questions.q2.question')}</strong>
                <p>{$_('coaches.pawel.questions.q2.answer')}</p>
              </div>

              <div class="question">
                <strong>➡️ {$_('coaches.pawel.questions.q3.question')}</strong>
                <p>{$_('coaches.pawel.questions.q3.answer')}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  </main>
</div>

<Footer {data} />

<style>
  .coaches-page {
    min-height: 100vh;
    background: #ffffff;
  }

  /* Hero Section */
  .hero-coaches {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    padding: 8rem 2rem 4rem;
    text-align: center;
  }

  .hero-content h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .hero-subtitle {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    opacity: 0.95;
    font-weight: 300;
  }

  /* Slider Section */
  .slider-section {
    padding: 4rem 0;
    background: linear-gradient(to bottom, #f8fafc, #ffffff);
  }

  .slider-container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 4rem;
  }

  .slider {
    position: relative;
    width: 100%;
    height: 600px;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }

  .slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 0.8s ease-in-out;
  }

  .slide.active {
    opacity: 1;
  }

  .slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  .nav-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .nav-arrow:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  .nav-arrow.prev {
    left: 0;
  }

  .nav-arrow.next {
    right: 0;
  }

  .slider-dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #cbd5e1;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .dot.active {
    background: #1a4d7a;
    transform: scale(1.3);
  }

  /* Main Content */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .coach-card {
    background: white;
    border-radius: 20px;
    padding: 3rem;
    margin-bottom: 4rem;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    transition: transform 0.3s ease;
  }

  .coach-card:hover {
    transform: translateY(-5px);
  }

  .coach-card.highlight {
    border: 3px solid #d4af37;
  }

  .coach-header {
    display: flex;
    gap: 2rem;
    align-items: center;
    margin-bottom: 2rem;
    flex-wrap: wrap;
  }
  .coach-photo {
    width: 300px;
    height: 380px;
    border-radius: 10%;
    object-fit: cover;
    object-position: 10%; 
    border: 5px solid #1a4d7a;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
  .coach-intro h2 {
    font-size: 2rem;
    color: #1a4d7a;
    margin-bottom: 0.5rem;
  }

  .coach-tagline {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    color: #64748b;
    font-style: italic;
  }

  .highlight-box {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
  }

  .highlight-box.passion {
    background: linear-gradient(135deg, #d4af37 0%, #c9a02d 100%);
  }

  .motto {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .section-block {
    margin-bottom: 2rem;
  }

  .section-block h3 {
    color: #1a4d7a;
    font-size: 1.4rem;
    margin-bottom: 1rem;
    border-left: 4px solid #d4af37;
    padding-left: 1rem;
  }

  .section-block ul {
    list-style: none;
    padding-left: 0;
  }

  .section-block ul li {
    padding: 0.5rem 0;
    padding-left: 1.5rem;
    position: relative;
  }

  .section-block ul li::before {
    color: #1a4d7a;
    position: absolute;
    left: 0;
  }

  .compact-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.5rem;
  }

  .quote-box {
    background: #f1f5f9;
    border-left: 4px solid #1a4d7a;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .quote-box h4 {
    color: #1a4d7a;
    margin-bottom: 1rem;
  }

  .qa-section {
    margin-top: 3rem;
  }

  .qa-section h4 {
    color: #1a4d7a;
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  .question {
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 1.5rem;
  }

  .question strong {
    color: #1a4d7a;
    display: block;
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }

  .question p {
    line-height: 1.8;
    color: #475569;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .slider {
      height: 400px;
    }

    .slider-container {
      padding: 0 2rem;
    }

    .nav-arrow {
      width: 40px;
      height: 40px;
    }

    .coach-header {
      flex-direction: column;
      text-align: center;
    }

    .compact-list {
      grid-template-columns: 1fr;
    }
  }
</style>