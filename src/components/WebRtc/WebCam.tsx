/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { Socket } from 'socket.io-client';
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
function WebCam({ isparam, socket }: { isparam: string; socket: Socket }) {
  console.log('bye');
  // const socketRef = useRef<SocketIOClient.Socket>();
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const [users, setUsers] = useState<WebRTCUser[]>([]);
  const params = useParams();
  console.log(params.id);

  const getLocalStream = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          width: 230,
          height: 400,
        },
      });
      localStreamRef.current = localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
      if (!socket) return;
      console.log(socket);
      socket.emit('join_room', {
        // roomId, userId 받아와야됨.
        roomId: isparam,
        // userId: localToken,
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
          if (!(socket && e.candidate)) return;
          console.log('onicecandidate');
          socket.emit('candidate', {
            candidate: e.candidate,
            candidateSendID: socket.id,
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
    // socketRef.current = io.connect(SOCKET_SERVER_URL);
    // socket(socketRef.current);

    getLocalStream();
    // console.log(socket);
    // 자신을 제외한 같은 방의 모든 user 목록을 받아온다.
    // 해당 user에게 offer signal을 보낸다(createOffer() 함수 호출).
    socket.on(
      'all_users',
      (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        datatoclient: any,
        // usersInThisRoom: Array<{ id: string; userid: string }>,
        // chatInThisRoom: Array<{
        //   _id: string;
        //   roomId: string;
        //   content: string;
        //   userId: string;
        //   createdAt: Date;
        //   __v: boolean;
        // }>,
      ) => {
        console.log(datatoclient.chatInThisRoom);
        console.log(datatoclient.usersInThisRoom);
        // console.log(datatoclient.chatInThisRoom.userId.userNick);
        [...datatoclient.usersInThisRoom].forEach(async (user) => {
          if (!localStreamRef.current) return;
          const pc = createPeerConnection(user.id, user.userid);
          if (!(pc && socket)) return;
          pcsRef.current = { ...pcsRef.current, [user.id]: pc };
          try {
            const localSdp = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            });
            console.log('create offer success');
            await pc.setLocalDescription(new RTCSessionDescription(localSdp));
            socket.emit('offer', {
              sdp: localSdp,
              offerSendID: socket.id,
              offerSendUserID: 'offerSendSample@sample.com',
              offerReceiveID: user.id,
            });
          } catch (e) {
            console.error(e);
          }
        });
      },
    );

    socket.on(
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
        if (!(pc && socket)) return;
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          console.log('answer set remote description success');
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socket.emit('answer', {
            sdp: localSdp,
            answerSendID: socket.id,
            answerReceiveID: offerSendID,
          });
        } catch (e) {
          console.error(e);
        }
      },
    );

    socket.on(
      'getAnswer',
      (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
        const { sdp, answerSendID } = data;
        console.log('get answer');
        const pc: RTCPeerConnection = pcsRef.current[answerSendID];
        if (!pc) return;
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      },
    );

    socket.on(
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

    socket.on('user_exit', (data: { id: string }) => {
      if (!pcsRef.current[data.id]) return;
      pcsRef.current[data.id].close();
      delete pcsRef.current[data.id];
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
    });

    return () => {
      if (socket) {
        socket.disconnect();
      }
      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
    };
  }, [createPeerConnection, getLocalStream]);

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
  flex-wrap: wrap;
  max-width: 460px;
`;

const VideoBox = styled.video``;
