/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable react/button-has-type */
import { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { io, Socket } from 'socket.io-client';
import { SocketApi } from 'src/api/webcam';
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
    'beforesocket',
    () => SocketApi(paramid),
    {
      retry: false,
      onSuccess: () => {
        queryClient.invalidateQueries('beforesocket');
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (data: any) => {
        alert(`${data.response.data.message}`);
        nav(-1);
      },
    },
  );

  useEffect(() => {
    if (isSuccess) {
      socket = io('https://stupy.shop', {
        auth: {
          token: localToken,
          roomId: paramid,
        },
      });
    }
  }, [isSuccess]);

  // console.log(socket);
  if (socket === null) {
    return <div />;
  }
  return <Webcamchatting socket={socket} />;
}
