import '$lib/i18n/i18n.js';
import { waitLocale } from 'svelte-i18n';

export const load = async () => {
  await waitLocale();
  return {};
};
