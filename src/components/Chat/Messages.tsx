/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { chattype } from './Chatting';

export default function Messages({ e }: { e: chattype }) {
  const chatRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(scrollToBottom, [e.content]);

  return (
    <OneChat>
      <Chatid>{e.userId.userNick}</Chatid>
      <Chatword>{e.content}</Chatword>
      <div ref={chatRef} />
    </OneChat>
  );
}

const Chatid = styled.div`
  position: relative;
  left: 28px;
  color: #717171;
  font-size: 17px;
  text-align: center;
  align-items: center;
  display: flex;
`;
const Chatword = styled.div`
  position: relative;
  width: 350px;
  border-radius: 5px;
  font-size: 17px;
  display: inline-block;
  left: 30px;
  color: white;
`;

const OneChat = styled.div`
  width: 100%;
  display: flex;
  margin-top: 10px;
  gap: 5px;
`;
