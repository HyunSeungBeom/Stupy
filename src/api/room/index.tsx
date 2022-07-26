import axios from 'axios';
import setupInterceptorsTo from '../interception';

const baseApi = axios.create({
  // baseURL: 'https://stupy.shop',
  baseURL: 'http://localhost:3001',
  timeout: 3000,
});

const callApi = setupInterceptorsTo(baseApi);

export const createRoomApi = async (formdata: FormData) => {
  const cra = await callApi.post('/room', formdata, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return cra;
};
