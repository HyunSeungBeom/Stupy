import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import BottomBar from 'src/components/BottomBar';
import TodoList from 'src/screen/Main/TodoList';
import icoPlus from 'src/assets/icons/main/icoPlus.svg';
import styled from 'styled-components';
import {
  SetBackGround,
  TopContainer,
  BodyContainer,
  TitleContainer,
  Title,
} from 'src/components/Styled';
import { PRIMARY } from 'src/constants';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useQuery } from 'react-query';
import { getTodolist } from 'src/api/todolist';
import MyGroup from './MyGroup';

moment.locale('ko');

export default function Main() {
  const [swiperIdx, setSwiperIdx] = useState(0);
  const [params] = useSearchParams();
  // console.log(params.get('token'));

  const { data: todolistData } = useQuery(['todolistData'], getTodolist);
  // eslint-disable-next-line no-console
  console.log('>>>>', todolistData);

  useEffect(() => {
    const kakaotoken = params.get('token');
    if (kakaotoken != null) {
      localStorage.clear();
      localStorage.setItem('token', kakaotoken);
      window.location.replace('/main');
    }
  }, []);

  return (
    <SetBackGround>
      <TopContainer>
        <DayOfWeek>{moment().format('dddd')}</DayOfWeek>
        <Date>{moment().format('M월 D일')}</Date>
      </TopContainer>
      <BodyContainer style={{ backgroundColor: 'white' }}>
        <TitleContainer>
          <Title>GROUP</Title>
        </TitleContainer>
        <Swiper
          style={{
            paddingBottom: 27,
          }}
          spaceBetween={1}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSlideChange={(e) => setSwiperIdx(e.snapIndex)}
          // onSwiper={(swiper) => console.log(swiper.el)}
        >
          {MOCK_UP_GROUP.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <MyGroup
                  id={item.id.toString()}
                  isMaster={item.is_master}
                  title={item.title}
                  desc={item.description}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
        <SwiperDotContainer>
          {MOCK_UP_GROUP.map((item, index) => {
            return (
              <div
                key={item.id}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: index === swiperIdx ? PRIMARY : '#d9d9d9',
                }}
              />
            );
          })}
        </SwiperDotContainer>
        <Divider />
        <TitleContainer>
          <Title>TO DO LIST</Title>
          <AddButton>
            카테고리 추가
            <PlusIcon src={icoPlus} alt="" />
          </AddButton>
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
  );
}

const DayOfWeek = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: white;
`;
const Date = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: white;
`;
const Divider = styled.div`
  display: flex;
  height: 10px;
  background-color: #f4f4f4;
  margin-bottom: 18px;
`;
const AddButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${PRIMARY};
  font-weight: 500;
  cursor: pointer;
`;
const PlusIcon = styled.img`
  width: 24px;
  height: 24px;
`;
const SwiperDotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-bottom: 18px;
`;

const MOCK_UP_DATA = [
  {
    id: 1,
    subject: '제목 없음',
    to_do_list_item: [{ id: 1, content: '할 일 적어보기', is_done: false }],
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

const MOCK_UP_GROUP = [
  {
    id: 1,
    is_master: true,
    title: 'GROUP_NAME_A',
    description: '함께 영어 공부 하실분, 꾸준히 오래 하실분만 들어와 주세요!!',
    current_member: 2,
    max_member: 4,
    hashtag: ['TOEIC', 'TOEFL', '영어회화'],
    rank: 1,
  },
  {
    id: 2,
    is_master: false,
    title: 'GROUP_NAME_B',
    description: '어쩌구 저쩌구 블라블라 이러쿵 저러쿵 솰라솰라 잉잉잉',
    current_member: 1,
    max_member: 4,
    hashtag: ['해시태그는', '최대여섯글자'],
    rank: 2,
  },
  {
    id: 3,
    is_master: true,
    title: 'GROUP_NAME_C',
    description: '어쩌구 저쩌구 블라블라 이러쿵 저러쿵 솰라솰라 잉잉잉',
    current_member: 2,
    max_member: 2,
    hashtag: ['해시태그는', '최대여섯글자'],
  },
];
