import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BsFillPeopleFill } from 'react-icons/bs';

function OpenChetModal({
  modal,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [, setPassword] = useState<string>(); // password 배포때문에 뺌.
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const modalClose = () => {
    modal(false);
  };

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
        <ModalHeader>
          <ModalIsLive>Live</ModalIsLive>
          <ModalPeopleBox>
            <ModalPeopleCount>+3/4</ModalPeopleCount>
            <ModalPeopleIcon size={20} />
          </ModalPeopleBox>
        </ModalHeader>
        <ModalTitle>영어회화모임</ModalTitle>
        <ModalContent>
          어 영어 어쩌고 저쩌고 할 사람 오세요 오픈카톡으로 연락먼저 주세요
          어쩌고
        </ModalContent>
        <ModalTag>
          <ModalText>#해시태그</ModalText>
          <ModalText>#해시태그</ModalText>
        </ModalTag>
        <ModalPassword
          type="password"
          placeholder="비밀번호"
          onChange={onChangePassword}
        />
        <ModalBtnBox>
          <ModalBtn>신청하기</ModalBtn>
          <ModalBtn>오픈채팅가기</ModalBtn>
        </ModalBtnBox>
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

const ModalIsLive = styled.div`
  background-color: red;
  border-radius: 20px;
  font-size: small;
  color: white;
  height: 20px;
  padding: 2px 15px;
`;

const ModalPeopleBox = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: 25px;
`;

const ModalPeopleCount = styled.p`
  font-size: small;
`;

const ModalPeopleIcon = styled(BsFillPeopleFill)`
  padding-left: 8px;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 360px;
  max-width: 400px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalTitle = styled.h2`
  font-weight: bold;
`;

const ModalContent = styled.p`
  width: 70%;
  font-size: small;
  word-wrap: break-word;
  margin: 0;
`;

const ModalTag = styled.div`
  margin: 0;
  display: flex;
  margin-left: 7%;
`;

const ModalText = styled.span`
  font-size: x-small;
  padding: 5px;
`;

const ModalPassword = styled.input`
  padding: 5px;
  padding-left: 10px;
  border-radius: 5px;
  width: calc(100% - 40px);
  margin: 20px;
  box-sizing: border-box;
`;

const ModalBtnBox = styled.div`
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 20px;
`;

const ModalBtn = styled.button`
  display: flex;
  width: 110px;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;
