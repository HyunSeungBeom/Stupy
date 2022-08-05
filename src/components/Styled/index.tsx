import styled from 'styled-components';
import { RATIO, PRIMARY } from 'src/constants';

const SetBackGround = styled.div`
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${window.innerWidth}px;
  height: 100px;
  max-width: 428px;
  max-height: 100px;
  padding-right: 25px;
  padding-left: 25px;
  background-color: ${PRIMARY};
  justify-content: center;
`;

const BodyContainer = styled.div`
  width: ${window.innerWidth}px;
  height: ${828 * RATIO}px;
  max-width: 428px;
  max-height: 828px;
  background-color: white;
  padding: 20px 0px 180px;
  position: relative;
  overflow-y: auto; //스크롤바 없애기
  ::-webkit-scrollbar {
    display: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 20px 18px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #515151;
`;

export { SetBackGround, TopContainer, BodyContainer, TitleContainer, Title };
