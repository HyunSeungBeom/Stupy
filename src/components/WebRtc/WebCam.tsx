/* eslint-disable no-console */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import io from 'socket.io-client';
import styled from 'styled-components';
import { RATIO } from 'src/constants';
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
const SOCKET_SERVER_URL = 'http://13.125.58.110:5000/';

function WebCam() {
  const socketRef = useRef<SocketIOClient.Socket>();
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const [users, setUsers] = useState<WebRTCUser[]>([]);

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
      if (!socketRef.current) return;
      socketRef.current.emit('join_room', {
        room: '1234',
        userid: 'sample@naver.com',
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
          if (!(socketRef.current && e.candidate)) return;
          console.log('onicecandidate');
          socketRef.current.emit('candidate', {
            candidate: e.candidate,
            candidateSendID: socketRef.current.id,
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
    socketRef.current = io.connect(SOCKET_SERVER_URL, {
      transportOptions: {
        polling: {
          extraHeaders: {
            'my-custom-header': 'abcd',
          },
        },
      },
    });

    getLocalStream();

    socketRef.current.on(
      'all_users',
      (allUsers: Array<{ id: string; userid: string }>) => {
        allUsers.forEach(async (user) => {
          if (!localStreamRef.current) return;
          const pc = createPeerConnection(user.id, user.userid);
          if (!(pc && socketRef.current)) return;
          pcsRef.current = { ...pcsRef.current, [user.id]: pc };
          try {
            const localSdp = await pc.createOffer({
              offerToReceiveAudio: true,
              offerToReceiveVideo: true,
            });
            console.log('create offer success');
            await pc.setLocalDescription(new RTCSessionDescription(localSdp));
            socketRef.current.emit('offer', {
              sdp: localSdp,
              offerSendID: socketRef.current.id,
              offerSendUserID: 'offerSendSample@sample.com',
              offerReceiveID: user.id,
            });
          } catch (e) {
            console.error(e);
          }
        });
      },
    );

    socketRef.current.on(
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
        if (!(pc && socketRef.current)) return;
        pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          console.log('answer set remote description success');
          const localSdp = await pc.createAnswer({
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
          });
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          socketRef.current.emit('answer', {
            sdp: localSdp,
            answerSendID: socketRef.current.id,
            answerReceiveID: offerSendID,
          });
        } catch (e) {
          console.error(e);
        }
      },
    );

    socketRef.current.on(
      'getAnswer',
      (data: { sdp: RTCSessionDescription; answerSendID: string }) => {
        const { sdp, answerSendID } = data;
        console.log('get answer');
        const pc: RTCPeerConnection = pcsRef.current[answerSendID];
        if (!pc) return;
        pc.setRemoteDescription(new RTCSessionDescription(sdp));
      },
    );

    socketRef.current.on(
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

    socketRef.current.on('user_exit', (data: { id: string }) => {
      if (!pcsRef.current[data.id]) return;
      pcsRef.current[data.id].close();
      delete pcsRef.current[data.id];
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
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
`;

const VideoBox = styled.video`
  max-width: 240px;
  width: ${100 * RATIO}px;

  background-color: blue;
`;
