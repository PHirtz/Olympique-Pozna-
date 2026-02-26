<script>
  import { _ } from 'svelte-i18n';
  import { goto } from '$app/navigation';
  import Button from './ui/Button.svelte';

  const teams = [
    {
      slug: 'feminine',
      image: '../seniorsf/548748092_685055974624192_8235511687039625110_n.jpg',
      link: '/teams/dames'
    },

    {
      slug: 'junior',
      image: '../juniors/535057118_663522866777503_4651670088385010660_n.jpg',
      link: '/teams/academy'
    },

    {   
      slug: 'senior',
      image: '../seniorsh/565694409_714234655039657_3240198854373276417_n.jpg',
      link: '/teams/bleus'
    }
  ];

  /**
   * Navigue vers la page de l'équipe
   * @param {string} link
   */
  function navigateToTeam(link) {
    goto(link);
  }
</script>

<section class="teams-section">
  <div class="content-teams">
    <h2>{$_('home.teams.title')}</h2>
  </div>
  
  <div class="teams-cards">
    {#each teams as team}
      <a 
        href={team.link} 
        class="team-card"
        aria-label={$_(`home.teams.${team.slug}.name`)}
      >
        <div class="team-image">
          <img 
            src={team.image} 
            alt={$_(`home.teams.${team.slug}.name`)}
            loading="lazy"
          />
        </div>
        <div class="team-content">
          <h3>{$_(`home.teams.${team.slug}.name`)}</h3>
        </div>
      </a>
    {/each}
  </div>
</section>

<section class="accompagnement">
  <div class="accompagnement-container">
    <div class="content-accompagnement">
      <h2>{$_('home.accompagnement.title')}</h2>
      <p>{$_('home.accompagnement.paragraph1')}</p>
      <p>{$_('home.accompagnement.paragraph2')}</p>

      <p class="performance-highlight">
        {$_('home.accompagnement.highlight')}
      </p>
    </div>
    <div class="accompagnement-image">
      <img 
        src="../img-communes/famille.jpg" 
        alt="Coach et enfant sur le terrain" 
        loading="lazy" 
      />
    </div>
  </div>
</section>

<section class="performance">
  <div class="performance-container">
    <div class="performance-image">
      <img 
        src="../img-communes/570370526_720083157788140_3459994557698679766_n.jpg" 
        alt="Équipe avec médailles" 
        loading="lazy" 
      />
    </div>
    <div class="content-performance">
      <h2>{$_('home.performance.title')}</h2>
      <p>{$_('home.performance.paragraph1')}</p>
      <p>{$_('home.performance.paragraph2')}</p>
      <p class="performance-highlight">
        {$_('home.performance.highlight')}
      </p>
    </div>
  </div>
</section>

<style>
  /* Section Teams */
  .teams-section {
    padding: 4rem 2rem;
    background: var(--bg-secondary, #f5f5f5);
  }

  .content-teams {
    text-align: center;
    margin-bottom: 3rem;
  }

  .content-teams h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: var(--primary-color);
  }

  .teams-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }

  .team-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-decoration: none;
    color: inherit;
    display: block;
    cursor: pointer;
  }

  .team-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  .team-image {
    width: 100%;
    height: 250px;
    overflow: hidden;
    background: var(--primary-color);
    position: relative;
  }

  .team-image::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(26, 77, 122, 0);
    transition: background 0.3s ease;
  }

  .team-card:hover .team-image::after {
    background: rgba(26, 77, 122, 0.1);
  }

  .team-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .team-card:hover .team-image img {
    transform: scale(1.05);
  }

  .team-content {
    padding: 1.5rem;
  }

  .team-content h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--primary-color);
    transition: color 0.3s ease;
  }

  .team-card:hover .team-content h3 {
    color: #c9a961;
  }

  /* Section Accompagnement */
  .accompagnement {
    padding: 5rem 2rem;
    background: white;
  }

  .accompagnement-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .content-accompagnement h2 {
    font-size: 2.25rem;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
  }

  .content-accompagnement p {
    font-size: 1.0625rem;
    line-height: 1.8;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .accompagnement-image img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  /* Section Performance */
  .performance {
    padding: 5rem 2rem;
    background: var(--bg-secondary, #f5f5f5);
  }

  .performance-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
  }

  .content-performance h2 {
    font-size: 2.25rem;
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    font-weight: bold;
  }

  .content-performance p {
    font-size: 1.0625rem;
    line-height: 1.8;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  .performance-highlight {
    font-weight: 600;
    font-style: italic;
    color: var(--primary-color);
    margin-top: 1.5rem;
  }

  .performance-image img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  /* Responsive */
  @media (max-width: 968px) {
    .accompagnement-container,
    .performance-container {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .performance-container {
      grid-template-areas: 
        "content"
        "image";
    }

    .performance-image {
      grid-area: image;
    }

    .content-performance {
      grid-area: content;
    }
  }

  @media (max-width: 768px) {
    .teams-section {
      padding: 3rem 1rem;
    }

    .content-teams h2 {
      font-size: 2rem;
    }

    .teams-cards {
      grid-template-columns: 1fr;
    }

    .accompagnement,
    .performance {
      padding: 3rem 1rem;
    }

    .content-accompagnement h2,
    .content-performance h2 {
      font-size: 1.75rem;
    }

    .content-accompagnement p,
    .content-performance p {
      font-size: 1rem;
    }
  }
</style>