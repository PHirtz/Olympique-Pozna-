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
    Menu,
    ExternalLink
  } from 'lucide-svelte';

  let user = null;
  let sidebarOpen = false;

  // Protection de route
  onMount(() => {
    if (!auth.isAuthenticated() || !auth.isAdmin()) {
      goto('/login');
      return;
    }
    
    user = auth.getCurrentUser();
  });

  function handleLogout() {
    auth.logout();
    goto('/login');
  }

  $: currentPath = $page.url.pathname;
</script>

{#if user}
  <div class="min-h-screen flex">
    <!-- Sidebar Desktop - Toujours visible -->
    <aside class="admin-sidebar w-64 flex-shrink-0 hidden lg:flex lg:flex-col">
          <div class="p-6 admin-sidebar-header">
        <h1 class="text-2xl font-bold text-white">Olympique Poznań</h1>
        <p class="text-sm mt-1 admin-sidebar-subtitle">Administration</p>
      </div>

      <nav class="mt-6 flex-1">
        <a
          href="/admin"
          class="admin-nav-link flex items-center px-6 py-3 {currentPath === '/admin' ? 'active' : ''}"
        >
          <LayoutDashboard class="mr-3" size={20} />
          <span>Dashboard</span>
        </a>

        <a
          href="/admin/sponsors"
          class="admin-nav-link flex items-center px-6 py-3 {currentPath.startsWith('/admin/sponsors') ? 'active' : ''}"
        >
          <Handshake class="mr-3" size={20} />
          <span>Sponsors</span>
        </a>

        <a
          href="/admin/teams"
          class="admin-nav-link disabled flex items-center px-6 py-3"
          on:click|preventDefault
          on:keydown|preventDefault
          aria-disabled="true"
        >
          <Trophy class="mr-3" size={20} />
          <span>Équipes (bientôt)</span>
        </a>

        <a
          href="/admin/users"
          class="admin-nav-link disabled flex items-center px-6 py-3"
          on:click|preventDefault
          on:keydown|preventDefault
          aria-disabled="true"
        >
          <Users class="mr-3" size={20} />
          <span>Utilisateurs (bientôt)</span>
        </a>

        <a
          href="/admin/products"
          class="admin-nav-link disabled flex items-center px-6 py-3"
          on:click|preventDefault
          on:keydown|preventDefault
          aria-disabled="true"
        >
          <ShoppingBag class="mr-3" size={20} />
          <span>Produits (bientôt)</span>
        </a>
      </nav>

      <!-- User info -->
      <div class="p-6 admin-user-info">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-semibold text-white">{user.username}</p>
            <p class="text-sm admin-user-role">{user.role}</p>
          </div>
          <button
            on:click={handleLogout}
            class="text-white/70 hover:text-white transition-colors duration-200"
            title="Déconnexion"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Header -->
      <header class="admin-header">
        <div class="px-6 py-4 flex items-center justify-between">
          <button
            class="lg:hidden admin-link"
            on:click={() => sidebarOpen = !sidebarOpen}
          >
            <Menu size={24} />
          </button>

          <div class="flex-1"></div>

          <a
            href="/"
            target="_blank"
            class="flex items-center gap-2 text-sm font-medium admin-link"
          >
            <span>Voir le site</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 p-6 admin-main">
        <slot />
      </main>
    </div>

    <!-- Mobile Sidebar Overlay (Uniquement mobile) -->
    {#if sidebarOpen}
      <div class="lg:hidden fixed inset-0 flex mobile-sidebar-overlay">
        <div
          class="fixed inset-0 bg-black bg-opacity-50"
          on:click={() => sidebarOpen = false}
          on:keydown={(e) => e.key === 'Escape' && (sidebarOpen = false)}
          role="button"
          tabindex="0"
          aria-label="Fermer le menu"
        ></div>

        <aside class="relative w-64 admin-sidebar mobile-sidebar">
          <div class="p-6 admin-sidebar-header flex items-center justify-between">
            <div>
              <h1 class="text-2xl font-bold text-white">Olympique Poznań</h1>
              <p class="text-sm mt-1 admin-sidebar-subtitle">Administration</p>
            </div>
            <button
              on:click={() => sidebarOpen = false}
              class="text-white hover:text-[#c9a961] transition-colors"
              aria-label="Fermer le menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <nav class="mt-6">
            <a 
              href="/admin" 
              class="admin-nav-link flex items-center px-6 py-3"
              on:click={() => sidebarOpen = false}
            >
              <LayoutDashboard class="mr-3" size={20} />
              <span>Dashboard</span>
            </a>
            <a 
              href="/admin/sponsors" 
              class="admin-nav-link flex items-center px-6 py-3"
              on:click={() => sidebarOpen = false}
            >
              <Handshake class="mr-3" size={20} />
              <span>Sponsors</span>
            </a>
          </nav>
        </aside>
      </div>
    {/if}
  </div>
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement...</p>
    </div>
  </div>
{/if}