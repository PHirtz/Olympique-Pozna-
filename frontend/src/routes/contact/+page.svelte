<svelte:head>
  <title>Contact - Olympique Poznań</title>
  <meta name="description" content="Contactez le club Olympique Poznań" />
</svelte:head>

<script>
  import { enhance } from '$app/forms';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { Mail, User, Phone, MessageSquare, Send } from 'lucide-svelte';

  let { data, form } = $props();

  let isSubmitting = $state(false);
  let message = $state(form?.values?.message ?? '');

  $effect(() => {
    if (form?.success) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
</script>

<Navigation2 {data} />

<div class="contact-page">
  <section class="hero-contact">
    <div class="hero-content">
      <h1>Contactez-nous</h1>
      <p class="hero-subtitle">Une question ? N'hésitez pas à nous écrire</p>
    </div>
  </section>

  <main class="main-content">
    <section class="contact-section">
      <div class="container">
        <div class="contact-intro">
          <h2>Nous sommes à votre écoute</h2>
          <p>Pour toute demande concernant le club, les inscriptions ou les stages, utilisez le formulaire ci-dessous.</p>
        </div>

        {#if form?.success}
          <div class="alert alert-success">
            <div class="alert-icon">✓</div>
            <div class="alert-content">
              <strong>Message envoyé !</strong>
              <p>Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          </div>
        {/if}

        {#if form?.error}
          <div class="alert alert-error">
            <div class="alert-icon">⚠</div>
            <div class="alert-content">
              <strong>Erreur</strong>
              <p>{form.error}</p>
            </div>
          </div>
        {/if}

        <div class="form-container">
          <form
            method="POST"
            class="contact-form"
            use:enhance={() => {
              isSubmitting = true;
              return async ({ update }) => {
                await update();
                isSubmitting = false;
              };
            }}
          >
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">
                  <User size={20} />
                  Prénom *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={form?.values?.firstName ?? ''}
                  placeholder="Votre prénom"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div class="form-group">
                <label for="lastName">
                  <User size={20} />
                  Nom *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={form?.values?.lastName ?? ''}
                  placeholder="Votre nom"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">
                  <Mail size={20} />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form?.values?.email ?? ''}
                  placeholder="votre@email.com"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div class="form-group">
                <label for="phone">
                  <Phone size={20} />
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={form?.values?.phone ?? ''}
                  placeholder="+33 6 00 00 00 00"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div class="form-group">
              <label for="subject">
                <MessageSquare size={20} />
                Sujet *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={form?.values?.subject ?? ''}
                placeholder="Objet de votre message"
                required
                disabled={isSubmitting}
              />
            </div>

            <div class="form-group">
              <label for="message">
                <MessageSquare size={20} />
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Votre message (10 caractères minimum)"
                required
                disabled={isSubmitting}
                bind:value={message}
              ></textarea>
              <small class="char-count">
                {message.length} / 10 caractères minimum
              </small>
            </div>

            <button type="submit" class="submit-btn" disabled={isSubmitting}>
              {#if isSubmitting}
                <span class="spinner"></span>
                Envoi en cours...
              {:else}
                <Send size={20} />
                Envoyer le message
              {/if}
            </button>
          </form>

          <div class="contact-info">
            <div class="info-card">
              <Mail size={32} />
              <h3>Email</h3>
              <a href="mailto:olympique.poznan@wielkopolskizpn.pl">
                olympique.poznan@wielkopolskizpn.pl
              </a>
            </div>

            <div class="info-card">
              <MessageSquare size={32} />
              <h3>Réseaux sociaux</h3>
              <div class="social-links">
                <a href="https://www.facebook.com/OlympiquePoz" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://www.instagram.com/olympiquepoznan/" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="https://www.tiktok.com/tag/olympiquepozna%C5%84" target="_blank" rel="noopener noreferrer">TikTok</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>

<Footer {data} />

<style>
  .contact-page {
    min-height: 100vh;
    background: #ffffff;
  }

  .hero-contact {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    padding: 8rem 2rem 4rem;
    text-align: center;
  }

  .hero-content h1 {
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    margin-bottom: 1rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .hero-subtitle {
    font-size: clamp(1.1rem, 2.5vw, 1.5rem);
    opacity: 0.95;
    font-weight: 300;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 4rem 2rem;
  }

  .contact-intro {
    text-align: center;
    margin-bottom: 3rem;
  }

  .contact-intro h2 {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
    color: #1a4d7a;
    margin-bottom: 1rem;
  }

  .contact-intro p {
    font-size: 1.1rem;
    color: #64748b;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.8;
  }

  .alert {
    display: flex;
    gap: 1rem;
    padding: 1.25rem;
    margin: 0 auto 2rem;
    max-width: 1000px;
    border-radius: 12px;
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

  .char-count {
    display: block;
    font-size: 0.875rem;
    color: #64748b;
    margin-top: 0.25rem;
  }

  .form-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 1000px;
    margin: 0 auto;
  }

  @media (min-width: 968px) {
    .form-container {
      grid-template-columns: 2fr 1fr;
    }
  }

  .contact-form {
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 640px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    color: #1a4d7a;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 0.875rem;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-family: inherit;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #1a4d7a;
    box-shadow: 0 0 0 3px rgba(26, 77, 122, 0.1);
  }

  .form-group input:disabled,
  .form-group textarea:disabled {
    background: #f5f5f5;
    cursor: not-allowed;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .submit-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    color: white;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(26, 77, 122, 0.3);
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(26, 77, 122, 0.4);
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
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .info-card {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    text-align: center;
  }

  .info-card :global(svg) {
    color: #1a4d7a;
    margin-bottom: 1rem;
  }

  .info-card h3 {
    color: #1a4d7a;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }

  .info-card a {
    color: #64748b;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .info-card a:hover {
    color: #1a4d7a;
  }

  .social-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  @media (max-width: 768px) {
    .contact-form {
      padding: 1.5rem;
    }

    .info-card {
      padding: 1.5rem;
    }
  }
</style>