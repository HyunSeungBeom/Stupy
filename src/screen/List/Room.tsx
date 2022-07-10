import { useState } from 'react';
import { RATIO } from 'src/constants';
import styled from 'styled-components';
import icoSampleTag from 'src/assets/icons/icoSampleTag.svg';
import icoSampleFlag from 'src/assets/icons/icoSampleFlag.svg';
import imgSample from 'src/assets/images/imgSample.png';
import OpenChetModal from 'src/components/OpenChetModal';

export default function RoomBox() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <Container onClick={handleModalOpen}>
        <ImgContainer
          style={{ background: `url(${imgSample})`, backgroundSize: 'cover' }}
        >
          <img src={icoSampleTag} alt="" style={{ width: 45, height: 22 }} />
          함께 영어를 배우고자 하시는 분, 꾸준히 오래 하실분 들어와 주세요!!
          #최대6글자 #해시태그
        </ImgContainer>
        <GroupNameRow>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <GroupName>GROUP_NAME_A</GroupName>
            <MemberCount>+2/4</MemberCount>
          </div>
          <img src={icoSampleFlag} alt="" style={{ width: 34, height: 46 }} />
        </GroupNameRow>
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
  justify-content: space-between;
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
  justify-content: space-between;
  height: ${58 * RATIO}px;
  max-height: 58px;
  padding-left: 18px;
  padding-right: 18px;
`;

const GroupName = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-right: 8px;
`;

const MemberCount = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: rgba(80, 80, 80, 0.69);
`;
