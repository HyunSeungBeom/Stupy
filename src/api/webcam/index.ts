import axios from 'axios';
import setupInterceptorsTo from '../interception';

const baseApi = axios.create({
  baseURL: 'https://stupy.shop',
  timeout: 3000,
});

const callApi = setupInterceptorsTo(baseApi);

export const userIdApi = async (id: string) => {
  const userIdApi = await callApi.get(`/api/users/${id}`);
  return userIdApi;
};

export const roomTitleApi = async (roomId: string | undefined) => {
  const roomTitleApi = await callApi.get(`/room/${roomId}`);
  return roomTitleApi;
};

export const SocketApi = async (roomId: string | undefined) => {
  const SocketApi = await callApi.get(`/room/socket/${roomId}`);
  return SocketApi;
};
