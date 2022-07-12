import React, { useState } from 'react';
import styled from 'styled-components';
import { RATIO, PRIMARY } from 'src/constants';
import icoPlus from 'src/assets/icons/list/icoPlus.svg';
import MakeRoom from 'src/components/MakeRoom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type Props = {
  onClickEvent: () => void;
};

function CreateButton() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleModalOpen = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <>
      <CircleButton onClick={handleModalOpen}>
        <PlusIcon src={icoPlus} alt="" />
      </CircleButton>
      {modalOpen && <MakeRoom modal={setModalOpen} />}
    </>
  );
}

export { CreateButton };

const CircleButton = styled.div`
  display: flex;
  position: absolute;
  right: 25px;
  bottom: 120px;
  z-index: 999;
  width: ${68 * RATIO}px;
  height: ${68 * RATIO}px;
  max-width: 68px;
  max-height: 68px;
  background-color: ${PRIMARY};
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.2);
`;

const PlusIcon = styled.img`
  width: ${26 * RATIO}px;
  height: ${26 * RATIO}px;
  max-width: 26px;
  max-height: 26px;
`;
