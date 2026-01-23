<script>
  import { onMount } from 'svelte';
  import * as adminPlayers from '$lib/api/admin/players.js';
  import PlayerPhoto from '$lib/components/ui/PlayerPhoto.svelte';
  import { 
    Users,
    Plus,
    Pencil,
    Trash2,
    Search,
    Filter
  } from 'lucide-svelte';

  let loading = true;
  let players = [];
  let pagination = {
    total: 0,
    page: 1,
    limit: 20,
    totalPages: 0
  };

  // Filtres
  let filters = {
    teamId: '',
    search: '',
    isActive: ''
  };

  onMount(async () => {
    await loadPlayers();
  });

  async function loadPlayers() {
    try {
      loading = true;
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...(filters.teamId && { teamId: filters.teamId }),
        ...(filters.isActive !== '' && { isActive: filters.isActive })
      };

      const response = await adminPlayers.getAll(params);
      players = response.data?.players || [];
      
      // Filtrer côté client si recherche
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        players = players.filter(p => {
          // Recherche dans le prénom
          const matchFirstName = p.firstName.toLowerCase().includes(searchLower);
          // Recherche dans le nom
          const matchLastName = p.lastName.toLowerCase().includes(searchLower);
          // Recherche dans le surnom
          const matchNickname = p.nickname && p.nickname.toLowerCase().includes(searchLower);
          // Recherche dans le numéro de maillot
          const matchJerseyNumber = p.jerseyNumber && p.jerseyNumber.toString().includes(filters.search);
          // Recherche dans le nom d'équipe
          const matchTeam = p.Team && p.Team.name.toLowerCase().includes(searchLower);
          
          return matchFirstName || matchLastName || matchNickname || matchJerseyNumber || matchTeam;
        });
      }

      pagination = response.data?.pagination || pagination;
    } catch (error) {
      console.error('Erreur chargement joueurs:', error);
    } finally {
      loading = false;
    }
  }

  async function deletePlayer(id, name) {
    if (!confirm(`Supprimer "${name}" ?\n\nCette action est irréversible.`)) return;
    
    try {
      await adminPlayers.deletePlayer(id);
      await loadPlayers();
    } catch (err) {
      alert('Erreur: ' + err.message);
    }
  }

  function handleFilterChange() {
    pagination.page = 1;
    loadPlayers();
  }

  function changePage(newPage) {
    pagination.page = newPage;
    loadPlayers();
  }

  function getPlayerAge(birthYear) {
    return new Date().getFullYear() - birthYear;
  }
</script>

<div class="admin-container">
  <div class="admin-header-section">
    <div class="admin-title">
      <Users size={60} />
      <h1>GESTION DES JOUEURS</h1>
    </div>
    <a href="/admin/players/create" class="btn-primary">
      <Plus size={60} />
      Nouveau joueur
    </a>
  </div>

  <!-- Filtres -->
  <div class="filters-section">
    <div class="filter-group">
      <label for="searchFilter">
        <Search size={14} />
        Recherche
      </label>
      <input
        id="searchFilter"
        type="text"
        bind:value={filters.search}
        on:input={handleFilterChange}
        placeholder="Nom, prénom, surnom..."
        class="filter-input"
      />
    </div>

    <div class="filter-group">
      <label for="statusFilter">Statut</label>
      <select 
        id="statusFilter"
        bind:value={filters.isActive}
        on:change={handleFilterChange}
        class="filter-select"
      >
        <option value="">Tous</option>
        <option value="true">Actifs</option>
        <option value="false">Inactifs</option>
      </select>
    </div>
  </div>

  {#if loading}
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <p>Chargement des joueurs...</p>
    </div>
  {:else if players.length === 0}
    <div class="empty-state">
      <Users size={48} />
      <p>Aucun joueur trouvé</p>
      <a href="/admin/players/create" class="btn-primary">
        <Plus size={60} />
        Ajouter un joueur
      </a>
    </div>
  {:else}
    <!-- Table -->
    <div class="table-wrapper">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Nom</th>
            <th>Équipe</th>
            <th>Poste</th>
            <th>N°</th>
            <th>Âge</th>
            <th>Nationalité</th>
            <th>Statut</th>
            <th class="actions-col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each players as player, i}
            <tr class:row-alt={i % 2 === 1}>
              <td class="photo-cell">
                <PlayerPhoto 
                  src={player.photoUrl} 
                  alt={`${player.firstName} ${player.lastName}`}
                  className="player-photo"
                />
              </td>
              <td class="text-bold">
                {player.firstName} {player.lastName}
                {#if player.nickname}
                  <span class="nickname">"{player.nickname}"</span>
                {/if}
              </td>
              <td>{player.teamName || 'Sans équipe'}</td>
              <td>{player.position}</td>
              <td class="text-center">
                {#if player.jerseyNumber}
                  <span class="jersey-number">{player.jerseyNumber}</span>
                {:else}
                  -
                {/if}
              </td>
              <td class="text-center">{getPlayerAge(player.birthYear)}</td>
              <td>{player.nationality}</td>
              <td>
                <span class="badge {player.isActive ? 'badge-active' : 'badge-inactive'}">
                  {player.isActive ? 'Actif' : 'Inactif'}
                </span>
              </td>
              <td class="actions-col">
                <a 
                  href="/admin/players/{player.id}/edit" 
                  class="icon-btn"
                  title="Modifier"
                >
                  <Pencil size={25} />
                </a>
                <button 
                  on:click={() => deletePlayer(player.id, `${player.firstName} ${player.lastName}`)}
                  class="icon-btn icon-btn-danger"
                  title="Supprimer"
                >
                  <Trash2 size={25} />
                </button>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    {#if pagination.totalPages > 1}
      <div class="pagination">
        <button
          class="btn-secondary"
          disabled={pagination.page === 1}
          on:click={() => changePage(pagination.page - 1)}
        >
          ← Précédent
        </button>
        
        <span class="page-info">
          Page {pagination.page} / {pagination.totalPages}
          <span class="total">({pagination.total} joueurs)</span>
        </span>

        <button
          class="btn-secondary"
          disabled={pagination.page === pagination.totalPages}
          on:click={() => changePage(pagination.page + 1)}
        >
          Suivant →
        </button>
      </div>
    {/if}
  {/if}
</div>

<style>
  /* ============================================
     MOBILE FIRST - Styles de base pour mobile
     ============================================ */
  
  /* Container principal */
  .admin-container {
    padding: 1rem;
  }

  /* Photo des joueurs - Taille contrôlée */
  :global(.player-photo) {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid var(--op-blue-primary);
  }

  .nickname {
    display: block;
    font-size: 1rem;
    color: #666;
    font-style: italic;
    font-weight: 400;
    margin-top: 0.25rem;
  }

  .jersey-number {
    display: inline-block;
    background: #1a4d7a;
    color: white;
    padding: 0.125rem 0.5rem;
    border-radius: 3px;
    font-weight: 700;
    font-size: 0.875rem;
  }

  /* Header section - Mobile */
  .admin-header-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .admin-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: var(--op-blue-primary);
  }

  .admin-title :global(svg) {
    width: 32px;
    height: 32px;
  }

  .admin-title h1 {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
  }

  .btn-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: var(--op-blue-primary);
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease;
    width: 100%;
  }

  .btn-primary :global(svg) {
    width: 20px;
    height: 20px;
  }

  .btn-primary:hover {
    background: #153d5e;
  }

  /* Filters - Mobile */
  .filters-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .filter-group label {
    font-weight: 600;
    font-size: 0.85rem;
    color: var(--op-blue-primary);
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .filter-input,
  .filter-select {
    padding: 0.6rem 0.75rem;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 0.875rem;
    width: 100%;
  }

  /* Vue carte pour mobile - On masque le tableau classique */
  .table-wrapper {
    background: transparent;
    border-radius: 0;
    overflow: visible;
    box-shadow: none;
  }

  .admin-table {
    width: 100%;
  }

  .admin-table thead {
    display: none;
  }

  .admin-table tbody {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .admin-table tbody tr {
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    padding: 1rem;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .admin-table tbody tr td {
    border: none;
    padding: 0.5rem 0;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
  }

  /* Ajout de labels sur mobile */
  .admin-table tbody tr td:not(.photo-cell):not(.actions-col)::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--op-blue-primary);
  }

  .photo-cell {
    justify-content: center;
    padding: 0.5rem 0 1rem;
  }

  .text-bold {
    font-weight: 600;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .text-center {
    justify-content: space-between;
  }

  .row-alt {
    background: white;
  }

  /* Status badge */
  .badge {
    padding: 0.25rem 0.6rem;
    border-radius: 6px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .badge-active {
    background: #e8f5e9;
    color: #2e7d32;
  }

  .badge-inactive {
    background: #ffebee;
    color: #d32f2f;
  }

  /* Actions */
  .actions-col {
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0 0.5rem;
    border-top: 1px solid #eee;
    margin-top: 0.5rem;
  }

  .icon-btn {
    background: none;
    width: 100%;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 6px;
    transition: all 0.15s ease;
    color: var(--op-blue-primary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-btn :global(svg) {
    width: 20px;
    height: 20px;
  }

  .icon-btn:hover {
    background: rgba(26,77,122,0.1);
  }

  .icon-btn-danger {
    color: #d32f2f;
  }

  .icon-btn-danger:hover {
    background: rgba(211,47,47,0.1);
  }

  /* Pagination - Mobile */
  .pagination {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    margin-top: 1.5rem;
  }

  .pagination button {
    width: 100%;
  }

  .btn-secondary {
    background: white;
    border: 1px solid var(--op-blue-primary);
    color: var(--op-blue-primary);
    padding: 0.75rem 1rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .btn-secondary:hover:not(:disabled) {
    background: var(--op-blue-primary);
    color: white;
  }

  .btn-secondary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-info {
    font-weight: 600;
    color: var(--op-blue-primary);
    font-size: 0.875rem;
    text-align: center;
  }

  .total {
    display: block;
    color: #777;
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }

  /* Empty & loading */
  .loading-container,
  .empty-state {
    background: white;
    border-radius: 12px;
    padding: 2rem 1rem;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }

  .empty-state :global(svg) {
    width: 48px;
    height: 48px;
    color: #999;
  }

  .empty-state p {
    margin: 1rem 0;
    font-weight: 600;
    color: #555;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    border: 3px solid #f3f3f3;
    border-top: 3px solid var(--op-blue-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* ============================================
     TABLET - À partir de 768px
     ============================================ */
  @media (min-width: 768px) {
    .admin-container {
      padding: 1.5rem;
    }

    .admin-header-section {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .admin-title :global(svg) {
      width: 40px;
      height: 40px;
    }

    .admin-title h1 {
      font-size: 1.75rem;
    }

    .btn-primary {
      width: auto;
      padding: 0.75rem 1.25rem;
    }

    .btn-primary :global(svg) {
      width: 24px;
      height: 24px;
    }

    .filters-section {
      flex-direction: row;
      gap: 1.5rem;
      align-items: flex-end;
      margin-bottom: 2rem;
    }

    .filter-group {
      flex: 1;
      max-width: 300px;
    }

    :global(.player-photo) {
      width: 55px;
      height: 55px;
    }

    .pagination {
      flex-direction: row;
      justify-content: space-between;
      margin-top: 2rem;
    }

    .pagination button {
      width: auto;
    }

    .total {
      display: inline;
      margin-left: 0.5rem;
      margin-top: 0;
    }
  }

  /* ============================================
     DESKTOP - À partir de 1024px
     ============================================ */
  @media (min-width: 1024px) {
    .admin-container {
      padding: 2rem;
    }

    .admin-title :global(svg) {
      width: 48px;
      height: 48px;
    }

    .admin-title h1 {
      font-size: 2rem;
    }

    :global(.player-photo) {
      width: 60px;
      height: 60px;
    }

    /* Afficher le tableau classique sur desktop */
    .table-wrapper {
      background: white;
      border-radius: 12px;
      overflow-x: auto;
      box-shadow: 0 8px 22px rgba(0,0,0,0.08);
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
    }

    .admin-table thead {
      display: table-header-group;
    }

    .admin-table tbody {
      display: table-row-group;
      gap: 0;
    }

    .admin-table tbody tr {
      display: table-row;
      background: transparent;
      border-radius: 0;
      padding: 0;
      box-shadow: none;
    }

    .admin-table tbody tr td {
      display: table-cell;
      border-bottom: 1px solid #eee;
      padding: 0.75rem;
      text-align: center;
      font-size: 0.875rem;
    }

    /* Retirer les labels sur desktop */
    .admin-table tbody tr td::before {
      content: none !important;
    }

    .admin-table th {
      background: var(--op-blue-primary);
      color: white;
      padding: 0.75rem;
      text-align: center;
      font-size: 0.875rem;
    }

    .photo-cell {
      text-align: center;
      padding: 0.5rem;
      justify-content: center;
    }

    .text-bold {
      flex-direction: row;
      justify-content: center;
      gap: 0;
      text-align: center;
    }

    .text-center {
      text-align: center;
      justify-content: center;
    }

    .row-alt {
      background: #f9fafb;
    }

    .actions-col {
      text-align: right;
      white-space: nowrap;
      padding: 0.75rem;
      justify-content: flex-end;
      border: none;
      margin: 0;
    }

    .icon-btn {
      margin-left: 0.5rem;
      padding: 0.35rem;
    }

    .icon-btn :global(svg) {
      width: 18px;
      height: 18px;
    }

    .badge {
      font-size: 0.75rem;
    }

    .jersey-number {
      font-size: 0.875rem;
    }
  }

  /* ============================================
     LARGE DESKTOP - À partir de 1440px
     ============================================ */
  @media (min-width: 1440px) {
    .admin-table {
      font-size: 0.9375rem;
    }

    .admin-table th {
      font-size: 0.9375rem;
      padding: 1rem;
    }

    .admin-table td {
      padding: 1rem;
      font-size: 0.9375rem;
    }

    :global(.player-photo) {
      width: 70px;
      height: 70px;
    }

    .btn-primary :global(svg) {
      width: 24px;
      height: 24px;
    }
  }
</style>