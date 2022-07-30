/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable prefer-const */
/* eslint-disable react/button-has-type */
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { enterRoomApi } from 'src/api/webcam';
import Webcamchatting from '../components/webcamchatting';

export default function WebCamscreen() {
  const param = useParams();
  const paramid = param.id;
  let socket;
  const nav = useNavigate();

  const { data } = useQuery('enterRoom', () => enterRoomApi(paramid), {
    onSuccess: () => {
      console.log('joinRoomSuccess');
    },
  });
  // 소켓연결
  const localToken = localStorage.getItem('token');
  console.log(data);
  console.log(data?.data);
  if (data?.data === true) {
    socket = io('http://stupy.shop', {
      // socket = io('http://localhost:3001', {
      auth: {
        token: localToken,
        roomId: paramid,
      },
    });
  }
  if (data?.data === undefined) {
    alert('비정상 접근입니다.');
    nav(-1);
  }
  if (!socket) {
    console.log('소켓이없어');
    return null;
  }
  return <Webcamchatting socket={socket} />;
}