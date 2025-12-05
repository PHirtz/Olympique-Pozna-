<script>
  /** @type {Array<any>} */
  export let news = [];
</script>

<section class="news-section">
  <h2>Dernières actualités</h2>
  
  {#if news.length > 0}
    <div class="news-grid">
      {#each news as article}
        <article class="news-card">
          {#if article.imageUrl}
            <img src={article.imageUrl} alt={article.title} />
          {:else}
            <div class="placeholder-image">📰</div>
          {/if}
          <div class="news-content">
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <a href="/news/{article.slug}">Lire la suite →</a>
          </div>
        </article>
      {/each}
    </div>
  {:else}
    <p class="empty-state">Aucune actualité pour le moment.</p>
  {/if}
</section>

<style>
  .news-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .news-section h2 {
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

  .news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .news-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .news-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  .news-card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .placeholder-image {
    width: 100%;
    height: 200px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
  }

  .news-content {
    padding: 1.5rem;
  }

  .news-card h3 {
    margin: 0 0 0.75rem 0;
    color: #333;
    font-size: 1.3rem;
    font-weight: 600;
  }

  .news-card p {
    color: #666;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  .news-card a {
    display: inline-block;
    color: #667eea;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.2s;
  }

  .news-card a:hover {
    color: #5568d3;
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .news-section h2 {
      font-size: 1.8rem;
    }

    .news-grid {
      grid-template-columns: 1fr;
    }
  }
</style>