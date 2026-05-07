/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // Intercepte les requêtes API et les proxifie vers le backend
  if (event.url.pathname.startsWith('/api')) {
    const backendUrl = `http://localhost:5000${event.url.pathname}${event.url.search}`;
    
    try {
      // Récupère le body pour les requêtes POST, PUT, PATCH, DELETE
      let body = undefined;
      if (event.request.method !== 'GET' && event.request.method !== 'HEAD') {
        body = await event.request.text();
      }

      const response = await fetch(backendUrl, {
        method: event.request.method,
        headers: {
          'Content-Type': event.request.headers.get('content-type') || 'application/json',
          'Authorization': event.request.headers.get('authorization') || '',
        },
        body: body
      });

      const data = await response.text();
      
      return new Response(data, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } catch (error) {
      console.error('Proxy error:', error);
      return new Response(JSON.stringify({ error: 'Backend unavailable' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }

  return resolve(event);
}
