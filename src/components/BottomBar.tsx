import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import icoList from 'src/assets/icons/bottomTab/icoList.svg';
import icoListOn from 'src/assets/icons/bottomTab/icoListOn.svg';
import icoMain from 'src/assets/icons/bottomTab/icoMain.svg';
import icoMainOn from 'src/assets/icons/bottomTab/icoMainOn.svg';
import icoSetting from 'src/assets/icons/bottomTab/icoSetting.svg';
import icoSettingOn from 'src/assets/icons/bottomTab/icoSettingOn.svg';
import { CreateButton } from './Button';

type Props = {
  currentPage: 'List' | 'Main' | 'Setting';
};

export default function BottomBar({ currentPage }: Props) {
  const nav = useNavigate();
  const MainClick = () => {
    nav('/main');
  };
  const ListClick = () => {
    nav('/list');
  };
  const SettingClick = () => {
    nav('/setting');
  };

  return (
    <BottomBox>
      {currentPage === 'List' && <CreateButton />}
      <BottomNav
        src={currentPage === 'List' ? icoListOn : icoList}
        alt=""
        onClick={ListClick}
      />
      <BottomNav
        src={currentPage === 'Main' ? icoMainOn : icoMain}
        alt=""
        onClick={MainClick}
      />
      <BottomNav
        src={currentPage === 'Setting' ? icoSettingOn : icoSetting}
        alt=""
        onClick={SettingClick}
      />
    </BottomBox>
  );
}

const BottomBox = styled.div`
  width: ${window.innerWidth}px;
  max-width: 428;
  height: 90px;
  display: flex;
  position: absolute;
  bottom: 0px;
  padding: 0px 60px 20px 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  float: center;
  z-index: 999;
  background-color: white;
  border-top: #f5f5f5 1px solid;
`;

const BottomNav = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`;
