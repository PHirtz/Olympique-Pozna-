<script>
  import { createEventDispatcher } from "svelte";
  import PlayerPhoto from "$lib/components/ui/PlayerPhoto.svelte";
  import { fade, fly } from "svelte/transition";
  import { X, MapPin, Award } from "lucide-svelte";
  import { _ } from 'svelte-i18n'; 

  export let isOpen = false;
  export let player = null;

    $: if (player) {
    console.log('🔍 Player data:', player);
  }

  const dispatch = createEventDispatcher();

  function closeModal() {
    dispatch("close");
  }

  function handleKeydown(event) {
    if (event.key === "Escape") closeModal();
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) closeModal();
  }

  function handleOverlayKeydown(event) {
    if (event.key === "Enter" || event.key === " ") {
      handleOverlayClick(event);
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if isOpen && player}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="modal-overlay"
    on:click={handleOverlayClick}
    on:keydown={handleOverlayKeydown}
    transition:fade={{ duration: 300 }}
  >
    <div 
      class="modal" 
      transition:fly={{ y: -50, duration: 400 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabindex="-1"
    >
      <!-- Header avec bouton close -->
      <button class="close-btn" on:click={closeModal} aria-label="Fermer">
        <X size={24} />
      </button>

      <!-- Section supérieure : Photo + Info -->
      <div class="player-header">
        <!-- Photo du joueur -->
        <div class="player-photo-wrapper">
          <!-- REMPLACE <img> PAR <PlayerPhoto> -->
          <PlayerPhoto 
            src={player.photo} 
            alt={player.name} 
            className="player-photo"
          />
        </div>

        <!-- Infos du joueur -->
        <div class="player-info">
          <div class="name-with-badge">
            <h2 id="modal-title" class="player-name">
              {player.firstName} {player.lastName}
            </h2>
            <div class="player-number-badge">#{player.number}</div>
          </div>
          {#if player.nickname}
            <p class="player-nickname">"{player.nickname}"</p>
          {/if}
          {#if player.origin}
            <div class="player-origin">
              <MapPin size={16} />
              <span>{player.origin}</span>
            </div>
          {/if}
        </div>
      </div>

      <!-- Corps de la modal : Position et Distinctions -->
      <div class="modal-body">
        <!-- Position -->
        {#if player.position}
          <div class="player-section">
            <h3 class="section-title">{$_('teams.doue.labels.position')}</h3>
            <div class="position-badge">{player.position}</div>
          </div>
        {/if}

        <!-- Distinctions -->
        {#if player.distinctions && player.distinctions.length > 0}
          <div class="player-section">
            <h3 class="section-title">
              <Award size={20} />
              {$_('teams.doue.labels.distinctions')}
            </h3>
            <ul class="distinctions-list">
              {#each player.distinctions as distinction}
                <li class="distinction-item">
                  <span class="distinction-icon">🏆</span>
                  {distinction}
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        <!-- Slot pour contenu additionnel -->
        <slot />
      </div>
    </div>
  </div>
{/if}
<style>
  /* Overlay */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
  }

  /* Modal Container */
  .modal {
    background: white;
    border-radius: 16px;
    width: 100%;
    max-width: 1000px;
    max-height: 90vh;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .modal:focus {
    outline: none;
  }

  /* Close Button */
  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.9);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    color: #1a4d7a;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 10;
  }

  .close-btn:hover,
  .close-btn:focus {
    background: #d4af37;
    color: white;
    transform: rotate(90deg);
  }

  /* Player Header */
  .player-header {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    padding: 2rem;
    display: flex;
    gap: 2rem;
    align-items: flex-start;
    position: relative;
  }

  /* Photo du joueur */
  .player-photo-wrapper {
    position: relative;
    flex-shrink: 0;
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
    border: 3px solid rgba(212, 175, 55, 0.3);
  }

  .player-photo-wrapper :global(.player-photo) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .player-photo-wrapper :global(img) {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    display: block;
  }

  .name-with-badge {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .player-number-badge {
    background: #d4af37;
    color: white;
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    flex-shrink: 0;
  }

  /* Info du joueur */
  .player-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    color: white;
  }

  .player-name {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .player-nickname {
    font-size: 2rem;
    font-style: italic;
    color: #d4af37;
    margin: 0;
    font-weight: 500;
  }

  .player-origin {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: rgba(255, 255, 255, 0.9);
    font-size: 1.5rem;
  }

  /* Modal Body */
  .modal-body {
    padding: 2rem;
    overflow-y: auto;
    flex: 1;
  }

  .player-section {
    margin-bottom: 2rem;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a4d7a;
    margin-bottom: 1rem;
    text-align: center;
    justify-content: center;
  }

  /* Position Badge */
  .position-badge {
    display: inline-block;
    background: linear-gradient(135deg, #d4af37 0%, #c9a961 100%);
    color: white;
    padding: 0.75rem 2rem;
    border-radius: 50px;
    font-size: 1.1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
    margin: 0 auto;
    display: block;
    text-align: center;
    width: fit-content;
  }

  /* Distinctions */
  .distinctions-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .distinction-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(26, 77, 122, 0.05);
    border-radius: 8px;
    border-left: 4px solid #d4af37;
    font-size: 1.5rem;
    color: #333;
    transition: all 0.3s ease;
  }

  .distinction-item:hover {
    background: rgba(26, 77, 122, 0.1);
    transform: translateX(5px);
  }

  .distinction-icon {
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  /* Scrollbar */
  .modal-body::-webkit-scrollbar {
    width: 8px;
  }

  .modal-body::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  .modal-body::-webkit-scrollbar-thumb {
    background: #d4af37;
    border-radius: 10px;
  }

  .modal-body::-webkit-scrollbar-thumb:hover {
    background: #c9a961;
  }

  /* Responsive Mobile */
  @media (max-width: 768px) {
    .modal {
      max-width: 95%;
      max-height: 95vh;
      border-radius: 12px;
    }

    .player-header {
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 1.5rem;
      gap: 1rem;
    }

    .player-number-badge {
      width: 40px;
      height: 40px;
      font-size: 1rem;
    }

    .player-name {
      font-size: 1.5rem;
    }

    .player-nickname {
      font-size: 1rem;
    }

    .player-origin {
      justify-content: center;
    }

    .modal-body {
      padding: 1.5rem;
    }

    .section-title {
      font-size: 1.1rem;
    }

    .position-badge {
      font-size: 1rem;
      padding: 0.6rem 1.5rem;
    }

    .distinction-item {
      padding: 0.75rem;
      font-size: 0.9rem;
    }

    .player-photo-wrapper {
      width: 150px;
      height: 150px;
    }

    .player-number-badge {
      width: 40px;
      height: 40px;
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .close-btn {
      width: 35px;
      height: 35px;
      top: 0.75rem;
      right: 0.75rem;
    }


    .player-name {
      font-size: 1.3rem;
    }
  }
</style>