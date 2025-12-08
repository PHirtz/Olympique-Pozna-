<script>
  import { _ } from 'svelte-i18n';
  import { goto } from '$app/navigation';
  import { register } from '$lib/api/auth';
  
  let firstName = '';
  let lastName = '';
  let username = '';
  let email = '';
  let password = '';
  let loading = false;
  let error = '';

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
</script>

<div class='menu-logo'>
  <a href="/">
    <img src="/logo.png" alt="Logo Olympique Poznan" class="logo" />
  </a>
</div>

<div class="register-page">
  <div class="register-card">
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
        <input type="password" bind:value={password} placeholder={$_('auth.register.passwordPlaceholder')} required />
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
  .menu-logo {
    position: fixed; /* Fixe le logo */
    top: 0; /* Positionne le logo tout en haut */
    left: 0; /* Positionne le logo à gauche */
    padding: 1rem; /* Vous pouvez ajuster l'espacement autour du logo */
    z-index: 10; /* S'assure que le logo reste au-dessus des autres éléments */
  }

  .menu-logo a {
    display: flex;
    align-items: center;
  }

  .logo {
    height: 150px; 
    padding: 2rem;
  }

  .register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('./img-communes/fondneutre.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding-top: 0,50rem; 
  }

  .register-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 500px;
  }

  .logo {
    display: block;
    height: 150px; 
    padding: 2rem;
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
    width: 85%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    margin-top: 0.25rem;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
    border-color: #e6c334;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  button {
    width: 40%;
    padding: 1rem;
    background: #e6c334;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
  }

  button:hover:not(:disabled) {
    background: #f7e187;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .error {
    color: #e63946;
    background: #ffe0e0;
    padding: 0.75rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
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
</style>