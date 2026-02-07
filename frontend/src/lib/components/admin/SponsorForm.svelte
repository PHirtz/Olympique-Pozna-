<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { adminPartners } from '$lib/api';
  import { Save, X, Link, Upload, Trash2 } from 'lucide-svelte';

  export let mode = 'create';
  export let sponsorId = null;

  const API_URL = 'http://localhost:5000';

  let formData = {
    name: '',
    category: 'official_partner',
    websiteUrl: '',
    description_fr: '',
    description_en: '',
    description_pl: '',
    logoUrl: '',
    logoPath: '',
    displayOrder: 0,
    isActive: true
  };

  let loading = false;
  let saving = false;
  let errors = {};

  // Mode upload : 'file', 'url' ou 'path'
  let logoMode = 'file';
  let logoFile = null;
  let logoPreview = null;

  // Catégories disponibles
  const categories = [
    { value: 'main_sponsor', label: 'Sponsor Principal' },
    { value: 'official_partner', label: 'Partenaire Officiel' },
    { value: 'supplier', label: 'Fournisseur' },
    { value: 'media_partner', label: 'Partenaire Média' },
  ];

  // Fonction pour construire l'URL complète des images
  function getImageUrl(path) {
    if (!path) return null;
    // Si c'est déjà une URL complète, on la retourne telle quelle
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    // Sinon, on ajoute l'URL du backend
    return `${API_URL}${path}`;
  }

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
      
      // Déterminer le mode selon ce qui est rempli
      if (formData.logoUrl) {
        logoMode = 'url';
        logoPreview = formData.logoUrl;
      } else if (formData.logoPath) {
        logoMode = 'path';
        logoPreview = getImageUrl(formData.logoPath);
      }
    } catch (err) {
      alert('Erreur lors du chargement du sponsor');
      console.error(err);
    } finally {
      loading = false;
    }
  }

  function handleLogoModeChange() {
    // Réinitialiser quand on change de mode
    logoFile = null;
    formData.logoUrl = '';
    formData.logoPath = '';
    logoPreview = null;
    errors.logo = null;
    errors.logoUrl = null;
    errors.logoPath = null;
    
    const fileInput = document.getElementById('logo');
    if (fileInput) fileInput.value = '';
  }

  // ======================================
  // GESTION FICHIER
  // ======================================

  function handleLogoChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      errors.logo = 'Veuillez sélectionner une image';
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      errors.logo = 'L\'image ne doit pas dépasser 15MB';
      return;
    }

    errors.logo = null;
    logoFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      logoPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function removeLogo() {
    logoFile = null;
    logoPreview = null;
    formData.logoUrl = '';
    formData.logoPath = '';
    errors.logo = null;
    
    const fileInput = document.getElementById('logo');
    if (fileInput) fileInput.value = '';
  }

  // ======================================
  // GESTION URL
  // ======================================

  function handleLogoUrlChange() {
    errors.logoUrl = null;
    
    if (!formData.logoUrl) {
      logoPreview = null;
      return;
    }

    try {
      new URL(formData.logoUrl);
      logoPreview = formData.logoUrl;
      errors.logoUrl = null;
    } catch {
      errors.logoUrl = 'URL invalide';
      logoPreview = null;
    }
  }

  // ======================================
  // GESTION PATH
  // ======================================

  function handleLogoPathChange() {
    errors.logoPath = null;
    
    if (!formData.logoPath) {
      logoPreview = null;
      return;
    }

    // Vérifier que le chemin commence par /
    if (!formData.logoPath.startsWith('/')) {
      errors.logoPath = 'Le chemin doit commencer par /';
      logoPreview = null;
      return;
    }

    logoPreview = getImageUrl(formData.logoPath);
  }

  // ======================================
  // VALIDATION
  // ======================================

  function validateForm() {
    errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Nom requis';
    }

    if (!formData.category) {
      errors.category = 'Catégorie requise';
    }

    if (formData.websiteUrl && formData.websiteUrl.trim()) {
      try {
        new URL(formData.websiteUrl);
      } catch {
        errors.websiteUrl = 'URL invalide';
      }
    }

    if (logoMode === 'url' && formData.logoUrl) {
      try {
        new URL(formData.logoUrl);
      } catch {
        errors.logoUrl = 'URL invalide';
      }
    }

    if (formData.displayOrder < 0) {
      errors.displayOrder = 'L\'ordre doit être ≥ 0';
    }

    return Object.keys(errors).length === 0;
  }

  // ======================================
  // SUBMIT
  // ======================================

  async function handleSubmit() {
    if (!validateForm()) {
      alert('Veuillez corriger les erreurs du formulaire');
      return;
    }

    try {
      saving = true;

      const data = new FormData();
      
      // Ajouter les champs de base
      data.append('name', formData.name);
      data.append('category', formData.category);
      data.append('website_url', formData.websiteUrl || '');
      data.append('description_fr', formData.description_fr || '');
      data.append('description_en', formData.description_en || '');
      data.append('description_pl', formData.description_pl || '');
      data.append('display_order', formData.displayOrder || 0);
      data.append('is_active', formData.isActive);

      // Gestion du logo selon le mode
      if (logoMode === 'file' && logoFile) {
        data.append('logo', logoFile);
      } else if (logoMode === 'url' && formData.logoUrl) {
        data.append('logo_url', formData.logoUrl);
      } else if (logoMode === 'path' && formData.logoPath) {
        data.append('logo_path', formData.logoPath);
      }

      // Debug
      console.log('📤 Envoi FormData:');
      for (let [key, value] of data.entries()) {
        console.log(`  ${key}:`, value);
      }

      if (mode === 'create') {
        await adminPartners.create(data);
        alert('Sponsor créé avec succès !');
      } else {
        await adminPartners.update(sponsorId, data);
        alert('Sponsor mis à jour avec succès !');
      }

      goto('/admin/');
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      alert('Erreur: ' + error.message);
    } finally {
      saving = false;
    }
  }

  function handleCancel() {
    if (confirm('Annuler les modifications ?')) {
      goto('/admin/');
    }
  }
</script>

{#if loading}
  <div class="admin-container">
    <div class="loading-container">
      <div class="spinner"></div>
      <p>Chargement...</p>
    </div>
  </div>
{:else}
  <div class="admin-container">
    <div class="admin-header-section">
      <div class="admin-title">
        <Upload size={24} />
        <h1>{mode === 'create' ? 'NOUVEAU SPONSOR' : 'MODIFIER LE SPONSOR'}</h1>
      </div>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="admin-form">
      
      <!-- Logo -->
      <div class="form-section">
        <h3 class="section-title">Logo du sponsor</h3>
        
        <!-- Mode selection -->
        <div class="upload-mode-selector">
          <label class="mode-option">
            <input
              type="radio"
              name="logoMode"
              value="file"
              bind:group={logoMode}
              on:change={handleLogoModeChange}
            />
            <div class="mode-content">
              <Upload size={20} />
              <span>Uploader un fichier</span>
            </div>
          </label>
          
          <label class="mode-option">
            <input
              type="radio"
              name="logoMode"
              value="url"
              bind:group={logoMode}
              on:change={handleLogoModeChange}
            />
            <div class="mode-content">
              <Link size={20} />
              <span>URL externe</span>
            </div>
          </label>

          <label class="mode-option">
            <input
              type="radio"
              name="logoMode"
              value="path"
              bind:group={logoMode}
              on:change={handleLogoModeChange}
            />
            <div class="mode-content">
              <Upload size={20} />
              <span>Chemin local</span>
            </div>
          </label>
        </div>

        <!-- Preview -->
        <div class="photo-upload">
          {#if logoPreview}
            <div class="photo-preview">
              <img src={logoPreview} alt="Logo" on:error={() => logoPreview = null} />
              <button
                type="button"
                class="photo-remove"
                on:click={removeLogo}
                title="Supprimer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          {:else}
            <div class="photo-placeholder">
              <Upload size={60} />
              <p>Aucun logo</p>
            </div>
          {/if}

          <!-- Mode FICHIER -->
          {#if logoMode === 'file'}
            <label for="logo" class="btn-secondary">
              <Upload size={16} />
              {logoPreview ? 'Changer le logo' : 'Sélectionner un fichier'}
            </label>
            <input
              type="file"
              id="logo"
              accept="image/*"
              on:change={handleLogoChange}
              style="display: none;"
            />
            <p class="help-text">JPEG, PNG, GIF, SVG, WebP - Max 15MB</p>
            {#if errors.logo}
              <span class="error-text">{errors.logo}</span>
            {/if}
          {/if}

          <!-- Mode URL -->
          {#if logoMode === 'url'}
            <div class="url-input-group">
              <input
                type="url"
                bind:value={formData.logoUrl}
                on:input={handleLogoUrlChange}
                placeholder="https://example.com/logo.png"
                class="url-input"
                class:error={errors.logoUrl}
              />
              <button
                type="button"
                class="btn-secondary"
                on:click={handleLogoUrlChange}
                disabled={!formData.logoUrl}
              >
                Prévisualiser
              </button>
            </div>
            <p class="help-text">URL du logo (https://...)</p>
            {#if errors.logoUrl}
              <span class="error-text">{errors.logoUrl}</span>
            {/if}
          {/if}

          <!-- Mode Path -->
          {#if logoMode === 'path'}
            <div class="url-input-group">
              <input
                type="text"
                bind:value={formData.logoPath}
                on:input={handleLogoPathChange}
                placeholder="/sponsors/logo.png"
                class="url-input"
                class:error={errors.logoPath}
              />
              <button
                type="button"
                class="btn-secondary"
                on:click={handleLogoPathChange}
                disabled={!formData.logoPath}
              >
                Prévisualiser
              </button>
            </div>
            <p class="help-text">Chemin local du logo (commence par /)</p>
            {#if errors.logoPath}
              <span class="error-text">{errors.logoPath}</span>
            {/if}
          {/if}
        </div>
      </div>

      <!-- Informations principales -->
      <div class="form-section">
        <h3 class="section-title">INFORMATIONS PRINCIPALES</h3>
        
        <div class="form-grid">
          <!-- Nom -->
          <div class="form-field">
            <label for="name">Nom du sponsor <span class="required">*</span></label>
            <input
              id="name"
              type="text"
              bind:value={formData.name}
              placeholder="Ex: Le Petit Paris"
              class:error={errors.name}
              disabled={saving}
            />
            {#if errors.name}
              <span class="error-text">{errors.name}</span>
            {/if}
          </div>

          <!-- Catégorie -->
          <div class="form-field">
            <label for="category">Catégorie <span class="required">*</span></label>
            <select
              id="category"
              bind:value={formData.category}
              class:error={errors.category}
              disabled={saving}
            >
              {#each categories as cat}
                <option value={cat.value}>{cat.label}</option>
              {/each}
            </select>
            {#if errors.category}
              <span class="error-text">{errors.category}</span>
            {/if}
          </div>

          <!-- Site web -->
          <div class="form-field">
            <label for="websiteUrl">Site web</label>
            <input
              id="websiteUrl"
              type="url"
              bind:value={formData.websiteUrl}
              placeholder="https://exemple.com"
              class:error={errors.websiteUrl}
              disabled={saving}
            />
            {#if errors.websiteUrl}
              <span class="error-text">{errors.websiteUrl}</span>
            {/if}
          </div>

          <!-- Ordre d'affichage -->
          <div class="form-field">
            <label for="displayOrder">Ordre d'affichage</label>
            <input
              id="displayOrder"
              type="number"
              min="0"
              bind:value={formData.displayOrder}
              class:error={errors.displayOrder}
              disabled={saving}
            />
            <p class="help-text">Plus petit = apparaît en premier</p>
            {#if errors.displayOrder}
              <span class="error-text">{errors.displayOrder}</span>
            {/if}
          </div>
        </div>
      </div>

      <!-- Descriptions -->
      <div class="form-section">
        <h3 class="section-title">DESCRIPTIONS</h3>
        
        <div class="form-grid">
          <!-- Description FR -->
          <div class="form-field">
            <label for="description_fr">Description (Français)</label>
            <textarea
              id="description_fr"
              bind:value={formData.description_fr}
              rows="3"
              placeholder="Description du sponsor en français..."
              disabled={saving}
            ></textarea>
          </div>

          <!-- Description EN -->
          <div class="form-field">
            <label for="description_en">Description (English)</label>
            <textarea
              id="description_en"
              bind:value={formData.description_en}
              rows="3"
              placeholder="Sponsor description in English..."
              disabled={saving}
            ></textarea>
          </div>

          <!-- Description PL -->
          <div class="form-field">
            <label for="description_pl">Description (Polonais)</label>
            <textarea
              id="description_pl"
              bind:value={formData.description_pl}
              rows="3"
              placeholder="Opis partnera w języku polskim..."
              disabled={saving}
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Statut -->
      <div class="form-section">
        <label class="checkbox-label">
          <input
            type="checkbox"
            bind:checked={formData.isActive}
            disabled={saving}
          />
          <span>Sponsor actif (visible sur le site)</span>
        </label>
      </div>

      <!-- Actions -->
      <div class="form-actions">
        <button
          type="button"
          on:click={handleCancel}
          class="btn-secondary"
          disabled={saving}
        >
          <X size={16} />
          Annuler
        </button>
        <button
          type="submit"
          class="btn-primary"
          disabled={saving}
        >
          {#if saving}
            Enregistrement...
          {:else}
            <Save size={16} />
            {mode === 'create' ? 'Créer le sponsor' : 'Enregistrer'}
          {/if}
        </button>
      </div>
    </form>
  </div>
{/if}

<style>
  .admin-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 4rem 2rem;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 4px solid #e5e7eb;
    border-top-color: #1976d2;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .loading-container p {
    font-size: 1.1rem;
    color: #666;
  }

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

  .form-section {
    margin-bottom: 2rem;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1rem;
    border-bottom: 2px solid #1976d2;
    padding-bottom: 1rem;
    padding-top: 2rem;
    color: #1976d2;
  }

  .form-grid {
    display: grid;
    gap: 1.5rem;
  }

  .form-field {
    display: flex;
    flex-direction: column;
  }

  .form-field label {
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .form-field input,
  .form-field select,
  .form-field textarea {
    padding: 0.75rem;
    border: 2px solid #d0d0d0;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
  }

  .form-field input:focus,
  .form-field select:focus,
  .form-field textarea:focus {
    outline: none;
    border-color: #1976d2;
  }

  .form-field textarea {
    resize: vertical;
    min-height: 80px;
  }

  .required {
    color: #d32f2f;
  }

  .error {
    border-color: #d32f2f !important;
  }

  .error-text {
    font-size: 0.75rem;
    color: #d32f2f;
    margin-top: 0.25rem;
  }

  .help-text {
    font-size: 0.75rem;
    color: #666;
    margin-top: 0.25rem;
  }

  /* Upload mode selector */
  .upload-mode-selector {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    justify-content: center;
    font-weight: 600;
    font-size: 1rem;
  }

  .mode-option {
    flex: 1;
    cursor: pointer;
  }

  .mode-option input[type="radio"] {
    display: none;
  }

  .mode-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    border: 2px solid #d0d0d0;
    border-radius: 8px;
    background: white;
    transition: all 0.2s;
  }

  .mode-option input[type="radio"]:checked + .mode-content {
    border-color: #1976d2;
    background: #e3f2fd;
    color: #1976d2;
  }

  .mode-content:hover {
    border-color: #1976d2;
  }

  /* Photo upload */
  .photo-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .photo-preview {
    position: relative;
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  .photo-preview img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border: 2px solid #d0d0d0;
    border-radius: 8px;
    background: #f5f5f5;
  }

  .photo-remove {
    position: absolute;
    top: -8px;
    right: -8px;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #d32f2f;
    color: white;
    border: 2px solid white;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
  }

  .photo-remove:hover {
    background: #b71c1c;
    transform: scale(1.1);
  }

  .photo-placeholder {
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: #f5f5f5;
    border: 2px dashed #d0d0d0;
    border-radius: 8px;
    color: #999;
    margin: 0 auto;
  }

  /* URL input */
  .url-input-group {
    display: flex;
    gap: 0.5rem;
    width: 100%;
    max-width: 500px;
  }

  .url-input {
    flex: 1;
    padding: 0.75rem;
    border: 2px solid #d0d0d0;
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .url-input:focus {
    outline: none;
    border-color: #1976d2;
  }

  .checkbox-label {
    padding-top: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-weight: 600;
  }

  .checkbox-label input {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
    font-size: 20px;
    margin-right: 1rem;
    margin-bottom: 1rem;
  }

  .btn-primary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--op-blue-primary);
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .btn-primary:hover:not(:disabled) {
    background: #1565c0;
  }

  .btn-primary:disabled {
    background: #999;
    cursor: not-allowed;
  }

  .btn-secondary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #e0e0e0;
    color: #333;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .btn-secondary:hover:not(:disabled) {
    background: #d5d5d5;
  }

  .btn-secondary:disabled {
    background: #bbb;
    cursor: not-allowed;
  }
</style>