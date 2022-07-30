/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable react/button-has-type */
import { useQuery } from 'react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { enterRoomApi } from 'src/api/webcam';
import Webcamchatting from '../components/webcamchatting';

export default function WebCamscreen() {
  const param = useParams();
  const paramid = param.id;
  let socket = null;
  const nav = useNavigate();

  const { data } = useQuery('enterRoom', () => enterRoomApi(paramid), {
    onSuccess: () => {
      console.log('joinRoomSuccess');
    },
    onError: () => {
      alert('비정상 접근입니다.');
      nav(-1);
    },
  });
  // 소켓연결

  const localToken = localStorage.getItem('token');
  if (data?.data === true) {
    socket = io('http://stupy.shop', {
      // socket = io('http://localhost:3001', {
      auth: {
        token: localToken,
        roomId: paramid,
      },
    });
  }
  if (socket === null) {
    return null;
  }
  return <Webcamchatting socket={socket} />;
}
