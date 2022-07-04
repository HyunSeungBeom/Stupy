import { useEffect, useState } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import styled from 'styled-components';
import OpenChetModal from './OpenChetModal';

function MakeRoom({
  modal,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [, setRoomname] = useState<string>(); // password 배포때문에 뺌.
  const onCreateRoomname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomname(e.target.value);
  };
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
        <ModalHeader>
          <ProfileImg>
            <ProfileRevise />
          </ProfileImg>
          <GroupName placeholder="방 이름" onChange={onCreateRoomname} />
        </ModalHeader>
        <div>
          <ModalMiddle>
            <div>그룹 정원</div>
            <div>- +</div>
          </ModalMiddle>
          <div>그룹 설명(글자수 제한 필요)</div>
          <div>비밀 번호</div>
          <HashBox>
            <div>
              해시 태그 <GroupName />
            </div>
          </HashBox>
        </div>
        <ModalBtnBox>
          <ModalBtn>방 만들기</ModalBtn>
        </ModalBtnBox>
      </ModalInner>
      <Zindex onClick={modalClose} />
    </ModalContainer>
  );
}

export default MakeRoom;

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

const ProfileImg = styled.div`
  border-radius: 80px;
  background-color: gray;
  width: 80px;
  height: 80px;
  border: 1px solid black;
  position: relative;
`;

const GroupName = styled.input`
  padding: 5px;
  padding-left: 10px;
  border-radius: 5px;
  margin: 20px;
  box-sizing: border-box;
`;

const ProfileRevise = styled.div`
  border-radius: 30px;
  width: 30px;
  height: 30px;
  background: green;
  position: absolute;
  bottom: 0;
  right: -5px;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 360px;
  max-width: 400px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalMiddle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HashBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalBtnBox = styled.div`
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 20px;
`;

const ModalBtn = styled.button`
  display: flex;
  width: 110px;
  padding: 5px 10px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;
