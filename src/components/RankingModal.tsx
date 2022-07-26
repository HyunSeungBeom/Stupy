import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseButton } from 'src/assets/icons/webrtcroom/closebutton.svg';
import { Socket } from 'socket.io-client';

function RankingModal({
  modal,
  socket,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
}) {
  const modalClose = () => {
    modal(false);
  };

  useEffect(() => {
    socket.emit('timertoggleon', () => {
      console.log('준호님이랑 같이');
    });
    socket.on('timeinfos', (data) => {
      // data: [... {profilepic,nickName,currentrecord,accumrecord}]
      console.log(data);
    });
  }, []);

  useEffect(() => {
    document.body.style.cssText = `
      overflow: hidden;
      `;
    return () => {
      document.body.style.cssText = '';
    };
  }, []);

  return (
    <ModalContainer>
      <ModalInner>
        <Title>TODAY RANK</Title>
        <CloseButtonBox onClick={modalClose}>
          <CloseButton />
        </CloseButtonBox>
        <RankingBox>
          <Menual>
            <RankingMenu>순위</RankingMenu>
            <NicknameMenu>닉네임</NicknameMenu>
            <TimeMenu>기록/누적시간</TimeMenu>
          </Menual>
          <UserBox>
            <NumberBox>1</NumberBox>
          </UserBox>
          <UserBox>2</UserBox>
          <UserBox>3</UserBox>
          <UserBox>4</UserBox>
        </RankingBox>
      </ModalInner>
      <Zindex onClick={modalClose} />
    </ModalContainer>
  );
}
export default RankingModal;

const ModalContainer = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  display: relative;
  z-index: 999;
`;

const Zindex = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  display: relative;
  z-index: -1;
`;

const ModalInner = styled.div`
  border-radius: 20px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 388px;
  max-width: 388px;
  height: 561px;
  max-height: 561px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  background: #ff9052; ;
`;

const Title = styled.div`
  color: white;
  position: absolute;
  width: 100%;
  height: 17px;
  text-align: center;
  align-items: center;
  top: 28px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 17px;
`;

const CloseButtonBox = styled.div`
  position: absolute;
  right: 25.73px;
  top: 25.73px;
  cursor: pointer;
`;

const RankingBox = styled.div`
  background: white;
  position: absolute;
  width: 348px;
  height: 468px;
  text-align: center;
  align-items: center;
  top: 72px;
  left: 20px;
  border-radius: 9px;
`;

const Menual = styled.div`
  display: flex;
  width: 348px;
  height: 52px;
  border-bottom: 1px solid #d8d8d8;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
`;

const RankingMenu = styled.div`
  position: absolute;
  font-weight: 500;
  width: 40px;
  height: 24px;
  left: 18px;
  top: 14px;
`;
const TimeMenu = styled.div`
  position: absolute;
  width: 110px;
  height: 24px;
  left: 223px;
  top: 14px;
`;
const NicknameMenu = styled.div`
  position: absolute;
  width: 50px;
  height: 24px;
  left: 133px;
  top: 14px;
`;

const UserBox = styled.div`
  box-sizing: border-box;
  position: flex;
  width: 348px;
  height: 104px;
  left: 20px;
  border-bottom: 1px solid #efefef;
`;

const NumberBox = styled.div`
  position: flex;
`;
