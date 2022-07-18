/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { RATIO } from 'src/constants';
import styled from 'styled-components';
import { ReactComponent as ChattingButton } from 'src/assets/icons/webrtcroom/sendMessageButton.svg';

function Chatting() {
  const [inputMessage, setInputMessage] = useState('');
  const [message, setMessage] = useState('');
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
    if (inputMessage.length > 0) {
      setInputMessage('');
      setMessage(inputMessage);
    }
  };

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