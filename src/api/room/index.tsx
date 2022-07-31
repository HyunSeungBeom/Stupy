import axios from 'src/api/';
import { GetRoomPayload, GetRoom } from './types';

// const callApi = setupInterceptorsTo(baseApi);

export const createRoomApi = async (formdata: FormData) => {
  const cra = await axios.post('/room/', formdata, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return cra;
};

export const getRoom = async ({ params }: GetRoomPayload) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.get<GetRoom>('/room/', { params });
    return res.data;
  } catch (err) {
    throw err;
  }
};
