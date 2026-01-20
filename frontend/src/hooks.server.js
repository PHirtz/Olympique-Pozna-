/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  // Intercepte les requêtes API ET UPLOADS
  if (event.url.pathname.startsWith('/api') || event.url.pathname.startsWith('/uploads')) {
    const backendUrl = `http://localhost:5000${event.url.pathname}${event.url.search}`;
    
    try {
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

      const contentType = response.headers.get('content-type');
      
      // Pour les images
      if (contentType?.startsWith('image/')) {
        const imageBuffer = await response.arrayBuffer();
        return new Response(imageBuffer, {
          status: response.status,
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000'
          }
        });
      }

      // Pour JSON
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