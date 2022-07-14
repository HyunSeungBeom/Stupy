import styled from 'styled-components';
import { RATIO, PRIMARY } from 'src/constants';

const SetBackGround = styled.div`
  justify-content: center;
  align-items: center;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${window.innerWidth}px;
  height: ${100 * RATIO}px;
  max-width: 428px;
  max-height: 100px;
  padding-right: 25px;
  padding-left: 25px;
  background-color: ${PRIMARY};
  justify-content: center;
`;

const BodyContainer = styled.div`
  width: ${window.innerWidth}px;
  max-width: 428px;
  padding: 22px 20px;
  background-color: #efefef;
`;

const TitleContainer = styled.div`
  display: flex;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 14px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: ${PRIMARY};
`;

export { SetBackGround, TopContainer, BodyContainer, TitleContainer, Title };
