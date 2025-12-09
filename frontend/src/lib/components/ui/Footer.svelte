<script>
  import { _ } from 'svelte-i18n';
  import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-svelte';
	import { goto } from '$app/navigation';
  import Button from './Button.svelte';
</script>

<footer class="footer">
  <div class="footer-container">
    
    <!-- Section 1: À propos du club -->
    <div class="footer-section">
      <img src="/logo.png" alt="Logo Olympique Poznań" class="footer-logo" />
      <p class="footer-description">
        {$_('footer.description')}
      </p>
      <div class="social-links">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <Facebook size={20} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <Instagram size={20} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <Twitter size={20} />
        </a>
      </div>
    </div>

    <!-- Section 2: Liens rapides -->
    <div class="footer-section">
      <h3 class="footer-title">{$_('footer.quickLinks')}</h3>
      <ul class="footer-links">
        <li><a href="/club">{$_('nav.club')}</a></li>
        <li><a href="/teams">{$_('nav.teams')}</a></li>
        <li><a href="/news">{$_('nav.news')}</a></li>
        <li><a href="/camps">{$_('nav.camps')}</a></li>
        <li><a href="/shop">{$_('nav.shop')}</a></li>
        <li><a href="/contact">{$_('nav.contact')}</a></li>
      </ul>
    </div>

    <!-- Section 3: Contact -->
    <div class="footer-section">
      <h3 class="footer-title">{$_('footer.contact')}</h3>
      <ul class="footer-contact">
        <li>
          <MapPin size={18} />
          <span>Poznań, Pologne</span>
        </li>
        <li>
          <Phone size={18} />
          <span>+48 XXX XXX XXX</span>
        </li>
        <li>
          <Mail size={18} />
          <span>contact@olympique-poznań.pl</span>
        </li>
      </ul>
    </div>

    <!-- Section 4: Newsletter -->
    <div class="footer-section">
      <h3 class="footer-title">{$_('footer.newsletter')}</h3>
      <p class="newsletter-text">{$_('footer.newsletterText')}</p>
      <form class="newsletter-form">
        <input 
          type="email" 
          placeholder={$_('footer.emailPlaceholder')}
          aria-label={$_('footer.emailPlaceholder')}
        />
        <Button variant="primary">{$_('footer.subscribe')}</Button>
      </form>
    </div>
  </div>

<!-- Section Sponsors -->
<div class="sponsors-section">
  <div class="sponsors-container">
    <h3 class="sponsors-title">{$_('footer.sponsors')}</h3>
    <div class="sponsors-grid">

      <!-- Sponsor 1 : Le Petit Paris -->
      <a 
        href="https://www.petitparis.com.pl" 
        class="sponsor-item" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img src="/sponsors/petit-black.svg" alt="Le Petit Paris" />
      </a>
      
      <!-- Sponsor 2 : endo design -->
      <a 
        href="https://www.endodesign.pl/" 
        class="sponsor-item" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img src="/sponsors/endodesign.png" alt="endo design" />
      </a>
      
      <!-- Sponsor 3 : EXCO A2A Polska -->
      <a 
        href="https://exco.pl/" 
        class="sponsor-item" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img src="/sponsors/logo-exco.jpg" alt="EXCO A2A Polska" />
      </a>
      
      <!-- Sponsor 4 : uzdrowisko -->
      <a 
        href="https://uzdrowisko.org/" 
        class="sponsor-item" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        <img src="/sponsors/uzdrowisko.png" alt="uzdrowisko" />
      </a>
      
    </div>
  </div>
</div>

  <!-- Barre de copyright -->
  <div class="footer-bottom">
    <div class="footer-bottom-container">
      <p>&copy; {new Date().getFullYear()} Kamiicode & Olympique Poznań. {$_('footer.rights')}</p>
      <div class="footer-legal">
        <a href="/mentions-legales">{$_('footer.legalNotice')}</a>
        <span>•</span>
        <button type="button" on:click={() => goto('/privacy')}>
          Politique de confidentialité
        </button>        <span>•</span>
        <a href="/cgv">{$_('footer.terms')}</a>
      </div>
    </div>
  </div>
</footer>

<style>
  /* ========================================
     FOOTER PRINCIPAL
     ======================================== */

  .footer {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: #e8e9ef;
    padding-top: 4rem;
  }

  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem 3rem 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
  }

  /* ========================================
     SECTIONS DU FOOTER
     ======================================== */

  .footer-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-logo {
    height: 130px;
    width: 100px;
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
     NEWSLETTER
     ======================================== */

  .newsletter-text {
    color: #b4b4c5;
    font-size: 0.95rem;
    line-height: 1.6;
  }

  .newsletter-form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .newsletter-form input {
    padding: 0.875rem 1rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    color: #e8e9ef;
    font-size: 0.95rem;
    transition: all 0.2s;
  }

  .newsletter-form input::placeholder {
    color: #8a8a9f;
  }

  .newsletter-form input:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.08);
  }

  /* ========================================
     SECTION SPONSORS
     ======================================== */

  .sponsors-section {
    background: rgba(0, 0, 0, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 2.5rem 0;
  }

  .sponsors-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .sponsors-title {
    text-align: center;
    font-size: 1.3rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .sponsors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    align-items: center;
    justify-items: center;
  }

  .sponsor-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    transition: all 0.3s;
    width: 100%;
    height: 100px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .sponsor-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-5px);
    border-color: rgba(102, 126, 234, 0.3);
  }

  .sponsor-item img {
    max-width: 100%;
    max-height: 60px;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: grayscale(100%) brightness(2);
    transition: filter 0.3s;
  }

  .sponsor-item:hover img {
    filter: grayscale(0%) brightness(1);
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
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .footer-bottom p {
    color: #8a8a9f;
    font-size: 0.9rem;
    margin: 0;
  }

  .footer-legal {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .footer-legal a {
    color: #8a8a9f;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
  }

  .footer-legal a:hover {
    color: #667eea;
  }

  .footer-legal span {
    color: #8a8a9f;
  }

  /* ========================================
     RESPONSIVE
     ======================================== */

  @media (max-width: 768px) {
    .footer-container {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    .sponsors-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
    }

    .footer-bottom-container {
      flex-direction: column;
      text-align: center;
    }

    .footer-legal {
      flex-wrap: wrap;
      justify-content: center;
    }
  }

  @media (max-width: 480px) {
    .sponsors-grid {
      grid-template-columns: 1fr;
    }
  }
</style>