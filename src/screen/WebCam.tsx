/* eslint-disable react/button-has-type */
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Webcamchatting from '../components/webcamchatting';

export default function WebCam() {
  const param = useParams();
  const paramid = param.id;
  // 소켓연결
  const localToken = localStorage.getItem('token');
  // const socket = io('http://stupy.shop', {
  const socket = io('http://localhost:3001', {
    auth: {
      token: localToken,
      roomId: paramid,
    },
  });

  return <Webcamchatting socket={socket} />;
}
