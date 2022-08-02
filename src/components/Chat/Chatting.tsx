/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { RATIO, RATIO_H } from 'src/constants';
import styled from 'styled-components';
import { ReactComponent as ChattingButton } from 'src/assets/icons/webrtcroom/sendMessageButton.svg';
import { ReactComponent as ChattingAudioButton } from 'src/assets/icons/webrtcroom/cameraaudiobutton.svg';
import { ReactComponent as CameraButton } from 'src/assets/icons/webrtcroom/camera.svg';
import { ReactComponent as CameraOffButton } from 'src/assets/icons/webrtcroom/cameraOff.svg';
import { ReactComponent as MicButton } from 'src/assets/icons/webrtcroom/mic.svg';
import { ReactComponent as MicOffButton } from 'src/assets/icons/webrtcroom/micOff.svg';
import { Socket } from 'socket.io-client';
import { Buffer } from 'buffer';
import { userIdApi } from 'src/api/webcam';
import { useQuery } from 'react-query';
import Messages from './Messages';
import KickModal from '../KickModal';

export interface chattype {
  content: string;
  roomId: string;
  userId: {
    kakaouserId: string;
    userNick: string | undefined;
    _id: string;
  };
}

function Chatting({
  isparam,
  socket,
  VideoHandler,
  AudioHandler,
  roomOwner,
}: {
  isparam: string;
  socket: Socket;
  VideoHandler: () => void;
  AudioHandler: () => void;
  roomOwner: boolean | undefined;
}) {
  const [inputMessage, setInputMessage] = useState('');
  const [message, setMessage] = useState<Array<chattype>>([]);
  const token = localStorage.getItem('token');
  const base64Payload = token ? token.split('.')[1] : '';
  const payload = Buffer.from(base64Payload, 'base64');
  const userid = JSON.parse(payload.toString());
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [beforeMessage, setBeforeMessage] = useState([]);
  const [micButtonClick, setMicButtonClick] = useState<boolean>(true);
  const [audioButtonClick, setAudioButtonClick] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const { isSuccess, data } = useQuery('userinfo', () => userIdApi());

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  const MiconButton = () => {
    setMicButtonClick(!micButtonClick);
    VideoHandler();
  };

  const AudioButton = () => {
    setAudioButtonClick(!audioButtonClick);
    AudioHandler();
  };

  const handleDropdownPress = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const sendMessage = () => {
    if (inputMessage.length > 0 && isSuccess) {
      console.log(data);
      const sendMessage = {
        roomId: isparam,
        content: inputMessage,
        userId: {
          kakaouserId: userid.userId,
          userNick: data.data.user.userNick,
          _id: '',
        },
      };
      setMessage([...message, sendMessage]);
      socket.emit('MessageFromClient', {
        roomId: isparam,
        content: inputMessage,
      });
      setInputMessage('');
      console.log(socket);
    }
  };

  useEffect(() => {
    socket.on('all_users', (datatoclient) => {
      console.log(datatoclient.chatInThisRoom);
      setBeforeMessage(datatoclient.chatInThisRoom);
    });
  }, []);

  useEffect(() => {
    socket.on('chatForOther', (newChat) => {
      console.log(newChat);
      setMessage((message) => [...message, newChat]);
    });
  }, [socket]);

  return (
    <ChatBackGround>
      <ChattingBox>
        <Chattinglist>
          {beforeMessage.map((e, i) => {
            // eslint-disable-next-line no-useless-return, react/no-array-index-key
            return <Messages key={i} e={e} />;
          })}
          {message.map((e, i) => {
            return (
              <Messages
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                e={e}
              />
            );
          })}
        </Chattinglist>
        <ChattingBoxdiv>
          <InputbuttonBox>
            <ChatiingInput
              placeholder="입력해주세요"
              onChange={handleInput}
              onKeyDown={handleKeyPressed}
              value={inputMessage}
            />
            <ChattingButton
              style={{
                position: 'absolute',
                top: '10',
                right: '0',
                cursor: 'pointer',
              }}
              onClick={sendMessage}
            />
          </InputbuttonBox>
          <ChattingAudioButton
            onClick={handleDropdownPress}
            style={{ cursor: 'pointer', right: '20', position: 'absolute' }}
          />
          {dropdownVisible && (
            <div>
              {micButtonClick ? (
                <DropdownBox onClick={MiconButton}>
                  <DropdownItem>
                    <CameraButton />
                  </DropdownItem>
                </DropdownBox>
              ) : (
                <DropdownBox onClick={MiconButton}>
                  <DropdownItem>
                    <CameraOffButton />
                  </DropdownItem>
                </DropdownBox>
              )}
              {audioButtonClick ? (
                <DropdownBox2 onClick={AudioButton}>
                  <DropdownItem>
                    <MicButton />
                  </DropdownItem>
                </DropdownBox2>
              ) : (
                <DropdownBox2 onClick={AudioButton}>
                  <DropdownItem>
                    <MicOffButton />
                  </DropdownItem>
                </DropdownBox2>
              )}
              {roomOwner === true ? (
                <DropdownBox3 onClick={handleModalOpen}>
                  <DropdownItem>
                    <Kick>강퇴</Kick>
                  </DropdownItem>
                </DropdownBox3>
              ) : (
                <div />
              )}
            </div>
          )}
        </ChattingBoxdiv>
      </ChattingBox>
      {modalOpen && (
        <KickModal modal={setModalOpen} socket={socket} isparam={isparam} />
      )}
    </ChatBackGround>
  );
}

export default Chatting;

const ChatBackGround = styled.div`
  width: ${428 * RATIO}px;
  height: ${800 * RATIO_H}px;
  max-height: 800px;
  /* background-color: pink; */
  /* position: relative; */
`;

const ChattingBox = styled.div`
  position: absolute;
  bottom: 0px;
  width: ${428 * RATIO}px;
  height: ${250 * RATIO_H}px;
  max-width: 428px;
  max-height: 250px;
  background: linear-gradient(
    360deg,
    rgba(0, 0, 0, 0.408) 0%,
    rgba(0, 0, 0, 0.208) 72.92%,
    rgba(67, 67, 67, 0) 100%
  );
`;

const ChattingBoxdiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Chattinglist = styled.div`
  height: calc(100% - 50px);
  overflow-y: auto; //스크롤바 없애기
  ::-webkit-scrollbar {
    display: flex;
  }
  padding-bottom: 10px;
  box-sizing: border-box;
`;

const ChatiingInput = styled.input`
  width: 100%;
  height: ${44 * RATIO}px;
  max-height: 44px;
  background: #ffffff;
  border-radius: 10px;
  outline: none;
  border-width: 0px;
  padding-left: 10px;
  margin-left: 20px;
`;

const DropdownBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 140px;
  right: 20px;
  border-radius: 10px;
  background-color: white;
  width: 54px;
  max-width: ${148 * RATIO}px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
`;

const DropdownBox2 = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 190px;
  right: 20px;
  border-radius: 10px;
  background-color: white;
  width: 54px;
  max-width: ${148 * RATIO}px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
`;

const DropdownBox3 = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 90px;
  right: 20px;
  border-radius: 10px;
  background-color: white;
  width: 54px;
  max-width: ${148 * RATIO}px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
`;

const DropdownItem = styled.div`
  padding: 7px 10px;
  text-align: center;
  cursor: pointer;
`;

const InputbuttonBox = styled.div`
  position: relative;
  width: 76%;
`;

const Kick = styled.span`
  font-weight: 700;
  color: #ff9052;
`;
