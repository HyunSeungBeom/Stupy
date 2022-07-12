import styled from 'styled-components';
import { RiEqualizerLine } from 'react-icons/ri';
import {
  SetBackGround,
  TopContainer,
  BodyContainer,
  TitleContainer,
  Title,
} from 'src/components/Styled';
import BottomBar from 'src/components/BottomBar';
import Room from './Room';
import SearchBox from './SerchBox';

function List() {
  return (
    <SetBackGround>
      <TopContainer>
        <SearchBoxBackGround>
          <SearchBox />
        </SearchBoxBackGround>
      </TopContainer>
      <BodyContainer>
        <TitleContainer>
          <Title>전체</Title>
          <RiEqualizerLine />
        </TitleContainer>
        <RoomListContainer>
          {MOCK_UP_DATA.map((item) => {
            return (
              <Room
                key={item.id}
                isOn={item.is_on}
                title={item.title}
                desc={item.description}
                currentMember={item.current_member}
                maxMember={item.max_member}
                hashtag={item.hashtag}
                rank={item.rank}
              />
            );
          })}
        </RoomListContainer>
      </BodyContainer>
      <BottomBar currentPage="List" />
    </SetBackGround>
  );
}

export default List;

const SearchBoxBackGround = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const RoomListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const MOCK_UP_DATA = [
  {
    id: 1,
    is_on: true,
    title: 'GROUP_NAME_A',
    description: '함께 영어 공부 하실분, 꾸준히 오래 하실분만 들어와 주세요!!',
    current_member: 2,
    max_member: 4,
    hashtag: ['TOEIC', 'TOEFL', '영어회화'],
    rank: 1,
  },
  {
    id: 2,
    is_on: true,
    title: 'GROUP_NAME_B',
    description: '어쩌구 저쩌구 블라블라 이러쿵 저러쿵 솰라솰라 잉잉잉',
    current_member: 1,
    max_member: 4,
    hashtag: ['해시태그는', '최대여섯글자'],
    rank: 2,
  },
  {
    id: 3,
    is_on: true,
    title: 'GROUP_NAME_C',
    description: '어쩌구 저쩌구 블라블라 이러쿵 저러쿵 솰라솰라 잉잉잉',
    current_member: 2,
    max_member: 2,
    hashtag: ['해시태그는', '최대여섯글자'],
  },
  {
    id: 4,
    is_on: false,
    title: 'GROUP_NAME_D',
    description: '어쩌구 저쩌구 블라블라 이러쿵 저러쿵 솰라솰라 잉잉잉',
    current_member: 0,
    max_member: 4,
    hashtag: ['해시태그는', '최대여섯글자'],
  },
  {
    id: 5,
    is_on: true,
    title: 'GROUP_NAME_E',
    description: '어쩌구 저쩌구 블라블라 이러쿵 저러쿵 솰라솰라 잉잉잉',
    current_member: 2,
    max_member: 3,
    hashtag: ['해시태그는', '최대여섯글자'],
    rank: 3,
  },
  {
    id: 6,
    is_on: true,
    title: 'GROUP_NAME_F',
    description: '어쩌구 저쩌구 블라블라 이러쿵 저러쿵 솰라솰라 잉잉잉',
    current_member: 3,
    max_member: 4,
    hashtag: ['해시태그는', '최대여섯글자'],
  },
];
