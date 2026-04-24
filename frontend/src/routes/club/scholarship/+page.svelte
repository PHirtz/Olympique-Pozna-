<svelte:head>
  <title>{$_('scholarship.title')}</title>
  <meta name="description" content={$_('scholarship.metaDescription')} />
</svelte:head>

<script>
  import { _ } from 'svelte-i18n';
  import { enhance } from '$app/forms';
  import Navigation2 from '$lib/components/ui/Navigation2.svelte';
  import HeroSlider from '$lib/components/HeroSlider.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { Heart, User, Users, Mail, MessageSquare, Send } from 'lucide-svelte';

  let { data, form } = $props();

  let isSubmitting = $state(false);
  let message = $state(form?.values?.message ?? '');
  let isMember = $state(form?.values?.isMember ?? 'oui');

  $effect(() => {
    if (form?.success) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  const heroSlides = [
    '/slides/stevens.jpg',
    '/slides/stevens1.jpg',
    '/slides/stevens2.jpg',
    '/slides/stevens3.jpg',
    '/slides/stevens4.jpg',
    '/slides/stevens5.jpg'
  ];
</script>

<Navigation2 {data} />

<HeroSlider
  images={heroSlides}
  title={$_('scholarship.hero.title')}
  subtitle={$_('scholarship.hero.subtitle')}
/>

<div class="scholarship-page">

  <!-- INTRO -->
  <section class="intro-section">
    <div class="container">
      <div class="intro-grid">
        <div class="intro-text">
          <h2>{$_('scholarship.Michael.title')}</h2>
          <p>{$_('scholarship.Michael.text1')}</p>

          <h2>{$_('scholarship.objectif.title')}</h2>
          <p>{$_('scholarship.objectif.text')}</p>

          <h2>{$_('scholarship.désignation.title')}</h2>
          <p>{$_('scholarship.désignation.text1')}</p>
          <p>{$_('scholarship.désignation.text2')}</p>
        </div>

        <div class="intro-visual">
          <div class="stat-card">
            <span class="stat-number">4</span>
            <span class="stat-label">{$_('scholarship.labels.childs')}</span>
          </div>
          <div class="stat-card gold">
            <span class="stat-number">2</span>
            <span class="stat-label">{$_('scholarship.labels.camps')}</span>
          </div>
          <div class="stat-card">
            <span class="stat-number">100%</span>
            <span class="stat-label">{$_('scholarship.labels.dons')}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FORMULAIRE -->
  <section class="form-section">
    <div class="container">
      <div class="form-header">
        <Heart size={36} />
        <h2>{$_('scholarship.désignation.title')}</h2>
        <p>{$_('scholarship.désignation.text')}</p>
      </div>

      {#if form?.success}
        <div class="alert alert-success">
          <div class="alert-icon">✓</div>
          <div class="alert-content">
            <strong>{$_('scholarship.form.successTitle')}</strong>
            <p>{$_('scholarship.form.successText')}</p>
          </div>
        </div>
      {/if}

      {#if form?.error}
        <div class="alert alert-error">
          <div class="alert-icon">⚠</div>
          <div class="alert-content">
            <strong>{$_('scholarship.form.errorTitle')}</strong>
            <p>{form.error}</p>
          </div>
        </div>
      {/if}

      <form
        method="POST"
        class="scholarship-form"
        use:enhance={() => {
          isSubmitting = true;
          return async ({ update }) => {
            await update();
            isSubmitting = false;
          };
        }}
      >

        <!-- Enfant -->
        <fieldset>
          <legend>
            <User size={18} />
            {$_('scholarship.form.childInfo')}
          </legend>

          <div class="form-row">
            <div class="form-group">
              <label for="childFirstName">{$_('scholarship.form.childFirstName')}</label>
              <input
                type="text"
                id="childFirstName"
                name="childFirstName"
                value={form?.values?.childFirstName ?? ''}
                placeholder={$_('scholarship.form.childFirstNamePlaceholder')}
                required
                disabled={isSubmitting}
              />
            </div>
            <div class="form-group">
              <label for="childLastName">{$_('scholarship.form.childLastName')}</label>
              <input
                type="text"
                id="childLastName"
                name="childLastName"
                value={form?.values?.childLastName ?? ''}
                placeholder={$_('scholarship.form.childLastNamePlaceholder')}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="childAge">{$_('scholarship.form.childAge')}</label>
              <input
                type="number"
                id="childAge"
                name="childAge"
                value={form?.values?.childAge ?? ''}
                placeholder={$_('scholarship.form.childAgePlaceholder')}
                min="4"
                max="18"
                required
                disabled={isSubmitting}
              />
            </div>
            <div class="form-group">
              <fieldset class="radio-fieldset">
                <legend class="radio-legend">{$_('scholarship.form.memberQuestion')}</legend>
                <div class="radio-group">
                  <label class="radio-label">
                    <input
                      type="radio"
                      name="isMember"
                      value="oui"
                      bind:group={isMember}
                      disabled={isSubmitting}
                    />
                    <span>{$_('scholarship.form.memberYes')}</span>
                  </label>
                  <label class="radio-label">
                    <input
                      type="radio"
                      name="isMember"
                      value="non"
                      bind:group={isMember}
                      disabled={isSubmitting}
                    />
                    <span>{$_('scholarship.form.memberNo')}</span>
                  </label>
                </div>
              </fieldset>
            </div>
          </div>

          {#if isMember === 'non'}
            <div class="form-group">
              <label for="clubName">{$_('scholarship.form.clubName')}</label>
              <input
                type="text"
                id="clubName"
                name="clubName"
                value={form?.values?.clubName ?? ''}
                placeholder={$_('scholarship.form.clubNamePlaceholder')}
                disabled={isSubmitting}
              />
            </div>
          {/if}
        </fieldset>

        <!-- Parents -->
        <fieldset>
          <legend>
            <Users size={18} />
            {$_('scholarship.form.parentInfo')}
            <span class="optional">({$_('scholarship.form.optional')})</span>
          </legend>

          <div class="form-row">
            <div class="form-group">
              <label for="parentFirstName">{$_('scholarship.form.parentFirstName')}</label>
              <input
                type="text"
                id="parentFirstName"
                name="parentFirstName"
                value={form?.values?.parentFirstName ?? ''}
                placeholder={$_('scholarship.form.parentFirstNamePlaceholder')}
                disabled={isSubmitting}
              />
            </div>
            <div class="form-group">
              <label for="parentLastName">{$_('scholarship.form.parentLastName')}</label>
              <input
                type="text"
                id="parentLastName"
                name="parentLastName"
                value={form?.values?.parentLastName ?? ''}
                placeholder={$_('scholarship.form.parentLastNamePlaceholder')}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </fieldset>

        <!-- Contact & Camp -->
        <fieldset>
          <legend>
            <Mail size={18} />
            {$_('scholarship.form.contactCamp')}
          </legend>

          <div class="form-row">
            <div class="form-group">
              <label for="email">{$_('scholarship.form.email')}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form?.values?.email ?? ''}
                placeholder={$_('scholarship.form.emailPlaceholder')}
                required
                disabled={isSubmitting}
              />
            </div>
            <div class="form-group">
              <label for="camp">{$_('scholarship.form.camp')}</label>
              <select
                id="camp"
                name="camp"
                value={form?.values?.camp ?? 'opalenica'}
                disabled={isSubmitting}
              >
                <option value="opalenica">{$_('scholarship.form.campOpalenica')}</option>
                <option value="januszkowo">{$_('scholarship.form.campJanuszkowo')}</option>
                <option value="autre">{$_('scholarship.form.campOther')}</option>
              </select>
            </div>
          </div>
        </fieldset>

        <!-- Message -->
        <fieldset>
          <legend>
            <MessageSquare size={18} />
            {$_('scholarship.form.messageSection')}
          </legend>

          <div class="form-group">
            <label for="message">{$_('scholarship.form.messageLabel')}</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              placeholder={$_('scholarship.form.messagePlaceholder')}
              required
              disabled={isSubmitting}
              bind:value={message}
            ></textarea>
            <small class="char-count">{message.length} / 10 {$_('scholarship.form.charCount')}</small>
          </div>
        </fieldset>

        <button type="submit" class="submit-btn" disabled={isSubmitting}>
          {#if isSubmitting}
            <span class="spinner"></span>
            {$_('scholarship.form.submitting')}
          {:else}
            <Send size={20} />
            {$_('scholarship.form.submit')}
          {/if}
        </button>
      </form>
    </div>
  </section>

</div>

<Footer {data} />

<style>
  .scholarship-page {
    min-height: 100vh;
    background: #ffffff;
  }

  /* Hero géré par HeroSlider */

  /* ── INTRO ── */
  .intro-section { padding: 5rem 2rem; }

  .container { max-width: 1100px; margin: 0 auto; }

  .intro-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: start;
  }

  @media (min-width: 900px) {
    .intro-grid { grid-template-columns: 3fr 2fr; }
  }

  .intro-text h2 {
    font-size: 1.6rem;
    color: #1a4d7a;
    margin-bottom: 1rem;
    margin-top: 2rem;
    font-weight: 700;
  }

  .intro-text h2:first-child { margin-top: 0; }

  .intro-text p {
    color: #444;
    line-height: 1.85;
    margin-bottom: 1rem;
    font-size: 1.05rem;
  }

  .intro-visual {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .stat-card {
    background: #f0f5fb;
    border-left: 4px solid #1a4d7a;
    padding: 1.5rem 2rem;
    border-radius: 0 12px 12px 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .stat-card.gold {
    background: #fdf8ee;
    border-left-color: #c9a961;
  }

  .stat-number {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1a4d7a;
    line-height: 1;
  }

  .stat-card.gold .stat-number { color: #c9a961; }

  .stat-label {
    font-size: 0.9rem;
    color: #666;
    font-weight: 500;
  }

  /* ── FORMULAIRE ── */
  .form-section {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    padding: 5rem 2rem;
  }

  .form-header {
    text-align: center;
    margin-bottom: 2.5rem;
    color: white;
  }

  .form-header :global(svg) {
    color: #c9a961;
    margin-bottom: 1rem;
  }

  .form-header h2 { font-size: 2rem; color: white; margin-bottom: 0.75rem; }

  .form-header p {
    color: rgba(255,255,255,0.8);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .alert {
    display: flex;
    gap: 1rem;
    padding: 1.25rem;
    margin: 0 auto 2rem;
    max-width: 800px;
    border-radius: 12px;
    align-items: flex-start;
  }

  .alert-success { background: #d4edda; color: #155724; border: 2px solid #c3e6cb; }
  .alert-error { background: #f8d7da; color: #721c24; border: 2px solid #f5c6cb; }
  .alert-icon { font-size: 1.5rem; font-weight: bold; flex-shrink: 0; }
  .alert-content { flex: 1; }
  .alert-content strong { display: block; margin-bottom: 0.25rem; font-size: 1.05rem; }
  .alert-content p { margin: 0; font-size: 0.95rem; }

  .scholarship-form {
    background: white;
    padding: 2.5rem;
    border-radius: 20px;
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
  }

  fieldset {
    border: none;
    padding: 0;
    margin: 0 0 2rem 0;
    box-sizing: border-box;
    min-width: 0;
    overflow: hidden;
  }

  legend {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 700;
    color: #1a4d7a;
    margin-bottom: 1.25rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid #e2e8f0;
    width: 100%;
  }

  .optional {
    font-weight: 400;
    font-size: 0.85rem;
    color: #94a3b8;
    margin-left: 0.25rem;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    min-width: 0;
  }

  @media (min-width: 600px) {
    .form-row { grid-template-columns: 1fr 1fr; }
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1rem;
    min-width: 0;
    overflow: hidden;
  }

  .form-group label { font-weight: 600; color: #1a4d7a; font-size: 0.95rem; }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 0.875rem;
    border: 2px solid #e2e8f0;
    border-radius: 10px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: #fafafa;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .form-group select { overflow: hidden; text-overflow: ellipsis; }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #1a4d7a;
    box-shadow: 0 0 0 3px rgba(26, 77, 122, 0.1);
    background: white;
  }

  .form-group input:disabled,
  .form-group select:disabled,
  .form-group textarea:disabled { background: #f5f5f5; cursor: not-allowed; opacity: 0.7; }

  .form-group textarea { resize: vertical; min-height: 140px; }
  .char-count { font-size: 0.8rem; color: #94a3b8; }

  .radio-group { display: flex; gap: 1.5rem; padding: 0.875rem 0; align-items: center; }

  .radio-label {
    display: flex; align-items: center; gap: 0.5rem;
    cursor: pointer; font-weight: 500; color: #444; font-size: 1rem;
  }

  .radio-label input[type="radio"] {
    width: 18px; height: 18px;
    accent-color: #1a4d7a; cursor: pointer; flex-shrink: 0;
  }

  .radio-label span { user-select: none; }

  .radio-fieldset {
    border: none;
    padding: 0;
    margin: 0;
    min-width: 0;
    overflow: hidden;
  }

  .radio-legend {
    font-weight: 600;
    color: #1a4d7a;
    font-size: 0.95rem;
    border: none;
    padding: 0;
    margin: 0 0 0.5rem 0;
    display: block;
    width: 100%;
  }

  .submit-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #c9a961 0%, #ddc184 50%, #c9a961 100%);
    color: #0f2d4a;
    border: none;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(201, 169, 97, 0.4);
    letter-spacing: 0.3px;
  }

  .submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(201, 169, 97, 0.5); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .spinner {
    width: 18px; height: 18px;
    border: 2px solid rgba(15, 45, 74, 0.3);
    border-top-color: #0f2d4a;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  @media (max-width: 640px) {
    .scholarship-form { padding: 1.25rem; }
    .form-row { grid-template-columns: 1fr; }
  }
</style>