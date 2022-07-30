/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable react/button-has-type */
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { enterRoomApi } from 'src/api/webcam';
import Webcamchatting from '../components/webcamchatting';

// let socket: Socket | null = null;
export default function WebCamscreen() {
  const param = useParams();
  const paramid = param.id;

  const nav = useNavigate();
  const localToken = localStorage.getItem('token');
  const socket = io('https://stupy.shop', {
    auth: {
      token: localToken,
      roomId: paramid,
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data } = useQuery('enterRoom', () => enterRoomApi(paramid), {
    onError: () => {
      alert('비정상 접근입니다.');
      nav(-1);
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     socket = io('https://stupy.shop', {
  //       // socket = io('https://localhost:3001', {
  //       auth: {
  //         token: localToken,
  //         roomId: paramid,
  //       },
  //     });
  //   }
  // }, [data]);

  // if (socket === null) {
  //   return null;
  // }
  return <Webcamchatting socket={socket} />;
}
