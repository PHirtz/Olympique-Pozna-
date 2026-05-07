import { error } from '@sveltejs/kit';

const BACKEND_URL = 'http://localhost:5000';

export async function GET({ params }) {
  try {
    const response = await fetch(`${BACKEND_URL}/uploads/${params.path}`);
    
    if (!response.ok) {
      throw error(response.status, 'File not found');
    }
    
    const buffer = await response.arrayBuffer();
    
    return new Response(buffer, {
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000'
      }
    });
  } catch (err) {
    throw error(404, 'File not found');
  }
}
