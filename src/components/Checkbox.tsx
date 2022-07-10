import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import icoCheckboxOff from 'src/assets/icons/icoCheckboxOff.svg';
import icoCheckboxOn from 'src/assets/icons/icoCheckboxOn.svg';

type Props = {
  isCheckedProp: boolean;
  // eslint-disable-next-line react/require-default-props
  onChangeChecked?: (isChecked: boolean) => void;
};

export default function Checkbox({ isCheckedProp, onChangeChecked }: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
    if (onChangeChecked) onChangeChecked(!isChecked);
  };

  useEffect(() => {
    if (isCheckedProp) setIsChecked(true);
    else setIsChecked(false);
  }, [isCheckedProp]);

  return isChecked ? (
    <CheckboxImg src={icoCheckboxOn} alt="" onClick={handleCheckboxPress} />
  ) : (
    <CheckboxImg src={icoCheckboxOff} alt="" onClick={handleCheckboxPress} />
  );
}

const CheckboxImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 14px;
`;
