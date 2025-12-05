<script>
  import { user } from '$lib/stores/auth.js';
  import { logout } from '$lib/api/auth';
  import { goto } from '$app/navigation';
  import Button from './ui/Button.svelte';
  import { LogIn, UserPlus, LogOut, User } from 'lucide-svelte';

  async function handleLogout() {
    await logout();
    goto('/login');
  }
</script>

{#if $user}
  <!-- Utilisateur connecté -->
  <div class="user-menu">
    <!-- Version desktop -->
    <div class="user-menu-desktop">
      <div class="user-info">
        <User size={18} />
        <span>Bonjour, {$user.firstName} !</span>
      </div>
      <button class="btn-logout" on:click={handleLogout}>
        <LogOut size={18} />
        <span>Déconnexion</span>
      </button>
    </div>

    <!-- Version mobile : icône profil + logout -->
    <div class="user-menu-mobile">
      <a href="/profile" class="icon-button profile-icon" aria-label="Mon profil">
        <User size={20} />
      </a>
      <button class="icon-button logout-icon" on:click={handleLogout} aria-label="Déconnexion">
        <LogOut size={20} />
      </button>
    </div>
  </div>
{:else}
  <!-- Utilisateur non connecté -->
  <div class="auth-menu">
    <!-- Version desktop : Boutons texte -->
    <div class="desktop-actions">
      <Button href="/login" variant="primary">Me connecter</Button>
      <Button href="/register" variant="secondary">Rejoindre</Button>
    </div>

    <!-- Version mobile : Icônes -->
    <div class="mobile-actions">
      <a 
        href="/login" 
        class="icon-button login-icon" 
        aria-label="Se connecter" 
        title="Se connecter"
      >
        <LogIn size={20} />
      </a>
      <a 
        href="/register" 
        class="icon-button signup-icon" 
        aria-label="Rejoindre" 
        title="Rejoindre"
      >
        <UserPlus size={20} />
      </a>
    </div>
  </div>
{/if}

<style>
  /* ========================================
     USER MENU (utilisateur connecté)
     ======================================== */

  .user-menu {
    display: flex;
    align-items: center;
  }

  .user-menu-desktop {
    display: none;
  }

  .user-menu-mobile {
    display: flex;
    gap: 0.5rem;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 0.5rem;
    color: #e8e9ef;
    font-weight: 600;
  }

  .btn-logout {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background: #e63946;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
  }

  .btn-logout:hover {
    background: #d62839;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(230, 57, 70, 0.3);
  }

  /* ========================================
     AUTH MENU (utilisateur non connecté)
     ======================================== */

  .auth-menu {
    display: flex;
    align-items: center;
  }

  .desktop-actions {
    display: none;
  }

  .mobile-actions {
    display: flex;
    position: absolute;
    right: 0.75rem;
    gap: 0.5rem;
  }

  /* ========================================
     BOUTONS ICÔNES (mobile)
     ======================================== */

  .icon-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    text-decoration: none;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    flex-shrink: 0;
    cursor: pointer;
  }

  /* Connexion */
  .login-icon {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border-color: rgba(102, 126, 234, 0.5);
  }

  .login-icon:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  }

  /* Inscription */
  .signup-icon {
    background: rgba(255, 255, 255, 0.9);
    color: #667eea;
    border-color: #667eea;
  }

  .signup-icon:hover {
    background: #667eea;
    color: white;
    transform: scale(1.1);
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
  }

  /* Profil */
  .profile-icon {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    border-color: #667eea;
  }

  .profile-icon:hover {
    background: #667eea;
    color: white;
    transform: scale(1.1);
  }

  /* Déconnexion */
  .logout-icon {
    background: rgba(230, 57, 70, 0.1);
    color: #e63946;
    border-color: #e63946;
  }

  .logout-icon:hover {
    background: #e63946;
    color: white;
    transform: scale(1.1);
  }

  /* ========================================
     TABLETTE (768px+)
     ======================================== */

  @media (min-width: 768px) {
    .user-menu-desktop {
      display: flex;
      gap: 1rem;
      align-items: center;
    }

    .user-menu-mobile {
      display: none;
    }

    .desktop-actions {
      display: flex;
      gap: 1rem;
    }

    .mobile-actions {
      display: none;
      position: static;
    }
  }
</style>