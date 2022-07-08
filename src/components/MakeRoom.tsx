/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import styled from 'styled-components';
import { FieldValues, useForm } from 'react-hook-form';
import OpenChetModal from './OpenChetModal';
import { ImgSource } from './ImgSource';
import PerSonnelButton from './PersonnelButton';
import InputBox from './InputBox';

function MakeRoom({
  modal,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [count, setCount] = useState<number>(1);
  const [imagePreview, setImagePreview] = useState<File | null>(null);
  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();
    if (imagePreview) {
      formData.append('image', imagePreview);
      // formData.append('max_people', count);
    }
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
  console.log(errors.groupname);
  return (
    <ModalContainer>
      <ModalInner>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <ImgSource set={setImagePreview} />
            <PerSonnelButton set={setCount} count={count} />
          </ModalHeader>
          <ModalMiddle>
            <InputBox
              text="그룹이름"
              placetext="그룹이름을 입력하세요.(최대 8글자) "
              type="groupname"
              register={register}
              required
              maxLength={8}
              errors={errors}
            />
            <div style={{ fontWeight: 'bold' }}>그룹설명*</div>
            <Writetext placeholder="그룹 설명을 입력하세요.(최대 70글자)" />
            <InputBox
              text="해시태그"
              placetext="해시태그를 입력하세요.(최대 3개) "
              type="text"
              register={register}
              required={false}
              errors={errors}
            />
            <InputBox
              text="비밀번호"
              placetext="비밀번호를 입력하세요.(숫자 4글자) "
              type="password"
              register={register}
              required
              maxLength={4}
              errors={errors}
            />
            <InputBox
              text="카카오톡 오픈채팅 주소"
              placetext="카카오톡 오픈채팅 주소를 입력하세요."
              type="text"
              register={register}
              required
              errors={errors}
            />
          </ModalMiddle>
          <ModalBtnBox>
            <ModalBtn type="submit">방만들기</ModalBtn>
          </ModalBtnBox>
        </form>
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

const Writetext = styled.textarea`
  font-size: 14px;
  resize: none;
  border-radius: 3px;
  padding-left: 10px;
  width: 326px;
  outline: none;
  border: none;
  background-color: #faede6;
  height: 77px;
`;

const ModalMiddle = styled.div`
  overflow-y: auto; //스크롤바 없애기
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ModalInner = styled.div`
  border-radius: 20px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 380px;
  max-width: 380px;
  height: 558px;
  max-height: 558px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 20px 25px;
`;

const ModalHeader = styled.div`
  display: flex;
  padding-bottom: 20px;
`;

const ModalBtnBox = styled.div`
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 20px;
`;

const ModalBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 7.57273px 20.194px;
  gap: 12.62px;
  position: absolute;
  width: 306px;
  height: 46px;
  left: calc(50% - 306px / 2 - 1px);
  top: calc(50% - 46px / 2 + 229px);
  background: #ff9052;
  border-radius: 10.097px;
  color: white;
  border: none;
  font-weight: bold;
`;
