/* eslint-disable react/void-dom-elements-no-children */
/* eslint-disable no-alert */
/* eslint-disable react/require-default-props */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseButton } from 'src/assets/icons/webrtcroom/closebutton.svg';
import { ReactComponent as RockPicture } from 'src/assets/icons/enterroom/enterroommodal.svg';
import { ReactComponent as OpenChatButton } from 'src/assets/icons/enterroom/openchatgo.svg';
import { ReactComponent as EnterButton } from 'src/assets/icons/enterroom/enter.svg';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { enterRoomApi } from 'src/api/room';
import icoOn from 'src/assets/icons/icoOn.svg';
import icoOff from 'src/assets/icons/icoOff.svg';
import imgSample from 'src/assets/images/imgSample.png';

function OpenChetModal({
  modal,
  image,
  title,
  desc,
  hashtag,
  openkakao,
  roomId,
  isOn,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
  image?: string;
  title: string;
  desc: string;
  hashtag: string[];
  openkakao?: string;
  roomId: string;
  isOn: boolean;
}) {
  const [password, setPassword] = useState<string>();

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const EnterRoom = useMutation(
    (password: string) => enterRoomApi(roomId, password),
    {
      onSuccess: () => {
        nav(`/room/${roomId}`);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (data: any) => {
        alert(`${data.response.data.message}`);
      },
    },
  );
  const nav = useNavigate();

  const modalClose = () => {
    modal(false);
  };

  const kakaoClick = () => {
    window.open(`https://${openkakao}`, '_blank');
  };

  const EnterButtonClick = () => {
    if (password) EnterRoom.mutate(password);
  };

  useEffect(() => {
    document.body.style.cssText = `
      overflow: hidden;
      `;
    return () => {
      document.body.style.cssText = '';
    };
  }, []);

  // console.log(image);
  return (
    <ModalContainer>
      <ModalInner>
        <ImgBox>
          <img
            style={{
              width: '380px',
              height: '286px',
              background: image ? `url(${image})` : `url(${imgSample})`,
              backgroundSize: 'cover',
            }}
          />

          <TitleBox>
            <img
              src={isOn ? icoOn : icoOff}
              alt=""
              style={{
                position: 'absolute',
                width: 63,
                height: 26,
                marginBottom: 80,
              }}
            />
            {title}
          </TitleBox>
          <ContentBox>{desc}</ContentBox>
          <HashTagBox>
            {hashtag[0] ? `#${hashtag[0]}` : null}{' '}
            {hashtag[1] ? `#${hashtag[1]}` : null}{' '}
            {hashtag[2] ? `#${hashtag[2]}` : null}
          </HashTagBox>
          <RockBox>
            <RockPicture />
          </RockBox>
        </ImgBox>
        <CloseButtonBox onClick={modalClose}>
          <CloseButton />
        </CloseButtonBox>
        <PasswordBox>
          <PasswordTitle>비밀번호를 입력해주세요.</PasswordTitle>
          <PasswordInput
            type="password"
            placeholder="영문+숫자 4자리 이상 10자리 이하"
            onChange={onChangePassword}
            value={password}
          />
        </PasswordBox>
        <ButtonBox>
          <OpenChatButton style={{ cursor: 'pointer' }} onClick={kakaoClick} />
          <EnterButton
            style={{ cursor: 'pointer' }}
            onClick={EnterButtonClick}
          />
        </ButtonBox>
      </ModalInner>
      <Zindex onClick={modalClose} />
    </ModalContainer>
  );
}
export default OpenChetModal;

const ModalContainer = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  display: relative;
  z-index: 9999;
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
  border-radius: 9px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 380px;
  max-width: 380px;
  height: 558px;
  max-height: 558px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
`;

const ImgBox = styled.div`
  position: relative;
  width: 380px;
  height: 286px;
`;

const CloseButtonBox = styled.div`
  position: absolute;
  right: 25.73px;
  top: 25.73px;
  cursor: pointer;
`;

const TitleBox = styled.div`
  position: absolute;
  width: 300px;
  height: 35px;
  left: 38px;
  top: 90px;
  color: #ff9052;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 35px;
  display: flex;
  align-items: center;
`;

const ContentBox = styled.div`
  position: absolute;
  width: 310px;
  height: 69px;
  left: 40px;
  top: 140px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 23px;
  text-align: justify;
  color: #ffffff;
`;

const HashTagBox = styled.div`
  position: absolute;
  width: 284px;
  height: 20px;
  left: 40px;
  top: 212px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  /* identical to box height, or 125% */

  text-align: justify;
  letter-spacing: -0.04em;

  color: #ffffff;
`;

const RockBox = styled.div`
  position: absolute;
  width: 72px;
  height: 72px;
  left: 280px;
  top: 250px;
`;

const PasswordBox = styled.div``;

const PasswordTitle = styled.div`
  margin-top: 49px;
  margin-left: 20px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  /* identical to box height, or 111% */

  color: #1f1f1f;
`;

const PasswordInput = styled.input`
  width: 348px;
  height: 42px;
  padding-left: 3px;
  margin-left: 20px;
  margin-top: 10px;
  border: none;
  outline: none;
  border-bottom: 1px solid #eaeaea;
`;

const ButtonBox = styled.div`
  display: flex;
  margin-top: 85px;
  margin-left: 17px;
  gap: 8px;
`;
