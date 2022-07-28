// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BiArrowBack, BiUser } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { SetBackGround } from 'src/components/Styled';
import WebCam from 'src/components/WebRtc/WebCam';
import { RATIO } from 'src/constants';
import styled from 'styled-components';
import { ReactComponent as RankingButton } from 'src/assets/icons/webrtcroom/ranking.svg';
import RankingModal from 'src/components/RankingModal';
import { Socket } from 'socket.io-client';

function Webcamchatting({ socket }: { socket: Socket }) {
  const param = useParams();
  const paramid = param.id;
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const backClick = () => {
    nav(-1);
  };
  const nav = useNavigate();

  return (
    <>
      <SetBackGround>
        <WebScreen>
          <UpperMenu>
            <Block onClick={backClick}>
              <BackIcon />
            </Block>
            <Block2>
              <RoomTitle>디자이너 스터디 </RoomTitle>
            </Block2>
            <RankButton onClick={handleModalOpen}>
              랭킹 <RankingButton />
            </RankButton>
          </UpperMenu>
          <WebCambox>
            {paramid && <WebCam isparam={paramid} socket={socket} />}
          </WebCambox>
        </WebScreen>
      </SetBackGround>
      {modalOpen && <RankingModal modal={setModalOpen} socket={socket} />}
    </>
  );
}

export default Webcamchatting;

const WebScreen = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: #e5e5e5;
  height: 800px;
  width: ${460 * RATIO}px;
  max-width: 460px;
  overflow: hidden;
`;

const UpperMenu = styled.div`
  width: ${460 * RATIO}px;
  max-width: 460px;
  display: flex;
  position: fixed;
  padding-left: ${3 * RATIO}px;
  padding-top: ${7 * RATIO}px;
  z-index: 90;
`;

const RoomTitle = styled.div`
  font-size: 20px;
`;

const BackIcon = styled(BiArrowBack)`
  font-size: 20px;
  margin-top: 5px;
`;

const Block = styled.div`
  align-items: center;
  text-align: center;
  width: 24px;
  max-width: 24px;
  color: white;
  cursor: pointer;
`;

const Block2 = styled.div`
  margin-left: 5%;
  width: 300px;
  height: 25px;
  padding-left: 4%;
  color: white;
`;

const WebCambox = styled.div`
  max-width: 460px;
  display: flex;
`;

const RankButton = styled.div`
  margin-left: 10px;
  margin-right: 10px;
  height: 40px;
  border-radius: 5px;
  width: 82px;
  text-align: center;
  align-items: center;
  color: white;
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  background: rgba(87, 87, 87, 0.55);
  gap: 4px;
  padding-left: 10px;
`;
