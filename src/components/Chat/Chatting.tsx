/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { RATIO } from 'src/constants';
import styled from 'styled-components';
import { ReactComponent as ChattingButton } from 'src/assets/icons/webrtcroom/sendMessageButton.svg';
import { ReactComponent as ChattingAudioButton } from 'src/assets/icons/webrtcroom/cameraaudiobutton.svg';
import { ReactComponent as CameraButton } from 'src/assets/icons/webrtcroom/camera.svg';
import { ReactComponent as MicButton } from 'src/assets/icons/webrtcroom/mic.svg';
import { Socket } from 'socket.io-client';
import { Buffer } from 'buffer';
import { userIdApi } from 'src/api/webcam';
import { useQuery } from 'react-query';
import Messages from './Messages';

export interface chattype {
  content: string;
  roomId: string;
  userId: {
    kakaouserId: string;
    userNick: string | undefined;
    _id: string;
  };
}

function Chatting({ isparam, socket }: { isparam: string; socket: Socket }) {
  const [inputMessage, setInputMessage] = useState('');
  const [message, setMessage] = useState<Array<chattype>>([]);
  const token = localStorage.getItem('token');
  const base64Payload = token ? token.split('.')[1] : '';
  const payload = Buffer.from(base64Payload, 'base64');
  const userid = JSON.parse(payload.toString());
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [beforeMessage, setBeforeMessage] = useState([]);

  const { isSuccess, data } = useQuery('userinfo', () =>
    userIdApi(userid.userId),
  );

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleDropdownPress = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const sendMessage = () => {
    if (inputMessage.length > 0 && isSuccess) {
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
            <DropdownBox>
              <DropdownItem>
                <CameraButton />
              </DropdownItem>
            </DropdownBox>
            <DropdownBox2>
              <DropdownItem>
                <MicButton />
              </DropdownItem>
            </DropdownBox2>
          </div>
        )}
      </ChattingBoxdiv>
    </ChattingBox>
  );
}

export default Chatting;

const ChattingBox = styled.div`
  position: fixed;
  width: ${460 * RATIO}px;
  max-width: 460px;
  bottom: 50px;
  height: 250px;
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
  top: 100px;
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
  top: 150px;
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
