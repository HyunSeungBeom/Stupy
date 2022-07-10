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

export { SetBackGround, TopContainer, BodyContainer };
