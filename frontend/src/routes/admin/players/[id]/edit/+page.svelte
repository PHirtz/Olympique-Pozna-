<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import * as adminPlayers from '$lib/api/admin/players.js';
  import { 
    Users,
    Save,
    X,
    Upload,
    Trash2,
    Link
  } from 'lucide-svelte';

  let playerId = null;
  let loading = true;
  let saving = false;
  let errors = {};
  let existingPhotoPath = null;

  // MODE UPLOAD : 'file' ou 'url'
  let uploadMode = 'file';

  // Formulaire
  let formData = {
    teamId: '',
    firstName: '',
    lastName: '',
    nickname: '',
    jerseyNumber: '',
    position: '',
    positionPl: '',
    birthYear: new Date().getFullYear() - 10,
    nationality: 'Poland',
    nationalityPl: 'Polska',
    photoUrl: '',
    photoBase64: null,
    distinction1: '',
    distinction2: '',
    distinction3: '',
    distinction4: '',
    distinction5: '',
    isActive: true
  };

  // Photo
  let photoFile = null;
  let photoPreview = null;

  // Options
  const positions = {
    'Goalkeeper': 'Bramkarz',
    'Defender': 'Obrońca',
    'Wing-back': 'Wahadłowy',
    'Midfielder': 'Pomocnik',
    'Forward': 'Napastnik'
  };

  const nationalities = {
    'Poland': 'Polska',
    'France': 'Francja',
    'England': 'Anglia',
    'Germany': 'Niemcy',
    'Spain': 'Hiszpania',
    'Italy': 'Włochy',
    'Brazil': 'Brazylia',
    'Ukraine': 'Ukraina',
    'Algeria': 'Algeria',
    'Ethiopia': 'Etiopia',
    'Nigeria': 'Nigeria',
    'Rwanda': 'Rwanda',
    'Senegal': 'Senegal',
    'Turkey': 'Turcja',
    'Zimbabwe': 'Zimbabwe',
    'Belarus': 'Białoruś'
  };

  onMount(async () => {
    playerId = $page.params?.id;
    if (playerId) {
      await loadPlayer();
    }
    loading = false;
  });

  async function loadPlayer() {
    try {
      const response = await adminPlayers.getById(playerId);
      const player = response.data;

      formData = {
        teamId: player.teamId || '',
        firstName: player.firstName,
        lastName: player.lastName,
        nickname: player.nickname || '',
        jerseyNumber: player.jerseyNumber || '',
        position: player.position,
        positionPl: player.positionPl,
        birthYear: player.birthYear,
        nationality: player.nationality,
        nationalityPl: player.nationalityPl,
        photoUrl: '',
        distinction1: player.distinction1 || '',
        distinction2: player.distinction2 || '',
        distinction3: player.distinction3 || '',
        distinction4: player.distinction4 || '',
        distinction5: player.distinction5 || '',
        isActive: player.isActive
      };

      if (player.photoUrl) { 
        existingPhotoPath = player.photoUrl;
        photoPreview = player.photoUrl;
        
        // Détecter si c'est une URL externe ou un fichier local
        if (player.photoUrl.startsWith('http://') || player.photoUrl.startsWith('https://')) {
          // Si c'est une URL complète et qu'elle ne contient pas notre backend
          if (!player.photoUrl.includes('localhost') && !player.photoUrl.includes('olympiquepoznan.pl')) {
            uploadMode = 'url';
            formData.photoUrl = player.photoUrl;
          }
        }
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du chargement du joueur');
      goto('/admin/players');
    }
  }

  // ======================================
  // GESTION UPLOAD MODE
  // ======================================

  function handleUploadModeChange() {
    // Réinitialiser les données selon le mode
    photoFile = null;
    errors.photo = null;
    errors.photoUrl = null;
    
    if (uploadMode === 'file') {
      formData.photoUrl = '';
      photoPreview = existingPhotoPath;
    } else {
      photoPreview = formData.photoUrl || null;
    }
    
    const fileInput = document.getElementById('photo');
    if (fileInput) fileInput.value = '';
  }

  // ======================================
  // GESTION FICHIER - MODIFIÉ
  // ======================================
  function handlePhotoChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      errors.photo = 'Veuillez sélectionner une image';
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      errors.photo = 'L\'image ne doit pas dépasser 15MB';
      return;
    }

    errors.photo = null;
    photoFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview = e.target.result;
      formData.photoBase64 = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    photoFile = null;
    photoPreview = existingPhotoPath || null;
    formData.photoBase64 = null;
    errors.photo = null;
    
    const fileInput = document.getElementById('photo');
    if (fileInput) fileInput.value = '';
  }

  // ======================================
  // GESTION URL
  // ======================================

  function handlePhotoUrlChange() {
    errors.photoUrl = null;
    
    if (!formData.photoUrl) {
      photoPreview = existingPhotoPath;
      return;
    }

    // Validation basique de l'URL
    try {
      new URL(formData.photoUrl);
      photoPreview = formData.photoUrl;
      errors.photoUrl = null;
    } catch {
      errors.photoUrl = 'URL invalide';
      photoPreview = existingPhotoPath;
    }
  }

  // ======================================
  // AUTRES HANDLERS
  // ======================================

  function handlePositionChange() {
    if (formData.position && positions[formData.position]) {
      formData.positionPl = positions[formData.position];
    }
  }

  function handleNationalityChange() {
    if (formData.nationality && nationalities[formData.nationality]) {
      formData.nationalityPl = nationalities[formData.nationality];
    }
  }

  // ======================================
  // VALIDATION
  // ======================================

  function validateForm() {
    errors = {};

    if (!formData.teamId) errors.teamId = 'Équipe requise';
    if (!formData.firstName.trim()) errors.firstName = 'Prénom requis';
    if (!formData.lastName.trim()) errors.lastName = 'Nom requis';
    if (!formData.position) errors.position = 'Poste requis';
    if (!formData.positionPl.trim()) errors.positionPl = 'Poste en polonais requis';
    if (!formData.birthYear) errors.birthYear = 'Année de naissance requise';
    if (!formData.nationality.trim()) errors.nationality = 'Nationalité requise';
    if (!formData.nationalityPl.trim()) errors.nationalityPl = 'Nationalité en polonais requise';

    if (formData.jerseyNumber && (formData.jerseyNumber < 0 || formData.jerseyNumber > 99)) {
      errors.jerseyNumber = 'Numéro entre 0 et 99';
    }

    const currentYear = new Date().getFullYear();
    if (formData.birthYear < 1950 || formData.birthYear > currentYear) {
      errors.birthYear = `Année entre 1950 et ${currentYear}`;
    }

    // Validation photo selon le mode
    if (uploadMode === 'url' && formData.photoUrl) {
      try {
        new URL(formData.photoUrl);
      } catch {
        errors.photoUrl = 'URL invalide';
      }
    }

    return Object.keys(errors).length === 0;
  }

  // ======================================
  // SUBMIT - MODIFIÉ
  // ======================================
  async function handleSubmit() {
    if (!validateForm()) {
      alert('Veuillez corriger les erreurs du formulaire');
      return;
    }

    try {
      saving = true;

      let requestData;

      // Si mode FILE avec base64 → envoyer en JSON
      if (uploadMode === 'file' && formData.photoBase64) {
        const payload = { ...formData };
        delete payload.photoUrl; // Retirer photoUrl
        
        requestData = payload; // ← PAS DE JSON.stringify !
        
      } else {
        // Sinon → envoyer en FormData (pour photoUrl)
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== 'photoUrl' && key !== 'photoBase64') {
            data.append(key, value !== null && value !== '' ? value : '');
          }
        });
        
        if (uploadMode === 'url' && formData.photoUrl) {
          data.append('photoUrl', formData.photoUrl);
        }
        
        requestData = data;
      }

      // Debug
      console.log('📤 Mode:', uploadMode);
      console.log('📤 Type:', uploadMode === 'file' && formData.photoBase64 ? 'JSON' : 'FormData');

      await adminPlayers.update(playerId, requestData);
      alert('Joueur modifié avec succès !');
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

<div class="admin-container">
  <div class="admin-header-section">
    <div class="admin-title">
      <Users size={24} />
      <h1>MODIFIER UN JOUEUR</h1>
    </div>
  </div>

  {#if loading}
    <div class="loading">Chargement...</div>
  {:else}
    <form on:submit|preventDefault={handleSubmit} class="admin-form">
      
      <!-- Photo -->
      <div class="form-section">
        <h3 class="section-title">Photo du joueur</h3>
        
        <!-- Mode selection -->
        <div class="upload-mode-selector">
          <label class="mode-option">
            <input
              type="radio"
              name="uploadMode"
              value="file"
              bind:group={uploadMode}
              on:change={handleUploadModeChange}
            />
            <div class="mode-content">
              <Upload size={20} />
              <span>Uploader un fichier</span>
            </div>
          </label>
          
          <label class="mode-option">
            <input
              type="radio"
              name="uploadMode"
              value="url"
              bind:group={uploadMode}
              on:change={handleUploadModeChange}
            />
            <div class="mode-content">
              <Link size={20} />
              <span>Utiliser une URL</span>
            </div>
          </label>
        </div>

        <!-- Preview -->
        <div class="photo-upload">
          {#if photoPreview}
            <div class="photo-preview">
              <img src={photoPreview} alt="Prévisualisation" />
              <button
                type="button"
                class="photo-remove"
                on:click={uploadMode === 'file' ? removePhoto : () => { formData.photoUrl = ''; photoPreview = existingPhotoPath; }}
                title="Supprimer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          {:else}
            <div class="photo-placeholder">
              <Users size={60} />
              <p>Aucune photo</p>
            </div>
          {/if}

          <!-- Mode FICHIER -->
          {#if uploadMode === 'file'}
            <label for="photo" class="btn-secondary">
              <Upload size={16} />
              {photoFile ? 'Changer la photo' : (existingPhotoPath ? 'Remplacer la photo' : 'Sélectionner un fichier')}
            </label>
            <input
              type="file"
              id="photo"
              accept="image/*"
              on:change={handlePhotoChange}
              style="display: none;"
            />
            <p class="help-text">JPEG, PNG, GIF, WebP - Max 15MB</p>
            {#if errors.photo}
              <span class="error-text">{errors.photo}</span>
            {/if}
          {/if}

          <!-- Mode URL -->
          {#if uploadMode === 'url'}
            <div class="url-input-group">
              <input
                type="url"
                bind:value={formData.photoUrl}
                on:input={handlePhotoUrlChange}
                placeholder="https://example.com/photo.jpg"
                class="url-input"
                class:error={errors.photoUrl}
              />
              <button
                type="button"
                class="btn-secondary"
                on:click={handlePhotoUrlChange}
                disabled={!formData.photoUrl}
              >
                Prévisualiser
              </button>
            </div>
            <p class="help-text">URL de l'image (https://...)</p>
            {#if errors.photoUrl}
              <span class="error-text">{errors.photoUrl}</span>
            {/if}
          {/if}
        </div>
      </div>

      <!-- Informations principales -->
      <div class="form-section">
        <h3 class="section-title">INFORMATIONS PRINCIPALES</h3>
        
        <div class="form-grid">
          <div class="form-field">
            <label for="teamId">Équipe <span class="required">*</span></label>
            <input
              id="teamId"
              type="number"
              bind:value={formData.teamId}
              class:error={errors.teamId}
              placeholder="ID de l'équipe"
            />
            {#if errors.teamId}
              <span class="error-text">{errors.teamId}</span>
            {/if}
          </div>

          <div class="form-field">
            <label for="firstName">Prénom <span class="required">*</span></label>
            <input
              id="firstName"
              type="text"
              bind:value={formData.firstName}
              class:error={errors.firstName}
            />
            {#if errors.firstName}
              <span class="error-text">{errors.firstName}</span>
            {/if}
          </div>

          <div class="form-field">
            <label for="lastName">Nom <span class="required">*</span></label>
            <input
              id="lastName"
              type="text"
              bind:value={formData.lastName}
              class:error={errors.lastName}
            />
            {#if errors.lastName}
              <span class="error-text">{errors.lastName}</span>
            {/if}
          </div>

          <div class="form-field">
            <label for="nickname">Surnom</label>
            <input
              id="nickname"
              type="text"
              bind:value={formData.nickname}
              placeholder="Ex: Ozzy, Guti..."
            />
          </div>

          <div class="form-field">
            <label for="jerseyNumber">Numéro de maillot</label>
            <input
              id="jerseyNumber"
              type="number"
              min="0"
              max="99"
              bind:value={formData.jerseyNumber}
              class:error={errors.jerseyNumber}
            />
            {#if errors.jerseyNumber}
              <span class="error-text">{errors.jerseyNumber}</span>
            {/if}
          </div>

          <div class="form-field">
            <label for="birthYear">Année de naissance <span class="required">*</span></label>
            <input
              id="birthYear"
              type="number"
              min="1950"
              max={new Date().getFullYear()}
              bind:value={formData.birthYear}
              class:error={errors.birthYear}
            />
            {#if errors.birthYear}
              <span class="error-text">{errors.birthYear}</span>
            {/if}
          </div>
        </div>
      </div>

      <!-- Poste -->
      <div class="form-section">
        <h3 class="section-title">POSTE</h3>
        
        <div class="form-grid">
          <div class="form-field">
            <label for="position">Poste (FR) <span class="required">*</span></label>
            <select
              id="position"
              bind:value={formData.position}
              on:change={handlePositionChange}
              class:error={errors.position}
            >
              <option value="">Sélectionner</option>
              {#each Object.keys(positions) as pos}
                <option value={pos}>{pos}</option>
              {/each}
            </select>
            {#if errors.position}
              <span class="error-text">{errors.position}</span>
            {/if}
          </div>

          <div class="form-field">
            <label for="positionPl">Poste (PL) <span class="required">*</span></label>
            <input
              id="positionPl"
              type="text"
              bind:value={formData.positionPl}
              class:error={errors.positionPl}
            />
            {#if errors.positionPl}
              <span class="error-text">{errors.positionPl}</span>
            {/if}
          </div>
        </div>
      </div>

      <!-- Nationalité -->
      <div class="form-section">
        <h3 class="section-title">NATIONALITÉ</h3>
        
        <div class="form-grid">
          <div class="form-field">
            <label for="nationality">Nationalité (EN) <span class="required">*</span></label>
            <select
              id="nationality"
              bind:value={formData.nationality}
              on:change={handleNationalityChange}
              class:error={errors.nationality}
            >
              <option value="">Sélectionner</option>
              {#each Object.keys(nationalities) as nat}
                <option value={nat}>{nat}</option>
              {/each}
            </select>
            {#if errors.nationality}
              <span class="error-text">{errors.nationality}</span>
            {/if}
          </div>

          <div class="form-field">
            <label for="nationalityPl">Nationalité (PL) <span class="required">*</span></label>
            <input
              id="nationalityPl"
              type="text"
              bind:value={formData.nationalityPl}
              class:error={errors.nationalityPl}
            />
            {#if errors.nationalityPl}
              <span class="error-text">{errors.nationalityPl}</span>
            {/if}
          </div>
        </div>
      </div>

      <!-- Distinctions -->
      <div class="form-section">
        <h3 class="section-title">DISTINCTIONS</h3>
        
        <div class="form-grid">
          {#each [1, 2, 3, 4, 5] as i}
            <div class="form-field">
              <label for="distinction{i}">Distinction {i}</label>
              <input
                id="distinction{i}"
                type="text"
                bind:value={formData[`distinction${i}`]}
                placeholder="Ex: Cadre WZPN U13..."
              />
            </div>
          {/each}
        </div>
      </div>

      <!-- Statut -->
      <div class="form-section">
        <label class="checkbox-label">
          <input
            type="checkbox"
            bind:checked={formData.isActive}
          />
          <span>Joueur actif</span>
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
            Sauvegarde...
          {:else}
            <Save size={16} />
            Enregistrer
          {/if}
        </button>
      </div>
    </form>
  {/if}
</div>

<style>
  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }

  .admin-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem;
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
    gap: 0.5rem;
    background: var(--op-blue-primary);
    color: white;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    text-decoration: none;
    transition: background 0.2s ease;
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
    text-decoration: none;
    transition: background 0.2s ease;
    border: none;
    cursor: pointer;
  }
  .btn-secondary:hover {
    background: #d5d5d5;
  }
  .btn-secondary:disabled {
    background: #bbb;
    cursor: not-allowed;
  }

.form-grid {
  display: grid;
  gap: 1.5rem;
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

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  border-bottom: 2px solid #1976d2;
  padding-bottom: 1rem;
  padding-top: 2rem;
  color: #1976d2;
}

  /* Mode selector */
  .upload-mode-selector {
    display: flex;
    gap: 4rem;
    margin-bottom: 2rem;
    justify-content: center;
    align-items: center;
    font-weight: 900;
    font-size: 1.5rem;
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

  .help-text {
    font-size: 0.75rem;
    color: #666;
    text-align: center;
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
    display: block;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }

  .checkbox-label input {
    width: 18px;
    height: 18px;
  }
</style>