/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import { RATIO } from 'src/constants';
import styled from 'styled-components';

function Chatting() {
  const [inputMessage, setInputMessage] = useState('');
  const [message, setMessage] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    console.log(e.target.value);
  };

  const handleKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (inputMessage.length > 0) {
      setMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <ChattingBox>
      <Chattinglist>{message}</Chattinglist>
      <input
        placeholder="메시지를 입력해주세요"
        onChange={handleInput}
        onKeyDown={handleKeyPressed}
      />
      <button onClick={sendMessage}>전송</button>
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

const Chattinglist = styled.div`
  width: 60%;
  height: 90%;
  background-color: pink;
`;
