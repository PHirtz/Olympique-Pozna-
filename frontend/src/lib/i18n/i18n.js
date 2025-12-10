import { register, init, getLocaleFromNavigator } from 'svelte-i18n';
import { browser } from '$app/environment';

register('fr', () => import('./locales/fr.json'));
register('pl', () => import('./locales/pl.json'));

init({
  fallbackLocale: 'fr',
  initialLocale: browser ? getLocaleFromNavigator() : 'fr',
});
