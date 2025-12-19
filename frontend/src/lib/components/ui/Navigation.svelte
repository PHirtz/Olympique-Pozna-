<script>
  import UserMenu from '../UserMenu.svelte';
  import Language from './Langage.svelte';
  import { _ } from 'svelte-i18n';
  import { Menu, X, ChevronDown } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let open = false;
  let visible = false;
  
  /** @type {string | null} */
  let openDropdown = null;
  
  /** @type {string | null} */
  let openSubmenu = null;
  
  /** @type {string | null} */
  let openSubSubmenu = null;

  /** @type {ReturnType<typeof setTimeout> | null} */
  let closeTimeout = null;

  const toggleMenu = () => {
    open = !open;
  };

  const closeDropdownWithDelay = () => {
    closeTimeout = setTimeout(() => {
      openDropdown = null;
      openSubmenu = null;
      openSubSubmenu = null;
    }, 800); // Délai augmenté à 800ms pour plus de confort
  };

  const cancelClose = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      closeTimeout = null;
    }
  };

  const close = () => {
    open = false;
    openDropdown = null;
    openSubmenu = null;
    openSubSubmenu = null;
  };

  /**
   * Ouvre un dropdown (pour desktop)
   * @param {string} name
   */
  const openDropdownMenu = (name) => {
    cancelClose();
    openDropdown = name;
  };

  /**
   * Toggle dropdown (pour mobile)
   * @param {string} name
   */
  const toggleDropdown = (name) => {
    openDropdown = openDropdown === name ? null : name;
    if (openDropdown !== name) {
      openSubmenu = null;
      openSubSubmenu = null;
    }
  };

  /**
   * @param {string} name
   */
  const toggleSubmenu = (name) => {
    openSubmenu = openSubmenu === name ? null : name;
    if (openSubmenu !== name) {
      openSubSubmenu = null;
    }
  };

  /**
   * @param {string} name
   */
  const toggleSubSubmenu = (name) => {
    openSubSubmenu = openSubSubmenu === name ? null : name;
  };

  const handleKeydown = (/** @type {KeyboardEvent} */ e) => {
    if (e.key === 'Escape') {
      close();
    }
  };

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);
  });
</script>

<nav class="nav" class:visible>
  <div class="nav-container">
    <a href="/" class="logo-container">
      <img src="/logo.png" alt="Logo Olympique Poznań" class="logo-olympique-poznan" />
    </a>

    <!-- DESKTOP NAVIGATION -->
    <div class="nav-links">
      
      <a href="https://olympique.pl/" class="nav-link shop-link" style="animation-delay: 0.2s">
        {$_('nav.shop')}
        <span class="new-badge">
          <span class="badge-text">NEW</span>
          <span class="shine"></span>
        </span>
      </a>
            
      <!-- DROPDOWN : Le Club -->
      <div 
        class="dropdown" 
        style="animation-delay: 0.3s"
        on:mouseenter={() => openDropdownMenu('club')}
        on:mouseleave={closeDropdownWithDelay}
      >
        <button class="nav-link dropdown-trigger">
          {$_('nav.club')}
          <ChevronDown size={16} />
        </button>
        
        {#if openDropdown === 'club'}
          <div 
            class="dropdown-menu" 
            on:mouseenter={cancelClose}
            on:mouseleave={closeDropdownWithDelay}
            role="menu"
            tabindex="-1"
          >
            <a href="/club/about" class="dropdown-item" role="menuitem">{$_('club.about')}</a>
            <a href="/club/coaches" class="dropdown-item" role="menuitem">{$_('club.coaches')}</a>
            <a href="/club/partners" class="dropdown-item" role="menuitem">{$_('club.partners')}</a>
            <a href="/club/status" class="dropdown-item" role="menuitem">{$_('club.status')}</a>
            <a href="https://docs.google.com/document/d/1GDOQUc8G9FQZjQTDuLBw_grxg1bKWg1a2V8GhbsnGU0/edit?tab=t.0" class="dropdown-item" role="menuitem">{$_('club.documents.title')}</a>
          </div>
        {/if}
      </div>
      
    <!-- DROPDOWN : Nos Équipes (DESKTOP) -->
    <div 
      class="dropdown teams-dropdown" 
      style="animation-delay: 0.4s"
      on:mouseenter={() => openDropdownMenu('teams')}
      on:mouseleave={closeDropdownWithDelay}
      role="group"
    >
      <button class="nav-link dropdown-trigger">
        {$_('nav.teams')}
        <ChevronDown size={16} />
      </button>
      
      {#if openDropdown === 'teams'}
        <div 
          class="dropdown-menu teams-menu" 
          role="menu"
          tabindex="-1"
          on:mouseenter={cancelClose}
        >          
          <!-- Les Dames -->
          <a href="/teams/ladies" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.ladies')}
          </a>
          
          <!-- Les Bleus -->
          <a href="/teams/blues" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.blues')}
          </a>
          
          <!-- Olivier Giroud -->
          <a href="/teams/giroud" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.giroud')}
          </a>
          
          <!-- Désiré Doué avec sous-menu joueurs -->
          <div 
            class="submenu" 
            on:mouseenter={cancelClose}
            role="group"
          >
            <button class="dropdown-item submenu-trigger" role="menuitem" aria-haspopup="true" tabindex="0">
              {$_('teams.doue.title')}
              <span class="icon-rotate-90">
                <ChevronDown size={14} />
              </span>
            </button>
            <div 
              class="submenu-content" 
              role="menu" 
              tabindex="-1"
              on:mouseenter={cancelClose}
            >
              <a href="/teams/doue/players/craczyk" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.doue.players.craczyk')}</a>
              <a href="/teams/doue/players/wutezi" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.doue.players.wutezi')}</a>
              <a href="/teams/doue/players/gartecki" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.doue.players.gartecki')}</a>
              <a href="/teams/doue/players/zok" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.doue.players.zok')}</a>
              <a href="/teams/doue/players/bielecki" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.doue.players.bielecki')}</a>
              <a href="/teams/doue/players/ceglowski" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.doue.players.ceglowski')}</a>
              <a href="/teams/doue/players/namysl" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.doue.players.namysl')}</a>
              <a href="/teams/doue/players/wesolowski" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.doue.players.wesolowski')}</a>
              <a href="/teams/doue/players/wegner" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.doue.players.wegner')}</a>
              <a href="/teams/doue/players/majchrowicz" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.doue.players.majchrowicz')}</a>
              <a href="/teams/doue/players/pyzalka" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.doue.players.pyzalka')}</a>
            </div>
          </div>
          
          <!-- Antoine Griezmann -->
          <a href="/teams/griezmann" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.griezmann')}
          </a>
          
          <!-- Kingsley Coman -->
          <a href="/teams/coman" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.coman')}
          </a>
          
          <!-- Kadidiatou Diani -->
          <a href="/teams/diani" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.diani')}
          </a>
          
          <!-- Wendie Renard -->
          <a href="/teams/renard" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.renard')}
          </a>
          
          <!-- Eugénie Le Sommer -->
          <a href="/teams/lesommer" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.lesommer')}
          </a>
          
          <!-- Thierry Henry -->
          <a href="/teams/henry" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.henry')}
          </a>
        </div>
      {/if}
    </div>
      
      <a href="/camps" class="nav-link" style="animation-delay: 0.5s">
        {$_('nav.camps')}
      </a>
      
      <a href="https://drive.google.com/drive/folders/1Qm9yOZJ9_sKRuJ70V8KSa1FrcSgxwXRW" class="nav-link" style="animation-delay: 0.1s">
        {$_('nav.photo')}
      </a>

    </div>

    <!-- Actions à droite (desktop) -->
    <div class="desktop-user-menu">
      <div class="nav-actions">
        <Language />
        <UserMenu />
      </div>
    </div>

    <!-- Burger (mobile) -->
    <button class="menu-toggle" on:click={toggleMenu} aria-label={$_('nav.menu')} aria-expanded={open}>
      {#if open}
        <X size={28} />
      {:else}
        <Menu size={28} />
      {/if}
    </button>
  </div>
</nav>

<!-- MOBILE DRAWER -->
<div 
  class="mobile-drawer" 
  class:open 
  role="dialog" 
  aria-modal="true"
  aria-label={$_('nav.mobileMenu')}
>
  <div class="drawer-content">
    <button class="close-btn" on:click={close} aria-label={$_('common.close')}>
      <X size={24} />
    </button>

    <nav aria-label={$_('nav.mainNavigation')}>
      <ul class="mobile-menu">
        <li><a href="/" on:click={close}>{$_('nav.home')}</a></li>
        <li>
          <a href="https://olympique.pl/" on:click={close} class="shop-mobile-link">
            {$_('nav.shop')}
            <span class="new-badge">
              <span class="badge-text">NEW</span>
              <span class="shine"></span>
            </span>
          </a>
        </li>        
        <!-- Le Club (mobile) -->
        <li class="mobile-dropdown">
          <button class="mobile-dropdown-trigger" on:click={() => toggleDropdown('club-mobile')}>
            {$_('nav.club')}
            <span class="icon-wrapper" class:rotate={openDropdown === 'club-mobile'}>
              <ChevronDown size={16} />
            </span>          
          </button>
          
          {#if openDropdown === 'club-mobile'}
            <ul class="mobile-submenu">
              <li><a href="/club/about" on:click={close}>{$_('club.about')}</a></li>
              <li><a href="/club/coaches" on:click={close}>{$_('club.coaches')}</a></li>
              <li><a href="/club/partner" on:click={close}>{$_('club.partners')}</a></li>
              <li><a href="/club/status" on:click={close}>{$_('club.status')}</a></li>  
              <li>
                <a 
                  href="https://docs.google.com/document/d/1GDOQUc8G9FQZjQTDuLBw_grxg1bKWg1a2V8GhbsnGU0/edit?tab=t.0" 
                  target="_blank"
                  rel="noopener noreferrer"
                  on:click={close}
                >
                  {$_('club.documents.title')}
                </a>
              </li>
            </ul>
          {/if}
        </li>
        
        <!-- Nos Équipes (mobile) -->
        <li class="mobile-dropdown">
          <button class="mobile-dropdown-trigger" on:click={() => toggleDropdown('teams-mobile')}>
            {$_('nav.teams')}
            <span class="icon-wrapper" class:rotate={openDropdown === 'teams-mobile'}>
              <ChevronDown size={16} />
            </span>
          </button>
          
          {#if openDropdown === 'teams-mobile'}
            <ul class="mobile-submenu">
              <li><a href="/teams/ladies" on:click={close}>{$_('teams.ladies')}</a></li>
              <li><a href="/teams/blues" on:click={close}>{$_('teams.blues')}</a></li>
              <li><a href="/teams/giroud" on:click={close}>{$_('teams.giroud')}</a></li>
              
              <!-- Désiré Doué avec joueurs -->
              <li class="mobile-subsubmenu">
                <button class="mobile-subsubmenu-trigger" on:click={() => toggleSubmenu('doue-mobile')}>
                  {$_('teams.doue.title')}
                  <span class="icon-wrapper" class:rotate={openSubmenu === 'doue-mobile'}>
                    <ChevronDown size={14} />
                  </span>
                </button>
                
                {#if openSubmenu === 'doue-mobile'}
                  <ul class="mobile-subsubmenu-list">
                    <li><a href="/teams/doue/players/craczyk" on:click={close}>{$_('teams.doue.players.craczyk')}</a></li>
                    <li><a href="/teams/doue/players/wutezi" on:click={close}>{$_('teams.doue.players.wutezi')}</a></li>
                    <li><a href="/teams/doue/players/gartecki" on:click={close}>{$_('teams.doue.players.gartecki')}</a></li>
                    <li><a href="/teams/doue/players/zok" on:click={close}>{$_('teams.doue.players.zok')}</a></li>
                    <li><a href="/teams/doue/players/bielecki" on:click={close}>{$_('teams.doue.players.bielecki')}</a></li>
                    <li><a href="/teams/doue/players/ceglowski" on:click={close}>{$_('teams.doue.players.ceglowski')}</a></li>
                    <li><a href="/teams/doue/players/namysl" on:click={close}>{$_('teams.doue.players.namysl')}</a></li>
                    <li><a href="/teams/doue/players/wesolowski" on:click={close}>{$_('teams.doue.players.wesolowski')}</a></li>
                    <li><a href="/teams/doue/players/wegner" on:click={close}>{$_('teams.doue.players.wegner')}</a></li>
                    <li><a href="/teams/doue/players/majchrowicz" on:click={close}>{$_('teams.doue.players.majchrowicz')}</a></li>
                    <li><a href="/teams/doue/players/pyzalka" on:click={close}>{$_('teams.doue.players.pyzalka')}</a></li>
                  </ul>
                {/if}
              </li>
              <li><a href="/teams/griezmann" on:click={close}>{$_('teams.griezmann')}</a></li>
              <li><a href="/teams/coman" on:click={close}>{$_('teams.coman')}</a></li>
              <li><a href="/teams/diani" on:click={close}>{$_('teams.diani')}</a></li>
              <li><a href="/teams/renard" on:click={close}>{$_('teams.renard')}</a></li>
              <li><a href="/teams/lesommer" on:click={close}>{$_('teams.lesommer')}</a></li>
              <li><a href="/teams/henry" on:click={close}>{$_('teams.henry')}</a></li>
            </ul>
          {/if}
        </li>
        <li><a href="/camps" on:click={close}>{$_('nav.camps')}</a></li>
        <li><a href="https://drive.google.com/drive/folders/1Qm9yOZJ9_sKRuJ70V8KSa1FrcSgxwXRW" on:click={close}>{$_('nav.photo')}</a></li>          
      </ul>
    </nav>

    <div class="mobile-user-menu">
      <Language />
      <UserMenu />
    </div>
  </div>
</div>

{#if open}
  <div 
    class="overlay" 
    on:click={close}
    on:keydown={handleKeydown}
    role="button"
    tabindex="0"
    aria-label={$_('common.close')}
  ></div>
{/if}

<style>
/* ========================================
   BASE : MOBILE FIRST (320px+)
   ======================================== */

/* ICON WRAPPER */
.icon-wrapper {
  display: inline-flex;
  transition: transform 0.3s ease;
}

.icon-wrapper.rotate {
  transform: rotate(180deg);
}

/* NAVIGATION PRINCIPALE */
.nav {
  background: transparent;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 999;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

/* LOGO */
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
  height: 50px;
}

/* LIENS DE NAVIGATION (cachés sur mobile) */
.nav-links {
  display: none;
}

/* USER MENU (caché sur mobile) */
.desktop-user-menu {
  display: none;
}

/* BURGER MENU (visible sur mobile) */
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
  color: #1a4d7a;
}

/* ========================================
   MOBILE DRAWER
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
  color: #1a4d7a;
}

/* MOBILE MENU */
.mobile-menu {
  list-style: none;
  padding: 0;
  margin: 3rem 0 2rem 0;
}

.mobile-menu > li {
  margin: 0.5rem 0;
}

.mobile-menu > li > a {
  display: flex;
  align-items: center;
  padding: 1rem;
  color: #333;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s;
}

.mobile-menu > li > a:hover {
  background: rgba(26, 77, 122, 0.15);
  color: #1a4d7a;
}

/* MOBILE DROPDOWN TRIGGER */
.mobile-dropdown-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  background: none;
  border: none;
  color: #333;
  font-size: 1.05rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  text-align: left;
}

.mobile-dropdown-trigger:hover {
  background: rgba(26, 77, 122, 0.15);
  color: #1a4d7a;
}

/* MOBILE SUBMENU */
.mobile-submenu {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 1rem;
}

.mobile-submenu li {
  margin: 0.25rem 0;
}

.mobile-submenu a {
  display: block;
  padding: 0.75rem 1rem;
  color: #555;
  text-decoration: none;
  font-size: 0.95rem;
  border-radius: 6px;
  transition: all 0.2s;
}

.mobile-submenu a:hover {
  background: rgba(26, 77, 122, 0.1);
  color: #1a4d7a;
}

/* MOBILE SUBSUBMENU */
.mobile-subsubmenu-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: #555;
  font-size: 0.95rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  text-align: left;
}

.mobile-subsubmenu-trigger:hover {
  background: rgba(26, 77, 122, 0.1);
  color: #1a4d7a;
}

.mobile-subsubmenu-list {
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 1rem;
}

.mobile-subsubmenu-list a {
  display: block;
  padding: 0.65rem 1rem;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  border-radius: 4px;
}

.mobile-subsubmenu-list a:hover {
  background: rgba(26, 77, 122, 0.08);
  color: #1a4d7a;
}

/* MOBILE USER MENU */
.mobile-user-menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/* OVERLAY */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  cursor: pointer;
  animation: fadeInOverlay 0.3s;
}

@keyframes fadeInOverlay {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.overlay:focus {
  outline: none;
}

/* NEW BADGE MOBILE */
.shop-mobile-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.shop-mobile-link .new-badge {
  position: relative;
  top: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* ========================================
   NEW BADGE - VERSION DORÉE
   ======================================== */

.new-badge {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 50%, #ffc107 100%);
  background-size: 200% 200%;
  color: #1a1a1a;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 0.25rem 0.5rem;
  border-radius: 8px;
  letter-spacing: 0.8px;
  box-shadow: 
    0 4px 15px rgba(255, 215, 0, 0.5),
    0 2px 8px rgba(255, 237, 78, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  animation: badgePulse 2s ease-in-out infinite, gradientShift 4s ease infinite;
  overflow: hidden;
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.badge-text {
  position: relative;
  z-index: 2;
  display: block;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
}

.shine {
  position: absolute;
  top: -50%;
  left: -100%;
  width: 60%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.2) 80%,
    transparent 100%
  );
  transform: skewX(-25deg);
  animation: shine 3s ease-in-out infinite;
  z-index: 3;
  pointer-events: none;
}

@keyframes badgePulse {
  0%, 100% {
    transform: scale(1) rotate(-2deg);
    box-shadow: 
      0 4px 15px rgba(255, 215, 0, 0.5),
      0 2px 8px rgba(255, 237, 78, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    transform: scale(1.1) rotate(2deg);
    box-shadow: 
      0 6px 20px rgba(255, 215, 0, 0.7),
      0 3px 12px rgba(255, 237, 78, 0.6),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
}

@keyframes gradientShift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes shine {
  0% {
    left: -100%;
  }
  20% {
    left: 100%;
  }
  100% {
    left: 100%;
  }
}

/* ========================================
   TABLETTE (768px+)
   ======================================== */

@media (min-width: 768px) {
  .nav-container {
    padding: 1rem 2rem;
    gap: 2rem;
    max-width: 100%;
  }

  .logo-olympique-poznan {
    height: 60px;
  }

  /* Cacher le burger, afficher la nav desktop */
  .menu-toggle {
    display: none;
  }

  .nav-links {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    padding: 0.75rem 1rem;
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s;
    border-radius: 8px;
    white-space: nowrap;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: #0f2d4a54;
    border: none;
    cursor: pointer;
    font-family: inherit;
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

  .nav-link:hover,
  .nav-link:focus {
    color: #1a4d7a;
    background: rgba(26, 77, 122, 0.08);
  }

  .desktop-user-menu {
    display: block;
    flex-shrink: 0;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  /* NEW BADGE DESKTOP */
  .shop-link {
    position: relative;
  }

  .shop-link .new-badge {
    position: absolute;
    top: -10px;
    right: -12px;
  }

  .nav-link:hover .new-badge {
    animation: badgePulse 2s ease-in-out infinite, gradientShift 4s ease infinite, bounceIn 0.6s ease;
  }

  @keyframes bounceIn {
    0%, 100% {
      transform: scale(1.1) rotate(2deg);
    }
    50% {
      transform: scale(1.2) rotate(-2deg);
    }
  }

  /* Cacher le drawer mobile */
  .mobile-drawer {
    display: none;
  }

  /* DROPDOWN DESKTOP */
  .dropdown {
    position: relative;
  }

  .dropdown-trigger {
    cursor: pointer;
  }

  .dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 300px;
    background: rgb(255, 255, 255);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 0.5rem 0;
    margin-top: 0.25rem; /* Réduit pour éviter les zones mortes */
    animation: fadeInDropdown 0.2s;
    z-index: 1000;
  }

  /* Zone de tolérance invisible pour éviter que le menu se ferme */
  .dropdown::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 0.5rem; /* Zone invisible qui maintient le hover */
    z-index: 999;
  }

  @keyframes fadeInDropdown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .dropdown-item {
    display: block;
    padding: 0.75rem 1.25rem;
    color: #333;
    text-decoration: none;
    transition: all 0.2s;
    font-weight: 500;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
  }

  .dropdown-item:hover {
    background: rgba(26, 77, 122, 0.08);
    color: #1a4d7a;
  }

  /* SUBMENU (Niveau 2) */
  .submenu {
    position: relative;
  }

  .submenu-trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .icon-rotate-90 {
    transform: rotate(-90deg);
  }

  /* Zone de tolérance pour le submenu */
  .submenu::before {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    width: 0.5rem; /* Zone invisible qui maintient le hover */
    height: 100%;
    z-index: 999;
  }

  .submenu:hover .submenu-content {
    display: block;
  }

  .submenu-content {
    display: none;
    position: absolute;
    left: 100%;
    top: 0;
    min-width: 200px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    padding: 0.5rem 0;
    margin-left: 0.25rem; /* Réduit pour éviter les zones mortes */
    animation: fadeInDropdown 0.2s;
    z-index: 1000;
  }

  .submenu-item {
    display: block;
    padding: 0.65rem 1rem;
    color: #555;
    text-decoration: none;
    transition: all 0.2s;
    font-size: 0.95rem;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-weight: 500;
  }

  .submenu-item:hover {
    background: rgba(26, 77, 122, 0.08);
    color: #1a4d7a;
  }
}

/* ========================================
   DESKTOP (1024px+)
   ======================================== */

@media (min-width: 1024px) {
  .logo-olympique-poznan {
    height: 70px;
  }

  .nav-container {
    padding: 1.25rem 3rem;
    gap: 3rem;
  }

  .nav-link {
    font-size: 1rem;
    gap: 2rem;
    padding: 0.875rem 1.25rem;
  }

  .nav-links {
    gap: 2.5rem;
  }
}

/* ========================================
   GRAND DESKTOP (1200px+)
   ======================================== */

@media (min-width: 1200px) {
  .logo-olympique-poznan {
    height: 80px;
  }

  .nav-container {
    padding: 1.25rem 4rem;
  }

  .nav-link {
    font-size: 1.05rem;
    padding: 1rem 1.5rem;
  }

  .nav-links {
    gap: 3rem;
  }
}

/* ========================================
   TRÈS GRAND DESKTOP (1400px+)
   ======================================== */

@media (min-width: 1400px) {
  .logo-olympique-poznan {
    height: 90px;
  }

  .nav-container {
    padding: 1.5rem 5rem;
  }

  .nav-links {
    gap: 4rem;
  }
}
</style>