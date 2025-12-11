<script>
  import { onMount } from 'svelte';
  import { adminPartners } from '$lib/api';
  import { 
    Handshake, 
    Trophy, 
    Users, 
    ShoppingBag,
    Plus,
    Settings
  } from 'lucide-svelte';

  let stats = {
    sponsors: 0,
    teams: 0,
    users: 0,
    products: 0
  };
  
  let loading = true;

  onMount(async () => {
    try {
      // Récupérer le nombre de sponsors
      const partnersResponse = await adminPartners.getAll();
      stats.sponsors = partnersResponse.data?.partners?.length || partnersResponse.data?.length || 0;
      
      // TODO: Ajouter les stats des autres entités quand elles seront implémentées
      stats.teams = '-';
      stats.users = '-';
      stats.products = '-';
    } catch (error) {
      console.error('Erreur chargement stats:', error);
    } finally {
      loading = false;
    }
  });
</script>

<div>
  <h1 class="dashboard-title">Dashboard</h1>
  <p class="text-gray-600 mb-8">Bienvenue dans l'administration d'Olympique Poznań</p>

  {#if loading}
    <div class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 loading-spinner mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement des statistiques...</p>
    </div>
  {:else}
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Sponsors -->
      <div class="stat-card stat-card-sponsors">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium">Sponsors</p>
            <p class="stat-card-value">{stats.sponsors}</p>
          </div>
          <Handshake size={40} class="stat-card-icon-gold" />
        </div>
      </div>

      <!-- Teams -->
      <div class="stat-card stat-card-teams">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium">Équipes</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{stats.teams}</p>
          </div>
          <Trophy size={40} class="text-green-600" />
        </div>
      </div>

      <!-- Users -->
      <div class="stat-card stat-card-users">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium">Utilisateurs</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{stats.users}</p>
          </div>
          <Users size={40} class="text-purple-700" />
        </div>
      </div>

      <!-- Products -->
      <div class="stat-card stat-card-products">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-500 text-sm font-medium">Produits</p>
            <p class="text-3xl font-bold text-gray-800 mt-2">{stats.products}</p>
          </div>
          <ShoppingBag size={40} class="text-orange-600" />
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="actions-section">
      <h2 class="actions-title">Actions rapides</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <a href="/admin/sponsors/create" class="action-card">
          <Plus size={32} class="action-card-icon" />
          <div>
            <p class="action-card-title">Ajouter un sponsor</p>
            <p class="action-card-subtitle">Créer un nouveau partenaire</p>
          </div>
        </a>

        <a href="/admin/sponsors" class="action-card">
          <Settings size={32} class="action-card-icon" />
          <div>
            <p class="action-card-title">Gérer les sponsors</p>
            <p class="action-card-subtitle">Modifier ou supprimer</p>
          </div>
        </a>

        <div class="action-card action-card-disabled">
          <Trophy size={32} class="text-gray-400 mr-4" />
          <div>
            <p class="font-medium text-gray-800">Gérer les équipes</p>
            <p class="text-sm text-gray-500">Bientôt disponible</p>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>