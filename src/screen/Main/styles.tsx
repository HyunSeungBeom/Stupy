import styled from 'styled-components';
import { RATIO, PRIMARY, BACKGROUND_GRAY } from 'src/constants';

export const SetBackGround = styled.div`
  justify-content: center;
  align-items: center;
`;

export const TopContainer = styled.div`
  width: ${window.innerWidth}*${RATIO}px;
  background-color: ${PRIMARY};
  max-width: 500px;
  padding-top: 30px;
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 15px;
`;

export const Welcome = styled.p`
  font-size: 18px;
  font-weight: 600;
  color: white;
  /* background-color: gray; */
`;
export const Date = styled.p`
  font-size: 30px;
  font-weight: 600;
  color: white;
  /* background-color: gray; */
`;
export const BodyContainer = styled.div`
  width: ${window.innerWidth}*${RATIO}px;
  max-width: 500px;
  padding: 22px 20px;
  background-color: ${BACKGROUND_GRAY};
`;
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius: 10px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 14px;
`;
export const Title = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: ${PRIMARY};
`;
export const GroupImgContainer = styled.div`
  background: gray;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  height: 138px;
  overflow: hidden;
`;
export const GroupNameContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 58px;
  justify-content: space-between;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 14px;
`;

export const GroupName = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: black;
  margin-right: 8px;
  margin-top: 10px;
`;

export const MemberCount = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: rgba(80, 80, 80, 0.69);
  margin-top: 12px;
`;

export const PlusBetween = styled.div`
  display: flex;
`;

export const TodoListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
