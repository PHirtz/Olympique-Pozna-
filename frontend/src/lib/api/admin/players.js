export function getAll(params = {}) {
  const searchParams = new URLSearchParams(params).toString();
  return apiRequest(`/admin/players?${searchParams}`);
}

export function getById(id) {
  return apiRequest(`/admin/players/${id}`);
}

export function create(formData) {
  return apiRequest('/admin/players', {
    method: 'POST',
    body: formData
  });
}

export function update(id, formData) {
  return apiRequest(`/admin/players/${id}`, {
    method: 'PUT',
    body: formData
  });
}

export function deletePlayer(id) {
  return apiRequest(`/admin/players/${id}`, {
    method: 'DELETE'
  });
}