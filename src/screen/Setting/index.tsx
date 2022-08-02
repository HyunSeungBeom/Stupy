import styled from 'styled-components';
import BottomBar from 'src/components/BottomBar';
import { SetBackGround } from 'src/components/Styled';
import { PRIMARY, RATIO } from 'src/constants';
import icoArrowNext from 'src/assets/icons/icoArrowNext.svg';
import { useCallback, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { ResigiterOutApi } from 'src/api/mypage';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { getUsers } from 'src/api/users';
import ProfileImg from './ProfileImg';

export default function Setting() {
  const [isEdit, setIsEdit] = useState(false);
  const [userNick, setUserNick] = useState('');
  const [editUserNick, setEditUserNick] = useState('');
  const [email, setEmail] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const nav = useNavigate();

  const { data: userInfo } = useQuery(['userInfo'], getUsers, {
    onSuccess: (res) => {
      setUserNick(res.userNick);
      setEditUserNick(res.userNick);
      setEmail(res.email);
      setEditEmail(res.email);
    },
  });

  const onEditableChange = useCallback((e: boolean) => {
    setIsEdit(e);
  }, []);
  const onChangeUserNickInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUserNick(e.target.value);
  };
  const onChangeEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditEmail(e.target.value);
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    window.location.replace('/');
  };

  const RegisterOutClick = () => {
    const token = localStorage.getItem('token');
    const base64Payload = token ? token.split('.')[1] : '';
    const payload = Buffer.from(base64Payload, 'base64');
    const userId = JSON.parse(payload.toString());
    Deleteuserdata.mutate(userId.userId);
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
      <Title>환경설정</Title>
      <Background>
        <Container>
          <ProfileImg
            isEdit={isEdit}
            onEditableChange={onEditableChange}
            imageProp={userInfo?.profileImage}
            userNickProp={editUserNick}
            emailProp={editEmail}
          />
          <Row>
            <MenuText>닉네임</MenuText>
            {isEdit ? (
              <ProfileInput
                value={editUserNick}
                onChange={onChangeUserNickInput}
              />
            ) : (
              <MenuText>{userNick}</MenuText>
            )}
          </Row>
          <BorderLine />
          <Row>
            <MenuText>이메일</MenuText>
            {isEdit ? (
              <ProfileInput value={editEmail} onChange={onChangeEmailInput} />
            ) : (
              <MenuText>{email}</MenuText>
            )}
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
  max-height: 745px;
  padding: 20px 20px 30px;
  background-color: #e5e5e5;
`;
const Title = styled.div`
  display: flex;
  font-size: 26px;
  font-weight: 600;
  color: #fff;
  padding: 30px 20px 24px;
  background-color: ${PRIMARY};
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
const ProfileInput = styled.input`
  font-size: 17px;
  font-weight: 500;
  color: black;
  border: none;
  :focus {
    outline: 1px solid ${PRIMARY};
  }
  text-align: end;
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
  color: #aaa;
  margin-bottom: 37px;
  cursor: pointer;
`;

const VersionInfo = styled.div`
  align-self: center;
  font-size: 14px;
  font-weight: 500;
  color: #b4b0af;
`;
