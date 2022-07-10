import styled from 'styled-components';
import { RATIO, PRIMARY } from 'src/constants';

const SetBackGround = styled.div`
  justify-content: center;
  align-items: center;
`;

const TopContainer = styled.div`
  width: ${window.innerWidth * RATIO}px;
  max-width: 500px;
  background-color: ${PRIMARY};
  padding-top: 30px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 15px;
`;

const BodyContainer = styled.div`
  width: ${window.innerWidth * RATIO}px;
  max-width: 500px;
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
