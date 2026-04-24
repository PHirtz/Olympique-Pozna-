<script>
  import { _ } from 'svelte-i18n';
  import { X, CreditCard, Copy, Check } from 'lucide-svelte';

  let modalOpen = $state(false);
  let copied = $state(false);

  const IBAN = '52 1090 1463 0000 0001 5483 3793';
  const REFERENCE = 'MICHAEL';

  function openModal() { modalOpen = true; }
  function closeModal() { modalOpen = false; }

  function handleKeydown(e) {
    if (e.key === 'Escape') closeModal();
  }

  async function copyIBAN() {
    await navigator.clipboard.writeText(IBAN.replace(/\s/g, ''));
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }

  const labels = {
    tab: { fr: 'Faire un don', pl: 'Wpłać darowiznę', en: 'Make a donation' },
    title: { fr: 'Faire un don', pl: 'Wpłać darowiznę', en: 'Make a donation' },
    subtitle: { fr: 'Soutenez la Bourse Michael Stevens', pl: 'Wesprzyj Stypendium Michaela Stevensa', en: 'Support the Michael Stevens Scholarship' },
    bank: { fr: 'Virement bancaire', pl: 'Przelew bankowy', en: 'Bank transfer' },
    account: { fr: 'Numéro de compte', pl: 'Numer konta', en: 'Account number' },
    reference: { fr: 'Intitulé du virement', pl: 'Tytuł przelewu', en: 'Transfer reference' },
    copy: { fr: 'Copier l\'IBAN', pl: 'Kopiuj IBAN', en: 'Copy IBAN' },
    copied: { fr: 'Copié !', pl: 'Skopiowano!', en: 'Copied!' },
    note: { fr: 'Chaque virement va directement au fonds et aide les enfants à partir en camps.', pl: 'Każda wpłata trafia bezpośrednio do funduszu i pomaga dzieciom wyjechać na obozy.', en: 'Every transfer goes directly to the fund and helps children attend camps.' }
  };

  // Helper — retourne le label dans la bonne langue
  // Usage: t('tab') → utilise $locale
  import { locale } from 'svelte-i18n';
  function t(key) {
    const lang = $locale?.substring(0, 2) ?? 'fr';
    return labels[key]?.[lang] ?? labels[key]?.fr ?? '';
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- ONGLET COLLANT -->
<button class="donation-tab" onclick={openModal} aria-label={t('tab')}>
  <CreditCard size={18} />
  <span class="tab-text">{t('tab')}</span>
</button>

<!-- MODAL -->
{#if modalOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="modal-backdrop" onclick={closeModal}>
    <div class="modal" onclick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" tabindex="-1">
      <button class="modal-close" onclick={closeModal} aria-label="Fermer">
        <X size={20} />
      </button>

      <div class="modal-header">
        <div class="modal-icon">
          <CreditCard size={28} />
        </div>
        <h2>{t('title')}</h2>
        <p>{t('subtitle')}</p>
      </div>

      <div class="modal-body">
        <div class="donation-method">
          <h3>{t('bank')}</h3>

          <div class="info-row">
            <span class="info-label">{t('account')}</span>
            <div class="info-value-row">
              <span class="info-value iban">{IBAN}</span>
              <button class="copy-btn" onclick={copyIBAN}>
                {#if copied}
                  <Check size={16} />
                  <span>{t('copied')}</span>
                {:else}
                  <Copy size={16} />
                  <span>{t('copy')}</span>
                {/if}
              </button>
            </div>
          </div>

          <div class="info-row">
            <span class="info-label">{t('reference')}</span>
            <span class="info-value reference">{REFERENCE}</span>
          </div>
        </div>

        <p class="modal-note">{t('note')}</p>
      </div>
    </div>
  </div>
{/if}

<style>
  /* ── ONGLET COLLANT ── */
  .donation-tab {
    position: fixed;
    right: 0;
    top: 50%;
    transform: translateY(-50%) rotate(0deg);
    z-index: 900;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, #c9a961 0%, #ddc184 100%);
    color: #0f2d4a;
    border: none;
    border-radius: 12px 0 0 12px;
    padding: 0.875rem 0.75rem;
    cursor: pointer;
    font-family: inherit;
    font-weight: 700;
    font-size: 0.85rem;
    box-shadow: -4px 4px 16px rgba(201, 169, 97, 0.4);
    transition: all 0.3s ease;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    flex-direction: column;
  }

  .donation-tab:hover {
    padding-right: 1rem;
    box-shadow: -6px 4px 20px rgba(201, 169, 97, 0.6);
  }

  .tab-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    white-space: nowrap;
    letter-spacing: 0.5px;
  }

  /* ── MODAL BACKDROP ── */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    z-index: 1100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    animation: fadeIn 0.2s ease;
  }

  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  /* ── MODAL ── */
  .modal {
    background: white;
    border-radius: 20px;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.25);
    position: relative;
    animation: slideUp 0.3s ease;
    overflow: hidden;
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0,0,0,0.06);
    border: none;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #666;
    transition: all 0.2s;
    z-index: 1;
  }

  .modal-close:hover { background: rgba(0,0,0,0.12); color: #333; }

  .modal-header {
    background: linear-gradient(135deg, #1a4d7a 0%, #0f2d4a 100%);
    padding: 2.5rem 2rem 2rem;
    text-align: center;
    color: white;
  }

  .modal-icon {
    background: rgba(201, 169, 97, 0.2);
    border: 2px solid rgba(201, 169, 97, 0.5);
    border-radius: 50%;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1rem;
    color: #c9a961;
  }

  .modal-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
  }

  .modal-header p {
    font-size: 0.9rem;
    color: rgba(255,255,255,0.75);
    margin: 0;
  }

  .modal-body {
    padding: 2rem;
  }

  .donation-method h3 {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #94a3b8;
    margin-bottom: 1.25rem;
  }

  .info-row {
    margin-bottom: 1.25rem;
  }

  .info-label {
    display: block;
    font-size: 0.8rem;
    font-weight: 600;
    color: #94a3b8;
    margin-bottom: 0.4rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .info-value-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .info-value {
    font-size: 1rem;
    font-weight: 600;
    color: #1a4d7a;
  }

  .iban {
    font-family: monospace;
    font-size: 1.05rem;
    letter-spacing: 1px;
    background: #f0f5fb;
    padding: 0.5rem 0.875rem;
    border-radius: 8px;
    flex: 1;
  }

  .reference {
    background: rgba(201, 169, 97, 0.15);
    color: #b8880a;
    font-size: 1.2rem;
    font-weight: 800;
    letter-spacing: 2px;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    display: inline-block;
  }

  .copy-btn {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 0.875rem;
    background: #1a4d7a;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: inherit;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all 0.2s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .copy-btn:hover { background: #0f2d4a; transform: translateY(-1px); }

  .modal-note {
    font-size: 0.85rem;
    color: #94a3b8;
    line-height: 1.6;
    margin: 1.5rem 0 0;
    padding-top: 1.25rem;
    border-top: 1px solid #e2e8f0;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .donation-tab {
      padding: 0.75rem 0.625rem;
      font-size: 0.8rem;
    }

    .modal-body { padding: 1.5rem; }
    .modal-header { padding: 2rem 1.5rem 1.5rem; }

    .info-value-row { flex-direction: column; align-items: flex-start; }
    .copy-btn { width: 100%; justify-content: center; }
  }
</style>
