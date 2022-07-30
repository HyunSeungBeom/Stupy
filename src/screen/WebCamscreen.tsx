/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { enterRoomApi } from 'src/api/webcam';
import Webcamchatting from '../components/webcamchatting';

export default function WebCamscreen() {
  const param = useParams();
  const paramid = param.id;
  const nav = useNavigate();

  const EnterRoomdata = useQuery('roomTitle', () => enterRoomApi(paramid), {
    onSuccess: () => {
      console.log('joinRoomSuccess');
    },
    onError: (errormessge) => {
      // eslint-disable-next-line no-unused-expressions, no-sequences, no-alert
      nav(-1), alert(errormessge);
    },
  });

  // 소켓연결
  console.log(EnterRoomdata);
  const localToken = localStorage.getItem('token');
  const socket = io('http://stupy.shop', {
    // const socket = io('http://localhost:3001', {
    auth: {
      token: localToken,
      roomId: paramid,
    },
  });
  return <Webcamchatting socket={socket} />;
}
