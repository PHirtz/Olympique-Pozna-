<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import * as adminPlayers from '$lib/api/admin/players.js';
  import { 
    Users,
    Save,
    X,
    Upload,
    Trash2
  } from 'lucide-svelte';

  // Données
  let loading = false;
  let saving = false;
  let errors = {};

  // Formulaire
  let formData = {
    teamId: '1',
    firstName: '',
    lastName: '',
    nickname: '',
    jerseyNumber: '',
    position: '',
    positionPl: '',
    birthYear: new Date().getFullYear() - 10,
    nationality: 'Poland',
    nationalityPl: 'Polska',
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

  function handlePhotoChange(event) {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 5MB');
      return;
    }

    photoFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      photoPreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    photoFile = null;
    photoPreview = null;
    
    const fileInput = document.getElementById('photo');
    if (fileInput) fileInput.value = '';
  }

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

    return Object.keys(errors).length === 0;
  }

async function handleSubmit() {
  if (!validateForm()) {
    alert('Veuillez corriger les erreurs du formulaire');
    return;
  }

  try {
    saving = true;

    const data = new FormData();
    
    console.log('📤 formData avant envoi:', formData);
    
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (photoFile) {
      data.append('photo', photoFile);
    }
    
    // Debug FormData
    console.log('📤 FormData entries:');
    for (let [key, value] of data.entries()) {
      console.log(`  ${key}:`, value);
    }

    await adminPlayers.create(data);
      alert('Joueur créé avec succès !');
      goto('/admin/players');
    } catch (error) {
      console.error('Erreur sauvegarde:', error);
      alert('Erreur: ' + error.message);
    } finally {
      saving = false;
    }
  }

  function handleCancel() {
    if (confirm('Annuler les modifications ?')) {
      goto('/admin/players');
    }
  }
</script>

<div class="admin-container">
  <div class="admin-header-section">
    <div class="admin-title">
      <Users size={24} />
      <h1>NOUVEAU JOUEUR</h1>
    </div>
  </div>

  <form on:submit|preventDefault={handleSubmit} class="admin-form">
    
    <!-- Photo -->
    <div class="form-section">
      <h3 class="section-title">Photo du joueur</h3>
      <div class="photo-upload">
        {#if photoPreview}
          <div class="photo-preview">
            <img src={photoPreview} alt="Prévisualisation" />
            <button
              type="button"
              class="photo-remove"
              on:click={removePhoto}
              title="Supprimer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        {:else}
          <div class="photo-placeholder">
            <Users size={48} />
            <p>Aucune photo</p>
          </div>
        {/if}
        
        <label for="photo" class="btn-secondary">
          <Upload size={16} />
          {photoPreview ? 'Changer la photo' : 'Upload photo'}
        </label>
        <input
          type="file"
          id="photo"
          accept="image/*"
          on:change={handlePhotoChange}
          style="display: none;"
        />
        <p class="help-text">JPEG, PNG, GIF, WebP - Max 5MB</p>
      </div>
    </div>

    <!-- Informations principales -->
    <div class="form-section">
      <h3 class="section-title">INFORMATIONS PRINCIPALES</h3>
      
      <div class="form-grid">
        <!-- Équipe (TODO: charger dynamiquement) -->
        <div class="form-field">
          <label for="teamId">Équipe <span class="required">*</span></label>
          <input
            id="teamId"
            type="number"
            bind:value={formData.teamId}
            class:error={errors.teamId}
            placeholder="ID de l'équipe (temporaire)"
          />
          {#if errors.teamId}
            <span class="error-text">{errors.teamId}</span>
          {/if}
        </div>

        <!-- Prénom -->
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

        <!-- Nom -->
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

        <!-- Surnom -->
        <div class="form-field">
          <label for="nickname">Surnom</label>
          <input
            id="nickname"
            type="text"
            bind:value={formData.nickname}
            placeholder="Ex: Ozzy, Guti..."
          />
        </div>

        <!-- Numéro de maillot -->
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

        <!-- Année de naissance -->
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
        <!-- Position (FR) -->
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

        <!-- Position (PL) -->
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
        <!-- Nationalité (EN) -->
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

        <!-- Nationalité (PL) -->
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
          Créer
        {/if}
      </button>
    </div>
  </form>
</div>

<style>
  .photo-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .photo-preview {
    position: relative;
    width: 150px;
    height: 150px;
  }

  .photo-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 2px solid #d0d0d0;
    border-radius: 8px;
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
    width: 150px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: #f5f5f5;
    border: 2px dashed #d0d0d0;
    border-radius: 8px;
    color: #999;
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