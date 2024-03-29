/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable react/button-has-type */
import { useState } from 'react';
import { useQuery } from 'react-query';
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
  // const queryClient = useQueryClient();

  const [isSocket, setIsSocket] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useQuery('beforesocket', () => SocketApi(paramid), {
    retry: 10,
    onSuccess: () => {
      socket = io('https://stupy.shop', {
        auth: {
          token: localToken,
          roomId: paramid,
        },
      });
      setIsSocket(true);
      console.log(isSocket);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (data: any) => {
      if (data) {
        alert(`${data.response.data.message}`);
        nav(-1);
      } else {
        alert('비정상 접근 감지!');
        nav(-1);
      }
    },
  });

  return (
    <div>
      {socket !== null ? (
        <Webcamchatting socket={socket} />
      ) : (
        <div> 연결중 ... </div>
      )}
    </div>
  );
}
