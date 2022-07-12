/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-namespace */
import React, { useCallback, useState } from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import styled from 'styled-components';

export default function HashInput({
  set,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hashArr2,
}: {
  set: React.Dispatch<React.SetStateAction<[] | string[]>>;
  hashArr2: string[];
}) {
  // onChange로 관리할 문자열
  const [hashtag, setHashtag] = useState<string | ''>('');
  // 해시태그를 담을 배열
  // const [hashArr, setHashArr] = useState<string[] | []>([]);
  const onChangeHashtag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHashtag(e.target.value);
  };

  const onDelete = (e: React.MouseEvent<HTMLElement>) => {
    set(
      hashArr2.filter((tag) => {
        const target = e.target as HTMLElement;
        return target.innerHTML !== `#${tag}`;
      }),
    );
  };

  const onKeyUp = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (e: any) => {
      if (typeof navigator !== 'undefined') {
        /* 요소 불러오기, 만들기 */
        const $HashWrapInner = document.createElement('div');
        $HashWrapInner.className = 'HashWrapInner';

        /* 태그를 클릭 이벤트 관련 로직 */
        $HashWrapInner.addEventListener('click', () => {
          // $HashWrapOuter?.removeChild($HashWrapInner);
        });

        /* enter 키 코드 :13 */
        if (e.keyCode === 13 && e.target.value.trim() !== '') {
          // eslint-disable-next-line no-console
          console.log('Enter Key 입력됨!', e.target.value);
          $HashWrapInner.innerHTML = `#${e.target.value}`;
          // $HashWrapOuter?.appendChild($HashWrapInner);
          if (hashArr2.length < 3) {
            set((hashArr) => [...hashArr, hashtag]);
          }
          setHashtag('');
        }
      }
    },

    [hashtag, hashArr2],
  );

  return (
    <div className="HashWrap" css={hashDivrap}>
      <div className="HashWrapOuter" />
      {hashArr2.length < 4 &&
        hashArr2.map((v, index) => {
          return (
            <div
              onClick={onDelete}
              key={`${index + v}`}
              className="HashWrapInner"
            >
              #{v}
            </div>
          );
        })}
      {hashArr2.length < 3 && (
        <OrangeInput
          className="HashInput"
          type="text"
          value={hashtag}
          onChange={onChangeHashtag}
          onKeyUp={onKeyUp}
          placeholder="해시태그 입력(최대 3개)"
        />
      )}
    </div>
  );
}

/* emotion css 태그 */

const hashDivrap = css`
  color: rgb(52, 58, 64);
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;

  border-bottom: #f8dac9 2px solid;

  .HashWrapOuter {
    display: flex;
    flex-wrap: wrap;
  }

  .HashWrapInner {
    background: #f8dac9;
    border-radius: 20px;
    padding: 4px 8px;
    color: #ff6e35;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 14px;
    line-height: 10px;
    margin-right: 5px;
    margin-top: 3px;
    height: 30px;
    cursor: pointer;
  }

  .HashInput {
    width: auto;
    display: inline-flex;
    outline: none;
    cursor: text;
    border: none;
  }
`;
const OrangeInput = styled.input`
  width: 326px;
  margin-top: 10px;
  font-size: 14px;
  border: none;
  border-bottom: #f8dac9 2px solid;
  outline: none;
`;
