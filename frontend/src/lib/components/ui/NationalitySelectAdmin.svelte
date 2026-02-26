<script>
  import { onMount } from 'svelte';
  import { nationalities as nationalitiesAPI } from '$lib/api';

  export let valueEN = '';
  export let valuePL = '';
  export let required = false;
  export let disabled = false;
  export let errorEN = false;
  export let errorPL = false;

  let nationalitiesList = [];
  let loading = true;
  let loadError = false;

  onMount(async () => {
    await loadNationalities();
  });

  async function loadNationalities() {
    try {
      loading = true;
      loadError = false;
      const response = await nationalitiesAPI.getAll('en');
      nationalitiesList = response.data || [];
    } catch (err) {
      console.error('Erreur chargement nationalités:', err);
      loadError = true;
    } finally {
      loading = false;
    }
  }

  // Quand l'utilisateur sélectionne une nationalité EN, remplir automatiquement PL
  function handleNationalityChange() {
    if (!valueEN) {
      valuePL = '';
      return;
    }

    const selected = nationalitiesList.find(n => n.nameEn === valueEN);
    if (selected) {
      valuePL = selected.namePl;
    }
  }
</script>

<div class="nationality-fields">
  <!-- Nationalité EN -->
  <div class="form-field">
    <label for="nationality-en">
      Nationalité (EN) {#if required}<span class="required">*</span>{/if}
    </label>
    
    {#if loading}
      <select disabled class="loading-select">
        <option>Chargement...</option>
      </select>
    {:else if loadError}
      <select disabled class="error-select">
        <option>Erreur de chargement</option>
      </select>
    {:else}
      <select
        id="nationality-en"
        bind:value={valueEN}
        on:change={handleNationalityChange}
        {required}
        {disabled}
        class:error={errorEN}
      >
        <option value="">Sélectionner</option>
        {#each nationalitiesList as nationality (nationality.id)}
          <option value={nationality.nameEn}>
            {nationality.nameEn}
          </option>
        {/each}
      </select>
    {/if}
  </div>

  <!-- Nationalité PL (auto-rempli) -->
  <div class="form-field">
    <label for="nationality-pl">
      Nationalité (PL) {#if required}<span class="required">*</span>{/if}
    </label>
    <input
      id="nationality-pl"
      type="text"
      bind:value={valuePL}
      {disabled}
      class:error={errorPL}
      readonly
      style="background: #f5f5f5; cursor: not-allowed;"
    />
  </div>
</div>

<style>
  .nationality-fields {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
  }

  label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }

  select, input {
    padding: 0.75rem;
    border: 2px solid #d0d0d0;
    border-radius: 4px;
    font-size: 1rem;
  }

  select:focus, input:focus {
    outline: none;
    border-color: #1976d2;
  }

  .loading-select, .error-select {
    background: #f5f5f5;
    color: #999;
    cursor: not-allowed;
  }

  .error-select {
    border-color: #d32f2f;
    color: #d32f2f;
  }

  .required {
    color: #d32f2f;
  }

  .error {
    border-color: #d32f2f !important;
  }

  @media (max-width: 768px) {
    .nationality-fields {
      grid-template-columns: 1fr;
    }
  }
</style>