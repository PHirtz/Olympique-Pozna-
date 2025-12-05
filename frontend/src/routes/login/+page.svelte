<script>
  import { goto } from '$app/navigation';
  import { login } from '$lib/api/auth';

  let username = '';
  let password = '';
  let loading = false;
  let error = '';

  /**
   * @param {Event & { currentTarget: HTMLFormElement }} e
   */
  async function handleLogin(e) {
    e.preventDefault();
    
    loading = true;
    error = '';

    try {
      const response = await login({ username, password });
      
      if (response.success) {
        goto("/");
      }
    } catch (/** @type {any} */ err) {
      error = err.message || "Username ou mot de passe incorrect";
      console.error("Erreur login:", err);
    } finally {
      loading = false;
    }
  }
</script>

<div class='menu-logo'>
    <a href="/" class="logo-card">
      <img src="/logo.png" alt="Logo Olympique Poznan" class="logo" />
    </a>
</div>

<section class="login-page">
  <div class="login-card">
    <h1>Connexion</h1>

    <form on:submit={handleLogin}>
      <label>
        Pseudo
        <input 
          type="text" 
          bind:value={username} 
          placeholder="Votre pseudo"
          required 
        />
      </label>

      <label>
        Mot de passe
        <input 
          type="password" 
          bind:value={password} 
          placeholder="Votre mot de passe"
          required 
        />
      </label>

      {#if error}
        <p class="error">{error}</p>
      {/if}

      <button type="submit" disabled={loading}>
        {loading ? 'Connexion...' : 'Se connecter'}
      </button>
    </form>

    <p class="register-link">
      Pas encore inscrit ? <a href="/register">Créer un compte</a>
    </p>
  </div>
</section>

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
  display: block;
}

/* Section login */
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url('./img-communes/fondneutre.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding-top: 80px; /* Pour laisser de la place au menu transparent */
}

/* Pour avoir une barre de navigation transparente en haut */
nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0); /* Transparence */
  padding: 1rem;
  z-index: 5; /* Garde la barre au-dessus du fond */
}

/* Style du formulaire de connexion */
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