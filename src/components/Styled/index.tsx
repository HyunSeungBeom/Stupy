import styled from 'styled-components';
import { RATIO, PRIMARY } from 'src/constants';

const SetBackGround = styled.div`
  justify-content: center;
  align-items: center;
  /* height: ${1009 * RATIO}px;
  max-height: 1009px; */
  box-shadow: 10px 20px 30px 5px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  margin: 45px 0px 45px;
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
  padding: 20px 0px 90px;
  position: relative;
  overflow: scroll;
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
