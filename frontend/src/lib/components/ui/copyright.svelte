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

  .footer-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: 0 1rem 3rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  /* ========================================
     SECTIONS DU FOOTER
     ======================================== */

  .footer-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-sponsors-section {
    min-height: 200px;
  }

  .footer-logo {
    height: 120px;
    width: 100px;
    align-items: center;
    justify-content: center;
    align-content: center;
    margin-bottom: 0.5rem;
  }

  .footer-description {
    color: #b4b4c5;
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .footer-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 1rem;
    position: relative;
    padding-bottom: 0.5rem;
  }

  .footer-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(135deg, #c9a961 0%, #1a4d7a 50%, #0f2d4a 100%);
    border-radius: 2px;
  }

  /* ========================================
     RÉSEAUX SOCIAUX
     ======================================== */

  .social-links {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }

  .social-links a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(102, 126, 234, 0.1);
    border: 1px solid rgba(102, 126, 234, 0.3);
    border-radius: 50%;
    color: #c9a961;
    transition: all 0.3s;
  }

  .social-links a:hover {
    background: #c9a961;
    color: white;
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }

  /* ========================================
     LIENS
     ======================================== */

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .footer-links a {
    color: #b4b4c5;
    text-decoration: none;
    transition: all 0.2s;
    display: inline-block;
  }

  .footer-links a:hover {
    color: #c9a961;
    transform: translateX(5px);
  }

  /* ========================================
     CONTACT
     ======================================== */

  .footer-contact {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-contact li {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #b4b4c5;
  }

  .footer-contact li :global(svg) {
    color: #c9a961;
    flex-shrink: 0;
  }

  /* ========================================
     SPONSORS GRID - MOBILE FIRST
     ======================================== */

  .sponsors-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 150px;
  }

  .mini-spinner {
    width: 30px;
    height: 30px;
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top-color: #c9a961;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Mobile : 2 colonnes */
  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 1rem;
  }

  .sponsor-logo-link {
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 1rem;
    transition: all 0.3s;
    min-height: 90px;
  }

  .sponsor-logo-link:not(.no-link):hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #c9a961;
    transform: translateY(-2px);
  }

  .sponsor-logo-link.no-link {
    cursor: default;
  }

  .sponsor-logo-link img {
    max-width: 100%;
    max-height: 60px;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: brightness(0.9);
    transition: filter 0.3s;
  }

  .sponsor-logo-link:not(.no-link):hover img {
    filter: brightness(1.1);
  }

  .view-all-sponsors {
    display: inline-block;
    margin-top: 1rem;
    color: #c9a961;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .view-all-sponsors:hover {
    color: #d4b76f;
    transform: translateX(5px);
  }

  .no-sponsors {
    color: #8a8a9f;
    font-size: 0.9rem;
    font-style: italic;
    margin-top: 1rem;
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
    .footer-container {
      padding: 0 2rem 3rem 2rem;
      gap: 3rem;
    }

    /* Tablet : 3 colonnes pour sponsors */
    .sponsors-grid {
      grid-template-columns: repeat(2, 2fr);
      gap: 1.25rem;
    }

    .sponsor-logo-link {
      min-height: 100px;
      padding: 1.25rem;
    }

    .sponsor-logo-link img {
      max-height: 70px;
    }

    .footer-logo {
      height: 140px;
      width: 120px;
    }
  }

  /* ========================================
     DESKTOP (768px+)
     ======================================== */

  @media (min-width: 768px) {
    .footer-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
    }

    .footer-bottom-container {
      flex-direction: row;
      justify-content: space-between;
      padding: 0 2rem;
    }
  }

  /* ========================================
     LARGE DESKTOP (1024px+)
     ======================================== */

  @media (min-width: 1024px) {
    .footer-container {
      grid-template-columns: repeat(4, 1fr);
    }

    .sponsor-logo-link {
      min-height: 110px;
    }

    .sponsor-logo-link img {
      max-height: 100px;
    }

    .footer-logo {
      height: 180px;
      width: 150px;
    }
  }

  /* ========================================
     EXTRA LARGE (1200px+)
     ======================================== */

  @media (min-width: 1200px) {
    .footer-container {
      padding: 0 1rem 1rem 1rem;
    }

    .sponsor-logo-link {
      padding: 1rem;
    }
  }
</style>