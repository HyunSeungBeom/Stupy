import styled from 'styled-components';
import icoPlusPrimary from 'src/assets/icons/main/icoPlusPrimary.svg';
import { PRIMARY, RATIO } from 'src/constants';
import { useNavigate } from 'react-router-dom';

export default function EmptyGroup() {
  const nav = useNavigate();
  const handleEmptyContainerClick = () => {
    nav('/list');
  };
  return (
    <EmptyContainer onClick={handleEmptyContainerClick}>
      <img
        src={icoPlusPrimary}
        alt=""
        style={{ width: 32, height: 32, marginBottom: 16 }}
      />
      그룹 참여하기
    </EmptyContainer>
  );
}

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${196 * RATIO}px;
  max-height: 196px;
  padding: 26px 20px 20px;
  margin: 0px 20px 18px;
  border-radius: 10px;
  border: 2px dashed #afafaf;
  background-color: #fafafa;
  font-size: 18;
  color: ${PRIMARY};
  cursor: pointer;
`;
