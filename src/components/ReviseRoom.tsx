/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FieldValues, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CloseButton } from 'src/assets/icons/webrtcroom/closebutton.svg';
import { GetMyRoom } from 'src/api/myRooms/types';
import PerSonnelButton from './PersonnelButton';
import HashInput from './HashInput';
import { EditRoomApi } from '../api/room';
import { ReviseImgSource } from './ReviseImgSource';

function ReviseRoom({
  modal,
  isOpen,
  myRoomData,
}: {
  modal: () => void;
  isOpen: boolean;
  myRoomData: GetMyRoom;
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [count, setCount] = useState<number>(myRoomData.maxPeople);
  const [imagePreview, setImagePreview] = useState<File | undefined>();
  const [hashArr, setHashArr] = useState<string[] | []>([
    ...myRoomData.hashtags,
  ]);
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

    EditRoomdata.mutate(formData);
  };

  const EditRoomdata = useMutation(
    (data: FormData) => EditRoomApi(data, myRoomData.roomId),
    {
      onSuccess: () => {
        nav('/main');
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (data: any) => {
        alert(`${data.response.data.message}`);
      },
    },
  );
  const modalClose = () => {
    modal();
  };

  useEffect(() => {
    document.addEventListener(
      'keydown',
      // eslint-disable-next-line func-names
      function (event) {
        if (event.keyCode === 13 || event.keyCode === 28) {
          event.preventDefault();
        }
      },
      true,
    );
  }, []);

  useEffect(() => {
    document.body.style.cssText = `
      overflow: hidden;
      `;
    return () => {
      document.body.style.cssText = '';
    };
  }, []);

  if (isOpen) {
    return (
      <ModalContainer>
        <ModalInner>
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalHeader>
              <ReviseImgSource
                set={setImagePreview}
                Reviseimage={myRoomData.image}
              />
            </ModalHeader>
            <CloseButtonBox onClick={modalClose}>
              <CloseButton />
            </CloseButtonBox>
            <ModalMiddle>
              <PerSonnelButton set={setCount} count={count} />
              <InputText>
                그룹이름<StarColor>*</StarColor>
              </InputText>
              <OrangeInput
                placeholder="그룹이름을 입력하세요"
                type="title"
                defaultValue={myRoomData.title}
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
              <div style={{ fontWeight: 'bold', marginTop: '20px' }}>
                그룹설명<StarColor>*</StarColor>
              </div>
              <Writetext
                placeholder="그룹 설명을 입력하세요.(최대 70글자)"
                defaultValue={myRoomData.content}
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
                placeholder="오픈채팅 주소를 입력하세요"
                type="open_kakao"
                defaultValue={myRoomData.openKakao}
                {...register('open_kakao', {
                  required: true,
                  maxLength: 50,
                  pattern: /open.kakao.com/,
                })}
              />
              {errors.open_kakao && errors.open_kakao.type === 'required' && (
                <ErrorText>필수 입력입니다.</ErrorText>
              )}
              {errors.open_kakao && errors.open_kakao.type === 'maxLength' && (
                <ErrorText>글자수(50글자)가 초과되었습니다.</ErrorText>
              )}
              {errors.open_kakao && errors.open_kakao.type === 'pattern' && (
                <ErrorText>open.kakao.com 형식에 맞춰주세요!</ErrorText>
              )}
              <InputText>
                비밀번호<StarColor>*</StarColor>
              </InputText>
              <OrangeInput
                type="password"
                placeholder="(영문 + 숫자 4자리 이상 10이하)"
                defaultValue={myRoomData.password}
                {...register('password', {
                  required: true,
                  maxLength: 10,
                  minLength: 4,
                  pattern: /^[a-zA-Z0-9]*$/,
                })}
              />
              {errors.password && errors.password.type === 'required' && (
                <ErrorText>필수 입력입니다.</ErrorText>
              )}
              {errors.password && errors.password.type === 'maxLength' && (
                <ErrorText>10자리를 넘지 말아주세요.</ErrorText>
              )}
              {errors.password && errors.password.type === 'pattern' && (
                <ErrorText>영문 + 숫자로 해주세요.</ErrorText>
              )}
              {errors.password && errors.password.type === 'minLength' && (
                <ErrorText>4자리를 넘겨주세요.</ErrorText>
              )}
              <InputText>해시태그</InputText>
              <HashInput set={setHashArr} hashArr2={hashArr} />
            </ModalMiddle>

            <ModalBtnBox>
              <ModalBtn type="submit">수정 완료</ModalBtn>
            </ModalBtnBox>
          </form>
        </ModalInner>
        <Zindex onClick={modalClose} />
      </ModalContainer>
    );
  }
  return null;
}
export default ReviseRoom;

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

const CloseButtonBox = styled.div`
  position: absolute;
  right: 25.73px;
  top: 25.73px;
  cursor: pointer;
`;
