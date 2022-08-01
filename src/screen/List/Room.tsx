import { useState } from 'react';
import { RATIO } from 'src/constants';
import styled from 'styled-components';
// import icoOn from 'src/assets/icons/icoOn.svg';
// import icoOff from 'src/assets/icons/icoOff.svg';
// import ico1st from 'src/assets/icons/ico1st.svg';
// import ico2nd from 'src/assets/icons/ico2nd.svg';
// import ico3rd from 'src/assets/icons/ico3rd.svg';
import icoCheckCircle from 'src/assets/icons/list/icoCheckCircle.svg';
import imgSample from 'src/assets/images/imgSample.png';
import OpenChetModal from 'src/components/OpenChetModal';

type Props = {
  // isOn: boolean;
  title: string;
  desc: string;
  currentMember: number;
  maxMember: number;
  hashtag: string[];
  // eslint-disable-next-line react/require-default-props
  // rank?: number;
  // eslint-disable-next-line react/require-default-props
  openKakao?: string;
  // eslint-disable-next-line react/require-default-props
  image?: string;
  roomId: string;
};

export default function RoomBox({
  // isOn,
  // rank,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openKakao,
  image,
  title,
  desc,
  currentMember,
  maxMember,
  hashtag,
  roomId,
}: Props) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleModalOpen = () => {
    if (currentMember < maxMember) setModalOpen(!modalOpen);
    // eslint-disable-next-line no-alert
    else alert('정원이 가득찬 그룹입니다.');
  };

  // function rankIcon() {
  //   if (rank === 1) return ico1st;
  //   if (rank === 2) return ico2nd;
  //   if (rank === 3) return ico3rd;
  //   return undefined;
  // }

  return (
    <>
      <Container onClick={handleModalOpen}>
        {currentMember === maxMember && (
          <MaxContainer>
            <img
              src={icoCheckCircle}
              alt=""
              style={{ width: 44, height: 44, marginBottom: 5 }}
            />
            인원 마감
          </MaxContainer>
        )}
        <ImgContainer
          style={{
            background: image ? `url(${image})` : `url(${imgSample})`,
            backgroundSize: 'cover',
          }}
        >
          {/* <img
            src={isOn ? icoOn : icoOff}
            alt=""
            style={{ width: 45, height: 22 }}
          /> */}
          {desc}
          <br />
          {hashtag.map((item) => {
            return `#${item} `;
          })}
        </ImgContainer>
        <GroupNameRow>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <GroupName>{title}</GroupName>
            <MemberCount>
              +{currentMember}/{maxMember}
            </MemberCount>
          </div>
          {/* {!!rank && (
            <img src={rankIcon()} alt="" style={{ width: 34, height: 46 }} />
          )} */}
        </GroupNameRow>
      </Container>
      {modalOpen && (
        <OpenChetModal
          modal={setModalOpen}
          image={image}
          title={title}
          desc={desc}
          hashtag={hashtag}
          openkakao={openKakao}
          roomId={roomId}
        />
      )}
    </>
  );
}

const MaxContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 24;
  font-weight: 600;
  color: white;
  background-color: rgba(70, 70, 70, 0.76);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.17);
  cursor: pointer;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  margin: 0px 20px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.17);
  cursor: pointer;
  position: relative;
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
