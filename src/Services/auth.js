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

const forgotPass = (user_login, password, password_confirmation) =>
  client.post('web/auth/forgot-password', {
    user_login,
    password,
    password_confirmation,
  });

export default {
  login,
  register,
  forgotPass,
};
