import axios from 'src/api/';
import { GetRoomPayload, GetRoom, EnterRoom } from './types';

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

export const enterRoomApi = async (
  roomId: string,
  password: string | undefined,
) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await axios.get<EnterRoom>(`/room/enter_room/${roomId}`, {
      params: {
        password,
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
