import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('fr', () => import('./locales/fr.json'));
register('pl', () => import('./locales/pl.json'));

init({
  fallbackLocale: 'fr',
  initialLocale: getLocaleFromNavigator(),
});
