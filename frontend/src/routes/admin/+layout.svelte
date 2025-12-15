<script>
  import { auth } from '$lib/api';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import './admin.css';
  import { 
    LayoutDashboard, 
    Handshake, 
    Users, 
    ShoppingBag, 
    Trophy,
    LogOut,
    ExternalLink,
    Calendar
  } from 'lucide-svelte';

  let user = null;
  let currentDate = '';

  // Protection de route
  onMount(() => {
    if (!auth.isAuthenticated() || !auth.isAdmin()) {
      goto('/login');
      return;
    }
    
    user = auth.getCurrentUser();
    
    // Format date en français
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    currentDate = new Date().toLocaleDateString('fr-FR', options);
  });

  function handleLogout() {
    auth.logout();
    goto('/login');
  }

  $: currentPath = $page.url.pathname;
</script>

{#if user}
  <div class="min-h-screen flex flex-col">
    <!-- Header amélioré -->
    <header class="admin-header-enhanced">
      <div class="header-content">
        <!-- Gauche : Logo + Date -->
        <div class="header-left">
          <div class="header-logo">
            <h1>OLYMPIQUE POZNAŃ</h1>
            <span class="header-subtitle">Administration</span>
          </div>
          
          <div class="header-divider"></div>
          
          <div class="header-date">
            <Calendar size={18} />
            <span>{currentDate}</span>
          </div>
        </div>

        <!-- Droite : User + Actions -->
        <div class="header-right">
          <div class="header-user">
            <div class="user-avatar"></div>
            <div class="user-info">
              <span class="user-name">{user.username}</span>
              <span class="user-role">{user.role}</span>
            </div>
          </div>

          <div class="header-divider"></div>

          <a href="/" target="_blank" class="header-action">
            <ExternalLink size={18} />
            <span>Voir le site</span>
          </a>

          <button on:click={handleLogout} class="header-action header-logout">
            <LogOut size={18} />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <main class="flex-1 p-6 admin-main">
      <slot />
    </main>
  </div>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement...</p>
    </div>
  </div>
{/if}

<style>
  .user-avatar {
    width: 80px;
    height: 80px;
    background: url('/img-communes/profil.png') no-repeat center center;
    background-size: cover;
    border-radius: 50%;
  }
</style>