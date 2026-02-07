import { get } from 'svelte/store';
import { _ } from 'svelte-i18n';

/**
 * Traduit une position de joueur selon la locale active
 * @param {string} positionKey - La clé de position (ex: 'goalkeeper')
 * @returns {string} - La position traduite
 */
export function translatePosition(positionKey) {
  if (!positionKey) return '';
  
  const key = positionKey.toLowerCase();
  const t = get(_);
  
  return t(`teams.positions.${key}`, { default: positionKey });
}