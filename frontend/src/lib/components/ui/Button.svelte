<script>
  /** @type {'primary' | 'secondary'} */
  export let variant = 'primary';
  
  /** @type {'sm' | 'md' | 'lg'} */
  export let size = 'md';
  
  /** @type {string | undefined} */
  export let href = undefined;
  
  /** @type {boolean} */
  export let disabled = false;
  
  /** @type {boolean} */
  export let loading = false;
  
  /** @type {'button' | 'submit' | 'reset'} */
  export let type = 'button';

  $: classes = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    disabled && 'btn-disabled',
    loading && 'btn-loading'
  ].filter(Boolean).join(' ');
</script>

{#if href}
  <a {href} class={classes} class:disabled>
    <slot />
  </a>
{:else}
  <button {type} class={classes} {disabled} on:click>
    {#if loading}
      <span class="spinner"></span>
    {/if}
    <slot />
  </button>
{/if}

<style>
  /* ===================================
     BASE : MOBILE FIRST (320px+)
     =================================== */

  .btn {
    padding: 0.5rem 0.75rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    text-align: center;
    white-space: nowrap;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  .btn:hover::before {
    left: 100%;
  }

  /* ===================================
     VARIANT PRIMARY - Bleu Royal
     =================================== */

  .btn-primary {
    background: linear-gradient(135deg, #1a4d7a 0%, #2563a8 100%);
    color: white;
    border: 2px solid transparent;
    box-shadow: 0 2px 8px rgba(26, 77, 122, 0.2);
  }

  .btn-primary:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563a8 0%, #1a4d7a 100%);
    box-shadow: 0 4px 16px rgba(26, 77, 122, 0.4);
    transform: translateY(-2px);
  }

  .btn-primary:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(26, 77, 122, 0.3);
  }

  /* ===================================
     VARIANT SECONDARY - Or Champagne
     =================================== */

  .btn-secondary {
    background: linear-gradient(135deg, #c9a961 0%, #ddc184 100%);
    color: #1a4d7a;
    border: 2px solid transparent;
    box-shadow: 0 2px 8px rgba(201, 169, 97, 0.2);
  }

  .btn-secondary:hover:not(:disabled) {
    background: linear-gradient(135deg, #ddc184 0%, #c9a961 100%);
    box-shadow: 0 4px 16px rgba(201, 169, 97, 0.4);
    transform: translateY(-2px);
  }

  .btn-secondary:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(201, 169, 97, 0.3);
  }

  /* ===================================
     VARIANT OUTLINE (optionnel)
     =================================== */

  .btn-outline-primary {
    background: transparent;
    color: #1a4d7a;
    border: 2px solid #1a4d7a;
  }

  .btn-outline-primary:hover:not(:disabled) {
    background: #1a4d7a;
    color: white;
    box-shadow: 0 4px 12px rgba(26, 77, 122, 0.3);
    transform: translateY(-2px);
  }

  .btn-outline-secondary {
    background: transparent;
    color: #c9a961;
    border: 2px solid #c9a961;
  }

  .btn-outline-secondary:hover:not(:disabled) {
    background: #c9a961;
    color: white;
    box-shadow: 0 4px 12px rgba(201, 169, 97, 0.3);
    transform: translateY(-2px);
  }

  /* ===================================
     SIZES - Mobile
     =================================== */

  .btn-sm {
    padding: 0.375rem 0.625rem;
    font-size: 0.75rem;
  }

  .btn-md {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }

  .btn-lg {
    padding: 0.625rem 1rem;
    font-size: 0.875rem;
  }

  /* ===================================
     STATES
     =================================== */

  .btn-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .btn-loading {
    opacity: 0.7;
    cursor: wait;
  }

  .spinner {
    width: 12px;
    height: 12px;
    border: 2px solid currentColor;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    flex-shrink: 0;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* ===================================
     MOBILE LARGE (480px+)
     =================================== */
  @media (min-width: 480px) {
    .btn {
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
    }

    .btn-sm {
      padding: 0.5rem 0.75rem;
      font-size: 0.8rem;
    }

    .btn-lg {
      padding: 0.75rem 1.25rem;
      font-size: 0.95rem;
    }

    .spinner {
      width: 14px;
      height: 14px;
    }
  }

  /* ===================================
     TABLETTE (768px+)
     =================================== */
  @media (min-width: 768px) {
    .btn {
      padding: 0.75rem 1.25rem;
      font-size: 0.95rem;
    }

    .btn-sm {
      padding: 0.625rem 1rem;
      font-size: 0.875rem;
    }

    .btn-lg {
      padding: 0.875rem 1.5rem;
      font-size: 1.05rem;
    }

    .btn-primary {
      box-shadow: 0 4px 15px rgba(26, 77, 122, 0.2);
    }

    .btn-primary:hover:not(:disabled) {
      box-shadow: 0 8px 25px rgba(26, 77, 122, 0.4);
    }

    .btn-secondary {
      box-shadow: 0 4px 15px rgba(201, 169, 97, 0.2);
    }

    .btn-secondary:hover:not(:disabled) {
      box-shadow: 0 8px 25px rgba(201, 169, 97, 0.4);
    }
  }

  /* ===================================
     DESKTOP (1024px+)
     =================================== */
  @media (min-width: 1024px) {
    .btn:hover:not(:disabled) {
      transform: translateY(-3px);
    }

    .btn:active:not(:disabled) {
      transform: translateY(-1px);
    }
  }
</style>