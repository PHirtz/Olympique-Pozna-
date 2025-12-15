<script>
  import { onMount } from 'svelte';
  import { adminPartners } from '$lib/api';
  import { 
    Handshake, 
    Trophy, 
    Users, 
    ShoppingBag,
    Plus,
    ChevronDown,
    ChevronRight,
    Pencil,
    Trash2,
    Save,
    X
  } from 'lucide-svelte';

  let stats = {
    sponsors: 0,
    teams: 0,
    users: 0,
    products: 0
  };
  
  let loading = true;
  let sponsors = [];
  
  // États des sections dépliables
  let sections = {
    sponsors: true,
    teams: false,
    shop: false,
    news: false
  };

  onMount(async () => {
    await loadData();
  });

  async function loadData() {
    try {
      loading = true;
      const partnersResponse = await adminPartners.getAll();
      sponsors = partnersResponse.data?.partners || partnersResponse.data || [];
      stats.sponsors = sponsors.length;
      
      // TODO: Charger teams, users, products
      stats.teams = '-';
      stats.users = '-';
      stats.products = '-';
    } catch (error) {
      console.error('Erreur chargement:', error);
    } finally {
      loading = false;
    }
  }

  function toggleSection(section) {
    sections[section] = !sections[section];
  }

  async function deleteSponsor(id, name) {
    if (!confirm(`Supprimer "${name}" ?`)) return;
    try {
      await adminPartners.deletePartner(id);
      await loadData();
    } catch (err) {
      alert('Erreur: ' + err.message);
    }
  }

  function getCategoryLabel(cat) {
    const labels = {
      main_sponsor: 'Principal',
      supplier: 'Fournisseur'
    };
    return labels[cat] || cat;
  }
</script>

<div class="fm-container">
  {#if loading}
    <div class="fm-loading">
      <div class="loading-spinner"></div>
      <p>Chargement des données...</p>
    </div>
  {:else}
    <!-- Stats toujours visibles -->
    <div class="fm-stats">
      <div class="fm-stat-item">
        <Handshake size={20} />
        <span class="fm-stat-label">Sponsors</span>
        <span class="fm-stat-value">{stats.sponsors}</span>
      </div>
      <div class="fm-stat-item">
        <Trophy size={20} />
        <span class="fm-stat-label">Équipes</span>
        <span class="fm-stat-value">{stats.teams}</span>
      </div>
      <div class="fm-stat-item">
        <Users size={20} />
        <span class="fm-stat-label">Joueurs</span>
        <span class="fm-stat-value">{stats.users}</span>
      </div>
      <div class="fm-stat-item">
        <ShoppingBag size={20} />
        <span class="fm-stat-label">Produits</span>
        <span class="fm-stat-value">{stats.products}</span>
      </div>
    </div>

    <!-- Section Sponsors -->
    <div class="fm-section">
      <button class="fm-section-header" on:click={() => toggleSection('sponsors')}>
        {#if sections.sponsors}
          <ChevronDown size={20} />
        {:else}
          <ChevronRight size={20} />
        {/if}
        <Handshake size={20} />
        <span>SPONSORS ({stats.sponsors})</span>
      </button>

      {#if sections.sponsors}
        <div class="fm-section-content">
          <div class="fm-actions">
            <a href="/admin/sponsors/create" class="fm-btn fm-btn-primary">
              <Plus size={16} />
              Nouveau sponsor
            </a>
          </div>

          {#if sponsors.length === 0}
            <p class="fm-empty">Aucun sponsor</p>
          {:else}
            <div class="fm-table-wrapper">
              <table class="fm-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Catégorie</th>
                    <th>Site web</th>
                    <th>Statut</th>
                    <th class="fm-actions-col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {#each sponsors as sponsor, i}
                    <tr class:fm-row-alt={i % 2 === 1}>
                      <td class="fm-text-bold">{sponsor.name}</td>
                      <td>{getCategoryLabel(sponsor.category)}</td>
                      <td>
                        {#if sponsor.websiteUrl}
                          <a href={sponsor.websiteUrl} target="_blank" class="fm-link" title={sponsor.websiteUrl}>
                            {sponsor.websiteUrl.replace('https://', '').replace('http://', '').substring(0, 30)}
                          </a>
                        {:else}
                          -
                        {/if}
                      </td>
                      <td>
                        <span class="fm-badge {sponsor.isActive ? 'fm-badge-active' : 'fm-badge-inactive'}">
                          {sponsor.isActive ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td class="fm-actions-col">
                        <a href="/admin/sponsors/{sponsor.id}/edit" class="fm-icon-btn" title="Modifier">
                          <Pencil size={14} />
                        </a>
                        <button 
                          on:click={() => deleteSponsor(sponsor.id, sponsor.name)}
                          class="fm-icon-btn fm-icon-btn-danger"
                          title="Supprimer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}
        </div>
      {/if}
    </div>

    <!-- Section Équipes & Joueurs -->
    <div class="fm-section">
      <button class="fm-section-header" on:click={() => toggleSection('teams')}>
        {#if sections.teams}
          <ChevronDown size={20} />
        {:else}
          <ChevronRight size={20} />
        {/if}
        <Trophy size={20} />
        <span>ÉQUIPES & JOUEURS ({stats.teams})</span>
      </button>

      {#if sections.teams}
        <div class="fm-section-content">
          <p class="fm-empty">Fonctionnalité à venir...</p>
        </div>
      {/if}
    </div>

    <!-- Section Boutique -->
    <div class="fm-section">
      <button class="fm-section-header" on:click={() => toggleSection('shop')}>
        {#if sections.shop}
          <ChevronDown size={20} />
        {:else}
          <ChevronRight size={20} />
        {/if}
        <ShoppingBag size={20} />
        <span>BOUTIQUE ({stats.products})</span>
      </button>

      {#if sections.shop}
        <div class="fm-section-content">
          <p class="fm-empty">Fonctionnalité à venir...</p>
        </div>
      {/if}
    </div>

    <!-- Section News -->
    <div class="fm-section">
      <button class="fm-section-header" on:click={() => toggleSection('news')}>
        {#if sections.news}
          <ChevronDown size={20} />
        {:else}
          <ChevronRight size={20} />
        {/if}
        <span class="fm-icon">📰</span>
        <span>NEWS</span>
      </button>

      {#if sections.news}
        <div class="fm-section-content">
          <p class="fm-empty">Fonctionnalité à venir...</p>
        </div>
      {/if}
    </div>
  {/if}
</div>

<style>
  /* ============================================
     MOBILE FIRST - Football Manager 2005 Style
     ============================================ */
     
  /* Base - Mobile (0px+) */
  .fm-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem;
  }

  .fm-loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  /* Stats Bar - Mobile */
  .fm-stats {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin-bottom: 1rem;
    background: white;
    border: 1px solid #d0d0d0;
    padding: 0.75rem;
  }

  .fm-stat-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem;
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
  }

  .fm-stat-item :global(svg) {
    color: #1a4d7a;
    flex-shrink: 0;
  }

  .fm-stat-label {
    flex: 1;
    font-size: 0.8125rem;
    color: #666;
  }

  .fm-stat-value {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1a4d7a;
  }

  /* Sections - Mobile */
  .fm-section {
    margin-bottom: 0.75rem;
    background: white;
    border: 1px solid #d0d0d0;
  }

  .fm-section-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 0.875rem;
    background: linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%);
    border: none;
    border-bottom: 1px solid #d0d0d0;
    cursor: pointer;
    font-weight: 700;
    font-size: 0.8125rem;
    color: #1a4d7a;
    text-align: left;
    letter-spacing: 0.5px;
    transition: background 0.2s;
  }

  .fm-section-header:hover {
    background: linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%);
  }

  .fm-section-header :global(svg) {
    color: #1a4d7a;
    flex-shrink: 0;
  }

  .fm-section-content {
    padding: 0.75rem;
  }

  /* Actions - Mobile */
  .fm-actions {
    margin-bottom: 0.875rem;
  }

  .fm-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.875rem;
    border: 1px solid #d0d0d0;
    background: linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%);
    color: #333;
    font-size: 0.8125rem;
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
  }

  .fm-btn:hover {
    background: linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%);
    border-color: #1a4d7a;
  }

  .fm-btn-primary {
    background: linear-gradient(180deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    border-color: #0f2d4a;
  }

  .fm-btn-primary:hover {
    background: linear-gradient(180deg, #2563a8 0%, #1a4d7a 100%);
  }

  /* Tables - Mobile */
  .fm-table-wrapper {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0 -0.75rem;
    padding: 0 0.75rem;
  }

  .fm-table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    font-size: 0.75rem;
    border: 1px solid #d0d0d0;
  }

  .fm-table thead {
    background: linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%);
  }

  .fm-table th {
    padding: 0.5rem;
    text-align: left;
    font-weight: 700;
    color: #1a4d7a;
    border-bottom: 2px solid #c9a961;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .fm-table td {
    padding: 0.5rem;
    border-bottom: 1px solid #e8e8e8;
  }

  .fm-table tbody tr {
    transition: background 0.15s;
  }

  .fm-table tbody tr:hover {
    background: #fffbf0;
  }

  .fm-row-alt {
    background: #f9f9f9;
  }

  .fm-row-alt:hover {
    background: #fffbf0 !important;
  }

  .fm-text-bold {
    font-weight: 600;
    color: #1a4d7a;
    white-space: nowrap;
  }

  .fm-link {
    color: #1a4d7a;
    text-decoration: none;
    font-size: 0.75rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    max-width: 120px;
  }

  .fm-link:hover {
    text-decoration: underline;
    color: #c9a961;
  }

  /* Badges - Mobile */
  .fm-badge {
    display: inline-block;
    padding: 0.1875rem 0.375rem;
    font-size: 0.6875rem;
    font-weight: 600;
    border: 1px solid;
    background: white;
  }

  .fm-badge-active {
    color: #2e7d32;
    border-color: #2e7d32;
    background: #e8f5e9;
  }

  .fm-badge-inactive {
    color: #757575;
    border-color: #bdbdbd;
    background: #f5f5f5;
  }

  /* Icon buttons - Mobile */
  .fm-actions-col {
    width: 70px;
    text-align: right;
  }

  .fm-icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border: 1px solid #d0d0d0;
    background: linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%);
    cursor: pointer;
    margin-left: 0.25rem;
    transition: all 0.2s;
    text-decoration: none;
    color: #333;
  }

  .fm-icon-btn:hover {
    background: linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%);
    border-color: #1a4d7a;
  }

  .fm-icon-btn-danger:hover {
    background: linear-gradient(180deg, #ffebee 0%, #ffcdd2 100%);
    border-color: #d32f2f;
    color: #d32f2f;
  }

  .fm-empty {
    text-align: center;
    padding: 1.5rem;
    color: #999;
    font-style: italic;
    font-size: 0.875rem;
  }

  .fm-icon {
    font-size: 1.125rem;
  }

  /* ============================================
     TABLET - 640px+
     ============================================ */
  @media (min-width: 640px) {

    .fm-stats {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding: 1rem;
      margin-bottom: 1.25rem;
    }

    .fm-stat-item {
      padding: 0.75rem;
      gap: 0.75rem;
    }

    .fm-stat-label {
      font-size: 0.875rem;
    }

    .fm-stat-value {
      font-size: 1.25rem;
    }

    .fm-section {
      margin-bottom: 1rem;
    }

    .fm-section-header {
      padding: 0.875rem 1rem;
      font-size: 0.9rem;
      gap: 0.75rem;
    }

    .fm-section-content {
      padding: 1rem;
    }

    .fm-actions {
      margin-bottom: 1rem;
    }

    .fm-btn {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      gap: 0.5rem;
    }

    .fm-table {
      font-size: 0.8125rem;
    }

    .fm-table th {
      padding: 0.625rem 0.75rem;
      font-size: 0.8125rem;
    }

    .fm-table td {
      padding: 0.625rem 0.75rem;
    }

    .fm-link {
      font-size: 0.8125rem;
      max-width: 180px;
    }

    .fm-badge {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }

    .fm-actions-col {
      width: 90px;
    }

    .fm-icon-btn {
      width: 28px;
      height: 28px;
    }

    .fm-empty {
      padding: 2rem;
    }

    .fm-icon {
      font-size: 1.25rem;
    }
  }

  /* ============================================
     DESKTOP - 768px+
     ============================================ */
  @media (min-width: 768px) {
    .fm-stats {
      grid-template-columns: repeat(4, 1fr);
      margin-bottom: 1.5rem;
    }

    .fm-table {
      font-size: 0.875rem;
      min-width: auto;
    }

    .fm-table-wrapper {
      margin: 0;
      padding: 0;
    }

    .fm-link {
      max-width: 250px;
    }

    .fm-actions-col {
      width: 100px;
    }
  }

  /* ============================================
     LARGE DESKTOP - 1024px+
     ============================================ */
  @media (min-width: 1024px) {
    .fm-loading {
      padding: 3rem;
    }
  }
</style>