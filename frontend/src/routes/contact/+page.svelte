<svelte:head>
  <title>{$_('contact.title')}</title>
  <meta name="description" content={$_('contact.metaDescription')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { Mail, User, MessageSquare, Send } from 'lucide-svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  
  export let data;

  let mounted = false;
  
  // Champs du formulaire
  let name = '';
  let email = '';
  let category = 'footj';
  let message = '';
  let isSubmitting = false;

  onMount(() => {
    mounted = true;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !message) {
      alert($_('contact.form.errorRequired'));
      return;
    }
    
    isSubmitting = true;
    
    try {
      // Ici tu pourras ajouter l'envoi à ton backend
      console.log("Message envoyé :", { name, email, category, message });
      
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert($_('contact.form.success'));
      
      // Reset du formulaire
      name = '';
      email = '';
      category = 'footj';
      message = '';
      
      // Redirection optionnelle
      // goto('/');
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert($_('contact.form.error'));
    } finally {
      isSubmitting = false;
    }
  };
</script>

<Navigation2 {data} />

<div class="contact-page">
  <!-- Hero Section -->
  <section class="hero-contact">
    <div class="hero-content">
      <h1>{$_('contact.hero.title')}</h1>
      <p class="hero-subtitle">{$_('contact.hero.subtitle')}</p>
    </div>
  </section>

  <main class="main-content">
    <section class="contact-section">
      <div class="container">
        <div class="contact-intro">
          <h2>{$_('contact.intro.title')}</h2>
          <p>{$_('contact.intro.text')}</p>
        </div>

        <div class="form-container">
          <form class="contact-form" on:submit={handleSubmit}>
            <div class="form-group">
              <label for="name">
                <User size={20} />
                {$_('contact.form.name')}*
              </label>
              <input 
                type="text" 
                id="name" 
                bind:value={name}
                placeholder={$_('contact.form.namePlaceholder')}
                required
              />
            </div>

            <div class="form-group">
              <label for="email">
                <Mail size={20} />
                {$_('contact.form.email')}*
              </label>
              <input 
                type="email" 
                id="email" 
                bind:value={email}
                placeholder={$_('contact.form.emailPlaceholder')}
                required
              />
            </div>

            <div class="form-group">
              <label for="category">
                <MessageSquare size={20} />
                {$_('contact.form.category')}
              </label>
              <select id="category" bind:value={category}>
                <option value="coach">{$_('contact.form.categories.coach')}</option>
                <option value="footj">{$_('contact.form.categories.junior')}</option>
                <option value="foots">{$_('contact.form.categories.senior')}</option>
                <option value="sponsor">{$_('contact.form.categories.sponsor')}</option>
                <option value="volunteer">{$_('contact.form.categories.volunteer')}</option>
                <option value="other">{$_('contact.form.categories.other')}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">
                <MessageSquare size={20} />
                {$_('contact.form.message')}*
              </label>
              <textarea 
                id="message" 
                bind:value={message}
                rows="6"
                placeholder={$_('contact.form.messagePlaceholder')}
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              class="submit-btn"
              disabled={isSubmitting}
            >
              {#if isSubmitting}
                {$_('contact.form.sending')}
              {:else}
                <Send size={20} />
                {$_('contact.form.submit')}
              {/if}
            </button>
          </form>

          <div class="contact-info">
            <div class="info-card">
              <Mail size={32} />
              <h3>{$_('contact.info.email.title')}</h3>
              <a href="mailto:olympique.poznan@wielkopolskizpn.pl">olympique.poznan@wielkopolskizpn.pl</a>
            </div>

            <div class="info-card">
              <MessageSquare size={32} />
              <h3>{$_('contact.info.social.title')}</h3>
              <div class="social-links">
                <a href="https://www.facebook.com/OlympiquePoz" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
                <a href="https://www.instagram.com/olympiquepoznan/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">Instagram</a>
                <a href="https://www.tiktok.com/tag/olympiquepozna%C5%84" target="_blank" rel="noopener noreferrer" aria-label="Tiktok">TikTok</a>
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

  /* Hero Section */
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

  /* Main Content */
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

  /* Form Container */
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

  /* Contact Form */
  .contact-form {
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
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
  .form-group select,
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
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #1a4d7a;
    box-shadow: 0 0 0 3px rgba(26, 77, 122, 0.1);
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .form-group select {
    cursor: pointer;
    background-color: white;
  }

  /* Submit Button */
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

  /* Contact Info */
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

  /* Responsive */
  @media (max-width: 768px) {
    .contact-form {
      padding: 1.5rem;
    }

    .info-card {
      padding: 1.5rem;
    }
  }
</style>