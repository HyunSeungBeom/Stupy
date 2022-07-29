/* eslint-disable no-console */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseButton } from 'src/assets/icons/webrtcroom/closebutton.svg';
import { ReactComponent as FirstClass } from 'src/assets/icons/rankingmodal/firstclass.svg';
import { Socket } from 'socket.io-client';

interface timedatatype {
  accumrecord: number;
  currentrecord: number;
  nickName: string;
  profilepic: string;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

function convertMsToTime(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;

  // 👇️ If you don't want to roll hours over, e.g. 24 to 00
  // 👇️ comment (or remove) the line below
  // commenting next line gets you `24:00:00` instead of `00:00:00`
  // or `36:15:31` instead of `12:15:31`, etc.
  hours %= 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

function RankingModal({
  modal,
  socket,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
}) {
  const [timedata, setTimedata] = useState<Array<timedatatype>>([]);

  const modalClose = () => {
    modal(false);
  };

  useEffect(() => {
    socket.emit('timertoggleon', () => {
      console.log('');
    });
    socket.on('timeinfos', (data) => {
      setTimedata(data);
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

  console.log('여기야', timedata);

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
            <FirstBox>
              <FirstClass />
            </FirstBox>
            <NumberBox>1</NumberBox>
            {timedata[0] ? (
              <div>
                <DetailBox>
                  <Imageheigth>
                    <ImageBox src={timedata[0].profilepic} />
                  </Imageheigth>
                  <NicknameBox>{timedata[0].nickName}</NicknameBox>
                  <TimeBox>
                    <span>{convertMsToTime(timedata[0].currentrecord)}</span>/
                    {convertMsToTime(timedata[0].accumrecord)}
                  </TimeBox>
                </DetailBox>
              </div>
            ) : (
              <div />
            )}
          </UserBox>
          <UserBox>
            <NumberBox>2</NumberBox>
            {timedata[1] ? (
              <div>
                <DetailBox>
                  <Imageheigth>
                    <ImageBox src={timedata[1].profilepic} />
                  </Imageheigth>
                  <NicknameBox>{timedata[1].nickName}</NicknameBox>
                  <TimeBox>
                    {convertMsToTime(timedata[1].currentrecord)}/
                    {convertMsToTime(timedata[1].accumrecord)}
                  </TimeBox>
                </DetailBox>
              </div>
            ) : (
              <div />
            )}
          </UserBox>
          <UserBox>
            <NumberBox>3</NumberBox>
            {timedata[2] ? (
              <div>
                <DetailBox>
                  <Imageheigth>
                    <ImageBox src={timedata[2].profilepic} />
                  </Imageheigth>
                  <NicknameBox>{timedata[2].nickName}</NicknameBox>
                  <TimeBox>
                    {convertMsToTime(timedata[2].currentrecord)}/
                    {convertMsToTime(timedata[2].accumrecord)}
                  </TimeBox>
                </DetailBox>
              </div>
            ) : (
              <div />
            )}
          </UserBox>
          <UserBox>
            <NumberBox>4</NumberBox>
            {timedata[3] ? (
              <div>
                <DetailBox>
                  <Imageheigth>
                    <ImageBox src={timedata[3].profilepic} />
                  </Imageheigth>
                  <NicknameBox>{timedata[3].nickName}</NicknameBox>
                  <TimeBox>
                    {convertMsToTime(timedata[3].currentrecord)}/
                    {convertMsToTime(timedata[3].accumrecord)}
                  </TimeBox>
                </DetailBox>
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

const FirstBox = styled.div`
  position: absolute;
  left: 28px;
  top: 74px;
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

const TimeBox = styled.div`
  position: absolute;
  font-weight: 500;
  font-size: 16px;
  color: #7a7a7a;
  right: 20px;

  span {
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    color: #ff9052;
  }
`;
