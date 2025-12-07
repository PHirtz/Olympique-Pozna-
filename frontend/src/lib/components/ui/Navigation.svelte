<script>
  import UserMenu from '../UserMenu.svelte';
  import Language from './Langage.svelte';
  import { Menu, X } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let open = false;
  let visible = false;

  const toggleMenu = () => {
    open = !open;
  };

  const close = () => {
    open = false;
  };

  // Gestion clavier pour l'overlay
  const handleKeydown = (/** @type {KeyboardEvent} */ e) => {
    if (e.key === 'Escape') {
      close();
    }
  };

  // Animation en cascade
  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });
</script>

<nav class="nav" class:visible>
  <div class="nav-container">
    <!-- Logo à gauche -->
    <a href="/" class="logo-container">
      <img src="/logo.png" alt="Logo Olympique Poznan" class="logo-olympique-poznan" />
    </a>

    <!-- Liens au centre (desktop uniquement) -->
    <div class="nav-links">
      <a href="/news" class="nav-link" style="animation-delay: 0.1s">News</a>
      <a href="/shop" class="nav-link" style="animation-delay: 0.2s">Shop</a>
      <a href="/club" class="nav-link" style="animation-delay: 0.3s">Le Club</a>
      <a href="/teams" class="nav-link" style="animation-delay: 0.4s">Nos Équipes</a>
      <a href="/camps" class="nav-link" style="animation-delay: 0.5s">Le Camp Olympique</a>
      <a href="/contact" class="nav-link" style="animation-delay: 0.6s">Contact</a>
    </div>

    <!-- Actions à droite (desktop) -->
    <div class="desktop-user-menu">
      <div class="nav-actions">
        <Language />
        <UserMenu />
      </div>
    </div>

    <!-- Burger (mobile) -->
    <button class="menu-toggle" on:click={toggleMenu} aria-label="Menu" aria-expanded={open}>
      {#if open}
        <X size={28} />
      {:else}
        <Menu size={28} />
      {/if}
    </button>
  </div>
</nav>

<!-- Menu mobile (drawer) -->
<div 
  class="mobile-drawer" 
  class:open 
  role="dialog" 
  aria-modal="true"
  aria-label="Menu de navigation"
>
  <div class="drawer-content">
    <button 
      class="close-btn" 
      on:click={close} 
      aria-label="Fermer le menu"
    >
      <X size={24} />
    </button>

    <nav aria-label="Navigation principale mobile">
      <ul class="mobile-menu">
        <li><a href="/" on:click={close}>Accueil</a></li>
        <li><a href="/news" on:click={close}>News</a></li>
        <li><a href="/shop" on:click={close}>Shop</a></li>
        <li><a href="/club" on:click={close}>Le Club</a></li>
        <li><a href="/teams" on:click={close}>Nos Équipes</a></li>
        <li><a href="/camps" on:click={close}>Le Camp Olympique</a></li>
        <li><a href="/contact" on:click={close}>Contact</a></li>
      </ul>
    </nav>

    <div class="mobile-user-menu">
      <Language />
      <UserMenu />
    </div>
  </div>
</div>

<!-- Overlay -->
{#if open}
  <div 
    class="overlay" 
    on:click={close}
    on:keydown={handleKeydown}
    role="button"
    tabindex="0"
    aria-label="Fermer le menu"
  ></div>
{/if}

<style>
  /* ========================================
     NAVIGATION PRINCIPALE
     ======================================== */

  .nav {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .nav-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  /* ========================================
     LOGO (à gauche)
     ======================================== */

  .logo-container {
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    flex-shrink: 0;
  }

  .logo-container:hover {
    transform: scale(1.05);
  }

  .logo-olympique-poznan {
    height: 60px;
  }

  /* ========================================
     LIENS (au centre - desktop uniquement)
     ======================================== */

  .nav-links {
    display: none;
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }

  .nav-link {
    padding: 0.75rem 1.25rem;
    color: #333;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s;
    border-radius: 8px;
    white-space: nowrap;
    position: relative;
    opacity: 0;
    transform: translateY(-10px);
  }

  .nav.visible .nav-link {
    animation: slideDown 0.5s ease-out forwards;
  }

  @keyframes slideDown {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
    transition: width 0.3s;
  }

  .nav-link:hover,
  .nav-link:focus {
    color: #667eea;
    background: rgba(102, 126, 234, 0.08);
    outline: 2px solid transparent;
  }

  .nav-link:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  .nav-link:hover::after {
    width: 70%;
  }

  /* ========================================
     ACTIONS DROITE (Language + UserMenu)
     ======================================== */

  .desktop-user-menu {
    display: none;
    flex-shrink: 0;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  /* ========================================
     BURGER MENU (mobile)
     ======================================== */

  .menu-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: #333;
    transition: color 0.2s;
  }

  .menu-toggle:hover,
  .menu-toggle:focus {
    color: #667eea;
  }

  .menu-toggle:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
    border-radius: 4px;
  }

  /* ========================================
     MENU MOBILE (DRAWER)
     ======================================== */

  .mobile-drawer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 280px;
    background: rgb(229, 226, 221);
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.2);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    overflow-y: auto;
  }

  .mobile-drawer.open {
    transform: translateX(0);
  }

  .drawer-content {
    padding: 2rem 1.5rem;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    padding: 0.5rem;
    transition: color 0.2s;
  }

  .close-btn:hover,
  .close-btn:focus {
    color: #667eea;
  }

  .close-btn:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
    border-radius: 4px;
  }

  .mobile-menu {
    list-style: none;
    padding: 0;
    margin: 3rem 0 2rem 0;
  }

  .mobile-menu li {
    margin: 0.5rem 0;
  }

  .mobile-menu a {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    color: #333;
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 8px;
    transition: all 0.2s;
  }

  .mobile-menu a:hover,
  .mobile-menu a:focus {
    background: rgba(102, 126, 234, 0.15);
    color: #667eea;
  }

  .mobile-menu a:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }

  .mobile-user-menu {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  /* Overlay */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    animation: fadeIn 0.3s;
    cursor: pointer;
  }

  .overlay:focus {
    outline: none;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  /* ========================================
     RESPONSIVE : TABLETTE (768px+)
     ======================================== */

  @media (min-width: 768px) {
    .logo-olympique-poznan {
      height: 70px;
    }

    .menu-toggle {
      display: none;
    }

    .nav-links {
      display: flex;
    }

    .desktop-user-menu {
      display: block;
    }

    .mobile-drawer {
      display: none;
    }
  }

  /* ========================================
     DESKTOP (1024px+)
     ======================================== */

  @media (min-width: 1024px) {
    .logo-olympique-poznan {
      height: 80px;
    }

    .nav-container {
      padding: 1.25rem 2rem;
    }

    .nav-link {
      font-size: 1.05rem;
      padding: 0.875rem 1.5rem;
    }
  }

  /* ========================================
     GRAND DESKTOP (1200px+)
     ======================================== */

  @media (min-width: 1200px) {
    .logo-olympique-poznan {
      height: 90px;
    }

    .nav-link {
      font-size: 1.1rem;
      padding: 1rem 1.75rem;
    }
  }

  /* ========================================
     TRÈS GRAND DESKTOP (1400px+)
     ======================================== */

  @media (min-width: 1400px) {
    .nav-links {
      gap: 1rem;
    }
  }
</style>