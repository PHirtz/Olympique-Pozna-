async function GET({ params, url, request }) {
  const backendUrl = `http://localhost:5000/${params.path}${url.search}`;
  try {
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: request.headers
    });
    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json"
      }
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: "Backend unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" }
    });
  }
}
async function POST({ params, url, request }) {
  const backendUrl = `http://localhost:5000/${params.path}${url.search}`;
  try {
    const body = await request.text();
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: request.headers,
      body
    });
    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json"
      }
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: "Backend unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" }
    });
  }
}
async function PUT({ params, url, request }) {
  const backendUrl = `http://localhost:5000/${params.path}${url.search}`;
  try {
    const body = await request.text();
    const response = await fetch(backendUrl, {
      method: "PUT",
      headers: request.headers,
      body
    });
    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json"
      }
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: "Backend unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" }
    });
  }
}
async function DELETE({ params, url, request }) {
  const backendUrl = `http://localhost:5000/${params.path}${url.search}`;
  try {
    const response = await fetch(backendUrl, {
      method: "DELETE",
      headers: request.headers
    });
    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json"
      }
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: "Backend unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" }
    });
  }
}
async function PATCH({ params, url, request }) {
  const backendUrl = `http://localhost:5000/${params.path}${url.search}`;
  try {
    const body = await request.text();
    const response = await fetch(backendUrl, {
      method: "PATCH",
      headers: request.headers,
      body
    });
    const data = await response.text();
    return new Response(data, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json"
      }
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return new Response(JSON.stringify({ error: "Backend unavailable" }), {
      status: 503,
      headers: { "Content-Type": "application/json" }
    });
  }
}
export {
  DELETE,
  GET,
  PATCH,
  POST,
  PUT
};
