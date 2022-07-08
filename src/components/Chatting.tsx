/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Chatting() {
  const [inputMessage, setInputMessage] = useState('');
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  // const handleEnter = (e: { key: string; }) => {
  //   if (e.key === 'Enter') {
  //     socket.emit('message', { inputMessage });
  //     setInputMessage({ ...inputMessage, content: '' });
  //   }

  return (
    <ChattingBox>
      <Chattinglist />
      <input placeholder="메시지를 입력해주세요" onChange={handleInput} />
      {/* <button onChange={handleEnter}>전송</button> */}
    </ChattingBox>
  );
}
export default Chatting;

const ChattingBox = styled.div`
  position: fixed;
  margin-left: 5%;
  bottom: 3%;
  width: 60%;
  height: 30%;
  background-color: white;
`;

const Chattinglist = styled.div`
  width: 60%;
  height: 90%;
  background-color: red;
`;

const ChatInput = styled.input``;
