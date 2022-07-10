import { useState } from 'react';
import { RATIO } from 'src/constants';
import styled from 'styled-components';
import icoSampleTag from 'src/assets/icons/icoSampleTag.svg';
import imgSample from 'src/assets/images/icoSample.png';
import OpenChetModal from 'src/components/OpenChetModal';

export default function RoomBox() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Container>
        <ImgContainer>어쩌구 저쩌구</ImgContainer>
        <GroupNameRow>GROUP_NAME_A</GroupNameRow>
      </Container>
      {modalOpen && <OpenChetModal modal={setModalOpen} />}
    </>
  );
}

const Container = styled.div`
  display: flex;
  width: ${460 * RATIO}px;
  max-width: 460px;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: gray;
  padding: 14px 18px;
  height: ${138 * RATIO}px;
  max-height: 140px;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: white;
`;

const GroupNameRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: 58px;
  padding-left: 18px;
  padding-right: 18px;
`;

// const;
