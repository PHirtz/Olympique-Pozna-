<script>
  import { onMount } from 'svelte';
  import { _ } from 'svelte-i18n';
  import { locale } from 'svelte-i18n';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { Eye, EyeOff } from 'lucide-svelte';
  import { resetPassword } from '$lib/api/auth';
	import { Key } from 'lucide';

  let newPassword = '';
  let confirmPassword = '';
  let loading = false;
  let success = false;
  let error = '';
  let showPassword = false;
  let showConfirm = false;

  $: token = $page.url.searchParams.get('token');

  function changeLanguage(lang) {
    locale.set(lang);
    localStorage.setItem('preferredLanguage', lang);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    error = '';

    if (newPassword !== confirmPassword) {
      error = $_('auth.resetPassword.errorMatch');
      return;
    }

    loading = true;
    try {
      const res = await resetPassword(token, newPassword);
      if (!res.success) throw new Error(res.message);
      success = true;
      setTimeout(() => goto('/login'), 3000);
    } catch (err) {
      const msg = err.message || '';
      if (msg.includes('différent') || msg.includes('different') || msg.includes('inne')) {
        error = $_('auth.resetPassword.samePassword');
      } else if (msg.includes('invalide') || msg.includes('expiré')) {
        error = $_('auth.resetPassword.invalidLink');
      } else {
        error = $_('auth.resetPassword.errorGeneral');
      }
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved) locale.set(saved);
  });
</script>

<div class="menu-logo">
  <a href="/">
    <img src="/home.png" alt="Logo home" class="logo" />
  </a>
</div>

<div class="language-selector">
  <button on:click={() => changeLanguage('pl')} class="lang-btn" class:active={$locale === 'pl'} aria-label="Polski">PL</button>
  <span class="separator">|</span>
  <button on:click={() => changeLanguage('fr')} class="lang-btn" class:active={$locale === 'fr'} aria-label="Français">FR</button>
  <span class="separator">|</span>
  <button on:click={() => changeLanguage('en')} class="lang-btn" class:active={$locale === 'en'} aria-label="English">EN</button>
</div>

{#key $locale}
<section class="login-page">
  <div class="login-card">
    <a href="/" class="logo-container">
      <img src="/logo.png" alt="Logo Olympique Poznań" class="logo-op" />
    </a>

    <h1>{$_('auth.resetPassword.title')}</h1>

    {#if !token}
      <div class="error-box">
        <p>❌ {$_('auth.resetPassword.invalidLink')}</p>
      </div>
      <p class="register-link">
        <a href="/forgot-password">{$_('auth.resetPassword.requestNew')}</a>
      </p>

    {:else if success}
      <div class="success-box">
        <p>✅ {$_('auth.resetPassword.success')}</p>
      </div>

    {:else}
      <form on:submit={handleSubmit}>
        <label>
          {$_('auth.resetPassword.newPassword')}
          <small class="hint">{$_('auth.register.hints.password')}</small>
          <div class="password-input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              bind:value={newPassword}
              placeholder={$_('auth.login.passwordPlaceholder')}
              minlength="8"
              required
            />
            <button type="button" class="toggle-password" on:click={() => showPassword = !showPassword}
              aria-label={showPassword ? 'Masquer' : 'Afficher'}>
              {#if showPassword}<EyeOff size={20} />{:else}<Eye size={20} />{/if}
            </button>
          </div>
        </label>

        <label>
          {$_('auth.resetPassword.confirmPassword')}
          <div class="password-input-wrapper">
            <input
              type={showConfirm ? 'text' : 'password'}
              bind:value={confirmPassword}
              placeholder={$_('auth.login.passwordPlaceholder')}
              required
            />
            <button type="button" class="toggle-password" on:click={() => showConfirm = !showConfirm}
              aria-label={showConfirm ? 'Masquer' : 'Afficher'}>
              {#if showConfirm}<EyeOff size={20} />{:else}<Eye size={20} />{/if}
            </button>
          </div>
        </label>

        {#if error}
          <p class="error">{error}</p>
        {/if}

        <button type="submit" disabled={loading}>
          {loading
            ? $_('auth.resetPassword.loading')
            : $_('auth.resetPassword.submit')}
        </button>
      </form>
    {/if}
  </div>
</section>
{/key}

<style>
  .menu-logo { position: fixed; top: 0; left: 0; padding: 1rem; z-index: 10; }
  .menu-logo a { display: flex; align-items: center; }
  .logo { display: block; height: 100px; margin-top: 2rem; padding: 1rem; }

  .language-selector {
    position: fixed; top: 1rem; right: 1rem;
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 0.5rem;
    border: 1px solid rgba(26, 77, 122, 0.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }
  .lang-btn { background: none; border: none; padding: 0.25rem 0.5rem; font-weight: 600; font-size: 0.95rem; color: #666; cursor: pointer; border-radius: 0.25rem; transition: all 0.3s ease; font-family: inherit; }
  .lang-btn:hover { color: #1a4d7a; background: rgba(26, 77, 122, 0.1); }
  .lang-btn.active { color: #e6c334; background: rgba(230, 195, 52, 0.15); font-weight: 700; }
  .separator { color: #ccc; font-weight: 300; }

  .login-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background-image: url('/img-communes/fondteam.jpeg');
    background-position: center; background-size: cover; background-repeat: no-repeat;
    padding: 2rem 1rem;
  }
  .login-card {
    background: rgba(255, 255, 255, 0.85); padding: 2rem; border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); width: 100%; max-width: 500px;
  }
  .logo-container { display: flex; align-items: center; justify-content: center; transition: transform 0.2s; margin-bottom: 1rem; }
  .logo-container:hover { transform: scale(1.05); }
  .logo-op { height: 70px; }

  h1 { text-align: center; color: #333; margin-bottom: 2rem; }

  label { display: block; margin-bottom: 1rem; font-weight: 500; color: #555; }
  .hint { display: block; font-size: 0.85rem; color: #999; font-weight: 400; margin-top: 0.25rem; }

  input {
    width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 0.5rem;
    margin-top: 0.25rem; font-size: 1rem; box-sizing: border-box;
  }
  input:focus { outline: none; border-color: #e6c334; box-shadow: 0 0 0 3px rgba(230, 195, 52, 0.1); }

  .password-input-wrapper { position: relative; display: flex; align-items: center; }
  .password-input-wrapper input { padding-right: 3rem; }
  .toggle-password {
    position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; padding: 0.5rem;
    display: flex; align-items: center; justify-content: center;
    color: #666; transition: color 0.2s; width: auto; margin: 0;
  }
  .toggle-password:hover { color: #1a4d7a; background: none; }

  button[type="submit"] {
    display: block; margin: 1rem auto 0; width: 70%; padding: 1rem;
    background: #1a4d7a; color: white; border: none; border-radius: 0.5rem;
    font-size: 1rem; font-weight: 600; cursor: pointer;
  }
  button[type="submit"]:hover:not(:disabled) { background: #f7e187; color: #1a4d7a; }
  button[type="submit"]:disabled { opacity: 0.6; cursor: not-allowed; }

  .error { color: #e63946; background: #ffe0e0; padding: 0.75rem; border-radius: 0.5rem; margin: 1rem 0; text-align: center; }
  .error-box { background: #ffe0e0; border: 1px solid #ffcccc; color: #e63946; padding: 1rem; border-radius: 0.5rem; text-align: center; }
  .success-box { background: #e8f5e9; border: 1px solid #a5d6a7; color: #2e7d32; padding: 1rem; border-radius: 0.5rem; text-align: center; line-height: 1.5; }

  .register-link { text-align: center; margin-top: 1.5rem; }
  .register-link a { color: #1a4d7a; font-weight: 600; text-decoration: none; }
  .register-link a:hover { text-decoration: underline; color: #e6c334; }

  @media (max-width: 768px) {
    .login-card { padding: 1.5rem; }
    .logo { height: 80px; padding: 0.5rem; }
    .logo-op { height: 50px; }
    button[type="submit"] { width: 100%; }
    .language-selector { top: 0.5rem; right: 0.5rem; }
    .lang-btn { font-size: 0.85rem; }
  }
</style>