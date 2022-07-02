import styled from 'styled-components';
import { FaPlusCircle } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import TodoList from '../components/TodoList';

function Main() {
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
    <SetBackGround>
      <UpperBox>
        <p>날짜 요일</p>
      </UpperBox>
      <RadiusBox>
        <p> GROUP</p>
        <GroupBox>내가참여중인 그룹</GroupBox>
        <PlusBetween>
          <p>
            {' '}
            TO DO LIST <FaPlusCircle />
          </p>
        </PlusBetween>
        <TodoListBox>
          <TodoList />
          <TodoList />
          <TodoList />
          <TodoList />
        </TodoListBox>
      </RadiusBox>
    </SetBackGround>
  );
}

export default Main;

const SetBackGround = styled.div`
  background: gray;
  height: 100vh;
  overflow: hidden;
`;

export const UpperBox = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding-top: 30px;
  padding-left: 5%;
  height: 159px;
  box-sizing: border-box;
`;

export const RadiusBox = styled.div`
  padding-top: 30px;
  padding-left: 5%;
  padding-right: 5%;
  border-radius: 29px;
  padding-bottom: 50px;
  background: white;
`;

const GroupBox = styled.div`
  background: gray;
  border-radius: 7px;
  height: 149px;
  padding-left: 3%;
  padding-top: 20px;
  box-sizing: border-box;
`;

const PlusBetween = styled.div`
  display: flex;
`;

const TodoListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
