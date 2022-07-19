/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { RATIO } from 'src/constants';
import styled from 'styled-components';
import { ReactComponent as ChattingButton } from 'src/assets/icons/webrtcroom/sendMessageButton.svg';
import { sendSocket } from 'src/recoil/store';
import { useRecoilValue } from 'recoil';

function Chatting({ isparam }: { isparam: string }) {
  const [inputMessage, setInputMessage] = useState('');
  const [message, setMessage] = useState('');
  const socketCurrent = useRecoilValue(sendSocket);
  // const [getWrite, setWirte] = useState([])
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputMessage.length > 0 && socketCurrent) {
      console.log(socketCurrent);
      setInputMessage('');
      socketCurrent.emit('MessageFromClient', {
        // roomId, userId 받아와야됨.
        roomId: isparam,
        content: message,
        // userId: socketCurrent.socketid,
      });
      setMessage(inputMessage);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line no-param-reassign
    // 서버에서 오는 메세지 데이터를 받음
  });
  return (
    <ChattingBox>
      <Chattinglist>{message}</Chattinglist>
      <ChattingBoxdiv>
        <ChatiingInput
          placeholder="입력해주세요"
          onChange={handleInput}
          onKeyDown={handleKeyPressed}
        />
        <ChattingBtn>
          <ChattingButton onClick={sendMessage} />
        </ChattingBtn>
      </ChattingBoxdiv>
    </ChattingBox>
  );
}
export default Chatting;

const ChattingBox = styled.div`
  position: fixed;
  width: ${460 * RATIO}px;
  max-width: 460px;
  bottom: 3%;
  height: 30%;
  background-color: white;
`;

const ChattingBoxdiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const Chattinglist = styled.div`
  width: 100%;
  height: 90%;
  background-color: pink;
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
