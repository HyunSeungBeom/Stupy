/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { chattype } from './Chatting';

export default function Messages({
  currentId,
  e,
}: {
  currentId: string | undefined;
  e: chattype;
}) {
  const chatRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line prefer-destructuring
  // console.log(e);
  const id = e.userId.kakaouserId;

  console.log(e);
  console.log(currentId, id);
  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(scrollToBottom, [e.content]);
  return (
    <OneChat isMe={id === currentId}>
      {id !== currentId ? (
        <Chatid isMe={id === currentId}>{e.userId.userNick}</Chatid>
      ) : null}
      <Chatword isMe={id === currentId}>{e.content}</Chatword>
      <div ref={chatRef} />
    </OneChat>
  );
}

const Chatid = styled.div<{ isMe: boolean }>`
  text-align: ${(props) => (props.isMe ? 'right' : 'left')};
  position: relative;
  right: ${(props) => (props.isMe ? '2%' : '-2%')};
  color: black;
  font-size: 15px;
  margin-bottom: 5px;
`;
const Chatword = styled.div<{ isMe: boolean }>`
  text-align: ${(props) => (props.isMe ? 'right' : 'left')};
  position: relative;
  background: ${(props) => (props.isMe ? '#FFEE59' : 'white')};
  border-radius: 5px;
  border: 1px solid black;
  padding: 10px;
  display: inline-block;
  right: ${(props) => (props.isMe ? '2%' : '-2%')};
`;

const OneChat = styled.div<{ isMe: boolean }>`
  width: 100%;
  margin-top: ${(props) => (props.isMe ? '10px' : '22px')};
  text-align: ${(props) => (props.isMe ? 'right' : 'left')};
`;
