import axios from 'axios';
import setupInterceptorsTo from '../interception';

const baseApi = axios.create({
  baseURL: 'https://stupy.shop',
  // baseURL: 'http://localhost:3001',
  timeout: 3000,
});

const callApi = setupInterceptorsTo(baseApi);

export const ResigiterOutApi = async (userId: string) => {
  const ResigiterOutApi = await callApi.delete(`api/users/${userId}`);
  return ResigiterOutApi;
};
