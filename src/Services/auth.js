import client from './client';

const login = (user_login, password) =>
  client.post('web/auth/login', { user_login, password });

const register = (
  name,
  password,
  password_confirmation,
  phone_number,
  vendor_id,
) =>
  client.post('web/auth/register', {
    name,
    password,
    password_confirmation,
    phone_number,
    vendor_id,
  });
export default {
  login,
  register,
};
