<script>
  import { _ } from 'svelte-i18n';
  import { locale } from 'svelte-i18n';
  import { user } from '$lib/stores/auth.js';
  import { logout } from '$lib/api/auth';
  import { goto } from '$app/navigation';
  import { Menu, X, ChevronDown, LogIn, UserPlus, LogOut, User } from 'lucide-svelte';
  import { onMount } from 'svelte';

  let open = false;
  let visible = false;
  let scrollY = 0;
  let navOpacity = 0.1;
  
  /** @type {string | null} */
  let openDropdown = null;
  
  /** @type {string | null} */
  let openSubmenu = null;

  /** @type {ReturnType<typeof setTimeout> | null} */
  let closeTimeout = null;

  let languageDropdownOpen = false;

  const toggleMenu = () => {
    open = !open;
  };

  const closeDropdownWithDelay = () => {
    closeTimeout = setTimeout(() => {
      openDropdown = null;
      openSubmenu = null;
    }, 800);
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
    languageDropdownOpen = false;
  };

  /**
   * Ferme le dropdown de langue si on clique ailleurs
   */
  const handleClickOutside = (/** @type {MouseEvent} */ event) => {
    const target = event.target;
    if (target instanceof Element) {
      const languageDropdown = target.closest('.language-selector-dropdown');
      if (!languageDropdown && languageDropdownOpen) {
        languageDropdownOpen = false;
      }
    }
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
    }
  };

  /**
   * @param {string} name
   */
  const toggleSubmenu = (name) => {
    openSubmenu = openSubmenu === name ? null : name;
  };

  /**
   * Change la langue
   * @param {'pl' | 'en' | 'fr'} lang
   */
  function changeLanguage(lang) {
    locale.set(lang);
    localStorage.setItem('preferredLanguage', lang);
    languageDropdownOpen = false;
  }

  const toggleLanguageDropdown = () => {
    languageDropdownOpen = !languageDropdownOpen;
  };

  /**
   * Retourne le nom complet de la langue
   * @param {'pl' | 'en' | 'fr'} lang
   */
  function getLanguageName(lang) {
    const names = {
      pl: 'Polski',
      fr: 'Français',
      en: 'English'
    };
    return names[lang] || 'Polski';
  }

  /**
   * Retourne le flag emoji de la langue
   * @param {'pl' | 'en' | 'fr'} lang
   */
  function getLanguageFlag(lang) {
    const flags = {
      pl: '🇵🇱',
      fr: '🇫🇷',
      en: '🇬🇧'
    };
    return flags[lang] || '🇵🇱';
  }

  async function handleLogout() {
    await logout();
    close();
    goto('/');
  }

  const handleKeydown = (/** @type {KeyboardEvent} */ e) => {
    if (e.key === 'Escape') {
      close();
    }
  };

  function handleHomeClick(event) {
    event.preventDefault();

    if ($user && $user.role === 'admin') {
      goto('/admin');
    } else {
      goto('/');
    }
  }

  onMount(() => {
    setTimeout(() => {
      visible = true;
    }, 100);

    document.documentElement.style.setProperty('--text-r', '255');
    document.documentElement.style.setProperty('--text-g', '255');
    document.documentElement.style.setProperty('--text-b', '255');

    const handleScroll = () => {
      scrollY = window.scrollY;
      
      // Calculer l'opacité de 0.1 à 0.95
      navOpacity = Math.min(0.1 + (scrollY / 400) * 0.85, 0.95);
      
      // Calculer la couleur du texte : interpolation de blanc (255,255,255) vers bleu (26,77,122)
      const progress = Math.min(scrollY / 400, 1); // 0 à 1
      const r = Math.round(255 - (255 - 26) * progress);
      const g = Math.round(255 - (255 - 77) * progress);
      const b = Math.round(255 - (255 - 122) * progress);
      
      document.documentElement.style.setProperty('--text-r', String(r));
      document.documentElement.style.setProperty('--text-g', String(g));
      document.documentElement.style.setProperty('--text-b', String(b));
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });
</script>

<svelte:window on:click={handleClickOutside} />

<nav class="nav" class:visible>
  <div class="nav-container">
    <a href="/" class="logo-container">
      <img src="/logo.png" alt="Logo Olympique Poznań" class="logo-olympique-poznan" />
    </a>
    <a href="/" class="logo-container" on:click={handleHomeClick}>
      <img src="/home.png" alt="Logo Home" class="logo-home" />
    </a>

    <!-- DESKTOP NAVIGATION -->
    <div class="nav-links">
      
      <a href="https://olympique.pl/" target="_blank" rel="noopener noreferrer" class="nav-link shop-link" style="animation-delay: 0.2s">
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
        role="group"
        on:mouseenter={() => openDropdownMenu('club')}
        on:mouseleave={closeDropdownWithDelay}
      >
        <a href="/club" class="nav-link dropdown-trigger">
          {$_('nav.club')}
          <ChevronDown size={16} />
        </a>
        
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
            <a href="/club/partners" class="dropdown-item" role="menuitem">{$_('club.partners.title')}</a>
            <a 
              href="https://docs.google.com/document/d/1GDOQUc8G9FQZjQTDuLBw_grxg1bKWg1a2V8GhbsnGU0/edit?tab=t.0" 
              target="_blank"
              rel="noopener noreferrer"
              class="dropdown-item"
            >
              {$_('club.status')}
            </a>
            <a 
              href="https://docs.google.com/document/d/1GDOQUc8G9FQZjQTDuLBw_grxg1bKWg1a2V8GhbsnGU0/edit"
              class="dropdown-item"
              target="_blank"
              rel="noopener noreferrer"
            >
              {$_('club.documents.title')}
            </a>
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
        <a href="/teams" class="nav-link dropdown-trigger">
          {$_('nav.teams')}
          <ChevronDown size={16} />
        </a>
        
        {#if openDropdown === 'teams'}
          <div 
            class="dropdown-menu teams-menu" 
            role="menu"
            tabindex="-1"
            on:mouseenter={cancelClose}
          >          
            <!-- Les Dames -->
            <a href="/teams/dames" class="dropdown-item" role="menuitem" tabindex="0">
              {$_('home.teams.feminine.name')}
            </a>
            
            <!-- Les Bleus -->
            <a href="/teams/bleus" class="dropdown-item" role="menuitem" tabindex="0">
              {$_('home.teams.senior.name')}
            </a>
            
            <!-- L'Académie avec sous-menus -->
            <div 
              class="submenu" 
              role="group"
              on:mouseenter={cancelClose}
            >
              <a 
                href="/teams/academy" 
                class="dropdown-item submenu-trigger" 
                role="menuitem" 
                aria-haspopup="true" 
                tabindex="0"
                on:click={(e) => {
                  e.stopPropagation();
                  openDropdown = null;
                  openSubmenu = null;
                }}
              >
                {$_('home.teams.junior.name')}
                <span class="icon-rotate-90">
                  <ChevronDown size={14} />
                </span>
              </a>
              <div 
                class="submenu-content academy-submenu" 
                role="menu" 
                tabindex="-1"
                on:mouseenter={cancelClose}
              >
                <!-- Kadidiatou Diani -->
                <a href="/teams/diani" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.diani')}
                </a>

                <!-- Olivier Giroud -->
                <a href="/teams/giroud" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.giroud')}
                </a>

                <!-- Edouardo Camavinga -->
                <a href="/teams/camavinga" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.camavinga')}
                </a>
                
                <!-- Désiré Doué -->
                <a href="/teams/doue" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.doue.title')}
                </a>

                <!-- Kylian Mbappé -->
                <a href="/teams/mbappe" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.mbappe')}
                </a>
                
                <!-- Antoine Griezmann -->
                <a href="/teams/griezmann" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.griezmann')}
                </a>

                <!-- Wendie Renard -->
                <a href="/teams/renard" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.renard')}
                </a>
                
                <!-- Kingsley Coman -->
                <a href="/teams/coman" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.coman')}
                </a>
                
                <!-- Eugénie Le Sommer -->
                <a href="/teams/lesommer" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.lesommer')}
                </a>

                <!-- William Saliba -->
                <a href="/teams/saliba" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.saliba')}
                </a>
                
                <!-- Amandine Henry -->
                <a href="/teams/henry" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.henry')}
                </a>

                <!-- Ousmane Dembélé -->
                <a href="/teams/dembélé" class="submenu-item" role="menuitem" tabindex="0">
                  {$_('teams.dembele')}
                </a>

              </div>
            </div>
          </div>
        {/if}
      </div>
      
      <a href="/camps" class="nav-link" style="animation-delay: 0.5s">
        {$_('nav.camps')}
      </a>

     <a href="/contact" class="nav-link" style="animation-delay: 0.6s">
        {$_('nav.contact')}
      </a>
      
      {#if $user}
        <a 
          href="https://drive.google.com/drive/folders/1qVJpoGIeR6LJJobn4CB4UN4CRfp2iJ4j"
          class="nav-link"
          target="_blank"
          rel="noopener noreferrer"
          style="animation-delay: 0.6s"
        >
          {$_('nav.photo')}
        </a>
      {/if}
    </div>

    <!-- Actions à droite (desktop) -->
    <div class="desktop-user-actions">
      <!-- Language Selector Dropdown -->
      <div class="language-selector-dropdown">
        <button 
          class="language-trigger"
          on:click={toggleLanguageDropdown}
          aria-label="Changer la langue"
          aria-expanded={languageDropdownOpen}
        >
          <span class="current-language">
            <span class="flag">{getLanguageFlag($locale)}</span>
            <span class="lang-code">{$locale?.toUpperCase()}</span>
          </span>
          <ChevronDown size={14} class={languageDropdownOpen ? 'rotate-icon' : ''} />
        </button>

        {#if languageDropdownOpen}
          <div class="language-menu">
            <button
              class="language-option"
              class:active={$locale === 'pl'}
              on:click={() => changeLanguage('pl')}
            >
              <span class="flag">🇵🇱</span>
              <span>Polski</span>
            </button>
            <button
              class="language-option"
              class:active={$locale === 'en'}
              on:click={() => changeLanguage('en')}
            >
              <span class="flag">🇬🇧</span>
              <span>English</span>
            </button>
            <button
              class="language-option"
              class:active={$locale === 'fr'}
              on:click={() => changeLanguage('fr')}
            >
              <span class="flag">🇫🇷</span>
              <span>Français</span>
            </button>
          </div>
        {/if}
      </div>

      <!-- User Menu -->
      {#if $user}
        <div class="user-info">
          <User size={18} />
          <span>{$_('userMenu.hello')}, {$user.firstName} !</span>
        </div>
        <button class="btn-logout" on:click={handleLogout}>
          <LogOut size={18} />
        </button>
      {:else}
        <a href="/login" class="btn-auth btn-login">
          <LogIn size={18} />
          <span>{$_('userMenu.login')}</span>
        </a>
        <a href="/register" class="btn-auth btn-register">
          <UserPlus size={18} />
          <span>{$_('userMenu.register')}</span>
        </a>
      {/if}
    </div>

    <!-- Burger (mobile) -->
    <button class="menu-toggle" on:click={toggleMenu} aria-label={$_('nav.menu')} aria-expanded={open}>
      {#if open}
        <X size={24} />
      {:else}
        <Menu size={24} />
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
          <a href="https://olympique.pl/" target="_blank" rel="noopener noreferrer" on:click={close} class="shop-mobile-link">
            {$_('nav.shop')}
            <span class="new-badge">
              <span class="badge-text">NEW</span>
              <span class="shine"></span>
            </span>
          </a>
        </li>        
        
        <!-- Le Club (mobile) -->
        <li class="mobile-dropdown">
          <div class="mobile-dropdown-row">
            <!-- LIEN PRINCIPAL -->
            <a href="/club" class="mobile-dropdown-link" on:click={close}>
              {$_('nav.club')}
            </a>

            <!-- BOUTON CHEVRON -->
            <button
              class="mobile-dropdown-trigger"
              aria-label="Ouvrir le menu Club"
              on:click={() => toggleDropdown('club-mobile')}
            >
              <span class="icon-wrapper" class:rotate={openDropdown === 'club-mobile'}>
                <ChevronDown size={16} />
              </span>
            </button>
          </div>

          {#if openDropdown === 'club-mobile'}
            <ul class="mobile-submenu">
              <li><a href="/club/about" on:click={close}>{$_('club.about')}</a></li>
              <li><a href="/club/coaches" on:click={close}>{$_('club.coaches')}</a></li>
              <li><a href="/club/partners" on:click={close}>{$_('club.partners.title')}</a></li>
            </ul>
          {/if}
        </li>
    
        <!-- Nos Équipes (mobile) -->
        <li class="mobile-dropdown">
          <div class="mobile-dropdown-row">
            <!-- LIEN PRINCIPAL -->
            <a href="/teams" class="mobile-dropdown-link" on:click={close}>
              {$_('nav.teams')}
            </a>

            <!-- BOUTON CHEVRON -->
            <button
              class="mobile-dropdown-trigger"
              aria-label="Ouvrir le menu Équipes"
              on:click={() => toggleDropdown('teams-mobile')}
            >
              <span class="icon-wrapper" class:rotate={openDropdown === 'teams-mobile'}>
                <ChevronDown size={16} />
              </span>
            </button>
          </div>

          {#if openDropdown === 'teams-mobile'}
            <ul class="mobile-submenu">
              <li>
                <a href="/teams/dames" on:click={close}>
                  {$_('home.teams.feminine.name')}
                </a>
              </li>

              <li>
                <a href="/teams/bleus" on:click={close}>
                  {$_('home.teams.senior.name')}
                </a>
              </li>

              <!-- Académie -->
              <li class="mobile-subsubmenu">
                <div class="mobile-subsubmenu-row">
                  <a
                    href="/teams/academy"
                    class="mobile-subsubmenu-link"
                    on:click={close}
                  >
                    {$_('home.teams.junior.name')}
                  </a>

                  <button
                    class="mobile-subsubmenu-trigger"
                    aria-label="Ouvrir le menu Académie"
                    on:click={() => toggleSubmenu('academy-mobile')}
                  >
                    <span
                      class="icon-wrapper"
                      class:rotate={openSubmenu === 'academy-mobile'}
                    >
                      <ChevronDown size={14} />
                    </span>
                  </button>
                </div>

                {#if openSubmenu === 'academy-mobile'}
                  <ul class="mobile-subsubmenu-list">
                    <li><a href="/teams/diani" on:click={close}>{$_('teams.diani')}</a></li>
                    <li><a href="/teams/giroud" on:click={close}>{$_('teams.giroud')}</a></li>
                    <li><a href="/teams/camavinga" on:click={close}>{$_('teams.camavinga')}</a></li>
                    <li><a href="/teams/doue" on:click={close}>{$_('teams.doue.title')}</a></li>
                    <li><a href="/teams/mbappe" on:click={close}>{$_('teams.mbappe')}</a></li>
                    <li><a href="/teams/griezmann" on:click={close}>{$_('teams.griezmann')}</a></li>
                    <li><a href="/teams/renard" on:click={close}>{$_('teams.renard')}</a></li>
                    <li><a href="/teams/coman" on:click={close}>{$_('teams.coman')}</a></li>
                    <li><a href="/teams/lesommer" on:click={close}>{$_('teams.lesommer')}</a></li>
                    <li><a href="/teams/saliba" on:click={close}>{$_('teams.saliba')}</a></li>
                    <li><a href="/teams/henry" on:click={close}>{$_('teams.henry')}</a></li>
                    <li><a href="/teams/dembele" on:click={close}>{$_('teams.dembele')}</a></li>
                  </ul>
                {/if}
              </li>
            </ul>
          {/if}
        </li>

        <li><a href="/camps" on:click={close}>{$_('nav.camps')}</a></li>
        <li><a href="/contact" on:click={close}>{$_('nav.contact')}</a></li>
        <li>
          {#if $user}
            <a 
              href="https://drive.google.com/drive/folders/1qVJpoGIeR6LJJobn4CB4UN4CRfp2iJ4j"
              target="_blank"
              rel="noopener noreferrer"
              on:click={close}
            >
              {$_('nav.photo')}
            </a>
          {/if}
        </li>  
      </ul>
    </nav>

    <!-- Mobile Actions (dans le drawer) -->
    <div class="mobile-user-actions">
      <!-- Language Selector Dropdown Mobile -->
      <div class="language-selector-dropdown mobile">
        <button 
          class="language-trigger"
          on:click={toggleLanguageDropdown}
          aria-label="Changer la langue"
          aria-expanded={languageDropdownOpen}
        >
          <span class="current-language">
            <span class="flag">{getLanguageFlag($locale)}</span>
            <span class="lang-name">{getLanguageName($locale)}</span>
          </span>
          <ChevronDown size={16} class={languageDropdownOpen ? 'rotate-icon' : ''} />
        </button>

        {#if languageDropdownOpen}
          <div class="language-menu">
            <button
              class="language-option"
              class:active={$locale === 'pl'}
              on:click={() => changeLanguage('pl')}
            >
              <span class="flag">🇵🇱</span>
              <span>Polski</span>
            </button>
            <button
              class="language-option"
              class:active={$locale === 'en'}
              on:click={() => changeLanguage('en')}
            >
              <span class="flag">🇬🇧</span>
              <span>English</span>
            </button>
            <button
              class="language-option"
              class:active={$locale === 'fr'}
              on:click={() => changeLanguage('fr')}
            >
              <span class="flag">🇫🇷</span>
              <span>Français</span>
            </button>
          </div>
        {/if}
      </div>

      <!-- User Actions Mobile -->
      {#if $user}
        <div class="user-info-mobile">
          <User size={18} />
          <span>{$_('userMenu.hello')}, {$user.firstName} !</span>
        </div>
        <button class="btn-logout mobile" on:click={handleLogout}>
          <LogOut size={18} />
          <span>{$_('userMenu.logout')}</span>
        </button>
      {:else}
        <a href="/login" class="btn-auth btn-login mobile" on:click={close}>
          <LogIn size={18} />
          <span>{$_('userMenu.login')}</span>
        </a>
        <a href="/register" class="btn-auth btn-register mobile" on:click={close}>
          <UserPlus size={18} />
          <span>{$_('userMenu.register')}</span>
        </a>
      {/if}
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
   NAVBAR OLYMPIQUE POZNAŃ - MOBILE FIRST
   ======================================== */

/* ========================================
   BASE : MOBILE FIRST (320px - 767px)
   ======================================== */

/* ICON WRAPPER */
.icon-wrapper {
  display: inline-flex;
  transition: transform 0.3s ease;
}

.icon-wrapper.rotate {
  transform: rotate(180deg);
}

/* NAVIGATION PRINCIPALE - GLASSMORPHISM PROGRESSIF */
.nav {
  background: rgba(255, 255, 255, var(--nav-opacity, 0.1));
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, calc(var(--nav-opacity, 0.1) * 2));
  box-shadow: 0 4px 24px rgba(0, 0, 0, calc(var(--nav-opacity, 0.1) * 0.15));
  position: sticky;
  top: 0;
  z-index: 999;
  transition: background 0.3s ease, border-bottom 0.3s ease, box-shadow 0.3s ease;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.75rem 1rem 0.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  box-sizing: border-box;
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
  height: 45px;
}

.logo-home {
  height: 32px;
}

/* LIENS DE NAVIGATION (cachés sur mobile) */
.nav-links {
  display: none;
}

/* DESKTOP USER ACTIONS (cachés sur mobile) */
.desktop-user-actions {
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
  padding: 0.625rem;
  color: rgb(var(--text-r, 255), var(--text-g, 255), var(--text-b, 255));
  transition: color 0.3s ease;
  min-width: 44px;
  min-height: 44px;
}

.menu-toggle:hover,
.menu-toggle:focus {
  color: #d4af37;
}

/* ========================================
   MOBILE DRAWER - GLASSMORPHISM
   ======================================== */

.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
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
  color: #1a4d7a;
  padding: 0.5rem;
  transition: color 0.2s;
  min-width: 44px;
  min-height: 44px;
}

.close-btn:hover,
.close-btn:focus {
  color: #d4af37;
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
  gap: 0.5rem;
  padding: 0.875rem 1rem;
  color: #1a4d7a;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.2s;
  min-height: 44px;
}

.mobile-menu > li > a:hover {
  background: rgba(26, 77, 122, 0.1);
  color: #0f2d4a;
}

/* MOBILE DROPDOWN */
.mobile-dropdown {
  margin: 0.5rem 0;
}

.mobile-dropdown-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0;
}

.mobile-dropdown-link {
  flex: 1;
  padding: 0.875rem 1rem;
  color: #1a4d7a;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px 0 0 8px;
  transition: all 0.2s;
  min-height: 44px;
}

.mobile-dropdown-link:hover {
  background: rgba(26, 77, 122, 0.1);
  color: #0f2d4a;
}

.mobile-dropdown-trigger {
  padding: 0.875rem 1rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #1a4d7a;
  border-radius: 0 8px 8px 0;
  transition: all 0.2s;
  flex-shrink: 0;
  min-width: 44px;
  min-height: 44px;
}

.mobile-dropdown-trigger:hover {
  background: rgba(26, 77, 122, 0.1);
  color: #0f2d4a;
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

.mobile-submenu > li > a {
  display: block;
  padding: 0.75rem 1rem;
  color: #555;
  text-decoration: none;
  font-size: 0.95rem;
  border-radius: 6px;
  transition: all 0.2s;
  min-height: 40px;
}

.mobile-submenu > li > a:hover {
  background: rgba(26, 77, 122, 0.08);
  color: #1a4d7a;
}

/* MOBILE SUBSUBMENU */
.mobile-subsubmenu {
  margin: 0.25rem 0;
}

.mobile-subsubmenu-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0;
}

.mobile-subsubmenu-link {
  flex: 1;
  padding: 0.75rem 1rem;
  color: #555;
  text-decoration: none;
  font-size: 0.95rem;
  border-radius: 6px 0 0 6px;
  transition: all 0.2s;
  min-height: 40px;
}

.mobile-subsubmenu-link:hover {
  background: rgba(26, 77, 122, 0.08);
  color: #1a4d7a;
}

.mobile-subsubmenu-trigger {
  padding: 0.75rem;
  background: none;
  border: none;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  border-radius: 0 6px 6px 0;
  min-width: 40px;
  min-height: 40px;
}

.mobile-subsubmenu-trigger:hover {
  background: rgba(26, 77, 122, 0.08);
  color: #1a4d7a;
}

.mobile-subsubmenu-list {
  list-style: none;
  padding: 0;
  margin: 0.25rem 0 0 1rem;
}

.mobile-subsubmenu-list li {
  margin: 0.15rem 0;
}

.mobile-subsubmenu-list a {
  display: block;
  padding: 0.65rem 1rem;
  color: #666;
  text-decoration: none;
  font-size: 0.9rem;
  border-radius: 4px;
  transition: all 0.2s;
  min-height: 38px;
}

.mobile-subsubmenu-list a:hover {
  background: rgba(26, 77, 122, 0.06);
  color: #1a4d7a;
}

/* ========================================
   LANGUAGE SELECTOR DROPDOWN
   ======================================== */

.language-selector-dropdown {
  position: relative;
  display: flex;
  align-items: center;
}

.language-trigger {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background: rgba(102, 126, 234, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  font-weight: 600;
  font-size: 0.9rem;
  color: rgba(102, 102, 102, var(--text-opacity, 0.6));
  min-height: 40px;
}

.language-trigger:hover {
  background: rgba(102, 126, 234, 0.12);
  border-color: rgba(102, 126, 234, 0.3);
}

.current-language {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  position: relative;
}

.flag {
  font-size: 1.4rem;
  line-height: 1;
}

/* Affiche les initiales en fallback si le drapeau ne charge pas */
.language-trigger .lang-code {
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

/* Cache le nom complet dans le bouton */
.language-trigger .lang-name {
  display: none;
}

/* Sur les navigateurs qui supportent bien les emojis, cache les initiales */
@supports (font-family: "Apple Color Emoji") {
  .language-trigger .lang-code {
    display: none;
  }
}

.language-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 160px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  padding: 0.5rem;
  z-index: 1001;
  border: 1px solid rgba(102, 126, 234, 0.2);
  animation: fadeInDropdown 0.2s ease;
}

.language-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  text-align: left;
  min-height: 40px;
}

.language-option:hover {
  background: rgba(102, 126, 234, 0.1);
  color: #1a4d7a;
}

.language-option.active {
  background: rgba(212, 175, 55, 0.15);
  color: #d4af37;
  font-weight: 700;
}

.language-option .flag {
  font-size: 1.3rem;
}

/* Mobile language dropdown */
.language-selector-dropdown.mobile {
  width: 100%;
}

.language-selector-dropdown.mobile .language-trigger {
  width: 100%;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  min-height: 48px;
}

.language-selector-dropdown.mobile .language-menu {
  left: 0;
  right: 0;
  width: 100%;
  top: calc(100% + 0.25rem);
}

/* ========================================
   USER INFO & AUTH BUTTONS (MOBILE)
   ======================================== */

.user-info {
  display: none;
}

.user-info-mobile {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 0.5rem;
  color: #667eea;
  font-weight: 600;
  justify-content: center;
  min-height: 44px;
}

.btn-logout {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #e63946;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  font-family: inherit;
  min-height: 44px;
}

.btn-logout.mobile {
  width: 100%;
  justify-content: center;
  padding: 1rem;
}

.btn-logout:hover {
  background: #d62839;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(230, 57, 70, 0.3);
}

.btn-auth {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s;
  font-family: inherit;
  min-height: 44px;
}

.btn-auth.mobile {
  width: 100%;
  justify-content: center;
  padding: 1rem;
}

.btn-login {
  background: linear-gradient(135deg, #c9a961 0%, #ddc184 100%);
  color: white;
}

.btn-login:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-register {
  background: rgba(102, 126, 234, 0.1);
  color: #1a4d7a;
  border: 1px solid #1a4d7a;
}

.btn-register:hover {
  background: #1a4d7a;
  color: white;
  transform: translateY(-2px);
}

/* ========================================
   MOBILE USER ACTIONS
   ======================================== */

.mobile-user-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
   TABLETTE (768px - 1023px)
   ======================================== */

@media (min-width: 768px) {
  .nav-container {
    padding: 0.75rem 1.25rem;
    gap: 0.625rem;
  }

  .logo-olympique-poznan {
    height: 52px;
  }
  
  .logo-home {
    height: 36px;
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
    gap: 0.375rem;
    flex-wrap: nowrap;
  }

  .nav-link {
    padding: 0.5625rem 0.75rem;
    color: rgb(var(--text-r, 255), var(--text-g, 255), var(--text-b, 255));
    text-decoration: none;
    font-weight: 600;
    font-size: 0.875rem;
    transition: color 0.1s ease;
    border-radius: 8px;
    white-space: nowrap;
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    opacity: 0;
    transform: translateY(-10px);
    min-height: 38px;
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
    color: #d4af37 !important;
  }

  /* DESKTOP USER ACTIONS */
  .desktop-user-actions {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    flex-shrink: 0;
    min-width: fit-content;
    white-space: nowrap;
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 0.75rem;
    background: rgba(102, 126, 234, 0.1);
    border-radius: 0.5rem;
    color: rgb(var(--text-r, 255), var(--text-g, 255), var(--text-b, 255));
    font-weight: 600;
    white-space: nowrap;
    font-size: 0.875rem;
    transition: color 0.3s ease;
    flex-shrink: 0;
    min-height: 38px;
  }

  .btn-logout {
    padding: 0.5rem;
    gap: 0.375rem;
    white-space: nowrap;
    font-size: 0.875rem;
    flex-shrink: 0;
    min-height: 38px;
    min-width: 38px;
  }

  .btn-auth {
    padding: 0.5rem 0.75rem;
    gap: 0.375rem;
    white-space: nowrap;
    font-size: 0.875rem;
    flex-shrink: 0;
    min-height: 38px;
  }

  .language-trigger {
    padding: 0.5rem 0.625rem;
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

  /* DROPDOWN DESKTOP - GLASSMORPHISM */
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
    min-width: 270px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    padding: 0.5rem 0;
    margin-top: 0.25rem;
    animation: fadeInDropdown 0.2s;
    z-index: 1000;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .dropdown::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    height: 0.5rem;
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
    padding: 0.6875rem 1.125rem;
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
    font-size: 0.9rem;
    min-height: 38px;
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

  .submenu::before {
    content: '';
    position: absolute;
    top: 0;
    left: 100%;
    width: 0.5rem;
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
    min-width: 270px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    padding: 0.5rem 0;
    margin-left: 0.25rem;
    animation: fadeInDropdown 0.2s;
    z-index: 1000;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .submenu-item {
    display: block;
    padding: 0.625rem 1rem;
    color: #555;
    text-decoration: none;
    transition: all 0.2s;
    font-size: 0.875rem;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-weight: 500;
    min-height: 36px;
  }

  .submenu-item:hover {
    background: rgba(26, 77, 122, 0.08);
    color: #1a4d7a;
  }
}

/* ========================================
   IPAD (1024px - 1199px)
   ======================================== */

@media (min-width: 1024px) {
  .logo-olympique-poznan {
    height: 58px;
  }
  
  .logo-home {
    height: 40px;
  }

  .nav-container {
    padding: 0.8rem 1.5rem 0.8rem 0.5rem;
    gap: 0.75rem;
  }

  .nav-link {
    font-size: 0.9rem;
    padding: 0.625rem 0.875rem;
    gap: 0.375rem;
  }

  .nav-links {
    gap: 0.5rem;
  }

  .desktop-user-actions {
    gap: 0.5rem;
  }

  .user-info {
    font-size: 0.9rem;
    padding: 0.5625rem 0.875rem;
    gap: 0.4rem;
  }

  .btn-logout,
  .btn-auth {
    font-size: 0.9rem;
    padding: 0.5625rem 0.875rem;
    gap: 0.4rem;
  }

  .btn-logout {
    padding: 0.5625rem;
    min-width: 42px;
  }

  .dropdown-menu {
    min-width: 285px;
  }

  .submenu-content {
    min-width: 285px;
  }

  .dropdown-item {
    font-size: 0.95rem;
    padding: 0.75rem 1.25rem;
  }

  .submenu-item {
    font-size: 0.9rem;
    padding: 0.6875rem 1.125rem;
  }
}

/* ========================================
   GRAND DESKTOP (1200px - 1399px)
   ======================================== */

@media (min-width: 1200px) {
  .logo-olympique-poznan {
    height: 65px;
  }
  
  .logo-home {
    height: 44px;
  }

  .nav-container {
    padding: 0.9375rem 2rem 0.9375rem 0.5rem;
    gap: 1rem;
  }

  .nav-link {
    font-size: 0.975rem;
    padding: 0.75rem 1.0625rem;
    gap: 0.4rem;
  }

  .nav-links {
    gap: 0.75rem;
  }

  .desktop-user-actions {
    gap: 0.625rem;
  }

  .user-info {
    font-size: 0.95rem;
    padding: 0.6875rem 1.0625rem;
    gap: 0.5rem;
  }

  .btn-logout,
  .btn-auth {
    font-size: 0.95rem;
    padding: 0.6875rem 1.0625rem;
    gap: 0.5rem;
  }

  .btn-logout {
    padding: 0.6875rem;
    min-width: 45px;
  }

  .dropdown-menu {
    min-width: 300px;
  }

  .submenu-content {
    min-width: 300px;
  }

  .dropdown-item {
    font-size: 1rem;
    padding: 0.8125rem 1.375rem;
  }

  .submenu-item {
    font-size: 0.95rem;
    padding: 0.75rem 1.25rem;
  }
}

/* ========================================
   TRÈS GRAND DESKTOP (1400px+)
   ======================================== */

@media (min-width: 1400px) {
  .logo-olympique-poznan {
    height: 72px;
  }
  
  .logo-home {
    height: 50px;
  }

  .nav-container {
    padding: 1.125rem 3rem 1.125rem 0.5rem;
    gap: 1.25rem;
  }

  .nav-link {
    font-size: 1.0625rem;
    padding: 0.875rem 1.25rem;
    gap: 0.5rem;
  }

  .nav-links {
    gap: 1rem;
  }

  .desktop-user-actions {
    gap: 0.75rem;
  }

  .user-info {
    font-size: 1rem;
    padding: 0.8125rem 1.25rem;
    gap: 0.5rem;
  }

  .btn-logout,
  .btn-auth {
    font-size: 1rem;
    padding: 0.8125rem 1.25rem;
    gap: 0.5rem;
  }

  .btn-logout {
    padding: 0.8125rem;
    min-width: 48px;
  }

  .dropdown-item {
    font-size: 1.05rem;
    padding: 0.875rem 1.5rem;
  }

  .submenu-item {
    font-size: 1rem;
    padding: 0.8125rem 1.375rem;
  }
}
</style>