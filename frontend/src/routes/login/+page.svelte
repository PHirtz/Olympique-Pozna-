<script>
  import { _ } from 'svelte-i18n';
  import { goto } from '$app/navigation';
  import { auth } from '$lib/api';
  import { onMount } from 'svelte';

  let username = '';
  let password = '';
  let loading = false;
  let error = '';

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
</script>

<div class='menu-logo'>
  <a href="/">
    <img src="/logo.png" alt="Logo Olympique Poznań" class="logo" />
  </a>
</div>

<section class="login-page">
  <div class="login-card">
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
        <input 
          type="password" 
          bind:value={password} 
          placeholder={$_('auth.login.passwordPlaceholder')}
          required 
        />
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

  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/img-communes/fondneutre.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
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
  }

  input:focus {
    outline: none;
    border-color: #e6c334;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  button {
    justify-content: center;
    align-content: center;
    align-items: center;
    width: 50%;
    padding: 1rem;
    background: #1a4d7a;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 1rem;
  }

  button:hover:not(:disabled) {
    background: linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%);
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
</style>