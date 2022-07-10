import styled from 'styled-components';
import { RiEqualizerLine } from 'react-icons/ri';
import { useState } from 'react';
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
  const [mouse, setMouse] = useState<boolean>(false);
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
          <Room />
          <Room />
          <Room />
          <Room />
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
