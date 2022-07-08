import { userInfo } from 'os';
import { BiArrowBack, BiUser } from 'react-icons/bi';
import styled from 'styled-components';
import Chatting from '../components/Chatting';
import WebCam from '../components/WebRtc/WebCam';

function Webcamchatting() {
  console.log('hi');
  return (
    <div>
      <WebScreen>
        <UpperMenu>
          <Block>
            <BackIcon />
          </Block>
          <Block2>
            <RoomTitle>디자이너 스터디 </RoomTitle>
          </Block2>
        </UpperMenu>
        <WebCam />
      </WebScreen>
    </div>
  );
}

export default Webcamchatting;

const UpperMenu = styled.div`
  width: 100%;
  display: flex;
  position: fixed;
  padding-left: 7%;
  padding-top: 3%;
`;

const RoomTitle = styled.div`
  font-size: 20px;
`;

const BackIcon = styled(BiArrowBack)`
  font-size: 20px;
  margin-top: 5px;
`;

const WebScreen = styled.div`
  width: 100%;
  height: 100vh;
  background-color: yellow;
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
