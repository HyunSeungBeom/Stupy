/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form';
import styled from 'styled-components';

function InputBox({
  text,
  placetext,
  type,
  register,
  required,
  maxLength,
  errors,
}: {
  text: string;
  placetext: string;
  type: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  maxLength?: number;
  errors: {
    [x: string]: any;
  };
}) {
  return (
    <div style={{ paddingBottom: '10px' }}>
      <InputOrange>{text}</InputOrange>
      <OrangeInput
        placeholder={placetext}
        type={type}
        {...register(type, {
          required,
          maxLength,
        })}
      />
      {errors.type && errors.type.type === 'required' && (
        <ErrorMessage>{type}을 입력해주세요!</ErrorMessage>
      )}
      {errors.type && errors.type.type === 'maxLength' && (
        <ErrorMessage>{maxLength}가 넘지 않도록 해주세요!</ErrorMessage>
      )}
    </div>
  );
}

export default InputBox;

const InputOrange = styled.div`
  font-size: 17px;
  font-weight: 600;
  line-height: 20px;
`;

const OrangeInput = styled.input`
  width: 326px;
  font-size: 14px;
  border: none;
  border-bottom: #f8dac9 2px solid;
  outline: none;
`;

const ErrorMessage = styled.p`
  font-size: 14px;
  font-weight: 600;
`;
