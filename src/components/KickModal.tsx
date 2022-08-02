/* eslint-disable react/button-has-type */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseButton } from 'src/assets/icons/webrtcroom/closebutton.svg';
import { Socket } from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';

interface kickdatatype {
  nickName: string;
  profilepic: string;
  userId: string;
}

function KickModal({
  modal,
  socket,
  isparam,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
  isparam: string;
}) {
  const [kickdata, setkickdata] = useState<Array<kickdatatype>>([]);
  // const nav = useNavigate();
  const modalClose = () => {
    modal(false);
  };

  const whoKick = () => {
    const data = {
      roomId: isparam,
      targetId: kickdata[1].userId,
    };
    socket.emit('addblacklist', data);
    modalClose();
  };

  const whoKick2 = () => {
    const data = {
      roomId: isparam,
      targetId: kickdata[2].userId,
    };
    socket.emit('addblacklist', data);
    modalClose();
  };

  const whoKick3 = () => {
    const data = {
      roomId: isparam,
      targetId: kickdata[3].userId,
    };
    socket.emit('addblacklist', data);
    modalClose();
  };

  useEffect(() => {
    socket.emit('kicktoggleon', () => {
      console.log('');
    });
    socket.on('userInfos', (data) => {
      setkickdata(data);
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

  console.log('여기야', kickdata);

  return (
    <ModalContainer>
      <ModalInner>
        <Title>내보내기</Title>
        <CloseButtonBox onClick={modalClose}>
          <CloseButton />
        </CloseButtonBox>
        <RankingBox>
          <Menual>
            <RankingMenu>방유저</RankingMenu>
            <NicknameMenu>닉네임</NicknameMenu>
            <TimeMenu>내보내기</TimeMenu>
          </Menual>
          <UserBox>
            <NumberBox>1</NumberBox>
            {kickdata[0] ? (
              <div>
                <DetailBox>
                  <Imageheigth>
                    <ImageBox src={kickdata[0].profilepic} />
                  </Imageheigth>
                  <NicknameBox>{kickdata[0].nickName}</NicknameBox>
                </DetailBox>
                <KickBox>방장</KickBox>
              </div>
            ) : (
              <div />
            )}
          </UserBox>
          <UserBox>
            <NumberBox>2</NumberBox>
            {kickdata[1] ? (
              <div>
                <DetailBox>
                  <Imageheigth>
                    <ImageBox src={kickdata[1].profilepic} />
                  </Imageheigth>
                  <NicknameBox>{kickdata[1].nickName}</NicknameBox>
                </DetailBox>
                <KickBox1>
                  <KickButton onClick={whoKick}> 강퇴 </KickButton>
                </KickBox1>
              </div>
            ) : (
              <div />
            )}
          </UserBox>
          <UserBox>
            <NumberBox>3</NumberBox>
            {kickdata[2] ? (
              <div>
                <DetailBox>
                  <Imageheigth>
                    <ImageBox src={kickdata[2].profilepic} />
                  </Imageheigth>
                  <NicknameBox>{kickdata[2].nickName}</NicknameBox>
                </DetailBox>
                <KickBox2>
                  <KickButton onClick={whoKick2}> 강퇴 </KickButton>
                </KickBox2>
              </div>
            ) : (
              <div />
            )}
          </UserBox>
          <UserBox>
            <NumberBox>4</NumberBox>
            {kickdata[3] ? (
              <div>
                <DetailBox>
                  <Imageheigth>
                    <ImageBox src={kickdata[3].profilepic} />
                  </Imageheigth>
                  <NicknameBox>{kickdata[3].nickName}</NicknameBox>
                </DetailBox>
                <KickBox3>
                  <KickButton onClick={whoKick3}> 강퇴 </KickButton>
                </KickBox3>
              </div>
            ) : (
              <div />
            )}
          </UserBox>
        </RankingBox>
      </ModalInner>
      <Zindex onClick={modalClose} />
    </ModalContainer>
  );
}
export default KickModal;

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
  width: 50px;
  height: 24px;
  left: 13px;
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
  left: 128px;
  top: 14px;
`;

const UserBox = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 348px;
  height: 104px;
  left: 20px;
  border-bottom: 1px solid #efefef;
`;

const NumberBox = styled.div`
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.28px;
  height: 100%;
  margin-left: 28px;
  text-align: center;
  line-height: 100px;
`;

const KickBox = styled.div`
  position: absolute;
  width: 100px;
  height: 24px;
  left: 230px;
  top: 90px;
`;
const DetailBox = styled.div`
  line-height: 100px;
  display: flex;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
`;

const Imageheigth = styled.div`
  display: flex;
  padding-top: 24px;
  padding-right: 20px;
  padding-left: 20px;
`;

const ImageBox = styled.img`
  box-sizing: border-box;
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 48px;
`;

const NicknameBox = styled.div`
  display: flex;
  padding-left: 2px;
`;

const KickBox1 = styled.div`
  position: absolute;
  width: 100px;
  height: 24px;
  left: 230px;
  top: 200px;
`;

const KickBox2 = styled.div`
  position: absolute;
  width: 100px;
  height: 24px;
  left: 230px;
  top: 305px;
`;

const KickBox3 = styled.div`
  position: absolute;
  width: 100px;
  height: 24px;
  left: 230px;
  top: 405px;
`;

const KickButton = styled.button`
  color: white;
  font-weight: 600px;
  background: #ff9052;
  border: solid 1px white;
  width: 100px;
  border-radius: 20px;
  height: 35px;

  box-sizing: border-box;
`;
