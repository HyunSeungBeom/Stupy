import React, { useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as TutorialImage } from 'src/assets/icons/tutorial/tutorial1image.svg';
import { ReactComponent as TutorialContent } from 'src/assets/icons/tutorial/tutorial1content.svg';
import { ReactComponent as TutorialButton } from 'src/assets/icons/tutorial/tutorialbutton.svg';
import { ReactComponent as CancelButton } from 'src/assets/icons/tutorial/tutorialcancel.svg';
import { ReactComponent as Dot } from 'src/assets/icons/tutorial/tutorial1dot.svg';

export default function Tutorial1({
  modal,
  differ,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
  differ: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    document.body.style.cssText = `
          overflow: hidden;
          `;
    return () => {
      document.body.style.cssText = '';
    };
  }, []);

  const modalClose = () => {
    modal(true);
  };

  const nextClick = () => {
    differ(true);
    modalClose();
  };

  const CancelButtonClick = () => {
    modalClose();
    window.location.replace('/main');
  };
  return (
    <ModalContainer>
      <ModalInner>
        <TutorialImageBox>
          <Dot
            style={{
              position: 'absolute',
              top: '300px',
              right: '167px',
            }}
          />
          <CancelButton
            onClick={CancelButtonClick}
            style={{
              position: 'absolute',
              top: '25px',
              right: '25px',
              cursor: 'pointer',
            }}
          />

          <TutorialImage style={{ borderRadius: '9px 9px 0px 0px' }} />
        </TutorialImageBox>

        <TutorialContentBox>
          <TutorialContent />
        </TutorialContentBox>
        <TutorialButtonBox>
          <TutorialButton onClick={nextClick} style={{ cursor: 'pointer' }} />
        </TutorialButtonBox>
      </ModalInner>
      <Zindex />
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
  border-radius: 9px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 388px;
  max-width: 388px;
  height: 558px;
  max-height: 558px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
`;

const TutorialImageBox = styled.div`
  width: 360px;
  max-width: 360px;
`;

const TutorialContentBox = styled.div`
  width: 360px;
  max-width: 360px;
  align-items: center;
  text-align: center;
  padding-left: 20px;
  padding-top: 30px;
`;

const TutorialButtonBox = styled.div`
  width: 360px;
  max-width: 360px;
  padding-top: 24px;
  padding-left: 300px;
`;
