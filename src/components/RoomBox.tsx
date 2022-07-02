import { useState } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

import OpenChetModal from './OpenChetModal';

function RoomBox() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <ModalInner
        onClick={() => {
          modalClose();
        }}
      >
        <ModalHeader>
          <ModalIsLive>Live</ModalIsLive>
        </ModalHeader>
        <ModalTitle>영어회화모임</ModalTitle>
        <ModalContent>
          어 영어 어쩌고 저쩌고 할 사람 오세요 오픈카톡으로 연락먼저 주세요
          어쩌고
        </ModalContent>
        <ModalTag>
          <ModalText>#해시태그</ModalText>
          <ModalText>#해시태그</ModalText>
          <ModalPeopleCount>+3/4</ModalPeopleCount>
          <ModalPeopleIcon size={20} />
        </ModalTag>
      </ModalInner>
      {modalOpen && <OpenChetModal modal={setModalOpen} />}
    </>
  );
}

export default RoomBox;

const ModalIsLive = styled.div`
  background-color: red;
  border-radius: 20px;
  font-size: small;
  color: white;
  height: 20px;
  padding: 2px 15px;
`;

const ModalPeopleCount = styled.p`
  font-size: small;
`;

const ModalPeopleIcon = styled(BsFillPeopleFill)`
  padding-left: 8px;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 360px;
  max-width: 400px;

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
