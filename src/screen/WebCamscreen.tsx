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

  const { data } = useQuery('roomTitle', () => enterRoomApi(paramid), {
    onSuccess: () => {
      console.log('joinRoomSuccess');
    },
    onError: (errormessge) => {
      // eslint-disable-next-line no-unused-expressions, no-sequences, no-alert
      nav(-1), alert(errormessge);
    },
  });
  // 소켓연결
  const localToken = localStorage.getItem('token');
  console.log(data);
  if (data?.status) {
    socket = io('http://stupy.shop', {
      // const socket = io('http://localhost:3001', {
      auth: {
        token: localToken,
        roomId: paramid,
      },
    });
  }
  if (!socket) {
    return null;
  }
  return <Webcamchatting socket={socket} />;
}
