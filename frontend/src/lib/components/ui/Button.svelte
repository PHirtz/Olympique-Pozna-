<script>
  export let variant = 'primary'; // 'primary' | 'secondary'
  export let size = 'md'; // 'sm' | 'md' | 'lg'
  export let href = undefined;
  export let disabled = false;
  export let loading = false;
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
    padding: 0.875rem 1.75rem;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    font-size: 0.95rem;
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
    margin-top: 4px;
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
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s;
  }

  .btn:hover::before {
    left: 100%;
  }

  /* Variants */
  .btn-primary {
    background-color: transparent;
    color: #F7B267;
    border: 2px solid #F7B267;
  }

  .btn-primary:hover:not(:disabled) {
    background-color: #F7B267;
    color: white;
    box-shadow: 0 8px 25px rgba(44, 62, 48, 0.4);
    transform: translateY(-2px);
  }

  .btn-primary:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(44, 62, 48, 0.3);
  }

  .btn-secondary {
    background-color: transparent;
    color: #2C3E30;
    border: 2px solid #2C3E30;
  }

  .btn-secondary:hover:not(:disabled) {
    background-color: #2C3E30;
    color: white;
    box-shadow: 0 8px 25px rgba(44, 62, 48, 0.4);
    transform: translateY(-2px);
  }

  .btn-secondary:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 4px 15px rgba(44, 62, 48, 0.3);
  }

  /* Sizes - Mobile */
  .btn-sm {
    padding: 0.625rem 1.25rem;
    font-size: 0.85rem;
  }

  .btn-lg {
    padding: 1rem 2rem;
    font-size: 1.05rem;
  }

  /* States */
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
    width: 14px;
    height: 14px;
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
      padding: 0.95rem 1.85rem;
      font-size: 1rem;
    }

    .btn-sm {
      padding: 0.7rem 1.35rem;
      font-size: 0.9rem;
    }

    .btn-lg {
      padding: 1.1rem 2.2rem;
      font-size: 1.1rem;
    }

    .spinner {
      width: 16px;
      height: 16px;
    }
  }

  /* ===================================
     TABLETTE (768px+)
     =================================== */
  @media (min-width: 768px) {
    .btn {
      padding: 1rem 2rem;
    }

    .btn-sm {
      padding: 0.75rem 1.5rem;
      font-size: 0.9rem;
    }

    .btn-lg {
      padding: 1.25rem 2.5rem;
      font-size: 1.125rem;
    }

    .btn-primary {
      box-shadow: 0 8px 25px rgba(247, 178, 103, 0.3);
    }

    .btn-primary:hover:not(:disabled) {
      box-shadow: 0 12px 35px rgba(247, 178, 103, 0.4);
    }

    .btn-secondary:hover:not(:disabled) {
      box-shadow: 0 12px 35px rgba(44, 62, 48, 0.4);
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