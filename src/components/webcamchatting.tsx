// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';
import { SetBackGround } from 'src/components/Styled';
import WebCam from 'src/components/WebRtc/WebCam';
import { RATIO } from 'src/constants';
import styled from 'styled-components';
import { ReactComponent as RankingButton } from 'src/assets/icons/webrtcroom/ranking.svg';
import RankingModal from 'src/components/RankingModal';
import { Socket } from 'socket.io-client';
import { useQuery } from 'react-query';
import { roomTitleApi } from 'src/api/webcam';

function Webcamchatting({ socket }: { socket: Socket }) {
  const param = useParams();
  const paramid = param.id;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [roomOwner, setRoomOwner] = useState<boolean>();
  const nav = useNavigate();

  const { isSuccess, data } = useQuery('roomTitle', () =>
    roomTitleApi(paramid),
  );

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  const backClick = () => {
    nav(-1);
  };

  socket.on('all_users', (datatoclient) => {
    setRoomOwner(datatoclient.roomOwner);
  });

  return (
    <div
      style={{
        overflowY: 'hidden',
        height: '100vh',
        width: `${428 * RATIO}`,
        maxWidth: '460px',
      }}
    >
      <SetBackGround>
        <WebScreen>
          <UpperMenu>
            <Block onClick={backClick}>
              <BackIcon />
            </Block>
            <Block2>{isSuccess && <RoomTitle> {data.data} </RoomTitle>}</Block2>
            <RankButton onClick={handleModalOpen}>
              랭킹 <RankingButton />
            </RankButton>
          </UpperMenu>
          <WebCambox>
            {paramid && (
              <WebCam isparam={paramid} socket={socket} roomOwner={roomOwner} />
            )}
          </WebCambox>
        </WebScreen>
      </SetBackGround>
      {modalOpen && <RankingModal modal={setModalOpen} socket={socket} />}
    </div>
  );
}

export default Webcamchatting;

const WebScreen = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #e5e5e5;
  overflow: hidden;
  width: ${428 * RATIO}px;
  height: 100vh;
  max-width: 428px;
`;

const UpperMenu = styled.div`
  width: ${428 * RATIO}px;
  max-width: 428px;
  display: flex;
  position: fixed;
  padding-left: ${7 * RATIO}px;
  padding-top: ${7 * RATIO}px;
  z-index: 9;
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
  width: ${428 * RATIO}px;
  max-width: 428px;
  display: flex;
  flex-wrap: wrap;
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
  padding-left: 8px;
`;
