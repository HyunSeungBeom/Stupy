import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import icoList from 'src/assets/icons/bottomTab/icoList.svg';
import icoListOn from 'src/assets/icons/bottomTab/icoListOn.svg';
import icoMain from 'src/assets/icons/bottomTab/icoMain.svg';
import icoMainOn from 'src/assets/icons/bottomTab/icoMainOn.svg';
import icoSetting from 'src/assets/icons/bottomTab/icoSetting.svg';
import { RATIO } from '../constants';

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
      <BottomNav src={icoList} alt="" onClick={ListClick} />
      <BottomNav src={icoMain} alt="" onClick={MainClick} />
      <BottomNav src={icoSetting} alt="" onClick={MypageClick} />
    </BottomBox>
  );
}
export default BottomBar;

const BottomBox = styled.div`
  max-width: 500px;
  height: 90px;
  display: flex;
  position: sticky;
  bottom: 0px;
  padding: 0px 60px 20px 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: center;
  z-index: 999;
  background-color: lightblue;
`;

const BottomNav = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
