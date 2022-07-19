/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState, useRef, useEffect, useCallback } from 'react';
// import io from 'socket.io-client';
import styled from 'styled-components';
import { RATIO } from 'src/constants';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import Video from './Video/index';
import { WebRTCUser } from '../../types/types';

// eslint-disable-next-line camelcase
const pc_config = {
  iceServers: [
    // {
    //   urls: 'stun:[STUN_IP]:[PORT]',
    //   'credentials': '[YOR CREDENTIALS]',
    //   'username': '[USERNAME]'
    // },
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};
// const SOCKET_SERVER_URL = 'https://stupy.shop:3000';

// eslint-disable-next-line react/no-unused-prop-types, @typescript-eslint/no-unused-vars
function WebCam({
  isparam,
  socketCurrent,
}: {
  isparam: string;
  socketCurrent: any;
}) {
  // const socketRef = useRef<SocketIOClient.Socket>();
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const [users, setUsers] = useState<WebRTCUser[]>([]);
  const localToken = localStorage.getItem('token');
  const query = useQueryClient();
  const params = useParams();
  console.log(params.id);

  const getLocalStream = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 240,
          height: 450,
        },
      });
      localStreamRef.current = localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
      if (!socketCurrent) return;
      console.log(socketCurrent);
      socketCurrent.emit('join_room', {
        // roomId, userId 받아와야됨.
        roomId: isparam,
        userId: localToken,
      });
    } catch (e) {
      console.log(`getUserMedia error: ${e}`);
    }
  }, []);

  const createPeerConnection = useCallback(
    (socketID: string, userid: string) => {
      try {
        const pc = new RTCPeerConnection(pc_config);

        pc.onicecandidate = (e) => {
          if (!(socketCurrent && e.candidate)) return;
          console.log('onicecandidate');
          socketCurrent.emit('candidate', {
            candidate: e.candidate,
            candidateSendID: socketCurrent.id,
            candidateReceiveID: socketID,
          });
        };

        pc.oniceconnectionstatechange = (e) => {
          console.log(e);
        };

        pc.ontrack = (e) => {
          console.log('ontrack success');
          setUsers((oldUsers) =>
            oldUsers
              .filter((user) => user.id !== socketID)
              .concat({
                id: socketID,
                userid,
                stream: e.streams[0],
              }),
          );
        };

        if (localStreamRef.current) {
          console.log('localstream add');
          localStreamRef.current.getTracks().forEach((track) => {
            if (!localStreamRef.current) return;
            pc.addTrack(track, localStreamRef.current);
          });
        } else {
          console.log('no local stream');
        }

        return pc;
      } catch (e) {
        console.error(e);
        return undefined;
      }
    },
    [],
  );

  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    socketCurrent = io.connect('https://stupy.shop:3000');

    console.log(query.getQueryData('roomid'));
    getLocalStream();

    // 자신을 제외한 같은 방의 모든 user 목록을 받아온다.
    // 해당 user에게 offer signal을 보낸다(createOffer() 함수 호출).
    socketCurrent.on(
      'all_users',
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        datatoclient: any,
        // usersInThisRoom: Array<{ id: string; userid: string }>,
        // chatInThisRoom: Array<{
        //   _id: string;
        //   roomId: string;
        //   content: string;
        //   senderId: string;
        //   createdAt: Date;
        //   __v: boolean;
        // }>,
      ) => {
        console.log(datatoclient.usersInThisRoom);
        [...datatoclient.usersInThisRoom].forEach(async (user) => {
          if (!localStreamRef.current) return;
          const pc = createPeerConnection(user.id, user.userid);
          if (!(pc && socketCurrent)) return;
          pcsRef.current = { ...pcsRef.current, [user.id]: pc };
          try {
            const localSdp = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            });
            console.log('create offer success');
            await pc.setLocalDescription(new RTCSessionDescription(localSdp));
            socketCurrent.emit('offer', {
              sdp: localSdp,
              offerSendID: socketCurrent.id,
              offerSendUserID: 'offerSendSample@sample.com',
              offerReceiveID: user.id,
            });
          } catch (e) {
            console.error(e);
          }
        });
      },
    );

    socketCurrent.on(
      'getOffer',
      async (data: {
        sdp: RTCSessionDescription;
        offerSendID: string;
        offerSendUserID: string;
      }) => {
        const { sdp, offerSendID, offerSendUserID } = data;
        console.log('get offer');
        if (!localStreamRef.current) return;
        const pc = createPeerConnection(offerSendID, offerSendUserID);
        if (!(pc && socketCurrent)) return;
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          console.log('answer set remote description success');
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socketCurrent.emit('answer', {
            sdp: localSdp,
            answerSendID: socketCurrent.id,
            answerReceiveID: offerSendID,
          });
        } catch (e) {
          console.error(e);
        }
      },
    );

    socketCurrent.on(
      'getAnswer',
      (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
        const { sdp, answerSendID } = data;
        console.log('get answer');
        const pc: RTCPeerConnection = pcsRef.current[answerSendID];
        if (!pc) return;
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      },
    );

    socketCurrent.on(
      'getCandidate',
      async (data: {
        candidate: RTCIceCandidateInit;
        candidateSendID: string;
      }) => {
        console.log('get candidate');
        const pc: RTCPeerConnection = pcsRef.current[data.candidateSendID];
        if (!pc) return;
        await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        console.log('candidate add success');
      },
    );

    socketCurrent.on('user_exit', (data: { id: string }) => {
      if (!pcsRef.current[data.id]) return;
      pcsRef.current[data.id].close();
      delete pcsRef.current[data.id];
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
    });

    return () => {
      if (socketCurrent) {
        socketCurrent.disconnect();
      }
      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
    };
  }, [createPeerConnection, getLocalStream]);

  // //자기 채팅 append한 채팅

  // socketRef.current.emit("MessageFromClient", (data: {roomId: string, content: string, userId: string})
  // socketRef.current.on("chatForOther", (data: {roomId: string, content: string, userId: string, createdAt: Date}) => {

  //   //다른 사람채팅목록 append 시켜주기
  // } )

  return (
    <Contanier>
      <VideoBox muted ref={localVideoRef} autoPlay />
      {users.map((user, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Video key={index} userid={user.userid} stream={user.stream} />
      ))}
    </Contanier>
  );
}
export default WebCam;

const Contanier = styled.div`
  display: flex;
  width: ${210 * RATIO}px;
  max-width: 210px;
`;

const VideoBox = styled.video`
  width: ${460 * RATIO}px;
  display: flex;
`;
