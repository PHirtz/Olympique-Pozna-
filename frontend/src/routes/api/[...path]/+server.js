import { PUBLIC_BACKEND_URL } from '$env/static/public';

// Utilise PUBLIC_BACKEND_URL depuis les variables d'environnement
const BACKEND_BASE = PUBLIC_BACKEND_URL || 'http://localhost:5000';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, url, request }) {
  const backendUrl = `${BACKEND_BASE}/api/${params.path}${url.search}`;
  
  try {
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: request.headers
    });
    
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json'
      }
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new Response(JSON.stringify({ error: 'Backend unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function POST({ params, url, request }) {
  const backendUrl = `${BACKEND_BASE}/api/${params.path}${url.search}`;
  
  try {
    const body = await request.text();
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: request.headers,
      body: body
    });
    
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json'
      }
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new Response(JSON.stringify({ error: 'Backend unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function PUT({ params, url, request }) {
  const backendUrl = `${BACKEND_BASE}/api/${params.path}${url.search}`;
  
  try {
    const body = await request.text();
    
    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers: request.headers,
      body: body
    });
    
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json'
      }
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new Response(JSON.stringify({ error: 'Backend unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params, url, request }) {
  const backendUrl = `${BACKEND_BASE}/api/${params.path}${url.search}`;
  
  try {
    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers: request.headers
    });
    
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json'
      }
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new Response(JSON.stringify({ error: 'Backend unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

/** @type {import('./$types').RequestHandler} */
export async function PATCH({ params, url, request }) {
  const backendUrl = `${BACKEND_BASE}/api/${params.path}${url.search}`;
  
  try {
    const body = await request.text();
    
    const response = await fetch(backendUrl, {
      method: 'PATCH',
      headers: request.headers,
      body: body
    });
    
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json'
      }
    });
  } catch (err) {
    console.error('Proxy error:', err);
    return new Response(JSON.stringify({ error: 'Backend unavailable' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
