import React, { useCallback, useRef } from 'react';
import { PRIMARY, RATIO } from 'src/constants';
import styled from 'styled-components';
import icoEdit from 'src/assets/icons/setting/icoEdit.svg';
import icoPhoto from 'src/assets/icons/setting/icoPhoto.svg';
import IU from 'src/assets/images/imgProfileSample.jpeg';

type Props = {
  isEdit: boolean;
  onEditableChange: (e: boolean) => void;
};

export default function ProfileImg({ isEdit, onEditableChange }: Props) {
  const imgUpload = useRef<HTMLInputElement | null>(null);
  const handleEditableChange = (e: boolean) => {
    onEditableChange(e);
  };
  const handleUploadClick = useCallback(() => {
    imgUpload.current?.click();
  }, []);
  return (
    <Wrap>
      {isEdit ? (
        <DoneButton onClick={() => handleEditableChange(false)}>
          완료
        </DoneButton>
      ) : (
        <EditButton onClick={() => handleEditableChange(true)}>
          수정
          <img
            src={icoEdit}
            alt=""
            style={{ width: 24, height: 24, marginLeft: 7 }}
          />
        </EditButton>
      )}
      <ImgContainer>
        <ProfileImage>
          <img
            src={IU}
            alt=""
            style={{ width: 140, height: 140, objectFit: 'cover' }}
          />
        </ProfileImage>
        프로필 사진
        {isEdit && (
          <PhotoUploadButton onClick={handleUploadClick}>
            <img src={icoPhoto} alt="" />
            <input
              type="file"
              accept="image/*"
              ref={imgUpload}
              style={{
                display: 'none',
              }}
            />
          </PhotoUploadButton>
        )}
      </ImgContainer>
    </Wrap>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const EditButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: flex-end;
  font-size: 17px;
  font-weight: 500;
  color: ${PRIMARY};
  cursor: pointer;
`;
const DoneButton = styled.div`
  align-self: flex-end;
  font-size: 17px;
  font-weight: 500;
  color: #949291;
  cursor: pointer;
`;
const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  width: ${140 * RATIO}px;
  height: ${165 * RATIO}px;
  max-width: 140px;
  max-height: 165px;
  position: relative;
  font-size: 15px;
  font-weight: medium;
  color: #9a9a9a;
`;
const ProfileImage = styled.div`
  width: ${140 * RATIO}px;
  height: ${140 * RATIO}px;
  max-width: 140px;
  max-height: 140px;
  border-radius: ${140 * RATIO}px;
  overflow: hidden;
  margin-bottom: 5px;
`;
const PhotoUploadButton = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 0px;
  bottom: 23px;
  cursor: pointer;
`;
