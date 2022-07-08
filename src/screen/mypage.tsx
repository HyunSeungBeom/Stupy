import styled from 'styled-components';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import BottomBar from '../components/BottomBar';

function Mypage() {
  const LogoutClick = () => {
    localStorage.clear();
    window.location.replace('/login');
  };
  return (
    <Background>
      <ProfileMenu>
        <LogoutMenu onClick={LogoutClick}>
          로그아웃
          <FiLogOut />
        </LogoutMenu>
        <ProfileImg>
          <ProfileRevise />
        </ProfileImg>
        <InputBox>
          <div>
            닉네임 :<NicknameInput />
          </div>
          <div>
            이메일 :<EmailInput />
          </div>
        </InputBox>
      </ProfileMenu>
      <SettingMenu>
        <SettingBox>문의하기</SettingBox>
        <SettingBox>공지사항</SettingBox>
        <SettingBox>설정</SettingBox>
        <Withdrawal>회원탈퇴</Withdrawal>
      </SettingMenu>
      <BottomBar />
    </Background>
  );
}

export default Mypage;

const Background = styled.div`
  padding-top: 40px;
`;

const ProfileMenu = styled.div`
  width: 70%;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  display: flex;
`;

const LogoutMenu = styled.div`
  position: absolute;
  font-size: 20px;
  right: -40px;
`;

const ProfileImg = styled.div`
  min-width: 80px;
  margin-top: 30px;
  border-radius: 80px;
  background-color: gray;
  width: 80px;
  height: 80px;
  border: 1px solid black;
  position: relative;
`;

const ProfileRevise = styled.div`
  border-radius: 30px;
  width: 30px;
  height: 30px;
  background: green;
  position: absolute;
  bottom: 0;
  right: -5px;
`;

const InputBox = styled.div`
  display: grid;
  margin-left: 20px;
  margin-top: 35px;
`;

const NicknameInput = styled.input`
  padding: 5px;
  padding-left: 10px;
  border-radius: 5px;
  margin-left: 10px;
  box-sizing: border-box;
`;

const EmailInput = styled.input`
  padding: 5px;
  padding-left: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  margin-left: 10px;
`;

const SettingMenu = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
`;

const SettingBox = styled.div`
  font-size: 20px;
  padding-left: 10px;
  display: flex;
  margin-top: 20px;
  font-weight: bold;
  background-color: gray;
  height: 86px;
  align-items: center;
`;

const Withdrawal = styled.div`
  font-size: 20px;
  padding-left: 10px;
  display: flex;
  margin-top: 100px;
  font-weight: bold;
  background-color: gray;
  height: 86px;
  align-items: center;
`;
