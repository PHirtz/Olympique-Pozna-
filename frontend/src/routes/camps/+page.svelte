<script>
  import { _, json } from 'svelte-i18n';
  import { Send, Calendar, MapPin, Users, Phone, Mail } from 'lucide-svelte';
  import { sendContactForm } from '$lib/api/contact';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  
  /** @type {import('./$types').PageData} */
  export let data;

  let formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    message: '',
    category: 'inscription'
  };

  let loading = false;
  let success = false;
  let error = '';
  let fieldErrors = {};

  async function handleSubmit() {
    error = '';
    fieldErrors = {};
    
    // Validation côté client
    if (!formData.firstName || formData.firstName.length < 2) {
      error = 'Le prénom doit contenir au moins 2 caractères';
      return;
    }
    
    if (!formData.lastName || formData.lastName.length < 2) {
      error = 'Le nom doit contenir au moins 2 caractères';
      return;
    }
    
    if (!formData.email) {
      error = 'L\'email est obligatoire';
      return;
    }
    
    if (!formData.message || formData.message.length < 10) {
      error = 'Le message doit contenir au moins 10 caractères';
      return;
    }

    loading = true;
    success = false;

    try {
      const subjectMap = {
        'inscription': 'Inscription Camp Olympique - Février 2026',
        'information': 'Demande d\'information - Camp Olympique'
      };

      let fullMessage = formData.message;
      if (formData.age) {
        fullMessage = `Âge du participant: ${formData.age} ans\n\n${formData.message}`;
      }

      const contactData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: subjectMap[formData.category] || 'Demande Camp Olympique',
        category: formData.category,
        message: fullMessage
      };

      const response = await sendContactForm(contactData);

      if (response.success) {
        success = true;
        
        formData = {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          age: '',
          message: '',
          category: 'inscription'
        };

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setTimeout(() => {
          success = false;
        }, 8000);
      } else {
        if (response.errors && Array.isArray(response.errors)) {
          fieldErrors = response.errors.reduce((acc, err) => {
            acc[err.field] = err.message;
            return acc;
          }, {});
          error = 'Veuillez corriger les erreurs ci-dessous';
        } else {
          error = response.message || 'Erreur lors de l\'envoi. Veuillez réessayer.';
        }
      }
    } catch (err) {
      console.error('Erreur envoi formulaire camps:', err);
      error = err.message || 'Erreur lors de l\'envoi. Veuillez réessayer.';
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Le Camp Olympique - Olympique Poznań</title>
  <meta name="description" content="Rejoignez le Camp Olympique à Skarbimierz ! Stage de football intensif avec hébergement et activités." />
</svelte:head>

<Navigation2 {data} />

<div class="camps-page">
  <!-- Hero avec pub -->
  <section class="hero-camps">
    <div class="container">
      <img src="/pubcamp.png" alt="Le Camp Olympique - Luty 2026" class="camp-poster" />
    </div>
  </section>

  <!-- Informations du camp -->
  <section class="camp-info">
    <div class="container">
      <div class="info-grid">
        <div class="info-card">
          <Calendar size={32} />
          <h3>{$_('camps.dates')}</h3>
          <p><strong>{$_('camps.info.dates')}</strong></p>
          <p class="detail">{$_('camps.info.duration')}</p>
        </div>

        <div class="info-card">
          <MapPin size={32} />
          <h3>{$_('camps.lieu')}</h3>
          <p><strong>{$_('camps.info.location')}</strong></p>
          <p class="detail">{$_('camps.info.hotel')}</p>
        </div>

        <div class="info-card">
          <Users size={32} />
          <h3>{$_('camps.programme.subtitle')}</h3>
          <p><strong>{$_('camps.info.training')}</strong></p>
          <p class="detail">{$_('camps.info.activities')}</p>
        </div>
      </div>

      <!-- ✅ NOUVELLE SECTION : Galerie photos du camp -->
      <div class="photos-grid">
        <div class="photo-card">
          <img 
            src="/2.jpg" 
            alt="Entraînement au Camp Olympique"
            on:error={(e) => {
              e.target.src = '/logo.png';
            }}
          />
        </div>
        <div class="photo-card">
          <img 
            src="/3.jpg" 
            alt="Activités sportives au camp"
            on:error={(e) => {
              e.target.src = '/logo.png';
            }}
          />
        </div>
        <div class="photo-card">
          <img 
            src="/4.jpg" 
            alt="Hébergement et installations"
            on:error={(e) => {
              e.target.src = '/logo.png';
            }}
          />
        </div>
      </div>

      <div class="activities">
        <h2>{$_('camps.programme.title')}</h2>
        <ul>
          {#each $json('camps.programme.programDescription') as item}
            <li>{item}</li>
          {/each}
        </ul>
      </div>
    </div>
  </section>

  <!-- Formulaire d'inscription -->
  <section class="contact-form-section">
    <div class="container">
      <div class="form-header">
        <h2>{$_('camps.formulaire.title')}</h2>
        <p>{$_('camps.formulaire.description')}</p>
      </div>

      {#if success}
        <div class="alert alert-success">
          <div class="alert-icon">✓</div>
          <div class="alert-content">
            <strong>Demande envoyée avec succès !</strong>
            <p>Nous avons bien reçu votre demande et vous répondrons dans les plus brefs délais.</p>
          </div>
        </div>
      {/if}

      {#if error}
        <div class="alert alert-error">
          <div class="alert-icon">⚠</div>
          <div class="alert-content">
            <strong>Erreur</strong>
            <p>{error}</p>
          </div>
        </div>
      {/if}

      <form on:submit|preventDefault={handleSubmit} class="camp-form">
        <div class="form-row">
          <div class="form-group" class:has-error={fieldErrors.firstName}>
            <label for="firstName">
              {$_('contact.form.firstName')} *
            </label>
            <input 
              type="text" 
              id="firstName" 
              bind:value={formData.firstName}
              placeholder={$_('contact.form.firstNamePlaceholder')}
              required
              disabled={loading}
            />
            {#if fieldErrors.firstName}
              <span class="error-text">{fieldErrors.firstName}</span>
            {/if}
          </div>

          <div class="form-group" class:has-error={fieldErrors.lastName}>
            <label for="lastName">
              {$_('contact.form.lastName')} *
            </label>
            <input 
              type="text" 
              id="lastName" 
              bind:value={formData.lastName}
              placeholder={$_('contact.form.lastNamePlaceholder')}
              required
              disabled={loading}
            />
            {#if fieldErrors.lastName}
              <span class="error-text">{fieldErrors.lastName}</span>
            {/if}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group" class:has-error={fieldErrors.email}>
            <label for="email">
              {$_('contact.form.email')} *
            </label>
            <input 
              type="email" 
              id="email" 
              bind:value={formData.email}
              placeholder={$_('contact.form.emailPlaceholder')}
              required
              disabled={loading}
            />
            {#if fieldErrors.email}
              <span class="error-text">{fieldErrors.email}</span>
            {/if}
          </div>

          <div class="form-group" class:has-error={fieldErrors.phone}>
            <label for="phone">
              {$_('contact.form.phone')}
            </label>
            <input 
              type="tel" 
              id="phone" 
              bind:value={formData.phone}
              placeholder={$_('contact.form.phonePlaceholder')}
              disabled={loading}
            />
            {#if fieldErrors.phone}
              <span class="error-text">{fieldErrors.phone}</span>
            {/if}
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="age">
              {$_('contact.form.age')}
            </label>
            <input 
              type="number" 
              id="age" 
              bind:value={formData.age}
              min="5"
              max="80"
              placeholder="Ex: 12"
              disabled={loading}
            />
          </div>

          <div class="form-group">
            <label for="category">
              {$_('camps.formulaire.type.typeName')}
            </label>
            <select id="category" bind:value={formData.category} disabled={loading}>
              <option value="inscription">{$_('camps.formulaire.type.registration')}</option>
              <option value="information">{$_('camps.formulaire.type.info')}</option>
            </select>
          </div>
        </div>

        <div class="form-group" class:has-error={fieldErrors.message}>
          <label for="message">
            {$_('contact.form.message')} *
          </label>
          <textarea 
            id="message" 
            bind:value={formData.message}
            rows="5"
            placeholder={$_('contact.form.messagePlaceholder')}
            disabled={loading}
            required
          ></textarea>
          <small class="char-count">
            {formData.message.length} / 10 {$_('contact.form.charCountMin')}
          </small>
          {#if fieldErrors.message}
            <span class="error-text">{fieldErrors.message}</span>
          {/if}
        </div>

        <button type="submit" class="submit-btn" disabled={loading}>
          {#if loading}
            <span class="spinner"></span>
            <span>Envoi en cours...</span>
          {:else}
            <Send size={20} />
            <span>{$_('contact.form.submit')}</span>
          {/if}
        </button>
      </form>

      <div class="contact-info">
        <h3>{$_('camps.formulaire.contact')}</h3>
        <div class="contact-details">
          <a href="tel:+48669091910" class="contact-link">
            <Phone size={20} />
            <span>+48 669 091 910</span>
          </a>
          <a href="mailto:olympique.poznan@wielkopolskizpn.pl" class="contact-link">
            <Mail size={20} />
            <span>olympique.poznan@wielkopolskizpn.pl</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</div>

<Footer {data} />

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .hero-camps {
    padding: 2rem 0;
    background: #f8f9fa;
  }

  .camp-poster {
    width: 100%;
    max-width: 800px;
    height: auto;
    display: block;
    margin: 0 auto;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .camp-info {
    padding: 3rem 0;
    background: white;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .info-card {
    text-align: center;
    padding: 2rem;
    background: #f8f9fa;
    border: 2px solid #1a4d7a;
    border-radius: 0.5rem;
  }

  .info-card :global(svg) {
    color: #c9a961;
    margin: 0 auto 1rem;
  }

  .info-card h3 {
    font-size: 1.25rem;
    color: #1a4d7a;
    margin-bottom: 0.5rem;
  }

  .info-card p {
    margin: 0.25rem 0;
    color: #333;
  }

  .info-card .detail {
    font-size: 0.875rem;
    color: #666;
  }

  /* ✅ NOUVELLE SECTION : Galerie photos */
  .photos-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .photo-card {
    position: relative;
    overflow: hidden;
    background: #f8f9fa;
    border: 2px solid #1a4d7a;
    border-radius: 0.5rem;
    aspect-ratio: 4/3;
  }

  .photo-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }

  .photo-card:hover img {
    transform: scale(1.05);
  }

  .activities {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 0.5rem;
  }

  .activities h2 {
    color: #1a4d7a;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .activities ul {
    list-style: none;
    padding: 0;
    max-width: 700px;
    margin: 0 auto;
  }

  .activities li {
    padding: 0.75rem 0;
    border-bottom: 1px solid #e0e0e0;
    color: #333;
  }

  .activities li:last-child {
    border-bottom: none;
  }

  .contact-form-section {
    padding: 3rem 0;
    background: linear-gradient(180deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
  }

  .form-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .form-header h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: white;
  }

  .form-header p {
    color: #c9a961;
  }

  .alert {
    display: flex;
    gap: 1rem;
    padding: 1.25rem;
    margin: 0 auto 2rem;
    max-width: 800px;
    border-radius: 0.5rem;
    align-items: flex-start;
  }

  .alert-success {
    background: #d4edda;
    color: #155724;
    border: 2px solid #c3e6cb;
  }

  .alert-error {
    background: #f8d7da;
    color: #721c24;
    border: 2px solid #f5c6cb;
  }

  .alert-icon {
    font-size: 1.5rem;
    font-weight: bold;
    flex-shrink: 0;
  }

  .alert-content {
    flex: 1;
  }

  .alert-content strong {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 1.05rem;
  }

  .alert-content p {
    margin: 0;
    font-size: 0.95rem;
  }

  .camp-form {
    background: white;
    padding: 2rem;
    border-radius: 0.5rem;
    max-width: 800px;
    margin: 0 auto 2rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  .form-group label {
    font-weight: 600;
    color: #1a4d7a;
    margin-bottom: 0.5rem;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.75rem;
    border: 2px solid #e0e0e0;
    border-radius: 0.25rem;
    font-size: 1rem;
    transition: border-color 0.2s;
    font-family: inherit;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #1a4d7a;
  }

  .form-group input:disabled,
  .form-group select:disabled,
  .form-group textarea:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .has-error input,
  .has-error textarea {
    border-color: #ef4444;
  }
  
  .error-text {
    display: block;
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
  
  .char-count {
    display: block;
    font-size: 0.875rem;
    color: #64748b;
    margin-top: 0.25rem;
    padding-bottom: 1rem;
  }

  .submit-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background: linear-gradient(180deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    border: none;
    border-radius: 0.25rem;
    font-size: 1.125rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .contact-info {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .contact-info h3 {
    color: #c9a961;
    margin-bottom: 1rem;
  }

  .contact-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .contact-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: white;
    text-decoration: none;
    font-size: 1.125rem;
    transition: color 0.2s;
  }

  .contact-link:hover {
    color: #c9a961;
  }

  @media (min-width: 640px) {
    .info-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .photos-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .form-row {
      grid-template-columns: repeat(2, 1fr);
    }

    .contact-details {
      flex-direction: row;
      justify-content: center;
      gap: 2rem;
    }
  }

  @media (min-width: 768px) {
    .container {
      padding: 0 2rem;
    }

    .hero-camps {
      padding: 3rem 0;
    }

    .camp-info {
      padding: 4rem 0;
    }

    .contact-form-section {
      padding: 4rem 0;
    }

    .camp-form {
      padding: 3rem;
    }
  }
</style>