import axios from 'src/api/';
import { GetMyRooms } from './types';

export const getMyRooms = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.get<GetMyRooms>('/room/myrooms/');
    return res.data;
  } catch (err) {
    throw err;
  }
};
