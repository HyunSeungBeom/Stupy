import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function BottomBar() {
  const nav = useNavigate();
  const MainClick = () => {
    nav('/');
  };
  const ListClick = () => {
    nav('/list');
  };
  const MypageClick = () => {
    nav('/mypage');
  };

  return (
    <BottomBox>
      <BottomBetween>
        <BottomNav onClick={MainClick}> 메인 </BottomNav>
        <BottomNav onClick={ListClick}> 리스트 </BottomNav>
        <BottomNav onClick={MypageClick}> 마이페이지 </BottomNav>
      </BottomBetween>
    </BottomBox>
  );
}
export default BottomBar;

const BottomBox = styled.div`
  width: 500px * (500px / 428px);
  height: 60px;
  color: white;
  font-size: 20px;
  font-weight: bold;
  background-color: orange;
  display: flex;
  position: sticky;
  bottom: 0px;

  overflow: hidden;
  float: right;
  z-index: 999;
`;

const BottomBetween = styled.div`
  padding: 0px 60px 0px 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BottomNav = styled.div`
  height: 30px;
`;
