/* eslint-disable no-useless-catch */
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

export const leaveRoomApi = async (roomId: string) => {
  try {
    const res = await axios.get(`/room/leave_room/${roomId}`);
    return res;
  } catch (err) {
    throw err;
  }
};

export const EditRoomApi = async (formdata: FormData, roomId: string) => {
  const cra = await axios.patch(`/room/${roomId}`, formdata, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return cra;
};
