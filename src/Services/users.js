import client from './client';

const register = (
  name,
  phone_number,
  password,
  password_confirmation,
  vendor_id,
  tnc,
) =>
  client
    .post('web/auth/register', {
      name,
      phone_number,
      password,
      password_confirmation,
      vendor_id,
      tnc,
    })
    .then(res => {
      console.log(res.data);
    });

export default { register };
