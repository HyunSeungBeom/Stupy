import axios from 'src/api/';
import { GetUsers } from './types';

export const getUsers = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.get<GetUsers>('/api/users/');
    return res.data.user;
  } catch (err) {
    throw err;
  }
};

export const patchUsers = async (data: FormData) => {
  const res = await axios.patch('/api/users/', data, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  // eslint-disable-next-line no-console
  console.log(res.data);
  return res.data;
};
