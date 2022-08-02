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
import btnEnter from 'src/assets/icons/main/btnEnter.svg';

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

  // function rankSplit() {
  //   if (rank === 1) return '| 누적시간 1위';
  //   if (rank === 2) return '| 누적시간 2위';
  //   if (rank === 3) return '| 누적시간 3위';
  //   return undefined;
  // }

  return (
    <>
      <Container
        onClick={handleModalOpen}
        style={{
          background: image ? `url(${image})` : `url(${imgSample})`,
          backgroundSize: 'cover',
        }}
      >
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
        <div>
          {/* <img
            src={isOn ? icoOn : icoOff}
            alt=""
            style={{
              width: 63,
              height: 26,
              marginBottom: 10,
            }}
          /> */}
          {/* {hashtag.map((item) => {
          return `#${item} `;
        })} */}
          <GroupNameRow>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <GroupName>{title}</GroupName>
              {/* {!!rank && (
              <>
                <Divider />
                <Times>누적시간 </Times>
                <RankText>{rankSplit()}</RankText>
              </>
            )} */}
            </div>
          </GroupNameRow>
          {desc}
        </div>
        <EnterBtn src={btnEnter} alt="" />
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
  height: ${196 * RATIO}px;
  max-height: 196px;
  flex-direction: column;
  justify-content: space-between;
  background-color: gray;
  font-size: 16px;
  font-weight: 500;
  line-height: 21px;
  color: white;
  border-radius: 10px;
  overflow: hidden;
  margin: 0px 20px;
  padding: 26px 18px 20px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.17);
  cursor: pointer;
  position: relative;
`;

const GroupNameRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const GroupName = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-right: 8px;
`;
const Divider = styled.div`
  width: 2px;
  height: 20px;
  background-color: white;
  margin-left: 10px;
  margin-right: 10px;
`;
const Times = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: white;
`;
const RankText = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #ff9052;
`;
const EnterBtn = styled.img`
  width: 83px;
  height: 24px;
  align-self: flex-end;
  cursor: pointer;
`;
