<script>
  import { sendContactForm } from '$lib/api/contact';

  let firstName = '';
  let lastName = '';
  let email = '';
  let phone = '';
  let subject = '';
  let message = '';
  let loading = false;
  let success = false;
  let error = '';

  /**
   * @param {Event & { currentTarget: HTMLFormElement }} e
   */
  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!firstName || !lastName || !email || !subject || !message) {
      error = "Veuillez remplir tous les champs obligatoires";
      return;
    }

    loading = true;
    error = '';
    success = false;

    try {
    const response = await sendContactForm({
    firstName,
    lastName,
    email,
    phone,
    subject,
    message
    });

      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      success = true;
      
      // Réinitialiser le formulaire
      firstName = '';
      lastName = '';
      email = '';
      phone = '';
      subject = '';
      message = '';
      
      setTimeout(() => {
        success = false;
      }, 5000);
      
    } catch (/** @type {any} */ err) {
      error = err.message || "Erreur lors de l'envoi du message";
      console.error("Erreur contact:", err);
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Contact - Olympique Poznań</title>
  <meta name="description" content="Contactez Olympique Poznań" />
</svelte:head>

<div class="menu-logo">
  <a href="/" class="logo-card">
    <img src="/logo.png" alt="Logo Olympique Poznań" class="logo" />
  </a>
</div>

<section class="contact-page">
  <div class="contact-card">
    <h1>Contactez-nous</h1>
    <p class="subtitle">Une question ? N'hésitez pas à nous écrire !</p>

    <form on:submit={handleSubmit}>
      <div class="form-row">
        <label>
          Prénom *
          <input 
            type="text" 
            bind:value={firstName} 
            placeholder="Votre prénom" 
            required 
          />
        </label>

        <label>
          Nom *
          <input 
            type="text" 
            bind:value={lastName} 
            placeholder="Votre nom" 
            required 
          />
        </label>
      </div>

      <div class="form-row">
        <label>
          Email *
          <input 
            type="email" 
            bind:value={email} 
            placeholder="votre.email@example.com" 
            required 
          />
        </label>

        <label>
          Téléphone
          <input 
            type="tel" 
            bind:value={phone} 
            placeholder="+33 6 12 34 56 78" 
          />
        </label>
      </div>

      <label>
        Sujet *
        <select bind:value={subject} required>
          <option value="">-- Choisissez un sujet --</option>
          <option value="inscription">Inscription / Rejoindre le club</option>
          <option value="stage">Stage de football</option>
          <option value="equipe">Informations sur une équipe</option>
          <option value="match">Renseignements matchs</option>
          <option value="partenariat">Partenariat</option>
          <option value="autre">Autre demande</option>
        </select>
      </label>

      <label>
        Message *
        <textarea 
          bind:value={message} 
          placeholder="Votre message..." 
          rows="6"
          required
        ></textarea>
      </label>

      {#if success}
        <p class="success">✅ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.</p>
      {/if}

      {#if error}
        <p class="error">{error}</p>
      {/if}

      <button type="submit" disabled={loading}>
        {loading ? 'Envoi en cours...' : 'Envoyer le message'}
      </button>
    </form>

    <div class="contact-info">
      <h3>Autres moyens de nous contacter</h3>
      <div class="info-grid">
        <div class="info-item">
          <span class="icon">📧</span>
          <div>
            <strong>Email</strong>
            <p>s.wutezi@wutezi.com</p>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">📞</span>
          <div>
            <strong>Téléphone</strong>
            <p>+48 123 456 789</p>
          </div>
        </div>
        <div class="info-item">
          <span class="icon">📍</span>
          <div>
            <strong>Adresse</strong>
            <p>Poznań, Pologne</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .menu-logo {
    position: fixed;
    top: 0;
    left: 0;
    padding: 1rem;
    z-index: 10;
  }

  .menu-logo a {
    display: flex;
    align-items: center;
  }

  .logo {
    height: 150px; 
    padding: 2rem;
  }

  /* Section contact */
  .contact-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/img-communes/fondneutre.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 10rem 2rem 2rem 2rem;
  }

  /* Carte de contact */
  .contact-card {
    background: white;
    padding: 2.5rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 700px;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 0.5rem;
    font-size: 2rem;
  }

  .subtitle {
    text-align: center;
    color: #666;
    margin-bottom: 2rem;
    font-size: 1rem;
  }

  /* Formulaire */
  form {
    margin-bottom: 2rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-bottom: 0;
  }

  @media (min-width: 600px) {
    .form-row {
      grid-template-columns: 1fr 1fr;
    }
  }

  label {
    display: block;
    margin-bottom: 1rem;
    font-weight: 500;
    color: #555;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    margin-top: 0.25rem;
    font-size: 1rem;
    font-family: inherit;
    box-sizing: border-box;
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }

  input:focus,
  select:focus,
  textarea:focus {
    outline: none;
    border-color: #e6c334;
    box-shadow: 0 0 0 3px rgba(230, 195, 52, 0.1);
  }

  button {
    width: 100%;
    padding: 1rem;
    background: #e6c334;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
    transition: background 0.3s;
  }

  button:hover:not(:disabled) {
    background: #f7e187;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .success {
    color: #2d7a3e;
    background: #d4edda;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
    text-align: center;
    border: 1px solid #c3e6cb;
  }

  .error {
    color: #e63946;
    background: #ffe0e0;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
    text-align: center;
  }

  /* Informations de contact */
  .contact-info {
    border-top: 2px solid #f0f0f0;
    padding-top: 2rem;
    margin-top: 2rem;
  }

  .contact-info h3 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  @media (min-width: 600px) {
    .info-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .info-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background: #f9f9f9;
    border-radius: 0.5rem;
  }

  .icon {
    font-size: 2rem;
    flex-shrink: 0;
  }

  .info-item strong {
    display: block;
    color: #333;
    margin-bottom: 0.25rem;
    font-size: 1rem;
  }

  .info-item p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }

  /* Responsive mobile */
  @media (max-width: 600px) {
    .contact-page {
      padding: 8rem 1rem 1rem 1rem;
    }

    .contact-card {
      padding: 1.5rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    .subtitle {
      font-size: 0.9rem;
    }

    .logo {
      height: 100px;
      padding: 1rem;
    }

    .info-grid {
      gap: 1rem;
    }

    .info-item {
      flex-direction: column;
      text-align: center;
      align-items: center;
    }
  }
</style>