import client from './client';

const login = (user_login, password) =>
  client.post('web/auth/login', { user_login, password });

export default {
  login,
};
