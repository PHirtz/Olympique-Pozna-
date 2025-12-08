<script>
  /** @type {Array<any>} */
  export let matches = [];
</script>

<section class="matches-section">
  <h2>Prochains matchs</h2>
  
  {#if matches.length > 0}
    <div class="matches-list">
      {#each matches as match}
        <div class="match-card">
          <time datetime={match.matchDate}>
            {new Date(match.matchDate).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </time>
          <div class="teams">
            <span class="team-home">{match.team?.name || 'Olympique Poznań'}</span>
            <span class="vs">VS</span>
            <span class="team-away">{match.opponentName}</span>
          </div>
          <p class="location">📍 {match.location}</p>
          {#if match.competition}
            <p class="competition">{match.competition}</p>
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    <p class="empty-state">Aucun match prévu pour le moment.</p>
  {/if}
</section>

<style>
  .matches-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .matches-section h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #333;
    text-align: center;
    font-weight: 700;
  }

  .empty-state {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
    padding: 2rem;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .matches-list {
    display: grid;
    gap: 1.5rem;
  }

  .match-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    border-left: 5px solid #667eea;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .match-card:hover {
    transform: translateX(8px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  .match-card time {
    display: block;
    font-size: 0.95rem;
    color: #666;
    margin-bottom: 1rem;
    text-transform: capitalize;
  }

  .teams {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    font-size: 1.3rem;
    font-weight: 700;
    margin: 1.5rem 0;
  }

  .team-home,
  .team-away {
    color: #333;
  }

  .vs {
    color: #667eea;
    font-size: 1rem;
    font-weight: 600;
  }

  .location {
    text-align: center;
    color: #666;
    margin-top: 1rem;
    font-size: 1rem;
  }

  .competition {
    text-align: center;
    color: #667eea;
    font-size: 0.95rem;
    font-weight: 600;
    margin-top: 0.5rem;
  }

  @media (max-width: 480px) {
    .teams {
      flex-direction: column;
      gap: 0.5rem;
    }

    .vs {
      transform: rotate(90deg);
    }
  }
</style>