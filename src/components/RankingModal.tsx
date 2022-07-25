import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as CloseButton } from 'src/assets/icons/webrtcroom/closebutton.svg';

export default function RankingModal({
  modal,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const modalClose = () => {
    modal(false);
  };

  useEffect(() => {
    document.body.style.cssText = `
      overflow: hidden;
      `;
    return () => {
      document.body.style.cssText = '';
    };
  }, []);

  return (
    <ModalContainer>
      <ModalInner>
        <Title>TODAY RANK</Title>
        <CloseButtonBox onClick={modalClose}>
          <CloseButton />
        </CloseButtonBox>
        <RankingBox>
          <div />
        </RankingBox>
      </ModalInner>
      <Zindex onClick={modalClose} />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  display: relative;
  z-index: 999;
`;

const Zindex = styled.div`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  display: relative;
  z-index: -1;
`;

const ModalInner = styled.div`
  border-radius: 20px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 388px;
  max-width: 388px;
  height: 561px;
  max-height: 561px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  background: #ff9052; ;
`;

const Title = styled.div`
  color: white;
  position: absolute;
  width: 100%;
  height: 17px;
  text-align: center;
  align-items: center;
  top: 28px;
  font-family: 'Noto Sans';
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 17px;
`;

const CloseButtonBox = styled.div`
  position: absolute;
  right: 25.73px;
  top: 25.73px;
  cursor: pointer;
`;

const RankingBox = styled.div`
  background: white;
  position: absolute;
  width: 348px;
  height: 468px;
  text-align: center;
  align-items: center;
  top: 72px;
  left: 20px;
  border-radius: 9px;
`;
