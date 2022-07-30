import styled from 'styled-components';
import BottomBar from 'src/components/BottomBar';
import { SetBackGround } from 'src/components/Styled';
import { PRIMARY, RATIO } from 'src/constants';
import icoArrowNext from 'src/assets/icons/icoArrowNext.svg';
import { useCallback, useState } from 'react';
import { useMutation } from 'react-query';
import { ResigiterOutApi } from 'src/api/mypage';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import ProfileImg from './ProfileImg';

export default function Setting() {
  const [isEdit, setIsEdit] = useState(false);
  const nav = useNavigate();
  const handleLogoutClick = () => {
    localStorage.clear();
    window.location.replace('/');
  };

  const onEditableChange = useCallback((e: boolean) => {
    setIsEdit(e);
  }, []);

  const RegisterOutClick = () => {
    const token = localStorage.getItem('token');
    const base64Payload = token ? token.split('.')[1] : '';
    const payload = Buffer.from(base64Payload, 'base64');
    const userId = JSON.parse(payload.toString());
    Deleteuserdata.mutate(userId);
  };

  const Deleteuserdata = useMutation(
    (userid: string) => ResigiterOutApi(userid),
    {
      onSuccess: () => {
        nav(`/`);
      },
    },
  );

  return (
    <SetBackGround>
      <Background>
        <Title>환경설정</Title>
        <Container>
          <ProfileImg isEdit={isEdit} onEditableChange={onEditableChange} />
          <Row>
            <MenuText>닉네임</MenuText>
            <MenuText>요리가도 저리가도</MenuText>
          </Row>
          <BorderLine />
          <Row>
            <MenuText>이메일</MenuText>
            <MenuText>asdfasdf@naver.com</MenuText>
          </Row>
        </Container>
        <Container>
          <Row>
            <MenuText>공지사항</MenuText>
            <img src={icoArrowNext} alt="" style={{ width: 22, height: 24 }} />
          </Row>
          <BorderLine />
          <Row>
            <MenuText>문의하기</MenuText>
            <img src={icoArrowNext} alt="" style={{ width: 22, height: 24 }} />
          </Row>
        </Container>
        <LogoutButton onClick={handleLogoutClick}>로그아웃</LogoutButton>
        <KakaoUnlink onClick={RegisterOutClick}>회원탈퇴</KakaoUnlink>
        <VersionInfo>현재 버전 9.8.7</VersionInfo>
      </Background>
      <BottomBar currentPage="Setting" />
    </SetBackGround>
  );
}

const Background = styled.div`
  display: flex;
  flex-direction: column;
  width: ${window.innerWidth}px;
  height: ${836 * RATIO}px;
  max-width: 428px;
  max-height: 836px;
  padding: 30px 20px;
  background-color: ${PRIMARY};
`;
const Title = styled.div`
  display: flex;
  font-size: 26px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 19px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 15px;
  margin-bottom: 20px;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 17px 24px;
  cursor: pointer;
`;
const BorderLine = styled.div`
  display: flex;
  height: 1px;
  border-bottom: 1px solid #ebebeb;
`;
const MenuText = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: black;
`;
const LogoutButton = styled.div`
  display: flex;
  padding: 17px 24px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.17);
  font-size: 17px;
  font-weight: 500;
  color: black;
  margin-bottom: 20px;
  cursor: pointer;
`;
const KakaoUnlink = styled.div`
  align-self: center;
  padding: 5px 10px;
  font-size: 17px;
  font-weight: 500;
  color: #b15e2f;
  margin-bottom: 37px;
  cursor: pointer;
`;

const VersionInfo = styled.div`
  align-self: center;
  font-size: 14px;
  font-weight: 500;
  color: #ca713f;
`;
