<script>
  import { locale } from 'svelte-i18n';
  
  /**
   * @param {'fr' | 'pl'} lang
   */
  function changeLanguage(lang) {
    locale.set(lang);
    localStorage.setItem('preferredLanguage', lang);
  }
</script>

<div class="language-selector">
  <button 
    on:click={() => changeLanguage('fr')} 
    class="lang-btn" 
    class:active={$locale === 'fr'}
    aria-label="Français"
  >
    FR
  </button>
  <span class="separator">|</span>
  <button 
    on:click={() => changeLanguage('pl')} 
    class="lang-btn" 
    class:active={$locale === 'pl'}
    aria-label="Polski"
  >
    PL
  </button>
</div>

<style>
  .language-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: rgba(102, 126, 234, 0.08);
    border-radius: 0.5rem;
    border: 1px solid rgba(102, 126, 234, 0.2);
  }

  .lang-btn {
    background: none;
    border: none;
    padding: 0.25rem 0.5rem;
    font-weight: 600;
    font-size: 0.95rem;
    color: #666;
    cursor: pointer;
    border-radius: 0.25rem;
    transition: all 0.2s;
  }

  .lang-btn:hover {
    color: #F7B267;
    background: rgba(102, 126, 234, 0.1);
  }

  .lang-btn.active {
    color: #F7B267;
    background: rgba(102, 126, 234, 0.15);
    font-weight: 700;
  }

  .separator {
    color: #ccc;
    font-weight: 300;
  }

  /* Mobile */
  @media (max-width: 767px) {
    .language-selector {
      width: 100%;
      justify-content: center;
      padding: 0.75rem;
    }
  }
</style>