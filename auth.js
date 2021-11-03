import client from './client';

const login = (email, password, onProgress) =>
  client.post(
    '/api/admin/admin/login/',
    { email, password },
    {
      onProgress: progress => onProgress(progress.loaded / progress.total),
    },
  );

export default {
  login,
};
