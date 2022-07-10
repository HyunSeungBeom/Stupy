import axios from 'axios';

const baseApi = axios.create({
  baseURL: 'http://13.125.58.110:3000/',
  timeout: 1000,
});

// const callApi = setupInterceptorsTo(baseApi); 인터셉터 토큰 값 자동 보냄

export const createRoomApi = async (formdata: FormData) => {
  const cra = await baseApi.post('/room', formdata, {
    headers: {
      'content-type': 'multipart/form-data',
    },
  });
  return cra;
};
