/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { BsFillPeopleFill } from 'react-icons/bs';
import styled from 'styled-components';
import { FieldValues, useForm } from 'react-hook-form';
import OpenChetModal from './OpenChetModal';
import { ImgSource } from './ImgSource';
import PerSonnelButton from './PersonnelButton';
import HashInput from './HashInput';

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

    if (imagePreview && count) {
      formData.append('image', imagePreview);
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('hashtag', data.hashtag);
      formData.append('password', data.password);
      formData.append('open_kakao', data.open_kakao);
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
  return (
    <ModalContainer>
      <ModalInner>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            <ImgSource set={setImagePreview} />
          </ModalHeader>

          <ModalMiddle>
            <PerSonnelButton set={setCount} count={count} />
            <InputText>
              그룹이름<StarColor>*</StarColor>
            </InputText>
            <OrangeInput
              type="title"
              {...register('title', {
                required: true,
                maxLength: 8,
              })}
            />
            {errors.title && errors.title.type === 'required' && (
              <ErrorText>필수 입력입니다.</ErrorText>
            )}
            {errors.title && errors.title.type === 'maxLength' && (
              <ErrorText>최대 8글자</ErrorText>
            )}
            <div style={{ fontWeight: 'bold' }}>
              그룹설명<StarColor>*</StarColor>
            </div>
            <Writetext
              placeholder="그룹 설명을 입력하세요.(최대 70글자)"
              {...register('content', {
                required: true,
                maxLength: 70,
              })}
            />
            {errors.content && errors.content.type === 'required' && (
              <ErrorText>필수 입력입니다.</ErrorText>
            )}
            {errors.content && errors.content.type === 'maxLength' && (
              <ErrorText>글자수(70글자)가 초과되었습니다.</ErrorText>
            )}

            <InputText>
              오픈채팅 주소<StarColor>*</StarColor>
            </InputText>
            <OrangeInput
              type="open_kakao"
              {...register('open_kakao', {
                required: true,
                maxLength: 50,
              })}
            />
            {errors.open_kakao && errors.open_kakao.type === 'required' && (
              <ErrorText>필수 입력입니다.</ErrorText>
            )}
            {errors.open_kakao && errors.open_kakao.type === 'maxLength' && (
              <ErrorText>글자수(50글자)가 초과되었습니다.</ErrorText>
            )}
            <InputText>
              비밀번호<StarColor>*</StarColor>
            </InputText>
            <OrangeInput
              type="password"
              {...register('password', {
                required: true,
                maxLength: 4,
                minLength: 4,
                pattern: /^[0-9]*$/,
              })}
            />
            {errors.password && errors.password.type === 'required' && (
              <ErrorText>필수 입력입니다.</ErrorText>
            )}
            {errors.password && errors.password.type === 'maxLength' && (
              <ErrorText>4자리 입력해주세요.</ErrorText>
            )}
            {errors.password && errors.password.type === 'pattern' && (
              <ErrorText>숫자만 입력해주세요.</ErrorText>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <ErrorText>4자리 입력해주세요.</ErrorText>
            )}
            <InputText>
              해시태그<StarColor>*</StarColor>
            </InputText>
            <HashInput />
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
const StarColor = styled.span`
  color: #ef3061;
`;

const InputText = styled.div`
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
`;
const ErrorText = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  color: #ef3061;
`;
const OrangeInput = styled.input`
  width: 326px;
  font-size: 14px;
  border: none;
  border-bottom: #f8dac9 2px solid;
  outline: none;
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
  padding: 20px 25px;
  height: 200px;
  column-gap: 10px;
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
`;

const ModalHeader = styled.div``;

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
