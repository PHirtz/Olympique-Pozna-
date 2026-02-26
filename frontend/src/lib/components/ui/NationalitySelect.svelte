<script>
  import { onMount } from 'svelte';
  import { locale } from 'svelte-i18n';
  import { nationalities as nationalitiesAPI } from '$lib/api';

  export let value = ''; // Valeur sélectionnée (binding)
  export let required = false;
  export let disabled = false;
  export let placeholder = 'Sélectionnez une nationalité';

  let nationalitiesList = [];
  let loading = true;
  let error = false;

  // Recharger quand la langue change
  $: if ($locale) {
    loadNationalities($locale);
  }

  async function loadNationalities(currentLocale) {
    try {
      loading = true;
      error = false;
      const response = await nationalitiesAPI.getAll(currentLocale);
      nationalitiesList = response.data || [];
    } catch (err) {
      console.error('Erreur chargement nationalités:', err);
      error = true;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadNationalities($locale);
  });

  // Obtenir le nom affiché selon la langue
  function getDisplayName(nationality) {
    if ($locale === 'pl') return nationality.namePl;
    if ($locale === 'en') return nationality.nameEn;
    return nationality.nameFr;
  }
</script>

<select bind:value {required} {disabled} class="nationality-select">
  <option value="">{placeholder}</option>
  
  {#if loading}
    <option disabled>Chargement...</option>
  {:else if error}
    <option disabled>Erreur de chargement</option>
  {:else}
    {#each nationalitiesList as nationality (nationality.id)}
      <option value={getDisplayName(nationality)}>
        {getDisplayName(nationality)}
      </option>
    {/each}
  {/if}
</select>

<style>
  .nationality-select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    font-size: 1rem;
    background: white;
    cursor: pointer;
  }

  .nationality-select:focus {
    outline: none;
    border-color: #1a4d7a;
    box-shadow: 0 0 0 3px rgba(26, 77, 122, 0.1);
  }

  .nationality-select:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }
</style>