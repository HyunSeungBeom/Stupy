// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { userInfo } from 'os';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BiArrowBack, BiUser } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import Chatting from 'src/components/Chat/Chatting';
import { SetBackGround } from 'src/components/Styled';
import { RATIO } from 'src/constants';
import styled from 'styled-components';

import WebCam from '../components/WebRtc/WebCam';

function Webcamchatting() {
  // const location = useLocation();
  const param = useParams();
  const paramid = param.id;
  // const state = location.state as { roomId: string };
  // eslint-disable-next-line no-console
  // console.log(state.roomId);

  return (
    <SetBackGround>
      <WebScreen>
        <UpperMenu>
          <Block>
            <BackIcon />
          </Block>
          <Block2>
            <RoomTitle>디자이너 스터디 </RoomTitle>
          </Block2>
        </UpperMenu>
        <WebCambox>{paramid && <WebCam isparam={paramid} />}</WebCambox>
        <ChattingMenu>
          <ChattingBox />
          <Chatting />
        </ChattingMenu>
      </WebScreen>
    </SetBackGround>
  );
}

export default Webcamchatting;

const WebScreen = styled.div`
  display: flex;
  overflow: hidden;
  height: 100vh;
  width: ${460 * RATIO}px;
  max-width: 460px;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
`;

const UpperMenu = styled.div`
  width: ${460 * RATIO}px;
  max-width: 460px;
  display: flex;
  position: fixed;
  padding-left: ${3 * RATIO}px;
  padding-top: ${7 * RATIO}px;
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
  width: 20%;
  max-width: 21%;
  background-color: gray;
  color: white;
  box-shadow: 1px 1px 1px 1px gray;
`;

const Block2 = styled.div`
  margin-left: 5%;
  width: 73%;
  padding-left: 4%;
  box-shadow: 1px 1px 1px 1px gray;
  background-color: gray;
  color: white;
`;

const WebCambox = styled.div`
  width: ${460 * RATIO}px;
  display: flex;
`;

const ChattingMenu = styled.div``;

const ChattingBox = styled.div``;
