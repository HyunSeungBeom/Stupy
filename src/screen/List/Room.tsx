import { useState } from 'react';
import { RATIO } from 'src/constants';
import styled from 'styled-components';
// import icoOn from 'src/assets/icons/icoOn.svg';
// import icoOff from 'src/assets/icons/icoOff.svg';
// import ico1st from 'src/assets/icons/ico1st.svg';
// import ico2nd from 'src/assets/icons/ico2nd.svg';
// import ico3rd from 'src/assets/icons/ico3rd.svg';
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
};

export default function RoomBox({
  // isOn,
  // rank,
  openKakao,
  image,
  title,
  desc,
  currentMember,
  maxMember,
  hashtag,
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
      {modalOpen && <OpenChetModal modal={setModalOpen} />}
    </>
  );
}

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
