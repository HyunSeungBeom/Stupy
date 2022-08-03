/* eslint-disable no-console */
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ko';
import BottomBar from 'src/components/BottomBar';
import TodoList from 'src/screen/Main/TodoList';
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
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteTodolistId, getTodolist, postTodolist } from 'src/api/todolist';
import { getMyRooms } from 'src/api/myRooms';
import ReviseRoom from 'src/components/ReviseRoom';
import UseModal from 'src/components/UseModal';
import MyGroup from './MyGroup';
import EmptyGroup from './EmptyGroup';

moment.locale('ko');

export default function Main() {
  const queryClient = useQueryClient();
  const [swiperIdx, setSwiperIdx] = useState(0);
  const [params] = useSearchParams();
  const [isDelete, setIsDelete] = useState(false);
  const [selectedDelCategory, setSelectedDelCategory] = useState('');
  // console.log(params.get('token'));

  const { data: myRoomData } = useQuery(['myRoomData'], getMyRooms);
  const { data: todolistData } = useQuery(['todolistData'], getTodolist);
  // eslint-disable-next-line no-console

  const {
    open: openModal,
    close: closeModal,
    isOpen: isOpenedModal,
    myRoomData: meRoomData,
  } = UseModal();

  const { mutate: addCategory } = useMutation(postTodolist, {
    onSuccess: () => {
      queryClient.invalidateQueries('todolistData');
    },
    onError: (err) => {
      console.warn(err);
    },
  });
  const { mutate: deleteCategory } = useMutation(
    () => deleteTodolistId(selectedDelCategory),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todolistData');
        setIsDelete(false);
      },
      onError: (err) => {
        console.warn(err);
      },
    },
  );

  useEffect(() => {
    const kakaotoken = params.get('token');
    if (kakaotoken != null) {
      localStorage.clear();
      localStorage.setItem('token', kakaotoken);
      window.location.replace('/main');
    }
  }, []);

  const handleAddCategory = () => {
    addCategory();
  };

  const delCategoryOn = () => {
    if (!isDelete) setIsDelete(true);
    else if (!selectedDelCategory) setIsDelete(false);
    else deleteCategory();
  };

  const onSelectCategory = (e: string) => {
    if (selectedDelCategory === e) setSelectedDelCategory('');
    else setSelectedDelCategory(e);
  };

  return (
    <>
      <SetBackGround>
        <TopContainer>
          <DayOfWeek>{moment().format('dddd')}</DayOfWeek>
          <Date>{moment().format('M월 D일')}</Date>
        </TopContainer>
        <BodyContainer style={{ backgroundColor: 'white' }}>
          <TitleContainer>
            <Title>GROUP</Title>
          </TitleContainer>
          {myRoomData?.length ? (
            <>
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
                {myRoomData.map((item) => {
                  return (
                    <SwiperSlide key={item.roomId}>
                      <MyGroup item={item} openModal={openModal} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <SwiperDotContainer>
                {myRoomData.map((item, index) => {
                  return (
                    <div
                      key={item.roomId}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        backgroundColor:
                          index === swiperIdx ? PRIMARY : '#d9d9d9',
                      }}
                    />
                  );
                })}
              </SwiperDotContainer>
            </>
          ) : (
            <EmptyGroup />
          )}
          <Divider />
          <TitleContainer>
            <Title>TO DO LIST</Title>
            <div style={{ display: 'flex', gap: 8 }}>
              <DelButton
                onClick={delCategoryOn}
                style={{ color: isDelete ? PRIMARY : '#8f8f8f' }}
              >
                {selectedDelCategory !== '' ? '완료' : '삭제'}
              </DelButton>
              {!isDelete && (
                <AddButton onClick={handleAddCategory}>추가</AddButton>
              )}
            </div>
          </TitleContainer>
          {todolistData?.map((item) => {
            return (
              <TodoList
                key={item.todoListId}
                id={item.todoListId}
                selectedId={selectedDelCategory}
                subject={item.title}
                item={item.todos}
                isDelete={isDelete}
                onSelectedCategory={onSelectCategory}
              />
            );
          })}
        </BodyContainer>
        <BottomBar currentPage="Main" />
      </SetBackGround>
      {isOpenedModal && meRoomData && (
        <ReviseRoom
          modal={closeModal}
          myRoomData={meRoomData}
          isOpen={isOpenedModal}
        />
      )}
    </>
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
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  padding: 5px 11px;
  cursor: pointer;
`;
const DelButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #8f8f8f;
  font-weight: 500;
  border: 1px solid #e8e8e8;
  border-radius: 5px;
  padding: 5px 11px;
  cursor: pointer;
`;
// const PlusIcon = styled.img`
//   width: 24px;
//   height: 24px;
// `;
const SwiperDotContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-bottom: 18px;
`;
