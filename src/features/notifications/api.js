const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const DEMO_USER_ID = import.meta.env.VITE_DEMO_USER_ID || '000000000000000000000001';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', 'x-user-id': DEMO_USER_ID, ...options.headers },
  });
  if (!response.ok) throw new Error('Could not load notifications.');
  return response.status === 204 ? null : response.json();
}

export const notificationApi = {
  list: () => request('/notifications'),
  unreadCount: () => request('/notifications/unread-count'),
  markRead: (id) => request(`/notifications/${id}/read`, { method: 'PATCH' }),
  markAllRead: () => request('/notifications/read-all', { method: 'PATCH' }),
};
