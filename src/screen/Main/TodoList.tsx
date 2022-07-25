/* eslint-disable no-console */
import styled from 'styled-components';
import icoXbutton from 'src/assets/icons/main/icoXbutton.svg';
import btnAdd from 'src/assets/icons/main/btnAdd.svg';
import React, { useCallback, useEffect, useState } from 'react';
import Checkbox from 'src/components/Checkbox';
import { useMutation, useQueryClient } from 'react-query';
import {
  deleteTodolistId,
  deleteTodolistIdTodoId,
  patchTodolistId,
  patchTodolistIdTodoId,
  postTodolistId,
} from 'src/api/todolist';
import { postStatusToFalse, postStatusToTrue } from 'src/api/todolist/status';

type Props = {
  id: string;
  subject: string;
  item: {
    _id: string;
    content: string;
    status: boolean;
    createdAt: string;
  }[];
};

export default function TodoList({ id, subject, item }: Props) {
  const queryClient = useQueryClient();
  const todolistId = id;
  const [subjectData, setSubjectData] = useState('');
  const [itemData, setItemData] = useState<typeof item>([]);

  const { mutate: postTodolistItem } = useMutation(
    () => postTodolistId(todolistId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todolistData');
      },
      onError: (err) => {
        console.warn(err);
      },
    },
  );

  const { mutate: patchTodolist } = useMutation(
    () => patchTodolistId(todolistId, subjectData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todolistData');
      },
      onError: (err) => {
        console.warn(err);
      },
    },
  );

  const { mutate: changeStatusToTrue } = useMutation(
    (todoId: string) => postStatusToTrue(todolistId, todoId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todolistData');
      },
      onError: (err) => {
        console.warn(err);
      },
    },
  );
  const { mutate: changeStatusToFalse } = useMutation(
    (todoId: string) => postStatusToFalse(todolistId, todoId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todolistData');
      },
      onError: (err) => {
        console.warn(err);
      },
    },
  );

  const { mutate: deleteTodolistItem } = useMutation(
    (todoId: string) => deleteTodolistIdTodoId(todolistId, todoId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todolistData');
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (err) => {
        console.warn(err);
      },
    },
  );
  const { mutate: deleteTodolist } = useMutation(
    () => deleteTodolistId(todolistId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todolistData');
      },
      onError: (err) => {
        console.warn(err);
      },
    },
  );
  useEffect(() => {
    setSubjectData(subject);
    setItemData(item);
  }, [subject, item]);

  const handleAddContent = () => {
    postTodolistItem();
  };
  const handleChangeContentStatus = useCallback(
    (id: string, status: boolean) => {
      if (status) {
        changeStatusToTrue(id);
      } else changeStatusToFalse(id);
    },
    [],
  );
  const handleDeleteContent = useCallback((id: string) => {
    deleteTodolistItem(id);
  }, []);

  const handleEditCategory = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') patchTodolist();
  };

  const handleDelCategory = () => {
    deleteTodolist();
  };

  return (
    <Wrap>
      <SubjectRow>
        <Input
          value={subjectData}
          onChange={(e) => {
            setSubjectData(e.target.value);
          }}
          onKeyUp={handleEditCategory}
        />
      </SubjectRow>
      {itemData?.map((item) => {
        return (
          <TodoItem
            // eslint-disable-next-line no-underscore-dangle
            key={item._id}
            categoryId={id}
            // eslint-disable-next-line no-underscore-dangle
            id={item._id}
            contentProp={item.content}
            isDoneProp={item.status}
            onDeleteContent={handleDeleteContent}
            onChangeContentStatus={handleChangeContentStatus}
          />
        );
      })}
      <ItemAddBtn src={btnAdd} alt="" onClick={handleAddContent} />
      <CartegoryDelBtn onClick={handleDelCategory}>
        카테고리 삭제
      </CartegoryDelBtn>
    </Wrap>
  );
}

type ItemProps = {
  categoryId: string;
  id: string;
  contentProp: string;
  isDoneProp: boolean;
  onDeleteContent: (id: string) => void;
  onChangeContentStatus: (id: string, status: boolean) => void;
};

function TodoItem({
  categoryId,
  id,
  contentProp,
  isDoneProp,
  onDeleteContent,
  onChangeContentStatus,
}: ItemProps) {
  const [content, setContent] = useState('');
  const [isDone, setIsDone] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: patchTodolistItem } = useMutation(
    () => patchTodolistIdTodoId(categoryId, id, content),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todolistData');
      },
      onError: (err) => {
        console.warn(err);
      },
    },
  );

  const handleDelItemPress = (id: string) => {
    onDeleteContent(id);
  };
  const handleChangeStatus = (id: string, status: boolean) => {
    onChangeContentStatus(id, status);
  };
  const handleEditItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') patchTodolistItem();
  };

  useEffect(() => {
    setContent(contentProp);
    setIsDone(isDoneProp);
  }, [contentProp, isDoneProp]);

  return (
    <ItemRow>
      <div>
        <Checkbox
          isCheckedProp={isDone}
          onChangeChecked={(e) => {
            setIsDone(e);
            handleChangeStatus(id, e);
          }}
        />
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyUp={handleEditItem}
        />
      </div>
      <ItemDelBtn
        src={icoXbutton}
        alt=""
        onClick={() => handleDelItemPress(id)}
      />
    </ItemRow>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  margin: 0px 20px 15px;
  padding: 20px 0px 0px;
  background-color: white;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.17);
`;

const SubjectRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin: 0px 20px 28px;
`;

const ItemAddBtn = styled.img`
  margin: 6px 20px 15px;
  width: 96px;
  height: 22px;
  cursor: pointer;
`;

const CartegoryDelBtn = styled.div`
  display: flex;
  justify-content: center;
  border-top: #e8e8e8 1px solid;
  padding: 18px;
  background-color: rgba(237, 237, 237, 0.3);
  font-size: 16px;
  color: #c7c7c7;
  cursor: pointer;
`;

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  margin: 0px 20px 8px;
  font-size: 18px;
  font-weight: 400;
  border-bottom: #eee 1px solid;
`;

const ItemDelBtn = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Input = styled.input`
  border: none;
`;
