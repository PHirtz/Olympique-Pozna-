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
      
      // Filtrer côté client si recherche par nom
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        players = players.filter(p => 
          p.firstName.toLowerCase().includes(searchLower) ||
          p.lastName.toLowerCase().includes(searchLower) ||
          (p.nickname && p.nickname.toLowerCase().includes(searchLower))
        );
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
      <Users size={24} />
      <h1>GESTION DES JOUEURS</h1>
    </div>
    <a href="/admin/players/create" class="btn-primary">
      <Plus size={16} />
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
        <Plus size={16} />
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
                  <Pencil size={14} />
                </a>
                <button 
                  on:click={() => deletePlayer(player.id, `${player.firstName} ${player.lastName}`)}
                  class="icon-btn icon-btn-danger"
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
  /* Réutilise les styles de ton admin.css */
  .player-photo {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 4px;
    border: 1px solid #d0d0d0;
  }

  .player-photo-placeholder {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f0f0f0;
    border: 1px solid #d0d0d0;
    border-radius: 4px;
    color: #999;
  }

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
    font-size: 0.875rem;
  }
</style>