<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { adminPartners } from '$lib/api';
  import { Save, X, Image as ImageIcon } from 'lucide-svelte';

  export let mode = 'create'; // 'create' ou 'edit'
  export let sponsorId = null;

  const dispatch = createEventDispatcher();

  let formData = {
    name: '',
    category: 'partner',
    websiteUrl: '',
    description_fr: '',
    description_pl: '',
    logoUrl: '',
    logoPath: '',
    displayOrder: 0,
    isActive: true
  };

  let loading = false;
  let saving = false;
  let error = '';

  // Catégories disponibles
  const categories = [
    { value: 'main_sponsor', label: 'Sponsor Principal' },
    { value: 'gold', label: 'Or' },
    { value: 'silver', label: 'Argent' },
    { value: 'bronze', label: 'Bronze' },
    { value: 'partner', label: 'Partenaire' },
    { value: 'supplier', label: 'Fournisseur' },
    { value: 'institutional', label: 'Institutionnel' }
  ];

  onMount(async () => {
    if (mode === 'edit' && sponsorId) {
      await loadSponsor();
    }
  });

  async function loadSponsor() {
    try {
      loading = true;
      const response = await adminPartners.getById(sponsorId);
      formData = { ...formData, ...response.data };
    } catch (err) {
      error = 'Erreur lors du chargement du sponsor';
      console.error(err);
    } finally {
      loading = false;
    }
  }

  async function handleSubmit() {
    error = '';
    saving = true;

    try {
      if (mode === 'create') {
        await adminPartners.create(formData);
      } else {
        await adminPartners.update(sponsorId, formData);
      }

      // Rediriger vers la liste
      goto('/admin/sponsors');
    } catch (err) {
      error = err.message || 'Erreur lors de l\'enregistrement';
      console.error(err);
    } finally {
      saving = false;
    }
  }

  function handleCancel() {
    goto('/admin/sponsors');
  }
</script>

{#if loading}
  <div class="bg-white rounded-lg shadow-sm p-12 text-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    <p class="mt-4 text-gray-600">Chargement...</p>
  </div>
{:else}
  <div class="bg-white rounded-lg shadow-sm">
    <form on:submit|preventDefault={handleSubmit}>
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800">
          {mode === 'create' ? 'Nouveau sponsor' : 'Modifier le sponsor'}
        </h2>
      </div>

      <!-- Error -->
      {#if error}
        <div class="mx-6 mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      {/if}

      <!-- Form Fields -->
      <div class="p-6 space-y-6">
        <!-- Informations générales -->
        <div>
          <h3 class="text-lg font-medium text-gray-800 mb-4">Informations générales</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Nom -->
            <div class="md:col-span-2">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                Nom du sponsor *
              </label>
              <input
                id="name"
                type="text"
                bind:value={formData.name}
                required
                disabled={saving}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Ex: Le Petit Paris"
              />
            </div>

            <!-- Catégorie -->
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
                Catégorie *
              </label>
              <select
                id="category"
                bind:value={formData.category}
                required
                disabled={saving}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              >
                {#each categories as cat}
                  <option value={cat.value}>{cat.label}</option>
                {/each}
              </select>
            </div>

            <!-- Site web -->
            <div>
              <label for="websiteUrl" class="block text-sm font-medium text-gray-700 mb-2">
                Site web
              </label>
              <input
                id="websiteUrl"
                type="url"
                bind:value={formData.websiteUrl}
                disabled={saving}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="https://exemple.com"
              />
            </div>
          </div>
        </div>

        <!-- Descriptions -->
        <div>
          <h3 class="text-lg font-medium text-gray-800 mb-4">Descriptions</h3>
          
          <div class="space-y-4">
            <!-- Description FR -->
            <div>
              <label for="description_fr" class="block text-sm font-medium text-gray-700 mb-2">
                Description (Français)
              </label>
              <textarea
                id="description_fr"
                bind:value={formData.description_fr}
                disabled={saving}
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Description du sponsor en français..."
              ></textarea>
            </div>

            <!-- Description PL -->
            <div>
              <label for="description_pl" class="block text-sm font-medium text-gray-700 mb-2">
                Description (Polonais)
              </label>
              <textarea
                id="description_pl"
                bind:value={formData.description_pl}
                disabled={saving}
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Opis partnera w języku polskim..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Logo -->
        <div>
          <h3 class="text-lg font-medium text-gray-800 mb-4">Logo</h3>
          
          <div class="space-y-4">
            <!-- Logo URL -->
            <div>
              <label for="logoUrl" class="block text-sm font-medium text-gray-700 mb-2">
                URL du logo
              </label>
              <input
                id="logoUrl"
                type="url"
                bind:value={formData.logoUrl}
                disabled={saving}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="https://exemple.com/logo.png"
              />
            </div>

            <!-- Logo Path -->
            <div>
              <label for="logoPath" class="block text-sm font-medium text-gray-700 mb-2">
                Chemin local du logo
              </label>
              <input
                id="logoPath"
                type="text"
                bind:value={formData.logoPath}
                disabled={saving}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="/images/sponsors/logo.png"
              />
            </div>

            <!-- Aperçu du logo -->
            {#if formData.logoUrl}
              <div class="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p class="text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <ImageIcon size={16} />
                  Aperçu du logo
                </p>
                <div class="bg-white p-4 rounded flex items-center justify-center" style="min-height: 150px;">
                  <img
                    src={formData.logoUrl}
                    alt="Aperçu logo"
                    class="max-h-32 max-w-full object-contain"
                    on:error={(e) => e.target.src = ''}
                  />
                </div>
              </div>
            {/if}
          </div>
        </div>

        <!-- Paramètres -->
        <div>
          <h3 class="text-lg font-medium text-gray-800 mb-4">Paramètres d'affichage</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Ordre d'affichage -->
            <div>
              <label for="displayOrder" class="block text-sm font-medium text-gray-700 mb-2">
                Ordre d'affichage
              </label>
              <input
                id="displayOrder"
                type="number"
                bind:value={formData.displayOrder}
                disabled={saving}
                min="0"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
              <p class="text-xs text-gray-500 mt-1">Plus le nombre est petit, plus le sponsor apparaît en premier</p>
            </div>

            <!-- Actif -->
            <div>
              <span class="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </span>
              <label class="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  bind:checked={formData.isActive}
                  disabled={saving}
                  class="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span class="text-gray-700">Sponsor actif (visible sur le site)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-3">
        <button
          type="button"
          on:click={handleCancel}
          disabled={saving}
          class="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
        >
          <X size={18} />
          <span>Annuler</span>
        </button>
        
        <button
          type="submit"
          disabled={saving}
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition disabled:opacity-50"
        >
          <Save size={18} />
          <span>{saving ? 'Enregistrement...' : 'Enregistrer'}</span>
        </button>
      </div>
    </form>
  </div>
{/if}