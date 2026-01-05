import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('fr', () => import('./locales/fr.json'));
register('pl', () => import('./locales/pl.json'));
register('en', () => import('./locales/en.json'));

init({
  fallbackLocale: 'pl',  // Si la langue détectée n'existe pas, utilise le polonais
  initialLocale: getLocaleFromNavigator() || 'pl',  // Détecte le navigateur, sinon polonais par défaut
});