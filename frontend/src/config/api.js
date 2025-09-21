const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const API_URLS = {
  auth: {
    register: `${API_BASE_URL}/api/auth/register`,
    login: `${API_BASE_URL}/api/auth/login`,
  },
  admin: {
    auth: {
      login: `${API_BASE_URL}/api/admin/auth/login`,
    },
    dashboard: {
      overview: `${API_BASE_URL}/api/admin/dashboard/overview`,
      donations: `${API_BASE_URL}/api/admin/dashboard/donations`,
      contacts: `${API_BASE_URL}/api/admin/dashboard/contacts`,
      users: `${API_BASE_URL}/api/admin/dashboard/users`,
    },
  },
  donations: `${API_BASE_URL}/api/donations`,
  contact: `${API_BASE_URL}/api/contact`,
  stats: `${API_BASE_URL}/api/stats`,
};

export default API_BASE_URL;