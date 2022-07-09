import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Minus } from '../assets/icons/makeroom/MinusButton.svg';
import { ReactComponent as Plus } from '../assets/icons/makeroom/PlusButton.svg';
import { ReactComponent as UnderLine } from '../assets/icons/makeroom/UnderLine.svg';

function PerSonnelButton({
  set,
  count,
}: {
  set: React.Dispatch<React.SetStateAction<number>>;
  count: number;
}) {
  const MinusClick = () => {
    if (count > 1) set(count - 1);
  };
  const PlusClick = () => {
    if (count < 4) set(count + 1);
  };

  return (
    <div style={{ paddingTop: '47px', boxSizing: 'border-box' }}>
      <Personnel>
        인원 <p>*</p>{' '}
      </Personnel>
      <MinusPlusBox>
        <Minus onClick={MinusClick} cursor="pointer" /> {count}명{' '}
        <Plus onClick={PlusClick} cursor="pointer" />
      </MinusPlusBox>
      <UnderLineOrange />
    </div>
  );
}

export default PerSonnelButton;
const PersonnelBox = styled.div`
  padding-top: '47px';
  box-sizing: 'border-box';
`;
const Personnel = styled.div`
  margin-left: 50px;
  display: flex;
  font-size: 15px;
  font-weight: bold;
  p {
    color: #ef3061;
  }
`;

const MinusPlusBox = styled.div`
  font-size: 17px;
  display: flex;
  padding-left: 50px;
  font-weight: bold;
  gap: 45px;
`;

const UnderLineOrange = styled(UnderLine)`
  margin-left: 51px;
  margin-bottom: 20px;
`;
