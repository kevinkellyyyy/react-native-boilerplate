import client from './client';

const login = (user_login, password, onProgress) =>
  client.post(
    'web/auth/login',
    { user_login, password },
    {
      onProgress: progress => onProgress(progress.loaded / progress.total),
    },
  );

export default {
  login,
};
