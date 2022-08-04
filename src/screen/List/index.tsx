import styled from 'styled-components';
import { RiEqualizerLine } from 'react-icons/ri';
import {
  SetBackGround,
  TopContainer,
  BodyContainer,
  // TitleContainer,
  Title,
} from 'src/components/Styled';
import BottomBar from 'src/components/BottomBar';
import { useCallback, useEffect, useState } from 'react';
import { PRIMARY, RATIO } from 'src/constants';
import { getRoom } from 'src/api/room';
import { useQuery } from 'react-query';
import { KickState } from 'src/recoil/state';
import { constSelector, useRecoilValue } from 'recoil';
import Room from './Room';
import SearchBox from './SerchBox';

function List() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filter, setFilter] = useState('전체');
  const [filterParams, setFilterParams] = useState<
    'latest' | 'open' | 'popularity' | undefined
  >();
  const [keywords, setKeywords] = useState<string>();
  const kickuser = useRecoilValue(KickState);

  useEffect(() => {
    if (filter === '전체') setFilterParams(undefined);
    else if (filter === '최신순') setFilterParams('latest');
    else if (filter === '인기순') setFilterParams('popularity');
    else if (filter === '모집중') setFilterParams('open');
  }, [filter]);

  useEffect(() => {
    if (kickuser === true) {
      // eslint-disable-next-line no-alert
      alert('당신은 방장에 의해 강퇴당하셨습니다.');
    }
  }, [kickuser]);

  const { data: rooms } = useQuery(['rooms', keywords, filterParams], () =>
    getRoom({ params: { text: keywords, sort: filterParams } }),
  );

  const handleDropdownPress = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const handleFilterChange = (selected: string) => {
    setFilter(selected);

    setDropdownVisible(false);
  };
  const onChangeSearchKeywords = useCallback((e: string | undefined) => {
    setKeywords(e);
  }, []);

  return (
    <SetBackGround>
      <TopContainer>
        <SearchBoxBackGround>
          <SearchBox onChangeSearchKeywords={onChangeSearchKeywords} />
        </SearchBoxBackGround>
      </TopContainer>
      <BodyContainer>
        <TitleContainer>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Title style={{ color: PRIMARY }}>{filter}</Title>
              <AlignBtn onClick={handleDropdownPress}>
                <RiEqualizerLine style={{ cursor: 'pointer' }} />
                정렬
              </AlignBtn>
            </div>
            {dropdownVisible && (
              <DropdownBox>
                <DropdownItem onClick={() => handleFilterChange('전체')}>
                  전체
                </DropdownItem>
                <DropdownItem onClick={() => handleFilterChange('최신순')}>
                  최신순
                </DropdownItem>
                <DropdownItem onClick={() => handleFilterChange('인기순')}>
                  인기순
                </DropdownItem>
                <DropdownItem onClick={() => handleFilterChange('모집중')}>
                  모집중
                </DropdownItem>
              </DropdownBox>
            )}
          </div>
        </TitleContainer>
        <RoomListContainer>
          {rooms?.map((item, index) => {
            return (
              <Room
                key={`${index + item.roomId}`}
                title={item.title}
                desc={item.content}
                currentMember={item.usersNum}
                maxMember={item.maxPeople}
                hashtag={item.hashtags}
                isOn={item.isOn}
                rank={item.rank}
                openKakao={item.openKakao}
                image={item.image}
                roomId={item.roomId}
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

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 20px 18px;
`;

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

const DropdownBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  right: 10px;
  border-radius: 10px;
  background-color: white;
  width: 148px;
  max-width: ${148 * RATIO}px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: 5;
`;
const DropdownItem = styled.div`
  font-size: 18px;
  font-weight: 400;
  border-bottom: #f5f5f5 1px solid;
  padding: 7px 10px;
  cursor: pointer;
`;

const AlignBtn = styled.div`
  display: flex;
  gap: 6px;
  font-size: 18px;
  color: black;
  align-items: center;
  cursor: pointer;
`;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
