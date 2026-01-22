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
  .nickname {
    display: block;
    font-size: 0.75rem;
    color: #666;
    font-style: italic;
    font-weight: 400;
  }

  .jersey-number {
    display: inline-block;
    background: #1a4d7a;
    color: white;
    padding: 0.125rem 0.5rem;
    border-radius: 3px;
    font-weight: 700;
    font-size: 1.5rem;
  }

  /* Header section */
.admin-header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  margin-left: 1rem;
}

.admin-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--op-blue-primary);
}

.admin-title h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}
.btn-primary {
  display: flex;
  align-items: center;
  margin: 1rem 1.5rem;
  gap: 0.5rem;
  background: var(--op-blue-primary);
  color: white;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.2s ease;
}

/* Filters */
.filters-section {
  display: flex;
  gap: 2rem;
  align-items: flex-end;
  margin-bottom: 2rem;
  margin-left: 1rem;
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
}

/* Table */
.table-wrapper {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 22px rgba(0,0,0,0.08);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 1.5rem;
}

.admin-table th {
  background: var(--op-blue-primary);
  color: white;
  padding: 0.75rem;
  text-align: center;
}

.admin-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
  text-align: center;
}

.photo-cell {
  font-weight: 400;
  font-size: 0.875rem;
  padding-left: 2rem;
}

.row-alt {
  background: #f9fafb;
}

.text-center {
  text-align: center;
}

.text-bold {
  font-weight: 600;
}

/* Status badge */
.badge {
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 1.5rem;
  font-weight: 700;
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
  text-align: right;
  white-space: nowrap;
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.35rem;
  border-radius: 6px;
  transition: all 0.15s ease;
  color: var(--op-blue-primary);
  margin-left: 0.5rem;
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

/* Pagination */
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}

.page-info {
  font-weight: 600;
  color: var(--op-blue-primary);
}

.total {
  color: #777;
  font-size: 0.85rem;
}

/* Empty & loading */
.loading-container,
.empty-state {
  background: white;
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  box-shadow: 0 8px 22px rgba(0,0,0,0.08);
}

.empty-state p {
  margin: 1rem 0;
  font-weight: 600;
  color: #555;
}

</style>