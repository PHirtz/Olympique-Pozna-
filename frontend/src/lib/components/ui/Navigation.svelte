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
  let openSubSubmenu = null; // Pour les joueurs de Désiré Doué

  const toggleMenu = () => {
    open = !open;
  };

  const close = () => {
    open = false;
    openDropdown = null;
    openSubmenu = null;
    openSubSubmenu = null;
  };

  /**
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
      <a href="/news" class="nav-link" style="animation-delay: 0.1s">
        {$_('nav.news')}
      </a>
      
      <a href="/shop" class="nav-link" style="animation-delay: 0.2s">
        {$_('nav.shop')}
      </a>
      
      <!-- DROPDOWN : Le Club -->
      <div class="dropdown" style="animation-delay: 0.3s">
        <button class="nav-link dropdown-trigger" on:mouseenter={() => toggleDropdown('club')}>
          {$_('nav.club')}
          <ChevronDown size={16} />
        </button>
        
        {#if openDropdown === 'club'}
          <div 
            class="dropdown-menu" 
            on:mouseleave={() => openDropdown = null}
            role="menu"
                  tabindex="-1"
          >
            <a href="/club/about" class="dropdown-item" role="menuitem">{$_('club.about')}</a>
            <a href="/club/coaches" class="dropdown-item" role="menuitem">{$_('club.coaches')}</a>
            <a href="/club/support" class="dropdown-item" role="menuitem">{$_('club.support')}</a>
            <a href="/club/status" class="dropdown-item" role="menuitem">{$_('club.status')}</a>
            
            <div class="submenu">
              <button class="dropdown-item submenu-trigger" role="menuitem" aria-haspopup="true">
                {$_('club.documents.title')}
                <span class="icon-rotate-90">
                  <ChevronDown size={14} />
                </span>
              </button>
              <div class="submenu-content" role="menu">
                <a href="/club/documents/cgv" class="submenu-item" role="menuitem">{$_('club.documents.cgv')}</a>
                <a href="/club/documents/statutes" class="submenu-item" role="menuitem">{$_('club.documents.statutes')}</a>
                <a href="/club/documents/regulations" class="submenu-item" role="menuitem">{$_('club.documents.regulations')}</a>
              </div>
            </div>
            
            <a href="/contact" class="dropdown-item" role="menuitem">{$_('nav.contact')}</a>
          </div>
        {/if}
      </div>
      
    <!-- DROPDOWN : Nos Équipes (DESKTOP) -->
    <div 
      class="dropdown" 
      style="animation-delay: 0.4s"
      on:mouseenter={cancelClose}
      on:mouseleave={closeDropdownWithDelay}
      role="group"
    >
      <button class="nav-link dropdown-trigger" on:mouseenter={() => toggleDropdown('teams')}>
        {$_('nav.teams')}
        <ChevronDown size={16} />
      </button>
      
      {#if openDropdown === 'teams'}
        <div 
          class="dropdown-menu" 
          role="menu"
          tabindex="-1"
        >
          <!-- Seniors Femmes -->
          <a href="/teams/seniors/women" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.seniors.women')}
          </a>
          
          <!-- Seniors Hommes -->
          <a href="/teams/seniors/men" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.seniors.men')}
          </a>
          
          <!-- Les Dames -->
          <a href="/teams/youth/ladies" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.youth.ladies')}
          </a>
          
          <!-- Les Bleus -->
          <a href="/teams/youth/blues" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.youth.blues')}
          </a>
          
          <!-- Olivier Giroud -->
          <a href="/teams/youth/giroud" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.youth.giroud')}
          </a>
          
          <!-- Désiré Doué avec sous-menu joueurs -->
          <div class="submenu">
            <button class="dropdown-item submenu-trigger" role="menuitem" aria-haspopup="true" tabindex="0">
              {$_('teams.youth.doue.title')}
              <span class="icon-rotate-90">
                <ChevronDown size={14} />
              </span>
            </button>
            <div class="submenu-content" role="menu" tabindex="-1">
              <a href="/teams/youth/doue/players/craczyk" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.youth.doue.players.craczyk')}</a>
              <a href="/teams/youth/doue/players/wutezi" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.youth.doue.players.wutezi')}</a>
              <a href="/teams/youth/doue/players/gartecki" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.youth.doue.players.gartecki')}</a>
              <a href="/teams/youth/doue/players/zok" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.youth.doue.players.zok')}</a>
              <a href="/teams/youth/doue/players/bielecki" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.youth.doue.players.bielecki')}</a>
              <a href="/teams/youth/doue/players/ceglowski" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.youth.doue.players.ceglowski')}</a>
              <a href="/teams/youth/doue/players/namysl" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.youth.doue.players.namysl')}</a>
              <a href="/teams/youth/doue/players/wesolowski" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.youth.doue.players.wesolowski')}</a>
              <a href="/teams/youth/doue/players/wegner" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.youth.doue.players.wegner')}</a>
              <a href="/teams/youth/doue/players/majchrowicz" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.youth.doue.players.majchrowicz')}</a>
              <a href="/teams/youth/doue/players/pyzalka" class="submenu-item" role="menuitem" tabindex="0">{$_('teams.youth.doue.players.pyzalka')}</a>
            </div>
          </div>
          
          <!-- Antoine Griezmann -->
          <a href="/teams/youth/griezmann" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.youth.griezmann')}
          </a>
          
          <!-- Kingsley Coman -->
          <a href="/teams/youth/coman" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.youth.coman')}
          </a>
          
          <!-- Kadidiatou Diani -->
          <a href="/teams/youth/diani" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.youth.diani')}
          </a>
          
          <!-- Wendie Renard -->
          <a href="/teams/youth/renard" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.youth.renard')}
          </a>
          
          <!-- Eugénie Le Sommer -->
          <a href="/teams/youth/lesommer" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.youth.lesommer')}
          </a>
          
          <!-- Thierry Henry -->
          <a href="/teams/youth/henry" class="dropdown-item" role="menuitem" tabindex="0">
            {$_('teams.youth.henry')}
          </a>
        </div>
      {/if}
    </div>
      
      <a href="/camps" class="nav-link" style="animation-delay: 0.5s">
        {$_('nav.camps')}
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
        <li><a href="/news" on:click={close}>{$_('nav.news')}</a></li>
        <li><a href="/shop" on:click={close}>{$_('nav.shop')}</a></li>
        
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
              <li><a href="/club/support" on:click={close}>{$_('club.support')}</a></li>
              <li><a href="/club/status" on:click={close}>{$_('club.status')}</a></li>
              
              <li class="mobile-subsubmenu">
                <button class="mobile-subsubmenu-trigger" on:click={() => toggleSubmenu('documents-mobile')}>
                  {$_('club.documents.title')}
                  <span class="icon-wrapper" class:rotate={openSubmenu === 'documents-mobile'}>
                    <ChevronDown size={14} />
                  </span>                
                </button>
                
                {#if openSubmenu === 'documents-mobile'}
                  <ul class="mobile-subsubmenu-list">
                    <li><a href="/club/documents/cgv" on:click={close}>{$_('club.documents.cgv')}</a></li>
                    <li><a href="/club/documents/statutes" on:click={close}>{$_('club.documents.statutes')}</a></li>
                    <li><a href="/club/documents/regulations" on:click={close}>{$_('club.documents.regulations')}</a></li>
                  </ul>
                {/if}
              </li>
              
              <li><a href="/contact" on:click={close}>{$_('nav.contact')}</a></li>
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
              <li><a href="/teams/seniors/women" on:click={close}>{$_('teams.seniors.women')}</a></li>
              <li><a href="/teams/seniors/men" on:click={close}>{$_('teams.seniors.men')}</a></li>
              <li><a href="/teams/youth/ladies" on:click={close}>{$_('teams.youth.ladies')}</a></li>
              <li><a href="/teams/youth/blues" on:click={close}>{$_('teams.youth.blues')}</a></li>
              <li><a href="/teams/youth/giroud" on:click={close}>{$_('teams.youth.giroud')}</a></li>
              
              <!-- Désiré Doué avec joueurs -->
              <li class="mobile-subsubmenu">
                <button class="mobile-subsubmenu-trigger" on:click={() => toggleSubmenu('doue-mobile')}>
                  {$_('teams.youth.doue.title')}
                  <span class="icon-wrapper" class:rotate={openSubmenu === 'doue-mobile'}>
                    <ChevronDown size={14} />
                  </span>
                </button>
                
                {#if openSubmenu === 'doue-mobile'}
                  <ul class="mobile-subsubmenu-list">
                    <li><a href="/teams/youth/doue/players/craczyk" on:click={close}>{$_('teams.youth.doue.players.craczyk')}</a></li>
                    <li><a href="/teams/youth/doue/players/wutezi" on:click={close}>{$_('teams.youth.doue.players.wutezi')}</a></li>
                    <li><a href="/teams/youth/doue/players/gartecki" on:click={close}>{$_('teams.youth.doue.players.gartecki')}</a></li>
                    <li><a href="/teams/youth/doue/players/zok" on:click={close}>{$_('teams.youth.doue.players.zok')}</a></li>
                    <li><a href="/teams/youth/doue/players/bielecki" on:click={close}>{$_('teams.youth.doue.players.bielecki')}</a></li>
                    <li><a href="/teams/youth/doue/players/ceglowski" on:click={close}>{$_('teams.youth.doue.players.ceglowski')}</a></li>
                    <li><a href="/teams/youth/doue/players/namysl" on:click={close}>{$_('teams.youth.doue.players.namysl')}</a></li>
                    <li><a href="/teams/youth/doue/players/wesolowski" on:click={close}>{$_('teams.youth.doue.players.wesolowski')}</a></li>
                    <li><a href="/teams/youth/doue/players/wegner" on:click={close}>{$_('teams.youth.doue.players.wegner')}</a></li>
                    <li><a href="/teams/youth/doue/players/majchrowicz" on:click={close}>{$_('teams.youth.doue.players.majchrowicz')}</a></li>
                    <li><a href="/teams/youth/doue/players/pyzalka" on:click={close}>{$_('teams.youth.doue.players.pyzalka')}</a></li>
                  </ul>
                {/if}
              </li>
              
              <li><a href="/teams/youth/griezmann" on:click={close}>{$_('teams.youth.griezmann')}</a></li>
              <li><a href="/teams/youth/coman" on:click={close}>{$_('teams.youth.coman')}</a></li>
              <li><a href="/teams/youth/diani" on:click={close}>{$_('teams.youth.diani')}</a></li>
              <li><a href="/teams/youth/renard" on:click={close}>{$_('teams.youth.renard')}</a></li>
              <li><a href="/teams/youth/lesommer" on:click={close}>{$_('teams.youth.lesommer')}</a></li>
              <li><a href="/teams/youth/henry" on:click={close}>{$_('teams.youth.henry')}</a></li>
            </ul>
          {/if}
        </li>
        
        <li><a href="/camps" on:click={close}>{$_('nav.camps')}</a></li>
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

  .nav-link {
    padding: 0.75rem 1rem;
    color: #333;
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
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  .nav-link:hover,
  .nav-link:focus {
    color: #1a4d7a;
    background: rgba(26, 77, 122, 0.08);
  }

  /* USER MENU (caché sur mobile) */
  .desktop-user-menu {
    display: none;
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
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

  /* MOBILE SUBSUBSUBMENU (Joueurs) */
  .mobile-subsubsubmenu-trigger {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.6rem 0.875rem;
    background: none;
    border: none;
    color: #666;
    font-size: 0.85rem;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    font-family: inherit;
    text-align: left;
  }

  .mobile-subsubsubmenu-trigger:hover {
    background: rgba(26, 77, 122, 0.08);
    color: #1a4d7a;
  }

  .mobile-subsubsubmenu-list {
    list-style: none;
    padding: 0;
    margin: 0.25rem 0 0 1rem;
  }

  .mobile-subsubsubmenu-list a {
    display: block;
    padding: 0.5rem 0.75rem;
    color: #777;
    text-decoration: none;
    font-size: 0.8rem;
    border-radius: 4px;
  }

  .mobile-subsubsubmenu-list a:hover {
    background: rgba(26, 77, 122, 0.06);
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

  /* ========================================
     TABLETTE (768px+)
     ======================================== */

  @media (min-width: 768px) {
    .nav-container {
      padding: 1rem 2rem;
      gap: 2rem;
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
      gap: 0.5rem;
    }

    .nav-link {
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

    .desktop-user-menu {
      display: block;
      flex-shrink: 0;
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
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      padding: 0.5rem 0;
      margin-top: 0.5rem;
      animation: fadeInDropdown 0.2s;
      z-index: 200;
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
      margin-left: 0.5rem;
      animation: fadeInDropdown 0.2s;
      z-index: 300;
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

    .rotate-icon {
      transform: rotate(-90deg);
      transition: transform 0.3s;
    }

    /* SUBSUBMENU (Niveau 3 - Joueurs) */
    .subsubmenu {
      position: relative;
    }

    .subsubmenu-trigger {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 500;
    }

    .subsubmenu:hover .subsubmenu-content {
      display: block;
    }

    .subsubmenu-content {
      display: none;
      position: absolute;
      left: 100%;
      top: 0;
      min-width: 250px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      padding: 0.5rem 0;
      margin-left: 0.5rem;
      animation: fadeInDropdown 0.2s;
      z-index: 400;
    }

    .subsubmenu-item {
      display: block;
      padding: 0.6rem 0.875rem;
      color: #666;
      text-decoration: none;
      transition: all 0.2s;
      font-size: 0.9rem;
    }

    .subsubmenu-item:hover {
      background: rgba(26, 77, 122, 0.08);
      color: #1a4d7a;
    }

    .rotate-icon-small {
      transform: rotate(-90deg);
      transition: transform 0.3s;
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
      padding: 1.25rem 2rem;
    }

    .nav-link {
      font-size: 1rem;
      padding: 0.875rem 1.25rem;
    }
  }

  /* ========================================
     GRAND DESKTOP (1200px+)
     ======================================== */

  @media (min-width: 1200px) {
    .logo-olympique-poznan {
      height: 80px;
    }

    .nav-link {
      font-size: 1.05rem;
      padding: 1rem 1.5rem;
    }
  }

  /* ========================================
     TRÈS GRAND DESKTOP (1400px+)
     ======================================== */

  @media (min-width: 1400px) {
    .logo-olympique-poznan {
      height: 90px;
    }

    .nav-links {
      gap: 1rem;
    }
  }
</style>