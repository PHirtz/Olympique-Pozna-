<script>
  import { onMount } from 'svelte';
  import { partners as partnersAPI } from '$lib/api';
  import { _ } from 'svelte-i18n';
  import { locale } from 'svelte-i18n';
  import { Facebook, Instagram, Music2, Mail, MapPin, Phone } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  // Récupérer la locale actuelle
  let currentLocale = 'fr';
  locale.subscribe(value => {
    currentLocale = value || 'fr';
  });

  // État pour les sponsors
  let sponsors = [];
  let loadingSponsors = true;

  onMount(async () => {
    try {
      const response = await partnersAPI.getAll({ isActive: true });
      const allPartners = response.data?.partners || response.data || [];
      // Limiter à 6 sponsors pour le footer
      sponsors = allPartners.slice(0, 6);
    } catch (err) {
      console.error('Erreur chargement sponsors:', err);
    } finally {
      loadingSponsors = false;
    }
  });
</script>

<footer class="footer">
  <!-- Barre de copyright -->
  <div class="footer-bottom">
    <div class="footer-bottom-container">
      <p>&copy; {new Date().getFullYear()} Kamiicode & Olympique Poznań. {$_('footer.rights')}</p>
    </div>
  </div>
</footer>

<style>
/* ========================================
     MOBILE FIRST - BASE (320px+)
     ======================================== */
.footer {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #e8e9ef;
  padding-top: 3rem;
}

/* ========================================
     SPONSORS GRID - MOBILE FIRST
     ======================================== */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ========================================
     FOOTER BOTTOM (Copyright)
     ======================================== */
  .footer-bottom {
    background: rgba(0, 0, 0, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem 0;
  }

  .footer-bottom-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 1rem;
  }

  .footer-bottom p {
    color: #8a8a9f;
    font-size: 0.9rem;
    margin: 0;
  }

/* ========================================
     TABLET (640px+)
     ======================================== */
@media (min-width: 640px) {
}

/* ========================================
     DESKTOP (768px+)
     ======================================== */
@media (min-width: 768px) {
  .footer-bottom-container {
    /* Garde juste flex-direction: column pour être sûr du centrage */
    padding: 0 2rem;
  }
}
</style>