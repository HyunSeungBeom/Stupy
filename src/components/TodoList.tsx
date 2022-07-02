import { FaPlusCircle } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import styled from 'styled-components';

/* eslint-disable react/button-has-type */
function TodoList() {
  return (
    <TodoBackground>
      <Category>
        <div>카테고리</div>
        <FiMoreHorizontal />
      </Category>
      <ListBox>
        <li>치과가기</li>
        <li>치과가기</li>
        <li>치과가기</li>
        <li>치과가기</li>
      </ListBox>
      <PlusCircle />
    </TodoBackground>
  );
}

export default TodoList;

const TodoBackground = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 400px;
  margin-bottom: 10px;
  margin-right: 5px;
`;

const Category = styled.div`
  border-radius: 8px;
  width: 128px;
  display: flex;
  padding-left: 3%;
  background: gray;
  gap: 5px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const ListBox = styled.div`
  padding-top: 15px;
  border-radius: 8px;
  background: gray;
  padding-left: 20px;
  box-sizing: border-box;
  padding-bottom: 100px;
`;

const PlusCircle = styled(FaPlusCircle)`
  margin-left: auto;
  margin-right: auto;
`;
