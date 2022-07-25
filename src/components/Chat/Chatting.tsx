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
    if (inputMessage.length > 0) {
      // console.log(socket);
      const sendMessage = {
        roomId: isparam,
        content: inputMessage,
        userId: {
          kakaouserId: userid.userId,
          userNick: '',
          _id: '',
        },
      };
      setMessage([...message, sendMessage]);

      socket.emit('MessageFromClient', {
        roomId: isparam,
        content: inputMessage,
      });
    }
  };

  useEffect(() => {
    socket.on('chatForOther', (newChat) => {
      console.log(message);
      setMessage((message) => [...message, newChat]);
      // console.log(newChat);
    });
  }, [socket]);

  return (
    <ChattingBox>
      <Chattinglist>
        {message.map((e, i) => {
          // console.log(e);
          return (
            <Messages
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              currentId={userid.userId}
              e={e}
            />
          );
        })}
      </Chattinglist>
      <ChattingBoxdiv>
        <ChatiingInput
          placeholder="입력해주세요"
          onChange={handleInput}
          onKeyDown={handleKeyPressed}
        />
        <ChattingBtn>
          <ChattingButton onClick={sendMessage} />
        </ChattingBtn>

        <ChattingAudioButton
          onClick={handleDropdownPress}
          style={{ cursor: 'pointer' }}
        />
        {dropdownVisible && (
          <DropdownBox>
            <DropdownItem>
              아아
              {/* <CameraButton /> */}
            </DropdownItem>
            <DropdownItem>
              <MicButton />
            </DropdownItem>
          </DropdownBox>
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
  height: 400px;
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
    display: none;
  }
`;

const ChatiingInput = styled.input`
  width: 70%;
  height: ${44 * RATIO}px;
  max-height: 44px;
  background: #ffffff;
  border-radius: 10px;
  outline: none;
  border-width: 0px;
  padding-left: 10px;
  margin-left: 20px;
  border: 1px solid black;
`;

const ChattingBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: ${44 * RATIO}px;
  height: ${44 * RATIO}px;
  max-width: 44px;
  max-height: 44px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const DropdownBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 265px;
  right: 10px;
  border-radius: 10px;
  background-color: white;
  width: 80px;
  max-width: ${148 * RATIO}px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
`;

const DropdownItem = styled.div`
  box-sizing: border-box;
  border-bottom: #f5f5f5 1px solid;
  padding: 7px 10px;
  cursor: pointer;
`;
