import instance from 'axios';

// export const BASE_URL = 'http://13.125.58.110:3000/';
export const BASE_URL = 'https://stupy.shop:3000/';

const axios = instance.create({
  baseURL: BASE_URL,
});

axios.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  // eslint-disable-next-line no-console
  console.log(
    '[REQUEST]: ',
    token,
    config.method,
    config.url,
    config.params || '',
    config.data || '',
  );
  if (token && config.url) {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export default axios;