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
    <div
      style={{ boxSizing: 'border-box', display: 'flex', paddingTop: '15px' }}
    >
      <Personnel>
        <div style={{ width: '50px' }}>
          인원<span>*</span>{' '}
        </div>
      </Personnel>
      <MinusPlusBox>
        <Minus onClick={MinusClick} cursor="pointer" />
        <div style={{ width: '40px', display: 'flex' }}>{count}명</div>
        <Plus onClick={PlusClick} cursor="pointer" />
      </MinusPlusBox>
      <UnderLineOrange />
    </div>
  );
}

export default PerSonnelButton;

const Personnel = styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  margin-right: 80px;
  span {
    color: #ef3061;
  }
`;

const MinusPlusBox = styled.div`
  width: 200px;
  text-align: center;
  align-items: center;
  font-size: 17px;
  display: flex;
  padding-left: 50px;
  font-weight: bold;
  gap: 45px;
  flex-direction: row;
`;

const UnderLineOrange = styled(UnderLine)`
  position: absolute;
  width: 160px;
  height: 0px;
  left: 214px;
  top: 416.01px;
`;
