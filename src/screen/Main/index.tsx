import { FaPlusCircle } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import BottomBar from 'src/components/BottomBar';
import TodoList from 'src/screen/Main/TodoList';
import icoArrowDown from 'src/assets/icons/icoArrowDown.svg';
import icoMaster from 'src/assets/icons/main/icoMaster.svg';
import {
  Date,
  GroupImgContainer,
  BodyContainer,
  SetBackGround,
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
        backgroundColor: 'gray',
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
            <div>
              참가 그룹{' '}
              <span>
                <img
                  src={icoArrowDown}
                  alt=""
                  style={{ width: 22, height: 24 }}
                />
              </span>
            </div>
          </TitleContainer>
          <GroupImgContainer>
            <img src={undefined} alt="" />
          </GroupImgContainer>
          <GroupNameContainer>
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
          {MOCK_UP_DATA.map((item) => {
            return (
              <TodoList
                key={item.id}
                subject={item.subject}
                item={item.to_do_list_item}
              />
            );
          })}
        </BodyContainer>
        <BottomBar currentPage="Main" />
      </SetBackGround>
    </div>
  );
}

const MOCK_UP_DATA = [
  {
    id: 1,
    subject: 'TO_DO_LIST_TITLE_A',
    to_do_list_item: [
      { id: 1, content: 'TO DO ITEM 1', is_done: true },
      { id: 2, content: 'TO DO ITEM 2', is_done: true },
      { id: 3, content: 'TO DO ITEM 3', is_done: true },
      { id: 4, content: 'TO DO ITEM 4', is_done: false },
    ],
  },
  {
    id: 2,
    subject: 'TO_DO_LIST_TITLE_B',
    to_do_list_item: [
      { id: 1, content: 'TO DO ITEM 1', is_done: true },
      { id: 2, content: 'TO DO ITEM 2', is_done: true },
      { id: 3, content: 'TO DO ITEM 3', is_done: true },
      { id: 4, content: 'TO DO ITEM 4', is_done: false },
    ],
  },
  {
    id: 3,
    subject: 'TO_DO_LIST_TITLE_C',
    to_do_list_item: [
      { id: 1, content: 'TO DO ITEM 1', is_done: true },
      { id: 2, content: 'TO DO ITEM 2', is_done: true },
      { id: 3, content: 'TO DO ITEM 3', is_done: true },
      { id: 4, content: 'TO DO ITEM 4', is_done: false },
    ],
  },
];
