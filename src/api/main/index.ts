import axios from 'axios';
import setupInterceptorsTo from '../interception';
import { GetMain } from './types';

const baseApi = axios.create({
  baseURL: 'https://stupy.shop',
  timeout: 3000,
});

const callApi = setupInterceptorsTo(baseApi);

export const getMain = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await callApi.get<GetMain>('/main/');
    return res.data;
  } catch (err) {
    throw err;
  }
};
