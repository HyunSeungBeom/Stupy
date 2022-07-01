import styled from 'styled-components';
import { FaPlusCircle } from 'react-icons/fa';
import TodoList from '../components/TodoList';

function Main() {
  return (
    <SetBackGround>
      <DayBox>
        <p>날짜 요일</p>
      </DayBox>
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

export const SetBackGround = styled.div`
  background: gray;
  height: 100vh;
`;

const DayBox = styled.div`
  font-size: 30px;
  font-weight: bold;
  padding-top: 30px;
  padding-left: 5%;
  height: 159px;
  box-sizing: border-box;
`;

const RadiusBox = styled.div`
  padding-top: 30px;
  padding-left: 5%;
  padding-right: 5%;
  border-radius: 29px;
  height: 100%;
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
