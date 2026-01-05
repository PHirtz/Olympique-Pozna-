<script>
  import { _ } from 'svelte-i18n';
  import { locale } from 'svelte-i18n';
  import { goto } from '$app/navigation';
  import { auth } from '$lib/api';
  import { onMount } from 'svelte';
  import { Eye, EyeOff } from 'lucide-svelte';

  let username = '';
  let password = '';
  let loading = false;
  let error = '';
  let showPassword = false;

  // Si déjà connecté, rediriger
  onMount(() => {
    if (auth.isAuthenticated()) {
      const user = auth.getCurrentUser();
      if (user?.role === 'admin') {
        goto('/admin');
      } else {
        goto('/');
      }
    }
  });

  /**
   * Change la langue
   * @param {'fr' | 'pl' | 'en'} lang
   */
  function changeLanguage(lang) {
    locale.set(lang);
    localStorage.setItem('preferredLanguage', lang);
  }

  /**
   * @param {Event & { currentTarget: HTMLFormElement }} e
   */
  async function handleLogin(e) {
    e.preventDefault();
    loading = true;
    error = '';

    try {
      const response = await auth.login(username, password);
      if (response.success) {
        const user = auth.getCurrentUser();
        // Rediriger selon le rôle
        if (user?.role === 'admin') {
          goto('/admin');
        } else {
          goto('/');
        }
      }
    } catch (err) {
      error = $_('auth.login.error');
      console.error("Erreur login:", err);
    } finally {
      loading = false;
    }
  }

  function togglePasswordVisibility() {
    showPassword = !showPassword;
  }
</script>

<div class='menu-logo'>
  <a href="/">
    <img src="/home.png" alt="Logo home" class="logo" />
  </a>
</div>

<!-- Language Selector -->
<div class="language-selector">
  <button 
    on:click={() => changeLanguage('fr')} 
    class="lang-btn" 
    class:active={$locale === 'fr'}
    aria-label="Français"
  >
    FR
  </button>
  <span class="separator">|</span>
  <button 
    on:click={() => changeLanguage('pl')} 
    class="lang-btn" 
    class:active={$locale === 'pl'}
    aria-label="Polski"
  >
    PL
  </button>
  <span class="separator">|</span>
  <button 
    on:click={() => changeLanguage('en')} 
    class="lang-btn" 
    class:active={$locale === 'en'}
    aria-label="English"
  >
    EN
  </button>
</div>

<section class="login-page">
  <div class="login-card">
    <a href="/" class="logo-container">
      <img src="/logo.png" alt="Logo Olympique Poznań" class="logo-op" />
    </a>
    <h1>{$_('auth.login.title')}</h1>

    <form on:submit={handleLogin}>
      <label>
        {$_('auth.login.username')}
        <input 
          type="text" 
          bind:value={username} 
          placeholder={$_('auth.login.usernamePlaceholder')}
          required 
        />
      </label>

      <label>
        {$_('auth.login.password')}
        <div class="password-input-wrapper">
          <input 
            type={showPassword ? 'text' : 'password'} 
            bind:value={password} 
            placeholder={$_('auth.login.passwordPlaceholder')}
            required 
          />
          <button 
            type="button" 
            class="toggle-password" 
            on:click={togglePasswordVisibility}
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {#if showPassword}
              <EyeOff size={20} />
            {:else}
              <Eye size={20} />
            {/if}
          </button>
        </div>
      </label>

      {#if error}
        <p class="error">{error}</p>
      {/if}

      <button type="submit" disabled={loading}>
        {loading ? $_('auth.login.loading') : $_('auth.login.submit')}
      </button>
    </form>

    <p class="register-link">
      {$_('auth.login.noAccount')} <a href="/register">{$_('auth.login.createAccount')}</a>
    </p>
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
    display: block;
    height: 100px; 
    margin-top: 2rem;
    padding: 1rem;
  }

  .logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s;
    flex-shrink: 0;
    margin-bottom: 1rem;
  }

  .logo-container:hover {
    transform: scale(1.05);
  }

  .logo-op {
    height: 70px;
  }

  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/img-communes/fondteam.jpeg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 2rem 1rem;
  }

  .login-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 500px;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 2rem;
  }

  label {
    display: block;
    margin-bottom: 1rem;
    font-weight: 500;
    color: #555;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    margin-top: 0.25rem;
    font-size: 1rem;
    box-sizing: border-box;
  }

  input:focus {
    outline: none;
    border-color: #e6c334;
    box-shadow: 0 0 0 3px rgba(230, 195, 52, 0.1);
  }

  /* Password input wrapper */
  .password-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .password-input-wrapper input {
    padding-right: 3rem;
  }

  .toggle-password {
    position: absolute;
    right: 0.5rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    transition: color 0.2s;
    width: auto;
    margin: 0;
  }

  .toggle-password:hover {
    color: #1a4d7a;
    background: none;
  }

  button[type="submit"] {
    display: block;
    margin: 1rem auto 0;
    width: 50%;
    padding: 1rem;
    background: #1a4d7a;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
  }

  button[type="submit"]:hover:not(:disabled) {
    background: #f7e187;
    color: #1a4d7a;
  }

  button[type="submit"]:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error {
    color: #e63946;
    background: #ffe0e0;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
    text-align: center;
  }

  .register-link {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
  }

  .register-link a {
    color: #e6c334;
    font-weight: 600;
    text-decoration: none;
  }

  .register-link a:hover {
    text-decoration: underline;
  }

  /* ========================================
     LANGUAGE SELECTOR
     ======================================== */

  .language-selector {
    position: fixed;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 0.5rem;
    border: 1px solid rgba(26, 77, 122, 0.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .lang-btn {
    background: none;
    border: none;
    padding: 0.25rem 0.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: #666;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: all 0.3s ease;
    font-family: inherit;
  }

  .lang-btn:hover {
    color: #1a4d7a;
    background: rgba(26, 77, 122, 0.1);
  }

  .lang-btn.active {
    color: #e6c334;
    background: rgba(230, 195, 52, 0.15);
    font-weight: 700;
  }

  .separator {
    color: #ccc;
    font-weight: 300;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .login-card {
      padding: 1.5rem;
    }

    .logo {
      height: 80px;
      padding: 0.5rem;
    }

    .logo-op {
      height: 50px;
    }

    button[type="submit"] {
      width: 100%;
    }

    .language-selector {
      top: 0.5rem;
      right: 0.5rem;
      padding: 0.4rem 0.6rem;
    }

    .lang-btn {
      font-size: 0.85rem;
      padding: 0.2rem 0.4rem;
    }
  }
</style>