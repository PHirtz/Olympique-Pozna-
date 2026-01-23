import { register, init } from 'svelte-i18n';

register('pl', () => import('./locales/pl.json'));
register('fr', () => import('./locales/fr.json'));
register('en', () => import('./locales/en.json'));

init({
  fallbackLocale: 'pl',
  initialLocale: 'pl'
});