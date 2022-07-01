import { FaPlusCircle } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import styled from 'styled-components';

/* eslint-disable react/button-has-type */
function TodoList() {
  return (
    <TodoBackground>
      <Category>
        <p>
          카테고리 <FiMoreHorizontal />
        </p>
      </Category>
      <ListBox>
        <li>치과가기</li>
        <li>치과가기</li>
        <li>치과가기</li>
        <li>치과가기</li>
        <PlusCircle />
      </ListBox>
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
`;

const ListBox = styled.div`
  padding-top: 15px;
  border-radius: 8px;
  background: gray;
  padding-left: 20px;
  box-sizing: border-box;
`;

const PlusCircle = styled(FaPlusCircle)`
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;
