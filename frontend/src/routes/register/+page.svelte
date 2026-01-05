<script>
  import { _ } from 'svelte-i18n';
  import { locale } from 'svelte-i18n';
  import { goto } from '$app/navigation';
  import { register } from '$lib/api/auth';
  import { Eye, EyeOff } from 'lucide-svelte';
  
  let firstName = '';
  let lastName = '';
  let username = '';
  let email = '';
  let password = '';
  let loading = false;
  let error = '';
  let showPassword = false;

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
  async function handleRegister(e) {
    e.preventDefault();
    
    if (!firstName || !lastName || !username || !email || !password) {
      error = $_('auth.register.errorAllFields');
      return;
    }

    loading = true;
    error = '';

    try {
      const userData = {
        firstName,
        lastName,
        username,
        email,
        password,
        role: 'member',
        preferredLanguage: 'fr'
      };

      const response = await register(userData);
      
      if (response.success) {
        alert($_('auth.register.success'));
        goto("/");
      }
    } catch (err) {
      error = $_('auth.register.errorGeneral');
      console.error("Erreur inscription:", err);
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
    <img src="/home.png" alt="Logo Home" class="logo-home" />
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

<div class="register-page">
  <div class="register-card">
    <a href="/" class="logo-container">
      <img src="/logo.png" alt="Logo Olympique Poznań" class="logo-op" />
    </a>
    <h1>{$_('auth.register.title')}</h1>

    <form on:submit={handleRegister}>
      <label>
        {$_('auth.register.firstName')} {$_('auth.register.required')}
        <input type="text" bind:value={firstName} placeholder={$_('auth.register.firstNamePlaceholder')} required />
      </label>

      <label>
        {$_('auth.register.lastName')} {$_('auth.register.required')}
        <input type="text" bind:value={lastName} placeholder={$_('auth.register.lastNamePlaceholder')} required />
      </label>

      <label>
        {$_('auth.register.username')} {$_('auth.register.required')}
        <input type="text" bind:value={username} placeholder={$_('auth.register.usernamePlaceholder')} required />
      </label>

      <label>
        {$_('auth.register.email')} {$_('auth.register.required')}
        <input type="email" bind:value={email} placeholder={$_('auth.register.emailPlaceholder')} required />
      </label>

      <label>
        {$_('auth.register.password')} {$_('auth.register.required')}
        <div class="password-input-wrapper">
          <input 
            type={showPassword ? 'text' : 'password'} 
            bind:value={password} 
            placeholder={$_('auth.register.passwordPlaceholder')} 
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
        {loading ? $_('auth.register.loading') : $_('auth.register.submit')}
      </button>
    </form>

    <p class="login-link">
      {$_('auth.register.hasAccount')} <a href="/login">{$_('auth.register.loginLink')}</a>
    </p>
  </div>
</div>

<style>
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

  /* ========================================
     LOGO EN HAUT À GAUCHE
     ======================================== */

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

  .logo-home {
    display: block;
    height: 100px; 
    margin-top: 2rem;
    padding: 1rem;
  }

  /* ========================================
     PAGE REGISTER
     ======================================== */

  .register-page {
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

  .register-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 500px;
  }

  /* ========================================
     LOGO HOME DANS LA CARD
     ======================================== */

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

  /* ========================================
     FORMULAIRE
     ======================================== */

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

  .login-link {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
  }

  .login-link a {
    color: #e6c334;
    font-weight: 600;
    text-decoration: none;
  }

  .login-link a:hover {
    text-decoration: underline;
  }

  /* ========================================
     RESPONSIVE
     ======================================== */

  @media (max-width: 768px) {
    .register-card {
      padding: 1.5rem;
    }

    .logo-home {
      height: 80px;
      padding: 0.5rem;
    }

    .logo-op {
      height: 40px;
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

  @media (max-width: 480px) {
    .register-page {
      padding: 1rem 0.5rem;
    }

    .register-card {
      padding: 1.25rem;
    }

    h1 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
    }

    .logo-home {
      height: 70px;
      padding: 0.25rem;
    }

    .logo-op {
      height: 35px;
    }

    label {
      font-size: 0.9rem;
      margin-bottom: 0.75rem;
    }

    input {
      padding: 0.6rem;
      font-size: 0.95rem;
    }

    button[type="submit"] {
      font-size: 1rem;
      padding: 0.85rem;
    }

    .language-selector {
      top: 0.25rem;
      right: 0.25rem;
      padding: 0.3rem 0.5rem;
    }

    .lang-btn {
      font-size: 0.8rem;
      padding: 0.15rem 0.3rem;
    }
  }
</style>