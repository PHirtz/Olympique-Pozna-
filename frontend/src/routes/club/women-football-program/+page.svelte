<svelte:head>
  <title>{$_('womenFootballProgram.title')}</title>
  <meta name="description" content={$_('womenFootballProgram.metaDescription')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import HeroSlider from '$lib/components/HeroSlider.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { CheckCircle, Calendar, MapPin, Users, Heart, Phone } from 'lucide-svelte';

  let { data } = $props();

  const heroSlides = [
    '/slides/bowling-femmes.jpeg',
    '/slides/coaching-dames.JPG',
    '/slides/equipestephane.jpeg',
    '/slides/footensalle.jpeg',
    '/slides/footensalle2.jpeg',
    '/slides/footensalle3.JPG',
    '/slides/groupe-les-dames.jpg',
    '/slides/les-dames.jpeg',
    '/slides/maillot-femmes.jpg',
    '/slides/match-women.jpg',
    '/slides/olympiquewomen.png'
  ];

  const benefitKeys = ['item1', 'item2', 'item3', 'item4', 'item5'];
  const locationKeys = ['location1', 'location2', 'location3'];
  const audienceKeys = ['item1', 'item2', 'item3', 'item4'];

  const phoneNumber = '+48 886 277 854';
</script>

<Navigation2 {data} />

<HeroSlider
  images={heroSlides}
  title={$_('club.womenFootballProgram.hero.title')}
  subtitle={$_('club.womenFootballProgram.hero.subtitle')}
/>

<div class="women-football-page">

  <!-- INTRO + CHIFFRES CLÉS -->
  <section class="intro-section">
    <div class="container">
      <div class="intro-grid">
        <div class="intro-text">
          <p>{$_('club.womenFootballProgram.intro.text1')}</p>
          <p>{$_('club.womenFootballProgram.intro.text2')}</p>
        </div>

        <div class="intro-visual">
          <div class="stat-card gold">
            <span class="stat-number">100%</span>
            <span class="stat-label">{$_('club.womenFootballProgram.stats.free')}</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">5</span>
            <span class="stat-label">{$_('club.womenFootballProgram.stats.daysPerWeek')}</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">3</span>
            <span class="stat-label">{$_('club.womenFootballProgram.stats.locations')}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CE QUE NOUS PROPOSONS -->
  <section class="benefits-section">
    <div class="container">
      <div class="section-header">
        <Heart size={32} />
        <h2>{$_('club.womenFootballProgram.benefits.title')}</h2>
      </div>

      <div class="benefits-grid">
        {#each benefitKeys as key (key)}
          <div class="benefit-card">
            <CheckCircle size={22} class="benefit-icon" />
            <p>{$_(`club.womenFootballProgram.benefits.${key}`)}</p>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- HORAIRES -->
  <section class="schedule-section">
    <div class="container">
      <div class="schedule-grid">
        <div class="schedule-block">
          <div class="schedule-label">
            <Calendar size={20} />
            <span>{$_('club.womenFootballProgram.schedule.daysLabel')}</span>
          </div>
          <p class="schedule-value">{$_('club.womenFootballProgram.schedule.days')}</p>
        </div>

        <div class="schedule-block">
          <div class="schedule-label">
            <MapPin size={20} />
            <span>{$_('club.womenFootballProgram.schedule.locationsLabel')}</span>
          </div>
          <div class="location-chips">
            {#each locationKeys as key (key)}
              <span class="chip">{$_(`club.womenFootballProgram.schedule.${key}`)}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- POUR QUI ? -->
  <section class="audience-section">
    <div class="container">
      <div class="section-header">
        <Users size={32} />
        <h2>{$_('club.womenFootballProgram.audience.title')}</h2>
      </div>
      <p class="audience-intro">{$_('club.womenFootballProgram.audience.intro')}</p>
      <ul class="audience-list">
        {#each audienceKeys as key (key)}
          <li>{$_(`club.womenFootballProgram.audience.${key}`)}</li>
        {/each}
      </ul>
    </div>
  </section>

  <!-- FINANCEMENT -->
  <section class="funding-section">
    <div class="container">
      <h3>{$_('club.womenFootballProgram.funding.title')}</h3>
      <p>{$_('club.womenFootballProgram.funding.text')}</p>
    </div>
  </section>

  <!-- CTA / CONTACT -->
  <section class="cta-section">
    <div class="container cta-container">
      <h2>{$_('club.womenFootballProgram.cta.text')}</h2>
      <p class="cta-contact-label">{$_('club.womenFootballProgram.contact.title')}</p>
      <a href={`tel:${phoneNumber.replace(/\s/g, '')}`} class="cta-button">
        <Phone size={20} />
        {phoneNumber}
      </a>
    </div>
  </section>

</div>

<Footer {data} />

<style>
  .women-football-page {
    min-height: 100vh;
    background: #ffffff;
  }

  .container { max-width: 1100px; margin: 0 auto; padding: 0 1.25rem; }

  @media (min-width: 700px) { .container { padding: 0 1.75rem; } }
  @media (min-width: 900px) { .container { padding: 0 2rem; } }

  /* ── INTRO ── */
  .intro-section { padding: 3rem 0; }

  @media (min-width: 700px) { .intro-section { padding: 4rem 0; } }
  @media (min-width: 900px) { .intro-section { padding: 5rem 0; } }

  .intro-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: start;
  }

  @media (min-width: 900px) {
    .intro-grid { grid-template-columns: 3fr 2fr; gap: 3rem; }
  }

  .intro-text p {
    color: #444;
    line-height: 1.75;
    margin-bottom: 1.1rem;
    font-size: 1rem;
  }

  @media (min-width: 700px) {
    .intro-text p { line-height: 1.85; font-size: 1.05rem; }
  }

  .intro-visual {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .stat-card {
    background: #f0f5fb;
    border-left: 4px solid #1a4d7a;
    padding: 1.25rem 1.5rem;
    border-radius: 0 12px 12px 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-card.gold {
    background: #fdf8ee;
    border-left-color: #c9a961;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 800;
    color: #1a4d7a;
    line-height: 1;
  }

  @media (min-width: 700px) { .stat-number { font-size: 2.25rem; } }
  @media (min-width: 900px) { .stat-number { font-size: 2.5rem; } }

  .stat-card.gold .stat-number { color: #c9a961; }

  .stat-label {
    font-size: 0.85rem;
    color: #666;
    font-weight: 500;
  }

  @media (min-width: 700px) { .stat-label { font-size: 0.9rem; } }

  /* ── SECTION HEADER (réutilisé) ── */
  .section-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.5rem;
  }

  @media (min-width: 700px) { .section-header { gap: 0.75rem; margin-bottom: 2rem; } }

  .section-header :global(svg) { color: #c9a961; flex-shrink: 0; }

  .section-header h2 {
    font-size: 1.4rem;
    color: #1a4d7a;
    font-weight: 700;
    margin: 0;
  }

  @media (min-width: 700px) { .section-header h2 { font-size: 1.6rem; } }
  @media (min-width: 900px) { .section-header h2 { font-size: 1.8rem; } }

  /* ── BENEFITS ── */
  .benefits-section { padding: 0.5rem 0 3rem; }

  @media (min-width: 700px) { .benefits-section { padding: 0.75rem 0 4rem; } }
  @media (min-width: 900px) { .benefits-section { padding: 1rem 0 5rem; } }

  .benefits-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (min-width: 700px) { .benefits-grid { grid-template-columns: 1fr 1fr; gap: 1.25rem; } }

  .benefit-card {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
    background: #f8fafc;
    border-radius: 14px;
    padding: 1.1rem 1.25rem;
  }

  @media (min-width: 700px) { .benefit-card { gap: 1rem; padding: 1.25rem 1.5rem; } }

  .benefit-card :global(.benefit-icon) { color: #1a4d7a; flex-shrink: 0; margin-top: 0.15rem; }

  .benefit-card p {
    margin: 0;
    color: #333;
    line-height: 1.55;
    font-size: 0.95rem;
  }

  @media (min-width: 700px) { .benefit-card p { line-height: 1.6; font-size: 1rem; } }

  /* ── SCHEDULE ── */
  .schedule-section {
    background: #f0f5fb;
    padding: 2.5rem 0;
  }

  @media (min-width: 700px) { .schedule-section { padding: 3rem 0; } }
  @media (min-width: 900px) { .schedule-section { padding: 4rem 0; } }

  .schedule-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.75rem;
  }

  @media (min-width: 700px) { .schedule-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem; } }

  .schedule-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 700;
    color: #1a4d7a;
    margin-bottom: 0.6rem;
  }

  @media (min-width: 700px) { .schedule-label { gap: 0.6rem; margin-bottom: 0.75rem; } }

  .schedule-label :global(svg) { color: #c9a961; }

  .schedule-value {
    color: #333;
    font-size: 1rem;
    margin: 0;
  }

  @media (min-width: 700px) { .schedule-value { font-size: 1.1rem; } }

  .location-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .chip {
    background: white;
    border: 2px solid #1a4d7a;
    color: #1a4d7a;
    padding: 0.35rem 0.9rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 0.9rem;
  }

  @media (min-width: 700px) { .chip { padding: 0.4rem 1rem; font-size: 0.95rem; } }

  /* ── AUDIENCE ── */
  .audience-section { padding: 3rem 0; }

  @media (min-width: 700px) { .audience-section { padding: 4rem 0; } }
  @media (min-width: 900px) { .audience-section { padding: 5rem 0; } }

  .audience-intro {
    color: #444;
    font-size: 1rem;
    margin-bottom: 1.1rem;
  }

  @media (min-width: 700px) { .audience-intro { font-size: 1.05rem; margin-bottom: 1.25rem; } }

  .audience-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
  }

  @media (min-width: 700px) { .audience-list { gap: 0.85rem; } }

  .audience-list li {
    position: relative;
    padding-left: 1.6rem;
    color: #333;
    line-height: 1.55;
    font-size: 0.95rem;
  }

  @media (min-width: 700px) { .audience-list li { padding-left: 1.75rem; line-height: 1.6; font-size: 1.02rem; } }

  .audience-list li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.5rem;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #c9a961;
  }

  /* ── FUNDING ── */
  .funding-section {
    border-top: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    padding: 2rem 0;
    text-align: center;
  }

  @media (min-width: 700px) { .funding-section { padding: 2.5rem 0; } }
  @media (min-width: 900px) { .funding-section { padding: 3rem 0; } }

  .funding-section h3 {
    color: #1a4d7a;
    font-size: 1.15rem;
    margin-bottom: 0.6rem;
  }

  @media (min-width: 700px) { .funding-section h3 { font-size: 1.3rem; margin-bottom: 0.75rem; } }

  .funding-section p {
    color: #555;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  @media (min-width: 700px) { .funding-section p { line-height: 1.7; font-size: 1rem; } }

  /* ── CTA ── */
  .cta-section {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    padding: 3rem 0;
  }

  @media (min-width: 700px) { .cta-section { padding: 4rem 0; } }
  @media (min-width: 900px) { .cta-section { padding: 5rem 0; } }

  .cta-container {
    text-align: center;
    color: white;
  }

  .cta-container h2 {
    font-size: 1.4rem;
    color: white;
    max-width: 700px;
    margin: 0 auto 1.25rem;
    line-height: 1.4;
  }

  @media (min-width: 700px) { .cta-container h2 { font-size: 1.65rem; margin: 0 auto 1.5rem; } }
  @media (min-width: 900px) { .cta-container h2 { font-size: 1.8rem; } }

  .cta-contact-label {
    color: rgba(255,255,255,0.75);
    margin-bottom: 1rem;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  @media (min-width: 700px) { .cta-contact-label { margin-bottom: 1.25rem; font-size: 0.95rem; } }

  .cta-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.9rem 1.5rem;
    background: linear-gradient(135deg, #c9a961 0%, #ddc184 50%, #c9a961 100%);
    color: #0f2d4a;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 700;
    text-decoration: none;
    box-shadow: 0 4px 15px rgba(201, 169, 97, 0.4);
    transition: all 0.3s ease;
  }

  @media (min-width: 600px) {
    .cta-button {
      display: inline-flex;
      gap: 0.75rem;
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
    }
  }

  .cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(201, 169, 97, 0.5);
  }
</style>