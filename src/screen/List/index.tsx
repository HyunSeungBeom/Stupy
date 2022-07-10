import styled from 'styled-components';
import { RiEqualizerLine } from 'react-icons/ri';
import { FaPlusCircle } from 'react-icons/fa';
import { useState } from 'react';
import { TopContainer, BodyContainer } from 'src/screen/Main/styles';
import BottomBar from 'src/components/BottomBar';
import RoomBox from './RoomBox';
import SearchBox from './SerchBox';
import MakeRoom from './MakeRoom';

function List() {
  const [mouse, setMouse] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <div>
        <SetBackGround>
          <TopContainer>
            <SearchBoxBackGround>
              <SearchBox />
            </SearchBoxBackGround>
          </TopContainer>
          <BodyContainer>
            <UpperMenu>
              <UpperLeft>전체</UpperLeft>
              <RiEqualizerLine />
            </UpperMenu>
            <RoomBoxContainer>
              <RoomBox />
              <RoomBox />
              <RoomBox />
              <RoomBox />
            </RoomBoxContainer>
          </BodyContainer>
          <ButtonPlus>
            <FaPlusCircle
              onClick={() => {
                modalClose();
              }}
              size="80px"
              cursor="pointer"
              color={mouse ? 'red' : 'black'}
              onMouseOver={() => setMouse(true)}
              onMouseLeave={() => setMouse(false)}
            />
          </ButtonPlus>
        </SetBackGround>
        <BottomBar currentPage="List" />
      </div>
      {modalOpen && <MakeRoom modal={setModalOpen} />}
    </>
  );
}

export default List;

const SetBackGround = styled.div`
  background: gray;
  padding-bottom: 100px;
`;

const SearchBoxBackGround = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const RoomBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const UpperMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
`;

const UpperLeft = styled.div``;

const ButtonPlus = styled.div`
  width: 80px;
  height: 80px;
  background-color: white;
  display: flex;
  position: sticky;
  bottom: 40px;
  right: 50px;
  border-radius: 160px;
  overflow: hidden;
  float: right;
  z-index: 999;
`;
