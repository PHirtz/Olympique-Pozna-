import { PUBLIC_API_URL } from '$env/static/public';
import { getToken, logout } from '$lib/stores/auth';
import { browser } from '$app/environment';

function getApiUrl() {
  if (browser) {
    return PUBLIC_API_URL;
  }
  // SSR : utilise localhost car le DNS externe n'est pas accessible
  return process.env.PRIVATE_API_URL || 'http://localhost:5000';
}

export async function apiRequest(endpoint, options = {}) {
  const url = `${getApiUrl()}${endpoint}`;
  const token = getToken();
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers || {})
  };

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (response.status === 401) {
      if (browser) {
        logout();
        window.location.href = '/login';
      }
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }

    if (!response.ok) {
      console.log('🔴 Erreur complète:', JSON.stringify(data, null, 2));
      throw new Error(data.message || 'Une erreur est survenue');
    }

    return data;
  } catch (error) {
    console.error('Erreur API:', error);
    throw error;
  }
}