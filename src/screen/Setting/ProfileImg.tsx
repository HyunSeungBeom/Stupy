import React, { useCallback, useRef, useState } from 'react';
import { PRIMARY, RATIO } from 'src/constants';
import styled from 'styled-components';
import icoEdit from 'src/assets/icons/setting/icoEdit.svg';
import icoPhoto from 'src/assets/icons/setting/icoPhoto.svg';
import IU from 'src/assets/images/imgProfileSample.jpeg';
import { useMutation, useQueryClient } from 'react-query';
import { patchUsers } from 'src/api/users';

type Props = {
  isEdit: boolean;
  onEditableChange: (e: boolean) => void;
  // eslint-disable-next-line react/require-default-props
  imageProp?: string;
  // eslint-disable-next-line react/require-default-props
  userNickProp?: string;
  // eslint-disable-next-line react/require-default-props
  emailProp?: string;
};

export default function ProfileImg({
  isEdit,
  onEditableChange,
  imageProp,
  userNickProp,
  emailProp,
}: Props) {
  const queryClient = useQueryClient();
  const [previewImg, setPreviewImg] = useState<string | ArrayBuffer | null>(
    String(imageProp),
  );
  const [imgFile, setImgFile] = useState<File>();
  const imgUpload = useRef<HTMLInputElement | null>(null);

  const handleEditableChange = (e: boolean) => {
    onEditableChange(e);
  };

  const handleUploadClick = useCallback(() => {
    imgUpload.current?.click();
  }, []);

  const encodeFileToBase64 = (fileBlob: Blob) => {
    const reader = new FileReader();

    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setPreviewImg(reader.result);
        resolve();
      };
    });
  };

  const onSubmit = () => {
    const formData = new FormData();

    if (imgFile) {
      formData.append('image', imgFile);
    }
    if (userNickProp) {
      formData.append('userNick', userNickProp);
    }
    if (emailProp) {
      formData.append('email', emailProp);
    }

    editProfile.mutate(formData);
  };

  const editProfile = useMutation((data: FormData) => patchUsers(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('userInfo');
      handleEditableChange(false);
    },
  });

  return (
    <Wrap>
      {isEdit ? (
        <DoneButton onClick={onSubmit}>완료</DoneButton>
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
          {isEdit ? (
            <img
              src={previewImg?.toString() || IU}
              alt=""
              style={{ width: 140, height: 140, objectFit: 'cover' }}
            />
          ) : (
            <img
              src={imageProp || IU}
              alt=""
              style={{ width: 140, height: 140, objectFit: 'cover' }}
            />
          )}
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
              onChange={(e) => {
                const file = e.target.files;
                // eslint-disable-next-line no-console,
                if (file) {
                  encodeFileToBase64(file[0]);
                  setImgFile(file[0]);
                }
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
