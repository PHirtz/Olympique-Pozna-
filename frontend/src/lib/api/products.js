import { apiRequest } from './client.js';

/**
 * @param {Record<string, any>} [params={}]
 */
export async function getAllProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  return apiRequest(`/products?${query}`);
}

/**
 * @param {number} id
 */
export async function getProductById(id) {
  return apiRequest(`/products/${id}`);
}

/**
 * @param {Record<string, any>} data
 */
export async function createProduct(data) {
  return apiRequest('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 * @param {Record<string, any>} data
 */
export async function updateProduct(id, data) {
  return apiRequest(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * @param {number} id
 */
export async function deleteProduct(id) {
  return apiRequest(`/products/${id}`, { method: 'DELETE' });
}