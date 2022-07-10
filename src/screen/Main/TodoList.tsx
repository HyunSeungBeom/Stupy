import styled from 'styled-components';
import icoDots from 'src/assets/icons/main/icoDots.svg';
import icoXbutton from 'src/assets/icons/main/icoXbutton.svg';
import btnAdd from 'src/assets/icons/main/btnAdd.svg';
import { useCallback, useEffect, useState } from 'react';
import Checkbox from 'src/components/Checkbox';

type Props = {
  subject: string;
  item: {
    id: number;
    content: string;
    is_done: boolean;
  }[];
};

let tempId = 0;

export default function TodoList({ subject, item }: Props) {
  const [subjectData, setSubjectData] = useState<string>();
  const [itemData, setItemData] = useState<typeof item>([]);

  useEffect(() => {
    setSubjectData(subject);
    setItemData(item);
  }, [subject, item]);

  const handleDeleteContent = useCallback((id: number) => {
    setItemData((prev) => prev?.filter((e) => e.id !== id));
  }, []);

  const handleAddContent = () => {
    tempId -= 1;
    const tempArray = [];
    tempArray.push({ id: tempId, content: '', is_done: false });
    setItemData(itemData.concat(tempArray));
  };

  return (
    <Wrap>
      <SubjectRow>
        <Input
          value={subjectData}
          onChange={(e) => {
            setSubjectData(e.target.value);
          }}
        />
        <SubMenuBtn src={icoDots} alt="" />
      </SubjectRow>
      {itemData?.map((item) => {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            contentProp={item.content}
            isDoneProp={item.is_done}
            onDeleteContent={handleDeleteContent}
          />
        );
      })}
      <AddButton src={btnAdd} alt="" onClick={handleAddContent} />
    </Wrap>
  );
}

type ItemProps = {
  id: number;
  contentProp: string;
  isDoneProp: boolean;
  onDeleteContent: (id: number) => void;
};

function TodoItem({ id, contentProp, isDoneProp, onDeleteContent }: ItemProps) {
  const [content, setContent] = useState<typeof contentProp>();
  const [isDone, setIsDone] = useState(false);

  const handleDelItemPress = (id: number) => {
    onDeleteContent(id);
  };

  useEffect(() => {
    setContent(contentProp);
    setIsDone(isDoneProp);
  }, [contentProp, isDoneProp]);

  return (
    <ItemRow>
      <div>
        <Checkbox isCheckedProp={isDone} />
        <Input value={content} onChange={(e) => setContent(e.target.value)} />
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
  margin-bottom: 15px;
  padding: 20px 25px;
  background-color: white;
`;

const SubjectRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 28px;
`;

const SubMenuBtn = styled.img`
  width: 24px;
  height: 24px;
`;

const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  margin-bottom: 8px;
  font-size: 18px;
  font-weight: 400;
  border-bottom: #eee 1px solid;
`;

const ItemDelBtn = styled.img`
  width: 20px;
  height: 20px;
`;

const Input = styled.input`
  border: none;
`;

const AddButton = styled.img`
  margin-top: 6px;
  width: 96px;
  height: 22px;
`;
