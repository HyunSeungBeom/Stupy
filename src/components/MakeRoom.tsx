/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FieldValues, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CloseButton } from 'src/assets/icons/webrtcroom/closebutton.svg';
import { ImgSource } from './ImgSource';
import PerSonnelButton from './PersonnelButton';
import HashInput from './HashInput';
import { createRoomApi } from '../api/room';

function MakeRoom({
  modal,
}: {
  modal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [count, setCount] = useState<number>(1);
  const [imagePreview, setImagePreview] = useState<File | undefined>();
  const [hashArr, setHashArr] = useState<string[] | []>([]);
  const nav = useNavigate();

  const onSubmit = (data: FieldValues) => {
    const formData = new FormData();

    if (imagePreview) {
      formData.append('image', imagePreview);
    }
    formData.append('title', data.title);
    formData.append('content', data.content);
    hashArr.forEach((hash) => formData.append('hashtag[]', hash));
    formData.append('password', data.password);
    formData.append('openKakao', data.open_kakao);
    formData.append('maxPeople', count.toString());

    MakeRoomdata.mutate(formData);
  };

  const MakeRoomdata = useMutation((data: FormData) => createRoomApi(data), {
    onSuccess: (v) => {
      nav(`/room/${v.data.id}`);
    },
  });
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
          <CloseButtonBox onClick={modalClose}>
            <CloseButton />
          </CloseButtonBox>
          <ModalMiddle>
            <PerSonnelButton set={setCount} count={count} />
            <InputText>
              ????????????<StarColor>*</StarColor>
            </InputText>
            <OrangeInput
              placeholder="??????????????? ???????????????"
              type="title"
              {...register('title', {
                required: true,
                maxLength: 8,
              })}
            />
            {errors.title && errors.title.type === 'required' && (
              <ErrorText>?????? ???????????????.</ErrorText>
            )}
            {errors.title && errors.title.type === 'maxLength' && (
              <ErrorText>?????? 8??????</ErrorText>
            )}
            <div style={{ fontWeight: 'bold', marginTop: '20px' }}>
              ????????????<StarColor>*</StarColor>
            </div>
            <Writetext
              placeholder="?????? ????????? ???????????????.(?????? 70??????)"
              {...register('content', {
                required: true,
                maxLength: 70,
              })}
            />
            {errors.content && errors.content.type === 'required' && (
              <ErrorText>?????? ???????????????.</ErrorText>
            )}
            {errors.content && errors.content.type === 'maxLength' && (
              <ErrorText>?????????(70??????)??? ?????????????????????.</ErrorText>
            )}

            <InputText>
              ???????????? ??????<StarColor>*</StarColor>
            </InputText>
            <OrangeInput
              placeholder="???????????? ????????? ???????????????"
              type="open_kakao"
              {...register('open_kakao', {
                required: true,
                maxLength: 50,
                pattern: /open.kakao.com/,
              })}
            />
            {errors.open_kakao && errors.open_kakao.type === 'required' && (
              <ErrorText>?????? ???????????????.</ErrorText>
            )}
            {errors.open_kakao && errors.open_kakao.type === 'maxLength' && (
              <ErrorText>?????????(50??????)??? ?????????????????????.</ErrorText>
            )}
            {errors.open_kakao && errors.open_kakao.type === 'pattern' && (
              <ErrorText>open.kakao.com ????????? ???????????????!</ErrorText>
            )}
            <InputText>
              ????????????<StarColor>*</StarColor>
            </InputText>
            <OrangeInput
              type="password"
              placeholder="(?????? + ?????? 4?????? ?????? 10??????)"
              {...register('password', {
                required: true,
                maxLength: 10,
                minLength: 4,
                pattern: /^[a-zA-Z0-9]*$/,
              })}
            />
            {errors.password && errors.password.type === 'required' && (
              <ErrorText>?????? ???????????????.</ErrorText>
            )}
            {errors.password && errors.password.type === 'maxLength' && (
              <ErrorText>10????????? ?????? ???????????????.</ErrorText>
            )}
            {errors.password && errors.password.type === 'pattern' && (
              <ErrorText>?????? + ????????? ????????????.</ErrorText>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <ErrorText>4????????? ???????????????.</ErrorText>
            )}
            <InputText>????????????</InputText>
            <HashInput set={setHashArr} hashArr2={hashArr} />
          </ModalMiddle>

          <ModalBtnBox>
            <ModalBtn type="submit">????????????</ModalBtn>
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
  margin-top: 21px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
`;
const ErrorText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #ef3061;
`;
const OrangeInput = styled.input`
  width: 326px;
  margin-top: 10px;
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
  height: 270px;
  column-gap: 10px;
  overflow-y: auto; //???????????? ?????????
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

const CloseButtonBox = styled.div`
  position: absolute;
  right: 25.73px;
  top: 25.73px;
  cursor: pointer;
`;
