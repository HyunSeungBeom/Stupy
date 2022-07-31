/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

import { RATIO } from 'src/constants';
import Video from './Video/index';
import { WebRTCUser } from '../../types/types';
import Chatting from '../Chat/Chatting';

// eslint-disable-next-line camelcase
const pc_config = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302',
    },
  ],
};

function WebCam({
  isparam,
  socket,
  roomOwner,
}: {
  isparam: string;
  socket: Socket;
  roomOwner: boolean | undefined;
}) {
  const pcsRef = useRef<{ [socketId: string]: RTCPeerConnection }>({});
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream>();
  const [users, setUsers] = useState<WebRTCUser[]>([]);
  const [cameraOn, setCameraOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const nav = useNavigate();

  // 카메라 온오프
  const VideoHandler = () => {
    if (localStreamRef.current) {
      if (cameraOn) {
        localStreamRef.current
          .getVideoTracks()
          .forEach((track: { enabled: boolean }) => (track.enabled = false));
        setCameraOn(false);
      } else {
        localStreamRef.current
          .getVideoTracks()
          .forEach((track: { enabled: boolean }) => (track.enabled = true));
        setCameraOn(true);
      }
    }
  };

  // 오디오 온오프
  const AudioHandler = () => {
    if (localStreamRef.current) {
      localStreamRef.current
        .getAudioTracks()
        .forEach(
          (track: { enabled: boolean }) => (track.enabled = !track.enabled),
        );
      if (audioOn) {
        setAudioOn(false);
      } else {
        setAudioOn(true);
      }
    }
  };

  const getLocalStream = useCallback(async () => {
    try {
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      localStreamRef.current = localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
      if (!socket) return;
      console.log(socket);
      socket.emit('join_room', {
        roomId: isparam,
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
    getLocalStream();
    console.log(navigator.mediaDevices.enumerateDevices());
    // 자신을 제외한 같은 방의 모든 user 목록을 받아온다.
    // 해당 user에게 offer signal을 보낸다(createOffer() 함수 호출).
    socket.on('all_users', (datatoclient) => {
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
    });

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
    socket.on('disconnectuser', (errormessage) => {
      // eslint-disable-next-line no-unused-expressions, no-sequences, no-alert
      nav('/list'), console.log(errormessage);
    });

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
      <VideoAll>
        <VideoBox
          className="hiVideo"
          muted
          ref={localVideoRef}
          autoPlay
          playsInline
        />
      </VideoAll>
      {users.map((user, index) => (
        <Video
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          userid={user.userid}
          stream={user.stream}
        />
      ))}
      <ChattingMenu>
        {isparam && (
          <Chatting
            isparam={isparam}
            socket={socket}
            VideoHandler={VideoHandler}
            AudioHandler={AudioHandler}
            roomOwner={roomOwner}
          />
        )}
      </ChattingMenu>
    </Contanier>
  );
}
export default WebCam;

const Contanier = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${428 * RATIO}px;
  max-width: 428px;
  justify-content: space-between;
`;

const VideoBox = styled.video`
  box-sizing: border-box;
`;

const ChattingMenu = styled.div`
  display: flex;
  width: 460px;
`;

const VideoAll = styled.div``;
