/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import nullImg from 'src/assets/images/imgSample.png';
import ImgPlus from '../assets/icons/makeroom/ImgPlus.svg';

export function ReviseImgSource({
  set,
  Reviseimage,
}: {
  set: React.Dispatch<React.SetStateAction<File | undefined>>;
  Reviseimage: string;
}) {
  const [imagePreview, setImagePreview] = useState(
    Reviseimage === null ? nullImg : Reviseimage,
  );
  const { watch, register } = useForm();
  const image = watch('image');

  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
      set(file);
    }
  }, [image]);

  return (
    <div style={{ position: 'relative', border: 'none' }}>
      <ImageSize src={imagePreview} />
      <SetImagediv>
        <label htmlFor="picture" style={{ cursor: 'pointer' }}>
          <img src={ImgPlus} alt="" style={{ width: '47px', height: '47px' }} />
        </label>
        <SetImage {...register('image')} id="picture" type="file" />
      </SetImagediv>
    </div>
  );
}

const ImageSize = styled.img`
  width: 380px;
  height: 180px;
  border-radius: 5px 5px 0px 0px;
  left: -24px;
  top: -20px;
`;

const SetImage = styled.input`
  border-radius: 47px;
  width: 47px;
  height: 47px;
  display: none;
`;

const SetImagediv = styled.div`
  border-radius: 47px;
  width: 47px;
  height: 47px;
  position: absolute;
  bottom: -23px;
  right: 13px;
`;
