<script>
  import { onMount } from 'svelte';
  import { adminPartners } from '$lib/api';
  import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-svelte';

  let sponsors = [];
  let loading = true;
  let error = '';

  onMount(async () => {
    await loadSponsors();
  });

  async function loadSponsors() {
    try {
      loading = true;
      const response = await adminPartners.getAll();
      sponsors = response.data?.partners || response.data || [];
    } catch (err) {
      error = err.message || 'Erreur lors du chargement des sponsors';
      console.error('Erreur:', err);
    } finally {
      loading = false;
    }
  }

  async function handleDelete(id, name) {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer le sponsor "${name}" ?`)) {
      return;
    }

    try {
      await adminPartners.deletePartner(id);
      await loadSponsors(); // Recharger la liste
    } catch (err) {
      alert('Erreur lors de la suppression : ' + err.message);
    }
  }

  function getCategoryBadgeClass(category) {
    const classes = {
      main_sponsor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      gold: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      silver: 'bg-gray-100 text-gray-800 border-gray-200',
      bronze: 'bg-orange-100 text-orange-800 border-orange-200',
      partner: 'bg-blue-100 text-blue-800 border-blue-200',
      supplier: 'bg-green-100 text-green-800 border-green-200',
      institutional: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return classes[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  }

  function getCategoryLabel(category) {
    const labels = {
      main_sponsor: 'Sponsor Principal',
      gold: 'Or',
      silver: 'Argent',
      bronze: 'Bronze',
      partner: 'Partenaire',
      supplier: 'Fournisseur',
      institutional: 'Institutionnel'
    };
    return labels[category] || category;
  }
</script>

<div>
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-800">Sponsors</h1>
      <p class="text-gray-600 mt-1">Gérez vos partenaires et sponsors</p>
    </div>
    <a
      href="/admin/sponsors/create"
      class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
    >
      <Plus size={20} />
      <span>Ajouter un sponsor</span>
    </a>
  </div>

  <!-- Loading -->
  {#if loading}
    <div class="bg-white rounded-lg shadow-sm p-12 text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement des sponsors...</p>
    </div>

  <!-- Error -->
  {:else if error}
    <div class="bg-red-50 border border-red-200 rounded-lg p-6">
      <div class="flex items-start gap-3">
        <AlertCircle class="text-red-600 flex-shrink-0" size={24} />
        <div>
          <h3 class="font-semibold text-red-800">Erreur</h3>
          <p class="text-red-700 mt-1">{error}</p>
          <button
            on:click={loadSponsors}
            class="mt-3 text-red-600 hover:text-red-700 font-medium text-sm"
          >
            Réessayer
          </button>
        </div>
      </div>
    </div>

  <!-- Empty State -->
  {:else if sponsors.length === 0}
    <div class="bg-white rounded-lg shadow-sm p-12 text-center">
      <div class="text-gray-400 mb-4">
        <svg class="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <h3 class="text-xl font-semibold text-gray-700 mb-2">Aucun sponsor</h3>
      <p class="text-gray-600 mb-6">Commencez par ajouter votre premier sponsor</p>
      <a
        href="/admin/sponsors/create"
        class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
      >
        <Plus size={20} />
        <span>Ajouter un sponsor</span>
      </a>
    </div>

  <!-- Sponsors Grid -->
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each sponsors as sponsor (sponsor.id)}
        <div class="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden">
          <!-- Logo -->
          <div class="aspect-video bg-gray-50 flex items-center justify-center p-6">
            {#if sponsor.logoUrl}
              <img
                src={sponsor.logoUrl}
                alt={sponsor.name}
                class="max-w-full max-h-full object-contain"
              />
            {:else}
              <div class="text-gray-400 text-center">
                <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p class="text-sm mt-2">Pas de logo</p>
              </div>
            {/if}
          </div>

          <!-- Info -->
          <div class="p-4">
            <h3 class="font-semibold text-gray-800 text-lg mb-2">{sponsor.name}</h3>
            
            <!-- Category Badge -->
            <div class="mb-3">
              <span class="inline-block px-3 py-1 rounded-full text-xs font-medium border {getCategoryBadgeClass(sponsor.category)}">
                {getCategoryLabel(sponsor.category)}
              </span>
            </div>

            <!-- Status -->
            <div class="flex items-center gap-2 text-sm mb-4">
              <span class="w-2 h-2 rounded-full {sponsor.isActive ? 'bg-green-500' : 'bg-gray-400'}"></span>
              <span class="text-gray-600">{sponsor.isActive ? 'Actif' : 'Inactif'}</span>
            </div>

            <!-- Actions -->
            <div class="flex gap-2">
              <a
                href="/admin/sponsors/{sponsor.id}/edit"
                class="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2 px-4 rounded-lg transition"
              >
                <Pencil size={16} />
                <span>Modifier</span>
              </a>
              <button
                on:click={() => handleDelete(sponsor.id, sponsor.name)}
                class="flex items-center justify-center bg-red-50 hover:bg-red-100 text-red-700 py-2 px-4 rounded-lg transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>