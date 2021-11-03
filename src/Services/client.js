import { create } from 'apisauce';
import cache from '../Utilities/cache';
import settings from '../Config/settings';
// import authStorage from '../Auth/storage';

const apiClient = create({
  baseURL: settings.apiUrl,
});

// auto use token for all request
// apiClient.addAsyncRequestTransform(async request => {
//   const authToken = await authStorage.getToken();
//   if (!authToken) {
//     return;
//   }
//   request.headers['x-auth-token'] = authToken;
// });

// if method get auto save to cache/asyncStorage
const get = apiClient.get;
apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig);

  if (response.ok) {
    // auto save to cache
    cache.store(url, response.data);
    return response;
  }

  // auto seach in cache if offline
  const data = await cache.get(url);
  return data ? { ok: true, data } : response;
};

export default apiClient;
