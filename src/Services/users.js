import client from './client';

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
  register,
};
