/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable react/button-has-type */
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { enterRoomApi } from 'src/api/webcam';
import Webcamchatting from '../components/webcamchatting';

let socket: Socket | null = null;
export default function WebCamscreen() {
  const param = useParams();
  const paramid = param.id;
  const nav = useNavigate();
  const localToken = localStorage.getItem('token');
  const queryClient = useQueryClient();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isSuccess, data } = useQuery(
    'enterRoom',
    () => enterRoomApi(paramid),
    {
      retry: false,
      onSuccess: () => {
        queryClient.invalidateQueries('enterRoom');
      },
      onError: () => {
        alert('비정상 접근입니다.');
        nav(-1);
      },
    },
  );

  // useEffect(() => {
  //   if (data?.data === true) {
  //     socket = io('https://stupy.shop', {
  //       // socket = io('https://localhost:3001', {
  //       auth: {
  //         token: localToken,
  //         roomId: paramid,
  //       },
  //     });
  //   }
  // }, [data?.data]);

  useEffect(() => {
    console.log('useEffect 사용됨!');
    if (isSuccess) {
      socket = io('https://stupy.shop', {
        // socket = io('https://localhost:3001', {
        auth: {
          token: localToken,
          roomId: paramid,
        },
      });
    }
  }, [isSuccess]);

  if (socket === null) {
    return <div />;
  }
  return <Webcamchatting socket={socket} />;
}
