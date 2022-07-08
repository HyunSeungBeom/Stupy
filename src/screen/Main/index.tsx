import { FaPlusCircle } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import BottomBar from 'src/components/BottomBar';
import TodoList from 'src/components/TodoList';
import icoArrowDown from 'src/assets/icons/icoArrowDown.svg';
import icoMaster from 'src/assets/icons/main/icoMaster.svg';
import {
  Date,
  GroupImgContainer,
  BodyContainer,
  SetBackGround,
  TodoListBox,
  TopContainer,
  Welcome,
  TitleContainer,
  Title,
  GroupNameContainer,
  GroupName,
  MemberCount,
} from './styles';

moment.locale('ko');

export default function Main() {
  const [params] = useSearchParams();
  // console.log(params.get('token'));

  useEffect(() => {
    const kakaotoken = params.get('token');
    if (kakaotoken != null) {
      localStorage.clear();
      localStorage.setItem('token', kakaotoken);
      window.location.replace('/');
    }
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <SetBackGround>
        <TopContainer>
          <Welcome>WELCOME, STUPY</Welcome>
          <Date>{moment().format('M월 D일 dddd')}</Date>
        </TopContainer>
        <BodyContainer>
          <TitleContainer>
            <Title>GROUP</Title>
            <p>
              참가 그룹{' '}
              <span>
                <img
                  src={icoArrowDown}
                  alt=""
                  style={{ width: 22, height: 24 }}
                />
              </span>
            </p>
          </TitleContainer>
          <GroupImgContainer>
            <img src={undefined} alt="" />
          </GroupImgContainer>
          <GroupNameContainer>
            <div style={{ display: 'flex' }}>
              <GroupName>스터디 그룹 이름</GroupName>
              <MemberCount>+0/4</MemberCount>
            </div>
            <img
              src={icoMaster}
              alt=""
              style={{ width: 62, height: 25, alignSelf: 'center' }}
            />
          </GroupNameContainer>
          <TitleContainer>
            <Title>TO DO LIST</Title>
          </TitleContainer>
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
        </BodyContainer>
        <BottomBar />
      </SetBackGround>
    </div>
  );
}
