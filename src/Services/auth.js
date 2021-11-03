import client from './client';

const login = (email, password) =>
  client.post('/api/admin/admin/login/', { email, password });

export default {
  login,
};
