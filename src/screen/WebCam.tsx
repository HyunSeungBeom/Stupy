/* eslint-disable react/button-has-type */
import { io } from 'socket.io-client';
import Webcamchatting from '../components/webcamchatting';

export default function WebCam() {
  // 소켓연결
  const localToken = localStorage.getItem('token');
  const socket = io('http://stupy.shop', {
    // const socket = io('http://localhost:3001', {
    auth: {
      token: localToken,
    },
  });

  return (
    <>
      <Webcamchatting socket={socket} />;
    </>
  );
}
